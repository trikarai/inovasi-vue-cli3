<template>
  <v-card>
    <v-stepper v-model="e6" vertical non-linear>
      <v-stepper-step :complete="e6 > 1" step="1" editable>
        Rayu Investor dengan Profil Anda
        <small>
          <b>
            Mengapa langkah ini penting? Karena investor, mentor, dan inkubator
            sangat menganggap penting profil dari pendiri Startup. Oleh karena itu
            tahap ini merupakan fondasi awal keberhasilan startup kalian.
          </b>
        </small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card class="mb-5 elevation-0">
          <v-layout wrap>
            <v-flex xs12 md6>
              <v-list>
                <v-list-item v-for="(item, index) in items.slice(0,3)" :key="index" avatar>
                  <v-list-item-action class="mr-3">
                    <v-btn style="min-width: 36px !important" router :to="item.to">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-icon :color="$store.state.profile[index].total > 0 ? 'teal' : 'grey'">check</v-icon>
                    <!-- {{$store.state.profile[index].total}} -->
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-flex>

            <v-flex xs12 md6>
              <v-list>
                <v-list-item v-for="(item, index) in items.slice(3,6)" :key="index" avatar>
                  <v-list-item-action class="mr-3">
                    <v-btn style="min-width: 36px !important" :to="item.to">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-icon
                      :color="$store.state.profile[index + 3].total > 0 ? 'teal' : 'grey'"
                    >check</v-icon>
                  </v-list-item-action>
                  <!-- {{$store.state.profile[index + 3].title}} -->
                </v-list-item>
              </v-list>
            </v-flex>
          </v-layout>
        </v-card>
        <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2" editable>
        Buatlah Tim yang Solid
        <small>
          <b>
            Tim yang solid sangatlah penting bagi keberhasilan sebuah startup. Oleh
            karena itu lengkapi tim anda dan bentuk "Dream Team" anda.
          </b>
        </small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card class="mb-5 elevation-0">
          <v-flex xs12 md6>
            <v-list>
              <v-list-item>
                <v-list-item-action class="mr-3">
                  <v-btn style="min-width: 36px !important" router to="/talent/create/team">
                    <v-icon>loupe</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Buat Tim</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon :color="$store.state.teamMemberships.length > 0 ? 'teal' : 'grey'">check</v-icon>
                </v-list-item-action>
              </v-list-item>

              <!-- <v-list-item>
                <v-list-item-action class="mr-3">
                  <v-btn style="min-width: 36px !important">
                    <v-icon>person_add</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Tambah Anggota Tim</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                              <v-icon>check</v-icon>
                </v-list-item-action>
              </v-list-item>-->

              <v-list-item>
                <v-list-item-action class="mr-3">
                  <v-btn style="min-width: 36px !important" router to="/talent/team">
                    <v-icon>search</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-content>
                  <v-badge color="red">
                    <template v-slot:badge>
                      <span>{{$store.state.teamMemberships.length}}</span>
                    </template>
                    <v-list-item-title>Lihat Tim</v-list-item-title>
                  </v-badge>
                </v-list-item-content>
                <!-- <v-list-item-action>
                              <v-icon>check</v-icon>
                </v-list-item-action>-->
              </v-list-item>
            </v-list>
          </v-flex>
        </v-card>
        <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
        <v-btn color="primary" @click="e6 = 1">Back</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3" editable>
        Bergabung pada Program Inkubasi
        <small>
          <b>
            Program Inkubasi akan sangat bermanfaat untuk membantu startup
            terutama pada tahap awal. Maka bergabunglah pada program yang tersedia dan sesuai dengan startup anda untuk mempercepat pertumbuhan startup anda.
          </b>
        </small>
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-card class="mb-5 elevation-0">
          <v-flex xs12 md6>
            <v-list>
              <!-- <v-list-item>
                <v-list-item-action class="mr-3">
                  <v-btn style="min-width: 36px !important">
                    <v-icon>how_to_reg</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Daftar ke Program</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon>check</v-icon>
                </v-list-item-action>
              </v-list-item> -->

              <v-list-item>
                <v-list-item-action class="mr-3" >
                  <v-btn style="min-width: 36px !important" router to="/talent/program">
                    <v-icon>search</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Lihat Partisipasi Program</v-list-item-title>
                </v-list-item-content>
                <!-- <v-list-item-action>
                              <v-icon>check</v-icon>
                </v-list-item-action>-->
              </v-list-item>
            </v-list>
          </v-flex>
        </v-card>
        <v-btn color="primary" @click="e6 = 4">Finish</v-btn>
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
