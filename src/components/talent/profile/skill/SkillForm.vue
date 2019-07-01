<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
          <v-card elevation="0" width="400">
            <v-card-text class="pt-4">
              <div>
                <!-- {{error}} -->
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
                    <v-rating color="primary" v-model="params.score" clearable="true"></v-rating>
                  </div>

                  <v-layout justify-space-between>
                    <v-btn
                      v-if="edit == false"
                      @click.prevent="submit"
                      :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                    >{{ $vuetify.t('$vuetify.action.add')}}</v-btn>

                    <v-btn
                      v-else
                      @click="update"
                      :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
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
      err_msg: { code: 666, type: "", details: [] },
      error: "error",
      params: {
        trackId: "",
        skillReferenceId: "",
        score: "5"
      },
      nameRules: [
        v => !!v || "Name is required",
        v => v.length >= 3 || "Name must be more than 3 characters"
      ],
      track: {total:0, list:[]},
      skill: {total:0, list:[]},
      dummy: [
        { name: "dummy 1", id: "id" },
        { name: "dummy 2", id: "id2" },
        { name: "dummy 3", id: "id3" },
        { name: "dummy 4", id: "id4" }
      ]
    };
  },
  components: {
    "notification-alert": notification
  },
  created: function() {},
  watch: {
    "params.trackId" : function() {
      this.getSkill(this.params.trackId);
    }
  },
  mounted: function() {
    this.getTrack();
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
      var app = this;
      this.status.error = false;
      this.status.success = false;
      net
        .getData(this, "/talent/skills/" + this.data.id)
        .then(
          res => {
            console.log(res);
            this.params = res.data.data;
          },
          error => {
            console.log(error);
            if (error.status >= 400) {
              this.err_msg = {
                code: error.status,
                type: error.statusText,
                details: [error.statusText]
              };
            } else {
              this.err_msg = error.body.meta;
            }
            this.status.error = true;
          }
        )
        .catch(function(error) {
          console.log(error);
          if (error.status >= 400) {
            app.err_msg = {
              code: error.status,
              type: error.statusText,
              details: [error.statusText]
            };
          } else {
            app.err_msg = error.body.meta;
          }
          app.status.error = true;
        })
        .finally(function() {
          this.loader = false;
        });
    },
    addData: function() {
      this.loader = true;
      var app = this;
      this.status.error = false;
      this.status.success = false;
      net
        .postData(this, "/talent/skills/", this.params)
        .then(
          res => {
            console.log(res);
            this.$emit("refresh");
          },
          error => {
            console.log(error);
            if (error.status === 500) {
              this.err_msg = {
                code: error.status,
                type: error.statusText,
                details: [error.statusText]
              };
            } else {
              this.err_msg = error.body.meta;
            }
            this.status.error = true;
          }
        )
        .catch()
        .finally(function() {
          this.loader = false;
        });
    },
    updateData: function() {
      var app = this;
      this.loader = true;
      this.status.error = false;
      this.status.success = false;
      net
        .putData(this, "/talent/skills/" + this.data.id, this.params)
        .then(
          res => {
            console.log(res);
            this.$emit("refresh");
          },
          error => {
            console.log(error);
            if (error.status >= 400) {
              this.err_msg = {
                code: error.status,
                type: error.statusText,
                details: [error.statusText]
              };
            } else {
              this.err_msg = error.body.meta;
            }
            this.status.error = true;
          }
        )
        .catch(function(error) {
          console.log(error);
          if (error.status >= 400) {
            app.err_msg = {
              code: error.status,
              type: error.statusText,
              details: [error.statusText]
            };
          } else {
            app.err_msg = error.body.meta;
          }
          app.status.error = true;
        })
        .finally(function() {
          this.loader = false;
        });
    },
    getTrack: function() {
      net.getData(this, "/talent/tracks").then(
        res => {
          console.log(res);
          this.track = res.data.data;
        },
        error => {
          console.log(error);
          if (error.status >= 400) {
            this.err_msg = {
              code: error.status,
              type: error.statusText,
              details: [error.statusText]
            };
          } else {
            this.err_msg = error.body.meta;
          }
          this.status.error = true;
        }
      );
    },
    getSkill: function(trackId) {
      net.getData(this, "/talent/tracks/"+ trackId + "/skill-references").then(
        res => {
          console.log(res);
          this.skill = res.data.data;
        },
        error => {
          console.log(error);
          if (error.status >= 400) {
            this.err_msg = {
              code: error.status,
              type: error.statusText,
              details: [error.statusText]
            };
          } else {
            this.err_msg = error.body.meta;
          }
          this.status.error = true;
        }
      );
    }
  }
};
</script>
<style scoped>
@import "../../../css/modal.css";
</style>
