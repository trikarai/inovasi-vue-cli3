<template>
  <div>
    <v-container>
      <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status"/>
      <v-dialog v-model="loader" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            {{ $vuetify.t('$vuetify.info.standby') }}
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-card elevation="1">
            <v-card-title>
              <v-badge v-model="parentData.aMainIdea">
                <template v-slot:badge>
                  <v-icon small color="yellow">star</v-icon>
                </template>
                <h3>{{parentData.name}}</h3>
              </v-badge>
            </v-card-title>
            <v-card-text>
              {{parentData.description}}
              <br>
              {{parentData.targetCustomer}}
              <br>
              {{parentData.problemConfront}}
              <br>
              {{parentData.valueProposed}}
              <br>
              {{parentData.revenueModel}}
              <v-divider/>
              Initiator : {{parentData.initiator.talent.name}}
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-list subheader>
            <v-subheader>Customer Segments</v-subheader>
            <v-list-tile v-for="(item, index) in data.list" :key="item.id" @click="">
              <v-list-tile-content>
                <v-list-tile-title>{{item.name}}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
               <v-btn flat @click="deleteAct(index)" small> <v-icon color="warning" >delete</v-icon></v-btn>
              </v-list-tile-action>
              <v-divide></v-divide>
            </v-list-tile>
          </v-list>
          <v-btn color="primary" @click="openAdd">
            <v-icon>add</v-icon>
            {{$vuetify.t("$vuetify.action.add")}}
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
        v-if="dialogForm"
        @close="dialogForm = false"
        @refresh="refresh"
      />

  </div>
</template>
<script>
import net from "@/config/httpclient";
import Notification from "@/components/Notification";
import CustomerSegmentForm from "./customersegment/CustomerSegmentForm"

export default {
  components: {
    CustomerSegmentForm,
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
      err_msg: "",
      error: "error",
      loader: false,
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      dataId: "",
      selectedIndex: null,
      data: { total: 0, list: [] },
      parentData: "",
      singleData: { id: "", name: "" },
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
            this.$route.params.ideaId
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
            "/customer-segments"
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
      alert(index)
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
          "/talent/as-team-member/" + this.$route.params.teamId + "/ideas/" + id
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
        .catch(function() {
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
    }
  }
};
</script>
