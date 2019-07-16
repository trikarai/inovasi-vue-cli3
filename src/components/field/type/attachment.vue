<template>
  <div>
    <!-- https://jsfiddle.net/meyubaraj/fLbe7r72/ -->
    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center" pt-3>
      <img :src="imageUrl" height="150" v-if="imageUrl" />
      <v-text-field
        :label="field.name"
        @click="pickFile"
        v-model="imageName"
        prepend-icon="attach_file"
      ></v-text-field>
      <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked" />
    </v-flex>
  </div>
</template>
<script>
export default {
  props: ["field"],
  components: {},
  data: function() {
    return {
      imageName: "",
      imageUrl: "",
      imageFile: ""
    };
  },
  watch: {},
  mounted() {},
  methods: {
    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
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
    }
  }
};
</script>
<style scoped>
/* input[type="file"] {
  position: absolute;
  left: -99999px;
} */
</style>
