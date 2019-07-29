<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
          <v-card elevation="0" width="550" style="top:50px">
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form">
                  <div>
                    <template v-for="(field, index) in formTemplate.fields">
                      <field-modul v-bind:index="index" v-bind:fields="field" :key="field.id"></field-modul>
                    </template>
                  </div>
                  <v-layout justify-space-between>
                    <v-btn
                      @click.prevent="submit"
                      :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                    >{{ $vuetify.t('$vuetify.action.add')}}</v-btn>
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
import bus from "@/bus";
import net from "@/config/httpclient";
import notif from "@/config/alerthandling";
import notification from "@/components/Notification";

import FieldModul from "@/components/field/field";

export default {
  props: ["id", "edit", "view", "data"],
  data: function() {
    return {
      rules: [
        v => !!v || "This field is required",
        v => v.length >= 3 || "Min 3 characters long",
        v => v.length <= 25 || "Max 25 characters long"
      ],
      clearable: true,
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
      errors: [],
      params: {
        formId: "",
        fieldEntries: []
      },
      formTemplate: "form template"
    };
  },
  components: {
    "notification-alert": notification,
    "field-modul": FieldModul
  },
  created: function() {
    bus.$on("getValue", (params, index) => {
      this.params.fieldEntries.splice(index, 1, params);
    });
  },
  watch: {
    personaForm: "getForm"
  },
  mounted: function() {
    this.getForm();
  },
  methods: {
    getForm: function() {
      this.loader = true;
      this.params.formId = this.$route.params.formId;
      net
        .getData(this, "/talent/forms/id/" + this.$route.params.formId)
        .then(function(res) {
          if (res.data.data) {
            this.formTemplate = res.data.data;
            this.setFormJSONTemplate(res.data.data);
          } else {
            this.formTemplate = "";
          }
        })
        .catch(function(error) {
          console.log(error);
          notif.showError(this, error);
        })
        .finally(function() {
          this.loader = false;
        });
    },
    setFormJSONTemplate: function(data) {
      var array = [];
      for (var i = 0; i < data.fields.length; i++) {
        array.push(new Object({ id: data.fields[i].id, value: "" }));
      }
      this.params.fieldEntries = array;
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
        // this.updateData();
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
            this.$route.params.ideaId +
            "/customer-segments/" +
            this.data.id
        )
        .then(
          res => {
            console.log(res);
            this.params = res.data.data;
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
    addData: function() {
      this.loader = true;
      this.status.error = false;
      net
        .patchData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/ideas/" +
            this.$route.params.ideaId +
            "/customer-segments/" +
            this.$route.params.customersegmentId +
            "/personas/" +
            this.$route.params.personaId +
            "/value-propositions/" +
            this.$route.params.valuepropositionId +
            "/business-canvases",
          this.params
        )
        .then(res => {
          console.log(res);
          this.$emit("refresh");
        })
        .catch(error => {
          console.log(error);
          // notif.showError(this, error);
          this.error = error.body;
        })
        .finally(function() {
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
            this.$route.params.ideaId +
            "/customer-segments/" +
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
        .catch(function(error) {
          app.err_msg = {
            code: error.status,
            type: error.statusText,
            details: [error.statusText]
          };
          app.status.error = true;
        })
        .finally(function() {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
@import "../../../../../../../../css/modal.css";
</style>
