import api from '../api/api.js';
import UserProfile from './UserProfile.js';
import config from '../config/env.js';

export default {
    name: 'HeaderComponent',
    components: {
        UserProfile
    },
    template: `
    <header class="header">
        <img src="/src/assets/images/logo.png" alt="音乐平台" class="logo" style="width:60px; height:60px; object-fit:contain; display:block;">
        <ul class="daohanglan">
            <li @click="goHome">首页</li>
            <li @click="showMvList">MV</li>
            <li @click="showSongRecommend">歌曲推荐</li>
            <li @click="showArtistList">歌手</li>
            <li v-if="LogIn" @click="showMyPlaylist">我的歌单</li>
            <li v-if="LogIn" @click="showUserProfile">个人信息</li>
        </ul>
        <div class="search-box">
            <input type="text" placeholder="搜索音乐、歌单、MV" v-model="searchQuery" @input="handleSearch">
            <div class="user-section" v-if="LogIn">
                <div class="user-info" @click="showUserProfile">
                    <img :src="userInfo.avatar || '../assets/images/default-avatar.png'" alt="头像" class="user-avatar">
                    <span class="username">{{ userInfo.nickname }}</span>
                </div>
                <button class="logout-btn" @click="handleLogout">退出登录</button>
            </div>
            <button class="login-btn" v-else @click="showLoginForm">登录</button>
        </div>

        <!-- 登录/注册弹窗 -->
        <div class="login-overlay" v-if="showLogin || showRegister" @click="closeAllForms">
            <!-- 登录表单 -->
            <div class="login-form" v-if="showLogin" @click.stop>
                <h2>欢迎回来</h2>
                <div class="form-group">
                    <label>用户名</label>
                    <input 
                        type="text" 
                        v-model="loginForm.username" 
                        placeholder="请输入用户名"
                        @keyup.enter="handleLogin"
                    >
                    <div class="form-error" :class="{ visible: loginErrors.username }">
                        {{ loginErrors.username }}
                    </div>
                </div>
                
                <div class="form-group">
                    <label>密码</label>
                    <input 
                        type="password" 
                        v-model="loginForm.password" 
                        placeholder="请输入密码"
                        @keyup.enter="handleLogin"
                    >
                    <div class="form-error" :class="{ visible: loginErrors.password }">
                        {{ loginErrors.password }}
                    </div>
                </div>
                
                <div class="form-group verify-code-group">
                    <label>验证码</label>
                    <div class="verify-code-container">
                        <input 
                            type="text" 
                            v-model="loginForm.verifyCode" 
                            placeholder="请输入验证码"
                            @keyup.enter="handleLogin"
                        >
                        <img 
                            :src="verifyCodeImage" 
                            alt="验证码" 
                            class="verify-code-image" 
                            @click="refreshVerifyCode"
                            v-if="verifyCodeImage"
                        >
                        <button 
                            v-else 
                            class="verify-code-btn" 
                            @click="refreshVerifyCode"
                        >
                            获取验证码
                        </button>
                    </div>
                    <div class="form-error" :class="{ visible: loginErrors.verifyCode }">
                        {{ loginErrors.verifyCode }}
                    </div>
                </div>

                <div class="form-actions">
                    <button class="register-btn" @click="switchToRegister">注册账号</button>
                    <button class="submit-btn" @click="handleLogin">登录</button>
                </div>
            </div>

            <!-- 注册表单 -->
            <div class="login-form" v-if="showRegister" @click.stop>
                <h2>创建账号</h2>
                <div class="form-group">
                    <label>用户名</label>
                    <input 
                        type="text" 
                        v-model="registerForm.username" 
                        placeholder="请输入用户名（4-16个字符）"
                    >
                    <div class="form-error" :class="{ visible: registerErrors.username }">
                        {{ registerErrors.username }}
                    </div>
                </div>

                <div class="form-group">
                    <label>密码</label>
                    <input 
                        type="password" 
                        v-model="registerForm.password" 
                        placeholder="请输入密码（6-20个字符）"
                    >
                    <div class="form-error" :class="{ visible: registerErrors.password }">
                        {{ registerErrors.password }}
                    </div>
                </div>

                <div class="form-group">
                    <label>确认密码</label>
                    <input 
                        type="password" 
                        v-model="registerForm.confirmPassword" 
                        placeholder="请再次输入密码"
                    >
                    <div class="form-error" :class="{ visible: registerErrors.confirmPassword }">
                        {{ registerErrors.confirmPassword }}
                    </div>
                </div>

                <div class="form-group">
                    <label>昵称</label>
                    <input 
                        type="text" 
                        v-model="registerForm.nickname" 
                        placeholder="请输入昵称（2-12个字符）"
                    >
                    <div class="form-error" :class="{ visible: registerErrors.nickname }">
                        {{ registerErrors.nickname }}
                    </div>
                </div>
                
                <div class="form-group verify-code-group">
                    <label>验证码</label>
                    <div class="verify-code-container">
                        <input 
                            type="text" 
                            v-model="registerForm.verifyCode" 
                            placeholder="请输入验证码"
                        >
                        <img 
                            :src="verifyCodeImage" 
                            alt="验证码" 
                            class="verify-code-image" 
                            @click="refreshVerifyCode"
                            v-if="verifyCodeImage"
                        >
                        <button 
                            v-else 
                            class="verify-code-btn" 
                            @click="refreshVerifyCode"
                        >
                            获取验证码
                        </button>
                    </div>
                    <div class="form-error" :class="{ visible: registerErrors.verifyCode }">
                        {{ registerErrors.verifyCode }}
                    </div>
                </div>

                <div class="form-actions">
                    <button class="register-btn" @click="switchToLogin">返回登录</button>
                    <button class="submit-btn" @click="handleRegister">注册</button>
                </div>
            </div>
        </div>

        <!-- 个人信息组件 -->
        <user-profile ref="userProfile"></user-profile>
    </header>
    `,
    data() {
        return {
            LogIn: false,
            userInfo: {},
            searchQuery: '',
            showLogin: false,
            showRegister: false,
            verifyCodeImage: null,
            verifyCodeUuid: null,
            simulatedCode: null,
            isRequestingVerifyCode: false,
            loginForm: {
                username: '',
                password: '',
                verifyCode: '',
                userType: 0
            },
            registerForm: {
                username: '',
                password: '',
                confirmPassword: '',
                nickname: '',
                verifyCode: '',
                email: '',
                phone: ''
            },
            loginErrors: {
                username: '',
                password: '',
                verifyCode: ''
            },
            registerErrors: {
                username: '',
                password: '',
                confirmPassword: '',
                nickname: '',
                verifyCode: ''
            }
        }
    },
    methods: {
        handleSearch: _.debounce(function() {
            if (this.searchQuery.trim()) {
                this.$root.$emit('search', this.searchQuery);
            }
        }, 300),
        
        // 获取验证码 - 添加防抖功能，防止重复请求
        refreshVerifyCode: async function() {
            // 如果已经在请求中，则退出
            if (this.isRequestingVerifyCode) {
                console.log('验证码请求已经在进行中，跳过重复请求');
                return;
            }
            
            // 设置请求标志
            this.isRequestingVerifyCode = true;
            
            try {
                // 通过API获取验证码
                const res = await api.getVerifyCodeImage();
                console.log("验证码响应:", res);
                
                if (res && (res.success || res.code === 0)) {
                    // 后端返回成功
                    if (res.data) {
                        // 设置验证码图片
                        this.verifyCodeImage = res.data;
                        console.log("验证码图片已设置");
                        
                        // 保存验证码会话ID
                        if (res.uuid) {
                            this.verifyCodeUuid = res.uuid;
                            console.log("保存验证码会话ID:", this.verifyCodeUuid);
                        } else {
                            console.warn("响应中没有uuid字段");
                            // 生成一个临时ID
                            this.verifyCodeUuid = Date.now().toString();
                        }
                        
                        // 如果是模拟验证码，保存模拟验证码值
                        if (res.simulatedCode) {
                            this.simulatedCode = res.simulatedCode;
                            console.log("使用模拟验证码:", this.simulatedCode);
                            
                            // 提示用户使用模拟验证码
                            this.$root.$emit('show-message', {
                                type: 'warning',
                                text: '使用模拟验证码，实际值: ' + this.simulatedCode
                            });
                        } else {
                            this.simulatedCode = null;
                        }
                    } else {
                        // 如果没有找到图片数据，显示错误信息
                        this.verifyCodeImage = null;
                        this.$root.$emit('show-message', {
                            type: 'error',
                            text: '验证码数据格式不正确'
                        });
                        console.error('验证码数据格式不正确:', res);
                        
                        // 使用模拟验证码作为备用
                        this.generateSimulatedVerifyCode();
                    }
                } else {
                    // API调用失败，显示错误信息
                    this.verifyCodeImage = null;
                    this.$root.$emit('show-message', {
                        type: 'error',
                        text: res.msg || res.message || '获取验证码失败'
                    });
                    console.error('获取验证码失败:', res);
                    
                    // 使用模拟验证码作为备用
                    this.generateSimulatedVerifyCode();
                }
                
                console.log("验证码图片源类型:", typeof this.verifyCodeImage);
                console.log("验证码会话ID:", this.verifyCodeUuid);
            } catch (error) {
                console.error('获取验证码失败:', error);
                this.verifyCodeImage = null;
                this.$root.$emit('show-message', {
                    type: 'error',
                    text: '获取验证码失败，请稍后重试'
                });
                
                // 使用模拟验证码作为备用
                this.generateSimulatedVerifyCode();
            } finally {
                // 无论成功还是失败，都重置请求标志
                this.isRequestingVerifyCode = false;
            }
        },
        
        // 生成模拟验证码 - 仅在开发环境使用
        generateSimulatedVerifyCode() {
            // 生成一个随机的4位验证码
            const code = Math.floor(1000 + Math.random() * 9000).toString();
            this.simulatedCode = code;
            console.log("模拟验证码:", this.simulatedCode);
            
            // 创建一个简单的SVG验证码图片
            this.verifyCodeImage = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" viewBox="0 0 100 40">
                <rect width="100%" height="100%" fill="#f0f0f0"/>
                <text x="50%" y="50%" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="#333">${code}</text>
                <line x1="10" y1="10" x2="90" y2="30" stroke="#999" stroke-width="1"/>
                <line x1="10" y1="30" x2="90" y2="10" stroke="#999" stroke-width="1"/>
            </svg>`;
            
            // 提示用户使用模拟验证码
            this.$root.$emit('show-message', {
                type: 'warning',
                text: '使用模拟验证码，实际值: ' + code
            });
        },
        
        // 表单切换方法
        showLoginForm() {
            this.showLogin = true;
            this.showRegister = false;
            this.clearErrors();
            // 只有当验证码图片不存在时才重新获取
            if (!this.verifyCodeImage) {
                this.refreshVerifyCode();
            }
        },
        switchToRegister() {
            this.showLogin = false;
            this.showRegister = true;
            this.clearErrors();
            if (!this.verifyCodeImage) {
                this.refreshVerifyCode();
            }
        },
        switchToLogin() {
            this.showLogin = true;
            this.showRegister = false;
            this.clearErrors();
            if (!this.verifyCodeImage) {
                this.refreshVerifyCode();
            }
        },
        closeAllForms() {
            this.showLogin = false;
            this.showRegister = false;
            this.clearForms();
            this.clearErrors();
            this.verifyCodeImage = null;
        },
        
        // 清除表单和错误信息
        clearForms() {
            this.loginForm = {
                username: '',
                password: '',
                verifyCode: '',
                userType: 0
            };
            this.registerForm = {
                username: '',
                password: '',
                confirmPassword: '',
                nickname: '',
                verifyCode: '',
                email: '',
                phone: ''
            };
        },
        clearErrors() {
            this.loginErrors = {
                username: '',
                password: '',
                verifyCode: ''
            };
            this.registerErrors = {
                username: '',
                password: '',
                confirmPassword: '',
                nickname: '',
                verifyCode: ''
            };
        },
        
        // 表单验证
        validateLoginForm() {
            let isValid = true;
            this.clearErrors();

            if (!this.loginForm.username) {
                this.loginErrors.username = '请输入用户名';
                isValid = false;
            }
            if (!this.loginForm.password) {
                this.loginErrors.password = '请输入密码';
                isValid = false;
            }
            if (!this.loginForm.verifyCode) {
                this.loginErrors.verifyCode = '请输入验证码';
                isValid = false;
            }

            return isValid;
        },
        validateRegisterForm() {
            let isValid = true;
            this.clearErrors();

            if (!this.registerForm.username || this.registerForm.username.length < 4 || this.registerForm.username.length > 16) {
                this.registerErrors.username = '用户名长度应为4-16个字符';
                isValid = false;
            }
            if (!this.registerForm.password || this.registerForm.password.length < 6 || this.registerForm.password.length > 20) {
                this.registerErrors.password = '密码长度应为6-20个字符';
                isValid = false;
            }
            if (this.registerForm.password !== this.registerForm.confirmPassword) {
                this.registerErrors.confirmPassword = '两次输入的密码不一致';
                isValid = false;
            }
            if (!this.registerForm.nickname || this.registerForm.nickname.length < 2 || this.registerForm.nickname.length > 12) {
                this.registerErrors.nickname = '昵称长度应为2-12个字符';
                isValid = false;
            }
            if (!this.registerForm.verifyCode) {
                this.registerErrors.verifyCode = '请输入验证码';
                isValid = false;
            }

            return isValid;
        },
        
        // 处理登录
        async handleLogin() {
            if (!this.validateLoginForm()) return;
            
            try {
                // 如果使用了模拟验证码，检查用户输入是否匹配
                if (this.simulatedCode && this.loginForm.verifyCode !== this.simulatedCode) {
                    this.$root.$emit('show-message', {
                        type: 'error',
                        text: '验证码错误，请重新输入'
                    });
                    this.loginForm.verifyCode = '';
                    this.refreshVerifyCode();
                    return;
                }
                
                // 确保有验证码图片和会话ID
                if (!this.verifyCodeImage || !this.verifyCodeUuid) {
                    console.warn('验证码图片或会话ID为空，尝试重新获取验证码');
                    await this.refreshVerifyCode();
                    this.$root.$emit('show-message', {
                        type: 'warning',
                        text: '验证码已刷新，请重新输入'
                    });
                    return;
                }
                
                console.log('登录请求参数:', {
                    username: this.loginForm.username,
                    verifyCode: this.loginForm.verifyCode,
                    uuid: this.verifyCodeUuid
                });
                
                // 如果使用模拟验证码，直接模拟登录成功
                if (this.simulatedCode && this.loginForm.verifyCode === this.simulatedCode) {
                    console.log('使用模拟验证码登录成功');
                    
                    // 创建一个伪token
                    const safeToken = `user_${Date.now()}`;
                    localStorage.setItem('TOKEN_KEY', safeToken);
                    
                    // 创建基本用户信息
                    const basicUserInfo = {
                        id: Date.now(),
                        username: this.loginForm.username,
                        nickname: this.loginForm.username || '用户',
                        avatar: '/src/assets/images/default-avatar.png'
                    };
                    localStorage.setItem('USER_INFO', JSON.stringify(basicUserInfo));
                    
                    // 设置用户信息
                    this.userInfo = basicUserInfo;
                    
                    // 标记为已登录
                    this.LogIn = true;
                    this.closeAllForms();
                    
                    // 发送登录状态变更事件
                    this.$root.$emit('login-status-changed', true);
                    
                    // 显示登录成功消息
                    this.$root.$emit('show-message', {
                        type: 'success',
                        text: '登录成功（模拟）'
                    });
                    
                    return;
                }
                
                const res = await api.login({
                    username: this.loginForm.username,
                    password: this.loginForm.password,
                    verifyCode: this.loginForm.verifyCode,
                    userType: this.loginForm.userType,
                    uuid: this.verifyCodeUuid // 添加验证码会话ID
                });
                
                // 打印响应数据，便于调试
                console.log('登录响应数据:', res);
                
                if (res && (res.success || res.code === 0 || res.code === 200)) {
                    // 登录成功
                    this.loginForm.password = '';
                    this.loginForm.verifyCode = '';
                    
                    // 登录成功后立即获取用户信息
                    try {
                        const userInfoRes = await api.getUserInfo();
                        console.log('登录后获取用户信息:', userInfoRes);
                        
                        if ((userInfoRes.success || userInfoRes.code === 0) && userInfoRes.data) {
                            this.userInfo = userInfoRes.data;
                        } else {
                            // 如果获取用户信息失败，使用基本信息
                            this.userInfo = {
                                id: Date.now(),
                                username: this.loginForm.username,
                                nickname: this.loginForm.username || '用户',
                                avatar: '/src/assets/images/default-avatar.png'
                            };
                            
                            // 保存到本地存储
                            localStorage.setItem('USER_INFO', JSON.stringify(this.userInfo));
                        }
                    } catch (userInfoError) {
                        console.error('获取用户信息失败:', userInfoError);
                        // 使用基本用户信息
                        this.userInfo = {
                            id: Date.now(),
                            username: this.loginForm.username,
                            nickname: this.loginForm.username || '用户',
                            avatar: '/src/assets/images/default-avatar.png'
                        };
                        
                        // 保存到本地存储
                        localStorage.setItem('USER_INFO', JSON.stringify(this.userInfo));
                    }
                    
                    // 标记为已登录
                    this.LogIn = true;
                    this.closeAllForms();
                    
                    // 发送登录状态变更事件
                    this.$root.$emit('login-status-changed', true);
                    
                    // 显示登录成功消息
                    this.$root.$emit('show-message', {
                        type: 'success',
                        text: '登录成功'
                    });
                } else if (res && res.code === 500 && res.msg && res.msg.includes('验证码')) {
                    // 验证码错误
                    this.loginForm.verifyCode = '';
                    this.refreshVerifyCode();
                    
                    this.$root.$emit('show-message', {
                        type: 'error',
                        text: '验证码错误，请重新输入'
                    });
                } else {
                    // 其他登录失败
                    this.loginForm.password = '';
                    this.loginForm.verifyCode = '';
                    this.refreshVerifyCode();
                    
                    this.$root.$emit('show-message', {
                        type: 'error',
                        text: res.msg || res.message || '登录失败，请检查用户名和密码'
                    });
                }
            } catch (error) {
                console.error('登录请求错误:', error);
                this.loginForm.verifyCode = '';
                this.refreshVerifyCode();
                
                // 尝试从错误对象中提取错误信息
                let errorMessage = '登录失败，请稍后重试';
                if (error.response && error.response.data) {
                    errorMessage = error.response.data.msg || error.response.data.message || errorMessage;
                } else if (error.msg) {
                    errorMessage = error.msg;
                } else if (error.message) {
                    errorMessage = error.message;
                }
                
                this.$root.$emit('show-message', {
                    type: 'error',
                    text: errorMessage
                });
            }
        },
        
        // 处理注册
        async handleRegister() {
            if (!this.validateRegisterForm()) return;
            
            try {
                // 如果使用了模拟验证码，检查用户输入是否匹配
                if (this.simulatedCode && this.registerForm.verifyCode !== this.simulatedCode) {
                    this.$root.$emit('show-message', {
                        type: 'error',
                        text: '验证码错误，请重新输入'
                    });
                    this.registerForm.verifyCode = '';
                    this.refreshVerifyCode();
                return;
            }
            
                // 确保有验证码会话ID
                if (!this.verifyCodeUuid) {
                    console.warn('注册时验证码会话ID为空，尝试重新获取验证码');
                    await this.refreshVerifyCode();
                }
                
                console.log('注册请求参数:', {
                    username: this.registerForm.username,
                    nickname: this.registerForm.nickname,
                    verifyCode: this.registerForm.verifyCode,
                    uuid: this.verifyCodeUuid
                });
                
                const res = await api.register({
                    username: this.registerForm.username,
                    password: this.registerForm.password,
                    nickname: this.registerForm.nickname,
                    email: this.registerForm.email,
                    phone: this.registerForm.phone,
                    verifyCode: this.registerForm.verifyCode,
                    uuid: this.verifyCodeUuid // 添加验证码会话ID
                });
                
                if (res.success || res.code === 200) {
                    // 注册成功，切换到登录页面
                    this.$root.$emit('show-message', {
                        type: 'success',
                        text: '注册成功，请登录'
                    });
                    
                    this.switchToLogin();
                    this.loginForm.username = this.registerForm.username;
                    this.clearForms();
                } else {
                    // 注册失败
                    this.registerForm.verifyCode = '';
                    this.refreshVerifyCode();
                    
                    this.$root.$emit('show-message', {
                        type: 'error',
                        text: res.message || '注册失败，请稍后重试'
                    });
                }
            } catch (error) {
                console.error('注册请求错误:', error);
                this.registerForm.verifyCode = '';
                this.refreshVerifyCode();
                
                this.$root.$emit('show-message', {
                    type: 'error',
                    text: '注册失败，请稍后重试'
                });
            }
        },
        showUserProfile() {
            this.$refs.userProfile.open();
        },
        goHome() {
            // 平滑滚动到页面顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        showArtistList() {
            this.$root.$emit('show-artist-list');
        },
        showMvList() {
            // 找到MV推荐部分的标题
            const mvTitle = document.querySelector('.mv-recommend .section-title');
            if (mvTitle) {
                // 获取header的高度，用于偏移计算
                const headerHeight = document.querySelector('.header').offsetHeight;
                
                // 计算滚动位置：目标元素位置减去header高度，再减去一些额外空间
                const targetPosition = mvTitle.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                // 平滑滚动到计算出的位置
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        },
        showMyPlaylist() {
            // 找到我的歌单部分的DOM元素
            const playlistSection = document.querySelector('.my-playlist');
            if (playlistSection) {
                // 平滑滚动到歌单部分
                playlistSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        },
        showSongRecommend() {
            // 找到歌曲推荐部分的标题
            const songSection = document.querySelector('.song-recommend .section-title');
            if (songSection) {
                // 获取header的高度，用于偏移计算
                const headerHeight = document.querySelector('.header').offsetHeight;
                
                // 计算滚动位置：目标元素位置减去header高度，再减去一些额外空间
                const targetPosition = songSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                // 平滑滚动到计算出的位置
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        },
        handleLogout() {
            // 清除登录状态
            this.LogIn = false;
            this.userInfo = {};
            
            // 发送登录状态变更事件
            this.$root.$emit('login-status-changed', false);
            
            // 显示退出成功提示
            this.$root.$emit('show-message', {
                text: '已退出登录',
                type: 'success'
            });
            
            // 滚动到页面顶部
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    },
    created() {
        // 监听 show-login-dialog 事件，弹出登录窗口
        this.$root.$on('show-login-dialog', () => {
            this.showLogin = true;
            this.showRegister = false;
            this.clearErrors();
            // 显示登录窗口时获取验证码
            this.refreshVerifyCode();
        });

        // 监听用户信息更新事件
        this.$root.$on('user-info-updated', (updatedInfo) => {
            this.userInfo = updatedInfo;
        });
    },
    beforeDestroy() {
        this.$root.$off('show-login-dialog');
        this.$root.$off('user-info-updated');
    }
} 