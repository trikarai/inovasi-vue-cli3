<template>
  <nav>
    <v-toolbar height="50" flat app color="primary">
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
      <!-- <v-toolbar-title class="text-uppercase white--text">
        <span class="font-weight-light">START</span>
        <span class>Mikti</span>
      </v-toolbar-title> -->
      <v-spacer></v-spacer>
      <!-- <v-btn flat @click="logout" v-if="checkLogin">
        <span>{{ $vuetify.t('$vuetify.action.signout') }}</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>-->

        <v-icon @click="rightDrawer =! rightDrawer" color="white">settings</v-icon>

    </v-toolbar>

    <div>
      <v-breadcrumbs :items="$store.state.breads.item" divider=" > ">
        <template v-slot:item="props">
          <router-link :to="props.item.path" :class="{disabled : props.item.disabled}">{{props.item.text}}</router-link>
        </template>
      </v-breadcrumbs>
    </div>
    <!-- Vuex pos : {{$store.state.breads.pos}} | path level : {{$route.meta.level}} -->
    <v-navigation-drawer width="270" id="navdrawtalent" app v-model="drawer" :mini-variant.sync="miniVariant">
      <!-- list head-->
      <v-list class="pa-1">
        <v-list-tile v-if="miniVariant" @click.stop="miniVariant = !miniVariant">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="/img/avatar.png" />
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
        <v-list-tile ripple router to="/talent/dashboard">
          <v-list-tile-action>
            <v-icon color="#676767">dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="grey--text">Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- profile-->
        <v-list-group prepend-icon="account_circle" :value="group" no-action>
          <template v-slot:activator>
            <v-list-tile ripple>
              <v-list-tile-title>Profile</v-list-tile-title>
            </v-list-tile>
          </template>
          <template v-if="!miniVariant">
            <v-list-tile ripple v-for="link in linkProfile" :key="link.text" router :to="link.route">
              <v-list-tile-title>{{link.text}}</v-list-tile-title>
              <v-list-tile-action>
                <v-icon>{{link.icon}}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list-group>
        <!--sub list other-->
        <v-list-tile ripple v-for="link in links" :key="link.text" router :to="link.route">
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
            <!-- <v-icon>exit_to_app</v-icon> -->
          </v-list-tile-avatar>
          <v-list-tile-content></v-list-tile-content>
          <v-list-tile-action>
            <v-btn dark small color="red" @click="logout" v-if="checkLogin">
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
        <v-list-tile v-if="checkProgramCoordinatoship">
          <v-list-tile-avatar>
            <v-icon>pages</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>Coordinator Menu</v-list-tile-content>
          <v-list-tile-action>
            <v-btn router to="/coordinator/dashboard" small flat color="blue">
              <v-icon small>forward</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-if="checkProgramMentorship">
          <v-list-tile-avatar>
            <v-icon>pages</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>Mentor Menu</v-list-tile-content>
          <v-list-tile-action>
            <v-btn router to="/mentor/dashboard" small flat color="blue">
              <v-icon small>forward</v-icon>
            </v-btn>
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
      group: false,
      drawer: true,
      rightDrawer: false,
      miniVariant: false,
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
          text: "Work",
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
      items: []
    };
  },
  components: {
    LocaleSwitcher
  },
  watch: {
    $route: function() {
      this.buildBreadcrumbs();
    }
  },
  created: function() {
    this.user = JSON.parse(auth.getAuthData());
  },
  mounted: function() {
    this.buildBreadcrumbs();
  },
  computed: {
    checkLogin() {
      return this.$store.state.isLoggedIn;
    },
    checkProgramCoordinatoship() {
      var check;
      if (this.user.data.programmeCoordinatorships.length !== 0) {
        check = true;
      } else {
        check = false;
      }
      return check;
    },
    checkProgramMentorship() {
      var check;
      if (this.user.data.programmeMentorships.length !== 0) {
        check = true;
      } else {
        check = false;
      }
      return check;
    }
  },
  methods: {
    logout: function() {
      var app = this;
      localStorage.removeItem("lbUser");
      app.$router.replace({ path: "/login" });
      app.$store.state.isLoggedIn = false;
    },
    switchTheme: function() {
      this.$store.commit("switchTheme");
    },
    buildBreadcrumbs: function() {
      var payload = {
        level: this.$route.meta.level,
        to: {
          text: this.$route.meta.text,
          path: this.$route.path,
          disabled: false
        }
      };
      this.$store.commit("breadcrumb", payload);
    }
  }
};
</script>
<style scoped>
.disabled {
  color: grey;
  pointer-events: none;
}
#navdrawtalent::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

#navdrawtalent::-webkit-scrollbar
{
	width: 5px;
	background-color: #F5F5F5;
}

#navdrawtalent::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #a5a5a5;
}

</style>

