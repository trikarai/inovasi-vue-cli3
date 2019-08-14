<template>
  <div>
    <v-container>
      <notification-alert v-bind:err_msg="err_msg" v-bind:status="status"/>
      <v-layout>
        <v-dialog v-model="loader" hide-overlay persistent width="300">
          <v-card color="primary" dark>
            <v-card-text>
              {{ $vuetify.lang.t('$vuetify.info.standby') }}
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-flex xs12>
          <v-card>
            <v-sheet class color="primary" height="70">
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-btn
                  outline
                  color="accent"
                  @click="editProfile()"
                >{{ $vuetify.lang.t('$vuetify.action.edit') }} {{ $vuetify.lang.t('$vuetify.profile.profile')}}</v-btn>
                <v-btn
                  outline
                  color="accent"
                  @click="editPassword()"
                >{{ $vuetify.lang.t('$vuetify.action.edit') }} {{ $vuetify.lang.t('$vuetify.profile.password')}}</v-btn>
              </v-card-actions>
            </v-sheet>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{data.name}}</h3>
                <div>
                  <span class="subheading">{{ $vuetify.lang.t('$vuetify.profile.username')}}</span> :
                  <span class="body-2">{{data.username}}</span>
                  <br>
                  <span class="subheading">{{ $vuetify.lang.t('$vuetify.profile.email')}}</span> :
                  <span class="body-2">{{data.email}}</span>
                  <br>
                  <span class="subheading">{{ $vuetify.lang.t('$vuetify.profile.phone')}}</span> :
                  <span class="body-2">{{data.phone}}</span>
                  <br>
                  <span class="subheading">{{ $vuetify.lang.t('$vuetify.profile.cityOfOrigin')}}</span> :
                  <span class="body-2">{{data.cityOfOrigin}}</span>
                  <br>
                  <span class="subheading">{{ $vuetify.lang.t('$vuetify.profile.birthDate')}}</span> :
                  <span class="body-2">{{data.birthDate}}</span>
                  <br>
                  <span class="subheading">{{ $vuetify.lang.t('$vuetify.profile.gender')}}</span> :
                  <span class="body-2">{{data.gender.value}}</span>
                  <br>
                </div>
              </div>
            </v-card-title>
          </v-card>

          <profile-form
            v-bind:data="data"
            v-bind:edit="edit"
            v-if="dialogForm"
            @refresh="refresh"
            @close="dialogForm = false"
          />
          <password-form v-if="dialogPassword" @close="dialogPassword = false"/>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <v-layout>

      </v-layout>
    </v-container>
  </div>
</template>
<script>
import net from "@/config/httpclient";
import auth from "@/config/auth";
import Notification from "@/components/Notification";
import ProfileForm from "@/components/talent/profile/ProfileForm";
import PasswordForm from "@/components/talent/profile/PasswordForm";

export default {
  data: function() {
    return {
      error_msg: "",
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
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
      }
    };
  },
  components: {
    "notification-alert": Notification,
    "profile-form": ProfileForm,
    "password-form": PasswordForm
  },
  methods: {
    getProfile: function() {
      this.loader = true;
      net
        .getData(this, "/talent/profile")
        .then(
          res => {
            this.data = res.data.data;
          },
          error => {
            console.log(error);
            this.error_msg = error.body.meta;
          }
        )
        .catch(function(error) {})
        .finally(function() {
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
