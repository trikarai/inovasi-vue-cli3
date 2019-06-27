import Axios from "axios";

export default {
    posts(url) {
        return {
            getOne: ({ id }) => Axios.get(`${url}/${id}`),
            getAll: () => Axios.get(url),
            update: (toUpdate) => axios.put(url, toUpdate),
            create: (toCreate) => axios.put(url, toCreate),
            delete: ({ id }) => axios.delete(`${url}/${id}`)
        }
    }

}
