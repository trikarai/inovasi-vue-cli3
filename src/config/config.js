let baseUri = ""
if(process.env.NODE_ENV === 'production'){
    baseUri = 'http://localhost:8000/api'
}else{
    baseUri = 'http://192.168.100.2/api'
}
export const APIENDPOINT = baseUri
