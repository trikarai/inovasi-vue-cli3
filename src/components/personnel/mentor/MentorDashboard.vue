<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm12 md5>
        <v-select
          :items="user.data.programmeMentorships"
          item-text="programme.name"
          item-value="id"
          :no-data-text="$vuetify.lang.t('$vuetify.noDataText')"
          v-model="mentorship"
          :label="$vuetify.lang.t('$vuetify.program.program')"
          outlined
          return-object
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md3>
        <v-card height="130" elevation="3" class="ml-3 mt-5 mr-3">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-card elevation="5" class="colacard pa-5 text-center" dark color="primary">
                  <v-icon large>chat_bubble_outline</v-icon>
                </v-card>
              </v-list-item-content>

              <v-list-item-icon>
                <v-list-item-title class="title font-weight-regular">Mentoring</v-list-item-title>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
          <v-divider class="mb-0"></v-divider>
          <v-list class="mt-0 text-center">
            <v-btn :disabled="mentorshipId == ''" @click="gotoMentoring" text small class="caption text-center">
              <v-icon left>search</v-icon>view
            </v-btn>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 md3>
        <v-card elevation="3" height="130" class="ml-3 mt-5 mr-3">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-card elevation="5" class="colacard pa-5 text-center" dark color="primary">
                  <v-icon large>share</v-icon>
                </v-card>
              </v-list-item-content>

              <v-list-item-icon>
                <v-list-item-title class="title font-weight-regular">Collaboration</v-list-item-title>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
          <v-divider class="mb-0"></v-divider>
          <v-list class="mt-0 text-center">
            <v-btn :disabled="programId == ''" @click="gotoCollaboration" text small class="caption text-center">
              <v-icon left>search</v-icon>view
            </v-btn>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import auth from "@/config/auth";

export default {
  data: function() {
    return {
      user: "",
      programId: "",
      mentorship: "",
      mentorshipId: ""
    };
  },
  watch: {
    mentorship: function() {
      this.mentorshipId = this.mentorship.id;
      this.programId = this.mentorship.programme.id;
    }
  },
  created: function() {
    this.user = JSON.parse(auth.getAuthData());
  },
  methods: {
    gotoMentoring: function() {
      this.$router.push({
        path: "/mentor/program/" + this.mentorshipId + "/mentoring"
      });
    },
    gotoCollaboration: function() {
      this.$router.push({
        path: "/mentor/program/" + this.programId + "/collaboration"
      });
    }
  }
};
</script>

<style scoped>
.mntrcard {
  position: absolute;
  bottom: 2px;
  left: 33px;
}
.colacard {
  position: absolute;
  bottom: -4px;
  left: 17px;
}
</style>