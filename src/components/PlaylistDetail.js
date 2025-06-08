import api from '../api/api.js';

export default {
    name: 'PlaylistDetail',
    props: ['playlistId'],
    data() {
        return {
            playlist: null,
            loading: true
        };
    },
    async created() {
        this.loading = true;
        if (this.playlistId) {
            const playlists = await api.getUserPlaylists();
            this.playlist = playlists.find(p => p.id === this.playlistId);
        }
        this.loading = false;
    },
    watch: {
        playlistId: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    this.fetchPlaylist();
                }
            }
        }
    },
    methods: {
        async fetchPlaylist() {
            this.loading = true;
            const playlists = await api.getUserPlaylists();
            this.playlist = playlists.find(p => p.id === this.playlistId);
            this.loading = false;
        },
        goBack() {
            this.$emit('back');
        }
    },
    template: `
    <div class="playlist-detail-wrapper">
      <div class="playlist-detail" v-if="playlist">
          <button class="back-btn" @click="goBack">返回</button>
          <div class="playlist-header">
              <div class="playlist-info">
                  <h2>{{ playlist.name }}</h2>
                  <p>共 {{ playlist.songs ? playlist.songs.length : 0 }} 首歌</p>
              </div>
          </div>
          <div class="song-list-header">
              <h3>歌曲列表</h3>
          </div>
          <ul class="song-list">
              <template v-if="playlist.songs && playlist.songs.length > 0">
                  <li v-for="song in playlist.songs" :key="song.id" class="song-item">
                      <img :src="song.cover" class="song-cover" alt="封面">
                      <div class="song-meta">
                          <div class="song-name">{{ song.name }}</div>
                          <div class="song-artist">{{ song.artist }}</div>
                      </div>
                  </li>
              </template>
              <li v-else class="no-songs">
                  暂无歌曲，快去添加吧
              </li>
          </ul>
      </div>
      <div v-else-if="loading" class="loading-state">加载中...</div>
      <div v-else class="empty-state">歌单不存在</div>
    </div>
    `
}; 