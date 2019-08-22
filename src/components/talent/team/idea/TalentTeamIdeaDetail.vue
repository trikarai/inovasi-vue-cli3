<template>
  <div>
    <v-container>
      <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />

      <loader-dialog v-model="loader"></loader-dialog>

      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-card class="pb-5" elevation="3" style="margin:10px">
            <v-card class="taitel primary white--text elevation-5 pt-2">
              <v-list-item three-line="true">
                <v-list-item-avatar>
                  <v-badge v-model="parentData.aMainIdea" left class="ml-4 mt-1">
                    <template v-slot:badge>
                      <v-icon size="25" color="omikti">star</v-icon>
                    </template>
                  </v-badge>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-light white--text body-2"
                  >{{ $vuetify.lang.t('$vuetify.idea.ideaName') }}</v-list-item-title>
                  <v-list-item-subtitle>
                    <h4 class="white--text">{{parentData.name}}</h4>
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn small fab @click="openEditParent(parentData)" class="ml-2 mt-1">
                    <v-icon small>edit</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-card>
            <!-- <v-card-title>
              <v-badge v-model="parentData.aMainIdea" left class="ml-4 mt-1" >
                <template v-slot:badge>
                  <v-icon small color="yellow">star</v-icon>
                </template>
                <h3>{{parentData.name}}</h3>
              </v-badge>
              <v-btn small fab color="blue" @click="openEditParent(parentData)" class="ml-2 mt-0">
                <v-icon small>edit</v-icon>
              </v-btn>
            </v-card-title>-->
            <v-list-item style="padding-left:26px;padding-right:26px" three-line="true">
              <v-list-item-content>
                <v-list-item-title>Elevator Pitch</v-list-item-title>
                <v-text class="grey--text font-weight-light">{{parentData.elevatorPitch}}</v-text>
              </v-list-item-content>
            </v-list-item>

            <v-card-text style="padding-left:26px;padding-right:26px">
              <!-- <v-divider /> -->
              Initiator :
              <b>{{parentData.initiator.talent.name}}</b>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-card class="pb-5" elevation="3" style="margin:10px" min-height="270">
            <v-card class="taitelcs primary white--text elevation-5">
              <v-list-item>
                <v-list-item-content>
                  <h3 class="headline mb-0 font-weight-light white--text">Customer Segment</h3>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn small fab @click="openAdd" class="ml-2 mt-1">
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-card>
            <v-list subheader style="margin:10px">
              <!-- <v-subheader>Customer Segments</v-subheader> -->
              <v-list-item v-for="(item, index) in data.list" :key="item.id">
                <v-list-item-avatar>
                  <v-btn text @click="openDetail(item.id)">
                    <v-icon large>pageview</v-icon>
                  </v-btn>
                </v-list-item-avatar>
                <v-list-item-content>{{item.name}}</v-list-item-content>
                <v-list-item-action>
                  <v-flex>
                    <v-btn
                      color="warning"
                      @click="deleteAct(item.id)"
                      v-if="selectedIndex == null"
                      small
                    >
                      <!-- <v-icon>delete</v-icon>  -->
                      delete
                    </v-btn>

                    <v-flex v-show="item.id == selectedIndex">
                      <!-- {{ $vuetify.lang.t('$vuetify.action.confirmationtodelete') }} -->
                      <v-btn small dark @click="deleteData(item.id)" color="red" class="mr-2">
                        <v-icon></v-icon>
                        {{ $vuetify.lang.t('$vuetify.action.yes') }}
                      </v-btn>
                      <v-btn small text @click="deleteAct(null)">
                        <v-icon></v-icon>
                        {{ $vuetify.lang.t('$vuetify.action.cancel') }}
                      </v-btn>
                    </v-flex>
                  </v-flex>
                </v-list-item-action>
              </v-list-item>
            </v-list>

            <template v-if="data.total===0">
              <p
                class="text-center"
                style="margin-top:30px;"
              >{{ $vuetify.lang.t('$vuetify.noDataText') }}</p>
            </template>
          </v-card>
          <!-- <v-btn  color="primary" @click="openAdd">
            <v-icon>add</v-icon>
            {{$vuetify.lang.t("$vuetify.action.add")}}
          </v-btn>-->
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
import IdeaForm from "./IdeaForm";

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
        id: "",
        name: "",
        description: "",
        targetCustomer: "",
        problemConfront: "",
        valueProposed: "",
        revenueModel: "",
        initiator: {
          id: "",
          talent: {
            id: "",
            name: ""
          }
        },
        aMainIdea: false
      },
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
            "/customer-segments"
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
          id
      });
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

<style scoped>
.taitel {
  padding: 5px;
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
