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

      <v-btn @click="openAdd()" color="blue" class="mb-2">
        <v-icon>add</v-icon>
        {{ $vuetify.lang.t('$vuetify.action.add') }} {{$vuetify.lang.t('$vuetify.idea.idea')}}
      </v-btn>

      <v-data-table :headers="headers" :items="data.list" class="elevation-1">
        <template v-slot:item.name="{item}">
          <v-btn @click="openDetail(item.id)" small fab text>
            <v-icon>pageview</v-icon>
            <!-- {{ $vuetify.lang.t('$vuetify.action.view') }} -->
          </v-btn> 
          {{ item.name }}
          <v-icon color="yellow" small v-if="item.aMainIdea">start</v-icon>
        </template>
        <template v-slot:item.action="{item}">
          <v-btn @click="setMain(item.id)" small v-if="!item.aMainIdea" class="ma-1">
            <v-icon small>swap_calls</v-icon>
            {{ $vuetify.lang.t('$vuetify.idea.setMainIdea') }}
          </v-btn>
          <v-btn @click="openEdit(item.id)" small class="ma-1">
            <v-icon small>edit</v-icon>
            {{ $vuetify.lang.t('$vuetify.action.edit') }}
          </v-btn>

          <v-btn small color="warning" @click="deleteAct(item.id)">
            <v-icon small>delete</v-icon>
            {{ $vuetify.lang.t('$vuetify.action.delete') }}
          </v-btn>
          <v-expand-transition>
            <div v-show="item.id == selectedIndex">
              {{ $vuetify.lang.t('$vuetify.action.confirmationtodelete') }}
              <v-btn @click="deleteData(item.id)" color="red" class="ma-2">
                <v-icon></v-icon>
                {{ $vuetify.lang.t('$vuetify.action.yes') }}
              </v-btn>
              <v-btn @click="deleteAct(null)">
                <v-icon></v-icon>
                {{ $vuetify.lang.t('$vuetify.action.cancel') }}
              </v-btn>
            </div>
          </v-expand-transition>
        </template>
      </v-data-table>
      <br />
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
import notif from "@/config/alerthandling";
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
      err_msg: { details: [""] },
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
        { text: "", value: "action", sortable: false, align: "right" }
      ]
    };
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getDataList: function() {
      this.loader = true;
      notif.reset(this);
      net
        .getData(
          this,
          "/talent/as-team-member/" + this.$route.params.teamId + "/ideas"
        )
        .then(res => {
          if (res.data.data) {
            this.data = res.data.data;
          } else {
            this.data.list = [];
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
        path: "/talent/team/" + this.$route.params.teamId + "/idea/" + id
      });
    },
    openEdit: function(index) {
      this.dialogForm = true;
      this.view = false;
      this.edit = true;
      this.singleData.id = index;
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
        .then(res => {
          this.refresh();
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.selectedIndex = null;
          this.refresh();
        });
    },
    setMain: function(id) {
      notif.reset(this);
      net
        .putData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/ideas/" +
            id +
            "/assign-as-main-idea"
        )
        .then(res => {
          this.refresh();
        })
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
    }
  }
};
</script>
