<template>
  <div>
    <string-field  v-bind:field="fields" v-if="fields.type.value === 'str'"></string-field>
    <text-field  v-bind:field="fields" v-if="fields.type.value === 'txt'"></text-field>
    <integer-field  v-bind:field="fields" v-if="fields.type.value === 'int'"></integer-field>
    <select-field  v-bind:field="fields" v-if="fields.type.value === 'sel'"></select-field>
    <attachment-field  v-bind:field="fields" v-if="fields.type.value === 'att'"></attachment-field>
  </div>
</template>

<script>
  import integer from './type/integer'
  import string from './type/string'
  import text from './type/text'
  import select from './type/select'
  import attachment from './type/attachment'

  export default {
    components: {
      'integer-field': integer,
      'string-field': string,
      'text-field': text,
      'select-field': select,
      'attachment-field': attachment
    },
    props: ['fields'],
    data: function () {
      return {
        show: false,
        value: '',
        form: {
          value: ''
        }
      }
    },
    created: function() {
    },
    methods: {
    }
  }
</script>

