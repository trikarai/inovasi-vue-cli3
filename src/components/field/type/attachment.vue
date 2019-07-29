<template>
  <div>
    <!-- https://jsfiddle.net/meyubaraj/fLbe7r72/ -->
    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
      <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
      {{response}}
      <!-- <v-progress-linear v-if="progressShow" color="red" v-model="valueDeterminate"></v-progress-linear> -->
      <v-expand-x-transition>
        <v-progress-circular
          v-if="progressShow"
          rotate="90"
          size="150"
          width="10"
          :value="valueDeterminate"
          color="red"
        >{{ valueDeterminate }} %</v-progress-circular>
      </v-expand-x-transition>
      <v-expand-transition>
        <template v-if="!progressShow">
          <img :src="imageUrl" height="150" v-if="imageUrl" />
        </template>
      </v-expand-transition>
      <template v-if="!uploaded">
        <v-btn
          @click.prevent="uploadFile"
          v-if="imageUrl"
          :disabled="progressShow"
          small
          fab
          color="red"
        >
          <v-icon>cloud_upload</v-icon>
        </v-btn>
      </template>
      <v-btn fab small color="green" v-if="uploaded">
        <v-icon>check</v-icon>
      </v-btn>
      <v-text-field
        label="Select Image"
        @click="pickFile"
        v-model="imageName"
        prepend-icon="attach_file"
      ></v-text-field>
      <select v-if="fileInfo.filePath" style="display:none" v-model="value" multiple>
        <option :value="fileInfo.id" selected>{{ fileInfo.filePath }}</option>
      </select>
      <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked" />
    </v-flex>
  </div>
</template>
<script>
import bus from "@/bus";
import * as config from "@/config/config";
import auth from "@/config/auth";
import Notification from "@/components/Notification";
import { uuid } from "vue-uuid";
import notif from "@/config/alerthandling";

export default {
  props: ["field", "index"],
  components: {},
  data: function() {
    return {
      response: "",
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: { code: 666, type: "", details: [] },
      clearable: true,
      readonly: true,
      valueDeterminate: 0,
      value: [],
      imageName: "",
      imageUrl: "",
      imageFile: "",
      headers: {},
      progressShow: false,
      uploaded: false,
      fileInfo: { id: "", filePath: "" }
    };
  },
  components: {
    "notification-alert": Notification
  },
  watch: {
    fileInfo: function() {
      var params = { id: this.field.id, value: this.value };
      bus.$emit("getValue", params, this.index);
    }
  },
  mounted() {},
  methods: {
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      this.progressShow = false;
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        this.headers["file-name"] = this.$uuid.v4() + "_" + files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    uploadFile: function() {
      this.progressShow = true;
      let data = JSON.parse(window.localStorage.getItem("lbUser"));
      this.headers["Content-Type"] = "image/*";
      this.headers["Authorization"] = "Bearer " + data.token;
      var app = this;
      this.$http
        .post(
          config.APIENDPOINT +
            "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/file-upload",
          this.imageFile,
          {
            headers: this.headers,
            progress(e) {
              if (e.lengthComputable) {
                console.log((e.loaded / e.total) * 100);
                app.valueDeterminate = Math.round((e.loaded / e.total) * 100);
              }
            }
          }
        )
        .then(res => {
          console.log(res);
          this.value[0] = res.data.data.fileInfo.id;
          this.fileInfo = res.data.data.fileInfo;
          this.uploaded = true;
        })
        .catch(error => {
          console.log(error);
          notif.showError(this, error);
          this.uploaded = false;
        })
        .finally(() => {
          this.progressShow = false;
        });
    }
  }
};
</script>
<style scoped>
</style>
