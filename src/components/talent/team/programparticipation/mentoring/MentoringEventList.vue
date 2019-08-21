<template>
  <v-container>
    <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
    
    <loader-dialog v-model="loader"></loader-dialog>

    <v-dialog content-class="operplow" v-model="dialogDetail" max-width="400">
      
      <v-card>
        <v-card class="taitel2 primary white--text elevation-5">
              <!-- <v-btn style="float:right;left: 20px;bottom: 20px;" small fab color="white" text @click="dialogDetail = false">
                  <v-icon small>close</v-icon>
              </v-btn> -->
              <h3 class="headline mb-0 font-weight-light">View Mentoring Event Detail</h3>
        </v-card>
        
        
        <!-- <v-card-title class="headline taitel primary white--text mb-5">Mentoring Event Detail</v-card-title> -->
        <v-card-text v-if="loaderDetail">
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-card-text>
        <v-card-text v-else>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Name</v-list-item-title>
              <v-list-item-subtitle>{{eventDetail.name}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Session Duration</v-list-item-title>
              <v-list-item-subtitle>{{eventDetail.sessionDuration}} Minutes</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- desktop layout-->
    <!-- <v-layout hidden-sm-and-down> -->
    <v-layout>
      <v-flex md6>
        <v-data-table
          :loading="loader"
          :headers="headers"
          :items="event.list"
          :server-items-length="event.total"
          class="elevation-1"
        >
          <template v-slot:item.action="{item}">
              <v-btn small color="primary" @click="gotoMentorList(item.id)" class="ma-1">
                <v-icon left small>check</v-icon> Choose
              </v-btn>
              <v-btn small @click="viewEvent(item.id)">
                <v-icon left small>search</v-icon> View
              </v-btn>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <!-- mobile layout-->
    <v-layout hidden-md-and-up>
      <!-- fucking mobile -->
    </v-layout>
  </v-container>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";
export default {
  data() {
    return {
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: { details: [""] },
      loader: false,
      loader2: false,
      dialogDetail: false,
      loaderDetail: false,
      event: {
        total: 0,
        list: []
      },
      eventDetail: {
        id: "",
        name: "name placeholder",
        sessionDuration: "session place holder"
      },
      headers: [
        {
          text: "Mentoring Event",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Actions", value: "action", sortable: false, align: "right" }
      ]
    };
  },
  components: {
    "notification-alert": Notification
  },
  created: function() {},
  mounted: function() {
    this.getDataList();
  },
  methods: {
    gotoMentorList: function(id) {
      this.$router.push({
        path:
          "/talent/team/" +
          this.$route.params.teamId +
          "/participation/" +
          this.$route.params.participationId +
          "/mentoring-event/" +
          id +
          "/mentor-list"
      });
    },
    getDataList: function() {
      this.loader = true;
      notif.reset(this);
      net
        .getData(
          this,
          "/talent/programmes/" + this.$store.state.programId + "/mentorings"
        )
        .then(res => {
          if (res.data.data) {
            this.event = res.data.data;
          } else {
            this.event = { total: 0, list: [] };
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    viewEvent: function(id) {
      this.dialogDetail = true;
      this.loaderDetail = true;
      net
        .getData(
          this,
          "/talent/programmes/" +
            this.$store.state.programId +
            "/mentorings/" +
            id
        )
        .then(res => {
          this.eventDetail = res.data.data;
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loaderDetail = false;
        });
    }
  }
};
</script>
<style>
.taitel2 {
  padding: 24px;
  width: 90%;
  margin: 0 auto;
  bottom: 27px;
  z-index: 2;
}
.operplow {
    overflow-y: visible !important;
}
</style>
