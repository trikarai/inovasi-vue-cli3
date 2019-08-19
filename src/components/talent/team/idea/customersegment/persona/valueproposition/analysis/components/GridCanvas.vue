<template>
  <div>
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
      <v-btn @click="openBusinessForm" color="primary">
        <v-icon left>edit</v-icon>
        <!-- {{canvas.form.name}} -->
      </v-btn>
    </v-container>

    <!-- <v-container>
      <pre>{{ canvas }}</pre>
    </v-container> -->
    <v-container style="display: grid; justify-items: stretch;" class="pa-0">
      <template v-for="field in canvas.fields">
        <div
          :key="field.id"
          :style="'border: 1px solid grey; grid-area:' + getGridPosition(field.field.position) + '; background-color: grey'"
        >
          <v-card elevation="2" :hover="hover" height="100%" class="ma-1 pa-0">
            <v-card-text>
              {{field.value}}
            </v-card-text>
          </v-card>
        </div>
      </template>
    </v-container>

    <business-form v-if="dialogForm" @close="dialogForm = false" @refresh="refresh"></business-form>
  </div>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";

import BusinessForm from "./BusinessForm";

export default {
  data: function() {
    return {
      canvas: "",
      loader: false,
      hover: false,
      dialogForm: false,
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: {details:[""]}
    };
  },
  components: {
    BusinessForm,
    "notification-alert": Notification
  },
  mounted: function() {
    this.getCanvas();
  },
  methods: {
    getGridPosition: function(position){
      var position = JSON.parse(position);
      return position.grid;
    },
    getCanvas: function() {
      this.loader = true;
      net
        // .getData(this, "/talent/forms/id/" + this.$route.params.formId)
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
            "/business-canvases/" +
            this.$route.params.formId
        )
        .then(res => {
          this.canvas = res.data.data;
        })
        .catch(error => {
          // console.log(error);
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    openBusinessForm: function() {
      this.dialogForm = true;
    },
    refresh: function() {}
  }
};
</script>

<style scoped>
</style>
