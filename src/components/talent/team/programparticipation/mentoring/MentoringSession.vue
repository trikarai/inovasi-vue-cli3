<template>
  <div>
    <v-container>
      <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />

      <v-dialog v-model="loader2" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            {{ $vuetify.t('$vuetify.info.standby') }}
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDetail" max-width="350">
        <v-card>
          <v-card-title class="headline">Mentoring Detail</v-card-title>

          <v-card-text>{{mentoringDetail}}</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small fab color="red" text @click="dialogDetail = false"><v-icon>close</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn color="primary">
        <v-icon left>add</v-icon>
        {{ $vuetify.t('$vuetify.mentoring.propose') }} Mentoring
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
          <v-data-table
            :loading="loader"
            :headers="headers"
            :items="mentoring.list"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.startTime }}</td>
              <td>{{ props.item.endTime }}</td>
              <td>{{ props.item.mentor.talent.name }}</td>

              <td>
                <v-chip
                  :color="colorStatus(props.item.status)"
                  text-color="white"
                >{{ props.item.status }}</v-chip>
              </td>

              <td class="text-xs-right">
                <v-btn small @click="openDetail(props.item.id)">
                  <v-icon small left>pageview</v-icon>
                  {{ $vuetify.t('$vuetify.action.view') }}
                </v-btn>

                <v-btn @click="acceptAct(props.item.id)" small color="green">
                  <v-icon small left>done</v-icon>
                  {{ $vuetify.t('$vuetify.mentoring.accept') }}
                </v-btn>

                <v-btn small color="warning">
                  <v-icon small left>history</v-icon>
                  {{ $vuetify.t('$vuetify.mentoring.reschedule') }}
                </v-btn>

                <v-btn @click="cancelAct(props.item.id)" small color="red">
                  <v-icon small left>cancel</v-icon>
                  {{ $vuetify.t('$vuetify.mentoring.cancel') }}
                </v-btn>

                <v-expand-transition>
                  <div v-if="props.item.id == selectedAcc">
                    {{ $vuetify.t('$vuetify.mentoring.confirmationtoaccept') }}
                    <v-btn @click="acceptMentoring(props.items.id)" color="primary">
                      <v-icon></v-icon>
                      {{ $vuetify.t('$vuetify.action.yes') }}
                    </v-btn>
                    <v-btn @click="selectedAcc = null">
                      <v-icon></v-icon>
                      {{ $vuetify.t('$vuetify.action.cancel') }}
                    </v-btn>
                  </div>
                </v-expand-transition>

                <v-expand-transition>
                  <div v-if="props.item.id == selectedCan">
                    {{ $vuetify.t('$vuetify.mentoring.confirmationtocancel') }}
                    <v-btn @click="cancelMentoring(props.items.id)" color="red">
                      <v-icon></v-icon>
                      {{ $vuetify.t('$vuetify.action.yes') }}
                    </v-btn>
                    <v-btn @click="selectedCan = null">
                      <v-icon></v-icon>
                      {{ $vuetify.t('$vuetify.action.cancel') }}
                    </v-btn>
                  </div>
                </v-expand-transition>
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
                <v-btn small fab @click="openDetail(data.id)">
                  <v-icon small>pageview</v-icon>
                </v-btn>

                <v-btn @click="acceptAct(data.id)" small fab color="green">
                  <v-icon small>done</v-icon>
                </v-btn>

                <v-btn small fab color="warning">
                  <v-icon small>history</v-icon>
                </v-btn>

                <v-btn @click="cancelAct(data.id)" small fab color="red">
                  <v-icon small>cancel</v-icon>
                </v-btn>
              </v-card-actions>

              <v-card-actions>
                <v-scale-transition>
                  <div v-if="data.id == selectedAcc">
                    {{ $vuetify.t('$vuetify.mentoring.confirmationtoaccept') }}
                    <br />
                    <v-btn @click="acceptMentoring(data.id)" color="primary">
                      <v-icon></v-icon>
                      {{ $vuetify.t('$vuetify.action.yes') }}
                    </v-btn>
                    <v-btn @click="selectedAcc = null">
                      <v-icon></v-icon>
                      {{ $vuetify.t('$vuetify.action.cancel') }}
                    </v-btn>
                  </div>
                </v-scale-transition>
                <v-scale-transition>
                  <div v-if="data.id == selectedCan">
                    {{ $vuetify.t('$vuetify.mentoring.confirmationtocancel') }}
                    <br />
                    <v-btn @click="cancelMentoring(data.id)" color="red">
                      <v-icon></v-icon>
                      {{ $vuetify.t('$vuetify.action.yes') }}
                    </v-btn>
                    <v-btn @click="selectedCan = null">
                      <v-icon></v-icon>
                      {{ $vuetify.t('$vuetify.action.cancel') }}
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
import alert from "@/config/alerthandling";
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
      singleData: { id: "", name: "" },
      err_msg: {details:[""]},
      loader: false,
      loader2: false,
      dialogDel: false,
      dialogForm: false,
      dialogDetail: false,
      edit: false,
      view: false,
      expand: false,
      selectedAcc: null,
      selectedCan: null,
      selectedRes: null,
      headers: [
        {
          text: "Start Time",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "End Time", value: "id", sortable: false },
        { text: "Mentor", value: "id", sortable: false },
        { text: "Status", value: "id", sortable: false },
        { text: "", value: "id", sortable: false }
      ],
      mentoring: {
        total: 0,
        list: []
      },
      mentoringDetail: "",
      items: [
        { displayName: "Proposed", value: "pro" },
        { displayName: "Accepted", value: "acc" },
        { displayName: "Cancelled", value: "can" },
        { displayName: "Offered", value: "off" }
      ],
      select: [{ displayName: "Proposed", value: "pro" }],
      queryurl: "",
      selectedIndex: null
    };
  },
  components: {
    "notification-alert": Notification
  },
  watch: {
    select: "buildQueryUrl"
  },
  created: function() {},
  mounted: function() {
    this.getDataList();
  },
  methods: {
    buildQueryUrl: function() {
      this.queryurl = "";
      if (this.select.length === 0) {
        this.queryurl = "";
      } else if (this.select.length === 1) {
        this.queryurl = "?status[]=" + this.select[0].value;
      } else if (this.select.length > 1) {
        this.queryurl = "?status[]=" + this.select[0].value;
        for (var i = 1; i < this.select.length; i++) {
          this.queryurl += "&status[]=" + this.select[i].value;
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
          alert.showError(this, error);
        })
        .finally(function() {
          this.loader = false;
        });
    },
    openDetail: function(id) {
      this.dialogDetail = true;
      // this.getSingleData(id);
    },
    getSingleData: function(id){
      net
        .getData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/programme-participations/" +
            this.$route.params.participationId +
            "/mentoring-sessions/" + id
        )
        .then(res => {
          if (res.data.data) {
            this.mentoringDetail = res.data.data;
          } else {
            this.mentoringDetail = null;
          }
        })
        .catch(error => {
          console.log(error);
          alert.showError(this, error);
        })
        .finally(function() {
          this.loader = false;
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
          console.log(error);
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader2 = false;
        });
    },
    rescheduleMentoring: function() {},
    colorStatus: function(status) {
      var colorStatus = "grey";
      if (status === "accepted") {
        colorStatus = "green";
      } else if (status === "cancelled") {
        colorStatus = "grey";
      } else if (status === "proposed") {
        colorStatus = "blue";
      } else if (status === "offered") {
        colorStatus = "blue";
      }
      return colorStatus;
    },
    refresh: function() {
      this.getDataList();
    }
  }
};
</script>
