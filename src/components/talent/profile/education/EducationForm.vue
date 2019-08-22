<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
          <v-card style="padding:0px 30px 20px 30px" class="mt-5" elevation="0" width="400">
            <v-card class="taitel primary white--text elevation-5">
              <h3 v-if="edit" class="headline mb-0 font-weight-light">{{ $vuetify.lang.t('$vuetify.action.edit') }} Education</h3>
              <h3 v-if="!edit" class="headline mb-0 font-weight-light">{{ $vuetify.lang.t('$vuetify.action.add') }} Education</h3>    
            </v-card>
            <v-card-text class="pt-0">
              <div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="Institution Name"
                    v-model="params.institution"
                    :rules="nameRules"
                    :counter="25"
                    maxlength="25"
                    required
                  ></v-text-field>
                  <v-autocomplete
                    v-model="params.phase"
                    label="Phase"
                    :items="type"
                    item-text="name"
                    item-value="value"
                  ></v-autocomplete>
                  <v-text-field label="Major" v-model="params.major"></v-text-field>
                  <v-text-field label="Start Year" maxlength="4" v-model="params.startYear"></v-text-field>
                  <v-text-field maxlength="4" label="End Year" v-model="params.endYear"></v-text-field>
                  <v-text-field label="Note" v-model="params.note"></v-text-field>
                  <v-layout justify-space-between>
                    <v-btn
                      v-if="edit == false"
                      @click.prevent="submit"
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
                    >{{ $vuetify.lang.t('$vuetify.action.update')}}</v-btn>

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
  props: ["id", "edit", "view", "data"],
  data: function() {
    return {
      valid: false,
      loader: false,
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: { code: 666, type: "", details: [""] },
      params: {
        phase: "",
        institution: "",
        major: "",
        startYear: "",
        endYear: "",
        note: ""
      },
      type: [
        {
          name: "SMA",
          value: "SMA"
        },
        {
          name: "SMK",
          value: "SMK"
        },
        {
          name: "D3",
          value: "D3"
        },
        {
          name: "S1",
          value: "S1"
        },
        {
          name: "S2",
          value: "S2"
        }
      ],
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
    this.getSingleData();
  },
  mounted: function() {},
  methods: {
    submit: function() {
      if (this.$refs.form.validate()) {
        this.addData();
      } else {
        this.$vuetify.goTo(this.$refs.notif, {
          duration: 500,
          offset: 0,
          easing: "linear"
        });
      }
    },
    update: function() {
      if (this.$refs.form.validate()) {
        this.updateData();
      } else {
        this.$vuetify.goTo(this.$refs.notif, {
          duration: 500,
          offset: 0,
          easing: "linear"
        });
      }
    },
    getSingleData: function() {
      notif.reset(this);
      this.loader = true;
      net
        .getData(this, "/talent/educational-backgrounds/" + this.data.id)
        .then(res => {
          console.log(res);
          this.params = res.data.data;
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    addData: function() {
      this.loader = true;
      notif.reset(this);
      net
        .postData(this, "/talent/educational-backgrounds", this.params)
        .then(res => {
          console.log(res);
          this.$store.commit("incrementEdu");
          this.$emit("refresh");
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    updateData: function() {
      this.loader = true;
      notif.reset(this);

      net
        .putData(
          this,
          "/talent/educational-backgrounds/" + this.data.id,
          this.params
        )
        .then(res => {
          console.log(res);
          this.$emit("refresh");
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
@import "../../../css/modal.css";

.taitel {
  padding: 24px;
  width: 90%;
  margin: 0 auto;
  bottom: 27px;
  z-index: 2;
}
</style>
