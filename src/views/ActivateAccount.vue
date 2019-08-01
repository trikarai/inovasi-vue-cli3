<template>
  <div id="app">
    <v-app>
      <v-layout align-center justify-center>
        <!-- <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" /> -->
      </v-layout>
      <v-dialog v-model="loader" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Please stand by
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
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
            <v-card v-if="status.error">
              <v-card-text class="pt-4">
                <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
              </v-card-text>
              <v-card-action>
                <v-btn color="blue" @click="resendAccount">
                  <v-icon small left>autorenew</v-icon>Resend Activation
                </v-btn>
              </v-card-action>
            </v-card>
            <!-- card sucsess response -->
            <v-card v-if="status.success">
              <v-card-title>Activation Success</v-card-title>
              <v-card-text>
                Thank you!
                <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
              </v-card-text>
              <v-card-action>
                <v-btn color="primary" to="/login">
                  <v-icon small left>vpn_key</v-icon>Login
                </v-btn>
              </v-card-action>
            </v-card>

            <v-card v-if="status.info">
              <v-card-title>Activation Resend</v-card-title>
              <v-card-text>
                <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
                <br />Check email for activation link
              </v-card-text>
              <v-card-action></v-card-action>
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
      err_msg: { details: [""] },
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      params: ""
    };
  },
  created: function() {},
  mounted: function() {
    this.activateAccount();
  },
  components: {
    "notification-alert": Notification
  },
  computed: {},
  methods: {
    activateAccount: function() {
      this.loader = true;
      notif.reset(this);
      net
        .putDataPublic(
          this,
          "/talent-account-control/activate?email=" +
            this.$route.params.email +
            "&activationCode=" +
            this.$route.params.activationCode
        )
        .then(res => {
          notif.showInfo(this, res, "Activated");
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    resendAccount: function() {
      this.loader = true;
      this.status.error = false;
      this.status.success = false;
      this.status.info = false;
      net
        .putDataPublic(
          this,
          "/talent-account-control/regenerate-activation-code",
          { email: this.$route.params.email }
        )
        .then(res => {
          notif.showInfo(this, res, "Code Resend");
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
#app {
  background-image: url("http://103.23.22.223/img/login-bg.png");
  background-size: cover;
  overflow: hidden;
}
</style>
