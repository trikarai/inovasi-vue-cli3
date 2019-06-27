<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <v-card elevation="0" width="400">
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    :disabled="view"
                    label="Field Name"
                    v-model="params.name"
                    :rules="nameRules"
                    :counter="25"
                    maxlength="25"
                    required
                  ></v-text-field>
                  <v-text-field
                    :disabled="view"
                    label="Description"
                    v-model="params.description"
                    counter
                    maxlength="100"
                    required
                  ></v-text-field>

                  <v-autocomplete
                    v-model="params.type"
                    label="Field Type"
                    :items="type"
                    item-text="name"
                    item-value="value"
                  ></v-autocomplete>

                  <v-text-field
                    :disabled="view"
                    label="Position"
                    v-model="params.position"
                    type="number"
                    required
                  ></v-text-field>
                  <v-text-field
                    :disabled="view"
                    label="min Value"
                    v-model="params.minValue"
                    type="number"
                    required
                  ></v-text-field>
                  <v-text-field
                    :disabled="view"
                    label="max Value"
                    v-model="params.maxValue"
                    type="number"
                    required
                  ></v-text-field>

                  <v-layout justify-space-between v-if="!view">
                    <v-btn
                      v-if="edit == false"
                      @click.prevent="addData"
                      :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                    >{{ $vuetify.t('$vuetify.action.add')}}</v-btn>

                    <v-btn
                      v-else
                      @click="updateData"
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

export default {
  props: ["id", "edit", "view", "data"],
  data: function() {
    return {
      valid: false,
      loader: false,
      params: {
        name: "",
        description: "",
        curriculum_id: ""
      },
      nameRules: [
        v => !!v || "Name is required",
        v => v.length >= 3 || "Name must be more than 3 characters"
      ],
      type: [
        {
          name: "string",
          value: "str"
        },
        {
          name: "integer",
          value: "int"
        },
        {
          name: "select",
          value: "sel"
        }
      ]
    };
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
    addData: function() {
      this.loader = true;
      net
        .postData(
          this,
          "/administrator/forms/" + this.$route.params.formId + "/fields",
          this.params
        )
        .then(
          res => {
            console.log(res);
            this.$emit("refresh");
          },
          error => {
            console.log(error);
          }
        )
        .catch()
        .finally(function() {
          this.loader = false;
        });
    },
    updateData: function() {
      this.loader = true;
      net
        .putData(
          this,
          "/administrator/forms/" +
            this.$route.params.formId +
            "/fields/" +
            this.data.id,
          this.params
        )
        .then(
          res => {
            console.log(res);
            this.$emit("refresh");
          },
          error => {
            console.log(error);
          }
        )
        .catch()
        .finally(function() {
          this.loader = false;
        });
    },
    getSingleData: function(id) {
      net
        .getData(
          this,
          "/administrator/forms/" + this.$route.params.formId + "/fields/" + id
        )
        .then(
          res => {
            this.params = res.data.data;
          },
          error => {
            console.log(error);
          }
        )
        .catch()
        .finally();
    }
  }
};
</script>
<style scoped>
@import "../../css/modal.css";
</style>
