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
      <v-icon left>add</v-icon>Add
    </v-btn>
      <!-- {{experiments.list}} -->
    <v-layout>
      <v-flex>
        <v-data-table :headers="headers" :items="experiments.list" class="elevation-1">
          <template v-slot:item.action="{item}">
            <v-btn @click="gotoExp(item.id)" color="primary" small fab>
              <v-icon>pageview</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>

    <experiment-form v-if="dialogForm" @close="dialogForm = false" @refresh="refresh"></experiment-form>
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
      dialogForm: false
    };
  },
  mounted: function() {
    this.getExperiments();
  },
  methods: {
    openExperimentForm: function() {
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
            "/experiments?experiment_template_id=" +
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
    }
  }
};
</script>
