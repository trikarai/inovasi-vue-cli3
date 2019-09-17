<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
          <v-card style="padding:0px 30px 20px 30px" class="mt-5" elevation="0" width="450">
            <v-card class="taitel primary white--text elevation-5">
              <h3
                v-if="edit"
                class="headline mb-0 font-weight-light"
              >{{ $vuetify.lang.t('$vuetify.action.edit') }} Idea</h3>
              <h3
                v-if="!edit"
                class="headline mb-0 font-weight-light"
              >{{ $vuetify.lang.t('$vuetify.action.add') }} Idea</h3>
            </v-card>
            <v-card-text class="pt-4">
              <div>
                <!-- {{params}} -->
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="Idea Name"
                    v-model="params.name"
                    :rules="nameRules"
                    :counter="100"
                    maxlength="100"
                    required
                  ></v-text-field>
                  <v-tooltip max-width="250" right>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        style="float:right;width:24px;height:24px;top: 20px;"
                        fab
                        small
                        elevation="0"
                        color="primary"
                        dark
                        v-on="on"
                      >
                        <v-icon small>priority_high</v-icon>
                      </v-btn>
                    </template>
                    <span>Elevator pitch merupakan deskripsi singkat mengenai ide, produk, ataupun perusaahan kalian dengan pemaparan yang mudah dimengerti dalam waktu singkat.</span>
                  </v-tooltip>
                  <v-textarea
                    :auto-grow="grow"
                    counter
                    label="Elevator Pitch"
                    v-model="params.elevatorPitch"
                  ></v-textarea>
                  <v-layout justify-space-between>
                    <v-btn
                      v-if="edit == false"
                      @click.prevent="submit"
                      class="mt-5"
                      :class=" { 'primary white--text' : valid}"
                      :disabled="!valid"
                      block
                    >{{ $vuetify.lang.t('$vuetify.action.add')}}</v-btn>

                    <v-btn
                      v-else
                      @click="update"
                      class="mt-5"
                      :class=" { 'primary white--text' : valid}"
                      :disabled="!valid"
                      block
                    >{{ $vuetify.lang.t('$vuetify.action.update')}}</v-btn>

                    <loader-dialog v-model="loader"></loader-dialog>
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
      grow: false,
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
        name: "",
        description: "",
        targetCustomer: "",
        problemConfront: "",
        valueProposed: "",
        revenueModel: ""
      },
      nameRules: [
        v => !!v || "Name is required",
        v => v.length >= 3 || "Name must be more than 3 characters"
      ]
    };
  },
  components: {
    "notification-alert": notification
  },
  created: function() {},
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
      net
        .getData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/ideas/" +
            this.data.id
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
    addData: function() {
      this.loader = true;
      notif.reset(this);
      net
        .postData(
          this,
          "/talent/as-team-member/" + this.$route.params.teamId + "/ideas",
          this.params
        )
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
    updateData: function() {
      var app = this;
      this.loader = true;
      this.status.error = false;
      net
        .putData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/ideas/" +
            this.data.id +
            "/update-profile",
          this.params
        )
        .then(res => {
          this.$emit("refresh");
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
