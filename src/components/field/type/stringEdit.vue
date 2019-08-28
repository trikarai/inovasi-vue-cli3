<template>
    <v-flex xs12 sm12>
      <v-text-field
        v-model="value"
        :label="field.field.name"
        :id="field.id"
        :name="field.id"
        :clearable="clearable"
      ></v-text-field>
      <!--
        :counter="field.maxValue"
        :maxlength="field.maxValue"
        :hint="field.description"
      -->
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
        v => v.length >= this.field.minValue || "Min " + this.field.minValue + " characters",
        v => v.length <= this.field.maxValue || "Max " + this.field.maxValue + " characters"
      ]
    };
  },
  created: function(){
    this.value = this.field.value;
  },
  watch: {
    value: function(){
      var params = { id: this.field.field.id , value: this.value }
      bus.$emit("getValue", params, this.index)
    }
  }
};
</script>

<style scoped>
</style>

