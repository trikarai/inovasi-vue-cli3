export default {
    showError: function (context, res) {
        if (res.status >= 500) {
            context.err_msg = {
                code: res.status,
                type: res.statusText,
                details: ["Internal Server Error | Don't Panic it's not your fault..."]
            };
        } else if (res.status === 405) {
            context.err_msg = {
                code: res.status,
                type: res.statusText,
                details: ["Method Not Allowed"]
            };
        } else if (res.status >= 400) {
            context.err_msg = res.body.meta;
        } else if (res.status >= 300) {
            context.err_msg = res.body.meta;
        } else {
            context.err_msg = res.body.meta;
        }
        context.status.error = true;
    },
    showInfo: function (context, res, details) {
        context.err_msg = {
            code: res.status,
            type: res.statusText,
            details: details
        };
        context.status.info = true;
    },
    showWarning: function (context, res) {
        context.status.warning = true;
        context.err_msg = res.body.meta;
    },
    showSuccess: function (context, res, details) {
        context.err_msg = {
            code: res.status,
            type: res.statusText,
            details: details
        };
        context.status.success = true;
    },
    reset: function (context) {
        context.status = {
            success: false,
            error: false,
            info: false,
            warning: false
        }
    }
}
