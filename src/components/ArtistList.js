import api from '../api/api.js';

export default {
    name: 'ArtistList',
    template: `
    <div class="artist-list">
        <!-- 歌手分类 -->
        <div class="artist-categories">
            <span 
                v-for="category in categories" 
                :key="category.id"
                :class="{ active: currentCategory === category.id }"
                @click="changeCategory(category.id)"
            >
                {{ category.name }}
            </span>
        </div>
        
        <!-- 歌手列表 -->
        <div class="artists-container">
            <div 
                class="artist-item" 
                v-for="artist in filteredArtists" 
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
        
        <!-- 歌手详情弹窗 -->
        <div class="artist-detail-modal" v-if="showDetail">
            <div class="modal-content">
                <span class="close-modal" @click="closeDetail">&times;</span>
                
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
                        :class="{ active: activeTab === 'songs' }" 
                        @click="activeTab = 'songs'"
                    >
                        热门歌曲
                    </div>
                    <div 
                        class="tab" 
                        :class="{ active: activeTab === 'albums' }" 
                        @click="activeTab = 'albums'"
                    >
                        专辑
                    </div>
                    <div 
                        class="tab" 
                        :class="{ active: activeTab === 'mvs' }" 
                        @click="activeTab = 'mvs'"
                    >
                        MV
                    </div>
                    <div 
                        class="tab" 
                        :class="{ active: activeTab === 'info' }" 
                        @click="activeTab = 'info'"
                    >
                        歌手简介
                    </div>
                </div>
                
                <!-- 热门歌曲 -->
                <div class="tab-content" v-if="activeTab === 'songs'">
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
                
                <!-- 专辑 -->
                <div class="tab-content" v-if="activeTab === 'albums'">
                    <div class="album-list">
                        <div class="album-item" v-for="album in currentArtist.albums" :key="album.id">
                            <div class="album-cover">
                                <img :src="album.cover" :alt="album.name">
                            </div>
                            <div class="album-info">
                                <div class="album-name">{{ album.name }}</div>
                                <div class="album-year">{{ album.year }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- MV -->
                <div class="tab-content" v-if="activeTab === 'mvs'">
                    <div class="mv-list">
                        <div class="mv-item" v-for="mv in currentArtist.mvs" :key="mv.id">
                            <div class="mv-cover">
                                <img :src="mv.cover" :alt="mv.name">
                                <div class="mv-play-overlay" @click="playMv(mv)">
                                    <i class="fas fa-play"></i>
                                </div>
                            </div>
                            <div class="mv-info">
                                <div class="mv-name">{{ mv.name }}</div>
                                <div class="mv-date">{{ mv.publishTime }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 歌手简介 -->
                <div class="tab-content" v-if="activeTab === 'info'">
                    <div class="artist-biography">
                        <h3>个人简介</h3>
                        <p v-if="currentArtist.biography">{{ currentArtist.biography }}</p>
                        <p v-else>暂无简介</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            categories: [
                { id: 'all', name: '全部' },
                { id: 'featured', name: '精选' },
                { id: 'mainland', name: '内地' },
                { id: 'hktw', name: '港台' },
                { id: 'western', name: '欧美' },
                { id: 'korean', name: '韩国' }
            ],
            currentCategory: 'all',
            artists: [],
            showDetail: false,
            currentArtist: {},
            activeTab: 'songs'
        };
    },
    computed: {
        filteredArtists() {
            if (this.currentCategory === 'all') {
                return this.artists;
            }
            return this.artists.filter(artist => artist.category === this.currentCategory);
        }
    },
    methods: {
        async fetchArtists() {
            try {
                const response = await api.getArtistList();
                if (response.success) {
                    this.artists = response.data;
                } else {
                    ElMessage({
                        message: '获取歌手列表失败',
                        type: 'error'
                    });
                }
            } catch (error) {
                console.error('获取歌手列表失败:', error);
                ElMessage({
                    message: '获取歌手列表失败',
                    type: 'error'
                });
            }
        },
        changeCategory(categoryId) {
            this.currentCategory = categoryId;
        },
        async showArtistDetail(artist) {
            try {
                const response = await api.getArtistDetail(artist.id);
                if (response.success) {
                    this.currentArtist = response.data;
                    this.showDetail = true;
                    this.activeTab = 'songs';
                } else {
                    ElMessage({
                        message: '获取歌手详情失败',
                        type: 'error'
                    });
                }
            } catch (error) {
                console.error('获取歌手详情失败:', error);
                ElMessage({
                    message: '获取歌手详情失败',
                    type: 'error'
                });
            }
        },
        closeDetail() {
            this.showDetail = false;
        },
        playSong(song) {
            this.$root.$emit('play-song', song);
        },
        playMv(mv) {
            this.$root.$emit('play-mv', mv);
        },
        addToPlaylist(song) {
            if (!this.$root.isLoggedIn) {
                this.$root.$emit('show-login-dialog');
                return;
            }
            this.$root.$emit('show-playlist-dialog', song);
        }
    },
    created() {
        this.fetchArtists();
    }
} 