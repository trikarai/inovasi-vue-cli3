<template>
  <transition name="slide" mode="out-in">
    <div>
      <v-container>
        <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />

        <v-dialog v-model="loader" hide-overlay persistent width="300">
          <v-card color="primary" dark>
            <v-card-text>
              {{ $vuetify.t('$vuetify.info.standby') }}
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>

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
            <v-data-table :headers="headers" :items="mentoring.list" class="elevation-1">
              <template v-slot:items="props">
                <td>{{ props.item.participant.team.name }}</td>
                <td>{{ props.item.startTime }}</td>
                <td>{{ props.item.endTime }}</td>
                <td>{{ props.item.status }}</td>

                <td class="text-xs-right">
                  <v-spacer></v-spacer>
                  <v-btn
                    @click="openFormMentoring(props.item.id, props.item.status)"
                    small
                    color="green"
                  >
                    <v-icon small left>done</v-icon>
                    {{ $vuetify.t('$vuetify.mentoring.accept') }}
                  </v-btn>

                  <v-btn
                    @click="openFormMentoring(props.item.id, props.item.status)"
                    small
                    color="warning"
                  >
                    <v-icon small left>history</v-icon>
                    {{ $vuetify.t('$vuetify.mentoring.offer') }}
                  </v-btn>

                  <v-btn
                    @click="openFormMentoring(props.item.id, props.item.status)"
                    small
                    color="red"
                  >
                    <v-icon small left>cancel</v-icon>
                    {{ $vuetify.t('$vuetify.mentoring.reject') }}
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>

        <v-layout hidden-md-and-up>
          <v-carousel height="250px" :cycle="false">
            <v-carousel-item v-for="data in mentoring.list" :key="data.id">
              <v-card height="100%" class="pl-4">
                <v-card-title>{{data.startTime}}</v-card-title>
                <v-card-text>
                  <v-chip :color="colorStatus(data.status)" text-color="white">{{ data.status }}</v-chip>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- <v-btn small fab @click="openDetail(data.id)">
                    <v-icon small>pageview</v-icon>
                  </v-btn>-->

                  <v-btn @click="openFormMentoring(data.id, data.status)" small fab color="green">
                    <v-icon small>done</v-icon>
                  </v-btn>

                  <v-btn @click="openFormMentoring(data.id, data.status)" small fab color="warning">
                    <v-icon small>history</v-icon>
                  </v-btn>

                  <v-btn @click="openFormMentoring(data.id, data.status)" small fab color="red">
                    <v-icon small>cancel</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-carousel-item>
          </v-carousel>
        </v-layout>

        <v-dialog v-model="dialogForm" hide-overlay persistent width="400">
          <v-form ref="form">
            <v-card>
              <v-card-text>
                <v-textarea
                  v-model="params.note"
                  hint="Note"
                  label="Note"
                  counter="25"
                  maxlength="25"
                />
                <v-textarea
                  v-if="status.mentoring !== 'proposed'"
                  v-model="params.media"
                  hint="Media"
                  label="Media"
                  counter="100"
                  maxlength="100"
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="closeFormMentoring" small fab color="red">
                  <v-icon>close</v-icon>
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
        warning: false,
        mentoring: ""
      },
      singleData: { id: "", name: "" },
      err_msg: {details:[""]},
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
          value: "name"
        },
        { text: "Start Time", value: "id", sortable: false },
        { text: "End Time", value: "id", sortable: false },
        { text: "Status", value: "id", sortable: false },
        { text: "", value: "id", sortable: false }
      ],
      params: {
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
        { displayName: "Accepted", value: "acc" },
        { displayName: "Cancelled", value: "can" },
        { displayName: "Offered", value: "off" }
      ],
      select: [{ displayName: "Proposed", value: "pro" }],
      queryurl: ""
    };
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
      this.status.error = false;
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
          console.log(error);
          notif.showError(this, error);
        })
        .finally(function() {
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
      this.status.mentoring = status;
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
          console.log(res);
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
          console.log(res);
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
          console.log(res);
          this.refresh();
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
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