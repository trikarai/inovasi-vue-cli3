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
                  >{{ $vuetify.lang.t('$vuetify.idea.customersegment') }}</v-list-item-title>
                  
                  <v-list-item-subtitle>
                    <h4 class="headline mb-0 white--text">{{parentData.name}}</h4>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn small fab @click="openEditParent(parentData.id)" class="ml-2">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-card>

            <v-list-item style="padding-left:26px;padding-right:26px">
              <v-list-item-content>
                <v-list-item-title>Description</v-list-item-title>
                <v-text class="grey--text font-weight-light">{{parentData.description}}</v-text>
              </v-list-item-content>
            </v-list-item>

            <v-card-text class="caption" style="padding-left:26px;padding-right:26px">
              <b>created time:</b> {{parentData.createdTime | moment("Do MMMM YYYY")}}
            </v-card-text>

          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-card class="pb-5" elevation="3" style="margin:10px" min-height="270">
            <v-card class="taitelcs primary white--text elevation-5">
              <v-list-item>
                <v-list-item-content>
                  <h3 class="headline mb-0 font-weight-light white--text">{{ $vuetify.lang.t('$vuetify.idea.persona') }}</h3>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn small fab @click="openAdd" class="ml-2 mt-1">
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-card>
          <v-list style="margin:0px 10px 10px 10px">
            <!-- <v-subheader>Persona</v-subheader> -->
            <template v-if="data.total != 0">
              <v-list-item v-for="(item, index) in data.list" :key="item.id">
                <v-list-item-avatar>
                  <v-btn text @click="openDetail(item.id)">
                    <v-icon large>pageview</v-icon>
                  </v-btn>
                </v-list-item-avatar>
                <v-list-item-content>
                  {{item.name}}
                </v-list-item-content>
                <v-list-item-action>
                  <!-- <v-btn text @click="deleteAct(index)" small>
                    <v-icon color="warning">delete</v-icon>
                  </v-btn> -->

                  <v-flex>
                    <v-btn
                      color="warning"
                      @click="deleteAct(index)"
                      v-if="selectedIndex == null"
                      small
                    >
                      <!-- <v-icon>delete</v-icon>  -->
                      delete
                    </v-btn>

                    <v-flex v-show="index == selectedIndex">
                      <v-icon>warning</v-icon>
                      <v-text class="caption">{{ $vuetify.lang.t('$vuetify.action.confirmationtodelete') }}</v-text>
                      <br>
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
                  

                <!-- <v-scale-transition>
                  <div v-show="index == selectedIndex">
                    {{ $vuetify.lang.t('$vuetify.action.confirmationtodelete') }}
                    <v-btn small @click="deleteData(item.id)" color="red" class="ma-2">
                      <v-icon></v-icon>
                      {{ $vuetify.lang.t('$vuetify.action.yes') }}
                    </v-btn>
                    <v-btn small @click="deleteAct(null)">
                      <v-icon></v-icon>
                      {{ $vuetify.lang.t('$vuetify.action.cancel') }}
                    </v-btn>
                  </div>
                </v-scale-transition> -->

              </v-list-item>
            </template>
            <template v-else>
                <p
                class="text-center"
                style="margin-top:30px;"
              >{{ $vuetify.lang.t('$vuetify.noDataText') }}</p>
            </template>
          </v-list>
          <!-- <v-btn color="primary" @click="openAdd" class="ml-3">
            <v-icon>add</v-icon>
            {{$vuetify.lang.t("$vuetify.action.add")}}
          </v-btn> -->
          </v-card>
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
import notif from "@/config/alerthandling";
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
      notif.reset(this);
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
          }
        )
        .catch(error=> {
            notif.showError(this,error);       
        })
        .finally(()=> {
          this.loader = false;
        });
    },
    getDataList: function() {
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
            "/personas"
        )
        .then(
          res => {
            if (res.data.data) {
              this.data = res.data.data;
            } else {
              this.data = {total:0,list:[]}
            }
          }
        ).catch(error=>{
          notif.showError(this,error);
        })
        .finally(()=> {
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
        .then(res=>{})
        .catch(error => {
          notif.showError(this,error);
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
            
          }
        )
        .catch(error=> {
          notif.showError(this,error);
        })
        .finally(()=> {
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
