<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />
          <v-card elevation="0" width="450" style="padding:0px 30px 20px 30px;margin-top:8px;">
            <v-card class="taitel primary white--text elevation-5">
              <h3
                v-if="edit"
                class="headline mb-0 font-weight-light"
              >{{ $vuetify.lang.t('$vuetify.action.edit') }} Persona</h3>
              <h3
                v-if="!edit"
                class="headline mb-0 font-weight-light"
              >{{ $vuetify.lang.t('$vuetify.action.add') }} Persona</h3>
            </v-card>
            <v-card-text class="pt-4">
              <div>
                <v-flex xs12>
                  <v-select
                    :loading="loadingPersona"
                    v-model="personaForm"
                    :items="personaList.list"
                    hint="Select Persona Form"
                    item-text="name"
                    item-value="id"
                    label="Select Persona Form"
                    persistent-hint
                    return-object
                    single-line
                  ></v-select>
                </v-flex>
                <v-form v-model="valid" ref="form">
                  <div>
                    <v-flex xs12 sm12>
                      <v-text-field
                        v-if="params.formId"
                        v-model="params.name"
                        id="field.id"
                        name="persona_name"
                        label="Persona Name"
                        hint="Persona Name"
                        counter="25"
                        maxlength="25"
                        :rules="rules"
                      ></v-text-field>
                    </v-flex>
                    <template v-for="(field, index) in formTemplate.fields">
                      <field-modul v-bind:index="index" v-bind:fields="field" :key="field.id"></field-modul>
                    </template>
                  </div>
                  <v-layout justify-space-between>
                    <!-- {{params}} -->
                    <v-btn
                      v-if="params.formId"
                      @click.prevent="submit"
                      class="mt-5"
                      :class=" { 'primary white--text' : valid}"
                      :disabled="!valid"
                      block
                    >{{ $vuetify.lang.t('$vuetify.action.add')}}</v-btn>

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
        v => v.length <= 50 || "Max 50 characters long"
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
      err_msg: { code: 666, type: "", details: [""] },
      error: "error",
      errors: [],
      params: {
        formId: "",
        name: "",
        fieldEntries: []
      },
      personaForm: "",
      loadingPersona: false,
      personaList: { total: 0, list: [] },
      formTemplate: "form template",
      nameRules: [
        v => !!v || "Name is required",
        v => v.length >= 3 || "Name must be more than 3 characters"
      ]
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
    this.getPersonaFormList();
  },
  methods: {
    getPersonaFormList: function() {
      this.loadingPersona = true;
      net
        .getData(this, "/talent/forms?types[]=per")
        .then(function(res) {
          if (res.data.data) {
            this.personaList = res.data.data;
          } else {
            this.personaList = { total: 0, list: [] };
          }
        })
        .catch(function(error) {
          notif.showError(this, error);
        })
        .finally(() => {
          this.loadingPersona = false;
        });
    },
    getForm: function() {
      this.loader = true;
      this.params.formId = this.personaForm.id;
      net
        .getData(this, "/talent/forms/id/" + this.personaForm.id)
        .then(function(res) {
          if (res.data.data) {
            this.formTemplate = res.data.data;
            this.setFormJSONTemplate(res.data.data);
          } else {
            this.formTemplate = "";
          }
        })
        .catch(function(error) {
          notif.showError(this, error);
        })
        .finally(() => {
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
            this.params = res.data.data;
          },
          error => {
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
        .finally(() => {
          this.loader = false;
        });
    },
    addData: function() {
      this.loader = true;
      this.status.error = false;
      net
        .postData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/ideas/" +
            this.$route.params.ideaId +
            "/customer-segments/" +
            this.$route.params.customersegmentId +
            "/personas",
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
      this.loader = true;
      notif.reset(this);
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
@import "../../../../../css/modal.css";

.taitel {
  padding: 24px;
  width: 90%;
  margin: 0 auto;
  bottom: 27px;
  z-index: 2;
}
</style>
