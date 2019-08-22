<template>
  <v-container>
    <v-layout>
      <!-- {{teamId}} -->
      <v-flex md6>
        <v-switch v-model="reverse" label="Toggle reverse"></v-switch>
      </v-flex>
      <v-flex md6>
        <v-switch v-model="dense" label="Toggle dense"></v-switch>
      </v-flex>
    </v-layout>

    <v-timeline :reverse="reverse" :dense="dense">
      <v-timeline-item color="primary">
        <v-card>
          <v-card-title class="title">{{ $vuetify.lang.t('$vuetify.profile.profile')}}</v-card-title>
          <v-card-text>
            <p>Rayu Investor dengan Profil Anda</p>
            <p>
              Mengapa langkah ini penting? Karena investor, mentor, dan inkubator
              sangat menganggap penting profil dari pendiri Startup. Oleh karena itu
              tahap ini merupakan fondasi awal keberhasilan startup kalian.
            </p>
            <v-btn class="mx-0" outlined router to="/talent/profile">
              <v-icon left small>edit</v-icon>
              {{ $vuetify.lang.t('$vuetify.profile.profile')}}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="primary">
        <v-card>
          <v-card-title class="title">{{ $vuetify.lang.t('$vuetify.team.team')}}</v-card-title>
          <v-card-text>
            <p>Buatlah Tim yang Solid</p>
            <p>Tim yang solid sangatlah penting bagi keberhasilan sebuah startup. Oleh karena itu lengkapi tim anda dan bentuk "Dream Team" anda.</p>
            <v-btn class="mx-0" outlined router to="/talent/team">
              <v-icon left small>edit</v-icon>
              {{ $vuetify.lang.t('$vuetify.team.team')}}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="primary">
        <v-card>
          <v-card-title class="title">{{ $vuetify.lang.t('$vuetify.program.programParticipation')}}</v-card-title>
          <v-card-text>
            <p>Bergabung pada Program Inkubasi</p>
            <p>Program Inkubasi akan sangat bermanfaat untuk membantu startup terutama pada tahap awal. Maka bergabunglah pada program yang tersedia dan sesuai dengan startup anda untuk mempercepat pertumbuhan startup anda.</p>
            <v-alert
              dense
              border="left"
              type="warning"
              v-if="teamId == ''"
            >Create or Join Team First</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-btn class="mx-0" outlined @click="openParticipation" :disabled="teamId == ''">
              <v-icon left small>edit</v-icon>
              {{ $vuetify.lang.t('$vuetify.program.program')}}
            </v-btn>
            <!-- <v-btn class="mr-3" outlined @click="openParticipation" :disabled="teamId == ''">
              <v-icon left small>edit</v-icon>
              {{ $vuetify.lang.t('$vuetify.mentoring.mentoringsession')}}
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-timeline-item>
      <v-timeline-item color="primary">
        <v-card>
          <v-card-title class="title">{{ $vuetify.lang.t('$vuetify.idea.idea')}}</v-card-title>
          <v-card-text>
            <p>Tuliskan ide terbaik anda</p>
            <p>Sebelum membuat suatu produk/jasa semua diawali oleh ide. Tuliskan ide terbaik kalian dan jadilah "The Next Unicorn"!</p>
            <v-alert
              dense
              border="left"
              type="warning"
              v-if="teamId == ''"
            >Create or Join Team First</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="mx-0"
              outlined
              @click="openIdea"
              :disabled="teamId == ''"
            >{{ $vuetify.lang.t('$vuetify.idea.idea')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>
<script>
export default {
  props: ["teamId"],
  data: () => ({
    reverse: false,
    dense: true
  }),
  methods: {
    openParticipation: function() {
      var id = localStorage.teamId;
      this.$store.commit("setTeamId", id);
      this.$router.push({ path: "/talent/team/" + id + "/participation" });
    },
    openIdea: function() {
      var id = localStorage.teamId;
      this.$store.commit("setTeamId", id);
      this.$router.push({ path: "/talent/team/" + id + "/idea" });
    }
  }
};
</script>
<style scoped>
</style>