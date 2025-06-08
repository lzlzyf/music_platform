/**
 * 环境配置文件
 * 用于配置不同环境下的API基础URL
 */

// 开发环境
const development = {
    apiBaseURL: 'http://localhost:3000', // 本地mock服务器地址
    timeout: 10000
};

// 生产环境
const production = {
    apiBaseURL: 'http://172.20.10.11:3600',
    timeout: 15000
};

// 测试环境
const testing = {
    apiBaseURL: 'http://172.20.10.11:3600',
    timeout: 10000
};

// 根据当前环境选择配置
// 在浏览器环境中，使用window.location来判断当前环境
let env = 'development'; // 默认为开发环境

// 判断当前环境
if (window.location.hostname === 'yourmusic.com' || window.location.hostname.includes('production')) {
    env = 'production';
} else if (window.location.hostname === 'test-api.yourmusic.com' || window.location.hostname.includes('test')) {
    env = 'testing';
}

const configs = {
    development,
    production,
    testing
};

// 导出当前环境的配置
export default configs[env] || development; 