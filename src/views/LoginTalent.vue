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
                      <router-link v-bind:to="'/forgot-password'">Forgot Password</router-link>
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
      loader: false,
      response: "",
      valid: false,
      alert: false,
      err_msg: { code: 0, type: "", details: [] },
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      e1: true,
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
  created: function() {},
  mounted: function() {},
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
      var app = this;
      this.loader = true;
      var authUser = {};
      this.status.error = false;
      net
        .loginTalent(this, "/talent-login", {
          username: this.email,
          password: this.password
        })
        .then(
          res => {
            this.response = res.data.data;
            authUser.data = res.data.data;
            authUser.role_id = "TALENT";
            authUser.token = res.data.credentials.token;
            authUser.valid_until = res.data.credentials.valid_until;
            this.$store.state.isLoggedIn = true;
            window.localStorage.setItem("lbUser", JSON.stringify(authUser));
            this.$router.replace("/talent/dashboard");
          }
        )
        .catch(error=>{
          console.log(error);
            if(!error.response){
              this.err_msg = {code: 0, type: "Connection", details:["Connection Error"]};
            }else if(error.status >= 500){
              this.err_msg = {code: error.status, type: error.statusText, details:["Internal Server Error"]}
            }else if(error.status >= 400){
              this.err_msg = {code: error.status, type: error.statusText, details:[error.statusText]}
            }else{
              this.err_msg = error.body.meta;
            }
            this.status.error = true;
        })
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

