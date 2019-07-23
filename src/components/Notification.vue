<template>
  <v-layout align-center justify-center>
    <v-alert
      transition="scale-transition"
      dismissible
      type="success"
      :value="status.success"
    >{{err_msg.details[0]}}.</v-alert>

    <v-alert
      transition="scale-transition"
      dismissible
      type="info"
      :value="status.info"
    >{{err_msg.code}}  {{err_msg.details[0]}}</v-alert>

    <v-alert
      transition="scale-transition"
      dismissible
      type="warning"
      :value="status.warning"
    >warning.</v-alert>

    <v-alert
      transition="scale-transition"
      dismissible
      type="error"
      :value="status.error"
    >{{err_msg.code}}  {{err_msg.details[0]}}</v-alert>
  </v-layout>
</template>
<script>
export default {
  props: ["err_msg", "status"],
  data: function() {
    return {
    };
  }
};
</script>

