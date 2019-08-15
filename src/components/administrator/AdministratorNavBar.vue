<template>
  <nav>
    <v-toolbar text color="primary">
      <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <v-toolbar fixed app :clipped-left="clipped" dark color="primary">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>
      </v-toolbar> -->
      <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>
      <v-toolbar-title class="text-uppercase white--text">
        <span class="font-weight-light">START</span>
        <span class>Mikti</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn text @click="logout">
        <span>{{ $vuetify.lang.t('$vuetify.action.signout') }}</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn> -->
      <v-btn text @click="rightDrawer =! rightDrawer">
        <v-icon>settings</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant.sync="miniVariant"
    >
      <v-list class="pa-0" style="height: 49px;!important">
        <v-list-item>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{user.data.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <hr>
      <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon color="#676767">{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer temporary right v-model="rightDrawer" fixed>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-avatar>
          <v-list-item-content></v-list-item-content>
          <v-list-item-action>
            <v-btn color="red" @click="logout" v-if="checkLogin">
              <span>{{ $vuetify.lang.t('$vuetify.action.signout') }}</span>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>language</v-icon>
          </v-list-item-avatar>
          <v-list-item-content></v-list-item-content>
          <v-list-item-action>
            <LocaleSwitcher />
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>brightness_4</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>Dark Theme</v-list-item-content>
          <v-list-item-action>
            <v-switch color="black" @change="switchTheme"></v-switch>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import auth from "@/config/auth";
import LocaleSwitcher from "../LocaleSwitcher";
export default {
  data: function() {
    return {
      drawer: true,
      rightDrawer: false,
      miniVariant: true,
      clipped: true,
      fixed: false,
      user: "",
      links: [
        {
          icon: "dashboard",
          text: "Dashboard",
          route: "/administrator/dashboard"
        },
        {
          icon: "verified_user",
          text: "Admin",
          route: "/administrator/admin"
        },
        {
          icon: "local_library",
          text: "Curriculum",
          route: "/administrator/curriculum"
        },
        {
          icon: "school",
          text: "Program",
          route: "/administrator/program",
        },
        
        { icon: "map", text: "Region", route: "/administrator/region" },
        { icon: "layers", text: "Track", route: "/administrator/track" },
        { icon: "note_add", text: "Form", route: "/administrator/form" }
      ]
    };
  },
  components: {
    LocaleSwitcher
  },
  created: function(){
    this.user = JSON.parse(auth.getAuthData());
  },
  computed: {
    checkLogin() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      var app = this;
      localStorage.removeItem("lbUser");
      app.$router.replace({ path: "/administrator/login" });
      app.$store.state.isLoggedIn = false;
    },
    switchTheme: function(){
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
};
</script>
