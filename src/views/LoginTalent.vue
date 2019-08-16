<template>
  <v-app>
    <div id="loginpage">
      <v-layout align-center justify-center>
        <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
      </v-layout>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 elevation-12 class="text-xs-center">
            <v-toolbar class="pt-2" color="primary">
              <v-img
                src="/img/miktilampu.png"
                style="position: relative;bottom: 5px;"
                aspect-ratio="1"
                max-width="30px"
              ></v-img>
              <v-toolbar-title class="white--text ml-2">
                <h4>
                  MIKTI
                  <v-chip>S t a r t</v-chip>
                </h4>
              </v-toolbar-title>
              <v-toolbar-title class="ml-auto">
                <router-link v-bind:to="'/signup'">
                  <v-icon class="white--text mb-2">person_add</v-icon>
                </router-link>
                <router-link v-bind:to="'/'">
                  <v-icon class="white--text mb-2 ml-3">home</v-icon>
                </router-link>
              </v-toolbar-title>
              <!-- </v-toolbar-items> -->
            </v-toolbar>
            <v-card style="padding:20px 30px 30px 30px;">
              <h3 class="font-weight-light mt-4 mb-1">Login</h3>
              <v-card-text style="pa-4">
                <div>
                  <v-form v-model="valid" ref="form">
                    <v-layout>
                      <v-text-field
                        label="Email"
                        prepend-icon="person"
                        v-model="email"
                        autocomplete="email"
                        :rules="emailRules"
                        required
                      ></v-text-field>
                    </v-layout>
                    <v-layout>
                      <v-text-field
                        label="Password"
                        prepend-icon="lock"
                        v-model="password"
                        min="8"
                        :append-icon="e1 ? 'visibility' : 'visibility_off'"
                        :type="e1 ? 'password' : 'text'"
                        :rules="passwordRules"
                        counter
                        required
                        @click:append="e1 = !e1"
                        v-on:keyup.enter="submit"
                      ></v-text-field>
                    </v-layout>
                    <v-layout justify-end class="mt-2">
                      <v-flex class="mt-2">
                        <router-link v-bind:to="'/forgot-password'">Lupa Password</router-link>
                      </v-flex>
                      <v-btn
                        @click="submit"
                        :class=" { 'primary white--text' : valid}"
                        :disabled="!valid"
                        color="#e4e4e4"
                        style="color:#fff"
                      >Login</v-btn>

                      <v-dialog v-model="loader" hide-overlay persistent width="300">
                        <v-card color="primary" dark>
                          <v-card-text>
                            Please stand by
                            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                          </v-card-text>
                        </v-card>
                      </v-dialog>

                      <v-dialog v-model="activate" :hide-overlay="false" persistent width="400">
                        <v-card>
                          <v-card-title>
                            <h3>Please check your email for account activation before login.</h3>
                          </v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn small fab color="red" @click="activate = false">
                              <v-icon>close</v-icon>
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
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
import notif from "@/config/alerthandling";
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
      err_msg: { details: [""] },
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
        v => !!v || "E-mail is required",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      activate: this.$route.query.activate
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
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.response = res.data.data;
          authUser.data = res.data.data;
          authUser.role_id = "TALENT";
          authUser.token = res.data.credentials.token;
          authUser.valid_until = res.data.credentials.valid_until;
          this.$store.state.isLoggedIn = true;
          window.localStorage.setItem("lbUser", JSON.stringify(authUser));
          this.$router.replace("/talent/dashboard");
        })
        .catch(error => {
          console.log(error);
          notif.showError(this, error);
        })
        .finally(() => {
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
#loginpage {
  background-image: url("/img/back.jpg") !important;
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  height: 100%;
}
</style>
