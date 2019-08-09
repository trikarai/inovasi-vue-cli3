<template>
  <v-card>
    <v-stepper v-model="c6" vertical>
      <v-stepper-step :complete="c6 > 1" step="1">
        Validasi Ide Anda
        <small>
          <b>
            Ide yang tidak tervalidasi memiliki banyak sekali celah untuk gagal.
            Seperti ketidakcocokan antara solusi yang ditawarkan dengan kebutuhan yang dirasakan oleh pelanggan atau menawarkan solusi pada segmen pasar yang salah. Kedua hal tersebut sangat fatal dan akan mengakibatkan gagalnya startup anda. Oleh karena itu melakukan validasi sangatlah penting sebelum anda melangkah ke tahap selanjutnya. Ini adalah level yang paling sulit, karena mengakui bahwa idealisme anda salah dan perlu melakukan pivot merupakan hal yang sangat sulit. Namun, kami yakin startup anda dapat melewati tahap ini untuk berkembang menjadi “The Next Unicorn”.
          </b>
        </small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card class="mb-5 elevation-0">
          <v-layout wrap>
            <v-flex xs12 md6></v-flex>
          </v-layout>
        </v-card>
        <!-- <v-btn color="primary" @click="c6 = 2">Finish</v-btn> -->
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
