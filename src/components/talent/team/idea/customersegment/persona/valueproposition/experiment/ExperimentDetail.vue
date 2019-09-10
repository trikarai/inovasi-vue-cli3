<template>
  <v-container>
    <notification ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
    <form-collaboration v-model="collaboratorForm" @setUpCollaboration="setUpCollaboration"></form-collaboration>
    
    <loader-dialog v-model="loader" />

    <!-- <v-btn color="primary" @click="openEdit()" v-if="checkDashboard">
      <v-icon left>edit</v-icon>edit
    </v-btn>

    <v-btn small fab class="ml-3" @click="openCollaborator()" v-if="checkDashboard">
      <v-icon>share</v-icon>
    </v-btn> -->

    <v-layout row>
      <v-flex md6>
        <v-card elevation="3" class="mt-3 ml-2 mr-1 pb-5"><v-card class="taitel primary white--text elevation-5">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-light white--text body-2"
                  >{{ $vuetify.lang.t('$vuetify.idea.experiment') }}</v-list-item-title>

                  <v-list-item-subtitle>
                    <h4 class="headline mb-0 white--text">{{experiment.form.name}}</h4>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action v-if="checkDashboard">
                  <div>
                    <v-btn small fab class="ml-2 mt-1" @click="openCollaborator()">
                      <v-icon>share</v-icon>
                    </v-btn>
                    <v-btn small fab @click="openEdit()" class="ml-2 mt-1">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </div>
                  <div class="grsduasec d-none d-md-flex d-lg-flex"></div>
                </v-list-item-action>
              </v-list-item>
            </v-card>

          <v-list-item 
            v-for="data in experiment.fields"
            :key="data.id" 
            style="padding-left:26px;padding-right:26px" 
            :three-line="true">
              <v-list-item-content>
                <v-list-item-title>{{data.field.name}}</v-list-item-title>
                <span class="grey--text font-weight-light">{{data.value}}</span>
              </v-list-item-content>
            </v-list-item>

        </v-card>
      </v-flex>
      <v-flex md6>
        <!-- start comment module-->
        <v-card class="mt-3 mr-2 ml-1">
          <base-comment
            v-bind:comments="comments"
            @postComment="postComment"
            @replyComment="replyComment"
          />
        </v-card>
        <v-card class="mt-2 mr-2 ml-1">
          <base-collaboration
            v-if="collaborators.total != 0"
            v-bind:collaborators="collaborators"
            @removeCollaborator="removeCollaborator"
          />
        </v-card>
      </v-flex>
    </v-layout>

    <experiment-form
      v-if="dialogForm"
      :data="singleData"
      :edit="edit"
      :formId="formId"
      :formDate="formDate"
      @close="dialogForm = false"
      @refresh="refresh"
    ></experiment-form>
  </v-container>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";

import ExperimentForm from "./ExperimentForm";
import { baseuriMixins } from "@/mixins/baseuriMixins";
import { dashboardMixins } from "@/mixins/dashboardMixins";
import { commentMixins } from "@/mixins/commentMixins";

import BaseCollaboration from "@/components/talent/team/components/BaseCollaboration";
import FormCollaboration from "@/components/talent/team/components/CollaboratorForm";
import BaseComment from "@/components/talent/team/components/BaseComment";

export default {
  mixins: [dashboardMixins, commentMixins, baseuriMixins],
  data: function() {
    return {
      loader: false,
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: { details: [""] },
      experiment: { form: "", name: "", fields: [] },
      collaborators: { total: 0, list: [] },
      collaboratorForm: false,
      dialogForm: false,
      edit: false,
      singleData: "",
      formId: "",
      formDate: ""
    };
  },
  components: {
    Notification,
    BaseCollaboration,
    FormCollaboration,
    ExperimentForm,
    BaseComment
  },
  created: function() {
    if (this.checkDashboard) {
      this.comments_uri = this.baseUriTalent.experiment;
    } else {
      this.comments_uri = this.baseUriMentor.experiment;
    }
  },
  mounted: function() {
    this.getExperiment();
    if (this.checkDashboard) {
      this.loadCollaborator();
    }
    this.loadComment();
  },
  methods: {
    getExperiment: function() {
      this.loader = true;
      notif.reset(this);
      var parent_uri = "";
      if (localStorage.getItem("dashboard") == "talent") {
        parent_uri = "/talent/as-team-member/";
      } else if (localStorage.getItem("dashboard") == "mentor") {
        parent_uri =
          "/talent/as-programme-mentor/" +
          this.$route.params.programId +
          "/teams/";
      }
      net
        .getData(
          this,
          parent_uri +
            this.$route.params.teamId +
            "/ideas/" +
            this.$route.params.ideaId +
            "/customer-segments/" +
            this.$route.params.customersegmentId +
            "/personas/" +
            this.$route.params.personaId +
            "/value-propositions/" +
            this.$route.params.valuepropositionId +
            "/experiments/" +
            this.$route.params.experimentId
        )
        .then(res => {
          this.experiment = res.data.data;
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    openEdit: function() {
      this.singleData = this.$route.params.experimentId;
      this.formId = this.experiment.id;
      this.formDate = this.experiment.date;
      this.edit = true;
      this.dialogForm = true;
    },
    loadCollaborator: function() {
      this.loader = true;
      notif.reset(this);
      net
        .getData(
          this,
          this.baseUriTalent.experiment +
            "/" +
            this.$route.params.experimentId +
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
          this.baseUriTalent.experiment +
            "/" +
            this.$route.params.experimentId +
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
          this.baseUriTalent.experiment +
            "/" +
            this.$route.params.experimentId +
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
    refresh: function() {
      this.dialogForm = false;
      this.getExperiment();
    },
    loadComment: function() {
      this.loader = true;
      notif.reset(this);
      net
        .getData(
          this,
          this.comments_uri +
            "/" +
            this.$route.params.experimentId +
            "/comments"
        )
        .then(res => {
          if (res.data.data) {
            this.comments = res.data.data;
          } else {
            this.comments = { total: 0, list: [] };
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    postComment: function(content) {
      net
        .putData(
          this,
          this.comments_uri +
            "/" +
            this.$route.params.experimentId +
            "/comments",
          content
        )
        .then(res => {
          this.loadComment();
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {});
    },
    replyComment: function(content, id) {
      net
        .putData(
          this,
          this.comments_uri +
            "/" +
            this.$route.params.experimentId +
            "/comments/" +
            id,
          content
        )
        .then(res => {
          this.loadComment();
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {});
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
</style>
