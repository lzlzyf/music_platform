import api from '../api/api.js';

export default {
    name: 'UserProfile',
    template: `
        <div class="user-profile" v-if="show">
            <div class="profile-header">
                <h2>{{ isEditing ? '编辑个人信息' : '个人信息' }}</h2>
                <button class="close-btn" @click="handleClose">&times;</button>
            </div>
            <div class="profile-content">
                <div class="profile-section">
                    <div class="profile-avatar">
                        <img :src="userInfo.avatar || '../assets/images/default-avatar.png'" alt="头像">
                        <button class="change-avatar-btn" @click="changeAvatar" v-if="isEditing">更换头像</button>
                    </div>
                    <div class="profile-info">
                        <div class="info-item">
                            <label>用户名</label>
                            <span class="info-text">{{ userInfo.username }}</span>
                            <small class="info-tip">用户名不可修改</small>
                        </div>
                        <div class="info-item">
                            <label>昵称<span class="required">*</span></label>
                            <span v-if="!isEditing" class="info-text">{{ userInfo.nickname }}</span>
                            <div v-else class="input-wrapper">
                                <input type="text" 
                                       v-model="editedInfo.nickname" 
                                       placeholder="请输入昵称"
                                       maxlength="12">
                                <small class="input-tip">2-12个字符</small>
                            </div>
                        </div>
                        <div class="info-item">
                            <label>性别</label>
                            <span v-if="!isEditing" class="info-text">{{ userInfo.gender }}</span>
                            <div v-else class="radio-group">
                                <label class="radio-label">
                                    <input type="radio" v-model="editedInfo.gender" value="男">
                                    <span>男</span>
                                </label>
                                <label class="radio-label">
                                    <input type="radio" v-model="editedInfo.gender" value="女">
                                    <span>女</span>
                                </label>
                                <label class="radio-label">
                                    <input type="radio" v-model="editedInfo.gender" value="保密">
                                    <span>保密</span>
                                </label>
                            </div>
                        </div>
                        <div class="info-item">
                            <label>音乐爱好</label>
                            <span v-if="!isEditing" class="info-text">{{ userInfo.interests ? userInfo.interests.join('、') : '未设置' }}</span>
                            <div v-else class="input-wrapper">
                                <input type="text" 
                                       v-model="editedInfo.interests" 
                                       placeholder="请输入您的音乐爱好，多个爱好用逗号分隔">
                                <small class="input-tip">例如：流行音乐、摇滚、爵士</small>
                            </div>
                        </div>
                        <div class="info-item">
                            <label>个人简介</label>
                            <span v-if="!isEditing" class="info-text">{{ userInfo.bio || '暂无简介' }}</span>
                            <div v-else class="input-wrapper">
                                <textarea v-model="editedInfo.bio" 
                                          placeholder="写点什么介绍自己吧..."
                                          maxlength="200"></textarea>
                                <small class="input-tip">最多200字</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="profile-stats">
                    <div class="stat-item">
                        <span class="stat-value">{{ userInfo.playlistCount || 0 }}</span>
                        <span class="stat-label">创建的歌单</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">{{ userInfo.likedSongs || 0 }}</span>
                        <span class="stat-label">喜欢的音乐</span>
                    </div>
                </div>
            </div>
            <div class="profile-actions">
                <template v-if="!isEditing">
                    <button class="edit-btn" @click="startEdit">编辑资料</button>
                </template>
                <template v-else>
                    <button class="cancel-btn" @click="cancelEdit">取消</button>
                    <button class="save-btn" @click="saveChanges">保存</button>
                </template>
            </div>
        </div>
    `,
    data() {
        return {
            show: false,
            isEditing: false,
            userInfo: {},
            editedInfo: {
                username: '',
                nickname: '',
                gender: '保密',
                bio: '',
                interests: ''
            },
            hasUnsavedChanges: false
        }
    },
    methods: {
        open() {
            this.show = true;
            this.loadUserInfo();
        },
        handleClose() {
            if (this.isEditing && this.hasUnsavedChanges) {
                if (confirm('您有未保存的修改，确定要退出吗？')) {
                    this.close();
                }
            } else {
                this.close();
            }
        },
        close() {
            this.show = false;
            this.isEditing = false;
            this.hasUnsavedChanges = false;
        },
        async loadUserInfo() {
            try {
                console.log('加载用户信息');
                const response = await api.getUserInfo();
                console.log('获取用户信息响应:', response);
                
                // 根据API文档，检查响应状态
                if (response.code === 0) {
                    if (response.data) {
                        this.userInfo = response.data;
                        console.log('用户信息加载成功:', this.userInfo);
                    } else {
                        console.error('获取用户信息响应中没有data字段');
                        this.$root.$emit('show-message', {
                            type: 'error',
                            text: '获取用户信息失败，请刷新页面重试'
                        });
                    }
                } else {
                    console.error('获取用户信息失败:', response);
                    this.$root.$emit('show-message', {
                        type: 'error',
                        text: response.msg || '获取用户信息失败'
                    });
                    
                    // 如果是未登录状态，关闭个人信息页面
                    if (response.code === 401) {
                        this.close();
                    }
                }
            } catch (error) {
                console.error('获取用户信息失败:', error);
                this.$root.$emit('show-message', {
                    type: 'error',
                    text: error.message || '获取用户信息失败，请稍后重试'
                });
            }
        },
        startEdit() {
            console.log('开始编辑用户资料:', this.userInfo);
            
            // 确保userInfo存在且有基本属性
            if (!this.userInfo || typeof this.userInfo !== 'object') {
                console.error('用户信息不完整，无法编辑');
                this.$root.$emit('show-message', {
                    type: 'error',
                    text: '获取用户信息失败，请刷新页面重试'
                });
                return;
            }
            
            this.editedInfo = {
                username: this.userInfo.username || '',
                nickname: this.userInfo.nickname || '',
                gender: this.userInfo.gender || '保密',
                bio: this.userInfo.bio || '',
                interests: this.userInfo.interests ? this.userInfo.interests.join('、') : ''
            };
            
            console.log('编辑的用户信息:', this.editedInfo);
            this.isEditing = true;
        },
        async saveChanges() {
            console.log('保存用户信息');
            
            if (!this.validateForm()) {
                return;
            }

            try {
                // 根据API文档构建请求数据
                const dataToSave = {
                    id: this.userInfo.id || 0,
                    username: this.userInfo.username || '',
                    password: this.userInfo.password || '', // 通常不应发送密码
                    email: this.editedInfo.email || this.userInfo.email || '',
                    nickname: this.editedInfo.nickname || '',
                    phone: this.editedInfo.phone || this.userInfo.phone || '',
                    avatar: this.userInfo.avatar || '',
                    create_time: this.userInfo.create_time || new Date().toISOString(),
                    // 额外信息，不在API文档中，但可能后端会处理
                    gender: this.editedInfo.gender || '保密',
                    bio: this.editedInfo.bio || '',
                    interests: this.editedInfo.interests
                        ? this.editedInfo.interests.split('、').map(i => i.trim()).filter(i => i)
                        : []
                };
                
                console.log('要保存的数据:', dataToSave);

                const response = await api.updateUserInfo(dataToSave);
                console.log('更新用户信息响应:', response);
                
                // 根据API文档，检查响应状态
                if (response.code === 0) {
                    // 更新成功
                    if (response.data) {
                        this.userInfo = response.data;
                    } else {
                        // 如果响应没有返回完整的用户信息，使用我们的编辑数据更新
                        this.userInfo = {
                            ...this.userInfo,
                            ...this.editedInfo,
                            interests: dataToSave.interests
                        };
                    }
                    
                    this.isEditing = false;
                    this.hasUnsavedChanges = false;
                    
                    // 触发用户信息更新事件
                    this.$root.$emit('user-info-updated', this.userInfo);
                    
                    this.$root.$emit('show-message', {
                        type: 'success',
                        text: response.msg || '个人信息更新成功'
                    });
                } else {
                    // 更新失败
                    console.error('更新用户信息失败:', response);
                    this.$root.$emit('show-message', {
                        type: 'error',
                        text: response.msg || '更新用户信息失败'
                    });
                }
            } catch (error) {
                console.error('更新用户信息失败:', error);
                this.$root.$emit('show-message', {
                    type: 'error',
                    text: error.message || '更新用户信息失败，请稍后重试'
                });
            }
        },
        cancelEdit() {
            if (this.hasUnsavedChanges) {
                if (confirm('确定要放弃修改吗？')) {
                    this.isEditing = false;
                    this.hasUnsavedChanges = false;
                }
            } else {
                this.isEditing = false;
            }
        },
        validateForm() {
            if (!this.editedInfo.nickname || this.editedInfo.nickname.length < 2) {
                this.$root.$emit('show-message', {
                    type: 'error',
                    text: '昵称不能少于2个字符'
                });
                return false;
            }
            return true;
        },
        changeAvatar() {
            // 这里可以添加更换头像的逻辑
            console.log('更换头像功能待实现');
        }
    },
    watch: {
        editedInfo: {
            handler(newVal, oldVal) {
                if (this.isEditing) {
                    this.hasUnsavedChanges = true;
                }
            },
            deep: true
        }
    }
}; 