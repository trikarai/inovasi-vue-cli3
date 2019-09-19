<template>
  <v-container>
    <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
    <v-dialog v-model="loader" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{ $vuetify.lang.t('$vuetify.info.standby') }}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-btn @click="openExperimentForm" color="primary" class="mb-3">
      <v-icon left>add</v-icon>
      {{ $vuetify.lang.t('$vuetify.action.add') }} {{ $vuetify.lang.t('$vuetify.experiment.exp') }}
    </v-btn>
    <!-- {{experiments.list}} -->
    <v-layout>
      <v-flex>
        <v-data-table :headers="headers" :items="experiments.list" class="elevation-3">
          <template v-slot:item.action="{item}">
            <v-btn class="mr-2 mt-1 mb-1" @click="openEdit(item)" color="grey lighten-4" small>
              <v-icon small left>edit</v-icon>
              {{ $vuetify.lang.t('$vuetify.action.edit') }}
            </v-btn>
            <v-btn class="mr-2 mt-2 mb-2" @click="gotoExp(item.id)" color="primary" small>
              <v-icon left>pageview</v-icon>
              {{ $vuetify.lang.t('$vuetify.action.view') }}
            </v-btn>
            <v-btn class=" mt-2 mb-2" dark color="omikti" small @click="deleteAct(item.id)">
              <v-icon small left>delete</v-icon>
              {{ $vuetify.lang.t('$vuetify.action.delete') }}
            </v-btn>
            <v-expand-transition>
              <div class="mt-2 mb-2" v-show="item.id == selectedIndex">
                <div>
                  <v-icon>warning</v-icon>
                  <span>{{ $vuetify.lang.t('$vuetify.action.confirmationtodelete') }}</span>
                </div>
                <v-btn small dark @click="deleteData(item.id)" color="red" class="ma-2">
                  <v-icon></v-icon>
                  {{ $vuetify.lang.t('$vuetify.action.yes') }}
                </v-btn>
                <v-btn small text @click="deleteAct(null)">
                  <v-icon></v-icon>
                  {{ $vuetify.lang.t('$vuetify.action.cancel') }}
                </v-btn>
              </div>
            </v-expand-transition>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <experiment-form
      v-if="dialogForm"
      :data="singleData"
      :edit="edit"
      :formId="formId"
      :formDate="formDate"
      @close="dialogForm = false"
      @refresh="refresh"
    ></experiment-form>
  </v-container>
</template>

<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";

import ExperimentForm from "./ExperimentForm";

export default {
  components: {
    ExperimentForm,
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
      headers: [
        {
          text: "Date",
          align: "left",
          sortable: true,
          value: "date"
        },
        {
          text: "Experiment Name",
          align: "left",
          sortable: false,
          value: "form.name"
        },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      err_msg: { details: [""] },
      error: "error",
      loader: false,
      selectedIndex: null,
      experiments: { total: 0, list: [] },
      active: null,
      dialogForm: false,
      singleData: ""
    };
  },
  mounted: function() {
    this.getExperiments();
  },
  methods: {
    openExperimentForm: function() {
      this.singleData = "";
      this.dialogForm = true;
      this.edit = false;
    },
    openEdit: function(data) {
      this.singleData = data.id;
      this.formId = data.id;
      this.formDate = data.date;
      this.edit = true;
      this.dialogForm = true;
    },
    gotoExp: function(id) {
      this.$router.push({
        path:
          "/talent/team/" +
          this.$route.params.teamId +
          "/idea/" +
          this.$route.params.ideaId +
          "/customersegment/" +
          this.$route.params.customersegmentId +
          "/persona/" +
          this.$route.params.personaId +
          "/vp/" +
          this.$route.params.valuepropositionId +
          "/experiment-detail/" +
          id
      });
    },
    getExperiments: function() {
      this.loader = true;
      net
        .getData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/ideas/" +
            this.$route.params.ideaId +
            "/customer-segments/" +
            this.$route.params.customersegmentId +
            "/personas/" +
            this.$route.params.personaId +
            "/value-propositions/" +
            this.$route.params.valuepropositionId +
            "/experiments?formIds[]=" +
            this.$route.params.formId
        )
        .then(res => {
          if (res.data.data) {
            this.experiments = res.data.data;
          } else {
            this.experiments = { total: 0, list: [] };
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    refresh: function() {
      this.dialogForm = false;
      this.getExperiments();
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
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/ideas/" +
            this.$route.params.ideaId +
            "/customer-segments/" +
            this.$route.params.customersegmentId +
            "/personas/" +
            this.$route.params.personaId +
            "/value-propositions/" +
            this.$route.params.valuepropositionId +
            "/experiments/" +
            id
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
    }
  }
};
</script>
