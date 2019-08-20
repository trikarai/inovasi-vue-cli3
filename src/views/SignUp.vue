<template>
  <v-app>
    <div id="signuppage">
      <v-layout align-center justify-center>
        <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
      </v-layout>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 elevation-12>
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
                <router-link v-bind:to="'/login'">
                  <v-icon class="white--text mb-2">exit_to_app</v-icon>
                </router-link>
                <router-link v-bind:to="'/'">
                  <v-icon class="white--text mb-2 ml-3">home</v-icon>
                </router-link>
              </v-toolbar-title>
            </v-toolbar>
            <v-card style="padding:20px 30px 30px 30px;">
              <h3 class="font-weight-light text-center mt-4 mb-1">Daftar</h3>
              <v-card-text class="pt-4">
                <div>
                  <v-form v-model="valid" ref="form">
                    <v-text-field
                      label="Username"
                      v-model="params.username"
                      autocomplete="username"
                      prepend-icon="person"
                      :rules="required"
                    ></v-text-field>
                    <v-text-field
                      label="Email"
                      v-model="params.email"
                      :rules="emailRules"
                      autocomplete="email"
                      prepend-icon="email"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Password"
                      v-model="params.password"
                      min="8"
                      autocomplete="new-password"
                      prepend-icon="lock"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      @click:append="e1 = !e1"
                      :type="e1 ? 'password' : 'text'"
                      :rules="passwordRules"
                      counter
                      required
                    ></v-text-field>
                    <v-text-field
                      style="padding-left: 32px;"
                      label="Confirm Password"
                      v-model="cpassword"
                      min="8"
                      autocomplete="new-password"
                      :append-icon="e2 ? 'visibility' : 'visibility_off'"
                      @click:append="e2 = !e2"
                      :type="e2 ? 'password' : 'text'"
                      :rules="passwordConfirmationRules"
                      counter
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Name"
                      autocomplete="name"
                      v-model="params.name"
                      prepend-icon="person_outline"
                      :rules="required"
                      required
                    ></v-text-field>

                    <v-flex xs12>
                      <v-menu
                        ref="menu"
                        v-model="menu"
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
                            autocomplete="bday"
                            :label="$vuetify.lang.t('$vuetify.profile.birthDate')"
                            prepend-icon="cake"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          :locale="$vuetify.lang.current"
                          v-model="params.birthDate"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @input="menu = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-text-field
                      v-mask="phoneMask"
                      label="Phone Number"
                      v-model="params.phone"
                      autocomplete="tel-local"
                      prepend-icon="phone"
                      :rules="phoneRules"
                      persistent-hint
                      hint="08xxxxx"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="City of Origin"
                      v-model="params.cityOfOrigin"
                      prepend-icon="location_city"
                      :rules="required"
                      required
                    ></v-text-field>
                    <v-radio-group v-model="params.gender" row>
                      <v-radio label="Male" value="l" color="primary"></v-radio>
                      <v-radio label="Female" value="p" color="primary"></v-radio>
                    </v-radio-group>
                    <v-autocomplete
                      prepend-icon="location_on"
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
                        block
                        :class=" { 'primary white--text' : valid}"
                        :disabled="!valid"
                        color="#e4e4e4"
                        style="color:#fff"
                      >DAFTAR</v-btn>
                      <!-- >{{ $vuetify.lang.t('$vuetify.info.signup')}}</v-btn> -->

                      <v-dialog v-model="loader" hide-overlay persistent width="300">
                        <v-card color="primary" dark>
                          <v-card-text>
                            {{ $vuetify.lang.t('$vuetify.info.standby')}}
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
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";
import { mask } from "@rj-pkgs/vue-the-mask"; 

export default {
  name: "SignUp",
  directives: { mask },
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
      menu: false,
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
      phoneMask: "(###) ##########",
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
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
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
          this.$router.push({path: "/login", query: {activate: true}})
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
#signuppage {
  background-image: url("/img/back.jpg") !important;
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  height: 100%;
}
</style>

