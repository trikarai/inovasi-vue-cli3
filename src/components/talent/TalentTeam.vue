<template>
  <transition name="slide" mode="out-in">
    <div>
      <v-container>
        <notification-alert v-bind:err_msg="err_msg" v-bind:status="status"/>
        <v-btn color="blue" append to="/talent/create/team" style="left: -8px">
          <v-icon>add</v-icon>
          {{ $vuetify.t('$vuetify.action.create') }} {{ $vuetify.t('$vuetify.team.team') }}
        </v-btn>
        <v-dialog v-model="loader" hide-overlay persistent width="300">
          <v-card color="primary" dark>
            <v-card-text>
              {{ $vuetify.t('$vuetify.info.standby') }}
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-data-table dark :headers="headers" :items="team.list" class="elevation-1">
          <template v-slot:items="props">
            <td>{{ props.item.team.name }}</td>
            <td>{{ props.item.position }}</td>
            <td>
              <v-chip color="teal" text-color="white">
                <v-avatar>
                  <v-icon>check_circle</v-icon>
                </v-avatar>
                {{ props.item.status.displayName }}
              </v-chip>
            </td>
            <td class="text-xs-right">
              <v-btn small @click="openIdea(props.item.team.id)">
                {{$vuetify.t('$vuetify.idea.idea')}}
              </v-btn>
              <v-btn small @click="openParticipation(props.item.team.id)">
                {{$vuetify.t('$vuetify.team.programParticipation')}}
              </v-btn>
              <v-btn small @click="openDetail(props.item.id)">
                <v-icon small>pageview</v-icon>
                {{ $vuetify.t('$vuetify.action.view') }}
              </v-btn>
              <v-btn
                small
                dark
                color="warning"
                @click="deleteAct(props.index)"
              >
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
      </v-container>

      <TeamForm
        :data="singleData"
        v-bind:edit="edit"
        v-bind:view="view"
        v-if="dialogForm"
        @close="dialogForm = false"
      />
    </div>
  </transition>
</template>
<script>
import net from "@/config/httpclient";
import Notification from "@/components/Notification";
import TeamForm from "@/components/talent/team/TeamForm";
export default {
  components: {
    TeamForm,
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
          text: "Team Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Position", value: "positon", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "", value: "id", sortable: false }
      ],
      team: {
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
        .getData(this, "/talent/team-memberships")
        .then(
          res => {
            if (res.data.data) {
              this.team = res.data.data;
            } else {
              this.team.list = [];
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
    openDetail: function(id) {
      this.$router.push({path: "/talent/team/"+ id})
    },
    openParticipation: function(id){
      this.$router.push({path: "/talent/team/"+ id + "/participation"})
    },
    openIdea: function(id) {
      this.$router.push({path: "/talent/team/"+ id + "/idea"})
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
    deleteData: function(id){
      var app = this;
      this.status.error = false;
      this.status.info = false;
      net.putData(this, "/talent/team-memberships/" + id + "/quit")
      .then(function(res){
        app.status.info = true;
        app.err_msg = {code:0, type: "info", details:["Quit Successfull"]};
      })
      .catch(function(error){
        app.status.error = true;
        app.err_msg = error.body.meta;
      })
      .finally(function(){
        app.refresh();
      })
    },
    refresh: function() {
      this.dialogForm = false;
      this.getDataList();
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