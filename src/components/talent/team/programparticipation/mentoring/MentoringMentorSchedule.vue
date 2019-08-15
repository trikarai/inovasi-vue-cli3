<template>
  <v-container>
    <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
    <v-dialog v-model="loader2" :hide-overlay="false" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{ $vuetify.lang.t('$vuetify.info.standby') }}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- {{mentorSession}} -->
    <v-layout wrap>
      <v-flex xs12 class="mb-3">
        <v-sheet height="500">
          <v-calendar
            ref="calendar"
            v-model="start"
            :type="type"
            :end="end"
            :now="today"
            :value="today"
            :events="mentorSession.list"
            event-name="status"
            event-start="startTime"
            event-end="endTime"
            color="blue"
          ></v-calendar>
        </v-sheet>
      </v-flex>

      <v-flex sm4 xs12 class="text-sm-left text-xs-center">
        <v-btn @click="$refs.calendar.prev()">
          <v-icon dark left>keyboard_arrow_left</v-icon>Prev
        </v-btn>
      </v-flex>
      <v-flex sm4 xs12 class="text-xs-center">
        <v-select v-model="type" :items="typeOptions" label="Type"></v-select>
      </v-flex>
      <v-flex sm4 xs12 class="text-sm-right text-xs-center">
        <v-btn @click="$refs.calendar.next()">
          Next
          <v-icon right dark>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-flex>
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
      type: "month",
      today: "2019-08-13",
      start: "2019-08-01",
      end: "2019-09-01",
      typeOptions: [
        { text: "Day", value: "day" },
        { text: "4 Day", value: "4day" },
        { text: "Week", value: "week" },
        { text: "Month", value: "month" }
      ],
      valid: false,
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      loader2: false,
      err_msg: { details: [""] },
      mentorSession: {
        total: 0,
        list: []
      }
    };
  },
  components: {
    "notification-alert": Notification
  },
  created: function() {},
  computed: {},
  mounted: function() {
    this.getMentorSession();
  },
  methods: {
    getMentorSession: function() {
      notif.reset(this);
      this.loader2 = true;
      net
        .getData(
          this,
          "/talent/programmes/" +
            this.$store.state.programId +
            "/mentors/" +
            this.$route.params.mentorId +
            "/sessions"
        )
        .then(res => {
          if (res.data.data) {
            this.mentorSession = res.data.data;
          } else {
            this.mentorSession = { total: 0, list: [] };
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader2 = false;
        });
    }
  }
};
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>