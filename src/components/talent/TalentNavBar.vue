<template>
  <nav>
    <v-app-bar height="50" text app color="primary">
      <!-- <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-icon @click="rightDrawer =! rightDrawer" color="white">settings</v-icon>
    </v-app-bar>
    <div>
      <v-breadcrumbs :items="$store.state.breads.item" divider=" > ">
        <template v-slot:item="props">
          <router-link
            :to="props.item.path"
            :class="{disabled : props.item.disabled}"
          >{{props.item.text}}</router-link>
        </template>
      </v-breadcrumbs>
    </div>
    <!-- Vuex pos : {{$store.state.breads.pos}} | path level : {{$route.meta.level}} -->
    <v-navigation-drawer
      width="270"
      id="navdrawtalents"
      style="max-height:100% !important;z-index:4 !important;"
      app
      v-model="drawer"
      :mini-variant.sync="miniVariant"
    >
      <!-- <v-layout column justify-space-between fill-height> -->
        <!-- list head-->
        <v-list class="pa-1">
          <v-list-item v-if="miniVariant" @click.stop="miniVariant = !miniVariant">
            <v-list-item-action>
              <v-icon>chevron_right</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item avatar>
            <v-list-item-avatar>
              <img src="/img/avatar.png" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{user.data.name}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <!-- link router -->
        <v-list>
          <!--dashboar-->
          <v-list-item ripple router to="/talent/dashboard">
            <v-list-item-action>
              <v-icon color="#676767">dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- profile-->
          <v-list-group prepend-icon="account_circle" :value="group" no-action>
            <template v-slot:activator>
              <v-list-item ripple>
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>
            </template>
            <template v-if="!miniVariant">
              <v-list-item
                ripple
                v-for="link in linkProfile"
                :key="link.text"
                router
                :to="link.route"
              >
                <v-list-item-title>{{link.text}}</v-list-item-title>
                <v-list-item-action>
                  <v-icon>{{link.icon}}</v-icon>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list-group>
          <!--sub list other-->
          <v-list-item ripple v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-action>
              <v-icon color="#676767">{{link.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">{{link.text}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <v-list dense class="py-0">
          <v-list-item v-if="checkProgramCoordinatoship" ripple router to="/coordinator/dashboard">
            <v-list-item-action>
              <v-icon color="#676767">pages</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">Coordinator Menu</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="checkProgramMentorship" ripple router to="/mentor/dashboard">
            <v-list-item-action>
              <v-icon color="#676767">pages</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">Mentor Menu</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      <!-- </v-layout> -->
    </v-navigation-drawer>

    <v-navigation-drawer temporary right v-model="rightDrawer" fixed>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <!-- <v-icon>exit_to_app</v-icon> -->
          </v-list-item-avatar>
          <v-list-item-content></v-list-item-content>
          <v-list-item-action>
            <v-btn dark small color="red" @click="logout" v-if="checkLogin">
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
        <v-list-item v-if="checkProgramCoordinatoship">
          <v-list-item-avatar>
            <v-icon>pages</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>Coordinator Menu</v-list-item-content>
          <v-list-item-action>
            <v-btn router to="/coordinator/dashboard" small text color="blue">
              <v-icon small>forward</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item v-if="checkProgramMentorship">
          <v-list-item-avatar>
            <v-icon>pages</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>Mentor Menu</v-list-item-content>
          <v-list-item-action>
            <v-btn router to="/mentor/dashboard" small text color="blue">
              <v-icon small>forward</v-icon>
            </v-btn>
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
         this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
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

.v-navigation-drawer__content::-webkit-scrollbar {
  width: 15px !important;
  background-color: #f5f5f5 !important;
}
#navdrawtalents::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
  border-radius: 10px !important;
  background-color: #f5f5f5 !important;
}

#navdrawtalents::-webkit-scrollbar {
  width: 5px !important;
  background-color: #f5f5f5 !important;
}

#navdrawtalents::-webkit-scrollbar-thumb {
  border-radius: 10px !important;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
  background-color: #a5a5a5 !important;
}
.v-toolbar {
  z-index:3 !important;
}
</style>

