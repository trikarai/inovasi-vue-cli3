<template>
  <div id="app">
    <v-app>
      <v-layout align-center justify-center>
        <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status"/>
      </v-layout>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 elevation-12>
            <v-toolbar class="pt-5 darken-4" color="#8bc751">
              <v-toolbar-title class="white--text">
                <h4>{{$route.name}}</h4>
              </v-toolbar-title>
            </v-toolbar>
            <v-card>
              <v-card-text class="pt-4">
                <div>
                  <v-form v-model="valid" ref="form">
                    <v-text-field
                      label="Enter your username"
                      v-model="params.username"
                      append-icon="vpn_key"
                      :rules="required"
                    ></v-text-field>
                    <v-text-field
                      label="Enter your email"
                      v-model="params.email"
                      :rules="emailRules"
                      append-icon="email"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Enter your password"
                      v-model="params.password"
                      min="8"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e1 = !e1)"
                      :type="e1 ? 'password' : 'text'"
                      :rules="passwordRules"
                      counter
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Confirm password"
                      v-model="cpassword"
                      min="8"
                      :append-icon="e2 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e2 = !e2)"
                      :type="e2 ? 'password' : 'text'"
                      :rules="passwordConfirmationRules"
                      counter
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Enter your Name"
                      v-model="params.name"
                      append-icon="person"
                      :rules="required"
                      required
                    ></v-text-field>
                    <v-text-field
                      mask="(###) #### #####"
                      label="Enter your Phone"
                      v-model="params.phone"
                      append-icon="phone"
                      :rules="phoneRules"
                      persistent-hint
                      hint="08xxxxx"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Enter your City of Origin"
                      v-model="params.cityOfOrigin"
                      append-icon="location_city"
                      :rules="required"
                      required
                    ></v-text-field>
                    <v-radio-group v-model="params.gender" row>
                      <v-radio label="Male" value="l" color="primary"></v-radio>
                      <v-radio label="Female" value="p" color="primary"></v-radio>
                    </v-radio-group>
                    <v-autocomplete
                      v-model="params.Region_id"
                      label="Region"
                      :items="region.list"
                      item-text="name"
                      item-value="id"
                      required
                    ></v-autocomplete>

                    <v-layout justify-space-between>
                      <v-btn
                        @click="validate"
                        :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                      >{{ $vuetify.t('$vuetify.info.signup')}}</v-btn>

                      <v-dialog v-model="loader" hide-overlay persistent width="300">
                        <v-card color="primary" dark>
                          <v-card-text>
                            {{ $vuetify.t('$vuetify.info.standby')}}
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
    </v-app>
  </div>
</template>
<script>
import net from "@/config/httpclient";
import Notification from "@/components/Notification";

export default {
  name: "SignUp",
  data: function() {
    return {
      loader: false,
      response: "",
      valid: false,
      alert: false,
      err_msg: { code: 0, type: "", error_details: [] },
      e1: false,
      e2: false,
      params: {
        username: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        cityOfOrigin: "",
        birthDate: "",
        gender: "",
        Region_id: ""
      },
      cpassword: "",
      region: {
        total: 0,
        list: []
      },
      required: [v => !!v || "Required"],
      phoneRules: [
        v => !!v || "Phone Number is required",
        v => /\d/ || "Number Only"
      ],
      passwordRules: [v => !!v || "Password is required"],
      passwordConfirmationRules: [
        v => !!v || "Confirmation Password is required",
        () =>
          this.cpassword === this.params.password || "Password does not match"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ]
    };
  },
  components: {
    "notification-alert": Notification
  },
  created: function() {},
  mounted: function() {
    this.getRegionList();
  },
  methods: {
    validate: function() {
      if (this.$refs.form.validate()) {
        this.submitData();
      } else {
        this.$vuetify.goTo(this.$refs.notif, {
          duration: 500,
          offset: 0,
          easing: "linear"
        });
      }
    },
    submitData: function() {
      var app = this;
      this.loader = true;
      this.status.error = false;
      this.status.success = false;
      net
        .postDataPublic(this, "/talent-signup", this.params)
        .then(
          res => {
            console.log(res);
            this.$router.push({ path: "/login" });
          },
          error => {
            console.log(error);
            this.err_msg = error.body.meta;
            this.alert = true;
          }
        )
        .catch(function(error) {
          console.log(error);
          app.err_msg = error.body.meta;
          app.alert = true;
        })
        .finally(function() {
          this.loader = false;
        });
    },
    getRegionList: function() {
      var app = this;
      net
        .getDataPublic(this, "/regions")
        .then(
          res => {
            if (res.data.data) {
              this.region = res.data.data;
            } else {
              this.region.list = [];
            }
          },
          error => {
            console.log(error);
            app.err_msg = error.body.meta;
            app.alert = true;
          }
        )
        .catch(function(error) {
          console.log(error);
          app.err_msg = {
            error_details: ["API ERROR"],
            type: "API Error",
            code: 666
          };
          app.alert = true;
        })
        .finally(function() {});
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

