<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />

          <v-dialog v-model="loader" hide-overlay persistent width="300">
            <v-card color="primary">
              <v-card-text>
                {{ $vuetify.lang.t('$vuetify.info.standby') }}
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-card elevation="0" width="400">
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    :disabled="view"
                    label="Name"
                    v-model="params.name"
                    :rules="nameRules"
                    :counter="25"
                    maxlength="25"
                    required
                  ></v-text-field>
                  <v-textarea
                    :disabled="view"
                    label="Description"
                    v-model="params.description"
                    counter
                    required
                  ></v-textarea>
                  <v-autocomplete
                    v-model="params.curriculumId"
                    label="Curriculum"
                    :items="curriculum.list"
                    item-text="name"
                    item-value="id"
                  ></v-autocomplete>

                  <v-layout justify-space-between v-if="!view">
                    <v-btn
                      v-if="edit == false"
                      @click.once="submit"
                      :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                    >{{ $vuetify.lang.t('$vuetify.action.add')}}</v-btn>

                    <v-btn
                      v-else
                      @click="update"
                      :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                    >{{ $vuetify.lang.t('$vuetify.action.edit')}}</v-btn>

                    <v-dialog v-model="loader" hide-overlay persistent width="300">
                      <v-card color="primary" dark>
                        <v-card-text>
                          {{ $vuetify.lang.t('$vuetify.info.standby')}}
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
import Notification from "@/components/Notification";

export default {
  props: ["id", "edit", "view", "data"],
  data: function() {
    return {
      valid: false,
      loader: false,
      curriculum: "",
      status: {
        error: false,
        success: false,
        info: false,
        warning: false
      },
      err_msg: { details: [""] },
      params: {
        name: "",
        description: "",
        curriculumId: ""
      },
      nameRules: [
        v => !!v || "Name is required",
        v => v.length >= 3 || "Name must be more than 3 characters"
      ]
    };
  },
  components: {
    "notification-alert": Notification
  },
  created: function() {
    this.params.name = this.data.name;
  },
  mounted: function() {
    if (this.edit) {
      this.getSingleData(this.data.id);
    }
    this.getCurriculum();
  },
  methods: {
    submit: function() {
      if (this.$refs.form.validate()) {
        this.addData();
      }
    },
    update: function() {
      if (this.$refs.form.validate()) {
        this.updateData();
      }
    },
    getCurriculum: function() {
      this.loader = true;
      net
        .getData(this, "/administrator/curriculums")
        .then(res => {
          if (res.data.data) {
            this.curriculum = res.data.data;
          } else {
            this.curriculum.list = [];
          }
        })
        .catch(error => {
          notif.showError(this, res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    addData: function() {
      this.loader = true;
      net
        .postData(this, "/administrator/programmes", this.params)
        .then(res => {
          this.$emit("refresh");
        })
        .catch(error => {
          notif.showError(this, res);
        })
        .finally(() => {
          this.loader = false;
        });
    },
    updateData: function() {
      this.loader = true;
      net
        .putData(this, "/administrator/programmes/" + this.data.id, this.params)
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
    getSingleData: function(id) {
      this.loader = true;
      net
        .getData(this, "/administrator/programmes/" + id)
        .then(res => {
          this.params = res.data.data;
          this.params.curriculumId = res.data.data.curriculum.id;
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
@import "../../css/modal.css";
</style>
