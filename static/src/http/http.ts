import request from "./request"
const http = new request({
    baseURL:'http://119.45.133.128:8098',
    // baseURL:'http://127.0.0.1:8088',
    timeout:10000
})
export default http