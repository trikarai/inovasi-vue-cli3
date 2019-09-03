<template>
  <transition name="slide" mode="out-in">
    <div>
      <v-container>
        <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />

        <loader-dialog v-model="loader"></loader-dialog>

        <v-layout row>
          <v-flex md6>
            <v-card class="pb-5" elevation="3" style="margin:15px 15px 15px 10px">
              <v-card class="taitel primary white--text elevation-5">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-light white--text body-2"
                  >{{ $vuetify.lang.t('$vuetify.team.teamName') }} <v-chip small color="omikti" dark>{{params.status.displayName}}</v-chip></v-list-item-title>

                  <v-list-item-subtitle>
                    <h4 class="headline mb-0 white--text">{{params.team.name}}</h4>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <div>
                    <v-btn small fab @click="" class="ml-2 mt-1">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </div>
                </v-list-item-action>
              </v-list-item>
            </v-card>

            <v-list-item style="padding-left:26px;padding-right:26px" :three-line="true">
              <v-list-item-content>
                <v-list-item-title>Vision</v-list-item-title>
                <span class="grey--text font-weight-light">{{params.team.vision}}</span>
              </v-list-item-content>
            </v-list-item>

            <v-list-item style="padding-left:26px;padding-right:26px" :three-line="true">
              <v-list-item-content>
                <v-list-item-title>Mission</v-list-item-title>
                <span class="grey--text font-weight-light">{{params.team.mission}}</span>
              </v-list-item-content>
            </v-list-item>

            <v-list-item style="padding-left:26px;padding-right:26px" :three-line="true">
              <v-list-item-content>
                <v-list-item-title>Culture</v-list-item-title>
                <span class="grey--text font-weight-light">{{params.team.culture}}</span>
              </v-list-item-content>
            </v-list-item>

            <v-list-item style="padding-left:26px;padding-right:26px" :three-line="true">
              <v-list-item-content>
                <v-list-item-title>Founder Agreement</v-list-item-title>
                <span class="grey--text font-weight-light">{{params.team.founderAgreement}}</span>
              </v-list-item-content>
            </v-list-item>

            </v-card>
          </v-flex>

          <v-flex md6>
            <!-- {{memberlist.list}} -->
            <v-card class="taitel3 primary white--text elevation-5">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-light white--text title"
                  >{{ $vuetify.lang.t('$vuetify.team.listMember') }} </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <div>
                    <v-btn small fab class="ml-2 mt-1" @click="openSearch()">
                      <v-icon>person_add</v-icon>
                    </v-btn>
                  </div>
                </v-list-item-action>
              </v-list-item>
            </v-card>
            <v-data-table
              :loading="loader"
              :headers="headers"
              :items="memberlist.list"
              class="elevation-3 pdngats"
              style="margin:0px 15px 15px 10px;position: relative;bottom: 96px;"
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
                  dark
                  color="warning"
                  @click="cancelAct(item.id)"
                  v-if="item.status.value == 'inv'"
                >
                  <v-icon left small>cancel</v-icon>Cancel
                </v-btn>
                <v-btn
                  small
                  dark
                  color="red"
                  class="mt-2 mb-2"
                  @click="removeAct(item.id)"
                  v-if="item.status.value == 'act'"
                >
                  <v-icon left small>block</v-icon>Remove
                </v-btn>
                <v-expand-transition>              
                  <div v-if="item.id == selectRemove">
                    <div class="mt-1">
                      <v-icon left>warning</v-icon> Are You Sure ?!
                    </div>
                    <v-btn small dark class="ma-2" color="red" @click="removeTalent(item.id)">Yes</v-btn>
                    <v-btn small text @click="selectRemove = null">No</v-btn>
                  </div>
                </v-expand-transition>
                <v-expand-transition>
                  <div v-if="item.id == selectCancel">
                    <div class="mt-1">
                      <v-icon left>warning</v-icon> Are You Sure ?!
                    </div>
                    <v-btn small dark class="ma-2" color="warning" @click="cancelTalent(item.id)">Yes</v-btn>
                    <v-btn small text @click="selectCancel = null">No</v-btn>
                  </div>
                </v-expand-transition>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>

        <!-- <v-layout align-start justify-start fill-height>
          <v-flex md6>
            <v-btn @click="openSearch()" class="mt-3">
              <v-icon>add</v-icon>Add Members
            </v-btn>
            <v-divider></v-divider>
            {{memberlist.list}}
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
        </v-layout> -->
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
.taitel {
  padding: 14px;
  width: 90%;
  margin: 0 auto;
  bottom: 27px;
  z-index: 2;
}
.taitel3 {
  padding: 14px;
  width: 89%;
  margin: 0 auto;
  bottom: 27px;
  z-index: 2;
  margin-top: 16px;
  margin-left: 5%
}

</style>

<style>
.pdngats .v-data-table__wrapper {
  padding-top: 72px !important;
}
</style>