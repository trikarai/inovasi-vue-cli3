<template>
  <transition name="slide" mode="out-in">
    <div>
      <v-container>
        <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />

        <v-dialog v-model="loader" hide-overlay persistent width="300">
          <v-card color="primary">
            <v-card-text>
              {{ $vuetify.lang.t('$vuetify.info.standby') }}
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-layout align-start justify-start fill-height>
          <v-flex md6>
            <v-card>
              <v-card-title>{{params.team.name}}</v-card-title>
              <v-card-text>
                {{params.position}}
                <v-divider />
                {{params.status.displayName}}
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout align-start justify-start fill-height>
          <v-flex md6>
            <v-btn @click="openSearch()" class="mt-3">
              <v-icon>add</v-icon>Add Members
            </v-btn>
            <v-divider></v-divider>
            <!-- {{memberlist.list}} -->
            <v-data-table
              :loading="loader"
              :headers="headers"
              :items="memberlist.list"
              class="elevation-1"
            >
              <template v-slot:item.status="{ item }">
                <v-chip :color="colorStatus(item.status.value)" text-color="white">
                  <v-avatar left>
                    <v-icon>{{iconStatus(item.status.value)}}</v-icon>
                  </v-avatar>
                  {{ item.status.displayName }}
                </v-chip>
              </template>
              <template v-slot:item.action="{item}">
                <v-btn
                  small
                  color="warning"
                  @click="cancelAct(item.id)"
                  v-if="item.status.value == 'inv'"
                >
                  <v-icon left small>cancel</v-icon>Cancel
                </v-btn>
                <v-btn
                  small
                  color="red"
                  @click="removeAct(item.id)"
                  v-if="item.status.value == 'act'"
                >
                  <v-icon left small>block</v-icon>Remove
                </v-btn>
                <v-expand-transition>
                  <div v-if="item.id == selectRemove">
                    <v-btn class="ma-2" color="red" @click="removeTalent(item.id)">Yes</v-btn>
                    <v-btn @click="selectRemove = null">No</v-btn>
                  </div>
                </v-expand-transition>
                <v-expand-transition>
                  <div v-if="item.id == selectCancel">
                    <v-btn class="ma-2" color="warning" @click="cancelTalent(item.id)">Yes</v-btn>
                    <v-btn @click="selectCancel = null">No</v-btn>
                  </div>
                </v-expand-transition>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </transition>
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
      err_msg: { details: [""] },
      params: {
        id: "",
        team: { id: "", name: "" },
        position: "sasa",
        status: { value: "", displayName: "" },
        joinTime: ""
      },
      memberlist: { total: 0, list: [] },
      loader: false,
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      selectRemove: null,
      selectCancel: null,
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "talent.name"
        },
        {
          text: "Status",
          align: "left",
          sortable: false,
          value: "status"
        },
        {
          text: "Actions",
          align: "right",
          sortable: false,
          value: "action"
        }
      ]
    };
  },
  components: {
    "notification-alert": Notification
  },
  created: function() {},
  mounted: function() {
    this.getSingleData();
    setTimeout(() => {
      this.getMemberList();
    }, 1000);
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
    getSingleData: function() {
      this.loader = !this.loader;
      notif.reset(this);
      net
        .getData(
          this,
          "/talent/team-memberships/" + this.$route.params.membershipId
        )
        .then(res => {
          this.params = res.data.data;
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    getMemberList: function() {
      this.loader = true;
      notif.reset(this);
      net
        .getData(
          this,
          "/talent/as-team-member/" + this.params.team.id + "/members"
        )
        .then(res => {
          console.log(res);
          if (res.data) {
            this.memberlist = res.data.data;
          } else {
            this.memberlist = { total: 0, list: [] };
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    openSearch: function() {
      this.$router.push({
        path: "/talent/team/" + this.params.team.id + "/search"
      });
    },
    removeAct: function(id) {
      this.selectCancel = null;
      if (this.selectRemove == id) {
        this.selectRemove = null;
      } else {
        this.selectRemove = id;
      }
    },
    removeTalent: function(id) {
      notif.reset(this);
      this.loader = true;
      net
        .deleteData(
          this,
          "/talent/as-team-member/" + this.params.team.id + "/members/" + id
        )
        .then(res => {
          this.refreshMember();
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
          this.selectRemove = null;
        });
    },
    cancelAct: function(id) {
      this.selectRemove = null;
      if (this.selectCancel == id) {
        this.selectCancel = null;
      } else {
        this.selectCancel = id;
      }
    },
    cancelTalent: function(id) {
      notif.reset(this);
      this.loader = true;
      net
        .putData(
          this,
          "/talent/as-team-member/" +
            this.params.team.id +
            "/members/" +
            id +
            "/cancel-invitation"
        )
        .then(res => {
          this.refreshMember();
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
          this.selectCancel = null;
        });
    },
    refreshMember: function() {
      this.getMemberList();
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