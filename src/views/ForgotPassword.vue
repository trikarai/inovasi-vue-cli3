<template>
<v-app>
  <div id="fpass">
      <v-layout align-center justify-center>
        <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
      </v-layout>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 elevation-12>
            <!-- <v-toolbar class="pt-5 darken-4" color="#8bc751" v-if="!status.success">
              <v-toolbar-title class="white--text">
                <h4>{{$route.name}}</h4>
              </v-toolbar-title>
            </v-toolbar> -->
            <v-toolbar class="pt-2" color="primary" v-if="!status.success">
              <v-img src="/img/miktilampu.png" style="position: relative;bottom: 5px;" aspect-ratio="1" max-width="30px"></v-img>
              <v-toolbar-title class="white--text ml-2">
                 <h4>MIKTI <v-chip>S t a r t</v-chip></h4>
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
            <v-card style="padding:20px 30px 30px 30px;" v-if="!status.success">
              <h3 class="font-weight-light mt-4 mb-1 text-center">{{$route.name}}</h3>
              <v-card-text class="pt-4">
                <div>
                  <v-form v-model="valid" ref="form">
                    <v-text-field
                      label="Enter your email"
                      prepend-icon="email"
                      v-model="params.email"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                    <v-layout justify-space-between>
                      <v-btn class="mt-3"
                        @click="submit"
                        :class=" { 'primary white--text' : valid}"
                        :disabled="!valid"
                        color="#e4e4e4"
                        style="color:#fff"
                        block
                      >Submit</v-btn>

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
                        <v-icon style="font-size:128px;" color="omikti">email</v-icon>
                      </div>
                      
                      <div class="shadow scale"></div>
              <v-text>
                <h1 class="text-center mt-3">Success</h1>
              </v-text>
              <v-card-text>Thank you! Please check your email for the reset link.</v-card-text>
              <v-card-action>
                 <v-btn block dark color="bmikti" style="text-decoration:none !important":href="'https://'+getEmailDomain"> go to {{getEmailDomain}}</v-btn> 
              </v-card-action>
              
            </v-card>
            
          </v-flex>
          <!-- <div id="wrapcontain" v-if="status.success">
                  <div id="success-box">
                      <div class="dot"></div>
                      <div class="dot two"></div>
                      <div class="face">
                        <i class="fa fa-envelope-open-o mailpos"></i>
                      </div>
                      
                      <div class="shadow scale"></div>
                      <div class="message" style="text-align: center;position: relative;top: 200px;"><sc class="alertinfo">Success!</sc><h4 style="color: #565656;font-size:12px">Reset Password Link has been send to your email</h4></div>
                      <router-link :to="'/'">
                          <button class="button-box"><sc class="green">login</sc></button>
                      </router-link>
                    </div>
              </div> -->
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
      err_msg: {details:[""]},
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      domain: "",
      params: {
        email: ""
      },
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ]
    };
  },
  created: function() {},
  mounted: function() {},
  components: {
    "notification-alert": Notification
  },
  computed: {
    getEmailDomain: function() {
      return this.params.email.replace(/.*@/, "");
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.forgotPassword();
      }
    },
    forgotPassword: function() {
      this.loader = true;
      this.status.error = false;
      this.status.success = false;
      net
        .putDataPublic(
          this,
          "/talent-account-control/generate-reset-password-code",
          this.params
        )
        .then(res => {
                   notif.showSuccess(this, res, ["Reset Code Sent"])

        })
        .catch(error => {
                    notif.showError(this, error);

        })
        .finally(()=> {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
#fpass {
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
  top: 43%;
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
