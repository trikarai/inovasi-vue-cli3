<template>
  <transition name="slide" mode="out-in">
    <div>
      <v-container>
        <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
        <v-btn color="blue" append to="/talent/create/team" style="left: -8px">
          <v-icon>add</v-icon>
          {{ $vuetify.t('$vuetify.action.create') }} {{ $vuetify.t('$vuetify.team.team') }}
        </v-btn>
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
        <v-divider></v-divider>
        <v-data-table :headers="headers" :items="team.list" class="elevation-1">
          <template v-slot:items="props">
            <td>{{ props.item.team.name }}</td>
            <td>{{ props.item.position }}</td>
            <td>
              <v-chip :color="colorStatus(props.item.status.value)" text-color="white">
                <v-avatar>
                  <v-icon>{{iconStatus(props.item.status.value)}}</v-icon>
                </v-avatar>
                {{ props.item.status.displayName }}
              </v-chip>
            </td>
            <td class="text-xs-right">
              <v-btn
                v-if="ifShow(props.item.status.value)"
                small
                @click="openIdea(props.item.team.id)"
              >{{$vuetify.t('$vuetify.idea.idea')}}</v-btn>
              <v-btn
                v-if="ifShow(props.item.status.value)"
                small
                @click="openParticipation(props.item.team.id)"
              >{{$vuetify.t('$vuetify.team.programParticipation')}}</v-btn>
              <v-btn
                small
                @click="openDetail(props.item.id)"
                v-if="ifShow(props.item.status.value)"
              >
                <v-icon small>pageview</v-icon>
                {{ $vuetify.t('$vuetify.action.view') }}
              </v-btn>
              <v-btn
                small
                color="warning"
                @click="deleteAct(props.index)"
                v-if="ifShow(props.item.status.value)"
              >
                <v-icon small>outlined_flag</v-icon>
                {{ $vuetify.t('$vuetify.team.quit') }}
              </v-btn>
              <v-expand-transition>
                <div v-show="props.index == selectedIndex">
                  {{ $vuetify.t('$vuetify.action.confirmationtoquit') }}
                  <v-btn @click="deleteData(props.item.id)" color="red">
                    <v-icon></v-icon>
                    {{ $vuetify.t('$vuetify.action.yes') }}
                  </v-btn>
                  <v-btn @click="deleteAct(null)">
                    <v-icon></v-icon>
                    {{ $vuetify.t('$vuetify.action.cancel') }}
                  </v-btn>
                </div>
              </v-expand-transition>

              <v-btn
                small
                color="primary"
                @click="acceptAct(props.index)"
                v-if="props.item.status.value === 'inv'"
              >
                <v-icon small>check_circle</v-icon>
                <!-- {{ $vuetify.t('$vuetify.team.quit') }} -->
                Accept
              </v-btn>

              <v-btn
                small
                color="red"
                @click="rejectAct(props.index)"
                v-if="props.item.status.value === 'inv'"
              >
                <v-icon small>close</v-icon>
                <!-- {{ $vuetify.t('$vuetify.team.quit') }} -->
                Reject
              </v-btn>

              <v-expand-transition>
                <div v-show="props.index == selectedIndexAcc">
                  <!-- {{ $vuetify.t('$vuetify.action.confirmationtoquit') }} -->
                  <v-btn @click="acceptInvitation(props.item.id)" color="blue">
                    <v-icon></v-icon>
                    {{ $vuetify.t('$vuetify.action.yes') }}
                  </v-btn>
                  <v-btn @click="acceptAct(null)">
                    <v-icon></v-icon>
                    {{ $vuetify.t('$vuetify.action.cancel') }}
                  </v-btn>
                </div>
              </v-expand-transition>
              <v-expand-transition>
                <div v-show="props.index == selectedIndexRej">
                  <!-- {{ $vuetify.t('$vuetify.action.confirmationtoquit') }} -->
                  <v-btn @click="rejectInvitation(props.item.id)" color="red">
                    <v-icon></v-icon>
                    {{ $vuetify.t('$vuetify.action.yes') }}
                  </v-btn>
                  <v-btn @click="rejectAct(null)">
                    <v-icon></v-icon>
                    {{ $vuetify.t('$vuetify.action.cancel') }}
                  </v-btn>
                </div>
              </v-expand-transition>
            </td>
          </template>
        </v-data-table>
      </v-container>

      <TeamForm
        :data="singleData"
        v-bind:edit="edit"
        v-bind:view="view"
        v-if="dialogForm"
        @close="dialogForm = false"
      />
    </div>
  </transition>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";
import TeamForm from "@/components/talent/team/TeamForm";
export default {
  components: {
    TeamForm,
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
      err_msg: "",
      loader: false,
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      selectedIndex: null,
      selectedIndexAcc: null,
      selectedIndexRej: null,
      headers: [
        {
          text: "Team Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Position", value: "positon", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "", value: "id", sortable: false }
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
      }else{
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
      if (this.selectedIndex == id) {
        this.selectedIndex = null;
      } else {
        this.selectedIndex = id;
      }
    },
    acceptAct: function(id) {
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
      if (this.selectedIndexRej == id) {
        this.selectedIndexRej = null;
      } else {
        this.selectedIndexRej = id;
      }
    },
    deleteData: function(id) {
      var app = this;
      this.status.error = false;
      this.status.info = false;
      net
        .putData(this, "/talent/team-memberships/" + id + "/quit")
        .then(res => {
          notif.showInfo(this, res);
        })
        .catch(error => {
          notif.showErrow(this, error);
        })
        .finally(function() {
          app.refresh();
        });
    },
    acceptInvitation: function(id) {
      this.status.error = false;
      this.status.info = false;
      net
        .putData(this, "/talent/team-memberships/" + id + "/accept-invitation")
        .then(res => {
          notif.showInfo(this, res);
        })
        .catch(error => {
          notif.showErrow(this, error);
        })
        .finally(function() {
          this.refresh();
        });
    },
    rejectInvitation: function(id) {
      this.status.error = false;
      this.status.info = false;
      net
        .putData(this, "/talent/team-memberships/" + id + "/reject-invitation")
        .then(res => {
          notif.showInfo(this, res);
        })
        .catch(error => {
          notif.showErrow(this, error);
        })
        .finally(function() {
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