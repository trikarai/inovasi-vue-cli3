<template>
  <div>
    <v-container>
      <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
      <v-btn @click="openAdd()" color="blue" style="left: -8px">
        <v-icon>add</v-icon>
        {{ $vuetify.lang.t('$vuetify.action.add') }} program
      </v-btn>
      <v-data-table
        dark
        :headers="headers"
        :loading="loader"
        :items="program.list"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">
            <v-btn small @click="gotoRegistration(props.item.id)">
              <v-icon small>schedule</v-icon>Registration
            </v-btn>
            <v-btn small @click="gotoMentoring(props.item.id)">
              <v-icon small>event</v-icon>Mentoring
            </v-btn>
            <v-btn small @click="gotoPhase(props.item.id)">
              <v-icon small>extension</v-icon>Phase
            </v-btn>
            <v-btn small @click="gotoCoordinator(props.item.id)">
              <v-icon left small>person_add</v-icon>
              {{$vuetify.lang.t('$vuetify.personnel.coordinator')}}
            </v-btn>
            <v-btn small @click="gotoMentor(props.item.id)">
              <v-icon left small>person_add</v-icon>
              {{$vuetify.lang.t('$vuetify.personnel.mentor')}}
            </v-btn>
          </td>
          <td class="text-xs-right">
            <v-btn @click="openEdit(props.item)" small>
              <v-icon small>edit</v-icon>
              {{ $vuetify.lang.t('$vuetify.action.edit') }}
            </v-btn>
            <v-btn small dark color="warning" @click="deleteAct(props.item.id)">
              <v-icon small>delete</v-icon>
              {{ $vuetify.lang.t('$vuetify.action.delete') }}
            </v-btn>
            <v-expand-transition>
              <div v-show="props.item.id == selectedIndex">
                {{ $vuetify.lang.t('$vuetify.action.confirmationtodelete') }}
                <v-btn @click="deleteData(props.item.id)" color="red">
                  <v-icon></v-icon>
                  {{ $vuetify.lang.t('$vuetify.action.yes') }}
                </v-btn>
                <v-btn @click="deleteAct(null)">
                  <v-icon></v-icon>
                  {{ $vuetify.lang.t('$vuetify.action.cancel') }}
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
import notif from "@/config/alerthandling";
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
      err_msg: {details:[""]},
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
    gotoRegistration: function(id) {
      this.$router.push({
        path: "/administrator/program/" + id + "/registration"
      });
    },
    gotoMentoring: function(id) {
      this.$router.push({
        path: "/administrator/program/" + id + "/mentoring"
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
        .then(res=> {
          if (res.data.data) {
            this.program = res.data.data;
          } else {
            this.program.list = [];
          }
        })
        .catch(error=> {
          console.log(error);
          notif.showError(this, error);
        })
        .finally(()=> {
          this.loader = false;
        });
    },
    openEdit: function(data) {
      this.dialogForm = true;
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
    deleteAct: function(id) {
      if (this.selectedIndex == id) {
        this.selectedIndex = null;
      } else {
        this.selectedIndex = id;
      }
    },
    deleteData: function(id) {
      notif.reset(this);
      net
        .deleteData(this, "/administrator/programmes/" + id)
        .then()
        .catch(error=> {
          notif.showError(this, error);
        })
        .finally(()=> {
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
