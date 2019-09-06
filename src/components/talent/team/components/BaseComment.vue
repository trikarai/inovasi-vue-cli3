<template>
  <v-container>
    <v-divider></v-divider>
    <v-card-title class="subtitle-1">{{ $vuetify.lang.t('$vuetify.feedback.feedback') }}</v-card-title>
    <v-timeline dense clipped>
      <v-timeline-item fill-dot color="omikti" large>
        <template v-slot:icon>
          <v-icon>add_comment</v-icon>
        </template>
        <v-textarea hide-details flat label="Leave a comment..." solo>
          <template v-slot:append>
            <v-btn class="mx-0" depressed>{{ $vuetify.lang.t('$vuetify.feedback.post') }}</v-btn>
          </template>
        </v-textarea>
      </v-timeline-item>
      <v-timeline-item v-for="n in 4" :key="n" small>
        <template v-slot:icon>
          <v-avatar>
            <img src="http://i.pravatar.cc/64" />
          </v-avatar>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">Mentor</v-card-title>
          <v-card-text>12 Agustus 2019</v-card-text>
          <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>
          <v-card-actions><v-spacer/> <v-btn fab small><v-icon>reply</v-icon></v-btn> </v-card-actions>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
</style>