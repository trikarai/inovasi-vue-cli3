<template>
  <v-container>
    <notification ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
    <form-collaboration v-model="collaboratorForm" @setUpCollaboration="setUpCollaboration"></form-collaboration>
    <loader-dialog v-model="loader" />

    <v-btn color="primary" @click="openEdit()" v-if="checkDashboard">
      <v-icon left>edit</v-icon>edit
    </v-btn>

    <v-btn small fab class="ml-3" @click="openCollaborator()" v-if="checkDashboard">
      <v-icon>share</v-icon>
    </v-btn>

    <v-layout>
      <v-card :loading="loader" class="mt-3">
        <v-card-title>{{experiment.form.name}}</v-card-title>
        <v-card-text
          v-for="data in experiment.fields"
          :key="data.id"
        >{{data.field.name}} : {{data.value}}</v-card-text>
      </v-card>
    </v-layout>
    <v-layout>
      <v-flex md6>
        <!-- Feedback Placeholder -->
      </v-flex>
      <v-flex md6>
        <!-- start collaborator module-->
        <base-collaboration
          v-if="collaborators.total != 0"
          v-bind:collaborators="collaborators"
          @removeCollaborator="removeCollaborator"
        />
        <!-- end collaborator module-->
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
import { dashboardMixins } from "@/mixins/dashboardMixins";

import BaseCollaboration from "@/components/talent/team/components/BaseCollaboration";
import FormCollaboration from "@/components/talent/team/components/CollaboratorForm";

export default {
  mixins: [dashboardMixins],
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
    ExperimentForm
  },
  mounted: function() {
    this.getExperiment();
    if (this.checkDashboard) {
      this.loadCollaborator();
    }
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
            "/experiments/" +
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
            "/experiments/" +
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
            "/experiments/" +
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
    }
  }
};
</script>
