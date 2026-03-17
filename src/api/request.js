import axios from "axios"
import { ElMessage } from 'element-plus'
import config from "@/config"

const NETWORK_ERROR = '网络错误...'
const service = axios.create({
    baseURL:config.baseApi,
});
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(
    (res) => {
        // 相应成功后执行
        const { code, data, msg } = res.data
        if(code === 200) {
            // 返回数据
            return data; 
        } else {
            // 提示错误
            ElMessage.error(msg || NETWORK_ERROR);
            return Promise.reject(msg || NETWORK_ERROR);
        }
    }
);

function request(options) {
    // 调用时没指定，则默认使用GET请求
    options.method = options.method || "get";
    // 关于get请求参数调整
    // axios中GET请求参数用params，POST用data
    if(options.method.toLowerCase() === "get") {
        options.params = options.data;
    }
    // 对mock开关做处理
    // 全局配置
    let isMock = config.mock;
    // 单个请求配置
    if(typeof options.mock !== 'undefined') {
        isMock = options.mock
    }
    // 针对环境的处理
    if(config.env === "prod") {
        // 线上环境，不使用mock
        service.defaults.baseURL = config.baseApi;
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
    }
    return service(options);
}

export default request;