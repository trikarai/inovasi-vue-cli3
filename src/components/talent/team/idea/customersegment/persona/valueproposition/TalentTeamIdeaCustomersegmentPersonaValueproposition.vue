<template>
  <div>
    <v-container>
      <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />

      <loader-dialog v-model="loader"></loader-dialog>
      <form-collaboration v-model="collaboratorForm" @setUpCollaboration="setUpCollaboration"></form-collaboration>

      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-card class="pb-5" elevation="3" style="margin:10px">
            <v-card class="taitel primary white--text elevation-5">
              <v-list-item>
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
                    <!-- <v-btn small fab @click="openEditParent(parentData.id)" class="ml-2 mt-1">
                      <v-icon>edit</v-icon>
                    </v-btn>-->
                  </div>
                </v-list-item-action>
              </v-list-item>
            </v-card>
            <v-list>
              <v-list-item style="padding-left:26px;padding-right:26px">
                <v-list-item-content>
                  <v-list-item-subtitle>Customer Jobs</v-list-item-subtitle>
                  <v-list-item-title>{{parentData.customerJobs}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="padding-left:26px;padding-right:26px">
                <v-list-item-content>
                  <v-list-item-subtitle>Gain</v-list-item-subtitle>
                  <v-list-item-title>{{parentData.gains}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="padding-left:26px;padding-right:26px">
                <v-list-item-content>
                  <v-list-item-subtitle>Gain Creators</v-list-item-subtitle>
                  <v-list-item-title>{{parentData.gainCreators}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="padding-left:26px;padding-right:26px">
                <v-list-item-content>
                  <v-list-item-subtitle>Pain</v-list-item-subtitle>
                  <v-list-item-title>{{parentData.pains}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="padding-left:26px;padding-right:26px">
                <v-list-item-content>
                  <v-list-item-subtitle>Pain Relievers</v-list-item-subtitle>
                  <v-list-item-title>{{parentData.painRelievers}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item style="padding-left:26px;padding-right:26px">
                <v-list-item-content>
                  <v-list-item-subtitle>Products And Services</v-list-item-subtitle>
                  <v-list-item-title>{{parentData.productsAndServices}}</v-list-item-title>
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
            <v-card class="pb-5" elevation="3" style="margin:10px" min-height="270">
              <v-card class="taitelcs primary white--text elevation-5">
                <v-list-item>
                  <v-list-item-content>
                    <h3
                      class="headline mb-0 font-weight-light white--text"
                    >{{ $vuetify.lang.t('$vuetify.idea.analysis') }}</h3>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-card>
          </v-flex>
          <v-flex xs12 md6>
            <v-card class="pb-5" elevation="3" style="margin:10px" min-height="270">
              <v-card class="taitelcs primary white--text elevation-5">
                <v-list-item>
                  <v-list-item-content>
                    <h3
                      class="headline mb-0 font-weight-light white--text"
                    >{{ $vuetify.lang.t('$vuetify.idea.experiment') }}</h3>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-card>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
    <v-container>
      <span v-html="error.body" v-if="status.error"></span>
    </v-container>

    <!-- <CustomerSegmentForm
      :data="singleData"
      v-bind:edit="edit"
      v-bind:view="view"
      v-if="dialogFormParent"
      @close="dialogFormParent = false"
      @refresh="refreshParent"
    />
    <PersonaForm
      :data="singleData"
      v-bind:edit="edit"
      v-bind:view="view"
      v-if="dialogForm"
      @close="dialogForm = false"
      @refresh="refresh"
    />-->
  </div>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";

import BaseCollaboration from "@/components/talent/team/components/BaseCollaboration";
import FormCollaboration from "@/components/talent/team/components/CollaboratorForm";

export default {
  components: {
    BaseCollaboration,
    FormCollaboration,
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
      data: { total: 0, list: [] },
      parentData: "",
      singleData: { id: "", name: "" },
      collaborators: { total: 0, list: [] }
    };
  },
  mounted: function() {
    this.getParentData();
    this.getDataList();
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
    getDataList: function() {
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
            "/personas"
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
          this.$route.params.customersegmentId +
          "/persona/" +
          id
      });
    },
    openEditParent: function(index) {
      this.dialogFormParent = true;
      this.view = false;
      this.edit = true;
      this.singleData = this.parentData;
    },
    openEdit: function(index) {
      this.dialogForm = true;
      this.view = false;
      this.edit = true;
      this.singleData = this.data.list[index];
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
            this.$route.params.customersegmentId +
            "/personas/" +
            id
        )
        .then(res => {})
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
