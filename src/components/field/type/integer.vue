<template>
  <div>
    <v-flex xs12 sm12>
      <v-text-field
        v-model="value"
        :label="field.name"
        :hint="field.description"
        :max="field.maxValue"
        :min="field.minValue"
        :rules="rules"
        :clearable="clearable"
        type="number"
      ></v-text-field>
    </v-flex>
  </div>
</template>
<script>
import bus from "@/bus";

export default {
  props: ["field"],
  components: {},
  data: function() {
    return {
      clearable: true,
      value: "",
      rules: [
        v => !!v || "This field is required",
        v => v >= this.field.minValue || "Min value is " + this.field.minValue,
        v => v <= this.field.maxValue || "Max value is " + this.field.maxValue
      ]
    };
  },
  watch: {
    value: function() {
      var params = { id: this.field.id, value: this.value };
      bus.$emit("getValue", params, this.field.position - 1);
    }
  }
};
</script>

<style scoped>
</style>

