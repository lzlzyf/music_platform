import api from '../api/api.js';

export default {
    name: 'MyPlaylist',
    template: `
    <section class="my-playlist">
        <h2 class="section-title">我 的 歌 单</h2>
        <div class="playlist-grid">
            <div 
                class="playlist-item" 
                v-for="playlist in playlists" 
                :key="playlist.id"
                @click="$emit('show-detail', playlist.id)"
            >
                <div class="playlist-cover">
                    <img :src="playlist.cover" :alt="playlist.name">
                    <div class="play-overlay">
                        <i class="play-icon">▶</i>
                        <span class="song-count">{{ playlist.count || 0 }}首</span>
                    </div>
                </div>
                <div class="playlist-info">
                    <h3 class="playlist-name">{{ playlist.name }}</h3>
                    <p class="playlist-creator">by {{ playlist.creator || '我' }}</p>
                </div>
            </div>
            
            <div class="create-playlist" @click="showCreatePlaylistDialog">
                <div class="create-icon">+</div>
                <span>创建新歌单</span>
            </div>
        </div>
        
        <!-- 创建歌单对话框 -->
        <div class="dialog-overlay" v-if="showDialog" @click="closeDialog">
            <div class="dialog" @click.stop>
                <h3>创建新歌单</h3>
                <input 
                    type="text" 
                    v-model="newPlaylistName" 
                    placeholder="请输入歌单名称"
                    @keyup.enter="createPlaylist"
                >
                <div class="dialog-buttons">
                    <button @click="closeDialog">取消</button>
                    <button 
                        class="primary" 
                        @click="createPlaylist"
                        :disabled="!newPlaylistName.trim()"
                    >
                        创建
                    </button>
                </div>
            </div>
        </div>
    </section>
    `,
    data() {
        return {
            playlists: [],
            showDialog: false,
            newPlaylistName: ''
        }
    },
    methods: {
        async fetchPlaylists() {
            try {
                this.playlists = await api.getUserPlaylists();
            } catch (error) {
                console.error('获取歌单失败:', error);
                this.playlists = [];
            }
        },
        showCreatePlaylistDialog() {
            this.showDialog = true;
            this.newPlaylistName = '';
        },
        closeDialog() {
            this.showDialog = false;
        },
        async createPlaylist() {
            if (!this.newPlaylistName.trim()) return;
            
            try {
                await api.createPlaylist(this.newPlaylistName);
                this.closeDialog();
                await this.fetchPlaylists();
                this.$root.$emit('show-message', {
                    type: 'success',
                    text: '歌单创建成功'
                });
            } catch (error) {
                console.error('创建歌单失败:', error);
                this.$root.$emit('show-message', {
                    type: 'error',
                    text: '创建歌单失败，请重试'
                });
            }
        }
    },
    created() {
        this.fetchPlaylists();
    }
} 