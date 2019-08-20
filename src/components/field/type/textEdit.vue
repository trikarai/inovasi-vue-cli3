<template>
  <div>
    <!-- {{field}} -->
    <v-flex xs12 sm12>
      <v-textarea
        v-model="value"
        :id="field.id"
        :name="field.id"
        :label="field.name"
        counter
        :clearable="clearable"
      ></v-textarea>
    </v-flex>
  </div>
</template>
<script>
import bus from "@/bus";

export default {
  props: ["field", "index", "values"],
  components: {},
  data: function() {
    return {
      clearable: true,
      value: "",
      rules: [
        v => !!v || "This field is required"
      ]
    };
  },
  mounted: function(){
    this.value = this.values;
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

