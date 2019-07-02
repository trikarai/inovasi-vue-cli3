<template>
  <div>
    <header id="header">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 overflow">
            <div class="social-icons pull-right">
              <ul class="nav nav-pills">
                <li>
                  <a href="https://www.facebook.com/mikti/">
                    <i class="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/Infomikti">
                    <i class="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fa fa-google-plus"></i>
                  </a>
                </li>
                <!-- <li><a href=""><i class="fa fa-dribbble"></i></a></li> -->
                <li>
                  <a href="#">
                    <i class="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-inverse" role="banner">
        <div class="container">
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle"
              data-toggle="collapse"
              data-target=".navbar-collapse"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>

            <a class="navbar-brand" href="index.html">
              <h1>
                <img src="https://start.mikti.id/img/logostartmikti.png" style="width: 150px" alt="logo">
              </h1>
            </a>
          </div>
          <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li class="active">
                <router-link to="/">Beranda</router-link>
              </li>
              <li>
                <router-link to="/signup">Daftar</router-link>
              </li>
              <li>
                <router-link to="/login">Login</router-link>
              </li>
            </ul>
          </div>
          <!-- <div class="search">
                    <form role="form">
                        <i class="fa fa-search"></i>
                        <div class="field-toggle">
                            <input type="text" class="search-form" autocomplete="off" placeholder="Search">
                        </div>
                    </form>
          </div>-->
        </div>
      </div>
    </header>
    <!--/#header-->

    <section id="hmslider">
      <div class="container">
        <div class="row">
          <div class="main-slider">
            <div class="slide-text">
              <h1 class="latofont">Tentang Mikti Start</h1>
              <p
                class="latofont"
              >MIKTI Start merupakan sebuah platform yang diinisiasi oleh Indonesia Digital Creative Industry Community (MIKTI) sebagai wadah bagi para Startup Founders Untuk dapat mengembangkan ide-ide inovasi mereka menjadi sebuah produk/servis yang siap untuk melanjutkan ke tahap berikut-nya yaitu pendanaan dan kemudian berkembang menjadi sebuah Startup yang solid</p>
              <router-link to="/signup" class="btn btn-common">Daftar</router-link>
            </div>
            <img
              src="https://start.mikti.id/img/app2-a.png"
              style="width: 500px"
              class="slider-hill visible-lg"
              alt="slider image"
            >
            <img
              src="https://start.mikti.id/img/app1-a.png"
              style="width: 500px"
              class="slider-house visible-lg"
              alt="slider image"
            >
            <img
              src="https://start.mikti.id/img/app3-a.png"
              style="width: 500px"
              class="slider-sun visible-lg"
              alt="slider image"
            >
            <img
              src="https://start.mikti.id/img/app4-a.png"
              style="width: 500px"
              class="slider-birds1 visible-lg"
              alt="slider image"
            >
            <img
              src="https://start.mikti.id/img/app2-a.png"
              style="width: 500px"
              class="slider-hill visible-md"
              alt="slider image"
            >
            <img
              src="https://start.mikti.id/img/app1-a.png"
              style="width: 308px;margin-left: auto;margin-right: auto;top: 314px;position: relative;"
              class="text-center visible-xs"
              alt="slider image"
            >
          </div>
        </div>
      </div>
      <!-- <div class="preloader"><i class="fa fa-sun-o fa-spin"></i></div> -->
    </section>
    <!--/#home-slider-->

    <section id="services">
      <div class="container">
        <div class="row">
          <div
            class="col-sm-4 text-center padding wow fadeIn"
            data-wow-duration="1000ms"
            data-wow-delay="300ms"
          >
            <div class="single-service">
              <div class="wow scaleIn" data-wow-duration="500ms" data-wow-delay="300ms">
                <img src="https://start.mikti.id/img/selflearn.png" alt>
              </div>
              <h2 class="latofont">PEMBELAJARAN MANDIRI</h2>
              <p>Kami menyediakan fitur PEMBELAJARAN MANDIRI dengan bantuan materi pembelajaran yang mudah untuk dimengerti dan dapat diakses langsung dari platform ini</p>
            </div>
          </div>
          <div
            class="col-sm-4 text-center padding wow fadeIn"
            data-wow-duration="1000ms"
            data-wow-delay="600ms"
          >
            <div class="single-service">
              <div class="wow scaleIn" data-wow-duration="500ms" data-wow-delay="600ms">
                <img src="https://start.mikti.id/img/idea-a.png" alt>
              </div>
              <h2 class="latofont">VALIDASI IDE</h2>
              <p>Untuk memastikan ide yang dimiliki oleh Startup VALID, kami membantu para founders dengan tools eksperimen bisnis untuk memudahkan valdiasi ide</p>
            </div>
          </div>
          <div
            class="col-sm-4 text-center padding wow fadeIn"
            data-wow-duration="1000ms"
            data-wow-delay="900ms"
          >
            <div class="single-service">
              <div class="wow scaleIn" data-wow-duration="500ms" data-wow-delay="900ms">
                <img src="https://start.mikti.id/img/onlinelearning.png" alt>
              </div>
              <h2 class="latofont">Offline/Online MENTORING</h2>
              <p>Kami juga memfasilitasi para founders untuk dapat melakukan mentoring dengan mentor terbaik kami secara online maupun offline. Kini jarak bukan halangan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--/#services-->

    <section id="action" class="responsive">
      <div class="vertical-center">
        <div class="container">
          <div class="row">
            <div class="action take-tour">
              <div class="col-sm-7 wow fadeInLeft" data-wow-duration="500ms" data-wow-delay="300ms">
                <h1 class="title">AYO, Segera Daftarkan STARTUP-mu Sekarang, GRATIS !</h1>
              </div>
              <div
                class="col-sm-5 text-center wow fadeInRight"
                data-wow-duration="500ms"
                data-wow-delay="300ms"
              >
                <div class="tour-button">
                  <router-link to="/signup" class="btn btn-common">Daftar Sekarang</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--/#action-->

    <section id="tutors">
      <h1 class="title text-center wow fadeInUp latofont" style="margin-top: 110px;">Para Mentor</h1>
      <div class="row" style="width: 100%">
        <div class="col-md-12">
          <div class="carousel slide media-carousel" id="media">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="row">
                  <div class="col-md-4 padtop30">
                    <center>
                      <div class="parent_circle">
                        <div class="parent_circle_contain">
                          <img
                            src="https://start.mikti.id/img/dina.png"
                            style="width: 150px !important;height: 150px !important;margin-bottom: 15px"
                            alt
                          >
                          <p>
                            <b>Dina Dellyana</b>
                          </p>
                          <p>Director Greater Hub SBM ITB</p>
                          <!-- <a href="#">Know More...</a> -->
                        </div>
                      </div>
                    </center>
                  </div>
                  <div class="col-md-4 padtop30">
                    <center>
                      <div class="parent_circle">
                        <div class="parent_circle_contain">
                          <img
                            src="https://start.mikti.id/img/andika.png"
                            style="width: 150px !important;height: 150px !important;margin-bottom: 15px"
                            alt
                          >
                          <p>
                            <b>St. Andika Sutedja</b>
                          </p>
                          <p>CEO Smartmeter ID</p>
                          <!-- <a href="#">Know More...</a> -->
                        </div>
                      </div>
                    </center>
                  </div>
                  <div class="col-md-4 padtop30">
                    <center>
                      <div class="parent_circle">
                        <div class="parent_circle_contain">
                          <img
                            src="https://start.mikti.id/img/arief.png"
                            style="width: 150px !important;height: 150px !important;margin-bottom: 15px"
                            alt
                          >
                          <p>
                            <b>Arief Widhiyasa</b>
                          </p>
                          <p>CEO Agate</p>
                          <!-- <a href="#">Know More...</a> -->
                        </div>
                      </div>
                    </center>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="row">
                  <div class="col-md-4 padtop30">
                    <center>
                      <div class="parent_circle">
                        <div class="parent_circle_contain">
                          <img
                            src="https://start.mikti.id/img/aska.png"
                            style="width: 150px !important;height: 150px !important;margin-bottom: 15px"
                            alt
                          >
                          <p>
                            <b>Seterhen Akbar</b>
                          </p>
                          <p>CEO Labtek Indie</p>
                          <!-- <a href="#">Know More...</a> -->
                        </div>
                      </div>
                    </center>
                  </div>
                  <div class="col-md-4 padtop30">
                    <center>
                      <div class="parent_circle">
                        <div class="parent_circle_contain">
                          <img
                            src="https://start.mikti.id/img/alvan-a.png"
                            style="width: 150px !important;height: 150px !important;margin-bottom: 15px"
                            alt
                          >
                          <p>
                            <b>Alvan Zaputra</b>
                          </p>
                          <p>UX Profesional tabook.id</p>
                          <!-- <a href="#">Know More...</a> -->
                        </div>
                      </div>
                    </center>
                  </div>
                  <div class="col-md-4 padtop30">
                    <center>
                      <div class="parent_circle">
                        <div class="parent_circle_contain">
                          <img
                            src="https://start.mikti.id/img/zaky-round.png"
                            style="width: 150px !important;height: 150px !important;margin-bottom: 15px"
                            alt
                          >
                          <p>
                            <b>M. Andy Zaky</b>
                          </p>
                          <p>BOC Agate & GNFI</p>
                          <!-- <a href="#">Know More...</a> -->
                        </div>
                      </div>
                    </center>
                  </div>
                </div>
              </div>

              <div class="carousel-item">
                <div class="row">
                  <div class="col-md-4 padtop30">
                    <center>
                      <div class="parent_circle">
                        <div class="parent_circle_contain">
                          <img
                            src="https://start.mikti.id/img/zaenal.png"
                            style="width: 150px !important;height: 150px !important;margin-bottom: 15px"
                            alt
                          >
                          <p>
                            <b>Zaenal Arifin</b>
                          </p>
                          <p>CEO Gerdhu Inc</p>
                          <!-- <a href="#">Know More...</a> -->
                        </div>
                      </div>
                    </center>
                  </div>
                  <div class="col-md-4 padtop30">
                    <center>
                      <div class="parent_circle">
                        <div class="parent_circle_contain">
                          <img
                            src="https://start.mikti.id/img/jefrey-round.png"
                            style="width: 150px !important;height: 150px !important;margin-bottom: 15px"
                            alt
                          >
                          <p>
                            <b>Jeffrey Samosir</b>
                          </p>
                          <p>CEO Tritonik</p>
                          <!-- <a href="#">Know More...</a> -->
                        </div>
                      </div>
                    </center>
                  </div>
                  <div class="col-md-4 padtop30">
                    <center>
                      <div class="parent_circle">
                        <div class="parent_circle_contain">
                          <img
                            src="https://start.mikti.id/img/panji.png"
                            style="width: 150px !important;height: 150px !important;margin-bottom: 15px"
                            alt
                          >
                          <p>
                            <b>Panji Prabowo</b>
                          </p>
                          <p>CMO Nuesta & Ruang Reka</p>
                          <!-- <a href="#">Know More...</a> -->
                        </div>
                      </div>
                    </center>
                  </div>
                </div>
              </div>

              <div class="carousel-item">
                <div class="row">
                  <div class="col-md-4 padtop30">
                    <center>
                      <div class="parent_circle">
                        <div class="parent_circle_contain">
                          <img
                            src="https://start.mikti.id/img/dibya.png"
                            style="width: 150px !important;height: 150px !important;margin-bottom: 15px"
                            alt
                          >
                          <p>
                            <b>Dibya Pradana</b>
                          </p>
                          <p>CEO Ayofoto & Ayomobile</p>
                          <!-- <a href="#">Know More...</a> -->
                        </div>
                      </div>
                    </center>
                  </div>
                  <div class="col-md-4 padtop30">
                    <center>
                      <div class="parent_circle">
                        <div class="parent_circle_contain">
                          <img
                            src="https://start.mikti.id/img/vita.png"
                            style="width: 150px !important;height: 150px !important;margin-bottom: 15px"
                            alt
                          >
                          <p>
                            <b>Vita Subiyakti</b>
                          </p>
                          <p>CO-Founder Botika & Ruangkerja</p>
                          <!-- <a href="#">Know More...</a> -->
                        </div>
                      </div>
                    </center>
                  </div>
                  <div class="col-md-4 padtop30">
                    <center>
                      <div class="parent_circle">
                        <div class="parent_circle_contain">
                          <img
                            src="https://start.mikti.id/img/chrisna.png"
                            style="width: 150px !important;height: 150px !important;margin-bottom: 15px"
                            alt
                          >
                          <p>
                            <b>Chrisna Aditya</b>
                          </p>
                          <p>CPO E-Fishery</p>
                          <!-- <a href="#">Know More...</a> -->
                        </div>
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </div>
            <a data-slide="prev" href="#media" class="left carousel-control">‹</a>
            <a data-slide="next" href="#media" class="right carousel-control">›</a>
          </div>
        </div>
      </div>
    </section>

    <!--/#clients-->

    <footer id>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center bottom-separator">
            <img src="https://start.mikti.id/img/bawah.png" class="img-responsive inline" alt>
          </div>

          <div class="col-sm-12">
            <div class="copyright-text text-center" style="color: black">
              <div class="kontakas">
                Hubungi Kami :
                <b>start@mikti.org</b>
              </div>
              <div class="grsbwh"></div>
              <p>&copy; MIKTI - Innovation</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!--/#footer-->
  </div>
</template>
<script>
export default { 
  mounted() {
    // let recaptchaScript = document.createElement('script')
    // recaptchaScript.setAttribute('src', '/js/landingpage.js')
    // document.head.appendChild(recaptchaScript)
    // let wow = document.createElement('script')
    // wow.setAttribute('src', '/js/wow.min.js')
    // document.head.appendChild(wow)
  },
}
</script>


<style scoped>
.kontakas {
  background: #383838;
  display: inline-block;
  padding: 3px 6px 3px 6px;
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
/* carousel */
.media-carousel {
  margin-bottom: 0;
  padding: 0 40px 30px 40px;
  margin-top: 30px;
}
/* Previous button  */
.media-carousel .carousel-control.left {
  left: 45px !important;
  background-image: none;
  background: none repeat scroll 0 0 #000000;
  border: 4px solid #fb7407;
  border-radius: 23px 23px 23px 23px;
  height: 40px;
  width: 40px;
  margin-top: 88px;
}
/* Next button  */
.media-carousel .carousel-control.right {
  right: 45px !important;
  background-image: none;
  background: none repeat scroll 0 0 #000000;
  border: 4px solid #fb7407;
  border-radius: 23px 23px 23px 23px;
  height: 40px;
  width: 40px;
  margin-top: 88px;
}
/* Changes the position of the indicators */
.media-carousel .carousel-indicators {
  right: 50%;
  top: auto;
  bottom: 0px;
  margin-right: -19px;
}
/* Changes the colour of the indicators */
.media-carousel .carousel-indicators li {
  background: #c0c0c0;
}
.media-carousel .carousel-indicators .active {
  background: #333333;
}
.media-carousel img {
  width: 250px;
  height: 100px;
}
/* here is custom styling */
.web_disigner {
  background: #43b8e3;
  min-height: 400px;
}
.web_disigner .web_disigner_contain {
  padding: 80px 0px;
}
.web_disigner .parent_circle {
  background: #63cdf4 none repeat scroll 0 0;
  border: 15px solid #30a9d4;
  border-radius: 50%;
  height: 170px;
  width: 170px;
  display: table;
  position: relative;
}
.web_disigner .parent_circle .parent_circle_contain {
  display: table-cell;
  vertical-align: middle;
  font-size: 13px;
  text-align: center;
  font-weight: 600;
}
.web_disigner .parent_circle .child_round_circle {
  border: 15px solid #63cdf4;
  border-radius: 50%;
  height: 120px;
  left: 125px;
  position: absolute;
  top: -25px;
  width: 120px;
}
.web_disigner .parent_circle .child_round_circle_img1 {
  background-size: 100%;
}
.web_disigner .parent_circle .child_round_circle_img2 {
  background-position: top;
}
.web_disigner .parent_circle .child_round_circle_img3 {
  background-size: 100%;
}
.web_disigner .parent_circle .child_round_circle_img4 {
  background-size: 100%;
}
.web_disigner .parent_circle .child_round_circle_img5 {
  background-size: 100%;
}
.web_disigner .parent_circle .child_round_circle_img6 {
  background-size: 100%;
}

.padtop30 {
  padding-top: 30px;
}

/* here is our responsive css */

@media only screen and (max-width: 360px) {
  .web_disigner .parent_circle .child_round_circle {
    border: 15px solid #63cdf4;
    border-radius: 50%;
    height: 100px;
    left: 100px;
    position: absolute;
    top: -38px;
    width: 100px;
  }
  .media-carousel .carousel-control.left {
    margin-top: 290px;
  }
  .media-carousel .carousel-control.right {
    margin-top: 290px;
  }
}

/* @import '../components/css/landingpage.css'; 
@import '../components/css/animate.min.css';
@import '../components/css/responsive.css'; */

/* End carousel */
</style>


