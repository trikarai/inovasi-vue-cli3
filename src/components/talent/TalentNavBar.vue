<template>
  <nav>
    <v-toolbar flat app color="primary">
      <v-toolbar-side-icon class="white--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <!-- <v-toolbar fixed app :clipped-left="clipped" dark color="primary">
        <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>
      </v-toolbar>-->
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>-->
      <v-toolbar-title class="text-uppercase white--text">
        <span class="font-weight-light">START</span>
        <span class>Mikti</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn flat @click="logout" v-if="checkLogin">
        <span>{{ $vuetify.t('$vuetify.action.signout') }}</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>-->
      <v-btn flat @click="rightDrawer =! rightDrawer">
        <v-icon>settings</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- <div>
      <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
    </div>-->

    <v-navigation-drawer app v-model="drawer" :mini-variant.sync="miniVariant">
      <!-- list head-->
      <v-list class="pa-1">
        <v-list-tile v-if="miniVariant" @click.stop="miniVariant = !miniVariant">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{user.data.name}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.stop="miniVariant = !miniVariant">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <!-- link router -->
      <v-list>
        <!--dashboar-->
        <v-list-tile router to="/talent/dashboard">
          <v-list-tile-action>
            <v-icon color="#676767">dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="grey--text">Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- profile-->
        <v-list-group prepend-icon="account_circle" value="true" no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Profile</v-list-tile-title>
            </v-list-tile>
          </template>
          <template v-if="!miniVariant">
            <v-list-tile v-for="link in linkProfile" :key="link.text" router :to="link.route">
              <v-list-tile-title>{{link.text}}</v-list-tile-title>
              <v-list-tile-action>
                <v-icon>{{link.icon}}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list-group>
        <!--sub list other-->
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

    <v-navigation-drawer temporary right v-model="rightDrawer" fixed>
      <v-list>
        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content></v-list-tile-content>
          <v-list-tile-action>
            <v-btn color="red" @click="logout" v-if="checkLogin">
              <span>{{ $vuetify.t('$vuetify.action.signout') }}</span>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon>language</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content></v-list-tile-content>
          <v-list-tile-action>
            <LocaleSwitcher />
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon>brightness_4</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>Dark Theme</v-list-tile-content>
          <v-list-tile-action>
            <v-switch color="black" @change="switchTheme"></v-switch>
          </v-list-tile-action>
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
      rightDrawer: false,
      miniVariant: true,
      clipped: true,
      fixed: false,
      user: "",
      linkProfile: [
        {
          icon: "perm_identity",
          text: "My Profile",
          route: "/talent/profile"
        },
        {
          icon: "school",
          text: "Educational",
          route: "/talent/education"
        },
        {
          icon: "work",
          text: "Working",
          route: "/talent/work"
        },
        {
          icon: "group_work",
          text: "Organization",
          route: "/talent/organization"
        },
        {
          icon: "business",
          text: "Entrepreneurship",
          route: "/talent/entrepreneurship"
        },
        {
          icon: "score",
          text: "Training",
          route: "/talent/training"
        },
        {
          icon: "build",
          text: "Skill",
          route: "/talent/skill"
        }
      ],
      links: [
        {
          icon: "group",
          text: "Team",
          route: "/talent/team"
        },
        {
          icon: "local_library",
          text: "Program",
          route: "/talent/program"
        },
        {
          icon: "chat",
          text: "Feedback",
          route: "/talent/feedback"
        }
      ],
      items: [
        {
          text: "Dashboard",
          disabled: false,
          to: "breadcrumbs_dashboard"
        },
        {
          text: "Link 1",
          disabled: false,
          to: "breadcrumbs_link_1"
        },
        {
          text: "Link 2",
          disabled: true,
          to: "breadcrumbs_link_2"
        }
      ]
    };
  },
  components: {
    LocaleSwitcher
  },
  created: function() {
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
      app.$router.replace({ path: "/login" });
      app.$store.state.isLoggedIn = false;
    },
    switchTheme: function(){
      this.$store.commit("switchTheme");
    }
  }
};
</script>
<style scoped>
</style>

