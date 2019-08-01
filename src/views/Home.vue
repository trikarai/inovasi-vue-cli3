<template>
  <div>
    <v-app light>
      <v-toolbar color="white" fixed="true" height="64px">
        <v-img
          class="ml-2"
          src="/img/logostartmikti.png"
          aspect-ratio="1"
          max-width="120px"
          contain="false"
        ></v-img>
        <!-- <v-toolbar-title color="red">MIKTI - Start</v-toolbar-title> -->
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn class="font-weight-light" flat disabled>Beranda</v-btn>
          <v-btn class="font-weight-light" flat router to="/signup">Daftar</v-btn>
          <v-btn class="font-weight-light" flat router to="/login">Login</v-btn>
        </v-toolbar-items>
        <v-toolbar-side-icon
          class="hidden-sm-and-up"
          light
          v-on="on"
          @click.stop="drawer = !drawer"
        ></v-toolbar-side-icon>
      </v-toolbar>
      <v-navigation-drawer style="text-decoration:none;" v-model="drawer" absolute temporary right>
        <v-list class="pa-1">
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title class="title">Menu</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list class="pt-0" dense>
          <v-divider class="mt-0"></v-divider>

          <v-list-tile
            v-for="item in items"
            :key="item.title"
            route
            :to="item.to"
            :disabled="item.disabled"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-content>
        <section>
          <v-parallax src="/img/ino-landingpage2.jpg" height="650">
            <v-container grid-list-xl style="margin-top:170px">
              <v-layout row wrap>
                <v-flex xs12 sm12 md7></v-flex>
                <v-flex xs12 sm12 md5>
                  <h1 class="bmikti--text display-1 text-right">
                    Tentang
                    <b>MIKTI Start</b>
                  </h1>
                  <div class="garislp"></div>
                  <v-card color="white" class="mb-3">
                    <v-card-text>
                      <div
                        class="bmikti--text text--lighten-1 subheading text-justify"
                      >MIKTI Start merupakan sebuah platform yang diinisiasi oleh Indonesia Digital Creative Industry Community (MIKTI) sebagai wadah bagi para Startup Founders Untuk dapat mengembangkan ide-ide inovasi mereka menjadi sebuah produk/servis yang siap untuk melanjutkan ke tahap berikut-nya yaitu pendanaan dan kemudian berkembang menjadi sebuah Startup yang solid</div>
                    </v-card-text>
                  </v-card>
                  <v-btn
                    style="float:right;"
                    class="mt-12"
                    color="blue lighten-2"
                    dark
                    router
                    to="/signup"
                  >
                    <v-icon left>person_add</v-icon>Daftar
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-parallax>
        </section>

        <section>
          <v-layout column wrap class="my-12" align-center>
            <v-flex xs12>
              <v-container grid-list-xl>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    <v-card flat class="transparent">
                      <v-card-text>
                        <v-img
                          style="margin:0 auto !important"
                          src="/img/selflearn.png"
                          max-width="150px"
                        ></v-img>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline text-center">Pembelajaran Mandiri</div>
                      </v-card-title>
                      <div class="garistiga"></div>
                      <v-card-text
                        class="text-center"
                      >Kami menyediakan fitur PEMBELAJARAN MANDIRI dengan bantuan materi pembelajaran yang mudah untuk dimengerti dan dapat diakses langsung dari platform ini</v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-card flat class="transparent">
                      <v-card-text class="text-center">
                        <v-img
                          style="margin:0 auto !important"
                          src="/img/idea-a.png"
                          max-width="150px"
                        ></v-img>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline">Validasi Ide</div>
                      </v-card-title>
                      <div class="garistiga"></div>
                      <v-card-text
                        class="text-center;"
                      >Untuk memastikan ide yang dimiliki oleh Startup VALID, kami membantu para founders dengan tools eksperimen bisnis untuk memudahkan validasi ide yang telah di buat</v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-card flat class="transparent">
                      <v-card-text class="text-center">
                        <v-img
                          style="margin:0 auto !important"
                          src="/img/onlinelearning.png"
                          max-width="150px"
                        ></v-img>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline text-center">Mentoring</div>
                      </v-card-title>
                      <div class="garistiga"></div>
                      <v-card-text
                        class="text-center"
                      >Kami juga memfasilitasi para founders untuk dapat melakukan mentoring dengan mentor terbaik kami secara online maupun offline. Kini jarak bukan halangan</v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </section>

        <section class="bannerlp">
          <v-container>
            <v-layout row wrap align-center>
              <v-flex xs12 md8>
                <v-card flat class="transparent">
                  <v-card-text class="title text-center">
                    <h2
                      class="font-weight-light"
                    >AYO, Segera Daftarkan STARTUP-mu Sekarang, GRATIS !</h2>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md2>
                <v-card-text class="text-center">
                  <v-img style="margin:0 auto !important" src="/img/daftar.png" max-width="150px"></v-img>
                </v-card-text>
              </v-flex>
              <v-flex xs12 md2>
                <v-card flat class="transparent text-center">
                  <v-btn color="blue lighten-2" dark router to="/signup">Daftar disini !</v-btn>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </section>

        <section>
          <v-container>
            <v-layout class="text-center" justify-center>
              <h1 class="font-weight-light">Para Mentor</h1>
            </v-layout>
            <div class="garistiga mb-3 mt-3"></div>
            <v-carousel class="elevation-0 mb-3" height="auto" :cycle="false" hide-delimiters show-arrows-on-hover light>
              <v-carousel-item v-for="(data, i) in mentor" :key="i">
                <v-layout align-center justify-center wrap fill-height>
                      <v-flex xs12 md3 v-for="data in data.groups" :key="data">
                        <v-card flat class="transparent">
                          <v-card-text>
                            <v-img
                              style="margin:0 auto !important"
                              :src="data.photo"
                              max-width="150px"
                            ></v-img>
                          </v-card-text>
                          <v-card-text class="text-center">
                            <h5>{{data.nama}}</h5>
                            <p>{{data.jabatan}}</p>
                          </v-card-text>
                        </v-card>
                      </v-flex>  
                </v-layout>
              </v-carousel-item>
            </v-carousel>
            <v-img style="margin:0 auto !important" src="/img/bawah.png" aspect-ratio="10" max-width="900"></v-img>
          </v-container>
        </section>

        <section>
          <div class="copyright-text text-center" style="color: black;">
            <div class="kontakas">Hubungi Kami : <b>start@mikti.org</b></div> 
            <div data-v-cc192626="" class="grsbwh"></div> 
            <p>© MIKTI - Innovation 2019</p>
          </div>
        </section>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: "Beranda", icon: "dashboard", to: "/", disabled: true },
        { title: "Daftar", icon: "person_add", to: "/signup", disabled: false },
        { title: "Login", icon: "exit_to_app", to: "/login", disabled: false }
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
      mentor: [
        {
          groups: [
            { nama: "Dina Dellyana", photo: "/img/mentor/dina.png", jabatan: "Director Greater Hub SBM ITB" },
            { nama: "St. Andika Sutedja", photo: "/img/mentor/andika.png", jabatan: "CEO Smartmeter ID" },
            { nama: "Arief Widhiyasa", photo: "/img/mentor/arief.png", jabatan: "CEO Agate" },
            { nama: "Seterhen Akbar", photo: "/img/mentor/aska.png", jabatan: "CEO Labtek Indie" }
          ]
        },
        {
          groups: [
            { nama: "Alvan Zaputra", photo: "/img/mentor/alvan-a.png", jabatan: "UX Profesional tabook.id" },
            { nama: "M. Andy Zaky", photo: "/img/mentor/zaky-round.png", jabatan: "BOC Agate & GNFI" },
            { nama: "Zaenal Arifin", photo: "/img/mentor/zaenal.png", jabatan: "CEO Gerdhu Inc" },
            { nama: "Jeffrey Samosir", photo: "/img/mentor/jefrey-round.png", jabatan: "CEO Tritonik" }
          ]
        },
        {
          groups: [
            { nama: "Panji Prabowo", photo: "/img/mentor/panji.png", jabatan: "CMO Nuesta & Ruang Reka" },
            { nama: "Dibya Pradana", photo: "/img/mentor/dibya.png", jabatan: "CEO Ayofoto & Ayomobile" },
            { nama: "Vita Subiyakti", photo: "/img/mentor/vita.png", jabatan: "CO-Founder Botika & Ruangkerja" },
            { nama: "Chrisna Aditya", photo: "/img/mentor/chrisna.png", jabatan: "CPO E-Fishery" }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.garislp {
  background: #fb7407;
  height: 5px;
  width: 74px;
  margin-left: auto;
  margin-bottom: 9px;
}
.garistiga {
  background: #fb7407;
  height: 5px;
  width: 74px;
  margin: 0 auto;
}
a:hover {
  text-decoration: none;
}
.bannerlp {
  background-image: url(/img/tour-bg.png);
  background-color: #fbfafa;
  background-repeat: repeat-x;
  height: 157px;
  background-position: center;
  display: table;
  position: static;
  width: 100%;
}
.kontakas {
    background: #383838;
    display: inline-block;
    padding: 3px 6px;
    border-radius: 3px;
    color: #fff;
}
.grsbwh {
    background: #fb7407;
    height: 5px;
    width: 57px;
    margin: 0 auto;
    margin-top: 14px;
    margin-bottom: 10px;
}
</style>
