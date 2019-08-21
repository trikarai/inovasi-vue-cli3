<template>
  <v-container>
    <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
    
    <loader-dialog v-model="loader2"></loader-dialog>

    <!-- {{mentorSession}} -->
    <v-layout wrap>
      <v-btn small color="primary" class="mb-5" @click="proposeMentoring()">
        <v-icon left small>today</v-icon>Propose Mentoring
      </v-btn>

      <v-flex xs12 class="mb-3">
        <v-sheet height="500">
          <v-calendar
            ref="calendar"
            v-model="start"
            :type="type"
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

    <!-- propose dialog modal-->
    <v-dialog persistent content-class="operplow" v-model="dialogPropose" max-width="450">
      <v-form v-model="valid" ref="form">
        <v-card style="padding:0px 30px 30px 30px;">
          <v-card class="taitel2 primary white--text elevation-5">
            <v-btn style="float:right;left: 20px;bottom: 20px;" small fab color="white" text @click="dialogPropose = false">
                  <v-icon small>close</v-icon>
              </v-btn>
              <h3 class="headline mb-0 font-weight-light">Propose to Mentor</h3>
         </v-card>
          <v-card-text v-if="loaderDetail">
            <v-progress-linear :indeterminate="true"></v-progress-linear>
          </v-card-text>
          <v-card-text class="ma-0 pa-0" v-else>
            <v-container grid-list-md>
              <v-layout wrap>
                <!-- {{proposeParams}} -->
                <v-flex xs12 sm12 md6>
                  <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date"
                        label="Date"
                        prepend-icon="today"
                        readonly
                        :rules="[v => !!v || 'Date is required']"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      color="blue"
                      :locale="$vuetify.lang.current"
                      v-model="date"
                      @input="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm12 md6>
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="time"
                        label="Time"
                        prepend-icon="schedule"
                        readonly
                        :rules="[v => !!v || 'Time is required']"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      format="24hr"
                      color="blue"
                      :locale="$vuetify.lang.current"
                      v-model="time"
                    ></v-time-picker>
                  </v-menu>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-textarea
                    label="Media"
                    placeholder="whatsapp etc or an address"
                    :rules="[v => !!v || 'Media is required']"
                    v-model="proposeParams.media"
                    required
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-textarea placeholder="write here..." label="Note" v-model="proposeParams.note" required></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn
              @click="propose()"
              color="primary"
              :disabled="!valid"
              block
              v-if="!loaderDetail"
            >{{$vuetify.lang.t('$vuetify.action.add')}}</v-btn>
            <v-spacer></v-spacer>
            <!-- <v-btn small fab color="red" text @click="dialogPropose = false">
              <v-icon>close</v-icon>
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <!-- end propose dialog modal-->
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
      today: new Date(),
      start: new Date(),
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
      loaderDetail: false,
      menu1: false,
      menu2: false,
      dialogPropose: false,
      err_msg: { details: [""] },
      mentorSession: {
        total: 0,
        list: []
      },
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
  watch: {
    date: "setDateTime",
    time: "setDateTime"
  },
  created: function() {},
  computed: {},
  mounted: function() {
    this.proposeParams.programmeId = this.$store.state.programId;
    this.getMentorSession();
  },
  methods: {
    setDateTime: function() {
      this.proposeParams.startTime = this.date + " " + this.time;
    },
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
    },
    proposeMentoring: function() {
      this.dialogPropose = true;
      this.proposeParams.mentorId = this.$route.params.mentorId;
      this.proposeParams.mentoringId = this.$route.params.eventId;
    },
    propose: function() {
      if (this.$refs.form.validate()) {
        this.submitMentoring();
      }
    },
    submitMentoring: function() {
      this.loaderDetail = true;
      net
        .postData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/programme-participations/" +
            this.$route.params.participationId +
            "/mentoring-sessions",
          this.proposeParams
        )
        .then(res => {
          this.dialogPropose = false;
          this.$router.go(-2);
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