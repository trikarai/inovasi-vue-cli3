<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert v-bind:err_msg="err_msg" v-bind:status="status"/>
          <v-card elevation="0" width="400">
            <v-card-text class="pt-4">
              <p>{{params.description}}</p>
              <p>{{params.curriculum.name}}</p>
              <p>{{params.curriculum.description}}</p>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import net from "@/config/httpclient";
import Notification from "@/components/Notification";

export default {
  props: ["id", "edit", "view", "data"],
  data: function() {
    return {
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: { code: 666, type: "", details: [""] },
      valid: false,
      loader: false,
      params: {}
    };
  },
  components: {
    "notification-alert": Notification
  },
  created: function() {},
  mounted: function() {
    this.getSingleData();
  },
  methods: {
    getSingleData: function() {
      this.loader = true;
      net
        .getData(this, "/talent/programmes/" + this.data.id)
        .then(
          res => {
            if (res.data.data) {
              this.params = res.data.data;
            } else {
              this.params.list = [];
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
    }
  }
};
</script>
<style scoped>
@import "../../css/modal.css";
</style>
