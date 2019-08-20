<template>
  <div>
    <v-container>
      <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
      <v-dialog v-model="loader" hide-overlay persistent width="300">
        <v-card color="primary">
          <v-card-text>
            {{ $vuetify.lang.t('$vuetify.info.standby') }}
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-card elevation="1" style="margin:10px">
            <v-card-title>
              <h3>{{parentData.name}}</h3>
              <!-- <v-btn color="blue" fab small @click="openEditParent(parentData.id)">
                <v-icon small>edit</v-icon>
              </v-btn>-->
            </v-card-title>
            <v-card-text>
              {{parentData.aMainPersona}}
              <br />
              {{parentData.createdTime}}
              <br />
              {{parentData.form.name}}
              <br />
              <v-divider></v-divider>
              <template v-for="field in parentData.fields">
                <div :key="field.id">{{field.field.name}} : {{field.value}} </div>
              </template> 
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-list subheader style="margin:10px">
            <v-subheader>Value Proposition</v-subheader>
            <template v-if="data.total != 0">
              <v-list-group v-for="(item, index) in data.list" :key="item.id" no-action>
                <template v-slot:activator>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-btn fab text>
                        <v-icon>pageview</v-icon>
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
                        <!-- {{ $vuetify.lang.t('$vuetify.action.confirmationtodelete') }} -->
                        <v-btn small @click="deleteData(item.id)" color="red" class="ma-2">
                          <v-icon></v-icon>
                          {{ $vuetify.lang.t('$vuetify.action.yes') }}
                        </v-btn>
                        <v-btn small @click="deleteAct(null)">
                          <v-icon></v-icon>
                          {{ $vuetify.lang.t('$vuetify.action.cancel') }}
                        </v-btn>
                      </div>
                    </v-expand-transition>
                    <v-expand-transition>
                      <div v-show="index != selectedIndex">
                        <v-btn small @click="gotoBusinessAnalysis(item.id)" class="ma-2">
                          <v-icon>business_center</v-icon>
                          <span class="hidden-sm-and-down">Analysis</span>
                        </v-btn>
                        <v-btn small @click="gotoExperiment(item.id)">
                          <v-icon>category</v-icon>
                          <span class="hidden-sm-and-down">Experiment</span>
                        </v-btn>
                      </div>
                    </v-expand-transition>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn text @click="deleteAct(index)" small>
                      <v-icon color="warning">delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-group>
            </template>
            <template v-else>
              <v-list-item>
                <v-list-item-title>No Data</v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
          <v-btn color="primary" @click="openAdd" class="ml-2">
            <v-icon>add</v-icon>
            {{$vuetify.lang.t("$vuetify.action.add")}}
          </v-btn>
        </v-flex>
      </v-layout>
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

export default {
  components: {
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
          console.log(error);
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
          }
        })
        .catch(error => {
          console.log(error);
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
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
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
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
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
