<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th style="width: 50%;">Strength</th>
          <th>Weakness</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span v-html="text"></span>
          </td>
          <td>
            <span v-html="text"></span>
          </td>
        </tr>
      </tbody>
    </table>

    <table class="table">
      <thead>
        <tr>
          <th style="width: 50%;">Opportunity</th>
          <th>Threat</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span v-html="text"></span>
          </td>
          <td>
            <span v-html="text"></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      text: "<i> lopem ipsum is fucking text </i>"
    };
  }
};
</script>
