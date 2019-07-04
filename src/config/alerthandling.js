export default {
    showError: function (context, res) {
        if (res.status > 500) {
            context.err_msg = {
                code: res.status,
                type: res.statusText,
                details: ["Internal Server Error"]
            };
        } else if (res.status >= 400) {
            context.err_msg = res.body.meta;
        } else {
            context.err_msg = res.body.meta;
        }
        context.status.error = true;
    },
    showInfo: function (context, res) {
        context.status.info = true;
    },
    showWarning: function (context, res) {
        context.status.warning = true;
    },
    showSuccess: function (context, res, details) {
        context.err_msg = {
            code: res.status,
            type: res.statusText,
            details: details
        };
        context.status.success = true;
    }
}
