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
              <v-btn color="blue" fab small @click="openEditParent(parentData.id)" class="ml-3">
                <v-icon small>edit</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              {{parentData.description}}
              <br />
              {{parentData.createdTime}}
              <br />
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-list subheader style="margin:10px">
            <v-subheader>Persona</v-subheader>
            <template v-if="data.total != 0">
              <v-list-item v-for="(item, index) in data.list" :key="item.id">
                <v-list-item-avatar>
                  <v-btn fab text @click="openDetail(item.id)">
                    <v-icon>pageview</v-icon>
                  </v-btn>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{item.name}}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn text @click="deleteAct(index)" small>
                    <v-icon color="warning">delete</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-scale-transition>
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
                </v-scale-transition>
              </v-list-item>
            </template>
            <template v-else>
              <v-list-item>
                <v-list-item-title>No Data</v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
          <v-btn color="primary" @click="openAdd" class="ml-3">
            <v-icon>add</v-icon>
            {{$vuetify.lang.t("$vuetify.action.add")}}
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <span v-html="error.body" v-if="status.error"></span>
    </v-container>

    <CustomerSegmentForm
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
    />
  </div>
</template>
<script>
import net from "@/config/httpclient";
import Notification from "@/components/Notification";
import CustomerSegmentForm from "./CustomerSegmentForm";
import PersonaForm from "./persona/PersonaForm";

export default {
  components: {
    CustomerSegmentForm,
    PersonaForm,
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
      err_msg: {details:[""]},
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
      parentData: "",
      singleData: { id: "", name: "" }
    };
  },
  mounted: function() {
    this.getParentData();
    this.getDataList();
  },
  methods: {
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
            this.$route.params.customersegmentId
        )
        .then(
          res => {
            this.parentData = res.data.data;
          },
          error => {
            console.log(error);
            if (error.status > 400) {
              this.err_msg = {
                code: error.status,
                type: error.statusText,
                details: [error.statusText]
              };
            } else {
              this.err_msg = error.body.meta;
            }
            this.error = error;
            this.status.error = true;
          }
        )
        .catch(function(error) {
          console.log(error);
          app.err_msg = {
            code: error.status,
            type: error.statusText,
            details: [error.statusText]
          };
          app.error = error;
          app.status.error = true;
        })
        .finally(function() {
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
            "/personas"
        )
        .then(
          res => {
            if (res.data.data) {
              this.data = res.data.data;
            }
          },
          error => {
            console.log(error);
            if (error.status > 400) {
              this.err_msg = {
                code: error.status,
                type: error.statusText,
                details: [error.statusText]
              };
            } else {
              this.err_msg = error.body.meta;
            }
            this.error = error;
            this.status.error = true;
          }
        )
        .finally(function() {
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
      // alert(index)
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
        .then()
        .catch(function() {})
        .finally(function() {
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
        .then(
          res => {
            console.log(res);
          },
          error => {
            console.log(error);
            if (error.status > 400) {
              this.err_msg = {
                code: error.status,
                type: error.statusText,
                details: [error.statusText]
              };
            } else {
              this.err_msg = error.body.meta;
            }
            this.status.error = true;
            this.error = error;
          }
        )
        .catch(function(error) {
          console.log(error);
          if (error.status !== 200) {
            app.err_msg = {
              code: error.status,
              type: error.statusText,
              details: [error.statusText]
            };
          } else {
            app.err_msg = error.body.meta;
          }
          app.error = error;
          app.status.error = true;
        })
        .finally(function() {
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
