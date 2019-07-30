<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
          <v-card elevation="0" width="400">
            <v-card-text class="pt-4">
              <div>
                <!-- {{error}} -->
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="Name"
                    v-model="params.name"
                    :rules="nameRules"
                    :counter="25"
                    maxlength="25"
                    required
                  ></v-text-field>

                  <v-flex xs12>
                    <v-menu
                      v-model="menu1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="params.startDate"
                          label="Start Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :locale="$vuetify.lang.current"
                        v-model="params.startDate"
                        @input="menu1 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12>
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="params.endDate"
                          label="End Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :locale="$vuetify.lang.current"
                        v-model="params.endDate"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>

                  <v-layout justify-space-between>
                    <v-btn
                      v-if="edit == false"
                      @click.prevent="submit"
                      :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                    >{{ $vuetify.t('$vuetify.action.add')}}</v-btn>

                    <v-btn
                      v-else
                      @click="update"
                      :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                    >{{ $vuetify.t('$vuetify.action.update')}}</v-btn>

                    <v-dialog v-model="loader" hide-overlay persistent width="300">
                      <v-card color="primary" dark>
                        <v-card-text>
                          {{ $vuetify.t('$vuetify.info.standby')}}
                          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
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
      err_msg: { code: 666, type: "", details: [] },
      error: "error",
      params: {
        name: "",
        startDate: "",
        endDate: ""
      },
      menu1: false,
      menu2: false,
      nameRules: [
        v => !!v || "Name is required",
        v => v.length >= 3 || "Name must be more than 3 characters"
      ]
    };
  },
  components: {
    "notification-alert": notification
  },
  created: function() {},
  mounted: function() {
    if (this.edit) {
      this.getSingleData();
    }
  },
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
      net
        .getData(
          this,
          "/administrator/programmes/" +
            this.$route.params.programId +
            "/registrations/" +
            this.data.id
        )
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
      notif.reset(this);
      this.loader = true;
      net
        .postData(
          this,
          "/administrator/programmes/" +
            this.$route.params.programId +
            "/registrations",
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
    },
    updateData: function() {
      this.loader = true;
      notif.reset(this);
      net
        .putData(
          this,
          "/administrator/programmes/" +
            this.$route.params.programId +
            "/registrations/" +
            this.data.id,
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
</style>
