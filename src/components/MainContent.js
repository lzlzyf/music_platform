import api from '../api/api.js';
import MyPlaylist from './MyPlaylist.js';
import PlaylistDetail from './PlaylistDetail.js';
import PlayBar from './PlayBar.js';
import ArtistList from './ArtistList.js';
// 使用全局变量ElMessage

export default {
    name: 'MainContent',
    components: {
        MyPlaylist,
        PlaylistDetail,
        PlayBar,
        ArtistList
    },
    template: `
    <main class="main-content" @click="handleMainClick">
        <div v-if="showPlaylistDetail" class="playlist-detail-wrapper">
            <playlist-detail 
                :playlist-id="detailPlaylistId" 
                @back="handleBackFromDetail"
                class="playlist-detail-container"
            />
        </div>
        <template v-else>
            <!-- MV推荐 -->
            <section class="mv-recommend">
                <h2 class="section-title">
                    <span>M</span><span>V</span> 推 荐
                </h2>
                <div class="category-tabs">
                    <span 
                        v-for="category in mvCategories" 
                        :key="category.id"
                        :class="{ active: currentMvCategory === category.id }"
                        @click="changeMvCategory(category.id)"
                    >
                        {{ category.name }}
                    </span>
                </div>
                
                <!-- 轮播图容器 -->
                <div class="lunbo1">
                    <div class="wp">
                        <div class="list" ref="mvList">
                            <div 
                                class="tupian1" 
                                v-for="(group, index) in chunkedMvList" 
                                :key="index"
                                :class="{ active: currentMvPage === index }"
                            >
                                <div class="gedanimage">
                                    <div 
                                        class="mod_index_imgone" 
                                        v-for="mv in group" 
                                        :key="mv.id"
                                        @click="playMv(mv)"
                                    >
                                        <div class="image">
                                            <img :src="mv.cover" :alt="mv.title">
                                            <div class="mask">
                                                <i class="fas fa-play fa-2x"></i>
                                            </div>
                                        </div>
                                        <a class="p1">{{ mv.title }}</a>
                                        <p class="p2">播放量：{{ mv.playCount }}万</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 分页器小圆点 -->
                        <div class="btnlist">
                            <span 
                                v-for="(_, index) in chunkedMvList" 
                                :key="index"
                                :class="{ active: currentMvPage === index }"
                                @click="goToMvPage(index)"
                            ></span>
                        </div>
                    </div>
                    
                    <!-- 左右箭头 -->
                    <div class="aaaa">
                        <div class="fr" @click="prevMvPage">
                            <div id="r"></div>
                        </div>
                        <div class="fz" @click="nextMvPage">
                            <div id="l"></div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 歌曲推荐 -->
            <section class="song-recommend">
                <h2 class="section-title">歌 曲 推 荐</h2>
                <div class="category-tabs">
                    <span 
                        v-for="category in songCategories" 
                        :key="category.id"
                        :class="{ active: currentSongCategory === category.id }"
                        @click="changeSongCategory(category.id)"
                    >
                        {{ category.name }}
                    </span>
                </div>
                <!-- 歌曲轮播图 -->
                <div class="song-carousel">
                    <div class="song-carousel-container">
                        <div class="song-carousel-wrapper" ref="songCarouselWrapper" :style="{ transform: 'translateX(-' + (currentSongPage * 100) + '%)' }">
                            <div 
                                class="song-carousel-page" 
                                v-for="(group, index) in chunkedSongList" 
                                :key="index"
                            >
                <div class="song-list">
                    <div 
                        class="song-item" 
                                        v-for="song in group" 
                        :key="song.id"
                    >
                        <div class="song-cover-container">
                        <img :src="song.cover" :alt="song.name" class="song-cover">
                            <div class="song-play-overlay" @click="playSong(song)">
                                <i class="fas fa-play"></i>
                            </div>
                        </div>
                        <div class="song-info">
                            <div class="song-name">{{ song.name }}</div>
                            <div class="song-artist">{{ song.artist }}</div>
                        </div>
                        <div class="song-action" @click.stop="toggleSongActions(song)">
                            <i class="fas fa-ellipsis-h"></i>
                            <div 
                              class="list2" 
                              v-if="activeActionSongId === song.id"
                              @click.stop
                            >
                              <div class="list2-item" @click="playActionSong(song)">播放</div>
                              <div class="list2-item" @click="addToPlaylistAction(song)">加入歌单</div>
                            </div>
                        </div>
                    </div>
                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 轮播图导航按钮 -->
                    <div class="song-carousel-controls">
                        <div class="song-prev-btn" @click="prevSongPage">
                            <i class="fas fa-chevron-left"></i>
                        </div>
                        <div class="song-next-btn" @click="nextSongPage">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </div>
                    
                    <!-- 轮播图指示器 -->
                    <div class="song-carousel-indicators">
                        <span 
                            v-for="(_, index) in chunkedSongList" 
                            :key="index"
                            :class="{ active: currentSongPage === index }"
                            @click="goToSongPage(index)"
                        ></span>
                    </div>
                </div>

            <!-- 歌手列表 -->
            <section id="artist-section" class="artist-section">
                <h2 class="section-title">歌 手 列 表</h2>
                    
                    <!-- 歌手分类 -->
                    <div class="artist-categories">
                        <span 
                            v-for="category in artistCategories" 
                            :key="category.id"
                            :class="{ active: currentArtistCategory === category.id }"
                            @click="changeArtistCategory(category.id)"
                        >
                            {{ category.name }}
                        </span>
                    </div>
                    
                    <!-- 歌手轮播图 -->
                    <div class="artist-carousel">
                        <div class="loading-overlay" v-if="loadingArtists">
                            <div class="loading-spinner"></div>
                            <div class="loading-text">加载中...</div>
                        </div>
                        <div class="empty-state" v-if="!loadingArtists && (!artistList || artistList.length === 0)">
                            <i class="fas fa-user-slash"></i>
                            <p>暂无歌手数据</p>
                        </div>
                        <div class="artist-carousel-container">
                            <div class="artist-carousel-wrapper" ref="artistCarouselWrapper" :style="{ transform: 'translateX(-' + (currentArtistPage * 100) + '%)' }">
                                <div 
                                    class="artist-carousel-page" 
                                    v-for="(group, index) in chunkedArtistList" 
                                    :key="index"
                                >
                                    <div class="artists-grid">
                                        <div 
                                            class="artist-item" 
                                            v-for="artist in group" 
                                            :key="artist.id"
                                            @click="showArtistDetail(artist)"
                                        >
                                            <div class="artist-avatar">
                                                <img :src="artist.avatar" :alt="artist.name">
                                            </div>
                                            <div class="artist-info">
                                                <h3 class="artist-name">{{ artist.name }}</h3>
                                                <p class="artist-desc">{{ artist.description }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 轮播图导航按钮 -->
                        <div class="artist-carousel-controls">
                            <div class="artist-prev-btn" @click="prevArtistPage">
                                <i class="fas fa-chevron-left"></i>
                            </div>
                            <div class="artist-next-btn" @click="nextArtistPage">
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                        
                        <!-- 轮播图指示器 -->
                        <div class="artist-carousel-indicators">
                            <span 
                                v-for="(_, index) in chunkedArtistList" 
                                :key="index"
                                :class="{ active: currentArtistPage === index }"
                                @click="goToArtistPage(index)"
                            ></span>
                        </div>
                    </div>
                    
                    <!-- 歌手详情弹窗 -->
                    <div class="artist-detail-modal" v-if="showArtistDetailModal">
                        <div class="modal-content">
                            <span class="close-modal" @click="closeArtistDetail">&times;</span>
                            
                            <div class="artist-header">
                                <img :src="currentArtist.avatar" :alt="currentArtist.name" class="artist-avatar-large">
                                <div class="artist-header-info">
                                    <h2>{{ currentArtist.name }}</h2>
                                    <p class="artist-alias" v-if="currentArtist.alias">{{ currentArtist.alias }}</p>
                                    <p class="artist-stats">
                                        <span>单曲数: {{ currentArtist.songCount || 0 }}</span>
                                        <span>专辑数: {{ currentArtist.albumCount || 0 }}</span>
                                        <span>MV数: {{ currentArtist.mvCount || 0 }}</span>
                                    </p>
                                </div>
                            </div>
                            
                            <div class="artist-tabs">
                                <div 
                                    class="tab" 
                                    :class="{ active: activeArtistTab === 'songs' }" 
                                    @click="activeArtistTab = 'songs'"
                                >
                                    热门歌曲
                                </div>
                                <div 
                                    class="tab" 
                                    :class="{ active: activeArtistTab === 'info' }" 
                                    @click="activeArtistTab = 'info'"
                                >
                                    歌手简介
                                </div>
                            </div>
                            
                            <!-- 热门歌曲 -->
                            <div class="tab-content" v-if="activeArtistTab === 'songs'">
                                <div class="song-list">
                                    <div class="song-item" v-for="(song, index) in currentArtist.hotSongs" :key="song.id">
                                        <div class="song-index">{{ index + 1 }}</div>
                                        <div class="song-info">
                                            <div class="song-name">{{ song.name }}</div>
                                            <div class="song-album" v-if="song.album">{{ song.album }}</div>
                                        </div>
                                        <div class="song-actions">
                                            <button class="play-btn" @click="playSong(song)">
                                                <i class="fas fa-play"></i>
                                            </button>
                                            <button class="add-btn" @click="addToPlaylist(song)">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- 歌手简介 -->
                            <div class="tab-content" v-if="activeArtistTab === 'info'">
                                <div class="artist-biography">
                                    <h3>个人简介</h3>
                                    <p v-if="currentArtist.biography">{{ currentArtist.biography }}</p>
                                    <p v-else>暂无简介</p>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>

            <!-- 加入歌单弹窗 -->
            <div class="dialog-overlay" v-if="showAddToPlaylistDialog" @click="showAddToPlaylistDialog=false">
              <div class="dialog" @click.stop>
                <h3>选择歌单</h3>
                <ul>
                  <li v-for="playlist in playlists" :key="playlist.id">
                    <button @click="confirmAddToPlaylist(playlist)">{{ playlist.name }}</button>
                  </li>
                </ul>
                <input v-model="newPlaylistName" placeholder="新建歌单名称">
                <button @click="createAndAddToPlaylist" :disabled="!newPlaylistName.trim()">新建并添加</button>
                <button @click="showAddToPlaylistDialog=false">取消</button>
              </div>
            </div>

            <!-- 我的歌单 -->
            <my-playlist v-if="isLoggedIn" @show-detail="handleShowPlaylistDetail" />
            </section>
        </template>
        
        <!-- 播放条组件 -->
        <play-bar v-if="showPlayBar" ref="playBar" />
    </main>
    `,
    data() {
        return {
            isLoggedIn: false,
            currentMvCategory: 'featured',
            mvCategories: [
                { id: 'featured', name: '精选' },
                { id: 'mainland', name: '内地' },
                { id: 'hktw', name: '港台' },
                { id: 'western', name: '欧美' },
                { id: 'korean', name: '韩国' }
            ],
            mvList: [],
            songList: [],
            currentMvPage: 0,
            mvPerPage: 5,
            activeActionSongId: null,
            actionSong: null,
            showAddToPlaylistDialog: false,
            playlists: [],
            newPlaylistName: '',
            showPlaylistDetail: false,
            detailPlaylistId: null,
            showPlayBar: false,
            currentSongCategory: 'featured',
            songCategories: [
                { id: 'featured', name: '精选' },
                { id: 'mainland', name: '内地' },
                { id: 'hktw', name: '港台' },
                { id: 'western', name: '欧美' },
                { id: 'korean', name: '韩国' }
            ],
            currentSongPage: 0,
            songPerPage: 3,
            artistList: [],
            currentArtistPage: 0,
            artistPerPage: 8,
            showArtistDetailModal: false,
            currentArtist: {},
            artistCategories: [
                { id: 'all', name: '全部' },
                { id: 'featured', name: '精选' },
                { id: 'mainland', name: '内地' },
                { id: 'hktw', name: '港台' },
                { id: 'western', name: '欧美' },
                { id: 'korean', name: '韩国' }
            ],
            currentArtistCategory: 'all',
            activeArtistTab: 'songs',
            loadingArtists: false
        }
    },
    computed: {
        chunkedMvList() {
            const chunks = [];
            for (let i = 0; i < this.mvList.length; i += this.mvPerPage) {
                chunks.push(this.mvList.slice(i, i + this.mvPerPage));
            }
            return chunks;
        },
        chunkedSongList() {
            const chunks = [];
            for (let i = 0; i < this.songList.length; i += this.songPerPage) {
                chunks.push(this.songList.slice(i, i + this.songPerPage));
            }
            return chunks;
        },
        filteredArtistList() {
            if (this.currentArtistCategory === 'all') {
                return this.artistList;
            }
            return this.artistList.filter(artist => artist.category === this.currentArtistCategory);
        },
        chunkedArtistList() {
            const chunks = [];
            const filtered = this.filteredArtistList;
            for (let i = 0; i < filtered.length; i += this.artistPerPage) {
                chunks.push(filtered.slice(i, i + this.artistPerPage));
            }
            return chunks;
        }
    },
    methods: {
        async changeMvCategory(categoryId) {
            this.currentMvCategory = categoryId;
            this.mvList = await api.getMvList(categoryId);
            this.currentMvPage = 0;
            this.$nextTick(() => {
                this.updateMvSliderPosition();
            });
        },
        async fetchSongList() {
            // 首先设置默认数据，以防API调用失败
            const defaultSongs = this.getDefaultSongs();
            
            try {
                const response = await api.getRecommendSongs(this.currentSongCategory);
                if (response && response.success && Array.isArray(response.data)) {
                    // 如果API返回了有效数据，则更新歌曲列表
                    this.songList = response.data.length > 0 ? response.data : defaultSongs;
                } else {
                    console.error('获取推荐歌曲失败:', response ? response.message : '未知错误');
                    // 使用默认数据
                    this.songList = defaultSongs;
                }
            } catch (error) {
                console.error('获取推荐歌曲失败:', error);
                // 使用默认数据
                this.songList = defaultSongs;
            }
        },
        // 获取默认歌曲数据
        getDefaultSongs() {
            return [
                { id: 1, name: '默认歌曲1', artist: '未知歌手', cover: '/src/assets/images/default-cover.jpg' },
                { id: 2, name: '默认歌曲2', artist: '未知歌手', cover: '/src/assets/images/default-cover.jpg' },
                { id: 3, name: '默认歌曲3', artist: '未知歌手', cover: '/src/assets/images/default-cover.jpg' },
                { id: 4, name: '默认歌曲4', artist: '未知歌手', cover: '/src/assets/images/default-cover.jpg' },
                { id: 5, name: '默认歌曲5', artist: '未知歌手', cover: '/src/assets/images/default-cover.jpg' }
            ];
        },
        formatPlayCount(count) {
            return count >= 10000 ? (count / 10000).toFixed(1) + '万' : count;
        },
        playMv(mv) {
            this.$root.$emit('play-mv', mv);
        },
        playSong(song) {
            // 确保播放条显示
            this.showPlayBar = true;
            
            // 等待DOM更新后发送播放事件
            this.$nextTick(() => {
                // 检查歌曲对象是否包含必要的属性
                if (song && song.id) {
                    this.$root.$emit('play-song', song);
                } else {
                    // 使用Element UI的消息提示
                    ElMessage({
                        message: '无效的歌曲数据',
                        type: 'error'
                    });
                }
            });
        },
        addToPlaylist(song) {
            if (!this.isLoggedIn) {
                this.$root.$emit('show-login-dialog');
                return;
            }
            this.$root.$emit('show-playlist-dialog', song);
        },
        goToMvPage(index) {
            this.currentMvPage = index;
            this.updateMvSliderPosition();
        },
        prevMvPage() {
            this.currentMvPage = (this.currentMvPage - 1 + this.chunkedMvList.length) % this.chunkedMvList.length;
            this.updateMvSliderPosition();
        },
        nextMvPage() {
            this.currentMvPage = (this.currentMvPage + 1) % this.chunkedMvList.length;
            this.updateMvSliderPosition();
        },
        updateMvSliderPosition() {
            if (this.$refs.mvList) {
                const offset = -this.currentMvPage * 100;
                this.$refs.mvList.style.transform = 'translateX(' + offset + '%)';
            }
        },
        toggleSongActions(song) {
            this.activeActionSongId = this.activeActionSongId === song.id ? null : song.id;
        },
        handleMainClick() {
            this.activeActionSongId = null;
        },
        playActionSong(song) {
            this.playSong(song);
            this.activeActionSongId = null;
        },
        async addToPlaylistAction(song) {
            if (!this.isLoggedIn) {
                this.$root.$emit('show-login-dialog');
                this.activeActionSongId = null;
                return;
            }
            this.actionSong = song;
            this.activeActionSongId = null;
            this.showAddToPlaylistDialog = true;
            this.playlists = await api.getUserPlaylists();
        },
        async confirmAddToPlaylist(playlist) {
            try {
                const response = await api.addSongToPlaylist(playlist.id, this.actionSong.id);
                console.log('添加歌曲到歌单响应:', response);
                
                this.showAddToPlaylistDialog = false;
                
                if (response && response.success) {
                    // 使用Element UI的消息提示
                    ElMessage({
                        message: response.msg || '添加成功',
                        type: 'success'
                    });
                } else {
                    // 添加失败
                    ElMessage({
                        message: response.msg || '添加失败',
                        type: 'error'
                    });
                }
            } catch (error) {
                console.error('添加到歌单失败:', error);
                // 使用Element UI的消息提示
                ElMessage({
                    message: error.message || '添加到歌单失败',
                    type: 'error'
                });
            }
        },
        async createAndAddToPlaylist() {
            if (!this.newPlaylistName.trim()) return;
            
            try {
                // 创建新歌单
                const newPlaylist = await api.createPlaylist(this.newPlaylistName);
                console.log('创建歌单响应:', newPlaylist);
                
                if (!newPlaylist || !newPlaylist.id) {
                    throw new Error('创建歌单失败');
                }
                
                // 添加歌曲到新歌单
                const response = await api.addSongToPlaylist(newPlaylist.id, this.actionSong.id);
                console.log('添加歌曲到新歌单响应:', response);
                
                this.showAddToPlaylistDialog = false;
                this.newPlaylistName = ''; // 清空输入框
                
                // 使用Element UI的消息提示
                ElMessage({
                    message: '新建并添加成功',
                    type: 'success'
                });
            } catch (error) {
                console.error('创建歌单或添加歌曲失败:', error);
                // 使用Element UI的消息提示
                ElMessage({
                    message: error.message || '操作失败',
                    type: 'error'
                });
            }
        },
        handleShowPlaylistDetail(playlistId) {
            this.showPlaylistDetail = true;
            this.detailPlaylistId = playlistId;
        },
        handleBackFromDetail() {
            this.showPlaylistDetail = false;
            this.detailPlaylistId = null;
        },
        changeSongCategory(categoryId) {
            this.currentSongCategory = categoryId;
            this.fetchSongList();
        },
        goToSongPage(index) {
            this.currentSongPage = index;
            this.updateSongSliderPosition();
        },
        prevSongPage() {
            this.currentSongPage = (this.currentSongPage - 1 + this.chunkedSongList.length) % this.chunkedSongList.length;
            this.updateSongSliderPosition();
        },
        nextSongPage() {
            this.currentSongPage = (this.currentSongPage + 1) % this.chunkedSongList.length;
            this.updateSongSliderPosition();
        },
        updateSongSliderPosition() {
            if (this.$refs.songCarouselWrapper) {
                const offset = -this.currentSongPage * 100;
                this.$refs.songCarouselWrapper.style.transform = 'translateX(' + offset + '%)';
            }
        },
        showArtistDetail(artist) {
            this.showArtistDetailModal = true;
            this.currentArtist = artist;
        },
        closeArtistDetail() {
            this.showArtistDetailModal = false;
            this.currentArtist = {};
        },
        prevArtistPage() {
            this.currentArtistPage = (this.currentArtistPage - 1 + this.chunkedArtistList.length) % this.chunkedArtistList.length;
            this.updateArtistSliderPosition();
        },
        nextArtistPage() {
            this.currentArtistPage = (this.currentArtistPage + 1) % this.chunkedArtistList.length;
            this.updateArtistSliderPosition();
        },
        updateArtistSliderPosition() {
            if (this.$refs.artistCarouselWrapper) {
                const offset = -this.currentArtistPage * 100;
                this.$refs.artistCarouselWrapper.style.transform = 'translateX(' + offset + '%)';
            }
        },
        goToArtistPage(index) {
            this.currentArtistPage = index;
            this.updateArtistSliderPosition();
        },
        async fetchArtistList() {
            this.loadingArtists = true;
            try {
                const response = await api.getArtistList();
                if (response.success) {
                    this.artistList = response.data;
                } else {
                    console.error('获取歌手列表失败:', response.message);
                    this.artistList = [];
                }
            } catch (error) {
                console.error('获取歌手列表失败:', error);
                this.artistList = [];
            } finally {
                this.loadingArtists = false;
            }
        },
        changeArtistCategory(categoryId) {
            this.currentArtistCategory = categoryId;
            this.fetchArtistList();
        }
    },
    async created() {
        try {
            this.mvList = await api.getMvList(this.currentMvCategory);
            await this.fetchSongList();
            await this.fetchArtistList();
            
            // 监听登录状态变化
            this.$root.$on('login-status-changed', (status) => {
                this.isLoggedIn = status;
            });
            // 监听导航栏"我的歌单"点击
            this.$root.$on('show-my-playlist', async () => {
                // 默认展示第一个歌单详情
                const playlists = await api.getUserPlaylists();
                if (playlists.length > 0) {
                    this.handleShowPlaylistDetail(playlists[0].id);
                } else {
                    this.showPlaylistDetail = false;
                }
            });
            // 监听导航栏"歌手"点击
            this.$root.$on('show-artist-list', () => {
                // 滚动到歌手部分
                this.$nextTick(() => {
                    const artistSection = document.getElementById('artist-section');
                    if (artistSection) {
                        // 获取header的高度，用于偏移计算
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        
                        // 计算滚动位置：目标元素位置减去header高度，再减去一些额外空间
                        const targetPosition = artistSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                        
                        // 平滑滚动到计算出的位置
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        } catch (error) {
            console.error('加载数据失败:', error);
        }
    }
} 