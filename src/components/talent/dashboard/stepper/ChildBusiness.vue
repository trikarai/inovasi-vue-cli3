<template>
  <v-card>
    <v-stepper v-model="b6" vertical>
      <v-stepper-step :complete="b6 > 1" step="1">
        Buatlah Hipotesa Untuk Bisnis Anda
        <small>
          <b>
            Melakukan bisnis tanpa menganalisa keadaan yang mungkin terjadi seperti layaknya
            Anda berlari ke area ranjau darat, anda bisa kapan saja terkena ranjau dan meledak
            Seketika. Persiapkan sebaik mungkin bisnis anda untuk meningkatkan tingkat
            Keberhasilan anda. Ini adalah level yang sulit, tapi akan sangat bermanfaat
            Untuk perkembangan startup anda.
          </b>
        </small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card class="mb-5 elevation-0">
          <v-layout wrap>
            <v-flex xs12 md6></v-flex>
          </v-layout>
        </v-card>
        <!-- <v-btn color="primary" @click="b6 = 2">Finish</v-btn> -->
      </v-stepper-content>
    </v-stepper>
  </v-card>
</template>
<script>
import net from "@/config/httpclient";
import Notification from "@/components/Notification";

export default {
  data: () => ({
    e6: 1,
    a6: 1,
    b6: 1,
    c6: 1,
    e1: 0,
    data: "",
    canvas: "Business Model Canvas",
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
    items: [
      {
        color: "red lighten-2",
        icon: "perm_identity",
        title: "Educational",
        active: "true",
        to: "/talent/education"
      },
      {
        color: "purple darken-1",
        icon: "group",
        title: "Work Experience",
        to: "/talent/work"
      },
      {
        color: "green lighten-1",
        icon: "local_library",
        title: "Organization",
        active: "true",
        to: "/talent/organization"
      },
      {
        color: "indigo",
        icon: "star",
        title: "Entrpreneurship",
        active: "true",
        to: "/talent/entrepreneurship"
      },
      {
        color: "indigo",
        icon: "star",
        title: "Training",
        active: "true",
        to: "/talent/training"
      },
      {
        color: "indigo",
        icon: "star",
        title: "Skill",
        active: "true",
        to: "/talent/skill"
      }
    ]
  }),
  mounted: function() {},
  methods: {}
};
</script>
