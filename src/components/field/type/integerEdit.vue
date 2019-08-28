<template>
    <v-flex xs12 sm12>
      <v-text-field
        v-model="value"
        :label="field.field.name"
        :clearable="clearable"
        type="number"
      ></v-text-field>
      <!-- :hint="field.description"
        :max="field.maxValue"
        :min="field.minValue"
        :rules="rules" -->
    </v-flex>
</template>
<script>
import bus from "@/bus";

export default {
  props: ["field", "index"],
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
  created: function(){
    this.value = this.field.value;
  },
  watch: {
    value: function() {
      var params = { id: this.field.field.id, value: this.value };
      bus.$emit("getValue", params, this.index);
    }
  }
};
</script>

<style scoped>
</style>

