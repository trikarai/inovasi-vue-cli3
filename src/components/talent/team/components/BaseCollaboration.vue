<template>
  <v-container>
    <v-divider></v-divider>
    <v-card-title class="subtitle-1">{{ $vuetify.lang.t('$vuetify.collaboration.collaboration') }}</v-card-title>
    <v-data-table
      v-show="collaborators.list"
      :headers="collaboratorHeaders"
      :items="collaborators.list"
    >
      <template v-slot:item.action="{item}">
        <v-btn
          @click="removeCollaborator(item.mentor.id)"
          small
          color="warning"
        >{{ $vuetify.lang.t('$vuetify.action.cancel') }}</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
export default {
  props: ["collaborators"],
  data() {
    return {
      collaboratorHeaders: [
        {
          text: "Mentor Name",
          value: "mentor.talent.name",
          sortable: false,
          align: "left"
        },
        { text: "", value: "action", sortable: false, align: "right" }
      ]
    };
  },
  methods: {
      removeCollaborator: function(mentorId){
          this.$emit("removeCollaborator", mentorId);
      }
  }
};
</script>
<style scoped>
</style>