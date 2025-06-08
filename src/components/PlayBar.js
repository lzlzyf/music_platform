import api from '../api/api.js';
// 使用全局变量ElMessage

export default {
    name: 'PlayBar',
    template: `
    <div class="play-bar" :class="{ expanded: isExpanded }">
        <!-- 简洁模式 -->
        <div class="play-bar-simple" v-if="!isExpanded">
            <div class="song-info">
                <img :src="currentSong.cover" :alt="currentSong.name" class="cover" @click="toggleExpand">
                <div class="info-text">
                    <div class="song-name">{{ currentSong.name }}</div>
                    <div class="song-artist">{{ currentSong.artist }}</div>
                </div>
            </div>
            
            <div class="controls">
                <button class="control-btn" @click="togglePlay">
                    <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
                </button>
                <button class="control-btn" @click="toggleExpand">
                    <i class="fas fa-chevron-up"></i>
                </button>
            </div>
            
            <div class="progress-bar">
                <div class="progress" :style="{ width: progress + '%' }"></div>
            </div>
        </div>
        
        <!-- 展开模式 -->
        <div class="play-bar-expanded" v-else>
            <div class="expanded-header">
                <button class="close-btn" @click="toggleExpand">
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="tabs">
                    <div 
                        class="tab" 
                        :class="{ active: activeTab === 'lyrics' }" 
                        @click="activeTab = 'lyrics'"
                    >
                        歌词
                    </div>
                    <div 
                        class="tab" 
                        :class="{ active: activeTab === 'info' }" 
                        @click="activeTab = 'info'"
                    >
                        歌曲信息
                    </div>
                </div>
            </div>
            
            <div class="expanded-content">
                <div class="song-cover-large">
                    <img :src="currentSong.cover" :alt="currentSong.name">
                    <div class="play-overlay" @click="togglePlay">
                        <i :class="isPlaying ? 'fas fa-pause fa-3x' : 'fas fa-play fa-3x'"></i>
                    </div>
                </div>
                
                <div class="song-details">
                    <h2>{{ currentSong.name }}</h2>
                    <p class="artist">歌手：{{ currentSong.artist }}</p>
                    <p class="album" v-if="currentSong.album">专辑：{{ currentSong.album }}</p>
                    
                    <!-- 歌词标签页 -->
                    <div v-if="activeTab === 'lyrics'" class="lyrics-container">
                        <div v-if="!currentSong.lyrics" class="no-lyrics">
                            暂无歌词
                        </div>
                        <div v-else class="lyrics-content">
                            <p 
                                v-for="(line, index) in formattedLyrics" 
                                :key="index"
                                :class="{ active: currentLyricIndex === index }"
                            >
                                {{ line }}
                            </p>
                        </div>
                    </div>
                    
                    <!-- 歌曲信息标签页 -->
                    <div v-if="activeTab === 'info'" class="song-info-container">
                        <p v-if="currentSong.composer"><span>作曲：</span>{{ currentSong.composer }}</p>
                        <p v-if="currentSong.lyricist"><span>作词：</span>{{ currentSong.lyricist }}</p>
                        <p v-if="currentSong.arranger"><span>编曲：</span>{{ currentSong.arranger }}</p>
                        <p v-if="currentSong.publishTime"><span>发行时间：</span>{{ currentSong.publishTime }}</p>
                        <p v-if="currentSong.description"><span>歌曲介绍：</span>{{ currentSong.description }}</p>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="action-btn like-btn" :class="{ active: isLiked }" @click="toggleLike">
                            <i class="fas fa-heart"></i>
                            <span>{{ isLiked ? '已喜欢' : '喜欢' }}</span>
                        </button>
                        <button class="action-btn add-btn" @click="showPlaylistSelector">
                            <i class="fas fa-plus"></i>
                            <span>添加到歌单</span>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="expanded-controls">
                <div class="time-info">{{ formatTime(currentTime) }}</div>
                <div class="progress-container" @click="seekTo">
                    <div class="progress-bg"></div>
                    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
                    <div class="progress-handle" :style="{ left: progress + '%' }"></div>
                </div>
                <div class="time-info">{{ formatTime(duration) }}</div>
            </div>
            
            <div class="control-buttons">
                <button class="control-btn shuffle">
                    <i class="fas fa-random"></i>
                </button>
                <button class="control-btn prev" @click="prevSong">
                    <i class="fas fa-step-backward"></i>
                </button>
                <button class="control-btn play-pause" @click="togglePlay">
                    <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
                </button>
                <button class="control-btn next" @click="nextSong">
                    <i class="fas fa-step-forward"></i>
                </button>
                <button class="control-btn repeat">
                    <i class="fas fa-redo"></i>
                </button>
            </div>
        </div>
        
        <!-- 歌单选择器弹窗 -->
        <div class="playlist-selector" v-if="showingPlaylistSelector">
            <div class="playlist-selector-header">
                <h3>选择歌单</h3>
                <span class="close-selector" @click="showingPlaylistSelector = false">×</span>
            </div>
            <div class="playlist-list">
                <div v-if="userPlaylists.length === 0" class="no-playlists">
                    <p>您还没有创建歌单</p>
                    <button @click="createNewPlaylist">创建歌单</button>
                </div>
                <div v-else class="playlist-items">
                    <div 
                        v-for="playlist in userPlaylists" 
                        :key="playlist.id" 
                        class="playlist-item" 
                        @click="addToPlaylist(playlist.id)"
                    >
                        <img :src="playlist.cover || '/src/assets/images/default-cover.jpg'" alt="歌单封面">
                        <div class="playlist-info">
                            <p class="playlist-name">{{ playlist.name }}</p>
                            <p class="playlist-count">{{ playlist.count }}首歌曲</p>
                        </div>
                    </div>
                    <div class="create-playlist" @click="createNewPlaylist">
                        <i class="fas fa-plus"></i>
                        <p>创建新歌单</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 创建歌单对话框 -->
        <div class="create-playlist-dialog" v-if="showingCreatePlaylist">
            <div class="dialog-header">
                <h3>创建歌单</h3>
                <span class="close-dialog" @click="showingCreatePlaylist = false">×</span>
            </div>
            <div class="dialog-content">
                <div class="form-group">
                    <label>歌单名称</label>
                    <input type="text" v-model="newPlaylistName" placeholder="请输入歌单名称">
                </div>
                <div class="dialog-actions">
                    <button class="cancel" @click="showingCreatePlaylist = false">取消</button>
                    <button class="confirm" @click="confirmCreatePlaylist">创建</button>
                </div>
            </div>
        </div>
        
        <!-- 隐藏的音频元素 -->
        <audio 
            ref="audioPlayer" 
            :src="currentSong.url" 
            @timeupdate="onTimeUpdate" 
            @ended="onPlayEnded"
            @canplay="onCanPlay"
            @error="onPlayError"
        ></audio>
    </div>
    `,
    data() {
        return {
            isExpanded: false,
            isPlaying: false,
            currentTime: 0,
            duration: 0,
            progress: 0,
            activeTab: 'lyrics',
            currentLyricIndex: -1,
            isLiked: false,
            favoriteId: null, // 用于保存收藏ID
            showingPlaylistSelector: false,
            showingCreatePlaylist: false,
            userPlaylists: [],
            newPlaylistName: '',
            currentSong: {
                id: null,
                name: '未播放',
                artist: '未知歌手',
                cover: '/src/assets/images/default-cover.jpg',
                url: '',
                lyrics: '',
                album: '',
                composer: '',
                lyricist: '',
                arranger: '',
                publishTime: '',
                description: ''
            }
        };
    },
    computed: {
        formattedLyrics() {
            if (!this.currentSong.lyrics) return [];
            return this.currentSong.lyrics.split('\n').filter(line => line.trim() !== '');
        }
    },
    methods: {
        async loadSong(songId) {
            try {
                const response = await api.getSongDetail(songId);
                // 检查新的API响应格式
                if (response.success || (response.code === 0 && response.data)) {
                    // 兼容新旧API响应格式
                    const songData = response.data || {};
                    
                    this.currentSong = {
                        id: songData.id || songId,
                        name: songData.name || songData.title || '未知歌曲',
                        artist: songData.artist || songData.artistName || '未知歌手',
                        cover: songData.cover || songData.coverUrl || '/src/assets/images/default-cover.jpg',
                        url: songData.url || songData.songUrl || '',
                        lyrics: songData.lyrics || songData.lyricContent || '',
                        album: songData.album || songData.albumName || '',
                        composer: songData.composer || '',
                        lyricist: songData.lyricist || '',
                        arranger: songData.arranger || '',
                        publishTime: songData.publishTime || '',
                        description: songData.description || ''
                    };
                    
                    // 重置播放状态
                    this.currentTime = 0;
                    this.progress = 0;
                    this.currentLyricIndex = -1;
                    
                    // 如果已经在播放，则自动播放新歌曲
                    if (this.isPlaying) {
                        this.$nextTick(() => {
                            this.$refs.audioPlayer.play();
                        });
                    }
                } else {
                    // 使用Element UI的消息提示
                    ElMessage({
                        message: response.msg || '获取歌曲信息失败',
                        type: 'error'
                    });
                }
            } catch (error) {
                console.error('加载歌曲详情失败:', error);
                // 使用Element UI的消息提示
                ElMessage({
                    message: '加载歌曲详情失败',
                    type: 'error'
                });
            }
        },
        toggleExpand() {
            this.isExpanded = !this.isExpanded;
        },
        togglePlay() {
            if (!this.currentSong.url) {
                // 使用Element UI的消息提示
                ElMessage({
                    message: '当前没有可播放的歌曲',
                    type: 'error'
                });
                return;
            }
            
            const audio = this.$refs.audioPlayer;
            
            if (this.isPlaying) {
                audio.pause();
            } else {
                audio.play().catch(error => {
                    console.error('播放失败:', error);
                    // 使用Element UI的消息提示
                    ElMessage({
                        message: '播放失败，请稍后重试',
                        type: 'error'
                    });
                });
            }
            
            this.isPlaying = !this.isPlaying;
        },
        onTimeUpdate() {
            const audio = this.$refs.audioPlayer;
            this.currentTime = audio.currentTime;
            this.duration = audio.duration || 0;
            this.progress = (this.currentTime / this.duration) * 100 || 0;
            
            // 更新歌词
            if (this.currentSong.lyrics) {
                const lineCount = this.formattedLyrics.length;
                const estimatedIndex = Math.floor((this.currentTime / this.duration) * lineCount);
                this.currentLyricIndex = Math.min(estimatedIndex, lineCount - 1);
            }
        },
        onPlayEnded() {
            this.isPlaying = false;
            this.currentTime = 0;
            this.progress = 0;
            this.currentLyricIndex = -1;
            
            // 可以在这里添加自动播放下一首的逻辑
            this.nextSong();
        },
        onCanPlay() {
            this.duration = this.$refs.audioPlayer.duration;
        },
        onPlayError() {
            this.isPlaying = false;
            // 使用Element UI的消息提示
            ElMessage({
                message: '歌曲加载失败',
                type: 'error'
            });
        },
        formatTime(seconds) {
            if (isNaN(seconds) || !isFinite(seconds)) return '00:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        },
        seekTo(event) {
            if (!this.duration) return;
            
            const container = event.currentTarget;
            const rect = container.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const percentage = offsetX / rect.width;
            
            this.currentTime = this.duration * percentage;
            this.$refs.audioPlayer.currentTime = this.currentTime;
        },
        prevSong() {
            // 这里可以添加播放上一首歌曲的逻辑
            this.$root.$emit('prev-song');
        },
        nextSong() {
            // 这里可以添加播放下一首歌曲的逻辑
            this.$root.$emit('next-song');
        },
        async toggleLike() {
            // 检查用户是否登录
            if (!this.$root.isLoggedIn) {
                this.$root.$emit('show-login-dialog');
                return;
            }
            
            try {
                if (!this.currentSong || !this.currentSong.id) {
                    ElMessage({
                        message: '当前没有播放歌曲',
                        type: 'warning'
                    });
                    return;
                }
                
                const userId = localStorage.getItem('userId') || 0;
                
                if (!this.isLiked) {
                    // 添加到收藏
                    const favoriteData = {
                        user_id: userId,
                        id: 0, // 后端会自动生成
                        type: 1, // 1表示歌曲
                        target_id: this.currentSong.id,
                        create_time: new Date().toISOString()
                    };
                    
                    const result = await api.addFavorite(favoriteData);
                    if (result.code === 0) {
                        this.isLiked = true;
                        this.favoriteId = result.data.id; // 保存收藏ID，用于后续删除
                        ElMessage({
                            message: '已添加到我喜欢的音乐',
                            type: 'success'
                        });
                    } else {
                        ElMessage({
                            message: result.msg || '添加收藏失败',
                            type: 'error'
                        });
                    }
                } else {
                    // 从收藏中移除
                    if (!this.favoriteId) {
                        // 如果没有保存收藏ID，需要先获取
                        const favorites = await api.getFavoriteList(userId);
                        if (favorites.code === 0 && favorites.data) {
                            const favorite = favorites.data.find(
                                item => item.type === 1 && item.target_id === this.currentSong.id
                            );
                            if (favorite) {
                                this.favoriteId = favorite.id;
                            }
                        }
                    }
                    
                    if (this.favoriteId) {
                        const result = await api.removeFavorite(this.favoriteId);
                        if (result.code === 0) {
                            this.isLiked = false;
                            this.favoriteId = null;
                            ElMessage({
                                message: '已从我喜欢的音乐中移除',
                                type: 'success'
                            });
                        } else {
                            ElMessage({
                                message: result.msg || '取消收藏失败',
                                type: 'error'
                            });
                        }
                    } else {
                        this.isLiked = false;
                        ElMessage({
                            message: '无法找到收藏记录',
                            type: 'error'
                        });
                    }
                }
            } catch (error) {
                console.error('收藏操作失败:', error);
                ElMessage({
                    message: '操作失败，请稍后重试',
                    type: 'error'
                });
            }
        },
        async showPlaylistSelector() {
            // 检查用户是否登录
            if (!this.$root.isLoggedIn) {
                this.$root.$emit('show-login-dialog');
                return;
            }
            
            try {
                const response = await api.getUserPlaylists();
                if (response.success) {
                    this.userPlaylists = response.data;
                    this.showingPlaylistSelector = true;
                }
            } catch (error) {
                console.error('获取用户歌单失败:', error);
                // 使用Element UI的消息提示
                ElMessage({
                    message: '获取歌单列表失败',
                    type: 'error'
                });
            }
        },
        async addToPlaylist(playlistId) {
            if (!this.currentSong.id) return;
            
            try {
                const response = await api.addSongToPlaylist(playlistId, this.currentSong.id);
                if (response.success) {
                    // 使用Element UI的消息提示
                    ElMessage({
                        message: '已添加到歌单',
                        type: 'success'
                    });
                    this.showingPlaylistSelector = false;
                } else {
                    // 使用Element UI的消息提示
                    ElMessage({
                        message: response.message || '添加到歌单失败',
                        type: 'error'
                    });
                }
            } catch (error) {
                console.error('添加到歌单失败:', error);
                // 使用Element UI的消息提示
                ElMessage({
                    message: '添加到歌单失败',
                    type: 'error'
                });
            }
        },
        createNewPlaylist() {
            this.showingCreatePlaylist = true;
            this.newPlaylistName = '';
        },
        async confirmCreatePlaylist() {
            if (!this.newPlaylistName.trim()) {
                // 使用Element UI的消息提示
                ElMessage({
                    message: '请输入歌单名称',
                    type: 'error'
                });
                return;
            }
            
            try {
                const response = await api.createPlaylist({
                    name: this.newPlaylistName.trim()
                });
                
                if (response.success) {
                    // 使用Element UI的消息提示
                    ElMessage({
                        message: '歌单创建成功',
                        type: 'success'
                    });
                    
                    // 刷新歌单列表并关闭创建对话框
                    const playlistsResponse = await api.getUserPlaylists();
                    if (playlistsResponse.success) {
                        this.userPlaylists = playlistsResponse.data;
                    }
                    this.showingCreatePlaylist = false;
                    
                    // 如果是从添加歌曲流程来的，自动添加歌曲到新歌单
                    if (this.showingPlaylistSelector && this.userPlaylists.length > 0) {
                        const newPlaylist = this.userPlaylists.find(p => p.name === this.newPlaylistName.trim());
                        if (newPlaylist) {
                            this.addToPlaylist(newPlaylist.id);
                        }
                    }
                } else {
                    // 使用Element UI的消息提示
                    ElMessage({
                        message: response.message || '创建歌单失败',
                        type: 'error'
                    });
                }
            } catch (error) {
                console.error('创建歌单失败:', error);
                // 使用Element UI的消息提示
                ElMessage({
                    message: '创建歌单失败',
                    type: 'error'
                });
            }
        },
        // 检查歌曲是否已收藏
        async checkIfFavorited(songId) {
            try {
                if (!this.$root.isLoggedIn) return;
                
                const userId = localStorage.getItem('userId') || 0;
                const response = await api.getFavoriteList(userId);
                
                if (response.code === 0 && response.data) {
                    const favorite = response.data.find(
                        item => item.type === 1 && item.target_id === songId
                    );
                    
                    if (favorite) {
                        this.isLiked = true;
                        this.favoriteId = favorite.id;
                    } else {
                        this.isLiked = false;
                        this.favoriteId = null;
                    }
                }
            } catch (error) {
                console.error('检查收藏状态失败:', error);
            }
        }
    },
    mounted() {
        // 监听播放歌曲事件
        this.$root.$on('play-song', async song => {
            if (song && song.id) {
                await this.loadSong(song.id);
                this.isPlaying = true;
                
                // 检查歌曲是否已收藏
                this.checkIfFavorited(song.id);
            }
        });
    },
    beforeDestroy() {
        // 清理事件监听
        this.$root.$off('play-song');
        
        // 停止播放
        if (this.$refs.audioPlayer) {
            this.$refs.audioPlayer.pause();
        }
    }
} 