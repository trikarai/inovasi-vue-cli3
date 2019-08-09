<template>
  <v-app>
    <v-container grid-list-md>
      <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
      <v-layout>
        <v-dialog v-model="loader" hide-overlay persistent width="300">
          <v-card color="primary" dark>
            <v-card-text>
              {{ $vuetify.t('$vuetify.info.standby') }}
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>

      <v-layout class="atastop" wrap>
        <v-flex xs12 md5>
          <v-card class="taitel primary white--text elevation-5">
            <h3 class="headline mb-0 font-weight-light">{{ $vuetify.t('$vuetify.profile.profileInformation') }}</h3>
          </v-card>
          <v-card style="padding:90px 50px 50px 50px">
            <v-form v-model="valid" ref="form">
              <!-- <v-card-title primary-title> -->
                 
                  <v-text-field
                    :disabled="true"
                    :label="$vuetify.t('$vuetify.profile.username')"
                    v-model="data.username"
                    :rules="nameRules"
                    :counter="25"
                    maxlength="25"
                    required
                  ></v-text-field>
                  <v-text-field
                    :disabled="view"
                    :label="$vuetify.t('$vuetify.profile.name')"
                    v-model="data.name"
                    :rules="nameRules"
                    :counter="25"
                    maxlength="25"
                    required
                  ></v-text-field>
                  <v-text-field
                    :disabled="view"
                    :label="$vuetify.t('$vuetify.profile.email')"
                    :rules="emailRules"
                    v-model="data.email"
                    required
                  ></v-text-field>
                  <v-text-field
                    :disabled="view"
                    :label="$vuetify.t('$vuetify.profile.phone')"
                    v-model="data.phone"
                    required
                  ></v-text-field>
                  <v-text-field
                    :disabled="view"
                    :label="$vuetify.t('$vuetify.profile.cityOfOrigin')"
                    v-model="data.cityOfOrigin"
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
                          v-model="data.birthDate"
                          :label="$vuetify.t('$vuetify.profile.birthDate')"
                          prepend-icon="cake"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :locale="$vuetify.lang.current"
                        v-model="data.birthDate"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-autocomplete
                    v-model="data.gender"
                    :label="$vuetify.t('$vuetify.profile.gender')"
                    :items="type"
                    item-text="name"
                    item-value="value"
                    required
                  ></v-autocomplete>
              <!-- </v-card-title> -->

              <v-card-actions>
                <v-btn
                  @click="validateProfile"
                  :class=" { 'primary white--text' : valid}"
                  :disabled="!valid"
                  block
                >{{$vuetify.t('$vuetify.action.update')}} {{$vuetify.t('$vuetify.profile.profile')}}</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
        <v-flex xs12 md5>
          <v-card class="taitel primary white--text elevation-5">
            <h3 class="headline mb-0 font-weight-light">{{$vuetify.t('$vuetify.action.change')}} {{ $vuetify.t('$vuetify.profile.password') }}</h3>
          </v-card>
          <v-card style="padding:68px 50px 50px 50px">
            <v-form v-model="valid2" ref="form2">
              <v-card-title primary-title>              
                  <v-text-field
                    v-model="password.previousPassword"
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :type="show1 ? 'text' : 'password'"
                    name="Previous Password"
                    :rules="passwordRules"
                    autocomplete="current-password"
                    :label="$vuetify.t('$vuetify.profile.previousPassword')"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <v-text-field
                    v-model="password.newPassword"
                    :append-icon="show2 ? 'visibility' : 'visibility_off'"
                    :type="show2 ? 'text' : 'password'"
                    name="New Password"
                    :rules="passwordRules"
                    autocomplete="new-password"
                    :label="$vuetify.t('$vuetify.profile.newPassword')"
                    hint="At least 8 characters"
                    counter
                    @click:append="show2 = !show2"
                  ></v-text-field>
                  <v-text-field
                    label="Confirm New Password"
                    v-model="cpassword"
                    min="8"
                    :append-icon="e2 ? 'visibility' : 'visibility_off'"
                    @click:append="e2 = !e2"
                    :type="e2 ? 'text' : 'password'"
                    :rules="passwordConfirmationRules"
                    autocomplete="new-password"
                    counter
                    required
                  ></v-text-field>
              </v-card-title>

              <v-card-actions>
                <v-btn
                  @click="validatePassword"
                  :class=" { 'primary white--text' : valid2}"
                  :disabled="!valid2"
                  block
                >{{$vuetify.t('$vuetify.action.update')}} {{$vuetify.t('$vuetify.profile.password')}}</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout></v-layout>
    </v-container>
  </v-app>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import auth from "@/config/auth";
import Notification from "@/components/Notification";

export default {
  data: function() {
    return {
      err_msg: { details: [""] },
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      view: false,
      e2: false,
      show1: false,
      show2: false,
      menu2: false,
      loader: false,
      dialogForm: false,
      dialogPassword: false,
      data: {
        username: "",
        name: "",
        email: "",
        phone: "",
        cityOfOrigin: "",
        birthDate: "",
        gender: {
          value: "",
          displayName: ""
        },
        signupTime: ""
      },
      password: {
        previousPassword: "",
        newPassword: ""
      },
      cpassword: "",
      valid: false,
      valid2: false,
      nameRules: [
        v => !!v || "Name is required",
        v => v.length >= 3 || "Name must be more than 3 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password Required",
        v => v.length >= 8 || "Min 8 characters"
      ],
      passwordConfirmationRules: [
        v => !!v || "Confirmation Password is required",
        () =>
          this.cpassword === this.password.newPassword ||
          "Password does not match"
      ],
      type: [
        {
          name: "Male",
          value: "l"
        },
        {
          name: "Female",
          value: "p"
        }
      ]
    };
  },
  components: {
    "notification-alert": Notification
  },
  methods: {
    getProfile: function() {
      this.loader = true;
      net
        .getData(this, "/talent/profile")
        .then(res => {
          this.data = res.data.data;
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    validateProfile() {
      if (this.$refs.form.validate()) {
        this.updateProfile();
      }
    },
    updateProfile: function() {
      this.loader = true;
      this.status.error = false;
      this.status.success = false;
      var app = this;
      net
        .putData(this, "/talent/profile/update", this.data)
        .then(res => {
          this.$emit("refresh");
          notif.showInfo(this, res, ["Profile Change Success"]);
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          app.loader = false;
          app.$vuetify.goTo(app.$refs.notif, {
            duration: 1000,
            offset: 0,
            easing: "easeInOutCubic"
          });
        });
    },
    validatePassword() {
      if (this.$refs.form2.validate()) {
        this.updatePassword();
      }
    },
    updatePassword: function() {
      this.loader = true;
      notif.reset(this);
      net
        .putData(this, "/talent/profile/change-password", this.password)
        .then(res => {
          notif.showInfo(this, res, ["Password Change Success"]);
          this.$refs.form2.reset();
          this.$refs.form2.resetValidation();
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    editProfile: function() {
      this.dialogForm = true;
      this.edit = true;
    },
    editPassword: function() {
      this.dialogPassword = true;
    },
    refresh: function() {
      this.dialogForm = false;
      this.getProfile();
    }
  },
  mounted: function() {
    this.getProfile();
  }
};
</script>

<style scoped>
.taitel {
  padding: 24px;
  width: 90%;
  margin: 0 auto;
  top: 59px;
  z-index: 2;
}
.atastop {
  bottom: 75px;
  position: relative;
}
</style>

