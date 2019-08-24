<template>
  <div>
    <v-container>
      <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
      <!-- {{res}}<br> -->
      <!-- <v-btn @click="openAdd()" color="blue" style="left: -8px">
        <v-icon>add</v-icon>
        {{ $vuetify.lang.t('$vuetify.action.add') }} Phase
      </v-btn>-->
      <v-dialog v-model="loader" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            {{ $vuetify.lang.t('$vuetify.info.standby') }}
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-data-table dark :headers="headers" :items="phase.list" class="elevation-1"></v-data-table>
    </v-container>
    <!-- <PhaseForm
      :data="singleData"
      :edit="edit"
      :view="view"
      v-if="dialogForm"
      @close="dialogForm = false"
      @refresh="refresh()"
    />-->
  </div>
</template>
<script>
import net from "@/config/httpclient";
import Notification from "@/components/Notification";
// import PhaseForm from "./AddPhase";

export default {
  components: {
    "notification-alert": Notification
    //  PhaseForm
  },
  data() {
    return {
      res: "",
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: { details: [""] },
      loader: false,
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      dataId: "",
      selectedIndex: null,
      phase: { total: 0, list: [] },
      singleData: { id: "", name: "" },
      headers: [
        {
          text: "Order",
          align: "left",
          sortable: true,
          value: "order"
        },
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "phasePlan.name"
        }
      ]
    };
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getDataList: function() {
      this.loader = true;
      net
        .getData(
          this,
          "/administrator/programmes/" +
            this.$route.params.programId +
            "/phases"
        )
        .then(
          res => {
            if (res.data.data) {
              this.phase = res.data.data;
            } else {
              this.phase.list = [];
            }
          },
          error => {
            
            this.err_msg = error.body.meta;
            this.status.error = true;
          }
        )
        .catch(function() {})
        .finally(()=> {
          this.loader = false;
        });
    },
    openEdit: function(index) {
      this.dialogForm = true;
      this.view = false;
      this.edit = true;
      this.singleData = this.phase.list[index];
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
          "/administrator/programmes/" +
            this.$route.params.programId +
            "/phases/" +
            id
        )
        .then()
        .catch(function() {})
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
