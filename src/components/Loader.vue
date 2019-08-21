<template>
  <v-dialog v-model="show" hide-overlay persistent width="300">
    <v-card color="omikti" dark>
      <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      <v-card-title class="justify-center">
        <v-icon>access_time</v-icon>
        &nbsp;{{ $vuetify.lang.t('$vuetify.info.standby') }}
      </v-card-title>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    value: Boolean
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>