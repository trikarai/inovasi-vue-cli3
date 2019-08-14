<template>
  <transition name="slide" mode="out-in">
    <div>
      <v-container>
        <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />

        <v-dialog v-model="loader" hide-overlay persistent width="300">
          <v-card color="primary">
            <v-card-text>
              {{ $vuetify.lang.t('$vuetify.info.standby') }}
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-layout align-start justify-start fill-height>
          <v-flex md6>
            <v-card>
              <v-card-title>
                {{params.team.name}}
              </v-card-title>
              <v-card-text>
                {{params.position}}
                <v-divider/>
                {{params.status.displayName}}
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout align-start justify-start fill-height>
          <v-flex md6>
            <v-btn @click="openSearch()">
              <v-icon>add</v-icon>Add Members
            </v-btn>
          <v-divider></v-divider>
            <!-- {{memberlist.list}} -->
            <v-data-table
              :loading="loader"
              :headers="headers"
              :items="memberlist.list"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td>{{ props.item.talent.name }}</td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </transition>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";

export default {
  data() {
    return {
      valid: false,
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: { details: [""] },
      params: {
        id: "",
        team: { id: "", name: "" },
        position: "sasa",
        status: { value: "", displayName: "" },
        joinTime: ""
      },
      memberlist: { total: 0, list: [] },
      loader: false,
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      selectedIndex: null,
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name"
        }
      ]
    };
  },
  components: {
    "notification-alert": Notification
  },
  created: function() {},
  mounted: function() {
    this.getSingleData();
    setTimeout(() => {
      this.getMemberList();
    }, 1000);
  },
  methods: {
    getSingleData: function() {
      this.loader = !this.loader;
      notif.reset(this);
      net
        .getData(
          this,
          "/talent/team-memberships/" + this.$route.params.membershipId
        )
        .then(res => {
          this.params = res.data.data;
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    getMemberList: function() {
      this.loader = true;
      notif.reset(this);
      net
        .getData(
          this,
          "/talent/as-team-member/" + this.params.team.id + "/members/"
        )
        .then(res => {
          console.log(res);
          if (res.data) {
            this.memberlist = res.data.data;
          } else {
            this.memberlist = { total: 0, list: [] };
          }
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    openSearch: function() {
      this.$router.push({
        path: "/talent/team/" + this.params.team.id + "/search"
      });
    }
  }
};
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>