<template>
  <v-app :dark="$store.state.isDark">
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data: function(){
    return{
    }
  }
}
</script>
<style lang="scss">
</style>
