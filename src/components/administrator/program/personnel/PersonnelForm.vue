<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <notification-alert ref="notif" v-bind:err_msg="err_msg" v-bind:status="status" />
          <v-card elevation="0" width="450">
            <v-card-title><h3>{{params.name}}</h3></v-card-title>
            <v-card-text class="pt-4">
              <p>{{params.username}}</p>
              <p>{{params.email}}</p>
            </v-card-text>
            <v-card-actions>
              
              <v-btn @click="assignAsCoordinator(params.id)" small color="blue"> <v-icon small left>add</v-icon>Assign as Coordinator</v-btn>
              <v-btn @click="assignAsMentor(params.id)" small color="blue"> <v-icon small left>add</v-icon>Assign as Mentor</v-btn>

              <v-layout justify-space-between>
                <v-dialog v-model="loader" hide-overlay persistent width="300">
                  <v-card color="primary" dark>
                    <v-card-text>
                      {{ $vuetify.t('$vuetify.info.standby')}}
                      <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-layout>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import net from "@/config/httpclient";
import alert from "@/config/alerthandling";
import notification from "@/components/Notification";

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
      params: {
        id: "user-1-id",
        name: "user name",
        username: "user_1",
        email: "user_1@email.org"
      }
    };
  },
  components: {
    "notification-alert": notification
  },
  created: function() {},
  mounted: function() {
    this.params = this.data;
  },
  methods: {
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
        this.updateData();
      } else {
        this.$vuetify.goTo(this.$refs.notif, {
          duration: 500,
          offset: 0,
          easing: "linear"
        });
      }
    },
    assignAsCoordinator: function(id){
      this.loader = true;
      this.status.error = false;
      net.postData(this, "/administrator/programmes/" + this.$route.params.programId + "/coordinators" , {talentId : id})
      .then(res=>{
        console.log(res);
        this.$emit("oke", res);
      }).catch(error => {
        console.log(error)
        alert.showError(this, error)
      })
      .finally(function(){
        this.loader = false;
      })
    },
    assignAsMentor: function(id){
      this.loader = true;
      this.status.error = false;
      net.postData(this, "/administrator/programmes/" + this.$route.params.programId + "/mentors" , {talentId : id})
      .then(res=>{
        console.log(res);
        this.$emit("close");
      }).catch(error => {
        console.log(error)
        alert.showError(this, error)
      })
      .finally(function(){
        this.loader = false;
      })
    },
  }
};
</script>
<style scoped>
@import "../../../css/modal.css";
</style>
