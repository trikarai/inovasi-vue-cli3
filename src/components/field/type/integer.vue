<template>
  <div>
    <v-flex xs12 sm12>
      <v-text-field
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
export default {
  props: ["field"],
  components: {},
  data: function() {
    return {
      clearable: true,
      rules: [
        v => !!v || "This field is required",
        v => v >= this.field.minValue || "Min value" + this.field.minValue, 
        v => v <= this.field.maxValue || "Max value" + this.field.maxValue  
      ]
    };
  }
};
</script>

<style scoped>
</style>

