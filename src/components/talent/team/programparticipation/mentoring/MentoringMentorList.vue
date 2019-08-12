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

    <!-- propose dialog modal-->
    <v-dialog v-model="dialogPropose" max-width="600">
      <v-card>
        <v-card-title class="headline">Propose</v-card-title>
        <v-card-text v-if="loaderDetail">
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-card-text>
        <v-card-text v-else>
          <v-container grid-list-md>
            <v-layout wrap>
              {{proposeParams}}
              <v-flex xs12 sm12 md12>
              </v-flex>

              <v-flex xs12 sm6 md4>
                <v-textarea label="Media" v-model="proposeParams.media" required></v-textarea>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-textarea label="Note" v-model="proposeParams.note" required></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small fab color="red" text @click="dialogPropose = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end propose dialog modal-->

    <!-- desktop layout-->
    <!-- <v-layout hidden-sm-and-down> -->
    <v-layout>
      <v-flex md6>
        <v-data-table
          :loading="loader"
          :headers="headers"
          :items="mentor.list"
          :total-items="mentor.total"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.talent.name }}</td>
            <td>
              <v-btn small color="primary" round @click="proposeMentoring(props.item.id)">
                <v-icon left small>today</v-icon>Propose
              </v-btn>
              <v-btn small round>
                <v-icon left small>search</v-icon>View Schedule
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
      dialogPropose: false,
      loaderDetail: false,
      menu2: false,
      mentor: {
        total: 0,
        list: []
      },
      mentorDetail: {
        id: "",
        name: "name placeholder"
      },
      headers: [
        {
          text: "Mentor Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "", value: "id", sortable: false }
      ],
      date: "",
      time: "",
      proposeParams: {
        programmeId: "",
        mentoringId: "",
        mentorId: "",
        startTime: "",
        media: "",
        note: ""
      }
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
    getDataList: function() {
      this.loader = true;
      notif.reset(this);
      net
        .getData(this, "/talent/programmes/programme-1-id/mentors")
        .then(res => {
          if (res.data.data) {
            this.mentor = res.data.data;
          } else {
            this.mentor = { total: 0, list: [] };
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    proposeMentoring: function(id) {
      this.dialogPropose = true;
      this.proposeParams.mentorId = id;
      this.proposeParams.mentoringId = this.$route.params.eventId;
      // this.loaderDetail = true;
    }
  }
};
</script>

