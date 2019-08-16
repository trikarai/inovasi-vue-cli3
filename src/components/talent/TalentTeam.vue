<template>
  <transition name="slide" mode="out-in">
    <div>
      <v-container>
        <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
        <v-btn color="blue" append to="/talent/create/team" style="left: -8px">
          <v-icon>add</v-icon>
          {{ $vuetify.lang.t('$vuetify.action.create') }} {{ $vuetify.lang.t('$vuetify.team.team') }}
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
        <v-divider></v-divider>
        <v-data-table :loading="loader" :headers="headers" :items="team.list" class="elevation-1">
          <template v-slot:item.status="{ item }">
            <v-chip :color="colorStatus(item.status.value)" text-color="white">
              <v-avatar>
                <v-icon>{{iconStatus(item.status.value)}}</v-icon>
              </v-avatar>
              {{ item.status.displayName }}
            </v-chip>
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn class="ma-1"
              v-if="ifShow(item.status.value)"
              small
              @click="openIdea(item.team.id)"
            >{{$vuetify.lang.t('$vuetify.idea.idea')}}</v-btn>
            <v-btn class="ma-1"
              v-if="ifShow(item.status.value)"
              small
              @click="openParticipation(item.team.id)"
            >{{$vuetify.lang.t('$vuetify.team.programParticipation')}}</v-btn>
            <v-btn class="ma-1" small @click="openDetail(item.id)" v-if="ifShow(item.status.value)">
              <v-icon small>pageview</v-icon>
              <!-- {{ $vuetify.lang.t('$vuetify.action.view') }} -->
              Manage
            </v-btn>
            <v-btn class="ma-1"
              small
              color="warning"
              @click="deleteAct(item.id)"
              v-if="ifShow(item.status.value)"
            >
              <v-icon small>outlined_flag</v-icon>
              {{ $vuetify.lang.t('$vuetify.team.quit') }}
            </v-btn>

            <v-expand-transition>
              <div v-show="item.id == selectedQuit">
                {{ $vuetify.lang.t('$vuetify.action.confirmationtoquit') }}
                <v-btn @click="deleteData(item.id)" color="red" class="ma-2">
                  <v-icon></v-icon>
                  {{ $vuetify.lang.t('$vuetify.action.yes') }}
                </v-btn>
                <v-btn @click="deleteAct(null)">
                  <v-icon></v-icon>
                  {{ $vuetify.lang.t('$vuetify.action.cancel') }}
                </v-btn>
              </div>
            </v-expand-transition>

            <v-btn
              small
              color="primary"
              @click="acceptAct(index)"
              v-if="item.status.value === 'inv'"
            >
              <v-icon small>check_circle</v-icon>
              <!-- {{ $vuetify.lang.t('$vuetify.team.quit') }} -->
              Accept
            </v-btn>

            <v-btn small color="red" @click="rejectAct(index)" v-if="item.status.value === 'inv'">
              <v-icon small>close</v-icon>
              <!-- {{ $vuetify.lang.t('$vuetify.team.quit') }} -->
              Reject
            </v-btn>

            <v-expand-transition>
              <div v-show="item.id == selectedIndexAcc">
                <!-- {{ $vuetify.lang.t('$vuetify.action.confirmationtoquit') }} -->
                <v-btn @click="acceptInvitation(item.id)" color="blue" class="ma-2">
                  <v-icon></v-icon>
                  {{ $vuetify.lang.t('$vuetify.action.yes') }}
                </v-btn>
                <v-btn @click="acceptAct(null)">
                  <v-icon></v-icon>
                  {{ $vuetify.lang.t('$vuetify.action.cancel') }}
                </v-btn>
              </div>
            </v-expand-transition>
            <v-expand-transition>
              <div v-show="item.id == selectedIndexRej">
                <!-- {{ $vuetify.lang.t('$vuetify.action.confirmationtoquit') }} -->
                <v-btn @click="rejectInvitation(item.id)" color="red">
                  <v-icon></v-icon>
                  {{ $vuetify.lang.t('$vuetify.action.yes') }}
                </v-btn>
                <v-btn @click="rejectAct(null)">
                  <v-icon></v-icon>
                  {{ $vuetify.lang.t('$vuetify.action.cancel') }}
                </v-btn>
              </div>
            </v-expand-transition>
          </template>
        </v-data-table>
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
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      select: "",
      queryurl: "",
      singleData: { id: "", name: "" },
      err_msg: { details: [""] },
      loader: false,
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      selectedIndex: null,
      selectedQuit: null,
      selectedIndexAcc: null,
      selectedIndexRej: null,
      headers: [
        {
          text: "Team Name",
          align: "left",
          sortable: false,
          value: "team.name"
        },
        { text: "Position", value: "position", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Actions", value: "action", align: "right", sortable: false }
      ],
      items: [
        { displayName: "Active", value: "act" },
        { displayName: "Invited", value: "inv" }
      ],
      team: {
        total: 0,
        list: []
      }
    };
  },
  watch: {
    select: "buildQueryUrl"
  },
  computed: {},
  created: function() {},
  mounted: function() {
    this.getDataList();
  },
  methods: {
    colorStatus: function(status) {
      var color = "accent";
      if (status === "act") {
        color = "green";
      } else if (status === "inv") {
        color = "blue";
      } else {
        color = "red";
      }
      return color;
    },
    iconStatus: function(status) {
      var icon = "check";
      if (status === "act") {
        icon = "check_circle";
      } else if (status === "inv") {
        icon = "email";
      } else if (status === "rem") {
        icon = "block";
      } else {
        icon = "outlined_flag";
      }
      return icon;
    },
    ifShow: function(status) {
      var visible = true;
      if (status === "act") {
        visible = true;
      } else if (status === "inv") {
        visible = false;
      } else {
        visible = false;
      }
      return visible;
    },
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
        .getData(this, "/talent/team-memberships" + this.queryurl)
        .then(res => {
          if (res.data.data) {
            this.team = res.data.data;
          } else {
            this.team.list = [];
          }
        })
        .catch(error => {
          notif.showErrow(this, error);
        })
        .finally(function() {
          this.loader = false;
        });
    },
    openDetail: function(id) {
      this.$router.push({ path: "/talent/team/" + id });
    },
    openParticipation: function(id) {
      this.$store.commit("setTeamId", id);
      this.$router.push({ path: "/talent/team/" + id + "/participation" });
    },
    openIdea: function(id) {
      this.$router.push({ path: "/talent/team/" + id + "/idea" });
    },
    openAdd: function() {
      this.dialogForm = true;
      this.view = false;
      this.edit = false;
      this.singleData = { id: "", name: "" };
    },
    deleteAct: function(id) {
      this.selectedIndexAcc = null;
      this.selectedIndexRej = null;
      if (this.selectedQuit == id) {
        this.selectedQuit = null;
      } else {
        this.selectedQuit = id;
      }
    },
    acceptAct: function(id) {
      this.selectedQuit = null;
      this.selectedIndex = null;
      this.selectedIndexRej = null;
      if (this.selectedIndexAcc == id) {
        this.selectedIndexAcc = null;
      } else {
        this.selectedIndexAcc = id;
      }
    },
    rejectAct: function(id) {
      this.selectedIndexAcc = null;
      this.selectedIndex = null;
      this.selectedQuit = null;
      if (this.selectedIndexRej == id) {
        this.selectedIndexRej = null;
      } else {
        this.selectedIndexRej = id;
      }
    },
    deleteData: function(id) {
      notif.reset(this);
      net
        .putData(this, "/talent/team-memberships/" + id + "/quit")
        .then(res => {
          notif.showInfo(this, res);
        })
        .catch(error => {
          notif.showErrow(this, error);
        })
        .finally(() => {
          this.selectedQuit = null;
          this.refresh();
        });
    },
    acceptInvitation: function(id) {
      notif.reset(this);
      net
        .putData(this, "/talent/team-memberships/" + id + "/accept-invitation")
        .then(res => {
          notif.showInfo(this, res);
        })
        .catch(error => {
          notif.showErrow(this, error);
        })
        .finally(() => {
          this.selectedIndexAcc = null;
          this.refresh();
        });
    },
    rejectInvitation: function(id) {
      notif.reset(this);
      net
        .putData(this, "/talent/team-memberships/" + id + "/reject-invitation")
        .then(res => {
          notif.showInfo(this, res);
        })
        .catch(error => {
          notif.showErrow(this, error);
        })
        .finally(() => {
          this.selectedIndexRej = null;
          this.refresh();
        });
    },
    refresh: function() {
      this.dialogForm = false;
      this.getDataList();
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