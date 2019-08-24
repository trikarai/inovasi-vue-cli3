<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert v-bind:err_msg="err_msg" v-bind:status="status"/>
          <v-card style="padding:0px 30px 20px 30px" class="mt-5" elevation="0" width="400">
            <v-card class="taitel primary white--text elevation-5">
              <h3 class="headline mb-0 font-weight-light">View Programme Detail</h3>
            </v-card>
            <v-card elevation="0" width="400">
              <v-card-text>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Programme Name</v-list-item-title>
                    <v-list-item-subtitle>{{params.name}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Programme Description</v-list-item-title>
                    <v-list-item-subtitle>{{params.description}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Curriculum Name</v-list-item-title>
                    <v-list-item-subtitle>{{params.curriculum.name}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Curriculum description</v-list-item-title>
                    <v-list-item-subtitle>{{params.curriculum.description}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card-text>
            </v-card>
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
        .finally(()=> {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
@import "../../css/modal.css";

.taitel {
  padding: 24px;
  /* width: 90%; */
  margin: 0 auto;
  bottom: 27px;
  z-index: 2;
}
</style>
