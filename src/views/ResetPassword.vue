<template>
  <div id="app">
    <v-app>
      <v-layout align-center justify-center>
        <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
      </v-layout>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 elevation-12>
            <v-toolbar class="pt-5 darken-4" color="#8bc751">
              <v-toolbar-title class="white--text">
                <h4>{{$route.name}}</h4>
              </v-toolbar-title>
              <!-- </v-toolbar-items> -->
              <!-- {{error}} -->
            </v-toolbar>
            <v-card v-if="!status.success">
              <v-card-text class="pt-4">
                <div>
                  <v-form v-model="valid" ref="form">
                    <v-text-field
                      v-model="params.password"
                      :append-icon="show1 ? 'visibility' : 'visibility_off'"
                      :rules="[passwordRules.required, passwordRules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="New Password"
                      :label="$vuetify.t('$vuetify.profile.previousPassword')"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                    <v-text-field
                      v-model="cpassword"
                      :append-icon="show2 ? 'visibility' : 'visibility_off'"
                      :rules="passwordConfirmationRules"
                      :type="show2 ? 'text' : 'password'"
                      name="Confirm New Password"
                      :label="$vuetify.t('$vuetify.profile.newPassword')"
                      hint="At least 8 characters"
                      counter
                      @click:append="show2 = !show2"
                    ></v-text-field>
                    <v-layout justify-space-between>
                      <v-btn
                        @click="submit"
                        :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                      >Login</v-btn>

                      <v-dialog v-model="loader" hide-overlay persistent width="300">
                        <v-card color="primary" dark>
                          <v-card-text>
                            Please stand by
                            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                    </v-layout>
                  </v-form>
                </div>
              </v-card-text>
            </v-card>
            <!-- card sucsess response -->
            <v-card v-if="status.success">
              <v-card-title>Success</v-card-title>
              <v-card-text>Thank you!</v-card-text>
              <v-card-action>
                <v-btn color="primary" to="/login">
                  <v-icon small left>vpn_key</v-icon>
                  Login
                </v-btn>
              </v-card-action>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import auth from "@/config/auth";
import Notification from "@/components/Notification";

export default {
  name: "Login",
  data: function() {
    return {
      loader: false,
      response: "",
      error: "",
      valid: false,
      alert: false,
      show1: false,
      show2: false,
      err_msg: {details:[""]},
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      domain: "",
      params: {
        password: ""
      },
      cpassword: "",
      passwordRules: {
        required: value => !!value || "Password Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      },
      passwordConfirmationRules: [
        v => !!v || "Confirmation Password is required",
        () =>
          this.cpassword === this.params.password || "Password does not match"
      ]
    };
  },
  created: function() {},
  mounted: function() {},
  components: {
    "notification-alert": Notification
  },
  computed: {
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.resetPassword();
      }
    },
    resetPassword: function() {
      this.loader = true;
      notif.reset(this);
      net
        .putDataPublic(
          this,
          "/talent-account-control/reset-password?email="+ this.$route.params.email + "&resetPasswordCode=" + this.$route.params.resetPasswordCode ,
          this.params
        )
        .then(res => {
          notif.showSuccess(this, res, ["Password Reset"])
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(()=> {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
#app {
  background-image: url("http://103.23.22.223/img/login-bg.png");
  background-size: cover;
  overflow: hidden;
}
</style>
