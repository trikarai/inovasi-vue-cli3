<template>
  <div id="app">
    <v-app>
      <v-layout align-center justify-center>
        <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
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

                    <v-flex xs12>
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="params.birthDate"
                            :label="$vuetify.t('$vuetify.profile.birthDate')"
                            prepend-icon="cake"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          :locale="$vuetify.lang.current"
                          v-model="params.birthDate"
                          @input="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>
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
                      v-model="params.regionId"
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
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";

export default {
  name: "SignUp",
  data: function() {
    return {
      loader: false,
      response: "",
      status: {
        error: false,
        success: false,
        warning: false,
        info: false
      },
      valid: false,
      alert: false,
      err_msg: { code: 0, type: "", error_details: [""] },
      menu1: false,
      menu2: false,
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
        regionId: ""
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
      notif.reset(this);
      this.loader = true;
      net
        .postDataPublic(this, "/talent-signup", this.params)
        .then(res => {
          this.$router.push({ path: "/login" });
        })
        .catch(error => {
          notif.showError(this, error);
          this.$vuetify.goTo(this.$refs.notif, {
            duration: 500,
            offset: 0,
            easing: "linear"
          });
        })
        .finally(() => {
          this.loader = false;
        });
    },
    getRegionList: function() {
      var app = this;
      net
        .getDataPublic(this, "/regions")
        .then(res => {
          if (res.data.data) {
            this.region = res.data.data;
          } else {
            this.region.list = [];
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {});
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

