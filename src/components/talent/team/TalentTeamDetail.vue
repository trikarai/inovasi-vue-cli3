<template>
  <transition name="slide" mode="out-in">
    <div>
      <v-container>
        <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />

        <loader-dialog v-model="loader"></loader-dialog>

        <v-layout row>
          <v-flex md6>
            <v-form v-model="valid" ref="form">
              <v-card class="pb-5" elevation="3" style="margin:15px 15px 15px 10px">
                <v-card class="taitel primary white--text elevation-5">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-light white--text body-2">
                        {{ $vuetify.lang.t('$vuetify.team.teamName') }}
                        <v-chip small color="omikti" dark>{{params.status.displayName}}</v-chip>
                      </v-list-item-title>

                      <v-list-item-subtitle v-if="!edit">
                        <h4 class="headline mb-0 white--text">{{params.team.name}}</h4>
                      </v-list-item-subtitle>
                      <v-flex class="mt-2">
                        <v-text-field
                          v-if="edit"
                          position="absolute"
                          v-model="params.team.name"
                          :counter="25"
                          :rules="nameRules"
                          color="white"
                          single-line
                          solo
                          :label="$vuetify.lang.t('$vuetify.team.teamName')"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-list-item-content>
                    <v-list-item-action>
                      <div>
                        <v-btn small fab @click="openEdit()" class="ml-2 mt-1">
                          <v-icon small v-if="!edit">edit</v-icon>
                          <v-icon color="red" small v-if="edit">cancel</v-icon>
                        </v-btn>
                      </div>
                    </v-list-item-action>
                  </v-list-item>
                </v-card>

                <v-list-item
                  style="padding-left:26px;padding-right:26px"
                  :three-line="true"
                  v-if="!edit"
                >
                  <v-list-item-content>
                    <v-list-item-title>Vision</v-list-item-title>
                    <span class="grey--text font-weight-light">{{params.team.vision}}</span>
                  </v-list-item-content>
                </v-list-item>
                <v-flex v-if="edit" class="ml-5 mr-5">
                  <v-tooltip max-width="250" right>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        style="float:right;width:24px;height:24px;"
                        fab
                        small
                        elevation="0"
                        color="primary"
                        dark
                        v-on="on"
                      >
                        <v-icon small>priority_high</v-icon>
                      </v-btn>
                    </template>
                    <span>Vision Statement adalah kalimat yang mendeskripsikan masa depan dari bisnis anda. Contoh Vision Statement dari Amazon: To be Earth’s most customer-centric company, where customers can find and discover anything they might want to buy online.</span>
                  </v-tooltip>
                  <v-textarea
                    v-model="params.team.vision"
                    :label="$vuetify.lang.t('$vuetify.team.vision')"
                    :placeholder="$vuetify.lang.t('$vuetify.team.writeHere')"
                    counter
                  ></v-textarea>
                </v-flex>

                <v-list-item
                  style="padding-left:26px;padding-right:26px"
                  :three-line="true"
                  v-if="!edit"
                >
                  <v-list-item-content>
                    <v-list-item-title>Mission</v-list-item-title>
                    <span class="grey--text font-weight-light">{{params.team.mission}}</span>
                  </v-list-item-content>
                </v-list-item>
                <v-flex v-if="edit" class="ml-5 mr-5">
                  <v-tooltip max-width="250" right>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        style="float:right;width:24px;height:24px;"
                        fab
                        small
                        elevation="0"
                        color="primary"
                        dark
                        v-on="on"
                      >
                        <v-icon small>priority_high</v-icon>
                      </v-btn>
                    </template>
                    <span>Mission Statement adalah kalimat yang mendeskripsikan tentang bisnis anda, tujuan serta cara perusahaan anda untuk mencapai tujuan tersebut. Contoh Mission Statement dari Amazon: We strive to offer our customers the lowest possible prices, the best available selection, and the utmost convenience.</span>
                  </v-tooltip>
                  <v-textarea
                    v-model="params.team.mission"
                    :label="$vuetify.lang.t('$vuetify.team.mission')"
                    :placeholder="$vuetify.lang.t('$vuetify.team.writeHere')"
                    counter
                  ></v-textarea>
                </v-flex>

                <v-list-item
                  style="padding-left:26px;padding-right:26px"
                  :three-line="true"
                  v-if="!edit"
                >
                  <v-list-item-content>
                    <v-list-item-title>Culture</v-list-item-title>
                    <span class="grey--text font-weight-light">{{params.team.culture}}</span>
                  </v-list-item-content>
                </v-list-item>
                <v-flex class="mr-5 ml-5" v-if="edit">
                  <v-tooltip max-width="250" right>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        style="float:right;width:24px;height:24px;"
                        fab
                        small
                        elevation="0"
                        color="primary"
                        dark
                        v-on="on"
                      >
                        <v-icon small>priority_high</v-icon>
                      </v-btn>
                    </template>
                    <span>Culture/Budaya menjelaskan karakter dari perusahaan anda. Menjelaskan bagaimana perusahaan anda bekerja. Company Culture memiliki berbagai unsur, termasuk lingkungan kerja, tujuan perusahaan, etos kerja, dan value dari perusahaan.</span>
                  </v-tooltip>
                  <v-textarea
                    v-model="params.team.culture"
                    :label="$vuetify.lang.t('$vuetify.team.culture')"
                    :placeholder="$vuetify.lang.t('$vuetify.team.writeHere')"
                    counter
                  ></v-textarea>
                </v-flex>

                <v-list-item
                  style="padding-left:26px;padding-right:26px"
                  :three-line="true"
                  v-if="!edit"
                >
                  <v-list-item-content>
                    <v-list-item-title>Founder Agreement</v-list-item-title>
                    <span class="grey--text font-weight-light">{{params.team.founderAgreement}}</span>
                  </v-list-item-content>
                </v-list-item>
                <v-flex class="mr-5 ml-5" v-if="edit">
                  <v-textarea
                    v-model="params.team.founderAgreement"
                    :label="$vuetify.lang.t('$vuetify.team.founderAgreement')"
                    :placeholder="$vuetify.lang.t('$vuetify.team.writeHere')"
                    counter
                  ></v-textarea>
                </v-flex>

                <v-flex v-if="edit">
                  <v-btn
                    class="ml-5"
                    @click.prevent="validateTeam"
                    :class=" { 'primary white--text' : valid}"
                    :disabled="!valid"
                  >{{ $vuetify.lang.t('$vuetify.action.update')}} {{ $vuetify.lang.t('$vuetify.team.team')}}</v-btn>
                </v-flex>
              </v-card>
            </v-form>
          </v-flex>

          <v-flex md6>
            <!-- {{memberlist.list}} -->
            <v-card class="taitel3 primary white--text elevation-5">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-light white--text title"
                  >{{ $vuetify.lang.t('$vuetify.team.listMember') }}</v-list-item-title>
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
                      <v-icon left>warning</v-icon>Are You Sure ?!
                    </div>
                    <v-btn small dark class="ma-2" color="red" @click="removeTalent(item.id)">Yes</v-btn>
                    <v-btn small text @click="selectRemove = null">No</v-btn>
                  </div>
                </v-expand-transition>
                <v-expand-transition>
                  <div v-if="item.id == selectCancel">
                    <div class="mt-1">
                      <v-icon left>warning</v-icon>Are You Sure ?!
                    </div>
                    <v-btn
                      small
                      dark
                      class="ma-2"
                      color="warning"
                      @click="cancelTalent(item.id)"
                    >Yes</v-btn>
                    <v-btn small text @click="selectCancel = null">No</v-btn>
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
      ],
      posRules: [v => !!v || "Position is required"],
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 25 || "Name must be less than 10 characters"
      ],
      item: ["Hustler", "Hacker", "Hipster"]
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
    validateTeam: function() {
      if (this.$refs.form.validate()) {
        this.updateTeam();
      } else {
        this.$vuetify.goTo(this.$refs.form, {
          duration: 500,
          offset: 0,
          easing: "linear"
        });
      }
    },
    updateTeam: function() {
      this.loader = !this.loader;
      notif.reset(this);
      net
        .putData(
          this,
          "/talent/as-team-member/" + this.params.team.id,
          this.params.team
        )
        .then(res => {
          notif.showSuccess(this, res, ["Updated"]);
          this.edit = false;
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
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
    },
    openEdit: function() {
      this.edit = !this.edit;
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
  margin-left: 5%;
}
</style>

<style>
.pdngats .v-data-table__wrapper {
  padding-top: 72px !important;
}
</style>