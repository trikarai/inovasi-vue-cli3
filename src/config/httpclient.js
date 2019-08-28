import * as config from './config'
import auth from './auth'

export default {
    loginTalent: function (context, path, params) {
        return context.$http.post(config.APIENDPOINT + path, params)
    },
    loginTalent2: function (context, path, params) {
        context.dialog = true;
        context.alert = false;
        var authUser = {}
        context.$http.post(config.APIENDPOINT + path, params)
            .then(res => {
                context.response = res.data.data;
                authUser.data = res.data.data;
                authUser.role_id = "TALENT";
                authUser.token = res.data.credentials.token;
                authUser.valid_until = res.data.credentials.valid_until;
                context.$store.state.isLoggedIn = true;
                window.localStorage.setItem("lbUser", JSON.stringify(authUser));
                context.$router.replace('/talent/dashboard');
            }).catch(error => {
                context.err_msg = error.body.meta;
                context.alert = true;
            }).finally(() => {
                context.dialog = false
            })
    },
    loginAdministrator: function (context, path, params) {
        return context.$http.post(config.APIENDPOINT + path, params)
    },
    loginAdministrator2: function (context, path, params) {
        var app = context;
        context.dialog = true;
        context.alert = false;
        var authUser = {}
        context.$http.post(config.APIENDPOINT + path, params)
            .then(res => {
                context.response = res.data.data;
                authUser.data = res.data.data;
                authUser.role_id = "ADMIN";
                authUser.token = res.data.credentials.token;
                authUser.valid_until = res.data.credentials.valid_until;
                context.$store.state.isLoggedIn = true;
                window.localStorage.setItem("lbUser", JSON.stringify(authUser));
                context.$router.replace('/administrator/dashboard');
            }).catch(error => {
                context.err_msg = error.body.meta;
                context.alert = true;
                context.dialog = false;
            }).finally(() => {
                app.dialog = false;
            })
    },
    getData: function (context, path) {
        return context.$http.get(config.APIENDPOINT + path, { headers: auth.getAuthHeaders() })
    },
    getDataPublic: function (context, path) {
        return context.$http.get(config.APIENDPOINT + path)
    },
    postData: function (context, path, params) {
        return context.$http.post(config.APIENDPOINT + path, params, { headers: auth.getAuthHeaders() })
    },
    patchData: function (context, path, params) {
        return context.$http.patch(config.APIENDPOINT + path, params, { headers: auth.getAuthHeaders() })
    },
    postDataPublic: function (context, path, params) {
        return context.$http.post(config.APIENDPOINT + path, params)
    },
    putData: function (context, path, params) {
        return context.$http.put(config.APIENDPOINT + path, params, { headers: auth.getAuthHeaders() })
    },
    putDataPublic: function (context, path, params) {
        return context.$http.put(config.APIENDPOINT + path, params)
    },
    deleteData: function (context, path) {
        return context.$http.delete(config.APIENDPOINT + path, { headers: auth.getAuthHeaders() })
    },
    getProgram: function (context, teamId) {
        return context.$http.get(config.APIENDPOINT + "/talent/as-team-member/" + teamId + "/programme-participations?statuses[]=act", { headers: auth.getAuthHeaders() })
    },
    getMentorList: function(context, programId){
        return context.$http.get(config.APIENDPOINT + "/talent/programmes/" + programId + "/mentors", { headers: auth.getAuthHeaders() })
    }
}
