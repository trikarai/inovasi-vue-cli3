<template>
  <div>
    <v-container>
      <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />

      <loader-dialog v-model="loader"></loader-dialog>
      <form-collaboration v-model="collaboratorForm" @setUpCollaboration="setUpCollaboration"></form-collaboration>

      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-card class="pb-5" elevation="3" style="margin:10px">
            <v-card class="taitel primary white--text elevation-5 pt-2">
              <v-list-item :three-line="true">
                <v-list-item-avatar v-if="parentData.aMainIdea">
                  <v-badge v-model="parentData.aMainIdea" left class="ml-4 mt-1">
                    <template v-slot:badge>
                      <v-icon size="25" color="omikti">star</v-icon>
                    </template>
                  </v-badge>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-light white--text body-2"
                  >{{ $vuetify.lang.t('$vuetify.idea.ideaName') }}</v-list-item-title>
                  <v-list-item-subtitle>
                    <h4 class="white--text">{{parentData.name}}</h4>
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
                  <div class="grsduasec d-none d-md-flex d-lg-flex"></div>
                </v-list-item-action>
              </v-list-item>
            </v-card>
            <v-list-item style="padding-left:26px;padding-right:26px" :three-line="true">
              <v-list-item-content>
                <v-list-item-title>Elevator Pitch</v-list-item-title>
                <span class="grey--text font-weight-light">{{parentData.elevatorPitch}}</span>
              </v-list-item-content>
            </v-list-item>
            <v-card-text class="caption" style="padding-left:26px;padding-right:26px">
              Initiator :
              <b>{{parentData.initiator.talent.name}}</b>
            </v-card-text>
            <!-- start comment module-->
            <base-comment v-bind:collaborators="collaborators" />
            <!-- end comment module-->
            <!-- start collaborator module-->
            <base-collaboration
              v-if="collaborators.total != 0"
              v-bind:collaborators="collaborators"
              @removeCollaborator="removeCollaborator"
            />
            <!-- end collaborator module-->
          </v-card>
        </v-flex>

        <v-flex xs12 md6 v-if="checkDashboard">
          <!-- <v-flex xs12 md6> -->
          <v-card class="pb-5" elevation="3" style="margin:10px" min-height="270">
            <v-card class="taitelcs primary white--text elevation-5">
              <v-list-item>
                <span class="right-arrow d-none d-md-flex d-lg-flex"></span>
                <v-list-item-content>
                  <h3
                    class="headline mb-0 font-weight-light white--text"
                  >{{ $vuetify.lang.t('$vuetify.idea.customersegment') }}</h3>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn small fab @click="openAdd" class="ml-2 mt-1">
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-card>
            <v-list subheader style="margin:0px 10px 10px 10px">
              <v-list-item v-for="item in data.list" :key="item.id">
                <v-list-item-avatar>
                  <v-btn text @click="openDetail(item.id)">
                    <v-icon large>pageview</v-icon>
                  </v-btn>
                </v-list-item-avatar>
                <v-list-item-content>{{item.name}}</v-list-item-content>
                <v-list-item-action>
                  <v-flex>
                    <v-btn
                      color="warning"
                      @click="deleteAct(item.id)"
                      v-if="selectedIndex == null"
                      small
                    >
                      <!-- <v-icon>delete</v-icon>  -->
                      delete
                    </v-btn>

                    <v-flex v-show="item.id == selectedIndex">
                      <v-icon>warning</v-icon>
                      <span
                        class="caption"
                      >{{ $vuetify.lang.t('$vuetify.action.confirmationtodelete') }}</span>
                      <br />
                      <v-btn small dark @click="deleteData(item.id)" color="red" class="ml-10">
                        <v-icon></v-icon>
                        {{ $vuetify.lang.t('$vuetify.action.yes') }}
                      </v-btn>
                      <v-btn class="ml-2" small text @click="deleteAct(null)">
                        <v-icon></v-icon>
                        {{ $vuetify.lang.t('$vuetify.action.cancel') }}
                      </v-btn>
                    </v-flex>
                  </v-flex>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <template v-if="!mentorErrorCS">
              <template v-if="data.total===0">
                <p
                  class="text-center"
                  style="margin-top:30px;"
                >{{ $vuetify.lang.t('$vuetify.noDataText') }}</p>
              </template>
            </template>
            <template v-else>
              <v-alert
                class="ma-3"
                outlined
                type="warning"
                prominent
                border="left"
              >{{err_msg.details[0]}}</v-alert>
            </template>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout></v-layout>
    </v-container>
    <v-container>
      <span v-html="error.body" v-if="status.error"></span>
    </v-container>

    <CustomerSegmentForm
      :data="singleData"
      v-bind:edit="edit"
      v-bind:view="view"
      v-if="dialogForm"
      @close="dialogForm = false"
      @refresh="refresh"
    />
    <IdeaForm
      :data="singleData"
      v-bind:edit="edit"
      v-bind:view="view"
      v-if="dialogFormParent"
      @close="dialogFormParent = false"
      @refresh="refreshParent"
    />
  </div>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";

import { dashboardMixins } from "@/mixins/dashboardMixins";

import Notification from "@/components/Notification";
import CustomerSegmentForm from "./customersegment/CustomerSegmentForm";
import IdeaForm from "./IdeaForm";

import BaseCollaboration from "@/components/talent/team/components/BaseCollaboration";
import BaseComment from "@/components/talent/team/components/BaseComment";
import FormCollaboration from "@/components/talent/team/components/CollaboratorForm";

export default {
  mixins: [dashboardMixins],
  components: {
    IdeaForm,
    CustomerSegmentForm,
    BaseCollaboration,
    BaseComment,
    FormCollaboration,
    "notification-alert": Notification
  },
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
      error: "error",
      loader: false,
      dialogDel: false,
      dialogForm: false,
      dialogFormParent: false,
      edit: false,
      view: false,
      expand: false,
      dataId: "",
      selectedIndex: null,
      data: { total: 0, list: [] },
      parentData: {
        id: "",
        name: "",
        description: "",
        targetCustomer: "",
        problemConfront: "",
        valueProposed: "",
        revenueModel: "",
        initiator: {
          id: "",
          talent: {
            id: "",
            name: ""
          }
        },
        aMainIdea: false
      },
      singleData: { id: "", name: "" },
      collaborators: { total: 0, list: [] },
      collaboratorForm: false,
      mentorErrorCS: false
    };
  },
  watch: {},
  computed: {},
  mounted: function() {
    this.getParentData();
    if (this.checkDashboard) {
      this.getDataList();
      this.loadCollaborator();
    }
  },
  methods: {
    getParentData: function() {
      this.loader = true;
      notif.reset(this);
      var parent_uri = "";
      if (localStorage.getItem("dashboard") == "talent") {
        parent_uri =
          "/talent/as-team-member/" +
          this.$route.params.teamId +
          "/ideas/" +
          this.$route.params.ideaId;
      } else if (localStorage.getItem("dashboard") == "mentor") {
        parent_uri =
          "/talent/as-programme-mentor/" +
          this.$route.params.programId +
          "/teams/" +
          this.$route.params.teamId +
          "/ideas/" +
          this.$route.params.ideaId;
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
    getDataList: function() {
      this.loader = true;
      net
        .getData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/ideas/" +
            this.$route.params.ideaId +
            "/customer-segments"
        )
        .then(res => {
          if (res.data.data) {
            this.data = res.data.data;
          } else {
            this.data = { total: 0, list: [] };
          }
        })
        .catch(error => {
          notif.showError(this, error);
          if (localStorage.getItem("dashboard") == "mentor") {
            this.mentorErrorCS = true;
          }
        })
        .finally(() => {
          this.loader = false;
        });
    },
    openDetail: function(id) {
      this.$router.push({
        path:
          "/talent/team/" +
          this.$route.params.teamId +
          "/idea/" +
          this.$route.params.ideaId +
          "/customersegment/" +
          id
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
    deleteAct: function(index) {
      if (this.selectedIndex == index) {
        this.selectedIndex = null;
      } else {
        this.selectedIndex = index;
      }
    },
    deleteData: function(id) {
      net
        .deleteData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/ideas/" +
            this.$route.params.ideaId +
            "/customer-segments/" +
            id
        )
        .then()
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.selectedIndex = null;
          this.refresh();
        });
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
      notif.reset(this);
      net
        .deleteData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/ideas/" +
            this.$route.params.ideaId +
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
    }
  }
};
</script>

<style scoped>
.taitel {
  padding: 5px;
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
.v-list-item__subtitle {
  max-height: 60px !important;
}
.grsduasec {
  background: #00667f;
  width: 99px;
  height: 11px;
  position: relative;
  left: 106px;
  bottom: 23px;
}
.right-arrow {
  border-color: transparent #024e61;
  border-style: solid;
  border-width: 20px 0px 20px 25px;
  height: 0px;
  width: 0px;
  position: relative;
  right: 42px;
}
.grsduasec {
  background: #00667f;
  width: 99px;
  height: 11px;
  position: relative;
  left: 106px;
  bottom: 22px;
}
.right-arrow {
  border-color: transparent #fb7307;
  border-style: solid;
  border-width: 20px 0px 20px 25px;
  height: 0px;
  width: 0px;
  position: relative;
  right: 42px;
}
</style>

<style>
</style>
