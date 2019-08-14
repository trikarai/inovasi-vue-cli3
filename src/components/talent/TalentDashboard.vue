<template>
  <div>

    <!-- <dashboard-stepper /> -->

  </div>
</template>
<script>
import net from "@/config/httpclient";
import Notification from "@/components/Notification";

import DashboardStepper from "@/components/talent/dashboard/stepper/BaseStepper";

export default {
  data: () => ({
    data: ""
  }),
  components: {
    DashboardStepper
  },
  mounted: function() {},
  methods: {}
};
</script>
<style scoped>
</style>
