import Header from './components/Header.js';
import MainContent from './components/MainContent.js';
import api from './api/api.js';

// 创建Vue实例
const app = new Vue({
    el: '#app',
    components: {
        Header,
        MainContent
    },
    template: `
        <div class="app">
            <Header />
            <MainContent />
    </div>
    `,
    data() {
        return {
            isLoggedIn: false,
            currentUser: null
        };
    },
    created() {
        // 检查是否已登录
        const user = localStorage.getItem('currentUser');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.isLoggedIn = true;
        }
        
        // 注册全局事件监听
        this.$on('login-success', (user) => {
            this.isLoggedIn = true;
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.$emit('login-status-changed', true);
            
            // 使用Element UI的消息提示
            window.ElMessage({
                message: '登录成功',
                type: 'success'
            });
        });
        
        this.$on('logout', () => {
            this.isLoggedIn = false;
            this.currentUser = null;
            localStorage.removeItem('currentUser');
            this.$emit('login-status-changed', false);
            
            // 使用Element UI的消息提示
            window.ElMessage({
                message: '已退出登录',
                type: 'info'
            });
        });
        
        // 消息提示事件处理
        this.$on('show-message', (options) => {
            // 使用Element UI的消息提示
            window.ElMessage({
                message: options.text,
                type: options.type || 'info',
                duration: options.duration || 3000,
                showClose: true
            });
        });
        
        // 监听播放歌曲事件
        this.$on('play-song', async (song) => {
            try {
                // 如果song对象中没有完整的url，则通过API获取
                if (!song.url) {
                    const response = await api.getSongUrl(song.id);
                    if ((response.success || response.code === 0) && response.data) {
                        // 兼容新旧API响应格式
                        song.url = response.data.url || response.data.songUrl || '';
                    }
                }
                
                // 将歌曲信息传递给播放条组件
                if (this.$refs.playBar) {
                    this.$refs.playBar.loadSong(song.id);
                }
            } catch (error) {
                console.error('播放歌曲失败:', error);
                // 使用Element UI的消息提示
                ElMessage({
                    message: '播放歌曲失败',
                    type: 'error'
                });
            }
        });
        
        // 将实例暴露为全局变量，方便其他模块访问
        window.vueApp = this;
    }
});

export default app; 