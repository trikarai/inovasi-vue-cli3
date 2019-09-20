<template>
  <v-layout>
    <!-- {{fields}} -->
    <string-field v-bind:index="index" v-bind:field="fields" v-if="fields.field.type.value === 'str'"></string-field>
    <text-field v-bind:index="index" v-bind:field="fields" v-if="fields.field.type.value === 'txt'"></text-field>
    <integer-field v-bind:index="index" v-bind:field="fields" v-if="fields.field.type.value === 'int'"></integer-field>
    <select-field v-bind:index="index" v-bind:field="fields" v-if="fields.field.type.value === 'sel'"></select-field>
    <attachment-field v-bind:index="index" v-bind:field="fields" v-if="fields.field.type.value === 'att'"></attachment-field>
  </v-layout>
</template>

<script>
import integer from './type/integerEdit'
import string from './type/stringEdit'
import text from "./type/textEdit";
import select from './type/selectEdit'
import attachment from './type/attachmentEdit'

export default {
  components: {
    "integer-field": integer,
    "string-field": string,
    "text-field": text,
    'select-field': select,
    'attachment-field': attachment
  },
  props: ["fields", "index"],
  data: function() {
    return {
      show: false,
      value: "",
      form: {
        value: ""
      }
    };
  },
  created: function() {},
  methods: {}
};
</script>

