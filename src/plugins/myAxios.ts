// Set config defaults when creating the instance
import axios from "axios";

const myAxios = axios.create({
    //上线记得改服务器地址
    baseURL: 'http://localhost:8686/api'
});
myAxios.defaults.withCredentials = true;


// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // console.log('我要发请求了',config)
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // console.log('我收到相应了',response)
    // 对响应数据做点什么
    if (response?.data?.code === 41000){
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

//将axios导出
export default myAxios;

