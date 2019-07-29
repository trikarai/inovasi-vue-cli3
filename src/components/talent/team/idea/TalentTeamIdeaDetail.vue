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
        <v-flex xs12 md6 >
          <v-card elevation="1" style="margin:10px">
            <v-card-title>
              <v-badge v-model="parentData.aMainIdea" left>
                <template v-slot:badge>
                  <v-icon small color="yellow">star</v-icon>
                </template>
                <h3>{{parentData.name}}</h3>
              </v-badge>
              <v-btn fab color="blue" small @click="openEditParent(parentData)"><v-icon>edit</v-icon></v-btn>
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
              <!-- Initiator : {{parentData.initiator.talent.name}} -->
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-list subheader style="margin:10px">
            <v-subheader>Customer Segments</v-subheader>
            <v-list-tile v-for="(item, index) in data.list" :key="item.id" >
              <v-list-tile-avatar>
                <v-btn fab flat @click="openDetail(item.id)"><v-icon>pageview</v-icon></v-btn>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{item.name}}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn flat @click="deleteAct(index)" small>
                  <v-icon color="warning">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-expand-x-transition>
                <div v-show="index == selectedIndex">
                  <!-- {{ $vuetify.t('$vuetify.action.confirmationtodelete') }} -->
                  <v-btn @click="deleteData(item.id)" color="red">
                    <v-icon></v-icon>
                    {{ $vuetify.t('$vuetify.action.yes') }}
                  </v-btn>
                  <v-btn @click="deleteAct(null)">
                    <v-icon></v-icon>
                    {{ $vuetify.t('$vuetify.action.cancel') }}
                  </v-btn>
                </div>
              </v-expand-x-transition>
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
import Notification from "@/components/Notification";
import CustomerSegmentForm from "./customersegment/CustomerSegmentForm";
import IdeaForm from "./IdeaForm"

export default {
  components: {
    IdeaForm,
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
      this.status.error = false;
      this.status.success = false;
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
          }
        )
        .catch(error=> {
          console.log(error);
          notif.showError(this, error);
        })
        .finally(()=> {
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
          }
        ).catch(error=>{
          console.log(error);
          notif.showError(this, error);
        })
        .finally(()=> {
          this.loader = false;
        });
    },
    openDetail: function(id){
      this.$router.push({path: "/talent/team/" + this.$route.params.teamId + "/idea/" + this.$route.params.ideaId + "/customersegment/" + id})
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
            id
        )
        .then()
        .catch(error=>{
          console.log(error);
          notif.showError(this, error);
        })
        .finally(()=> {
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
          }
        )
        .catch(error=> {
          console.log(error);
          notif.showError(this, error);
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
