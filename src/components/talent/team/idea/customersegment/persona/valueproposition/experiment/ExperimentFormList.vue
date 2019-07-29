<template>
  <v-container>
    <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
    <v-dialog v-model="loader" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{ $vuetify.t('$vuetify.info.standby') }}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-layout>
      <v-flex>
        <v-data-table :headers="headers" :items="experiments.list" class="elevation-1">
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td></td>
            <td>
              <v-btn @click="gotoExp(props.item.id)" color="primary" small fab>
                <v-icon>pageview</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";

export default {
  components: {
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
          text: "Experiment Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "", value: "", sortable: false },
        { text: "", value: "", sortable: false }
      ],
      err_msg: {details:[""]},
      error: "error",
      loader: false,
      selectedIndex: null,
      experiments: { total: 0, list: [] },
      active: null,
    };
  },
  mounted: function() {
    this.getExperiments();
  },
  methods: {
    gotoExp: function(id){
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
          "/experiment/" + id
      });
    },
    getExperiments: function() {
      this.loader = true;
      net
        .getData(this, "/talent/forms?types[]=exp")
        .then(res => {
          if(res.data.data){
          this.experiments = res.data.data;
          }else{
            this.experiments = { total: 0, list: [] };
          }
        })
        .catch(error => {
          console.log(error);
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    }
  }
};
</script>
