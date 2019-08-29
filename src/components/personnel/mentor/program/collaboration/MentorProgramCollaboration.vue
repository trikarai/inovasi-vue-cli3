<template>
  <v-container>
    <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
    <loader-dialog v-model="loader" />
    <v-layout>
      <v-flex md12>
        <pre>{{collaboration}}</pre>
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
      err_msg: { details: [""] },
      loader: false,
      collaboration: { total: 0, list: [] }
    };
  },
  mounted: function() {
    this.getDataList();
  },
  methods: {
    getDataList: function() {
      this.loader = true;
      notif.reset(this);
      net
        .getData(
          this,
          "/talent/as-programme-mentor/" +
            this.$route.params.programId +
            "/collaborators?teamId="
        )
        .then(res => {
          if (res.data.data) {
            this.collaboration = res.data.data;
          } else {
            this.collaboration = { total: 0, list: [] };
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
</style>