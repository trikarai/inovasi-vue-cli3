import axios from 'axios';
import * as config  from "@/config/config";

export default {
    login(value, cb) {
        return new Promise(function (resolve, reject) {
              axios.post(config.APIENDPOINT + '/login/talent', value)
            .then(function (res) {
                resolve(res.data);
            })
            .catch(function (err) {
                reject(err.response.data)
            })
        });
    }
}