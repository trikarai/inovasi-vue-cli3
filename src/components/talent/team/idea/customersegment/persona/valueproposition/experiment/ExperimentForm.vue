<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <loader-dialog v-model="loader" />
          <notification-alert v-bind:err_msg="err_msg" v-bind:status="status" />

          <v-card elevation="0" width="400" style="padding:0px 30px 20px 30px">
            <v-card class="taitel primary white--text elevation-5">
              <h3
                v-if="edit"
                class="headline mb-0 font-weight-light"
              >{{ $vuetify.lang.t('$vuetify.action.edit') }} {{ $vuetify.lang.t('$vuetify.experiment.exp') }}</h3>
              <h3
                v-if="!edit"
                class="headline mb-0 font-weight-light"
              >{{ $vuetify.lang.t('$vuetify.action.add') }} {{ $vuetify.lang.t('$vuetify.experiment.exp') }}</h3>
            </v-card>
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form">
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
                          v-model="params.date"
                          label="Date"
                          prepend-icon="today"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        :locale="$vuetify.lang.current"
                        v-model="params.date"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>

                  <div v-if="!edit">
                    <template v-for="(field, index) in formTemplate.fields">
                      <field-modul v-bind:index="index" v-bind:fields="field" :key="field.id"></field-modul>
                    </template>
                  </div>
                  <!--start render edit exp-->
                  <div v-if="edit">
                    <template v-for="(field, index) in experimentData.fields">
                      <fieldedit-modul v-bind:index="index" v-bind:fields="field" :key="field.id"></fieldedit-modul>
                    </template>
                  </div>
                  <!--end ender edit exp-->

                  <v-layout justify-space-between>
                    <v-btn
                      block
                      class="mt-6"
                      v-if="!edit"
                      @click.prevent="submit"
                      :class=" { 'primary white--text' : valid}"
                      :disabled="!valid"
                    >{{ $vuetify.lang.t('$vuetify.action.add')}}</v-btn>
                    <v-btn
                      block
                      class="mt-6"
                      v-if="edit"
                      @click.prevent="submit"
                      :class=" { 'primary white--text' : valid}"
                      :disabled="!valid"
                    >{{ $vuetify.lang.t('$vuetify.action.update')}}</v-btn>
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
import FieldCanEditModul from "@/components/field/fieldCanEdit";

export default {
  props: ["id", "edit", "view", "data", "formId", "formDate"],
  data: function() {
    return {
      rules: [
        v => !!v || "This field is required",
        v => v.length >= 3 || "Min 3 characters long",
        v => v.length <= 25 || "Max 25 characters long"
      ],
      clearable: true,
      valid: false,
      menu2: false,
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
        date: "",
        fieldEntries: []
      },
      formTemplate: "form template",
      experimentData: ""
    };
  },
  components: {
    "notification-alert": notification,
    "field-modul": FieldModul,
    "fieldedit-modul": FieldCanEditModul
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
    if (this.edit) {
      this.getSingleData();
      this.params.formId = this.formId;
      this.params.date = this.formDate;
    } else {
      this.getForm();
    }
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
    getSingleData: function() {
      this.loader = true;
      notif.reset(this);
      net
        .getData(
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
            "/experiments/" +
            this.data
        )
        .then(res => {
          this.experimentData = res.data.data;
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
      if (this.edit) {
        net
          .putData(
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
              "/experiments/" +
              this.data,
            this.params
          )
          .then(res => {
            this.$emit("refresh");
          })
          .catch(error => {
            notif.showError(this, error);
            this.error = error.body;
          })
          .finally(() => {
            this.loader = false;
          });
      } else {
        net
          .postData(
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
              "/experiments",
            this.params
          )
          .then(res => {
            this.$emit("refresh");
          })
          .catch(error => {
            notif.showError(this, error);
            this.error = error.body;
          })
          .finally(() => {
            this.loader = false;
          });
      }
    }
  }
};
</script>
<style scoped>
@import "../../../../../../../css/modal.css";

.taitel {
  padding: 24px;
  width: 90%;
  margin: 0 auto;
  bottom: 27px;
  z-index: 2;
}
</style>
