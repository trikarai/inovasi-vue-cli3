<template>
  <v-container>
    <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
     
    <loader-dialog v-model="loader"></loader-dialog>

    <v-layout row>
      <v-flex x12 md6 lg6>
        <v-card class="pb-5" style="margin:15px 15px 15px 15px;">
          <v-card class="taitel primary white--text elevation-5">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-light white--text title"
                  >{{ $vuetify.lang.t('$vuetify.team.addMember') }} </v-list-item-title>
                </v-list-item-content>   
              </v-list-item>
          </v-card>

          <v-card-text>
            <v-text-field
              v-model="search"
              hint="example : guest@gmail.com"
              append-icon="search"
              label="Search Talent by email"
              @input="isTyping = true"
              style="max-width:400px;margin:0 auto;"
              persistent-hint
            ></v-text-field>
          </v-card-text>
          <v-card-text class="text-center">
              <v-chip v-show="talent === null" class="caption" color="omikti" dark small>No talent found</v-chip>
              <v-chip v-show="talent != null" class="caption" color="blue" dark small>Talent found</v-chip>
          </v-card-text>
              
        </v-card>
      </v-flex>
      
      <v-flex x12 md6 lg6>
        <v-card
          class="mx-auto"
          max-width="400"
          outlined
          v-show="talent != null"
          style="margin-top:15px;"
        >
          <v-list-item three-line>
            <template v-if="!async">
              <template v-if="talent != null">
                <v-list-item-content>
                  <div class="overline mb-4">{{talent.name}}</div>
                  <v-list-item-title class="headline mb-1">{{talent.email}}</v-list-item-title>
                  <v-list-item-subtitle><v-icon left>cake</v-icon> {{talent.birthdate}}</v-list-item-subtitle>
                  <v-list-item-subtitle><v-icon left>wc</v-icon> {{talent.gender.displayName}}</v-list-item-subtitle>
                  <v-list-item-subtitle><v-icon left>location_city</v-icon> {{talent.cityOfOrigin}}</v-list-item-subtitle>
                  <v-list-item-subtitle><v-icon left>my_location</v-icon> {{talent.region.name}}</v-list-item-subtitle>
                </v-list-item-content>

                

                <v-list-item-avatar>
                  <v-icon x-large>person</v-icon>
                </v-list-item-avatar>
              </template>
            </template>
          </v-list-item>

          <v-card-actions>
            <v-form v-model="valid" ref="form" v-if="talent !== null">
                  <v-layout>
                    <!-- <v-flex xs12 md4>
                      <v-text-field
                        v-model="position"
                        :rules="nameRules"
                        :counter="10"
                        label="Position"
                        required
                      ></v-text-field>
                    </v-flex>-->
                    <!-- Hustler / Hacker / Hispter -->
                    <v-flex xs12>
                      <v-combobox
                        class="ml-3 mb-3"
                        required
                        :rules="nameRules"
                        v-model="position"
                        :items="item"
                        chips
                        :label="$vuetify.lang.t('$vuetify.team.position')"
                      ></v-combobox>
                    </v-flex>
                  </v-layout>
                </v-form><br>
            
          </v-card-actions>
          <v-btn
              @click="validate"
              :class=" { 'primary white--text' : valid}"
              :disabled="!valid"
              class="ma-5"
              max-width="350"
            >
              <v-icon left>how_to_reg</v-icon>Invite to Team
            </v-btn>

        </v-card>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Vue from "vue";
import VueLodash from "vue-lodash";
const options = { name: "lodash" }; // customize the way you want to call it

import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";

Vue.use(VueLodash, options); // options is optional

export default {
  components: {
    "notification-alert": Notification
  },
  data() {
    return {
      loader: false,
      isTyping: false,
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      async: false,
      err_msg: { details: [""] },
      search: "",
      talent: null,
      position: "",
      valid: false,
      nameRules: [v => !!v || "Position is required"],
      item: ["Hustler", "Hacker", "Hipster"]
    };
  },
  watch: {
    search: Vue._.debounce(function() {
      this.isTyping = false;
    }, 1000),
    isTyping: function(value) {
      if (!value) {
        this.getTalent();
      }
    }
  },
  methods: {
    getTalentTimeOut: function() {
      setTimeout(() => {
        this.getTalent();
      }, 1000);
    },
    getTalent: function() {
      this.async = true;
      net
        .getData(this, "/talent/other-talent/?email=" + encodeURI(this.search))
        .then(res => {
          
          if (res.data) {
            this.talent = res.data.data;
            notif.showInfo(this, res);
          } else {
            this.talent = null;
          }
        })
        .catch(error => {
          
          this.talent = null;
          //   alert.showError(this, error);
        })
        .finally(() => {
          this.async = false;
        });
    },
    validate: function() {
      if (this.$refs.form.validate()) {
        this.inviteTalent();
      }
    },
    inviteTalent: function() {
      this.loader = true;
      notif.reset(this);
      net
        .postData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.membershipId +
            "/members",
          {
            talentId: this.talent.id,
            position: this.position
          }
        )
        .then(res => {
          notif.showInfo(this, res, ["Talent Invited"]);
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
.taitel {
  padding: 14px;
  width: 90%;
  margin: 0 auto;
  bottom: 27px;
  z-index: 2;
}
</style>
