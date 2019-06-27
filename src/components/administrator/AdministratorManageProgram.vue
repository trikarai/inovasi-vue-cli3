<template>
  <div>
    <v-container>
      <notification-alert v-bind:err_msg="err_msg" v-bind:status="status"/>

      <v-btn @click="openAdd()" color="blue" style="left: -8px">
        <v-icon>add</v-icon>
        {{ $vuetify.t('$vuetify.action.add') }} program
      </v-btn>
      <v-dialog v-model="loader" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            {{ $vuetify.t('$vuetify.info.standby') }}
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-data-table dark :headers="headers" :items="program.list" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">
            <v-btn small @click="gotoPhase(props.item.id)">
              <v-icon small>extension</v-icon>Phase
            </v-btn>
            <v-btn small @click="gotoCoordinator(props.item.id)">
              <v-icon left small>person_add</v-icon>{{$vuetify.t('$vuetify.personnel.coordinator')}}
            </v-btn>
            <v-btn small @click="gotoMentor(props.item.id)">
              <v-icon left small>person_add</v-icon>{{$vuetify.t('$vuetify.personnel.mentor')}}
            </v-btn>
          </td>
          <td class="text-xs-right">
            <v-btn @click="openEdit(props.index)" small>
              <v-icon small>edit</v-icon>
              {{ $vuetify.t('$vuetify.action.edit') }}
            </v-btn>
            <v-btn small dark color="warning" @click="deleteAct(props.index)">
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
    </v-container>

    <ProgramForm
      :data="singleData"
      :edit="edit"
      :view="view"
      v-if="dialogForm"
      @close="dialogForm = false"
      @refresh="refresh()"
    />
  </div>
</template>
<script>
import net from "@/config/httpclient";
import ProgramForm from "./program/AddProgram";
import Notification from "@/components/Notification";

export default {
  components: {
    ProgramForm,
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
      loader: false,
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      dataId: "",
      selectedIndex: null,
      program: { total: 0, list: [] },
      singleData: { id: "", name: "" },
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "", value: "id", sortable: false },
        { text: "", value: "id", sortable: false }
      ]
    };
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    gotoPhase: function(id) {
      this.$router.push({
        path: "/administrator/program/" + id + "/phase-plan"
      });
    },
    gotoMentor: function(id) {
      this.$router.push({
        path: "/administrator/program/" + id + "/mentor"
      });
    },
    gotoCoordinator: function(id) {
      this.$router.push({
        path: "/administrator/program/" + id + "/coordinator"
      });
    },
    getDataList: function() {
      this.loader = true;
      net
        .getData(this, "/administrator/programmes")
        .then(
          res => {
            if (res.data.data) {
              this.program = res.data.data;
            } else {
              this.program.list = [];
            }
          },
          error => {
            console.log(error);
            this.err_msg = error.body.meta;
            this.status.error = true;
          }
        )
        .catch(function() {})
        .finally(function() {
          this.loader = false;
        });
    },
    openEdit: function(index) {
      this.dialogForm = true;
      this.view = false;
      this.edit = true;
      this.singleData = this.program.list[index];
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
        .deleteData(this, "/administrator/programmes/" + id)
        .then()
        .catch(function() {})
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
