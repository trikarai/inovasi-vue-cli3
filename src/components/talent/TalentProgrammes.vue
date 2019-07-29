<template>
  <transition name="slide" mode="out-in">
    <div>
      <v-container>
        <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
        <v-dialog v-model="loader" hide-overlay persistent width="300">
          <v-card color="primary">
            <v-card-text>
              {{ $vuetify.t('$vuetify.info.standby') }}
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-alert :value="!isTeam" type="info">Please Register in Team Menu</v-alert>

        <v-data-table :headers="headers" :items="program.list" class="elevation-1">
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td>
              <v-btn small color="primary" v-if="isTeam" @click="registerProgram(props.item.id)">
                <v-icon small left>how_to_reg</v-icon>
                {{ $vuetify.t("$vuetify.action.register") }}
              </v-btn>
            </td>
            <td class="text-xs-right">
              <v-btn small @click="openDetail(props.index)">
                <v-icon small left>search</v-icon>
                {{ $vuetify.t("$vuetify.action.view") }}
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-container>

      <ProgramDetail
        :data="singleData"
        :edit="edit"
        :view="view"
        v-if="dialogForm"
        @refresh="refresh"
        @close="dialogForm = false"
      />
    </div>
  </transition>
</template>
<script>
import net from "@/config/httpclient";
import alert from "@/config/alerthandling";
import Notification from "@/components/Notification";
import ProgramDetail from "./program/ProgramDetail";

export default {
  components: {
    ProgramDetail,
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
      teamId: "",
      isTeam: "false",
      singleData: { id: "", name: "" },
      err_msg: {details:[""]},
      loader: false,
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      selectedIndex: null,
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "", value: "id", sortable: false },
        { text: "", value: "id", sortable: false }
      ],
      program: {
        total: 0,
        list: []
      }
    };
  },
  created: function() {
    this.checkTeam();
  },
  watch: {
    $route() {
      this.checkTeam()
    }
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    checkTeam: function() {
      if (this.$route.params.teamId) {
        this.teamId = this.$route.params.teamId;
        this.isTeam = true;
      } else {
        this.teamId = "";
        this.isTeam = false;
      }
    },
    getDataList: function() {
      this.loader = true;
      net
        .getData(this, "/talent/programmes")
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
        .catch()
        .finally(function() {
          this.loader = false;
        });
    },
    openDetail: function(index) {
      this.dialogForm = true;
      this.view = true;
      this.edit = false;
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
    deleteData: function() {},
    refresh: function() {
      this.dialogForm = false;
      this.getDataList();
    },
    registerProgram: function(id) {
      this.status.error = false;
      this.status.success = false;
      this.loader = true;
      net
        .postData(
          this,
          "/talent/as-team-member/" + this.teamId + "/programme-participations",
          { programmeId: id }
        )
        .then(res => {
          console.log(res);
          var details = ["Register Success"];
          alert.showSuccess(this, res, details)
        })
        .catch(error => {
          console.log(error);
          alert.showError(this, error)
        })
        .finally(function() {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
