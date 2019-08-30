<template>
  <v-dialog content-class="seraidea" width="400" v-model="show">
    <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
    <v-card style="padding:0px 30px 20px 30px" class="mt-7" elevation="0" width="400">
      <v-card class="taitel2 primary white--text elevation-5">
              <h3
                class="headline mb-0 font-weight-light"
              >{{ $vuetify.lang.t('$vuetify.collaboration.share') }} {{ $vuetify.lang.t('$vuetify.idea.idea') }}</h3>
            </v-card>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid">
            <v-flex>
              <v-select
                :loading="programLoader"
                :disabled="programDisable"
                v-model="collaboratorParams.programmeId"
                :items="program.list"
                item-text="programme.name"
                item-value="programme.id"
                :rules="rules"
                :label="$vuetify.lang.t('$vuetify.team.programParticipation')"
              ></v-select>
            </v-flex>
            <v-flex>
              <v-autocomplete
                :loading="mentorLoader"
                :disabled="mentorDisable"
                v-model="collaboratorParams.mentorId"
                :items="mentor.list"
                item-text="talent.name"
                item-value="id"
                :rules="rules"
                label="Mentor"
              ></v-autocomplete>
            </v-flex>
            <v-layout justify-space-between>
              <v-btn
                @click="setUp"
                block
                class="mt-5"
                :class=" { 'primary white--text' : valid}"
                :disabled="!valid"
                color="primary"
              >
                <v-icon left small>share</v-icon>Share
              </v-btn>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import Notification from "@/components/Notification";

export default {
  props: {
    value: Boolean
  },
  data() {
    return {
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: { details: [""] },
      valid: false,
      loadingBtn: false,
      collaboratorParams: {
        programmeId: "",
        mentorId: ""
      },
      rules: [v => !!v || "Field is required"],
      program: {
        total: 0,
        list: []
      },
      programLoader: false,
      programDisable: true,
      mentor: {
        total: 0,
        list: []
      },
      mentorLoader: false,
      mentorDisable: true
    };
  },
  components: { "notification-alert": Notification },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  watch: {
    "collaboratorParams.programmeId": function() {
      this.getMentorList();
    }
  },
  mounted: function() {
    this.getProgramList();
  },
  methods: {
    getProgramList: function() {
      this.programDisable = true;
      this.programLoader = true;
      net
        .getProgram(this, this.$route.params.teamId)
        .then(res => {
          if (res.data.data) {
            this.program = res.data.data;
          } else {
            this.program = { total: 0, list: [] };
          }
          this.programDisable = false;
          this.programLoader = false;
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.programLoader = false;
        });
    },
    getMentorList: function() {
      this.mentorLoader = true;
      this.mentorDisable = true;
      net
        .getMentorList(this, this.collaboratorParams.programmeId)
        .then(res => {
          if (res.data.data) {
            this.mentor = res.data.data;
          } else {
            this.mentor = { total: 0, list: [] };
          }
          this.mentorDisable = false;
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.mentorLoader = false;
        });
    },
    setUp: function() {
      if (this.$refs.form.validate()) {
        this.valid = false;
        this.$emit("setUpCollaboration", this.collaboratorParams);
      }
    }
  }
};
</script>
<style>
.seraidea {
  -webkit-box-shadow: none !important;
  box-shadow: none !important
}
</style>