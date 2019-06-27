<template>
  <nav>
    <v-toolbar flat app color="primary">
      <v-toolbar-side-icon class="white--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <!-- <v-toolbar fixed app :clipped-left="clipped" dark color="primary">
        <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
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
      <LocaleSwitcher/>
      <v-btn flat @click="logout">
        <span>{{ $vuetify.t('$vuetify.action.signout') }}</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant.sync="miniVariant"
      class="accent"
    >
      <v-list class="pa-0" style="height: 49px;!important">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{user.data.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <hr>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon color="#676767">{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="grey--text">{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
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
          icon: "school",
          text: "Program",
          route: "/administrator/program",
          item: [
            {
              icon: "",
              text: "Registration",
              route: "/administrator/program/:programId/registration"
            },
            {
              icon: "",
              text: "Phase",
              route: "/administrator/program/:programId/phase"
            }
          ]
        },
        {
          icon: "local_library",
          text: "Curriculum",
          route: "/administrator/curriculum"
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
    }
  }
};
</script>
