<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
          <v-card elevation="0" width="550" style="top:50px">
            <v-card-text class="pt-4">
              <!-- {{params}}  -->
              <!-- <v-divider></v-divider>
              {{formTemplate}} -->
              <div>
                <v-flex xs12>
                  <!-- {{errors}} -->
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
                <v-divider></v-divider>
                <!-- {{error}} -->
                {{formTemplate.name}}
                <v-form v-model="valid" ref="form">
                  <div>
                    <template v-for="field in formTemplate.fields">
                      <field-modul v-bind:fields="field" :key="field.id"></field-modul>
                    </template>
                  </div>
                  <v-layout justify-space-between>
                                  {{params}} 

                    <!-- <v-btn @click.prevent="testBus" color="red">Validate</v-btn> -->
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
        date: "",
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
    bus.$on("getValue", (params, position)=>{
      this.params.fieldEntries.splice(position, 1, params);

    })
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
          console.log(error);
          notif.showError(this, error);
        })
        .finally(function() {
          this.loadingPersona = false;
        });
    },
    getForm: function() {
      this.loader = true;
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
          console.log(error);
          notif.showError(this, error);
        })
        .finally(function() {
          this.loader = false;
        });
    },
    setFormJSONTemplate: function(data){
      var array = []
      for(var i = 0 ; i < data.fields.length; i++){
        array.push(new Object({id: data.fields[i].id, value: ""}))
      }
      this.params.fieldEntries = array;
    },
    testBus: function() {
      // bus.$emit("validateChild");
    },
    submit: function() {
      if (this.$refs.form.validate()) {
        // this.addData();
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
        .postData(
          this,
          "/talent/as-team-member/" +
            this.$route.params.teamId +
            "/ideas/" +
            this.$route.params.ideaId +
            "/customer-segments/",
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
        .catch()
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
@import "../../../../../css/modal.css";
</style>
