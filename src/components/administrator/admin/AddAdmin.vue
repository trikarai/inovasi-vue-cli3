<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
          <v-card elevation="0" width="400">
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form">
                  <template v-if="!edit">
                    <v-text-field
                      :disabled="view"
                      label="Username"
                      v-model="params.username"
                      :rules="nameRules"
                      :counter="25"
                      maxlength="25"
                      required
                    ></v-text-field>
                  </template>
                  <v-text-field
                    :disabled="view"
                    label="Name"
                    v-model="params.name"
                    :rules="nameRules"
                    :counter="25"
                    maxlength="25"
                    required
                  ></v-text-field>
                  <v-text-field
                    :disabled="view"
                    label="Email"
                    v-model="params.email"
                    :rules="rulesEmail"
                    maxlength="100"
                    required
                  ></v-text-field>
                  <template v-if="!edit">
                    <v-text-field
                      v-if="!view"
                      v-model="params.password"
                      :append-icon="show1 ? 'visibility' : 'visibility_off'"
                      :rules="passwordRules"
                      :type="show1 ? 'text' : 'password'"
                      name="Password"
                      label="Password"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </template>
                  <v-layout justify-space-between v-if="!view">
                    <v-btn
                      v-if="edit == false"
                      @click.prevent="submit"
                      :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                    >{{ $vuetify.t('$vuetify.action.add')}}</v-btn>
                    <v-btn
                      v-else
                      @click="update"
                      :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                    >{{ $vuetify.t('$vuetify.action.edit')}}</v-btn>

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
import Notification from "@/components/Notification";

export default {
  props: ["id", "edit", "view", "data"],
  data: function() {
    return {
      valid: false,
      loader: false,
      show1: false,
      status: {
        error : false,
        success: false,
        info: false,
        warning : false
      },
      err_msg: "",
      params: {
        name: "",
        username: "",
        email: "",
        password: ""
      },
      nameRules: [
        v => !!v || "Name is required",
        v => v.length >= 3 || "Name must be more than 3 characters"
      ],
      rulesRequired: [value => !!value || "Required."],
      rulesEmail: [
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      ],
      passwordRules: [
         value => !!value || "Password Required.",
         v => v.length >= 8 || "Min 8 characters"
      ]
    };
  },
  components: {
    "notification-alert": Notification
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
        .postData(this, "/administrator/administrators/", this.params)
        .then(
          res => {
            console.log(res);
            this.$emit("refresh");
          },
          error => {
            console.log(error);
          }
        )
        .catch()
        .finally(function() {
          this.loader = false;
        });
    },
    updateData: function() {
      this.loader = true;
      net
        .putData(this, "/administrator/profile/update/", this.params)
        .then(res => {
          console.log("Responese : " + res);
          if (res.status >= 300) {
            notif.showError(this, res)
          } else {
            this.$emit("refresh");
          }
        })
        .catch(error => {
          console.log("Error : " + error);
          notif.showError(this, error);
        })
        .finally(function() {
          this.loader = false;
        });
    },
    getSingleData: function(id) {
      net
        .getData(this, "/administrator/administrators/" + id)
        .then(
          res => {
            this.params = res.data.data;
          },
          error => {
            console.log(error);
          }
        )
        .catch()
        .finally();
    }
  }
};
</script>
<style scoped>
@import "../../css/modal.css";
</style>
