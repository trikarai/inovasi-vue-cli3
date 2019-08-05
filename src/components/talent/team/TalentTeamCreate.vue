<template>
  <transition name="slide" mode="out-in">
    <div>
      <v-container>
        <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
        <v-dialog v-model="loader" hide-overlay persistent width="300">
          <v-card color="primary">
            <v-card-text>
              {{ $vuetify.t('$vuetify.info.standby') }}
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-form v-model="valid" ref="form">
          <v-container>
            <v-layout column fill-height>
              <v-flex xs12 md6>
                <v-text-field
                  position="absolute"
                  v-model="params.name"
                  :rules="nameRules"
                  :counter="25"
                  :label="$vuetify.t('$vuetify.team.teamName')"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex sm4>
                <v-text-field
                  position="absolute"
                  v-model="params.position"
                  :counter="25"
                  :label="$vuetify.t('$vuetify.team.position')"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex>
                <!-- {{ $vuetify.t('$vuetify.team.vision')}}
                <tiptap-vuetify
                  placeholder="Vision"
                  v-model="params.vision"
                  :extensions="extensions"
                />-->
                <v-textarea
                  v-model="params.vision"
                  :label="$vuetify.t('$vuetify.team.vision')"
                  :placeholder="$vuetify.t('$vuetify.team.vision')"
                  counter
                ></v-textarea>
              </v-flex>
              <v-flex>
                <v-textarea
                  v-model="params.mission"
                  :label="$vuetify.t('$vuetify.team.mission')"
                  :placeholder="$vuetify.t('$vuetify.team.mission')"
                  counter
                ></v-textarea>
              </v-flex>
              <v-flex>
                <v-textarea
                  v-model="params.culture"
                  :label="$vuetify.t('$vuetify.team.culture')"
                  :placeholder="$vuetify.t('$vuetify.team.culture')"
                  counter
                ></v-textarea>
              </v-flex>
              <v-flex sm4>
                <v-textarea
                  v-model="params.founderAgreement"
                  :label="$vuetify.t('$vuetify.team.founderAgreement')"
                  :placeholder="$vuetify.t('$vuetify.team.founderAgreement')"
                  counter
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
          <v-layout justify-space-between>
            <v-btn
              @click.prevent="validateTeam"
              :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
            >{{ $vuetify.t('$vuetify.action.create')}} {{ $vuetify.t('$vuetify.team.team')}}</v-btn>
            <v-dialog v-model="loader" hide-overlay persistent width="300">
              <v-card color="primary" dark>
                <v-card-text>
                  {{ $vuetify.t('$vuetify.info.standby')}}
                  <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-form>
      </v-container>
    </div>
  </transition>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";
import { TiptapVuetify, OrderedList, ListItem, History } from "tiptap-vuetify";

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
      singleData: { id: "", name: "" },
      err_msg: { details: [""] },
      params: {
        name: "",
        position: "",
        vision: "",
        mission: "",
        culture: "",
        founderAgreement: ""
      },
      loader: false,
      dialogDel: false,
      dialogForm: false,
      edit: false,
      view: false,
      expand: false,
      selectedIndex: null,
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 25 || "Name must be less than 10 characters"
      ],
      extensions: [
        // you can specify options for extension
        new OrderedList(),
        new ListItem(),
        new History()
      ]
    };
  },
  components: {
    TiptapVuetify,
    "notification-alert": Notification
  },
  created: function() {},
  mounted: function() {},
  methods: {
    validateTeam: function() {
      if (this.$refs.form.validate()) {
        this.createTeam();
      } else {
        this.$vuetify.goTo(this.$refs.form, {
          duration: 500,
          offset: 0,
          easing: "linear"
        });
      }
    },
    createTeam: function() {
      var app = this;
      this.status.error = false;
      this.loader = !this.loader;
      net
        .postData(this, "/talent/teams", this.params)
        .then(function(res) {
          console.log(res);
          app.$router.push({ path: "/talent/team" });
        })
        .catch(function(error) {
          console.log(error);
          app.err_msg = error.body.meta;
          app.status.error = true;
        })
        .finally(function() {
          app.loader = false;
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