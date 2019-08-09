<template>
    <v-card>
            <v-stepper v-model="a6" vertical>
              <v-stepper-step :complete="a6 > 1" step="1">
                Tuliskan ide terbaik anda
                <small>
                  <b>
                    Sebelum membuat suatu produk/jasa semua diawali oleh ide. Tuliskan
                    ide terbaik kalian dan jadilah "The Next Unicorn"!
                  </b>
                </small>
              </v-stepper-step>

              <v-stepper-content step="1">
                <v-card class="mb-5 elevation-0">
                  <v-flex xs12 md6>
                    <v-list>
                      <v-list-tile >
                        <v-list-tile-action class="mr-3">
                          <v-btn style="min-width: 36px !important">
                            <v-icon>wb_incandescent</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>Tambah Ide Baru</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-icon>check</v-icon>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                </v-card>
                <v-btn color="primary" @click="a6 = 2">Continue</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="a6 > 2" step="2">
                Tuliskan siapa pengguna produk/jasa anda
                <small>
                  <b>
                    Ide tanpa adanya pengguna tidak memiliki nilai. Maka anda perlu
                    mendeskripsikan siapa saja yang nantinya akan menggunakan ide anda.
                  </b>
                </small>
              </v-stepper-step>

              <v-stepper-content step="2">
                <v-card class="mb-5 elevation-0">
                  <v-flex xs12 md6>
                    <v-list>
                      <v-list-tile>
                        <v-list-tile-action class="mr-3">
                          <v-btn style="min-width: 36px !important">
                            <v-icon>ballot</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>Buat Tipe Pengguna Baru</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-icon>check</v-icon>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                </v-card>
                <v-btn color="primary" @click="a6 = 3">Continue</v-btn>
                <v-btn color="primary" @click="a6 = 1">Back</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="a6 > 3" step="3">
                Kenali lebih dalam siapa pelanggan anda
                <small>
                  <b>
                    Tak kenal maka tak sayang. Kenali terlebih dahulu pelanggan anda dan pahami
                    Apa yang mereka rasakan, sehingga solusi yang nantinya anda tawarkan
                    Akan memberikan impact yang jauh lebih besar.
                  </b>
                </small>
              </v-stepper-step>

              <v-stepper-content step="3">
                <v-card class="mb-5 elevation-0">
                  <v-flex xs12 md6>
                    <v-list>
                      <v-list-tile>
                        <v-list-tile-action class="mr-3">
                          <v-btn style="min-width: 36px !important">
                            <v-icon>category</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>Buat Segmen Pelanggan Baru</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-icon>check</v-icon>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                </v-card>
                <v-btn color="primary" @click="a6 = 4">Continue</v-btn>
                <v-btn color="primary" @click="a6 = 2">Back</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="a6 > 4" step="4">
                Rayu pelanggan anda dengan value proposition
                <small>
                  <b>
                    Rayu pelanggan anda dengan sesuatu yang tidak bisa mereka tolak. Beritahu
                    Pelanggan anda mengapa produk/jasa yang anda buat merupakan
                    Solusi terbaik bagi masalah yang mereka hadapi.
                  </b>
                </small>
              </v-stepper-step>

              <v-stepper-content step="4">
                <v-card class="mb-5 elevation-0">
                  <v-flex xs12 md6>
                    <v-list>
                      <v-list-tile>
                        <v-list-tile-action class="mr-3">
                          <v-btn style="min-width: 36px !important">
                            <v-icon>table_chart</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>Buat Value Proposition Baru</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                          <v-icon>check</v-icon>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </v-flex>
                </v-card>
                <v-btn color="primary" @click="a6 = 5">Finish</v-btn>
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
