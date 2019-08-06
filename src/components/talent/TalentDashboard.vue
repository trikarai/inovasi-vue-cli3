<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :editable="true" :complete="e1 > 1" step="1">Buat Fondasi Startup Anda</v-stepper-step>

        <v-stepper-step :editable="true" :complete="e1 > 2" step="2">Buat Ide dan Kenali Pelanggan Anda</v-stepper-step>

        <v-stepper-step :editable="true" :complete="e1 > 3" step="3">Analisa Bisnis Anda</v-stepper-step>

        <v-stepper-step :editable="true" step="4">Validasi Ide Anda</v-stepper-step>
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
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 2" step="2">
                Buatlah Tim yang Solid
                <small><b>Tim yang solid sangatlah penting bagi keberhasilan sebuah startup. Oleh
                karena itu lengkapi tim anda dan bentuk "Dream Team" anda.</b>
                </small>
              </v-stepper-step>

              <v-stepper-content step="2">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
                <v-btn color="primary" @click="e6 = 1">Back</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 3" step="3">
                Bergabung pada Program Inkubasi
                <small><b>Program Inkubasi akan sangat bermanfaat untuk membantu startup
                terutama pada tahap awal. Maka bergabunglah pada program yang tersedia dan sesuai dengan startup anda untuk mempercepat pertumbuhan startup anda.
                </b></small>
              </v-stepper-step>

              <v-stepper-content step="3">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
                <v-btn color="primary" @click="e6 = 2">Back</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-card>

          <v-btn
            color="primary"
            @click="e1 = 2"
          >
            Continue
          </v-btn>

          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
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
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 2" step="2">
                Buatlah Tim yang Solid
                <small><b>Tim yang solid sangatlah penting bagi keberhasilan sebuah startup. Oleh
                karena itu lengkapi tim anda dan bentuk "Dream Team" anda.</b>
                </small>
              </v-stepper-step>

              <v-stepper-content step="2">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
                <v-btn color="primary" @click="e6 = 1">Back</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 3" step="3">
                Bergabung pada Program Inkubasi
                <small><b>Program Inkubasi akan sangat bermanfaat untuk membantu startup
                terutama pada tahap awal. Maka bergabunglah pada program yang tersedia dan sesuai dengan startup anda untuk mempercepat pertumbuhan startup anda.
                </b></small>
              </v-stepper-step>

              <v-stepper-content step="3">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
                <v-btn color="primary" @click="e6 = 2">Back</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-card>

          <v-btn
            color="primary"
            @click="e1 = 3"
          >
            Continue
          </v-btn>

          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
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
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 2" step="2">
                Buatlah Tim yang Solid
                <small><b>Tim yang solid sangatlah penting bagi keberhasilan sebuah startup. Oleh
                karena itu lengkapi tim anda dan bentuk "Dream Team" anda.</b>
                </small>
              </v-stepper-step>

              <v-stepper-content step="2">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
                <v-btn color="primary" @click="e6 = 1">Back</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 3" step="3">
                Bergabung pada Program Inkubasi
                <small><b>Program Inkubasi akan sangat bermanfaat untuk membantu startup
                terutama pada tahap awal. Maka bergabunglah pada program yang tersedia dan sesuai dengan startup anda untuk mempercepat pertumbuhan startup anda.
                </b></small>
              </v-stepper-step>

              <v-stepper-content step="3">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
                <v-btn color="primary" @click="e6 = 2">Back</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-card>

          <v-btn
            color="primary"
            @click="e1 = 4"
          >
            Continue
          </v-btn>

          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
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
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 2" step="2">
                Buatlah Tim yang Solid
                <small><b>Tim yang solid sangatlah penting bagi keberhasilan sebuah startup. Oleh
                karena itu lengkapi tim anda dan bentuk "Dream Team" anda.</b>
                </small>
              </v-stepper-step>

              <v-stepper-content step="2">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
                <v-btn color="primary" @click="e6 = 1">Back</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 3" step="3">
                Bergabung pada Program Inkubasi
                <small><b>Program Inkubasi akan sangat bermanfaat untuk membantu startup
                terutama pada tahap awal. Maka bergabunglah pada program yang tersedia dan sesuai dengan startup anda untuk mempercepat pertumbuhan startup anda.
                </b></small>
              </v-stepper-step>

              <v-stepper-content step="3">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
                <v-btn color="primary" @click="e6 = 2">Back</v-btn>
                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-card>

          <v-btn
            color="primary"
            @click="e1 = 1"
          >
            Continue
          </v-btn>

          <v-btn flat>Cancel</v-btn>
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
    e1: 0,
    data: "",
    canvas: "Business Model Canvas",
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
    items: [
      {
        color: "red lighten-2",
        icon: "perm_identity",
        title: "Profile"
      },
      {
        color: "purple darken-1",
        icon: "group",
        title: "Team"
      },
      {
        color: "green lighten-1",
        icon: "local_library",
        title: "Program"
      },
      {
        color: "indigo",
        icon: "star",
        title: "Idea"
      }
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
