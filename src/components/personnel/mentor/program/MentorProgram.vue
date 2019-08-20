<template>
  <transition name="slide" mode="out-in">
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

        <v-data-table :headers="headers" :items="programmeMentorship.list" class="elevation-1">
          <template v-slot:item.action="{item}">
              <v-btn small @click="gotoMentoring(item.id)" color="primary">
                <v-icon small left>today</v-icon>
                {{ $vuetify.lang.t('$vuetify.action.view') }}
                Mentoring
              </v-btn>
          </template>
        </v-data-table>
      </v-container>
    </div>
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
          text: "Program Name",
          align: "left",
          sortable: false,
          value: "programme.name"
        },
        { text: "", value: "action", sortable: false, align:"right" }
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
  created: function() {
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getDataList: function() {
      this.loader = true;
      this.status.error = false;
      net
        .getData(
          this,
          "/talent/programme-mentorships"
        )
        .then(res => {
          if (res.data.data) {
            this.programmeMentorship = res.data.data;
          } else {
            this.programmeMentorship = {total:0, list:[]};
          }
        })
        .catch(error => {
          console.log(error);
          notif.showError(this, error);
        })
        .finally(function() {
          this.loader = false;
        });
    },
    gotoMentoring: function(id) {
      this.$router.push({
        path: "/mentor/program/" + id + "/mentoring"
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