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
              <v-list-item :three-line="true">
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-light white--text body-2"
                  >{{ $vuetify.lang.t('$vuetify.idea.persona') }}</v-list-item-title>

                  <v-list-item-subtitle>
                    <h4 class="headline mb-0 white--text">{{parentData.name}}</h4>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action v-if="checkDashboard">
                  <div>
                    <v-btn small fab class="ml-2 mt-1" @click="openCollaborator()">
                      <v-icon>share</v-icon>
                    </v-btn>
                    <v-btn small fab @click.stop="openEditParent(parentData)" class="ml-2 mt-1">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </div>
                  <div class="grsduasec d-none d-md-flex d-lg-flex"></div>
                </v-list-item-action>
              </v-list-item>
            </v-card>

            <v-list-item
              v-for="field in parentData.fields"
              style="padding-left:26px;padding-right:26px"
              :key="field.id"
              :three-line="true"
            >
              <v-list-item-content :key="field.id">
                <v-list-item-title>{{field.field.name}}</v-list-item-title>
                <span class="grey--text font-weight-light">{{field.value}}</span>
              </v-list-item-content>
            </v-list-item>

            <v-card-text class="caption" style="padding-left:26px;padding-right:26px">
              <b>created time:</b>
              {{parentData.createdTime | moment("Do MMMM YYYY")}}
            </v-card-text>
            <!-- start comment module-->
            <base-comment
              v-bind:comments="comments"
              @postComment="postComment"
              @replyComment="replyComment"
            />
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
          <v-card class="pb-5" elevation="3" style="margin:10px" min-height="270">
            <v-card class="taitelcs primary white--text elevation-5">
              <v-list-item>
                <span class="right-arrow d-none d-md-flex d-lg-flex"></span>
                <v-list-item-content>
                  <h3
                    class="headline mb-0 font-weight-light white--text"
                  >{{ $vuetify.lang.t('$vuetify.idea.valueproposition') }}</h3>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn small fab @click="openAdd" class="ml-2 mt-1">
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-card>
            <v-list style="margin:0px 10px 10px 10px">
              <template v-if="data.total != 0">
                <v-list-item v-for="(item, index) in data.list" :key="item.id">
                  <v-list-item-avatar>
                    <v-btn text @click="gotoVp(item.id)">
                      <v-icon large>pageview</v-icon>
                    </v-btn>
                  </v-list-item-avatar>
                  <v-list-item-content>{{item.description}}</v-list-item-content>
                  <v-list-item-action>
                    <v-flex>
                      <v-btn
                        color="warning"
                        @click="deleteAct(index)"
                        v-if="selectedIndex == null"
                        small
                      >delete</v-btn>

                      <v-flex v-show="index == selectedIndex">
                        <v-icon>warning</v-icon>
                        <span
                          class="caption"
                        >{{ $vuetify.lang.t('$vuetify.action.confirmationtodelete') }}</span>
                        <br />
                        <v-btn small dark @click="deleteData(item.id)" color="red" class="ml-10">
                          <v-icon></v-icon>
                          {{ $vuetify.lang.t('$vuetify.action.yes') }}
                        </v-btn>
                        <v-btn small text @click="deleteAct(null)" class="ml-2">
                          <v-icon></v-icon>
                          {{ $vuetify.lang.t('$vuetify.action.cancel') }}
                        </v-btn>
                      </v-flex>
                    </v-flex>
                  </v-list-item-action>
                </v-list-item>
              </template>
              <template v-else>
                <p
                  class="text-center"
                  style="margin-top:30px;"
                >{{ $vuetify.lang.t('$vuetify.noDataText') }}</p>
              </template>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>

      <v-dialog content-class="operplow" v-model="dialogPersona" max-width="400">
        <v-card elevation="0" width="500" style="padding:0px 30px 20px 30px">
          <v-form ref="form" v-model="valid">
            <v-card class="taitel2 primary white--text elevation-5">
              <h3
                class="headline mb-0 font-weight-light"
              >{{ $vuetify.lang.t('$vuetify.action.edit') }} {{ $vuetify.lang.t('$vuetify.idea.persona') }}</h3>
            </v-card>
            <v-card-text class="pt-4">
              <v-flex xs12 sm12>
                <v-text-field
                  v-model="params.name"
                  label="Persona Name"
                  hint="Persona Name"
                  :rules="rules"
                  counter="50"
                  maxlength="50"
                ></v-text-field>
              </v-flex>
              <template v-for="(field, index) in singleData.fields">
                <fieldedit-modul v-bind:index="index" v-bind:fields="field" :key="field.id"></fieldedit-modul>
              </template>
            </v-card-text>
            <v-card-actions>
              <v-btn
                @click="update"
                block
                :class=" { 'primary white--text' : valid}"
                :disabled="!valid"
              >
                <v-icon small left>edit</v-icon>
                {{ $vuetify.lang.t('$vuetify.action.update') }}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-container>
    <v-container>
      <span v-html="error.body" v-if="status.error"></span>
    </v-container>

    <ValuePropositionForm
      :data="singleData"
      v-bind:edit="edit"
      v-bind:view="view"
      v-if="dialogForm"
      @close="dialogForm = false"
      @refresh="refresh"
    />
  </div>
</template>
<script>
import bus from "@/bus";
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";
import ValuePropositionForm from "./valueproposition/ValuePropositionForm";

import { baseuriMixins } from "@/mixins/baseuriMixins";
import { dashboardMixins } from "@/mixins/dashboardMixins";
import { commentMixins } from "@/mixins/commentMixins";

import FieldCanEditModul from "@/components/field/fieldCanEdit";
import BaseCollaboration from "@/components/talent/team/components/BaseCollaboration";
import FormCollaboration from "@/components/talent/team/components/CollaboratorForm";
import BaseComment from "@/components/talent/team/components/BaseComment";

export default {
  mixins: [dashboardMixins, commentMixins, baseuriMixins],
  components: {
    ValuePropositionForm,
    BaseCollaboration,
    FormCollaboration,
    BaseComment,
    "fieldedit-modul": FieldCanEditModul,
    "notification-alert": Notification
  },
  data() {
    return {
      rules: [
        v => !!v || "This field is required",
        v => v.length >= 3 || "Min 3 characters long",
        v => v.length <= 50 || "Max 50 characters long"
      ],
      dialogPersona: false,
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
        name: "",
        aMainPersona: "",
        createdTime: "",
        form: { name: "" }
      },
      singleData: { id: "", name: "" },
      valid: false,
      params: {
        formId: "",
        name: "",
        fieldEntries: []
      },
      collaboratorForm: false,
      collaborators: { total: 0, list: [] }
    };
  },
  mounted: function() {
    this.getParentData();
    if (this.checkDashboard) {
      this.getDataList();
      this.loadCollaborator();
    }
    this.loadComment();
  },
  created: function() {
    bus.$on("getValue", (params, index) => {
      this.params.fieldEntries.splice(index, 1, params);
    });
  },
  methods: {
    gotoBusinessAnalysis: function(id) {
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
          id +
          "/analysis"
      });
    },
    gotoExperiment: function(id) {
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
          id +
          "/experiment"
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
          id +
          "/competitor"
      });
    },
    gotoVp: function(id) {
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
          id
      });
    },
    getParentData: function() {
      this.loader = true;
      notif.reset(this);
      var parent_uri = "";
      if (localStorage.getItem("dashboard") == "talent") {
        parent_uri =
          this.baseUriTalent.persona + "/" + this.$route.params.personaId;
      } else if (localStorage.getItem("dashboard") == "mentor") {
        parent_uri =
          this.baseUriMentor.persona + "/" + this.$route.params.personaId;
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
        .getData(this, this.baseUriTalent.valueproposition)
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
        path: this.baseUriTalent.valueproposition + "/" + id
      });
    },
    openEditParent: function(data) {
      this.singleData = data;
      this.params.formId = data.form.id;
      this.params.name = data.name;
      this.setFormJSONTemplate(data);
      this.dialogPersona = true;
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
      var app = this;
      net
        .deleteData(this, this.baseUriTalent.valueproposition + "/" + id)
        .then(res => {})
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.selectedIndex = null;
          this.refresh();
        });
    },
    setMain: function(id) {
      var app = this;
      this.status.error = false;
      this.status.success = false;
      net
        .putData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/ideas/" +
            id +
            "/set_as_main_idea"
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
      this.dialogPersona = false;
      this.getParentData();
    },
    setFormJSONTemplate: function(data) {
      var array = [];
      for (var i = 0; i < data.fields.length; i++) {
        array.push(new Object({ id: data.fields[i].id, value: "" }));
      }
      this.params.fieldEntries = array;
    },
    update: function() {
      if (this.$refs.form.validate()) {
        this.updateData();
      }
    },
    updateData: function() {
      this.loader = true;
      notif.reset(this);
      net
        .putData(
          this,
          this.baseUriTalent.persona +
            "/" +
            this.$route.params.personaId +
            "/update",
          this.params
        )
        .then(res => {
          this.refreshParent();
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    loadCollaborator: function() {
      this.loader = true;
      notif.reset(this);
      net
        .getData(
          this,
          this.baseUriTalent.persona +
            "/" +
            this.$route.params.personaId +
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
          this.baseUriTalent.persona +
            "/" +
            this.$route.params.personaId +
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
          this.baseUriTalent.persona +
            "/" +
            this.$route.params.personaId +
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
    loadComment: function() {
      this.loader = true;
      notif.reset(this);
      net
        .getData(
          this,
          this.baseUriTalent.persona +
            "/" +
            this.$route.params.personaId +
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
          this.baseUriTalent.persona +
            "/" +
            this.$route.params.personaId +
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
          this.baseUriTalent.persona +
            "/" +
            this.$route.params.personaId +
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
  bottom: 28px;
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
