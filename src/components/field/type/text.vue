<template>
  <div>
    <v-flex xs12 sm12>
      <tiptap-vuetify v-model="value" :placeholder="field.name" :extensions="extensions" />
    </v-flex>
    <!-- <v-flex xs12 sm12>
      <v-textarea
        :label="field.name"
        :hint="field.description"
        :counter="field.maxValue"
        :maxlength="field.maxValue"
        :rules="rules"
        clearable="true"
        single-line
      ></v-textarea>
    </v-flex>-->
  </div>
</template>
<script>
import bus from "@/bus";
import { TiptapVuetify, OrderedList, ListItem, History } from "tiptap-vuetify";

export default {
  props: ["field"],
  components: {
    TiptapVuetify
  },
  data: function() {
    return {
      value: "",
      rules: [
        v => !!v || "This field is required",
        v =>
          v.length >= this.field.minValue ||
          "Min " + this.field.minValue + " characters",
        v =>
          v.length <= this.field.maxValue ||
          "Max " + this.field.maxValue + " characters"
      ],
      extensions: [
        // you can specify options for extension
        new OrderedList(),
        new ListItem(),
        new History()
      ]
    };
  },
  watch: {
    value: function(){
      var params = { id: this.field.id , value: this.value }
      bus.$emit("getValue", params, this.field.position - 1)
    }
  }
};
</script>

<style scoped>
</style>

