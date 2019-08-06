let baseUri = ""
if(process.env.NODE_ENV === 'production'){
    baseUri = 'http://103.23.22.223/start.mikti.id/public/api'
    // baseUri = 'http://192.168.100.2/api'
}else{
    baseUri = 'http://192.168.100.8/start.mikti.id/public/api'
    // baseUri = 'http://103.23.22.223/start.mikti.id/public/api'
    // baseUri = 'http://localhost:3000/api'
    baseUri = 'http://localhost:8000/api' 
}
export const APIENDPOINT = baseUri
