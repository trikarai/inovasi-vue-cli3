<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :editable="true" :complete="e1 > 1" step="1">Buat Fondasi Startup Anda</v-stepper-step>

        <v-stepper-step :editable="true" :complete="e1 > 2" step="2">Buat Ide dan Kenali Pelanggan Anda</v-stepper-step>

        <v-stepper-step :editable="true" :complete="e1 > 3" step="3">Hipotesa Bisnis</v-stepper-step>

        <v-stepper-step :editable="true" step="4">Validasi</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card>
            <v-stepper v-model="e6" vertical>
              <v-stepper-step :complete="e6 > 1" step="1">
                Rayu Investor dengan Profil Anda
                <small><b>
                Mengapa langkah ini penting? Karena investor, mentor, dan inkubator 
                sangat menganggap penting profil dari pendiri Startup. Oleh karena itu 
                tahap ini merupakan fondasi awal keberhasilan startup kalian.</b>
                </small>
              </v-stepper-step>

              <v-stepper-content step="1">
                <v-card class="mb-5 elevation-0">
                    <v-layout wrap>
                      <v-flex xs12 md6>
                        <v-list>
                          <v-list-tile
                            v-for="item in items.slice(0,3)"
                            :key="item.title"
                            avatar
                            @click=""
                          >
                          </v-list-tile-action class="mr-3">
                              <v-btn style="min-width:0px !important"><v-icon>edit</v-icon></v-btn>
                          </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title v-html="item.title"></v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                              <v-icon :color="item.active ? 'teal' : 'grey'">check</v-icon>
                            </v-list-tile-action>
                          </v-list-tile>
                        </v-list>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-list>
                          <v-list-tile
                            v-for="item in items.slice(3,6)"
                            :key="item.title"
                            avatar
                            @click=""
                          >
                          </v-list-tile-action class="mr-3">
                              <v-btn style="min-width:0px !important"><v-icon>edit</v-icon></v-btn>
                          </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title v-html="item.title"></v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                              <v-icon :color="item.active ? 'teal' : 'grey'">check</v-icon>
                            </v-list-tile-action>
                          </v-list-tile>
                        </v-list>
                      </v-flex>
                    </v-layout>
                </v-card>
                <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 2" step="2">
                Buatlah Tim yang Solid
                <small><b>Tim yang solid sangatlah penting bagi keberhasilan sebuah startup. Oleh
                karena itu lengkapi tim anda dan bentuk "Dream Team" anda.</b>
                </small>
              </v-stepper-step>

              <v-stepper-content step="2">
                <v-card class="mb-5 elevation-0">
                  <v-flex xs12 md6>
                        <v-list>
                          <v-list-tile @click="">
                          </v-list-tile-action class="mr-3">
                              <v-btn style="min-width:0px !important"><v-icon>loupe</v-icon></v-btn>
                          </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>Buat Tim</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              <v-icon>check</v-icon>
                            </v-list-tile-action>
                          </v-list-tile>

                          <v-list-tile @click="">
                          </v-list-tile-action class="mr-3">
                              <v-btn style="min-width:0px !important"><v-icon>person_add</v-icon></v-btn>
                          </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>Tambah Anggota Tim</v-list-tile-title>
                            </v-list-tile-content>
                            <!-- <v-list-tile-action>
                              <v-icon>check</v-icon>
                            </v-list-tile-action> -->
                          </v-list-tile>

                          <v-list-tile @click="">
                          </v-list-tile-action class="mr-3">
                              <v-btn style="min-width:0px !important"><v-icon>search</v-icon></v-btn>
                          </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>Lihat Undangan Tim</v-list-tile-title>
                            </v-list-tile-content>
                            <!-- <v-list-tile-action>
                              <v-icon>check</v-icon>
                            </v-list-tile-action> -->
                          </v-list-tile>       
                        </v-list>
                      </v-flex>
                </v-card>
                <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
                <v-btn color="primary" @click="e6 = 1">Back</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 3" step="3">
                Bergabung pada Program Inkubasi
                <small><b>Program Inkubasi akan sangat bermanfaat untuk membantu startup
                terutama pada tahap awal. Maka bergabunglah pada program yang tersedia dan sesuai dengan startup anda untuk mempercepat pertumbuhan startup anda.
                </b></small>
              </v-stepper-step>

              <v-stepper-content step="3">
                <v-card class="mb-5 elevation-0">
                  <v-flex xs12 md6>
                     <v-list>
                          <v-list-tile @click="">
                          </v-list-tile-action class="mr-3">
                              <v-btn style="min-width:0px !important"><v-icon>how_to_reg</v-icon></v-btn>
                          </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>Daftar ke Program</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              <v-icon>check</v-icon>
                            </v-list-tile-action>
                          </v-list-tile>

                          <v-list-tile @click="">
                          </v-list-tile-action class="mr-3">
                              <v-btn style="min-width:0px !important"><v-icon>search</v-icon></v-btn>
                          </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title>Lihat Partisipasi Program</v-list-tile-title>
                            </v-list-tile-content>
                            <!-- <v-list-tile-action>
                              <v-icon>check</v-icon>
                            </v-list-tile-action> -->
                          </v-list-tile>      
                      </v-list>
                  </v-flex>
                </v-card>
                <v-btn color="primary" @click="e6 = 4">Finish</v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-card>

          <v-btn
            style="float:right"
            class="mt-4"
            color="primary"
            @click="e1 = 2"
          >
            Next
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card>
            <v-stepper v-model="a6" vertical>
              <v-stepper-step :complete="a6 > 1" step="1">
                Tuliskan ide terbaik anda
                <small><b>
                Sebelum membuat suatu produk/jasa semua diawali oleh ide. Tuliskan 
                ide terbaik kalian dan jadilah "The Next Unicorn"!</b>
                </small>
              </v-stepper-step>

              <v-stepper-content step="1">
                <v-card class="mb-5 elevation-0">
                  <v-flex xs12 md6>
                     <v-list>
                          <v-list-tile @click="">
                          </v-list-tile-action class="mr-3">
                              <v-btn style="min-width:0px !important"><v-icon>wb_incandescent</v-icon></v-btn>
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
                <small><b>Ide tanpa adanya pengguna tidak memiliki nilai. Maka anda perlu
                mendeskripsikan siapa saja yang nantinya akan menggunakan ide anda.</b>
                </small>
              </v-stepper-step>

              <v-stepper-content step="2">
                <v-card class="mb-5 elevation-0">
                  <v-flex xs12 md6>
                     <v-list>
                          <v-list-tile @click="">
                          </v-list-tile-action class="mr-3">
                              <v-btn style="min-width:0px !important"><v-icon>supervised_user_circle</v-icon></v-btn>
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
                <small><b>Tak kenal maka tak sayang. Kenali terlebih dahulu pelanggan anda dan pahami
                Apa yang mereka rasakan, sehingga solusi yang nantinya anda tawarkan
                Akan memberikan impact yang jauh lebih besar.
                </b></small>
              </v-stepper-step>

              <v-stepper-content step="3">
                <v-card class="mb-5 elevation-0">
                  <v-flex xs12 md6>
                     <v-list>
                          <v-list-tile @click="">
                          </v-list-tile-action class="mr-3">
                              <v-btn style="min-width:0px !important"><v-icon>supervisor_account</v-icon></v-btn>
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
                <small><b>Rayu pelanggan anda dengan sesuatu yang tidak bisa mereka tolak. Beritahu
                Pelanggan anda mengapa produk/jasa yang anda buat merupakan
                Solusi terbaik bagi masalah yang mereka hadapi.
                </b></small>
              </v-stepper-step>

              <v-stepper-content step="4">
                <v-card class="mb-5 elevation-0">
                  <v-flex xs12 md6>
                     <v-list>
                          <v-list-tile @click="">
                          </v-list-tile-action class="mr-3">
                              <v-btn style="min-width:0px !important"><v-icon>supervisor_account</v-icon></v-btn>
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

          <v-btn
            style="float:right"
            class="mt-4"
            color="primary"
            @click="e1 = 3"
          >
            Next
          </v-btn>

        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card>
            <v-stepper v-model="b6" vertical>
              <v-stepper-step :complete="b6 > 1" step="1">
                Buatlah Hipotesa Untuk Bisnis Anda
                <small><b>
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
                      <v-flex xs12 md6>
                        <v-list>
                          <v-list-tile
                            v-for="item in items.slice(0,4)"
                            :key="item.title"
                            avatar
                            @click=""
                          >
                          </v-list-tile-action class="mr-3">
                              <v-btn style="min-width:0px !important"><v-icon>edit</v-icon></v-btn>
                          </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title v-html="item.title"></v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                              <v-icon :color="item.active ? 'teal' : 'grey'">check</v-icon>
                            </v-list-tile-action>
                          </v-list-tile>
                        </v-list>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-list>
                          <v-list-tile
                            v-for="item in items.slice(4,8)"
                            :key="item.title"
                            avatar
                            @click=""
                          >
                          </v-list-tile-action class="mr-3">
                              <v-btn style="min-width:0px !important"><v-icon>edit</v-icon></v-btn>
                          </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title v-html="item.title"></v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                              <v-icon :color="item.active ? 'teal' : 'grey'">check</v-icon>
                            </v-list-tile-action>
                          </v-list-tile>
                        </v-list>
                      </v-flex>
                    </v-layout>
                </v-card>
                <v-btn color="primary" @click="b6 = 2">Finish</v-btn>
              </v-stepper-content>

              
            </v-stepper>
          </v-card>

          <v-btn
            style="float:right"
            class="mt-4"
            color="primary"
            @click="e1 = 4"
          >
            Next
          </v-btn>

        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card>
            <v-stepper v-model="c6" vertical>
              <v-stepper-step :complete="c6 > 1" step="1">
                Validasi Ide Anda
                <small><b>
                Ide yang tidak tervalidasi memiliki banyak sekali celah untuk gagal.
Seperti ketidakcocokan antara solusi yang ditawarkan dengan kebutuhan yang dirasakan oleh pelanggan atau menawarkan solusi pada segmen pasar yang salah. Kedua hal tersebut sangat fatal dan akan mengakibatkan gagalnya startup anda. Oleh karena itu melakukan validasi sangatlah penting sebelum anda melangkah ke tahap selanjutnya. Ini adalah level yang paling sulit, karena mengakui bahwa idealisme anda salah dan perlu melakukan pivot merupakan hal yang sangat sulit. Namun, kami yakin startup anda dapat melewati tahap ini untuk berkembang menjadi “The Next Unicorn”.
</b>
                </small>
              </v-stepper-step>

              <v-stepper-content step="1">
                <v-card class="mb-5 elevation-0">
                    <v-layout wrap>
                      <v-flex xs12 md6>
                        <v-list>
                          <v-list-tile
                            v-for="item in items.slice(0,4)"
                            :key="item.title"
                            avatar
                            @click=""
                          >
                          </v-list-tile-action class="mr-3">
                              <v-btn style="min-width:0px !important"><v-icon>edit</v-icon></v-btn>
                          </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title v-html="item.title"></v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                              <v-icon :color="item.active ? 'teal' : 'grey'">check</v-icon>
                            </v-list-tile-action>
                          </v-list-tile>
                        </v-list>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-list>
                          <v-list-tile
                            v-for="item in items.slice(4,8)"
                            :key="item.title"
                            avatar
                            @click=""
                          >
                          </v-list-tile-action class="mr-3">
                              <v-btn style="min-width:0px !important"><v-icon>edit</v-icon></v-btn>
                          </v-list-tile-action>
                            <v-list-tile-content>
                              <v-list-tile-title v-html="item.title"></v-list-tile-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                              <v-icon :color="item.active ? 'teal' : 'grey'">check</v-icon>
                            </v-list-tile-action>
                          </v-list-tile>
                        </v-list>
                      </v-flex>
                    </v-layout>
                </v-card>
                <v-btn color="primary" @click="c6 = 2">Finish</v-btn>
              </v-stepper-content>

            </v-stepper>
          </v-card>

          <v-btn
            style="float:right"
            class="mt-4"
            color="primary"
            @click="e1 = 4"
          >
            Done
          </v-btn>

        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    
    <!-- bcm -->

    <!-- <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md4>
          <v-card color="purple" dark>
            <v-card-title primary class="title">Lorem</v-card-title>
            <v-card-text>{{ lorem }}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card color="indigo" dark>
                <v-card-text>{{ lorem.slice(0, 70) }}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex>
              <v-layout row wrap>
                <v-flex v-for="n in 2" :key="n" d-flex xs12>
                  <v-card color="red lighten-2" dark>
                    <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2 child-flex>
          <v-card color="green lighten-2" dark>
            <v-card-text>{{ lorem.slice(0, 90) }}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="blue lighten-2" dark>
            <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>-->
    <!-- <v-container :style="'display: grid; border: 1px solid blue;'">
      <template v-for="field in data.fields">
        <div :key="field.id" :style="'border: 1px solid red; grid-area:' + field.position">
          <v-textarea
            :label="field.name"
            auto-grow
            :value="lorem"
          ></v-textarea>
        </div>
      </template>
    </v-container> -->

    <!-- <v-container>
      <v-timeline align-top>
        <v-timeline-item
          v-for="(item, i) in items"
          :key="i"
          :color="item.color"
          :icon="item.icon"
          fill-dot
        >
          <v-card :color="item.color" dark>
            <v-card-title class="title">{{item.title}}</v-card-title>
            <v-card-text class="white text--primary">
              <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</p>
              <v-btn :color="item.color" class="mx-0" outline>Button</v-btn>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-container>-->
  </div>
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
        active: "true"
      },
      {
        color: "purple darken-1",
        icon: "group",
        title: "Work Experience"
      },
      {
        color: "green lighten-1",
        icon: "local_library",
        title: "Organization",
        active: "true"
      },
      {
        color: "indigo",
        icon: "star",
        title: "Entrpreneurship"
      },
      {
        color: "indigo",
        icon: "star",
        title: "Training"
      },
      {
        color: "indigo",
        icon: "star",
        title: "Skill",
        active: "true"
      },
      {
        color: "indigo",
        icon: "star",
        title: "Value Proposition Canvas"
      },
      {
        color: "indigo",
        icon: "star",
        title: "Lean Canvas"
      },
    ]
  }),
  mounted: function() {
    // this.getCanvas();
  },
  methods: {
    getCanvas: function() {
      net
        .getData(this, "/talent/forms/name?name=" + this.canvas)
        .then(res => {
          this.data = res.data.data;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {});
    }
  }
};
</script>
<style scoped>
.grid-container * {
  border: 1px solid red;
  position: relative;
}

.grid-container *:after {
  content: attr(class);
  position: absolute;
  top: 0;
  left: 0;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}
</style>
