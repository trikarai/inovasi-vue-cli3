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
                      label="Track Name"
                      v-model="params.name"
                      :rules="nameRules"
                      :counter="50"
                      maxlength="50"
                      required
                    ></v-text-field>
                    <v-layout justify-space-between>
                      <v-btn v-if="edit == false"
                        @click.once="submit"
                        :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                      > {{ $vuetify.lang.t('$vuetify.action.add')}} </v-btn>

                       <v-btn v-else
                        @click="update"
                        :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                      > {{ $vuetify.lang.t('$vuetify.action.edit')}} </v-btn>


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
//TODO
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
        this.addTrack();
      } 
    },
    update: function() {
      if (this.$refs.form.validate()) {
        this.updateTrack();
      } 
    },
    addTrack: function(){
      this.loader = true;
      net.postData(this, '/administrator/tracks', this.params)
      .then(res=>{
        this.$emit('refresh')
      })
      .catch(error=>{

      }).finally(()=>{
        this.loader = false
      })
    },
    updateTrack: function(){
      this.loader = true;
      net.putData(this, '/administrator/tracks/' + this.data.id , this.params)
      .then(res=>{
        this.$emit('refresh')
      })
      .catch(error=>{
        //TODO
      }).finally(()=>{
        this.loader = false
      })
    }
  }
};
</script>
<style scoped>
@import "../../css/modal.css";
</style>
