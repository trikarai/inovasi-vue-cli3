<template>
<v-app>
  <div id="rpass"> 
      <v-layout align-center justify-center>
        <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
      </v-layout>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 elevation-12>
            <!-- <v-toolbar class="pt-5 darken-4" color="#8bc751">
              <v-toolbar-title class="white--text">
                <h4>{{$route.name}}</h4>
              </v-toolbar-title>
            </v-toolbar> -->

            <v-card style="padding:30px" v-if="!status.success">
              <v-card-text class="pt-4">
                <div>
                  <div class="face text-center">
                    <v-icon style="font-size:128px;" color="omikti">lock</v-icon>
                  </div>                
                  <div class="shadow scale"></div>
                  <h3 class="font-weight-light mt-5 mb-1 text-center">Reset Password</h3>
                  <v-form v-model="valid" ref="form">
                    <v-text-field
                      v-model="params.password"
                      :append-icon="show1 ? 'visibility' : 'visibility_off'"
                      :rules="[passwordRules.required, passwordRules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="New Password"
                      :label="$vuetify.lang.t('$vuetify.profile.newPassword')"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                    <v-text-field
                      v-model="cpassword"
                      :append-icon="show2 ? 'visibility' : 'visibility_off'"
                      :rules="passwordConfirmationRules"
                      :type="show2 ? 'text' : 'password'"
                      name="Confirm New Password"
                      :label="$vuetify.lang.t('$vuetify.profile.confirmPassword')"
                      hint="At least 8 characters"
                      counter
                      @click:append="show2 = !show2"
                    ></v-text-field>
                    <v-layout justify-space-between>
                      <v-btn
                        @click="submit"
                        :class=" { 'primary white--text' : valid}"
                        :disabled="!valid"
                        color="#e4e4e4"
                        style="color:#fff"
                        block
                      >Reset</v-btn>

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
            <v-card style="padding:30px" v-if="status.success">
              <div class="face text-center">
                <v-icon style="font-size:128px;" color="omikti">check</v-icon>
              </div>
              <div class="shadow scale"></div>
              <v-card-text>
                <h1 class="text-center mt-5 font-weight-light">Reset Password Sukses</h1>
              </v-card-text>
              <v-card-text class="text-center">Terima Kasih! Anda bisa mencoba untuk login</v-card-text>
              <v-card-action>
                <v-btn block color="primary" to="/login">Login</v-btn>
              </v-card-action>
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
      error: "",
      valid: false,
      alert: false,
      show1: false,
      show2: false,
      err_msg: { details: [""] },
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      domain: "",
      params: {
        password: ""
      },
      cpassword: "",
      passwordRules: {
        required: value => !!value || "Password Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      },
      passwordConfirmationRules: [
        v => !!v || "Confirmation Password is required",
        () =>
          this.cpassword === this.params.password || "Password does not match"
      ]
    };
  },
  created: function() {},
  mounted: function() {},
  components: {
    "notification-alert": Notification
  },
  computed: {},
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.resetPassword();
      }
    },
    resetPassword: function() {
      this.loader = true;
      notif.reset(this);
      net
        .putDataPublic(
          this,
          "/talent-account-control/reset-password?email=" +
            this.$route.params.email +
            "&resetPasswordCode=" +
            this.$route.params.resetPasswordCode,
          this.params
        )
        .then(res => {
          notif.showSuccess(this, res, ["Password Reset"]);
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
#rpass {
  background-image: url("/img/back.jpg") !important;
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  height: 100%
}

.face {
  animation: bounce 1s ease-in infinite;
}


.shadow {
  position: absolute;
  width: 21%;
  height: 3%;
  opacity: 0.5;
  background: #777777;
  left: 40%;
  top: 40%;
  border-radius: 50%;
  z-index: 1;
}

.scale {
  animation: scale 1s ease-in infinite;
}

.move {
  animation: move 3s ease-in-out infinite;
}



@keyframes bounce {
  50% {
    transform: translateY(-10px);
  }
}
@keyframes scale {
  50% {
    transform: scale(0.9);
  }
}
@keyframes roll {
  0% {
    transform: rotate(0deg);
    left: 25%;
  }
  50% {
    left: 60%;
    transform: rotate(168deg);
  }
  100% {
    transform: rotate(0deg);
    left: 25%;
  }
}
@keyframes move {
  0% {
    left: 25%;
  }
  50% {
    left: 60%;
  }
  100% {
    left: 25%;
  }
}
</style>
