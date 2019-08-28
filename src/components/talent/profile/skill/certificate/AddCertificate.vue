<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
          <v-card style="padding:0px 30px 20px 30px" class="mt-5" elevation="0" width="400">
            <v-card class="taitel primary white--text elevation-5">
              <h3 v-if="edit" class="headline mb-0 font-weight-light">{{ $vuetify.lang.t('$vuetify.action.edit') }} Certificate</h3>
              <h3 v-if="!edit" class="headline mb-0 font-weight-light">{{ $vuetify.lang.t('$vuetify.action.add') }} Certificate</h3>    
            </v-card>
            <v-card-text class="pt-0">
              <div>
                <!-- {{skillId}} -->
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    :disabled="view"
                    label="Certificate Name"
                    v-model="params.name"
                    :rules="nameRules"
                    :counter="25"
                    maxlength="25"
                    required
                  ></v-text-field>
                  <v-text-field
                    :disabled="view"
                    label="Organizer"
                    v-model="params.organizer"
                    counter
                    maxlength="100"
                    required
                  ></v-text-field>

                  <v-flex xs12>
                    <v-menu
                      v-model="menu1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="params.issuedDate"
                          label="Issued Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="params.issuedDate" @input="menu1 = false"></v-date-picker>
                    </v-menu>
                  </v-flex>

                  <v-flex xs12>
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="params.validUntil"
                          label="Valid Until"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="params.validUntil" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                  </v-flex>

                  <v-layout justify-space-between v-if="!view">
                    <v-btn
                      v-if="edit == false"
                      @click.once="submit"
                      :class=" { 'primary white--text' : valid}"
                      :disabled="!valid"
                      block
                    >{{ $vuetify.lang.t('$vuetify.action.add')}}</v-btn>

                    <v-btn
                      v-else
                      @click="update"
                      :class=" { 'primary white--text' : valid}"
                      :disabled="!valid"
                      block
                    >{{ $vuetify.lang.t('$vuetify.action.edit')}}</v-btn>

                    <loader-dialog v-model="loader"></loader-dialog>

                  </v-layout>
                </v-form>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import notification from "@/components/Notification";

export default {
  props: ["skillId", "edit", "view", "data"],
  data: function() {
    return {
      valid: false,
      loader: false,
      menu1: false,
      menu2: false,
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: { code: 666, type: "", details: [""] },
      params: {
        name: "",
        organizer: "",
        issuedDate: "",
        validUntil: ""
      },
      nameRules: [
        v => !!v || "Name is required",
        v => v.length >= 3 || "Name must be more than 3 characters"
      ]
    };
  },
  components: {
    "notification-alert": notification
  },
  created: function() {
    this.params.name = this.data.name;
  },
  mounted: function() {
    if (this.edit) {
      this.getSingleData(this.data.id);
    }
  },
  methods: {
    submit: function() {
      if (this.$refs.form.validate()) {
        this.addData();
      }
    },
    update: function() {
      if (this.$refs.form.validate()) {
        this.updateData();
      }
    },
    addData: function() {
      this.loader = true;
      net
        .postData(
          this,
          "/talent/skills/" + this.skillId + "/certificates",
          this.params
        )
        .then(res => {
          
          this.$emit("refresh");
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(()=> {
          this.loader = false;
        });
    },
    updateData: function() {
      this.loader = true;
      notif.reset(this);
      net
        .putData(
          this,
          "/talent/skills/" + this.skillId + "/certificates/" + this.data.id,
          this.params
        )
        .then(res => {
          
          this.$emit("refresh");
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    getSingleData: function(id) {
      net
        .getData(this, "/talent/skills/" + this.skillId + "/certificates/" + id)
        .then(res => {
          this.params = res.data.data;
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
@import "../../../../css/modal.css";

.taitel {
  padding: 24px;
  width: 90%;
  margin: 0 auto;
  bottom: 27px;
  z-index: 2;
}
</style>
