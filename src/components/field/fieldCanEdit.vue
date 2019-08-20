<template>
  <div>
    <text-field  v-bind:index="index" v-bind:field="fields" v-bind:values="fields.value"></text-field>
  </div>
</template>

<script>
  // import integer from './type/integer'
  // import string from './type/string'
  import text from './type/textEdit'
  // import select from './type/select'
  // import attachment from './type/attachment'

  export default {
    components: {
      // 'integer-field': integer,
      // 'string-field': string,
      'text-field': text,
      // 'select-field': select,
      // 'attachment-field': attachment
    },
    props: ["fields", "index"],
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

