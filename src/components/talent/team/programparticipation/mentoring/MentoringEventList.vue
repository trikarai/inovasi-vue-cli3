<template>
  <v-container>
    <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
    <v-dialog v-model="loader2" :hide-overlay="false" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{ $vuetify.t('$vuetify.info.standby') }}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDetail" max-width="350">
      <v-card>
        <v-card-title class="headline">Mentoring Event Detail</v-card-title>
        <v-card-text v-if="loaderDetail">
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-card-text>
        <v-card-text v-else>
          Name : {{eventDetail.name}}
          <br />
          Session Duration : {{eventDetail.sessionDuration}} Minutes
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small fab color="red" text @click="dialogDetail = false">
            <v-icon>close</v-icon>
          </v-btn>
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
          :total-items="event.total"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td>
              <v-btn small color="primary" round @click="gotoMentorList(props.item.id)">
                <v-icon left small>today</v-icon>Propose
              </v-btn>
              <v-btn small round @click="viewEvent(props.item.id)">
                <v-icon left small>search</v-icon>View
              </v-btn>
            </td>
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
        { text: "", value: "id", sortable: false }
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

