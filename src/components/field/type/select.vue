<template>
  <div>
    <v-flex xs12 sm12 v-if="field.minValue === 1">
      {{field.name}}
      <v-radio-group v-model="select">
        <v-radio
          color="primary"
          v-for="option in field.options"
          :key="option.id"
          :label="option.name"
          :value="option.id"
        ></v-radio>
      </v-radio-group>
    </v-flex>
    <v-flex xs12 sm12 v-else>
      <v-select
        v-model="select"
        :label="field.name"
        :items="field.options"
        item-text="name"
        item-value="id"
        :hint="field.description"
        :clearable="clearable"
        chips
        multiple
      ></v-select>
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
      select: "",
      rules: [
        v => !!v || "This field is required",
        v =>
          v.length >= this.field.minValue ||
          "Min " + this.field.minValue + " characters",
        v =>
          v.length <= this.field.maxValue ||
          "Max " + this.field.maxValue + " characters"
      ]
    };
  }
};
</script>

<style scoped>
</style>

