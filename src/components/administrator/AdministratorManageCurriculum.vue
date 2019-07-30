<template>
  <div>
    <v-container>
      <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />

      <v-btn @click="openAdd()" color="blue" style="left: -8px">
        <v-icon>add</v-icon>
        {{ $vuetify.t('$vuetify.action.add') }} Curriculum
      </v-btn>

      <v-data-table
        dark
        :headers="headers"
        :loading="loader"
        :items="curriculum.list"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">
            <v-btn small @click="goto(props.item.id)">
              <v-icon small>extension</v-icon>
              <!-- {{ $vuetify.t('$vuetify.profile.skill') }} -->
              Phase
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

    <CurriculumForm
      :data="singleCurriculum"
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
import CurriculumForm from "./curriculum/AddCurriculum";
import Notification from "@/components/Notification";

export default {
  components: {
    CurriculumForm,
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
      curriculum: { total: 0, list: [] },
      singleCurriculum: { id: "", name: "" },
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
    goto: function(id) {
      this.$router.push({
        path: "/administrator/curriculum/" + id + "/phase-plan"
      });
    },
    getDataList: function() {
      this.loader = true;
      net
        .getData(this, "/administrator/curriculums")
        .then(function(res) {
          if (res.data.data) {
            this.curriculum = res.data.data;
          } else {
            this.curriculum.list = [];
          }
        })
        .catch(function(error) {
          console.log(error);
          notif.showError(this, error);
        })
        .finally(function() {
          this.loader = false;
        });
    },
    openEdit: function(index) {
      this.dialogForm = true;
      this.view = false;
      this.edit = true;
      this.singleCurriculum = this.curriculum.list[index];
    },
    openAdd: function() {
      this.dialogForm = true;
      this.view = false;
      this.edit = false;
      this.singleCurriculum = { id: "", name: "" };
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
        .deleteData(this, "/administrator/curriculums/" + id)
        .then()
        .catch(function(error) {
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
    }
  }
};
</script>
