<template>
  <v-container>
    <notification ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
    <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
    <form-collaboration v-model="collaboratorForm" @setUpCollaboration="setUpCollaboration"></form-collaboration>

    <loader-dialog v-model="loader2"></loader-dialog>

    <v-btn @click="openEdit()" color="primary" class="mb-2" v-if="checkDashboard">
      <v-icon small left>edit</v-icon>
      {{$vuetify.lang.t('$vuetify.action.edit')}}
    </v-btn>

    <v-scale-transition>
      <v-btn small fab class="ml-4 mb-2" @click="openCollaborator()" v-if="checkDashboard">
        <v-icon>share</v-icon>
      </v-btn>
    </v-scale-transition>

    <v-layout>
      <v-flex md6>
        <v-card :loading="loader">
          <v-list-item two-line>
            <v-list-item-group>
              <v-list-item-content>
                <v-list-item-subtitle>Name</v-list-item-subtitle>
                <v-list-item-title>{{competitorDetail.name}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle>valueProposed</v-list-item-subtitle>
                <v-list-item-title>{{competitorDetail.valueProposed}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle>comparativeAdvantage</v-list-item-subtitle>
                <v-list-item-title>{{competitorDetail.comparativeAdvantage}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle>differentialAdvantage</v-list-item-subtitle>
                <v-list-item-title>{{competitorDetail.differentialAdvantage}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle>focus</v-list-item-subtitle>
                <v-list-item-title>{{competitorDetail.focus}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle>asset</v-list-item-subtitle>
                <v-list-item-title>{{competitorDetail.asset}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle>unfairAdvantage</v-list-item-subtitle>
                <v-list-item-title>{{competitorDetail.unfairAdvantage}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item-group>
          </v-list-item>
        </v-card>
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
    <!-- start competitor form-->
    <v-dialog
      scrollable
      content-class="operplow"
      :fullscreen="fullDialog"
      v-model="competitorForm"
      width="450"
    >
      <v-card>
        <v-card class="taitel primary white--text elevation-5">
          <template v-if="!view">
            <h3
              v-if="edit"
              class="headline mb-0 font-weight-light"
            >{{ $vuetify.lang.t('$vuetify.action.edit') }} {{ $vuetify.lang.t('$vuetify.idea.competitor') }}</h3>
            <h3
              v-if="!edit"
              class="headline mb-0 font-weight-light"
            >{{ $vuetify.lang.t('$vuetify.action.add') }} {{ $vuetify.lang.t('$vuetify.idea.competitor') }}</h3>
          </template>
          <h3
            v-if="view"
            class="headline mb-0 font-weight-light"
          >{{ $vuetify.lang.t('$vuetify.idea.competitor') }}</h3>
        </v-card>
        <v-card-text class="pt-4">
          <v-form ref="form" v-model="valid">
            <v-flex xs12 sm12>
              <v-text-field
                v-model="params.name"
                label="Name"
                hint="Name"
                :rules="nameRules"
                :readonly="view"
              ></v-text-field>
              <v-textarea
                v-model="params.valueProposed"
                label="valueProposed"
                hint="valueProposed"
                :readonly="view"
              ></v-textarea>
              <v-textarea
                v-model="params.comparativeAdvantage"
                label="comparativeAdvantage"
                hint="comparativeAdvantage"
                :readonly="view"
              ></v-textarea>
              <v-textarea
                v-model="params.differentialAdvantage"
                label="differentialAdvantage"
                hint="differentialAdvantage"
                :readonly="view"
              ></v-textarea>
              <v-textarea v-model="params.focus" label="focus" hint="focus" :readonly="view"></v-textarea>
              <v-textarea v-model="params.asset" label="asset" hint="asset" :readonly="view"></v-textarea>
              <v-textarea
                v-model="params.unfairAdvantage"
                label="unfairAdvantage"
                hint="unfairAdvantage"
                :readonly="view"
              ></v-textarea>
            </v-flex>
            <v-card-actions v-if="view">
              <v-btn text fab @click="competitorForm = false">
                <v-icon color="red">close</v-icon>
              </v-btn>
            </v-card-actions>
            <v-card-actions v-if="!view">
              <v-btn
                v-if="!edit"
                @click="submit"
                :class=" { 'primary white--text' : valid}"
                :disabled="!valid"
              >
                <v-icon>add</v-icon>
                {{ $vuetify.lang.t('$vuetify.action.add') }}
              </v-btn>
              <v-btn
                v-if="edit"
                @click="update"
                :class=" { 'primary white--text' : valid}"
                :disabled="!valid"
              >
                <v-icon>edit</v-icon>
                {{ $vuetify.lang.t('$vuetify.action.edit') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-layout>
      <v-flex md6>
        <!-- Feedback Placeholder -->
      </v-flex>
    </v-layout>
    <!-- end competitor form -->
  </v-container>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";
import { dashboardMixins } from "@/mixins/dashboardMixins";

import BaseCollaboration from "@/components/talent/team/components/BaseCollaboration";
import FormCollaboration from "@/components/talent/team/components/CollaboratorForm";

export default {
  mixins: [dashboardMixins],
  data() {
    return {
      valid: false,
      loader: false,
      loader2: false,
      selectedIndex: null,
      err_msg: { details: [""] },
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      competitorId: "",
      competitorDetail: "",
      params: {
        name: "",
        valueProposed: "",
        comparativeAdvantage: "",
        differentialAdvantage: "",
        focus: "",
        asset: "",
        unfairAdvantage: ""
      },
      competitorForm: false,
      edit: false,
      view: false,
      fullDialog: false,
      nameRules: [
        v => !!v || "Name is required",
        v => v.length >= 3 || "Name must be more than 3 characters"
      ],
      collaborators: { total: 0, list: [] },
      collaboratorForm: false
    };
  },
  components: {
    Notification,
    BaseCollaboration,
    FormCollaboration
  },
  mounted: function() {
    this.getSingleData();
    if (this.checkDashboard) {
      this.loadCollaborator();
    }
  },
  methods: {
    openEdit: function() {
      this.competitorForm = true;
      this.edit = true;
      this.view = false;
      this.params = this.competitorDetail;
      this.fullDialog = false;
    },
    openDetail: function(id) {
      this.competitorForm = true;
      this.edit = false;
      this.view = true;
      this.fullDialog = true;
      this.getSingleData();
    },
    submit: function() {
      if (this.$refs.form.validate()) {
        this.addData();
      } else {
        this.$vuetify.goTo(this.$refs.notif, {
          duration: 500,
          offset: 0,
          easing: "linear"
        });
      }
    },
    update: function() {
      if (this.$refs.form.validate()) {
        this.addData();
      } else {
        this.$vuetify.goTo(this.$refs.notif, {
          duration: 500,
          offset: 0,
          easing: "linear"
        });
      }
    },
    addData: function() {
      this.loader2 = true;
      notif.reset(this);
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
            "/competitors/" +
            this.$route.params.competitorId,
          this.params
        )
        .then(res => {
          notif.showInfo(this, res, ["OK"]);
          this.getSingleData();
          this.competitorForm = false;
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader2 = false;
        });
    },
    getSingleData: function() {
      this.loader2 = true;
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
            "/competitors/" +
            this.$route.params.competitorId
        )
        .then(res => {
          this.competitorDetail = res.data.data;
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader2 = false;
        });
    },
    deleteAct: function(id) {
      if (this.selectedIndex == id) {
        this.selectedIndex = null;
      } else {
        this.selectedIndex = id;
      }
    },
    deleteData: function(id) {
      this.loader2 = true;
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
            "/competitors/" +
            id
        )
        .then(res => {
          this.getDataList();
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.selectedIndex = null;
          this.loader2 = false;
        });
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
            "/competitors/" +
            this.$route.params.competitorId +
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
            "/competitors/" +
            this.$route.params.competitorId +
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
            "/competitors/" +
            this.$route.params.competitorId +
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
  padding: 24px;
  width: 90%;
  margin: 0 auto;
  bottom: 27px;
  z-index: 2;
}
</style>