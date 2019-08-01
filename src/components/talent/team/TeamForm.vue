<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert v-bind:err_msg="err_msg" v-bind:status="status"/>
          <v-card elevation="0" width="600">
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
                  Vission : 
                  <!--Use the component in the right place of the template-->
                  <tiptap-vuetify label="Vission" v-model="params.vission" :extensions="extensions"/>
                  Misson : 
                  <tiptap-vuetify label="Mission" v-model="params.mission" :extensions="extensions"/>
                  Culture : 
                  <tiptap-vuetify label="Culture" v-model="params.culture" :extensions="extensions"/>


                  <v-layout justify-space-between v-if="!view">
                    <v-btn
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
import Notification from "@/components/Notification";
// import the component and the necessary extensions
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  CodeBlock,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from "tiptap-vuetify";

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
      err_msg: {details:[""]},
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
      ],
      extensions: [
      // you can specify options for extension
      new OrderedList(),
      new ListItem(),
      new Link(),
      new History()
    ],
    };
  },
  components: {
    "notification-alert": Notification,
    TiptapVuetify 
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
            console.log(res);
            this.$emit("refresh");
          },
          error => {
            console.log(error);
            this.err_msg = error.body.meta;
            this.status.error = true;
          }
        )
        .catch()
        .finally(function() {
          this.loader = false;
        });
    }
  }
};
</script>
<style scoped>
@import "../../css/modal.css";
</style>
