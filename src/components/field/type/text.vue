<template>
  <div>
    <v-flex xs12 sm12>
      <v-textarea
        v-model="value"
        :id="field.id"
        :name="field.id"
        :label="field.name"
        :hint="field.description"
        counter
        :clearable="clearable"
      ></v-textarea>
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
      value: "",
      rules: [
        v => !!v || "This field is required"
        // v => v.length >= this.field.minValue || "Min " + this.field.minValue + " characters",
        // v => v.length <= this.field.maxValue || "Max " + this.field.maxValue + " characters"
      ]
    };
  },
  watch: {
    value: function() {
      var params = { id: this.field.id, value: this.value };
      bus.$emit("getValue", params, this.index);
    }
  }
};
</script>

<style scoped>
</style>

