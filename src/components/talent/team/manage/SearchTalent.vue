<template>
  <v-container>
    <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
    <v-dialog v-model="loader" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-layout>
      <v-flex x12 md12 lg12>
        <v-card>
          <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search Talent by email"
              @input="isTyping = true"
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-progress-circular v-if="async" indeterminate color="primary"></v-progress-circular>
            <div v-if="!async">
              <span v-if="talent === null">No talent found</span>
              <span v-else>
                {{talent.name}}
                <br />
                {{talent.username}}
                <br />
                {{talent.email}}
                <br />
                {{talent.birthdate}}
                <br />
                {{talent.cityOfOrigin}}
                <br />
                {{talent.region.name}}
                <br />
                {{talent.gender.displayName}}
                <br />
              </span>
              <!-- <v-card-actions v-if="talent !== null"> -->
            </div>
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
                    required
                    :rules="nameRules"
                    v-model="position"
                    :items="item"
                    chips
                    :label="$vuetify.lang.t('$vuetify.team.position')"
                  ></v-combobox>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions v-if="talent !== null">
            <v-btn
              @click="validate"
              :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
            >
              <v-icon left>how_to_reg</v-icon>Invite to Team
            </v-btn>
          </v-card-actions>
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
          console.log(res);
          if (res.data) {
            this.talent = res.data.data;
            notif.showInfo(this, res);
          } else {
            this.talent = null;
          }
        })
        .catch(error => {
          console.log(error);
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
