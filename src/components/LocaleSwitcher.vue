<template>
  <div>
    <button @click="setLang('en')">EN</button> - 
    <button @click="setLang('id')">ID</button>
  </div>
</template>

<script>
// import i18n from "@/lang/i18n"
export default {
  data() {
    return {
    };
  },
  methods: {
    setLang: function(lang){
      this.$vuetify.lang.current = lang
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