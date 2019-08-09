<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
          <v-card style="padding:0px 30px 0px 30px" class="mt-5" elevation="0" width="400">
            <v-card class="taitel primary white--text elevation-5">
              <h3 v-if="edit" class="headline mb-0 font-weight-light">{{ $vuetify.t('$vuetify.action.edit') }} Skill</h3>
              <h3 v-if="!edit" class="headline mb-0 font-weight-light">{{ $vuetify.t('$vuetify.action.add') }} Skill</h3>    
            </v-card>
            <v-card-text class="pt-0">
              <div>
                <v-form v-model="valid" ref="form">
                  <v-autocomplete
                    v-model="params.trackId"
                    label="Track"
                    :items="track.list"
                    item-text="name"
                    item-value="id"
                    required
                  ></v-autocomplete>
                  <v-autocomplete
                    v-model="params.skillReferenceId"
                    label="Skill"
                    :items="skill.list"
                    item-text="name"
                    item-value="id"
                    required
                  ></v-autocomplete>
                  <span class="grey--text">Score : ({{ params.score}})</span>
                  <div class="text-xs-left">
                    <v-rating color="primary" v-model="params.score"></v-rating>
                  </div>

                  <v-layout justify-space-between>
                    <v-btn
                      v-if="edit == false"
                      @click.once="submit"
                      :class=" { 'primary white--text' : valid}"
                      :disabled="!valid"
                      block
                    >{{ $vuetify.t('$vuetify.action.add')}}</v-btn>

                    <v-btn
                      v-else
                      @click="update"
                      :class=" { 'primary white--text' : valid}"
                      :disabled="!valid"
                      block
                    >{{ $vuetify.t('$vuetify.action.update')}}</v-btn>

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
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import notification from "@/components/Notification";

export default {
  props: ["id", "edit", "view", "data"],
  data: function() {
    return {
      valid: false,
      loader: false,
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: { code: 666, type: "", details: [""] },
      error: "error",
      params: {
        trackId: "",
        skillReferenceId: "",
        score: 0
      },
      nameRules: [
        v => !!v || "Name is required",
        v => v.length >= 3 || "Name must be more than 3 characters"
      ],
      track: { total: 0, list: [] },
      skill: { total: 0, list: [] }
    };
  },
  components: {
    "notification-alert": notification
  },
  created: function() {
    this.getTrack();
  },
  watch: {
    "params.trackId": function() {
      this.getSkill(this.params.trackId);
    }
  },
  mounted: function() {
    if (this.edit) {
      this.getSingleData();
    }
  },
  methods: {
    submit: function() {
      if (this.$refs.form.validate()) {
        this.addData();
      } else {
        this.$vuetify.goTo(this.$refs.notif, {
          duration: 500,
          offset: 0,
          easing: "linear"
        });
      }
    },
    update: function() {
      if (this.$refs.form.validate()) {
        this.updateData();
      } else {
        this.$vuetify.goTo(this.$refs.notif, {
          duration: 500,
          offset: 0,
          easing: "linear"
        });
      }
    },
    getSingleData: function() {
      notif.reset(this);
      this.loader = true;
      net
        .getData(this, "/talent/skills/" + this.data.id)
        .then(res => {
          this.params = res.data.data;
          this.getTrack(this.params.trackId);
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    addData: function() {
      notif.reset(this);
      this.loader = true;
      net
        .postData(this, "/talent/skills", this.params)
        .then(res => {
          this.$store.commit("incrementSki");
          this.$emit("refresh");
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    updateData: function() {
      notif.reset(this);
      this.loader = true;
      net
        .putData(this, "/talent/skills" + this.data.id, this.params)
        .then(res => {
          this.$emit("refresh");
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    getTrack: function() {
      notif.reset(this);
      this.loader = true;
      net
        .getData(this, "/talent/tracks")
        .then(res => {
          this.track = res.data.data;
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    getSkill: function(trackId) {
      notif.reset(this);
      this.loader = true;
      net
        .getData(this, "/talent/tracks/" + trackId + "/skill-references")
        .then(res => {
          console.log(res);
          this.skill = res.data.data;
        })
        .catch(error => {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
@import "../../../css/modal.css";

.taitel {
  padding: 24px;
  width: 90%;
  margin: 0 auto;
  bottom: 27px;
  z-index: 2;
}
</style>
