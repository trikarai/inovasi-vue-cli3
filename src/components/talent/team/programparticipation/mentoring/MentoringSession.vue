<template>
  <div>
    <v-container>
      <!-- {{$store.state.programId}} -->
      <notification-notif v-bind:err_msg="err_msg" v-bind:status="status" />

      <v-dialog v-model="loader2" :hide-overlay="false" persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            {{ $vuetify.lang.t('$vuetify.info.standby') }}
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- propose dialog modal-->
      <v-dialog v-model="dialogPropose" max-width="600">
        <v-form v-model="valid" ref="form">
          <v-card>
            <v-card-title class="headline">Reschedule</v-card-title>
            <v-card-text v-if="loaderDetail">
              <v-progress-linear :indeterminate="true"></v-progress-linear>
            </v-card-text>
            <v-card-text v-else>
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
                      <v-time-picker color="blue" :locale="$vuetify.lang.current" v-model="time"></v-time-picker>
                    </v-menu>
                  </v-flex>

                  <v-flex xs12 sm6 md4>
                    <v-textarea
                      label="Media"
                      :rules="[v => !!v || 'Media is required']"
                      v-model="proposeParams.media"
                      required
                    ></v-textarea>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-textarea label="Note" v-model="proposeParams.note" required></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn
                @click="propose()"
                color="primary"
                :disabled="!valid"
              >{{$vuetify.lang.t('$vuetify.action.add')}}</v-btn>
              <v-spacer></v-spacer>
              <v-btn small fab color="red" text @click="dialogPropose = false">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
      <!-- end propose dialog modal-->

      <v-dialog v-model="dialogDetail" max-width="350">
        <v-card>
          <v-card-title class="headline">{{mentoringDetail.mentoring.name}}</v-card-title>
          <v-card-text>{{mentoringDetail.mentor.talent.name}}</v-card-text>
          <v-card-text>{{mentoringDetail.startTime}}</v-card-text>
          <v-card-text>{{mentoringDetail.status}}</v-card-text>
          <v-card-text>{{mentoringDetail.media}}</v-card-text>
          <v-card-text>{{mentoringDetail.note}}</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small fab color="red" text @click="dialogDetail = false">
              <v-icon small>close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn color="primary" @click="gotoMentoringEvent">
        <v-icon left>add</v-icon>
        {{ $vuetify.lang.t('$vuetify.mentoring.propose') }} Mentoring
      </v-btn>
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
              <v-avatar
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
         query :  {{queryurl}}
          <v-data-table
            :loading="loader"
            :headers="headers"
            :items="mentoring.list"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.startTime }} - {{ props.item.endTime }}</td>
              <td> 
                <v-btn text fab small @click="openDetail(props.item.id)">
                  <v-icon small>pageview</v-icon>
                </v-btn>
                {{ props.item.mentor.talent.name }}</td>

              <td>
                <v-chip
                  :color="colorStatus(props.item.status)"
                  text-color="white"
                >{{ props.item.status }}</v-chip>
              </td>

              <td class="text-xs-right">
                <!-- <v-btn small @click="openDetail(props.item.id)">
                  <v-icon small left>pageview</v-icon>
                  {{ $vuetify.lang.t('$vuetify.action.view') }}
                </v-btn> -->

                <v-btn
                  @click="acceptAct(props.item.id)"
                  small
                  color="green"
                  v-if="props.item.status === 'offered'"
                >
                  <v-icon small left>done</v-icon>
                  {{ $vuetify.lang.t('$vuetify.mentoring.accept') }}
                </v-btn>

                <v-btn
                  @click="rescheduleAct(props.item.id)"
                  small
                  color="warning"
                  v-if="props.item.status === 'proposed'"
                >
                  <v-icon small left>history</v-icon>
                  {{ $vuetify.lang.t('$vuetify.mentoring.reschedule') }}
                </v-btn>

                <v-btn
                  @click="cancelAct(props.item.id)"
                  small
                  color="red"
                  v-if="checkCancel(props.item.status)"
                >
                  <v-icon small left>cancel</v-icon>
                  {{ $vuetify.lang.t('$vuetify.mentoring.cancel') }}
                </v-btn>

                <v-expand-transition>
                  <div v-if="props.item.id == selectedAcc">
                    {{ $vuetify.lang.t('$vuetify.mentoring.confirmationtoaccept') }}
                    <v-btn @click="acceptMentoring(props.item.id)" color="primary">
                      <v-icon></v-icon>
                      {{ $vuetify.lang.t('$vuetify.action.yes') }}
                    </v-btn>
                    <v-btn @click="selectedAcc = null">
                      <v-icon></v-icon>
                      {{ $vuetify.lang.t('$vuetify.action.cancel') }}
                    </v-btn>
                  </div>
                </v-expand-transition>

                <v-scale-transition>
                  <div v-if="props.item.id == selectedCan">
                    {{ $vuetify.lang.t('$vuetify.mentoring.confirmationtocancel') }}
                    <v-btn @click="cancelMentoring(props.item.id)" color="red">
                      <v-icon></v-icon>
                      {{ $vuetify.lang.t('$vuetify.action.yes') }}
                    </v-btn>
                    <v-btn @click="selectedCan = null">
                      <v-icon></v-icon>
                      {{ $vuetify.lang.t('$vuetify.action.cancel') }}
                    </v-btn>
                  </div>
                </v-scale-transition>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>

      <v-layout hidden-md-and-up>
        <v-carousel height="355px" :cycle="false">
          <v-carousel-item v-for="data in mentoring.list" :key="data.id">
            <v-card height="100%" class="pl-4">
              <v-card-title>{{data.startTime}}</v-card-title>
              <v-card-text>{{data.mentor.talent.name}}</v-card-text>
              <v-card-text>
                <v-chip :color="colorStatus(data.status)" text-color="white">{{ data.status }}</v-chip>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  @click="acceptAct(data.id)"
                  small
                  fab
                  color="green"
                  v-if="data.status === 'offered'"
                >
                  <v-icon small>done</v-icon>
                </v-btn>

                <v-btn small fab color="warning" v-if="data.status === 'proposed'">
                  <v-icon small>history</v-icon>
                </v-btn>

                <v-btn
                  @click="cancelAct(data.id)"
                  small
                  fab
                  color="red"
                  v-if="checkCancel(data.status)"
                >
                  <v-icon small>cancel</v-icon>
                </v-btn>
              </v-card-actions>

              <v-card-actions>
                <v-fade-transition>
                  <div v-if="data.id == selectedAcc">
                    {{ $vuetify.lang.t('$vuetify.mentoring.confirmationtoaccept') }}
                    <br />
                    <v-btn @click="acceptMentoring(data.id)" color="primary">
                      <v-icon></v-icon>
                      {{ $vuetify.lang.t('$vuetify.action.yes') }}
                    </v-btn>
                    <v-btn @click="selectedAcc = null">
                      <v-icon></v-icon>
                      {{ $vuetify.lang.t('$vuetify.action.cancel') }}
                    </v-btn>
                  </div>
                </v-fade-transition>
                <v-scale-transition>
                  <div v-if="data.id == selectedCan">
                    {{ $vuetify.lang.t('$vuetify.mentoring.confirmationtocancel') }}
                    <br />
                    <v-btn @click="cancelMentoring(data.id)" color="red">
                      <v-icon></v-icon>
                      {{ $vuetify.lang.t('$vuetify.action.yes') }}
                    </v-btn>
                    <v-btn @click="selectedCan = null">
                      <v-icon></v-icon>
                      {{ $vuetify.lang.t('$vuetify.action.cancel') }}
                    </v-btn>
                  </div>
                </v-scale-transition>
              </v-card-actions>

              <v-card-actions style="visibility:hidden">
                <v-btn small fab color="red">
                  <v-icon small>cancel</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";

export default {
  data() {
    return {
      valid: false,
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      singleData: { id: "", name: "" },
      err_msg: { details: [""] },
      loader: false,
      loader2: false,
      loaderDetail: false,
      menu1: false,
      menu2: false,
      dialogDel: false,
      dialogForm: false,
      dialogDetail: false,
      dialogPropose: false,
      edit: false,
      view: false,
      expand: false,
      selectedAcc: null,
      selectedCan: null,
      selectedRes: null,
      headers: [
        {
          text: "Date Time",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Mentor", value: "id", sortable: false },
        { text: "Status", value: "id", sortable: false },
        { text: "", value: "id", sortable: false }
      ],
      mentoring: {
        total: 0,
        list: []
      },
      mentoringDetail: {
        id: "",
        mentoring: {
          id: "",
          name: ""
        },
        mentor: {
          id: "",
          talent: { id: "", name: "" }
        },
        startTime: "",
        endTime: "",
        status: "",
        media: "",
        note: ""
      },
      items: [
        { displayName: "Proposed", value: "pro" },
        { displayName: "Scheduled", value: "sch" },
        { displayName: "Cancelled", value: "can" },
        { displayName: "Offered", value: "off" }
      ],
      select: [],
      queryurl: "",
      selectedIndex: null,
      proposeParams: {
        programmeId: "",
        mentoringId: "",
        mentorId: "",
        startTime: "",
        media: "",
        note: ""
      },
      date: "",
      time: "",
      sessionId: ""
    };
  },
  components: {
    "notification-notif": Notification
  },
  watch: {
    select: "buildQueryUrl",
    date: "setDateTime",
    time: "setDateTime"
  },
  created: function() {
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    setDateTime: function() {
      this.proposeParams.startTime = this.date + " " + this.time;
    },
    checkCancel: function(status){
      var cek = true;
      if(status === 'proposed' || status === 'offered'){
        cek = true;
      }else{
        cek = false;
      }
      return cek;
    },
    gotoMentoringEvent: function() {
      this.$router.push({
        path:
          "/talent/team/" +
          this.$route.params.teamId +
          "/participation/" +
          this.$route.params.participationId +
          "/mentoring-event"
      });
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
      net
        .getData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/programme-participations/" +
            this.$route.params.participationId +
            "/mentoring-sessions" +
            this.queryurl
        )
        .then(res => {
          if (res.data.data) {
            this.mentoring = res.data.data;
          } else {
            this.mentoring.list = [];
          }
        })
        .catch(error => {
          console.log(error);
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    openDetail: function(id) {
      this.dialogDetail = true;
      this.getSingleData(id);
    },
    rescheduleAct: function(id) {
      this.sessionId = id;
      this.dialogPropose = true;
      this.getSingleData(id);
    },
    getSingleData: function(id) {
      this.loaderDetail = true;
      net
        .getData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/programme-participations/" +
            this.$route.params.participationId +
            "/mentoring-sessions/" +
            id
        )
        .then(res => {
          if (res.data.data) {
            this.mentoringDetail = res.data.data;
            this.proposeParams = res.data.data;
          } else {
            this.mentoringDetail = null;
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loaderDetail = false;
        });
    },
    acceptAct: function(id) {
      this.selectedCan = null;
      this.selectedRes = null;
      if (this.selectedAcc === id) {
        this.selectedAcc = null;
      } else {
        this.selectedAcc = id;
      }
    },
    acceptMentoring: function(id) {
      this.loader2 = true;
      net
        .putData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/programme-participations/" +
            this.$route.params.participationId +
            "/mentoring-sessions/" +
            id +
            "/accept"
        )
        .then(res => {
          this.refresh();
        })
        .catch(error => {
          console.log(error);
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader2 = false;
        });
    },
    cancelAct: function(id) {
      this.selectedAcc = null;
      this.selectedRes = null;
      if (this.selectedCan === id) {
        this.selectedCan = null;
      } else {
        this.selectedCan = id;
      }
    },
    cancelMentoring: function(id) {
      this.loader2 = true;
      net
        .putData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/programme-participations/" +
            this.$route.params.participationId +
            "/mentoring-sessions/" +
            id +
            "/cancel"
        )
        .then(res => {
          this.refresh();
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.selectedCan = null;
          this.loader2 = false;
        });
    },
    colorStatus: function(status) {
      var colorStatus = "grey";
      if (status === "scheduled") {
        colorStatus = "green";
      } else if (status === "cancelled") {
        colorStatus = "red";
      } else if (status === "proposed") {
        colorStatus = "blue";
      } else if (status === "rejected") {
        colorStatus = "red";
      } else if (status === "offered") {
        colorStatus = "warning";
      }
      return colorStatus;
    },
    refresh: function() {
      this.getDataList();
    },
    propose: function() {
      if (this.$refs.form.validate()) {
        this.rescheduleMentoring();
      }
    },
    rescheduleMentoring: function() {
      this.loaderDetail = true;
      net
        .putData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/programme-participations/" +
            this.$route.params.participationId +
            "/mentoring-sessions/" +
            this.sessionId +
            "/reschedule",
          this.proposeParams
        )
        .then(res => {
          this.dialogPropose = false;
          this.refresh();
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
