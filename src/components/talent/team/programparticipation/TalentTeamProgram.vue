<template>
  <transition name="slide" mode="out-in">
    <div>
      <v-container>
        <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
        <v-btn
          color="blue"
          append
          :to="'/talent/team/'+ $route.params.teamId + '/participation/register'"
          style="left: -8px"
        >
          <v-icon>add</v-icon>Register a Program
        </v-btn>
        <v-dialog v-model="loader" hide-overlay persistent width="300">
          <v-card color="primary">
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
        <v-data-table
          :loading="loader"
          :headers="headers"
          :items="program.list"
          :pagination.sync="pagination"
          :server-items-length="program.total"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.programme.name }}</td>
            <td>
              <v-chip :color="setColor(props.item.status)" text-color="white">
                <v-avatar>
                  <v-icon>{{setIcon(props.item.status)}}</v-icon>
                </v-avatar>
                {{ props.item.status }}
              </v-chip>
            </td>
            <td class="text-xs-right">
              <v-btn small @click="openMentoring(props.item.id)">
                <v-icon small left>today</v-icon>
                {{ $vuetify.t('$vuetify.mentoring.mentoringsession') }}
              </v-btn>

              <!-- <v-btn small @click="openDetail(props.item.id)">
                <v-icon small left>pageview</v-icon>
                {{ $vuetify.t('$vuetify.action.view') }}
              </v-btn>-->

              <v-btn v-if="props.item.status == applied" small dark color="warning" @click="cancelAct(props.item.id)">
                <v-icon small>outlined_flag</v-icon>
                {{ $vuetify.t('$vuetify.action.cancel') }}
              </v-btn>

              <v-btn v-if="props.item.status == active"  small dark color="red" @click="quitAct(props.item.id)">
                <v-icon small>outlined_flag</v-icon>
                {{ $vuetify.t('$vuetify.team.quit') }}
              </v-btn>

              <v-expand-transition>
                <div v-show="props.item.id == selectedQui">
                  {{ $vuetify.t('$vuetify.action.confirmationtoquit') }}
                  <v-btn @click="quitData(props.item.id)" color="red">
                    <v-icon></v-icon>
                    {{ $vuetify.t('$vuetify.action.yes') }}
                  </v-btn>
                  <v-btn @click="quitAct(null)">
                    <v-icon></v-icon>
                    {{ $vuetify.t('$vuetify.action.cancel') }}
                  </v-btn>
                </div>
              </v-expand-transition>

              <v-expand-transition>
                <div v-show="props.item.id == selectedCan">
                  {{ $vuetify.t('$vuetify.action.confirmationtocancel') }}
                  <v-btn @click="cancelData(props.item.id)" color="red">
                    <v-icon></v-icon>
                    {{ $vuetify.t('$vuetify.action.yes') }}
                  </v-btn>
                  <v-btn @click="cancelAct(null)">
                    <v-icon></v-icon>
                    {{ $vuetify.t('$vuetify.action.cancel') }}
                  </v-btn>
                </div>
              </v-expand-transition>
            </td>
          </template>
        </v-data-table>
      </v-container>

      <!-- <TeamForm
        :data="singleData"
        v-bind:edit="edit"
        v-bind:view="view"
        v-if="dialogForm"
        @close="dialogForm = false"
      />-->
    </div>
  </transition>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";
// import TeamForm from "@/components/talent/program/TeamForm";
export default {
  components: {
    // TeamForm,
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
      singleData: { id: "", name: "" },
      err_msg: { details: [""] },
      loader: false,
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      selectedIndex: null,
      selectedCan: null,
      selectedQui: null,
      headers: [
        {
          text: "Program Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Status", value: "status", sortable: false },
        { text: "", value: "id", sortable: false }
      ],
      program: {
        total: 0,
        list: []
      },
      select: "",
      queryurl: "",
      querypage: "",
      items: [
        { displayName: "Applied", value: "app" },
        { displayName: "Active ", value: "act" },
        { displayName: "Canceled", value: "can" },
        { displayName: "Rejected", value: "rej" },
        { displayName: "Quit", value: "qui" }
      ],
      pagination: {}
    };
  },
  created: function() {
    // page=1&pageSize=10
    this.pagination.page = 1;
    this.pagination.rowsPerPage = 10;
  },
  watch: {
    select: "buildQueryUrl",
    pagination: "buildQueryPage"
  },
  mounted: function() {
    this.querypage =
      "?page=" +
      this.pagination.page +
      "&pageSize=" +
      this.pagination.rowsPerPage;
    this.getDataList();
  },
  methods: {
    setColor: function(status) {
      var color = "grey";
      if (status === "active") {
        color = "green";
      } else if (status === "applied") {
        color = "blue";
      } else if (status === "quit") {
        color = "red";
      } else if (status === "cancelled") {
        color = "warning";
      } else if (status === "rejected") {
        color = "red";
      } else {
      }
      return color;
    },
    setIcon: function(status) {
      var icon = "check";
      if (status === "active") {
        icon = "check_circle";
      } else if (status === "applied") {
        icon = "hourglass_empty";
      } else if (status === "quit") {
        icon = "flag";
      } else if (status === "cancelled") {
        icon = "cancel";
      } else if (status === "rejected") {
        icon = "remove_circle";
      } else {
      }
      return icon;
    },
    buildQueryPage: function() {
      this.querypage =
        "?page=" +
        this.pagination.page +
        "&pageSize=" +
        this.pagination.rowsPerPage;
      this.getDataList();
    },
    buildQueryUrl: function() {
      this.queryurl = "";
      if (this.select.length === 0) {
        this.queryurl = "";
      } else if (this.select.length === 1) {
        this.queryurl = "&statuses[]=" + this.select[0].value;
      } else if (this.select.length > 1) {
        for (var i = 0; i < this.select.length; i++) {
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
            this.querypage +
            this.queryurl
        )
        .then(res => {
          if (res.data.data) {
            this.program = res.data.data;
          } else {
            this.program.list = [];
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(function() {
          this.loader = false;
        });
    },
    openDetail: function(id) {
      // this.$router.push({path: "/talent/program/"+ id})
    },
    openMentoring: function(id) {
      this.$router.push({
        path:
          "/talent/team/" +
          this.$route.params.teamId +
          "/participation/" +
          id +
          "/mentoring"
      });
    },
    openAdd: function() {
      this.dialogForm = true;
      this.view = false;
      this.edit = false;
      this.singleData = { id: "", name: "" };
    },
    quitAct: function(id) {
      this.selectedCan = null;
      if (this.selectedQui == id) {
        this.selectedQui = null;
      } else {
        this.selectedQui = id;
      }
    },
    cancelAct: function(id) {
      this.selectedQui = null;
      if (this.selectedCan == id) {
        this.selectedCan = null;
      } else {
        this.selectedCan = id;
      }
    },
    quitData: function(id) {
      this.loader = true;
      notif.reset(this);
      net
        .putData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/programme-participations/" +
            id +
            "/quit"
        )
        .then(res => {
          notif.showInfo(this, res, ["Successfully Quit Program"]);
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.selectedQui = null;
          this.selectedCan = null;
          this.refresh();
        });
    },
    cancelData: function(id) {
      this.loader = true;
      notif.reset(this);
      net
        .putData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/programme-participations/" +
            id +
            "/cancel-registration"
        )
        .then(res => {
          notif.showInfo(this, res, ["Successfully Cancel Program"]);
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.selectedQui = null;
          this.selectedCan = null;
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