export const dashboardMixins = {
    computed: {
        checkDashboard: function () {
            if (localStorage.getItem("dashboard") == "talent") {
                return true;
            } else {
                return false;
            }
        }
    }
}
