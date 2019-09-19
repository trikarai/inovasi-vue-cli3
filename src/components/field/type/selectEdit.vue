<template>
  <div>
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
      {{field.field.name}}
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
  </div>
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
      // rules: [
      //   v => !!v || "This field is required",
      //   v =>
      //     v.length >= this.field.minValue ||
      //     "Min " + this.field.minValue + " characters",
      //   v =>
      //     v.length <= this.field.maxValue ||
      //     "Max " + this.field.maxValue + " characters"
      // ]
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

