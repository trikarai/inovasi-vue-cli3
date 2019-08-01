<template>
  <div id="app">
    <v-app>
      <v-layout align-center justify-center>
        <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
      </v-layout>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 elevation-12>
            <v-toolbar class="pt-5 darken-4" color="#8bc751" v-if="!status.success">
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
                      label="Enter your email"
                      v-model="params.email"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                    <v-layout justify-space-between>
                      <v-btn
                        @click="submit"
                        :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                      >Submit</v-btn>

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
              <v-card-title>
                Success
              </v-card-title>
              <v-card-text>Thank you! Please check your email for the reset link.</v-card-text>
              <v-card-action>
                 <v-btn color="red" :href="'https://'+getEmailDomain"><v-icon small left>email</v-icon> go to {{getEmailDomain}}</v-btn> 
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
      err_msg: {details:[""]},
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      domain: "",
      params: {
        email: ""
      },
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ]
    };
  },
  created: function() {},
  mounted: function() {},
  components: {
    "notification-alert": Notification
  },
  computed: {
    getEmailDomain: function() {
      return this.params.email.replace(/.*@/, "");
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.forgotPassword();
      }
    },
    forgotPassword: function() {
      this.loader = true;
      this.status.error = false;
      this.status.success = false;
      net
        .putDataPublic(
          this,
          "/talent-account-control/generate-reset-password-code",
          this.params
        )
        .then(res => {
                   notif.showSuccess(this, res, ["Reset Code Sent"])

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
