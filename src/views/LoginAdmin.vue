<template>
    <v-app>
      <div id="loginadmin">
      <v-layout align-center justify-center>
        <notification-alert v-bind:err_msg="err_msg" v-bind:status="status"/>
      </v-layout>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 elevation-12>
            <v-toolbar class="pt-2" color="grey lighten-5">
              <v-img src="/img/miktilampu.png" style="position: relative;bottom: 5px;" aspect-ratio="1" max-width="30px"></v-img>
              <v-toolbar-title class="black--text ml-2">
                 <h4 class="font-weight-regular">MIKTI <v-chip>admin</v-chip></h4>
              </v-toolbar-title>
              <v-toolbar-title class="ml-auto">
                <router-link v-bind:to="'/'">
                    <v-icon class="grey--text text--darken-2 mb-2 ml-3">home</v-icon>
                </router-link>
              </v-toolbar-title>
              <!-- </v-toolbar-items> -->
            </v-toolbar>
            <v-card style="padding:15px 30px 30px 30px">
              <h3 class="font-weight-light mt-4 text-center">Selamat Datang</h3>
              <v-card-text class="pt-4">
                <div>
                  <v-form v-model="valid" ref="form">
                    <v-text-field
                      label="Username"
                      v-model="email"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Password"
                      v-model="password"
                      min="8"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e1 = !e1)"
                      :type="e1 ? 'password' : 'text'"
                      :rules="passwordRules"
                      v-on:keyup.enter="submit"
                      counter
                      required
                    ></v-text-field>
                    <v-layout justify-space-between>
                      <v-btn
                        @click="submit"
                        class="mt-4"
                        :class=" { 'primary white--text' : valid}"
                        :disabled="!valid"
                        color="#e4e4e4"
                        style="color:#fff"
                        block
                      >Login</v-btn>
                      <v-dialog v-model="loader" hide-overlay persistent width="300">
                        <v-card color="primary" dark>
                          <v-card-text>
                            Please stand by
                            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                      <!-- <a href>Forgot Password</a> -->
                    </v-layout>
                  </v-form>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      </div>
    </v-app>
  
</template>
<script>
import net from "@/config/httpclient";
import alert from "@/config/alerthandling";
import auth from "@/config/auth";
import Notification from "@/components/Notification";

export default {
  name: "Login",
  data: function() {
    return {
      respone: "",
      loader: false,
      alert: false,
      err_msg: {details:[""]},
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
          }
        )
        .catch(error=>{
            console.log(error);
            alert.showError(this, error)
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
#loginadmin {
  /* background-image: url("/img/back.jpg") !important; */
  background:#f7f7f7;
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  height: 100%
}

.v-chip {
    background: #e8662e !important;
    color: rgba(255, 255, 255, 0.87) !important;
}
</style>

