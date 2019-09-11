<template>
  <v-container>
    <v-layout>
      <v-flex xs12 md5>
        <v-select
          :items="user.data.programmeCoordinatorships"
          item-text="programme.name"
          item-value="id"
          :no-data-text="$vuetify.lang.t('$vuetify.noDataText')"
          v-model="coordinatorship"
          :label="$vuetify.lang.t('$vuetify.program.program')"
          outlined
          return-object
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
      programId: "",
      coordinatorship: "",
      coordinatorshipId: ""
    };
  },
   watch: {
    coordinatorship: function() {
      this.coordinatorshipId = this.coordinatorship.id;
      this.programId = this.coordinatorship.programme.id;
    }
  },
  created: function() {
    this.user = JSON.parse(auth.getAuthData());
  }
};
</script>