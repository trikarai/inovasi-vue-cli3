<template>
  <div>
    <v-container>
      <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />

      <loader-dialog v-model="loader"></loader-dialog>
      <form-collaboration v-model="collaboratorForm" @setUpCollaboration="setUpCollaboration"></form-collaboration>

      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-card class="pb-5" elevation="3" style="margin:10px 15px 15px 15px">
            <v-card class="taitel primary white--text elevation-5">
              <v-list-item :three-line="true">
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-light white--text body-2"
                  >{{ $vuetify.lang.t('$vuetify.idea.valueproposition') }}</v-list-item-title>

                  <v-list-item-subtitle>
                    <h4 class="headline mb-0 white--text">{{parentData.description}}</h4>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action v-if="checkDashboard">
                  <div>
                    <v-btn small fab class="ml-2 mt-1" @click="openCollaborator()">
                      <v-icon>share</v-icon>
                    </v-btn>
                    <v-btn small fab @click="openEditParent(parentData)" class="ml-2 mt-1">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </div>
                  <!-- start garis penghubung VP - analysis -->
                  <v-scale-transition>
                    <div v-if="viewAnalysis" class="grsduasec d-none d-md-flex d-lg-flex"></div>
                  </v-scale-transition>
                  <!-- end garis penghubung VP - analysis -->

                  <!-- start panah kanan analysis -->
                  <v-scale-transition>
                    <span v-if="viewAnalysis" class="right-arrow d-none d-md-flex d-lg-flex"></span>
                  </v-scale-transition>
                  <!-- end panah kanan analysis -->
                </v-list-item-action>
              </v-list-item>
            </v-card>

            <v-card-text class="text-center" v-if="checkDashboard">
              <v-layout row wrap>
                <v-flex>
                  <v-chip class @click="gotoCompetitor()">
                    <v-icon left>supervised_user_circle</v-icon>
                    {{ $vuetify.lang.t('$vuetify.idea.competitor') }}
                  </v-chip>
                </v-flex>
                <v-flex>
                  <v-chip @click="viewBtnAna()">
                    <v-icon left>timeline</v-icon>
                    {{ $vuetify.lang.t('$vuetify.idea.analysis') }}
                  </v-chip>
                </v-flex>
                <v-flex v-if="viewExp">
                  <v-divider color="orange"></v-divider>
                </v-flex>
                <v-flex v-if="viewExp">
                  <v-chip @click="viewBtnExp()">
                    <v-icon left>local_drink</v-icon>
                    {{ $vuetify.lang.t('$vuetify.idea.experiment') }}
                  </v-chip>
                </v-flex>
              </v-layout>
            </v-card-text>

            <v-list>
              <v-list-item style="padding-left:26px;padding-right:26px" :three-line="true">
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">Customer Jobs</v-list-item-title>
                  <span v-show="parentData.customerJobs" class="subtitle-2 font-weight-light">{{parentData.customerJobs}}</span>
                  <span v-show="!parentData.customerJobs" class="caption font-weight-light">no data</span>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="padding-left:26px;padding-right:26px" :three-line="true">
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">Gain</v-list-item-title>
                  <span v-show="parentData.gains" class="subtitle-2 font-weight-light">{{parentData.gains}}</span>
                  <span v-show="!parentData.gains" class="caption font-weight-light">no data</span>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="padding-left:26px;padding-right:26px" :three-line="true">
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">Gain Creators</v-list-item-title>
                  <span v-show="parentData.gainCreators" class="subtitle-2 font-weight-light">{{parentData.gainCreators}}</span>
                  <span v-show="!parentData.gainCreators" class="caption font-weight-light">no data</span>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="padding-left:26px;padding-right:26px" :three-line="true">
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">Pain</v-list-item-title>
                  <span v-show="parentData.pains" class="subtitle-2 font-weight-light">{{parentData.pains}}</span>
                  <span v-show="!parentData.pains" class="caption font-weight-light">no data</span>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="padding-left:26px;padding-right:26px" :three-line="true">
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">Pain Relievers</v-list-item-title>
                  <span v-show="parentData.painRelievers" class="subtitle-2 font-weight-light">{{parentData.painRelievers}}</span>
                  <span v-show="!parentData.painRelievers" class="caption font-weight-light">no data</span>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="padding-left:26px;padding-right:26px" :three-line="true">
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">Products And Services</v-list-item-title>
                  <span v-show="parentData.productsAndServices" class="subtitle-2 font-weight-light">{{parentData.productsAndServices}}</span>
                  <span v-show="!parentData.productsAndServices" class="caption font-weight-light">no data</span>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <!-- start collaborator module-->
            <base-collaboration
              v-if="collaborators.total != 0"
              v-bind:collaborators="collaborators"
              @removeCollaborator="removeCollaborator"
            />
            <!-- end collaborator module-->
          </v-card>
        </v-flex>
        <!-- Start Analysis card -->
        <v-flex xs12 md3>
          <v-scale-transition>
          <v-card
            max-width
            class="pb-5"
            elevation="3"
            style="margin:10px 5px 5px 5px;z-index:1;"
            min-height="270"
            v-if="viewAnalysis"
          >
            <v-card class="taitelcs primary white--text elevation-5">
              <v-list-item>                
                <v-list-item-content>
                  <h3
                    class="headline mb-0 font-weight-light white--text"
                  >{{ $vuetify.lang.t('$vuetify.idea.analysis') }}</h3>
                </v-list-item-content>
                <v-list-item-action>
                  <!-- start garis penghubung analysis - exp -->
                  <v-scale-transition>
                    <div v-if="viewExp2" class="grsduasec2 d-none d-md-flex d-lg-flex"></div>
                  </v-scale-transition>
                  <!-- end garis penghubung analysis - exp -->
                </v-list-item-action>
              </v-list-item>
            </v-card>

            <div class="text-center" v-if="loaderCan">
              <v-progress-circular size="50" color="omikti" indeterminate></v-progress-circular>
            </div>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(item, i) in canvas.list" :key="i">
                  <v-list-item-content>
                    <v-list-item-title>{{item.name}}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-btn small @click="gotoCanvas(item.id)" color="primary">
                      <v-icon>search</v-icon>
                    </v-btn>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
          </v-scale-transition>
        </v-flex>
        <!-- end Analysis card -->

        <!-- Start experiment card -->
        <v-flex xs12 md3 v-if="viewAnalysis">
          <v-scale-transition>
          <v-card
            max-width
            class="pb-5"
            elevation="3"
            style="margin:10px 5px 5px 5px"
            min-height="270"
            v-if="viewExp2"
          >
            <v-card class="taitelcs primary white--text elevation-5">
              <v-list-item>
                <!-- start panah kanan exp -->
                  <v-x-transition>
                    <span class="right-arrow2 d-none d-md-flex d-lg-flex"></span>
                  </v-x-transition>
                  <!-- end panah kanan exp -->
                <v-list-item-content>
                  <h3
                    class="headline mb-0 font-weight-light white--text"
                  >{{ $vuetify.lang.t('$vuetify.idea.experiment') }}</h3>
                </v-list-item-content>               
              </v-list-item>
            </v-card>

            <div class="text-center" v-if="loaderExp">
              <v-progress-circular size="50" color="omikti" indeterminate></v-progress-circular>
            </div>

            <v-card-text>
              <v-list>
                <v-list-item v-for="(item, i) in experiments.list" :key="i">
                  <v-list-item-content>
                    <v-list-item-title>{{item.name}}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-btn small @click="gotoExp(item.id)" color="primary">
                      <v-icon>search</v-icon>
                    </v-btn>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
          </v-scale-transition>
        </v-flex>
        <!-- Start experiment card -->
      </v-layout>

      <ValuePropositionForm
        :data="singleData"
        :edit="edit"
        :view="view"
        v-if="dialogFormParent"
        @close="dialogFormParent = false"
        @refresh="refreshParent"
      />
    </v-container>
    <v-container>
      <span v-html="error.body" v-if="status.error"></span>
    </v-container>
  </div>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";

import ValuePropositionForm from "./ValuePropositionForm";

import { dashboardMixins } from "@/mixins/dashboardMixins";

import BaseCollaboration from "@/components/talent/team/components/BaseCollaboration";
import FormCollaboration from "@/components/talent/team/components/CollaboratorForm";

export default {
  mixins: [dashboardMixins],
  components: {
    BaseCollaboration,
    FormCollaboration,
    ValuePropositionForm,
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
      err_msg: { details: [""] },
      error: "error",
      loader: false,
      collaboratorForm: false,
      dialogDel: false,
      dialogForm: false,
      dialogFormParent: false,
      edit: false,
      view: false,
      expand: false,
      dataId: "",
      selectedIndex: null,
      parentData: "",
      singleData: { id: "", name: "" },
      collaborators: { total: 0, list: [] },
      experiments: { total: 0, list: [] },
      loaderExp: false,
      canvas: { total: 0, list: [] },
      loaderCan: false,
      viewAnalysis: false,
      viewExp: false,
      viewExp2: false
    };
  },
  mounted: function() {
    this.getParentData();
    if (this.checkDashboard) {
      this.getBusinessCanvas();
      this.getExperiments();
      this.loadCollaborator();
    }
  },
  methods: {
    viewBtnAna: function() {
      this.viewAnalysis = !this.viewAnalysis;
      this.viewExp = this.viewAnalysis;
      this.viewExp2 = false;
    },
    viewBtnExp: function() {
      this.viewExp2 = !this.viewExp2;
    },
    getParentData: function() {
      this.loader = true;
      notif.reset(this);
      var parent_uri = "";
      if (localStorage.getItem("dashboard") == "talent") {
        parent_uri =
          "/talent/as-team-member/" +
          this.$route.params.teamId +
          "/ideas/" +
          this.$route.params.ideaId +
          "/customer-segments/" +
          this.$route.params.customersegmentId +
          "/personas/" +
          this.$route.params.personaId +
          "/value-propositions/" +
          this.$route.params.valuepropositionId;
      } else if (localStorage.getItem("dashboard") == "mentor") {
        parent_uri =
          "/talent/as-programme-mentor/" +
          this.$route.params.programId +
          "/teams/" +
          this.$route.params.teamId +
          "/ideas/" +
          this.$route.params.ideaId +
          "/customer-segments/" +
          this.$route.params.customersegmentId +
          "/personas/" +
          this.$route.params.personaId +
          "/value-propositions/" +
          this.$route.params.valuepropositionId;
      }
      net
        .getData(this, parent_uri)
        .then(res => {
          this.parentData = res.data.data;
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    openEditParent: function(data) {
      this.dialogFormParent = true;
      this.view = false;
      this.edit = true;
      this.singleData = data;
    },
    openAdd: function() {
      this.dialogForm = true;
      this.view = false;
      this.edit = false;
      this.singleData = { id: "", name: "" };
    },
    refresh: function() {
      this.dialogForm = false;
      this.getDataList();
    },
    refreshParent: function() {
      this.dialogFormParent = false;
      this.getParentData();
    },
    loadCollaborator: function() {
      this.loader = true;
      notif.reset(this);
      net
        .getData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/ideas/" +
            this.$route.params.ideaId +
            "/customer-segments/" +
            this.$route.params.customersegmentId +
            "/personas/" +
            this.$route.params.personaId +
            "/value-propositions/" +
            this.$route.params.valuepropositionId +
            "/collaborators"
        )
        .then(res => {
          if (res.data.data) {
            this.collaborators = res.data.data;
          } else {
            this.collaborators = { total: 0, list: [] };
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    openCollaborator: function() {
      this.collaboratorForm = true;
    },
    setUpCollaboration: function(params) {
      net
        .putData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/ideas/" +
            this.$route.params.ideaId +
            "/customer-segments/" +
            this.$route.params.customersegmentId +
            "/personas/" +
            this.$route.params.personaId +
            "/value-propositions/" +
            this.$route.params.valuepropositionId +
            "/collaborators",
          params
        )
        .then(res => {
          this.collaboratorForm = false;
          this.loadCollaborator();
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.collaboratorForm = false;
        });
    },
    removeCollaborator: function(mentorId) {
      this.loader = true;
      net
        .deleteData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/ideas/" +
            this.$route.params.ideaId +
            "/customer-segments/" +
            this.$route.params.customersegmentId +
            "/personas/" +
            this.$route.params.personaId +
            "/value-propositions/" +
            this.$route.params.valuepropositionId +
            "/collaborators/" +
            mentorId
        )
        .then(res => {
          this.loadCollaborator();
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    getBusinessCanvas: function() {
      this.loaderCan = true;
      net
        .getData(this, "/talent/forms?types[]=can")
        .then(res => {
          if (res.data.data) {
            this.canvas = res.data.data;
          } else {
            this.canvas = { total: 0, list: [] };
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loaderCan = false;
        });
    },
    gotoCanvas: function(id) {
      this.$router.push({
        path:
          "/talent/team/" +
          this.$route.params.teamId +
          "/idea/" +
          this.$route.params.ideaId +
          "/customersegment/" +
          this.$route.params.customersegmentId +
          "/persona/" +
          this.$route.params.personaId +
          "/vp/" +
          this.$route.params.valuepropositionId +
          "/analysis/" +
          id
      });
    },
    gotoExp: function(id) {
      this.$router.push({
        path:
          "/talent/team/" +
          this.$route.params.teamId +
          "/idea/" +
          this.$route.params.ideaId +
          "/customersegment/" +
          this.$route.params.customersegmentId +
          "/persona/" +
          this.$route.params.personaId +
          "/vp/" +
          this.$route.params.valuepropositionId +
          "/experiment/" +
          id
      });
    },
    gotoCompetitor: function(id) {
      this.$router.push({
        path:
          "/talent/team/" +
          this.$route.params.teamId +
          "/idea/" +
          this.$route.params.ideaId +
          "/customersegment/" +
          this.$route.params.customersegmentId +
          "/persona/" +
          this.$route.params.personaId +
          "/vp/" +
          this.$route.params.valuepropositionId +
          "/competitor"
      });
    },
    getExperiments: function() {
      this.loaderExp = true;
      net
        .getData(this, "/talent/forms?types[]=exp")
        .then(res => {
          if (res.data.data) {
            this.experiments = res.data.data;
          } else {
            this.experiments = { total: 0, list: [] };
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loaderExp = false;
        });
    }
  }
};
</script>

<style scoped>
.taitel {
  padding: 14px;
  width: 90%;
  margin: 0 auto;
  bottom: 27px;
  z-index: 2;
}
.taitelcs {
  padding: 17px;
  width: 90%;
  margin: 0 auto;
  bottom: 27px;
  z-index: 2;
}
.grsduasec {
  background: #00667f;
  width: 99px;
  height: 11px;
  position: relative;
  left: 106px;
  bottom: 35px;
}
.grsduasec2 {
  background: #00667f;
  width: 38px;
  height: 11px;
  position: relative;
  left: 70px;
}
.right-arrow {
  border-color: transparent #fb7307;
  border-style: solid;
  border-width: 20px 0px 20px 25px;
  height: 0px;
  width: 0px;
  position: relative;
  left: 106px;
  bottom: 60px;
  z-index: 90;
}
.right-arrow2 {
  border-color: transparent #fb7307;
  border-style: solid;
  border-width: 20px 0px 20px 25px;
  height: 0px;
  width: 0px;
  position: relative;
  right: 41px;
  bottom: 0px;
  z-index: 90;
}
</style>
