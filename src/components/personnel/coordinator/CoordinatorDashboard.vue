<template>
  <v-container>
    <v-layout>
      <v-flex xs12 md5>
        <v-select
          :items="user.data.programmeCoordinatorship"
          item-text="programme.name"
          item-value="id"
          :no-data-text="$vuetify.lang.t('$vuetify.noDataText')"
          v-model="programId"
          :label="$vuetify.lang.t('$vuetify.program.program')"
          outlined
          class="pr-3"
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import auth from "@/config/auth";
export default {
  data: function() {
    return {
      user: "",
      programId: ""
    };
  },
  created: function() {
    this.user = JSON.parse(auth.getAuthData());
  }
};
</script>