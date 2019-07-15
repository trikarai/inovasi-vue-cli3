<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
          <v-card elevation="0" width="400">
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="Curriculum Name"
                    v-model="params.name"
                    :rules="nameRules"
                    :counter="25"
                    maxlength="25"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Description"
                    v-model="params.description"
                    :counter="25"
                    maxlength="25"
                    required
                  ></v-text-field>
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
                    >{{ $vuetify.t('$vuetify.action.edit')}}</v-btn>

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
import Notification from "@/components/Notification";

export default {
  props: ["id", "edit", "view", "data"],
  data: function() {
    return {
      valid: false,
      loader: false,
      status: {
        error: false,
        success: false,
        info: false,
        warning: false
      },
      err_msg: "",
      params: {
        name: "",
        description: ""
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
    addData: function() {
      this.loader = true;
      net
        .postData(this, "/administrator/curriculums/", this.params)
        .then(function(res) {
          console.log(res);
          this.$emit("refresh");
        })
        .catch(function(error) {
          console.log(error);
          notif.showError(this, error);
        })
        .finally(function() {
          this.loader = false;
        });
    },
    updateData: function() {
      this.loader = true;
      net
        .putData(
          this,
          "/administrator/curriculums/" + this.data.id,
          this.params
        )
        .then(function(res) {
          console.log(res);
          this.$emit("refresh");
        })
        .catch(function(error) {
          console.log(error);
          notif.showError(this, error);
        })
        .finally(function() {
          this.loader = false;
        });
    },
    getSingleData: function(id) {
      net
        .getData(this, "/administrator/curriculums/" + id)
        .then(function(res) {
          this.params = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
          notif.showError(this, error);
        })
        .finally();
    }
  }
};
</script>
<style scoped>
@import "../../css/modal.css";
</style>
