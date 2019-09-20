<template>
  <v-layout>
    <!-- {{field}} -->
    <v-flex xs12 sm12 v-if="field.field.minValue === 1">
     {{field.field.name}}
      <v-radio-group v-model="value">
        <v-radio
          color="primary"
          v-for="option in field.field.options"
          :key="option.id"
          :label="option.name"
          :value="option.id"
        ></v-radio>
      </v-radio-group>
    </v-flex>
    <v-flex xs12 sm12 v-else>
      <v-select
        v-model="value"
        :label="field.field.name"
        :items="field.field.options"
        item-text="name"
        item-value="id"
        chips
        multiple
      ></v-select>
    </v-flex>
  </v-layout>
</template>
<script>
import bus from "@/bus";

export default {
  props: ["field", "index"],
  components: {},
  data: function() {
    return {
      clearable: true,
      value: ""
    };
  },
  watch: {
    value: function() {
      var params = "";
      if (this.field.field.minValue === 1) {
        var arr = new Array(this.value);
        params = { id: this.field.field.id, value: arr };
      } else {
        params = { id: this.field.field.id, value: this.value };
      }
      bus.$emit("getValue", params, this.index);
    }
  }
};
</script>

<style scoped>
</style>

