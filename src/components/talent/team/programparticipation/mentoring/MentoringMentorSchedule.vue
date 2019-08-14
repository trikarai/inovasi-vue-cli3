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
    {{mentorSession}}
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
            color="blue"
          >
            <template v-slot:day="{ date }">
              <template v-for="event in eventsMap[date]">
                <v-menu :key="event.id" v-model="event.open" full-width offset-x>
                  <template v-slot:activator="{ on }">
                    <div
                      v-if="!event.time"
                      v-ripple
                      class="my-event"
                      v-on="on"
                      v-html="event.status"
                    ></div>
                  </template>
                  <v-card color="grey lighten-4" min-width="350px" text>
                    <v-toolbar color="primary" dark>
                      <v-btn icon>
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-toolbar-title v-html="event.title"></v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn icon>
                        <v-icon>favorite</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-title primary-title>
                      <span v-html="event.title"></span>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn text color="secondary">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </template>
            </template>
          </v-calendar>
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
        total: 5,
        list: [
          {
            id: "mentoring session 1 id",
            status: "proposed",
            startTime: "2019-08-11",
            endTime: "2019-08-11 09:53:08"
          },
          {
            id: "mentoring session 2 id",
            status: "scheduled",
            startTime: "2019-08-12",
            endTime: "2019-08-12 09:53:08"
          },
          {
            id: "mentoring session 3 id",
            status: "offered",
            startTime: "2019-08-13",
            endTime: "2019-08-13 09:53:08"
          },
          {
            id: "mentoring session 4 id",
            status: "scheduled",
            startTime: "2019-08-14",
            endTime: "2019-08-14 09:53:08"
          },
          {
            id: "be2698f6-107d-4216-94d1-1dc9365a22fd",
            status: "cancelled",
            startTime: "2019-08-14",
            endTime: "2019-08-14 14:06:00"
          }
        ]
      },
      events: [
        {
          title: "Vacation",
          details: "Going to the beach!",
          date: "2019-08-30 11:11:00",
          open: false
        },
        {
          title: "Vacation",
          details: "Going to the beach!",
          date: "2019-08-31",
          open: false
        },
        {
          title: "Vacation",
          details: "Going to the beach!",
          date: "2019-08-01",
          open: false
        },
        {
          title: "Meeting",
          details: "Spending time on how we do not have enough time",
          date: "2019-08-07",
          open: false
        },
        {
          title: "30th Birthday",
          details: "Celebrate responsibly",
          date: "2019-08-03",
          open: false
        },
        {
          title: "New Year",
          details: "Eat chocolate until you pass out",
          date: "2019-08-01",
          open: false
        },
        {
          title: "Conference",
          details:
            "Mute myself the whole time and wonder why I am on this call",
          date: "2019-08-21",
          open: false
        },
        {
          title: "Hackathon",
          details: "Code like there is no tommorrow",
          date: "2019-09-01",
          open: false
        }
      ]
    };
  },
  components: {
    "notification-alert": Notification
  },
  created: function() {},
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      this.mentorSession.list.forEach(e => (map[e.startTime] = map[e.startTime] || []).push(e));
      return map;
    }
  },
  mounted: function() {
    // this.getMentorSession();
  },
  methods: {
    open(event) {
      alert(event.title);
    },
    getMentorSession: function() {
      notif.reset(this);
      this.loader2 = true;
      net
        .getData(
          this,
          "/talent/programmes/"+this.$store.state.programId+"/mentors/" +
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