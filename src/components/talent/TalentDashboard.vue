<template>
  <v-container>
    <notification ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
    <loader-dialog v-model="loader" />
    <v-layout>
      <v-flex md6>
        <!-- Team Id : {{teamId}} -->
        <!-- <pre>{{team.list}}</pre> -->
        <v-select
          v-model="teamId"
          :items="team.list"
          :no-data-text="$vuetify.lang.t('$vuetify.noDataText')"
          :loading="loader"
          item-text="team.name"
          item-value="team.id"
          :label="$vuetify.lang.t('$vuetify.team.team')"
          outlined
          class="pr-3"
          @change="changeTeam"
        ></v-select>
      </v-flex>
      <v-flex md6>
        <!-- {{teamId}} -->
        <v-select
          v-model="dashboardMode"
          :items="dashboard"
          item-text="text"
          item-value="value"
          :cache-items="true"
          label="Dashboard Mode"
          readonly
          disabled
          outlined
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <div v-html="error.body"></div>
      </v-flex>
    </v-layout>

    <dashboard-timeline v-if="dashboardMode== '1'" v-bind:teamId="teamId" />
    <dashboard-stepper v-if="dashboardMode == '2'" />
  </v-container>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";

import DashboardStepper from "@/components/talent/dashboard/stepper/BaseStepper";
import DashboardTimeline from "@/components/talent/dashboard/timeline/BaseTimeline";

export default {
  data: () => ({
    team: { total: 0, list: [] },
    dashboard: [
      {
        text: "Timeline",
        value: 1
      }
      // {
      //   text: "Stepper",
      //   value: 2
      // },
    ],
    teamId: "",
    dashboardMode: 1,
    loader: false,
    status: {
      success: false,
      error: false,
      info: false,
      warning: false
    },
    error: "",
    err_msg: { details: [""] }
  }),
  components: {
    DashboardStepper,
    DashboardTimeline,
    Notification
  },
  mounted: function() {
    this.getTeamMembership();
  },
  methods: {
    changeTeam: function(id) {
      localStorage.teamId = id;
      this.teamId = id;
    },
    getTeamMembership: function() {
      this.loader = true;
      notif.reset(this);
      net
        .getData(this, "/talent/team-memberships?status[]=act")
        .then(res => {
          if (res.data.data) {
            this.team = res.data.data;
            if (localStorage.teamId) {
              this.teamId = localStorage.teamId;
            } else {
              this.teamId = this.team.list[0].team.id;
            }
          } else {
            this.team = { total: 0, list: [] };
          }
        })
        .catch(error => {
          
          this.error = error;
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
</style>
