<template>
  <div>
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
    </v-container>
    <v-container style="display: grid" class="pa-0">
      <template v-for="field in canvas.fields">
        <div
          :key="field.id"
          :style="'border: 1px solid grey; grid-area:' + field.position + '; background-color: grey'"
          class="pt-1 pr-2 pb-2"
        >
          <v-card elevation="2" :hover="hover" height="100%" class="mt-1 ml-2 pa-0">
            <v-card-text>
              <v-textarea :label="field.name" auto-grow :value="lorem"></v-textarea>
            </v-card-text>
          </v-card>
        </div>
      </template>
    </v-container>
  </div>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";

export default {
  data: function() {
    return {
      canvas: "",
      loader: false,
      hover: false,
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: ""
    };
  },
  mounted: function() {
    this.getCanvas();
  },
  methods: {
    getCanvas: function() {
      this.loader = true;
      net
        .getData(this, "/talent/forms/id/" + this.$route.params.formId)
        .then(res => {
          this.canvas = res.data.data;
        })
        .catch(error => {
          console.log(error);
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
