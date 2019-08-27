<template>
  <div style="padding-top: 20px">
    <!-- <button @click="setLang('en')">EN</button> - 
    <button @click="setLang('id')">ID</button> -->
    <v-select v-model="lang" text label="Language" :items="items" item-text="name" item-value="value"></v-select>
  </div>
</template>

<script>
// import i18n from "@/lang/i18n"
export default {
  data() {
    return {
      lang: "en",
      items: [
        {
          name: "English",
          value: "en"
        },
        {
          name: "Indonesia",
          value: "id"
        }
      ]
    };
  },
  watch: {
    lang: "setLang"
  },
  methods: {
    setLang: function() {
      this.$vuetify.lang.current = this.lang;
      this.$moment.locale(this.lang);
      // console.log(this.$moment.locale());
    }
  }
};
</script>

<style scoped>
.country-icon {
  width: 20px;
  height: auto;
  display: inline-block;
  vertical-align: baseline;
  border: 1px solid #dee2e6;
  box-shadow: 0px 1px 3px rgba(24, 29, 38, 0.1);
}
/* 
    .country-icon.as-toggle {
        margin-top: 5px;
    }

    .locale-name {
        display: inline-block;
        vertical-align: baseline;
    } */
</style>