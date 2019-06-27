<template>
  <div id="app">
    <v-app>
      <v-layout align-center justify-center>
        <notification-alert v-bind:err_msg="err_msg" v-bind:status="status"/>
      </v-layout>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 elevation-12>
            <v-toolbar class="pt-5 darken-4" color="#8bc751">
              <v-toolbar-title class="white--text">
                <h4>{{$route.name}}</h4>
              </v-toolbar-title>
              <!-- </v-toolbar-items> -->
            </v-toolbar>
            <v-card>
              <v-card-text class="pt-4">
                <div>
                  <v-form v-model="valid" ref="form">
                    <v-text-field
                      label="Enter your username"
                      v-model="email"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Enter your password"
                      v-model="password"
                      min="8"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e1 = !e1)"
                      :type="e1 ? 'password' : 'text'"
                      :rules="passwordRules"
                      counter
                      required
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
                      <a href>Forgot Password</a>
                    </v-layout>
                  </v-form>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>
<script>
import net from "@/config/httpclient";
import auth from "@/config/auth";
import Notification from "@/components/Notification";

export default {
  name: "Login",
  data: function() {
    return {
      respone: "",
      loader: false,
      alert: false,
      err_msg: { code: 0, type: "", details: [] },
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      valid: false,
      e1: false,
      password: "",
      passwordRules: [v => !!v || "Password is required"],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required"
        // v =>
        //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        //   "E-mail must be valid"
      ]
    };
  },
  components: {
    "notification-alert": Notification
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.login();
      }
    },
    login: function() {
      this.loader = true;
      var authUser = {};
      this.status.error = false;
      net
        .loginAdministrator(this, "/administrator-login", {
          username: this.email,
          password: this.password
        })
        .then(
          res => {
            this.response = res.data.data;
            authUser.data = res.data.data;
            authUser.role_id = "ADMIN";
            authUser.token = res.data.credentials.token;
            authUser.valid_until = res.data.credentials.valid_until;
            this.$store.state.isLoggedIn = true;
            window.localStorage.setItem("lbUser", JSON.stringify(authUser));
            this.$router.replace("/administrator/dashboard");
          },
          error => {
            console.log(error);
            this.err_msg = error.body.meta;
            this.status.error = true;
          }
        )
        .catch()
        .finally(function() {
          this.loader = false;
        });
    },
    clear() {
      this.$refs.form.reset();
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

