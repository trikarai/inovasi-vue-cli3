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
                    :disabled="edit"
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
                    required
                  ></v-text-field>
                  <template v-if="minmax">
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
                  </template>
                  <template v-if="params.type === 'sel'">
                    <v-checkbox
                      v-model="checkbox"
                      color="primary"
                      :label="`Multiple: ${checkbox.toString()}`"
                    ></v-checkbox>
                  </template>

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
      checkbox: false,
      status: {
        error: false,
        success: false,
        info: false,
        warning: false
      },
      err_msg: {details:[""]},
      response: "",
      params: {
        name: "",
        description: "",
        type: "",
        position: "",
        minValue: 0,
        maxValue: 0
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
        },
        {
          name: "text area",
          value: "txt"
        },
        {
          name: "attachment",
          value: "att"
        }
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
  computed: {
    minmax: function() {
      var condition = true;
      if (
        this.params.type === "sel" ||
        this.params.type === "txt" ||
        this.params.type === "att"
      ) {
        condition = false;
      }
      return condition;
    }
  },
  watch: {
    "params.type": function() {
      if (this.params.type === "sel") {
        this.params.minValue = 1;
        this.params.maxValue = 1;
      }
    },
    checkbox: function() {
      if (this.checkbox) {
        this.params.minValue = 0;
        this.params.maxValue = 0;
      } else {
        this.params.minValue = 1;
        this.params.maxValue = 1;
      }
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
            notif.showError(this, error);
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
            notif.showError(this, error);
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
            this.params.type = res.data.data.type.value;
            if(this.params.minValue === 1){
              this.checkbox = false;
            }else{
              this.checkbox = true;
            }
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
