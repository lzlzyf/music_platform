// 使用全局 axios 变量，因为它是通过 CDN 引入的
// import axios from 'axios';
const axios = window.axios;
import config from '../config/env.js';

// 创建一个显示消息的辅助函数
function showMessage(message, type = 'error') {
    // 使用全局 Vue 实例发送消息
    if (window.vueApp) {
        window.vueApp.$emit('show-message', {
            text: message,
            type: type
        });
    } else {
        // 如果全局实例不可用，使用控制台输出
        console[type](message);
    }
}

// 创建axios实例
const instance = axios.create({
    // 优先使用环境配置中的API基础URL，如果不可用则使用mock服务器地址
    baseURL: config.apiBaseURL || 'http://localhost:3000',
    timeout: config.timeout || 5000
});

// 请求拦截器
instance.interceptors.request.use(
    config => {
        // 在请求发送之前做一些处理
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // 处理请求错误
        console.error('请求错误:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    response => {
        // 处理响应数据
        return response.data;
    },
    error => {
        // 处理响应错误
        console.error('响应错误:', error);
        return Promise.reject(error);
    }
);

export default instance;

