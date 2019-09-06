<template>
<div>
  <v-container>
    <v-divider></v-divider>
    <v-card-title class="subtitle-1">{{ $vuetify.lang.t('$vuetify.feedback.feedback') }}</v-card-title>
    <v-timeline class="pr-5" style="height:450px;overflow:auto;" dense clipped>
      <v-timeline-item fill-dot color="omikti" large>
        <template v-slot:icon>
          <v-icon class="mt-1" style="color:#fff;">add_comment</v-icon>
        </template>
        <v-textarea class="mr-0" rows="2" hide-details flat label="Leave a comment..." solo>
          <template v-slot:append>
            <v-btn class="mx-0" depressed>{{ $vuetify.lang.t('$vuetify.feedback.post') }}</v-btn>
          </template>
        </v-textarea>
      </v-timeline-item>
      <v-timeline-item v-for="n in 4" :key="n" color="primary" small>
        <!-- <template v-slot:icon>
          <v-avatar>
            <img src="http://i.pravatar.cc/64" />
          </v-avatar>
        </template> -->
        <v-card class="elevation-3 pa-3">
          <v-card-title class="title">Mentor</v-card-title>
          <v-card-text class="caption"><v-icon class="mb-1 mr-1" color="primary" small>calendar_today</v-icon> 12 Agustus 2019</v-card-text>
          <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>
          <v-card-actions><v-spacer/> 
            <v-btn depressed small><v-icon small>reply</v-icon></v-btn>
            <v-btn color="warning" depressed small><v-icon small>delete</v-icon></v-btn> 
          </v-card-actions>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</div>
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