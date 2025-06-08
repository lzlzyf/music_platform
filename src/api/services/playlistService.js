import { saveToLocal, loadFromLocal } from './storage.js';
import { getSongDetail } from './songService.js';

// 默认歌单数据
let userPlaylists = [
    {
        id: 1,
        name: '我的歌单1',
        cover: '/src/assets/images/default-cover.jpg',
        count: 2,
        songs: []
    },
    {
        id: 2,
        name: '我的歌单2',
        cover: '/src/assets/images/default-cover.jpg',
        count: 1,
        songs: []
    },
    {
        id: 3,
        name: '我的歌单3',
        cover: '/src/assets/images/default-cover.jpg',
        count: 0,
        songs: []
    }
];

// 初始化歌单
function initializePlaylists() {
    const playlists = loadFromLocal('userPlaylists');
    if (playlists) {
        userPlaylists = playlists;
    } else {
        saveToLocal('userPlaylists', userPlaylists);
    }
}

// 获取用户歌单
export async function getUserPlaylists() {
    initializePlaylists();
    return userPlaylists;
}

// 创建新歌单
export async function createPlaylist(name) {
    const newPlaylist = {
        id: Date.now(),
        name,
        cover: '/src/assets/images/default-cover.jpg',
        count: 0,
        songs: []
    };
    userPlaylists.push(newPlaylist);
    saveToLocal('userPlaylists', userPlaylists);
    
    // 更新用户信息中的歌单计数
    try {
        // 获取当前用户信息
        const userInfoStr = localStorage.getItem('USER_INFO');
        if (userInfoStr) {
            const userInfo = JSON.parse(userInfoStr);
            
            // 更新歌单计数
            userInfo.playlistCount = userPlaylists.length;
            
            // 保存更新后的用户信息
            localStorage.setItem('USER_INFO', JSON.stringify(userInfo));
            console.log('已更新用户信息中的歌单计数:', userInfo.playlistCount);
        }
    } catch (error) {
        console.error('更新用户信息歌单计数失败:', error);
    }
    
    return newPlaylist;
}

// 添加歌曲到歌单
export async function addSongToPlaylist(playlistId, songId) {
    const playlist = userPlaylists.find(p => p.id === playlistId);
    if (!playlist) return { success: false, msg: '歌单不存在' };
    
    try {
        // 获取歌曲详情
        const response = await getSongDetail(songId);
        console.log('获取歌曲详情响应:', response);
        
        // 检查响应是否成功并包含数据
        if (response && (response.success || response.code === 0) && response.data) {
            const songData = response.data;
            
            // 确保歌曲对象包含必要的字段
            const song = {
                id: songId,
                name: songData.name || songData.songName || '未知歌曲',
                artist: songData.artist || songData.singer || '未知歌手',
                cover: songData.cover || songData.pic || '/src/assets/images/default-cover.jpg',
                url: songData.url || songData.songUrl || ''
            };
            
            // 初始化歌单的songs数组（如果不存在）
            if (!playlist.songs) playlist.songs = [];
            
            // 检查歌曲是否已在歌单中
            if (!playlist.songs.find(s => s.id === songId)) {
                playlist.songs.push(song);
                playlist.count = playlist.songs.length;
                saveToLocal('userPlaylists', userPlaylists);
                console.log(`已将歌曲 ${song.name} 添加到歌单 ${playlist.name}`);
            }
            
            return { 
                success: true, 
                msg: '添加成功',
                song: song
            };
        } else {
            console.error('获取歌曲详情失败或数据格式不正确:', response);
            
            // 创建一个基本的歌曲对象
            const basicSong = {
                id: songId,
                name: '未知歌曲',
                artist: '未知歌手',
                cover: '/src/assets/images/default-cover.jpg'
            };
            
            // 仍然添加到歌单，但使用基本信息
            if (!playlist.songs) playlist.songs = [];
            if (!playlist.songs.find(s => s.id === songId)) {
                playlist.songs.push(basicSong);
                playlist.count = playlist.songs.length;
                saveToLocal('userPlaylists', userPlaylists);
                console.log(`已将基本歌曲信息添加到歌单 ${playlist.name}`);
            }
            
            return { 
                success: true, 
                msg: '添加成功，但歌曲信息不完整',
                song: basicSong
            };
        }
    } catch (error) {
        console.error('添加歌曲到歌单时出错:', error);
        return { 
            success: false, 
            msg: '添加失败: ' + (error.message || '未知错误')
        };
    }
} 