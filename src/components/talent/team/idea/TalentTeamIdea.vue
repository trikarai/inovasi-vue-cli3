<template>
  <div>
    <v-container>
      <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status"/>
      <v-btn @click="openAdd()" color="blue" style="left: -8px">
        <v-icon>add</v-icon>
        {{ $vuetify.t('$vuetify.action.add') }} {{$vuetify.t('$vuetify.idea.idea')}}
      </v-btn>
      <v-dialog v-model="loader" hide-overlay persistent width="300">
        <v-card color="primary">
          <v-card-text>
            {{ $vuetify.t('$vuetify.info.standby') }}
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-data-table :headers="headers" :items="data.list" class="elevation-1">
        <template v-slot:items="props">
          <td>
            {{ props.item.name }}
            <v-icon color="yellow" small v-if="props.item.aMainIdea">start</v-icon>
          </td>
          <td class="text-xs-right">
            <v-btn @click="setMain(props.index)" small v-if="!props.item.aMainIdea">
              <v-icon small>swap_calls</v-icon>
              {{ $vuetify.t('$vuetify.idea.setMainIdea') }}
            </v-btn>
            <v-btn @click="openEdit(props.index)" small>
              <v-icon small>edit</v-icon>
              {{ $vuetify.t('$vuetify.action.edit') }}
            </v-btn>
            <v-btn @click="openDetail(props.item.id)" small>
              <v-icon small>pageview</v-icon> 
              {{ $vuetify.t('$vuetify.action.view') }}
            </v-btn>
            <v-btn small color="warning" @click="deleteAct(props.index)">
              <v-icon small>delete</v-icon>
              {{ $vuetify.t('$vuetify.action.delete') }}
            </v-btn>
            <v-expand-transition>
              <div v-show="props.index == selectedIndex">
                {{ $vuetify.t('$vuetify.action.confirmationtodelete') }}
                <v-btn @click="deleteData(props.item.id)" color="red">
                  <v-icon></v-icon>
                  {{ $vuetify.t('$vuetify.action.yes') }}
                </v-btn>
                <v-btn @click="deleteAct(null)">
                  <v-icon></v-icon>
                  {{ $vuetify.t('$vuetify.action.cancel') }}
                </v-btn>
              </div>
            </v-expand-transition>
          </td>
        </template>
      </v-data-table>
      <br>

    </v-container>

    <IdeaForm
      :data="singleData"
      v-bind:edit="edit"
      v-bind:view="view"
      v-if="dialogForm"
      @close="dialogForm = false"
      @refresh="refresh()"
    />
    <v-container>
    <span v-html="error.body" v-if="status.error"></span>
    </v-container>
  </div>
</template>
<script>
import net from "@/config/httpclient";
import IdeaForm from "./IdeaForm";
import Notification from "@/components/Notification";

export default {
  components: {
    IdeaForm,
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
      edit: false,
      view: false,
      expand: false,
      dataId: "",
      selectedIndex: null,
      data: { total: 0, list: [] },
      singleData: { id: "", name: "" },
      headers: [
        {
          text: "Idea Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "", value: "id", sortable: false }
      ]
    };
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getDataList: function() {
      this.loader = true;
      // this.status.error = false;
      // this.status.success = false;
      var app = this;
      net
        .getData(
          this,
          "/talent/as-team-member/" + this.$route.params.teamId + "/ideas/"
        )
        .then(
          res => {
            if (res.data.data) {
              this.data = res.data.data;
            } else {
              this.data.list = [];
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
    openDetail: function(id){
      this.$router.push({path: "/talent/team/"+ this.$route.params.teamId + "/idea/" + id})
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
    deleteAct: function(id) {
      if (this.selectedIndex == id) {
        this.selectedIndex = null;
      } else {
        this.selectedIndex = id;
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
    }
  }
};
</script>
