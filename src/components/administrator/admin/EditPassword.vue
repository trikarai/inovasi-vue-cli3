<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <v-card elevation="0" width="400">
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    v-model="password.previousPassword"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="Previous Password"
                    label="Previous Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-text-field
                    v-model="password.newPassword"
                    :append-icon="show2 ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required, rules.min]"
                    :type="show2 ? 'text' : 'password'"
                    name="New Password"
                    label="New Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show2 = !show2"
                  ></v-text-field>
                  <v-layout justify-space-between>
                    <v-btn
                      @click="updateData"
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

export default {
  props: ["id", "edit", "view", "data"],
  data: function() {
    return {
      valid: false,
      loader: false,
      show1: false,
      show2: false,
      params: {
        name: "",
        username: "",
        email: "",
        password: ""
      },
      password: {
        previousPassword:"",
        newPassword:""
      },
      nameRules: [
        v => !!v || "Name is required",
        v => v.length >= 3 || "Name must be more than 3 characters"
      ],
      rules: {
        required: value => !!value || "Required.",
        // counter: value => value.length <= 25 || "Max 25 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      },
      passwordRules: {
          required: value => !!value || 'Password Required.',
          min: v => v.length >= 8 || 'Min 8 characters'
        }
    };
  },
  created: function() {
    // this.params.name = this.data.name;
  },
  mounted: function() {
    // if (this.edit) {
    //   this.getSingleData(this.data.id);
    // }
  },
  methods: {
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
        .putData(
          this,
          "/administrator/profile/change-password/",
          this.password
        )
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
