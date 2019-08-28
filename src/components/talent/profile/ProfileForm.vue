<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert v-bind:err_msg="err_msg" v-bind:status="status"/>
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
                  <v-text-field :disabled="view" label="Email" v-model="params.email" required></v-text-field>
                  <v-text-field :disabled="view" label="Phone" v-model="params.phone" required></v-text-field>
                  <v-text-field
                    :disabled="view"
                    label="City of Origin"
                    v-model="params.cityOfOrigin"
                    required
                  ></v-text-field>
                  <v-flex xs12>
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="data.birthDate"
                          label="Birth Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :locale="$vuetify.lang.current"
                        v-model="data.birthDate"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-autocomplete
                    v-model="params.gender"
                    label="Gender"
                    :items="type"
                    item-text="name"
                    item-value="value"
                  ></v-autocomplete>

                  <v-layout justify-space-between v-if="!view">
                    <v-btn
                      @click="updateData"
                      :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                    >{{ $vuetify.lang.t('$vuetify.action.edit')}}</v-btn>

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
import Notification from "@/components/Notification";

export default {
  props: ["id", "edit", "view", "data"],
  data: function() {
    return {
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: { code: 666, type: "", details: [""] },
      valid: false,
      loader: false,
      type: [
        {
          name: "Male",
          value: "l"
        },
        {
          name: "Female",
          value: "p"
        }
      ],
      params: {
        name: "",
        username: "",
        email: "",
        cityOfOrigin: "",
        birthDate: "",
        gender: ""
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
    this.params = this.data;
  },
  mounted: function() {
    this.params = this.data;
  },
  methods: {
    updateData: function() {
      this.loader = true;
      this.status.error = false;
      net
        .putData(this, "/talent/profile/update", this.params)
        .then(
          res => {
            
            this.$emit("refresh");
          },
          error => {
            
            this.err_msg = error.body.meta;
            this.status.error = true;
          }
        )
        .catch()
        .finally(()=> {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
@import "../../css/modal.css";
</style>
