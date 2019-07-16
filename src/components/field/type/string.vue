<template>
  <div>
    <v-flex xs12 sm12>
      <v-text-field
        :label="field.name"
        :hint="field.description"
        :counter="field.maxValue"
        :maxlength="field.maxValue"
        :rules="rules"
        :clearable="clearable"
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
        v => v.length >= this.field.minValue || "Min " + this.field.minValue + " characters",
        v => v.length <= this.field.maxValue || "Max " + this.field.maxValue + " characters"
      ]
    };
  }
};
</script>

<style scoped>
</style>

