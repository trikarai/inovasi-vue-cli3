<template>
  <transition name="slide" mode="out-in">
    <v-container>
      <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
      <loader-dialog v-model="loader" />
      <v-layout>
        <v-flex md12>
        <v-data-table :headers="headers" :items="programmeMentorship.list" class="elevation-1">
          <template v-slot:item.action="{item}">
            <v-btn small @click="gotoMentoring(item.id)" color="primary">
              <v-icon small left>today</v-icon>
              {{ $vuetify.lang.t('$vuetify.action.view') }}
              Mentoring
            </v-btn>
            <v-btn small @click="gotoCollaboration(item.programme.id)" color="primary" class="ml-2">
              <v-icon small left>folder_shared</v-icon>
              {{ $vuetify.lang.t('$vuetify.action.view') }}
              {{ $vuetify.lang.t('$vuetify.collaboration.collaboration') }}
            </v-btn>
          </template>
        </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </transition>
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
      user: "",
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      singleData: { id: "", name: "" },
      err_msg: { details: [""] },
      loader: false,
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      selectedIndex: null,
      headers: [
        {
          text: "Program Name",
          align: "left",
          sortable: false,
          value: "programme.name"
        },
        { text: "", value: "action", sortable: false, align: "right" }
      ],
      program: {
        total: 0,
        list: []
      },
      programmeMentorship: {
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
      this.status.error = false;
      net
        .getData(this, "/talent/programme-mentorships")
        .then(res => {
          if (res.data.data) {
            this.programmeMentorship = res.data.data;
          } else {
            this.programmeMentorship = { total: 0, list: [] };
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    gotoMentoring: function(id) {
      this.$router.push({
        path: "/mentor/program/" + id + "/mentoring"
      });
    },
    gotoCollaboration: function(id) {
      this.$router.push({
        path: "/mentor/program/" + id + "/collaboration"
      });
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