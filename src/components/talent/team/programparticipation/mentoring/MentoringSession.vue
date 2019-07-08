<template>
  <div>
    <v-container>
      <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
      <!-- <v-btn color="blue" append :to="'/talent/team/'+ $route.params.teamId + '/'" style="left: -8px">
          <v-icon>add</v-icon>
          Propose a Mentoring
      </v-btn>-->
      <v-dialog v-model="loader" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            {{ $vuetify.t('$vuetify.info.standby') }}
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-layout>
        <v-data-table dark :headers="headers" :items="mentoring.list" class="elevation-1">
          <template v-slot:items="props">
            <td>{{ props.item }}</td>
            <td class="text-xs-right">
              <v-btn small @click="openDetail(props.item.id)">
                <v-icon small left>pageview</v-icon>
                {{ $vuetify.t('$vuetify.action.view') }}
              </v-btn>
              <v-btn small dark color="warning" @click="deleteAct(props.index)">
                <v-icon small>outlined_flag</v-icon>
                {{ $vuetify.t('$vuetify.team.quit') }}
              </v-btn>
              <v-expand-transition>
                <div v-show="props.index == selectedIndex">
                  {{ $vuetify.t('$vuetify.action.confirmationtoquit') }}
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
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import net from "@/config/httpclient";
import alert from "@/config/alerthandling";
import Notification from "@/components/Notification";

export default {
  data() {
    return {
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      singleData: { id: "", name: "" },
      err_msg: "",
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
        { text: "", value: "id", sortable: false }
      ],
      mentoring: {
        total: 0,
        list: []
      }
    };
  },
  created: function() {},
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getDataList: function() {
      this.loader = true;
      net
        .getData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/programme-participations/" +
            this.$route.params.participationId + 
            "/mentoring-sessions"
        )
        .then(res => {
          if (res.data.data) {
            this.mentoring = res.data.data;
          } else {
            this.mentoring.list = [];
          }
        })
        .catch(error => {
          console.log(error);
          alert.showError(this, error)
        })
        .finally(function() {
          this.loader = false;
        });
    },
    openDetail: function(id) {
      // this.$router.push({path: "/talent/program/"+ id})
    }
  }
};
</script>
