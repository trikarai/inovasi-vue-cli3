<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :editable="true" :complete="e1 > 1" step="1">Buat Fondasi Startup</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :editable="true" :complete="e1 > 2" step="2">Buat Ide dan Kenali Pelanggan</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :editable="true" :complete="e1 > 3" step="3">Hipotesa Bisnis</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :editable="true" step="4">Validasi</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <child-profile />

        <v-btn style="float:right" class="mt-4" color="primary" @click="e1 = 2">Next</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <child-idea />

        <v-btn style="float:right" class="mt-4" color="primary" @click="e1 = 3">Next</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <child-business />

        <v-btn style="float:right" class="mt-4" color="primary" @click="e1 = 4">Next</v-btn>
      </v-stepper-content>

      <v-stepper-content step="4">
        <child-experiment />

        <v-btn style="float:right" class="mt-4" color="primary" @click="e1 = 4">Done</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import net from "@/config/httpclient";
import Notification from "@/components/Notification";

import ChildProfile from "@/components/talent/dashboard/stepper/ChildProfile";
import ChildIdea from "@/components/talent/dashboard/stepper/ChildIdea";
import ChildBusiness from "@/components/talent/dashboard/stepper/ChildBusiness";
import ChildExperiment from "@/components/talent/dashboard/stepper/ChildExperiment";
export default {
  data: () => ({
    e6: 1,
    a6: 1,
    b6: 1,
    c6: 1,
    e1: 0
  }),
  components: {
    ChildProfile,
    ChildIdea,
    ChildBusiness,
    ChildExperiment
  }
};
</script>
