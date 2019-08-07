<template>
<v-app>
  <div id="aacc">  
      <v-layout align-center justify-center>
        <!-- <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" /> -->
      </v-layout>
      <v-dialog v-model="loader" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Please stand by
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 elevation-12>
            <!-- <v-toolbar class="pt-5 darken-4" color="#8bc751">
              <v-toolbar-title class="white--text">
                <h4>{{$route.name}}</h4>
              </v-toolbar-title>
            </v-toolbar> -->
            <v-card style="padding:30px" v-if="status.error">
              <!-- <v-card-text class="pt-4">
                <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
              </v-card-text> -->
              <v-card-action>
                <v-btn color="blue" @click="resendAccount">
                  <v-icon small left>autorenew</v-icon>Resend Activation
                </v-btn>
              </v-card-action>
            </v-card>
            <!-- card sucsess response -->
            <v-card style="padding:30px" v-if="status.success">
              <div class="face text-center">
                <v-icon style="font-size:128px;" color="omikti">check</v-icon>
              </div>                
              <div class="shadow scale"></div>
              <v-text>
                <h1 class="text-center mt-3">Aktifasi Sukses</h1>
              </v-text>
              <v-card-text class="text-center">Terima Kasih! Anda bisa mencoba untuk login</v-card-text>
              <v-card-action>
                <v-btn block color="primary" to="/login">
                  Login
                </v-btn>
              </v-card-action>
            </v-card>

            <v-card v-if="status.info">
              <v-card-title>Activation Resend</v-card-title>
              <v-card-text>
                <!-- <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" /> -->
                <br />Check email for activation link
              </v-card-text>
              <v-card-action></v-card-action>
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
      err_msg: { details: [""] },
      status: {
        success: true,
        error: false,
        info: false,
        warning: false
      },
      params: ""
    };
  },
  created: function() {},
  mounted: function() {
    // this.activateAccount();
  },
  components: {
    "notification-alert": Notification
  },
  computed: {},
  methods: {
    activateAccount: function() {
      this.loader = true;
      notif.reset(this);
      net
        .putDataPublic(
          this,
          "/talent-account-control/activate?email=" +
            this.$route.params.email +
            "&activationCode=" +
            this.$route.params.activationCode
        )
        .then(res => {
          notif.showInfo(this, res, "Activated");
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    resendAccount: function() {
      this.loader = true;
      this.status.error = false;
      this.status.success = false;
      this.status.info = false;
      net
        .putDataPublic(
          this,
          "/talent-account-control/regenerate-activation-code",
          { email: this.$route.params.email }
        )
        .then(res => {
          notif.showInfo(this, res, "Code Resend");
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
#aacc {
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
