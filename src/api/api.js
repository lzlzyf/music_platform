import * as userService from './services/userService.js';
import * as mvService from './services/mvService.js';
import * as songService from './services/songService.js';
import * as playlistService from './services/playlistService.js';
import * as artistService from './services/artistService.js';
import * as favoriteService from './services/favoriteService.js';
import instance from '../utils/request.js';

// 模拟API接口
// 歌单数据持久化
let userInfo = {
    id: 123,
    username: 'user',
    nickname: '音乐爱好者',
    avatar: '/src/assets/images/default-avatar.png',
    gender: '保密',
    interests: ['流行音乐', '摇滚音乐'],
    bio: '热爱音乐，热爱生活'
};

let allSongs = [
    { id: 1, name: '热门歌曲1', artist: '歌手1', cover: '/src/assets/images/default-cover.jpg' },
    { id: 2, name: '热门歌曲2', artist: '歌手2', cover: '/src/assets/images/default-cover.jpg' },
    { id: 3, name: '热门歌曲3', artist: '歌手3', cover: '/src/assets/images/default-cover.jpg' },
    { id: 4, name: '热门歌曲4', artist: '歌手4', cover: '/src/assets/images/default-cover.jpg' },
    { id: 5, name: '热门歌曲5', artist: '歌手5', cover: '/src/assets/images/default-cover.jpg' },
    { id: 6, name: '热门歌曲1', artist: '歌手1', cover: '/src/assets/images/default-cover.jpg' },
    { id: 7, name: '热门歌曲2', artist: '歌手2', cover: '/src/assets/images/default-cover.jpg' },
    { id: 8, name: '热门歌曲3', artist: '歌手3', cover: '/src/assets/images/default-cover.jpg' },
    { id: 9, name: '热门歌曲4', artist: '歌手4', cover: '/src/assets/images/default-cover.jpg' }
];

let userPlaylists = [
    {
        id: 1,
        name: '我的歌单1',
        cover: '/src/assets/images/default-cover.jpg',
        count: 2,
        songs: [allSongs[0], allSongs[1]]
    },
    {
        id: 2,
        name: '我的歌单2',
        cover: '/src/assets/images/default-cover.jpg',
        count: 1,
        songs: [allSongs[2]]
    },
    {
        id: 3,
        name: '我的歌单3',
        cover: '/src/assets/images/default-cover.jpg',
        count: 0,
        songs: []
    }
];

function saveToLocal() {
    localStorage.setItem('userPlaylists', JSON.stringify(userPlaylists));
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}
function loadFromLocal() {
    const playlists = localStorage.getItem('userPlaylists');
    if (playlists) userPlaylists = JSON.parse(playlists);
    const info = localStorage.getItem('userInfo');
    if (info) userInfo = JSON.parse(info);
}

// 初始化时加载本地数据
loadFromLocal();

// API集中管理
const api = {
    // 用户相关
    login: async (userData) => {
        try {
            return await userService.login(userData);
        } catch (error) {
            console.error('登录失败:', error);
            return { success: false, message: '登录失败，请稍后重试' };
        }
    },
    register: async (userData) => {
        try {
            return await userService.register(userData);
        } catch (error) {
            console.error('注册失败:', error);
            return { success: false, message: '注册失败，请稍后重试' };
        }
    },
    getUserInfo: async () => {
        try {
            return await userService.getUserInfo();
        } catch (error) {
            console.error('获取用户信息失败:', error);
            return { success: false, message: '获取用户信息失败' };
        }
    },
    updateUserInfo: async (userData) => {
        try {
            console.log('更新用户信息:', userData);
            return await userService.updateUserInfo(userData);
        } catch (error) {
            console.error('更新用户信息失败:', error);
            return { success: false, message: '更新用户信息失败' };
        }
    },
    getVerifyCodeImage: async () => {
        try {
            return await userService.getVerifyCodeImage();
        } catch (error) {
            console.error('获取验证码失败:', error);
            return { success: false, message: '获取验证码失败' };
        }
    },
    
    // 歌曲相关
    getRecommendSongs: async (category = 'featured') => {
        try {
            // 使用本地mock数据
            return await songService.getRecommendSongs(category);
        } catch (error) {
            console.error('获取推荐歌曲失败:', error);
            return { success: false, message: '获取推荐歌曲失败', data: [] };
        }
    },
    getSongList: async (params) => {
        try {
            // 使用SimplePlayController的/sms/simplePlay/songs接口
            return await songService.getSongList(params);
        } catch (error) {
            console.error('获取歌曲列表失败:', error);
            return { success: false, message: '获取歌曲列表失败', data: [] };
        }
    },
    getSongDetail: async (songId) => {
        try {
            // 使用SimplePlayController的/sms/simplePlay/song/{songId}接口
            return await songService.getSongDetail(songId);
        } catch (error) {
            console.error('获取歌曲详情失败:', error);
            return { success: false, message: '获取歌曲详情失败', data: null };
        }
    },
    getSongUrl: async (songId) => {
        try {
            // 使用SimplePlayController的/sms/simplePlay/song/{songId}接口获取歌曲URL
            return await songService.getSongUrl(songId);
        } catch (error) {
            console.error('获取歌曲URL失败:', error);
            return { success: false, message: '获取歌曲URL失败', data: null };
        }
    },
    getLyrics: async (songId) => {
        try {
            return await songService.getLyrics(songId);
        } catch (error) {
            console.error('获取歌词失败:', error);
            return { success: false, message: '获取歌词失败', data: null };
        }
    },
    
    // MV相关
    getMvList: async (category) => {
        try {
            const response = await mvService.getMvList(category);
            return response;
        } catch (error) {
            console.error('获取MV列表失败:', error);
            return [];
        }
    },
    
    // 歌单相关
    getUserPlaylists: async () => {
        try {
            const response = await playlistService.getUserPlaylists();
            return response;
        } catch (error) {
            console.error('获取用户歌单失败:', error);
            return { success: false, message: '获取用户歌单失败', data: [] };
        }
    },
    getPlaylistDetail: async (playlistId) => {
        try {
            const response = await playlistService.getPlaylistDetail(playlistId);
            return response;
        } catch (error) {
            console.error('获取歌单详情失败:', error);
            return { success: false, message: '获取歌单详情失败', data: null };
        }
    },
    createPlaylist: async (playlistData) => {
        try {
            const response = await playlistService.createPlaylist(playlistData);
            return response;
        } catch (error) {
            console.error('创建歌单失败:', error);
            return { success: false, message: '创建歌单失败' };
        }
    },
    addSongToPlaylist: async (playlistId, songId) => {
        try {
            console.log('添加歌曲到歌单:', { playlistId, songId });
            const response = await playlistService.addSongToPlaylist(playlistId, songId);
            
            if (response.success) {
                console.log('添加歌曲到歌单成功:', response);
                return response;
            } else {
                console.error('添加歌曲到歌单失败:', response);
                return response;
            }
        } catch (error) {
            console.error('添加歌曲到歌单出错:', error);
            return { 
                success: false, 
                message: error.message || '添加歌曲到歌单失败',
                data: null
            };
        }
    },

    // 歌手相关
    getArtistList: async () => {
        try {
            const response = await artistService.getArtistList();
            return response;
        } catch (error) {
            console.error('获取歌手列表失败:', error);
            return { success: false, message: '获取歌手列表失败', data: [] };
        }
    },
    getArtistDetail: async (artistId) => {
        try {
            const response = await artistService.getArtistDetail(artistId);
            return response;
        } catch (error) {
            console.error('获取歌手详情失败:', error);
            return { success: false, message: '获取歌手详情失败', data: null };
        }
    },
    
    // 收藏相关
    addFavorite: async (favoriteData) => {
        try {
            const response = await favoriteService.addFavorite(favoriteData);
            return response;
        } catch (error) {
            console.error('添加收藏失败:', error);
            return { success: false, message: '添加收藏失败' };
        }
    },
    getFavoriteList: async (userId) => {
        try {
            const response = await favoriteService.getFavoriteList(userId);
            return response;
        } catch (error) {
            console.error('获取收藏列表失败:', error);
            return { success: false, message: '获取收藏列表失败', data: [] };
        }
    },
    removeFavorite: async (id) => {
        try {
            const response = await favoriteService.removeFavorite(id);
            return response;
        } catch (error) {
            console.error('删除收藏失败:', error);
            return { success: false, message: '删除收藏失败' };
        }
    }
};

export default api;
