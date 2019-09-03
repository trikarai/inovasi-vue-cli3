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
                <v-list-item-action>
                  <div>
                    <v-btn small fab class="ml-2 mt-1" @click="openCollaborator()">
                      <v-icon>share</v-icon>
                    </v-btn>
                    <v-btn small fab @click="openEditParent(parentData)" class="ml-2 mt-1">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </div>
                </v-list-item-action>
              </v-list-item>
            </v-card>
            <v-list>
              <v-list-item style="padding-left:26px;padding-right:26px" :three-line="true">
                <v-list-item-content>
                  <v-list-item-title>Customer Jobs</v-list-item-title>
                  <v-list-item-subtitle>{{parentData.customerJobs}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="padding-left:26px;padding-right:26px" :three-line="true">
                <v-list-item-content>
                  <v-list-item-title>Gain</v-list-item-title>
                  <v-list-item-subtitle>{{parentData.gains}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="padding-left:26px;padding-right:26px" :three-line="true">
                <v-list-item-content>
                  <v-list-item-title>Gain Creators</v-list-item-title>
                  <v-list-item-subtitle>{{parentData.gainCreators}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="padding-left:26px;padding-right:26px" :three-line="true">
                <v-list-item-content>
                  <v-list-item-title>Pain</v-list-item-title>
                  <v-list-item-subtitle>{{parentData.pains}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="padding-left:26px;padding-right:26px" :three-line="true">
                <v-list-item-content>
                  <v-list-item-title>Pain Relievers</v-list-item-title>
                  <v-list-item-subtitle>{{parentData.painRelievers}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="padding-left:26px;padding-right:26px" :three-line="true">
                <v-list-item-content>
                  <v-list-item-title>Products And Services</v-list-item-title>
                  <v-list-item-subtitle>{{parentData.productsAndServices}}</v-list-item-subtitle>
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
        <v-layout row wrap>
          <v-flex xs12 md6>
            <v-card
              max-width="280"
              class="pb-5"
              elevation="3"
              style="margin:10px 5px 5px 5px"
              min-height="270"
            >
              <v-card class="taitelcs primary white--text elevation-5">
                <v-list-item>
                  <v-list-item-content>
                    <h3
                      class="headline mb-0 font-weight-light white--text"
                    >{{ $vuetify.lang.t('$vuetify.idea.analysis') }}</h3>
                  </v-list-item-content>
                </v-list-item>
              </v-card>

              <div class="text-center" v-if="loaderCan">
                <v-progress-circular size="50" color="omikti" indeterminate></v-progress-circular>
              </div>
              <v-card-text>
                <v-list rounded>
                  <v-list-item v-for="(item, i) in canvas.list" :key="i">
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-btn @click="gotoCanvas(item.id)" color="primary" block>{{item.name}}</v-btn>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 md6>
            <v-card
              max-width="280"
              class="pb-5"
              elevation="3"
              style="margin:10px 5px 5px 5px"
              min-height="270"
            >
              <v-card class="taitelcs primary white--text elevation-5">
                <v-list-item>
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
                <v-list rounded>
                  <v-list-item v-for="(item, i) in experiments.list" :key="i">
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-btn @click="gotoExp(item.id)" color="primary" block>{{item.name}}</v-btn>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

        <v-flex md4>
          <v-card>
            <v-card-actions>
              <v-btn
                color="primary"
                @click="gotoCompetitor()"
              >{{ $vuetify.lang.t('$vuetify.idea.competitor') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
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

import BaseCollaboration from "@/components/talent/team/components/BaseCollaboration";
import FormCollaboration from "@/components/talent/team/components/CollaboratorForm";

export default {
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
      loaderCan: false
    };
  },
  mounted: function() {
    this.getParentData();
    this.getBusinessCanvas();
    this.getExperiments();
    this.loadCollaborator();
  },
  methods: {
    getParentData: function() {
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
            this.$route.params.valuepropositionId
        )
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
</style>
