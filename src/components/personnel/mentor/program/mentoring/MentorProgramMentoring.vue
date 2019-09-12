<template>
  <transition name="slide" mode="out-in">
    <div>
      <v-container>
        <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />

        <loader-dialog v-model="loader"></loader-dialog>

        <v-flex xs12 md4>
          <v-combobox
            v-model="select"
            :items="items"
            item-text="displayName"
            label="Status"
            multiple
            chips
            clearable
          >
            <template v-slot:selection="data">
              <v-chip
                :key="JSON.stringify(data.item)"
                :selected="data.selected"
                :disabled="data.disabled"
                class="v-chip--select-multi"
                @input="data.parent.selectItem(data.item)"
              >
                <v-avatar left
                  class="primary white--text"
                  v-text="data.item.value.slice(0, 1).toUpperCase()"
                ></v-avatar>
                {{ data.item.displayName }}
              </v-chip>
            </template>
          </v-combobox>
        </v-flex>

        <v-layout hidden-sm-and-down>
          <v-flex md12>
            <v-data-table :headers="headers" :items="mentoring.list" class="elevation-1">
              <template v-slot:item.time="{item}">
                <div class="mt-2 mb-2">
                <v-icon left>today</v-icon><span class="font-weight-bold" style="color:#00667f">{{ item.startTime | moment('DD MMMM YYYY')}}</span><br>
                <v-icon left>schedule</v-icon><span class="font-weight-bold" style="color:#00667f">{{ item.startTime | moment('H:mm')}} - {{ item.endTime | moment('H:mm') }}</span>
                </div>
              </template>
              <template v-slot:item.status="{item}">
                <v-chip :color="colorStatus(item.status)" text-color="white">
                  <v-avatar left>
                    <v-icon>check</v-icon>
                  </v-avatar>
                  {{ item.status }}
                </v-chip>
              </template>
              <template v-slot:item.action="{item}">
                <v-spacer></v-spacer>

                <!-- <v-btn small>
                  <v-icon left>search</v-icon>View
                </v-btn> -->

                <v-btn class="ma-1"
                  dark
                  @click="openFormMentoring(item.id, 'accept')"
                  small
                  color="green"
                  v-if="item.status == 'proposed'"
                >
                  <v-icon small left>done</v-icon>
                  {{ $vuetify.lang.t('$vuetify.mentoring.accept') }}
                </v-btn>

                <v-btn class="ma-1"
                  dark
                  @click="openFormMentoring(item.id, 'offer')"
                  small
                  color="warning"
                  v-if="item.status == 'proposed'"
                >
                  <v-icon small left>history</v-icon>
                  {{ $vuetify.lang.t('$vuetify.mentoring.offer') }}
                </v-btn>

                <v-btn class="ma-1"
                  dark
                  @click="openFormMentoring(item.id, 'reject')"
                  small
                  color="red"
                  v-if="item.status == 'proposed'"
                >
                  <v-icon small left>cancel</v-icon>
                  {{ $vuetify.lang.t('$vuetify.mentoring.reject') }}
                </v-btn>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>

        <v-layout hidden-md-and-up>
          <v-carousel :show-arrows="false" height="400px" :cycle="false">
            <v-carousel-item v-for="data in mentoring.list" :key="data.id">
              <v-card height="100%" class="pl-4">
                <v-card-title>
                  Mentoring <v-chip class="ml-3" small :color="colorStatus(data.status)" text-color="white">{{ data.status }}</v-chip>
                </v-card-title>
                <v-card-subtitle>
                  <span class="font-weight-thin ml-3"><v-icon left>today</v-icon>{{ data.startTime | moment('DD MMMM YYYY')}}</span>
                  <br>
                  <span class="font-weight-bold ml-3"><v-icon left>schedule</v-icon>{{ data.startTime | moment('H:mm')}} - {{ data.endTime | moment('H:mm') }}</span>
                </v-card-subtitle>

                <v-card-text>
                  <span class="caption font-weight-light">Team Name:</span><br>
                  <span class="title">{{data.participant.team.name}}</span><br>                
                </v-card-text>

                <v-card-actions class="">
                  <!-- <v-spacer></v-spacer> -->
                  <!-- <v-btn small fab @click="openDetail(data.id)">
                    <v-icon small>pageview</v-icon>
                  </v-btn>-->

                  <v-btn small @click="openFormMentoring(data.id, 'accept')" small color="green">
                    <v-icon small left>done</v-icon> accept
                  </v-btn>

                  <v-btn small @click="openFormMentoring(data.id, 'offer')" small color="warning">
                    <v-icon small left>history</v-icon> reschedule
                  </v-btn>
                
                 
                </v-card-actions>
                 <v-btn class="ml-2" small @click="openFormMentoring(data.id, 'reject')" small color="red">
                    <v-icon small left>cancel</v-icon> reject
                 </v-btn>
              </v-card>
            </v-carousel-item>
          </v-carousel>
        </v-layout>

        <!-- dialog form mentoring -->
        <v-dialog v-model="dialogForm" hide-overlay persistent width="400">
          <v-form ref="form">
            <v-card>
              <v-card-text class="text-end mb-0 pb-0">
                <v-btn @click="closeFormMentoring" text dark x-small fab color="grey">
                  <v-icon>close</v-icon>
                </v-btn>
              </v-card-text>
              <!-- {{status.mentoring}} -->
              <v-card-title class="mt-0 pt-0">{{singleData.participant.team.name}}</v-card-title>
              <v-chip class="ml-4" x-small>{{singleData.status}}</v-chip>
              <v-card-text>
                <span class="font-weight-bold"><v-icon left>today</v-icon>{{ singleData.startTime | moment('DD MMMM YYYY')}}</span>
                  <br>
                <span class="font-weight-bold"><v-icon left>schedule</v-icon>{{ singleData.startTime | moment('H:mm')}} - {{ singleData.endTime | moment('H:mm') }}</span>
                <v-row>
                  <v-col>
                    <span class="font-weight-bold">Media :</span> <br>
                    {{singleData.media}}
                  </v-col>
                  <v-col>
                    <span class="font-weight-bold">Note  :</span> <br>
                    {{singleData.note}}
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-text v-if="type == 'offer'">
                <h5>Reschedule</h5>
                <v-layout wrap>
                  <v-flex xs12 sm12 md6>
                    <v-menu
                      v-model="menu1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      
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
                </v-layout>
              </v-card-text>
              <v-card-text>
                <v-textarea
                  v-model="params.note"
                  hint="Note"
                  label="Note"
                  counter="100"
                  maxlength="100"
                />
                <v-textarea
                  v-if="singleData.status !== 'proposed'"
                  v-model="params.media"
                  hint="Media"
                  label="Media"
                  counter="500"
                  maxlength="500"
                />
              </v-card-text>
              <v-card-actions>
                <!-- {{params}} -->
                <v-btn
                  block
                  color="green"
                  v-if="type == 'accept'"
                  @click="acceptMentoring(singleData.id)"
                >
                  <v-icon>check</v-icon>Accept
                </v-btn>

                <v-btn block dark color="red" v-if="type == 'reject'" @click="rejectMentoring(singleData.id)">
                  <v-icon>close</v-icon>Reject
                </v-btn>

                <v-btn
                  block
                  color="warning"
                  v-if="type == 'offer'"
                  @click="offerMentoring(singleData.id)"
                >
                  <v-icon>history</v-icon>Offer
                </v-btn>

                
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-container>
    </div>
  </transition>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";
export default {
  components: {
    "notification-alert": Notification
  },
  data() {
    return {
      user: "",
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      type: "",
      menu2: false,
      singleData: {
        id: "",
        status: "",
        startTime: "",
        endTime: "",
        media: "",
        note: "",
        participant: {
          id: "",
          team: { id: "", name: "" }
        }
      },
      err_msg: { details: [""] },
      loader: false,
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      selectedIndex: null,
      headers: [
        {
          text: "Team Name",
          align: "left",
          sortable: false,
          value: "participant.team.name"
        },
        { text: "Date/Time", value: "time", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "", value: "action", sortable: false , align: "right"}
      ],
      date: "",
      time: "",
      params: {
        startTime: "",
        note: "",
        media: ""
      },
      mentoring: {
        total: 0,
        list: []
      },
      isHidden: false,
      items: [
        { displayName: "Proposed", value: "pro" },
        { displayName: "Scheduled", value: "sch" },
        { displayName: "Rejected", value: "rej" },
        { displayName: "Offered", value: "off" }
      ],
      select: [],
      queryurl: ""
    };
  },
  watch: {
    select: "buildQueryUrl",
    date: "setDateTime",
    time: "setDateTime"
  },
  created: function() {},
  mounted: function() {
    this.getDataList();
  },
  methods: {
    setDateTime: function() {
      this.params.startTime = this.date + " " + this.time;
    },
    colorStatus: function(status) {
      var color = "accent";
      if (status === "scheduled") {
        color = "green";
      } else if (status === "proposed") {
        color = "blue";
      } else if (status === "offered") {
        color = "warning";
      } else if (status === "rejected") {
        color = "red";
      } else {
        color = "accent";
      }
      return color;
    },
    buildQueryUrl: function() {
      this.queryurl = "";
      if (this.select.length === 0) {
        this.queryurl = "";
      } else if (this.select.length === 1) {
        this.queryurl = "?statuses[]=" + this.select[0].value;
      } else if (this.select.length > 1) {
        this.queryurl = "?statuses[]=" + this.select[0].value;
        for (var i = 1; i < this.select.length; i++) {
          this.queryurl += "&statuses[]=" + this.select[i].value;
        }
      }
      this.getDataList();
    },
    getDataList: function() {
      this.loader = true;
      notif.reset(this);
      net
        .getData(
          this,
          "/talent/programme-mentorships/" +
            this.$route.params.programId +
            "/mentoring-sessions" +
            this.queryurl
        )
        .then(res => {
          if (res.data.data) {
            this.mentoring = res.data.data;
          } else {
            this.mentoring = { total: 0, list: [] };
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    getSingleData: function(id) {
      this.loader = true;
      notif.reset(this);
      net
        .getData(
          this,
          "/talent/programme-mentorships/" +
            this.$route.params.programId +
            "/mentoring-sessions/" +
            id
        )
        .then(res => {
          this.singleData = res.data.data;
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    refresh: function() {
      this.dialogForm = false;
      this.getDataList();
    },
    openFormMentoring: function(id, status) {
      this.isHidden = true;
      this.dialogForm = true;
      this.selectedIndex = id;
      this.type = status;
      this.getSingleData(id);
    },
    closeFormMentoring: function() {
      this.isHidden = false;
      this.dialogForm = false;
      this.selectedIndex = null;
      this.status.mentoring = null;
    },
    acceptMentoring: function(id) {
      this.loader = true;
      net
        .putData(
          this,
          "/talent/programme-mentorships/" +
            this.$route.params.programId +
            "/mentoring-sessions/" +
            id +
            "/accept",
          this.params
        )
        .then(res => {
          
          this.refresh();
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    rejectMentoring: function(id) {
      this.loader = true;
      net
        .putData(
          this,
          "/talent/programme-mentorships/" +
            this.$route.params.programId +
            "/mentoring-sessions/" +
            id +
            "/reject",
          this.params
        )
        .then(res => {
          this.refresh();
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    offerMentoring: function(id) {
      this.loader = true;
      net
        .putData(
          this,
          "/talent/programme-mentorships/" +
            this.$route.params.programId +
            "/mentoring-sessions/" +
            id +
            "/offer",
          this.params
        )
        .then(res => {
          
          this.refresh();
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
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>