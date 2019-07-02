<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <v-card elevation="0" width="400">
              <v-card-text class="pt-4">
                <!-- {{data.name}} -->
                <div>
                  <v-form v-model="valid" ref="form">
                    <v-text-field
                      label="Region Name"
                      v-model="params.name"
                      :rules="nameRules"
                      :counter="25"
                      maxlength="25"
                      required
                    ></v-text-field>
                    <v-layout justify-space-between>

                      <v-btn v-if="edit == false"
                        @click.prevent="submit"
                        :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                      > {{ $vuetify.t('$vuetify.action.add')}} </v-btn>

                       <v-btn v-else
                        @click="update"
                        :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                      > {{ $vuetify.t('$vuetify.action.edit')}} </v-btn>


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
        name: ""
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length >= 3  || 'Name must be more than 3 characters'
      ],
    };
  },
  created: function(){
    this.params.name = this.data.name;
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
    addData: function(){
      this.loader = true;
      net.postData(this, '/administrator/regions', this.params)
      .then(res=>{
        console.log(res)
        this.$emit('refresh')
      }, error=>{
        console.log(error)
      })
      .catch().finally(function(){
        this.loader = false
      })
    },
    updateData: function(){
      this.loader = true;
      net.putData(this, '/administrator/regions/' + this.data.id , this.params)
      .then(res=>{
        console.log(res)
        this.$emit('refresh')
      }, error=>{
        console.log(error)
      })
      .catch().finally(function(){
        this.loader = false
      })
    }
  }
};
</script>
<style scoped>
@import "../../css/modal.css";
</style>
