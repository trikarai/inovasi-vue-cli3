<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop>
            <div>
                
            </div>    
            <v-btn color="red"><v-icon></v-icon>Yes</v-btn>
            <v-btn><v-icon></v-icon>No</v-btn>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["id", "edit", "view"],
  data: function() {
    return {};
  }
};
</script>
<style scoped>
@import "./css/modal.css";
</style>
