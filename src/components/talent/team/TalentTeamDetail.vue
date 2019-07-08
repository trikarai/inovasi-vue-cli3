<template>
  <transition name="slide" mode="out-in">
    <div>
      <v-container>
        <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />

        <v-dialog v-model="loader" hide-overlay persistent width="300">
          <v-card color="primary">
            <v-card-text>
              {{ $vuetify.t('$vuetify.info.standby') }}
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-layout align-start justify-start column fill-height>
          <!-- <v-flex>{{params}}</v-flex> -->
          <v-flex>{{params.team.name}}</v-flex>
          <v-flex>{{params.position}}</v-flex>
          <v-flex>{{params.status.displayName}}</v-flex>
        </v-layout>

        <v-layout>
          <v-btn @click="openSearch()">
            <v-icon>add</v-icon>Add Members
          </v-btn>
          <br />
          {{memberlist}}
        </v-layout>
      </v-container>
    </div>
  </transition>
</template>
<script>
import net from "@/config/httpclient";
import Notification from "@/components/Notification";
import { setTimeout } from "timers";
export default {
  components: {
    "notification-alert": Notification
  },
  data() {
    return {
      valid: false,
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: "",
      params: {},
      memberlist: { total: 0, list: [] },
      loader: false,
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      selectedIndex: null
    };
  },
  components: {},
  created: function() {},
  mounted: function() {
    this.getSingleData();
    setTimeout(() => {
      this.getMemberList();
    }, 1000);
  },
  methods: {
    getSingleData: function() {
      var app = this;
      this.status.error = false;
      this.loader = !this.loader;
      net
        .getData(
          this,
          "/talent/team-memberships/" + this.$route.params.membershipId
        )
        .then(function(res) {
          console.log(res);
          this.params = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
          app.err_msg = error.body.meta;
          app.status.error = true;
        })
        .finally(function() {
          app.loader = false;
        });
    },
    getMemberList: function() {
      this.loader = true;
      net
        .getData(
          this,
          "/talent/as-team-member/" + this.params.team.id + "/members/"
        )
        .then(res => {
          console.log(res);
          if (res.data) {
            this.memberlist = res.data.data;
          } else {
            this.memberlist = { total: 0, list: [] };
          }
        })
        .catch(error=>{
          console.log(error);
        }).finally(function(){
          this.loader = false;
        });
    },
    openSearch: function() {
      this.$router.push({
        path: "/talent/team/" + this.params.team.id + "/search"
      });
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