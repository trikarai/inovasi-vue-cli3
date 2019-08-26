<template>
  <div>
    <v-container>
      <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />

      <loader-dialog v-model="loader"></loader-dialog>

      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-card class="pb-5" elevation="3" style="margin:10px">
            <v-card class="taitel primary white--text elevation-5">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-light white--text body-2"
                  >{{ $vuetify.lang.t('$vuetify.idea.persona') }}</v-list-item-title>

                  <v-list-item-subtitle>
                    <h4 class="headline mb-0 white--text">{{parentData.name}}</h4>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn small fab @click.stop="openEditParent(parentData)" class="ml-2">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-card>

            <v-list-item
              v-for="field in parentData.fields"
              style="padding-left:26px;padding-right:26px"
              :key="field.id"
            >
              <v-list-item-content :key="field.id">
                <v-list-item-title>{{field.field.name}}</v-list-item-title>
                <v-text class="grey--text font-weight-light">{{field.value}}</v-text>
              </v-list-item-content>
            </v-list-item>

            <v-card-text class="caption" style="padding-left:26px;padding-right:26px">
              <b>created time:</b>
              {{parentData.createdTime | moment("Do MMMM YYYY")}}
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-card class="pb-5" elevation="3" style="margin:10px" min-height="270">
            <v-card class="taitelcs primary white--text elevation-5">
              <v-list-item>
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
                <v-list-group v-for="(item, index) in data.list" :key="item.id" no-action>
                  <template v-slot:activator>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-btn text>
                          <v-icon large>pageview</v-icon>
                        </v-btn>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>{{ item.description }}</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action></v-list-item-action>
                    </v-list-item>
                  </template>

                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-expand-transition>
                        <div v-show="index == selectedIndex">
                          {{ $vuetify.lang.t('$vuetify.action.confirmationtodelete') }}
                          <v-btn small dark @click="deleteData(item.id)" color="red" class="ma-2">
                            <v-icon></v-icon>
                            {{ $vuetify.lang.t('$vuetify.action.yes') }}
                          </v-btn>
                          <v-btn small text @click="deleteAct(null)">
                            <v-icon></v-icon>
                            {{ $vuetify.lang.t('$vuetify.action.cancel') }}
                          </v-btn>
                        </div>
                      </v-expand-transition>
                      <v-expand-transition>
                        <div v-show="index != selectedIndex">
                          <v-btn
                            color="primary"
                            @click="gotoBusinessAnalysis(item.id)"
                            class="ma-2"
                          >
                            <v-icon left>assessment</v-icon>
                            <span
                              class="hidden-sm-and-down"
                            >{{ $vuetify.lang.t('$vuetify.idea.analysis') }}</span>
                          </v-btn>
                          <v-btn color="primary" @click="gotoExperiment(item.id)">
                            <v-icon left>assignment</v-icon>
                            <span
                              class="hidden-sm-and-down"
                            >{{ $vuetify.lang.t('$vuetify.idea.experiment') }}</span>
                          </v-btn>
                        </div>
                      </v-expand-transition>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn
                        text
                        fab
                        style="top:8px;"
                        v-if="selectedIndex == null"
                        @click="deleteAct(index)"
                        small
                      >
                        <v-icon color="warning">delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list-group>
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

      <v-dialog v-model="dialogPersona" max-width="500">
        <v-card elevation="0" width="500" style="padding:0px 30px 20px 30px">
          <v-card class="taitel primary white--text elevation-5">
            <h3
              class="headline mb-0 font-weight-light"
            >{{ $vuetify.lang.t('$vuetify.action.edit') }} {{ $vuetify.lang.t('$vuetify.idea.persona') }}</h3>
          </v-card>
          <v-card-text class="pt-4">
            <!-- {{singleData}} -->
            <template v-for="(field, index) in singleData.fields">
              {{index}} - {{field}} 
              <v-divider :key="index"></v-divider>
            <!-- <fieldedit-modul v-bind:index="index" v-bind:fields="field" :key="field.id"></fieldedit-modul> -->
            </template>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary"><v-icon small left>edit</v-icon> {{ $vuetify.lang.t('$vuetify.action.update') }}</v-btn>
          </v-card-actions>
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
import net from "@/config/httpclient";
import Notification from "@/components/Notification";
import ValuePropositionForm from "./valueproposition/ValuePropositionForm";

import FieldCanEditModul from "@/components/field/fieldCanEdit";

export default {
  components: {
    ValuePropositionForm,
    "fieldedit-modul": FieldCanEditModul,
    "notification-alert": Notification
  },
  data() {
    return {
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
      singleData: { id: "", name: "" }
    };
  },
  mounted: function() {
    this.getParentData();
    this.getDataList();
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
    getParentData: function() {
      this.loader = true;
      // this.status.error = false;
      // this.status.success = false;
      var app = this;
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
            this.$route.params.personaId
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
            "/value-propositions"
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
          "/personas/" +
          this.$route.params.personaId +
          "/value-propositions/" +
          id
      });
    },
    openEditParent: function(data) {
      // this.dialogFormParent = true;
      // this.view = false;
      // this.edit = true;
      this.singleData = data;
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
      // alert(index)
      if (this.selectedIndex == index) {
        this.selectedIndex = null;
      } else {
        this.selectedIndex = index;
      }
    },
    deleteData: function(id) {
      var app = this;
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
      this.getParentData();
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
