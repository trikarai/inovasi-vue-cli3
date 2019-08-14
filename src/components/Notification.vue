<template>
  <v-layout align-center justify-center>
    
    <v-snackbar v-model="status.success" :auto-height="true" :multi-line="true" color="green" top class="ma-4">
      {{err_msg.details[0]}}
      <v-btn color="white" text @click="status.success = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar v-model="status.info" :auto-height="true" :multi-line="true" color="blue" top class="ma-4">
      {{err_msg.details[0]}}
      <v-btn color="white" text @click="status.info = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar v-model="status.warning" :auto-height="true" :multi-line="true" color="yellow" top class="ma-4">
      {{err_msg.details[0]}}
      <v-btn color="white" text @click="status.warning = false">Close</v-btn>
    </v-snackbar>

    <v-snackbar v-model="status.error" :auto-height="true" :multi-line="true" color="red" top class="ma-4">
      {{err_msg.code}} {{err_msg.details[0]}}
      <v-btn color="white" text @click="status.error = false">Close</v-btn>
    </v-snackbar>

  </v-layout>
</template>
<script>
export default {
  props: ["err_msg", "status"],
  data: function() {
    return {};
  }
};
</script>

