<template>
  <transition name="slide" mode="out-in">
    <div>
      <v-container>
        <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />

        <v-data-table
          :loading="loader"
          :headers="headers"
          :items="programmeCoordinatorships.list"
          class="elevation-1"
        >
          <template v-slot:item.action="{item}">
              <v-btn small @click="openParticipant(item.programme.id)" color="primary">
                <v-icon small left>people_outline</v-icon>
                <!-- {{ $vuetify.lang.t('$vuetify.action.view') }} -->
                Participants
              </v-btn>
          </template>
        </v-data-table>
      </v-container>
    </div>
  </transition>
</template>
<script>
import auth from "@/config/auth";
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
        { text: "Curriculum", value: "programme.curriculum.name", sortable: false },
        { text: "", value: "action", sortable: false, align:"right" }
      ],
      program: {
        total: 0,
        list: []
      },
      programmeCoordinatorships: {
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
        .getData(this, "/talent/programme-coordinatorships")
        .then(res => {
          if (res.data.data) {
            this.programmeCoordinatorships = res.data.data;
          } else {
            this.programmeCoordinatorships = { total: 0, list: [] };
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    openParticipant: function(id) {
      this.$router.push({
        path: "/coordinator/program/" + id + "/participant"
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