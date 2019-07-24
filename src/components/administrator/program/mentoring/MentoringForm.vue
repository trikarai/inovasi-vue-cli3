<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
          <v-card elevation="0" width="400">
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="Name"
                    v-model="params.name"
                    :rules="nameRules"
                    :counter="25"
                    maxlength="25"
                    required
                  ></v-text-field>

                  <v-text-field
                    label="Session Duration"
                    v-model="params.sessionDuration"
                    type="number"
                    hint="Minutes"
                    min="30"
                    required
                  ></v-text-field>
                  <v-divider></v-divider>
                  <v-flex xs12>
                    <v-select
                       v-model="params.formIdForParticipantFeedback"
                      :loading="loadingForm"
                      :items="form.list"
                      hint="Select Participant Feedback Form"
                      item-text="name"
                      item-value="id"
                      label="Select Talent Feedback Form"
                      persistent-hint
                    ></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-select
                      v-model="params.formIdForMentorFeedback"
                      :loading="loadingForm"
                      :items="form.list"
                      hint="Select Mentor Feedback Form"
                      item-text="name"
                      item-value="id"
                      label="Select Mentor Feedback Form"
                      persistent-hint
                    ></v-select>
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
      err_msg: { code: 666, type: "", details: [""] },
      error: "error",
      loadingForm: false,
      params: {
        name: "",
        sessionDuration: "",
        formIdForParticipantFeedback: "",
        formIdForMentorFeedback: ""
      },
      form: { list: [] },
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
    this.getFeedbackForm();
  },
  mounted: function() {
    if (this.edit) {
      this.getSingleData();
    }
  },
  methods: {
    getFeedbackForm: function() {
      this.loadingForm = true;
      net
        .getData(this, "/administrator/forms?types[]=mfb")
        .then(res => {
          if (res.data.data) {
            this.form = res.data.data;
          } else {
            this.form.list = [];
          }
        })
        .catch(error => {
          console.log(error);
          notif.showError(this, error);
        })
        .finally(function() {
          this.loadingForm = false;
        });
    },
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
      net
        .getData(
          this,
          "/administrator/programmes/" +
            this.$route.params.programId +
            "/mentorings/" +
            this.data.id
        )
        .then(
          res => {
            console.log(res);
            this.params = res.data.data;
          },
          error => {
            console.log(error);
            if (error.status > 400) {
              this.err_msg = {
                code: error.status,
                type: error.statusText,
                details: [error.statusText]
              };
            } else {
              this.err_msg = error.body.meta;
            }
            this.status.error = true;
          }
        )
        .catch()
        .finally(function() {
          this.loader = false;
        });
    },
    addData: function() {
      this.loader = true;
      this.status.error = false;
      net
        .postData(
          this,
          "/administrator/programmes/" +
            this.$route.params.programId +
            "/mentorings",
          this.params
        )
        .then(
          res => {
            console.log(res);
            this.$emit("refresh");
          },
          error => {
            console.log(error);
            if (error.status < 400) {
              this.err_msg = {
                code: error.status,
                type: error.statusText,
                details: [error.statusText]
              };
            } else {
              this.err_msg = error.body.meta;
            }
            this.status.error = true;
          }
        )
        .catch()
        .finally(function() {
          this.loader = false;
        });
    },
    updateData: function() {
      var app = this;
      this.loader = true;
      this.status.error = false;
      net
        .putData(
          this,
          "/administrator/programmes/" +
            this.$route.params.programId +
            "/mentorings/" +
            this.data.id,
          this.params
        )
        .then(
          res => {
            console.log(res);
            this.$emit("refresh");
          },
          error => {
            console.log(error);
            if (error.status < 400) {
              this.err_msg = {
                code: error.status,
                type: error.statusText,
                details: [error.statusText]
              };
            } else {
              this.err_msg = error.body.meta;
            }
            this.status.error = true;
          }
        )
        .catch(function(error) {
          app.err_msg = {
            code: error.status,
            type: error.statusText,
            details: [error.statusText]
          };
          app.status.error = true;
        })
        .finally(function() {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
@import "../../../css/modal.css";
</style>
