import instance from '../../utils/request.js';

// 获取推荐歌曲
export async function getRecommendSongs(category = 'featured') {
    try {
        // 从后端API获取推荐歌曲
        const response = await instance.get(`/sms/simplePlay/songs?category=${category}`);
        
        // 确保返回的数据格式一致
        if (response && response.data) {
            return {
                success: true,
                code: 0,
                msg: '获取推荐歌曲成功',
                data: Array.isArray(response.data) ? response.data : []
            };
        }
        
        // 如果响应成功但没有data字段，返回空数组
        return {
            success: true,
            code: 0,
            msg: '获取推荐歌曲成功，但数据为空',
            data: []
        };
    } catch (error) {
        console.error('获取推荐歌曲失败:', error);
        // 返回错误信息，确保包含data字段
        return {
            success: false,
            code: -1,
            msg: '获取推荐歌曲失败',
            data: [] // 确保返回空数组而不是undefined
        };
    }
}

// 获取歌曲列表
export async function getSongList(params = {}) {
    try {
        // 从后端API获取歌曲列表
        const response = await instance.get('/sms/simplePlay/songs', { params });
        return response;
    } catch (error) {
        console.error('获取歌曲列表失败:', error);
        // 返回错误信息
        return {
            success: false,
            code: -1,
            msg: '获取歌曲列表失败',
            data: []
        };
    }
}

// 获取歌曲详情
export async function getSongDetail(songId) {
    try {
        // 从后端API获取歌曲详情
        const response = await instance.get(`/sms/simplePlay/song/${songId}`);
        
        console.log('歌曲详情API响应:', response);
        
        // 确保返回的数据格式一致
        if (response && response.data) {
            return {
                success: true,
                code: 0,
                msg: '获取歌曲详情成功',
                data: response.data
            };
        }
        
        // 如果响应成功但没有data字段
        return {
            success: false,
            code: response.code || -1,
            msg: response.msg || '获取歌曲详情成功，但数据为空',
            data: null
        };
    } catch (error) {
        console.error('获取歌曲详情失败:', error);
        // 返回错误信息
        return {
            success: false,
            code: error.response ? error.response.status : -1,
            msg: '获取歌曲详情失败: ' + (error.message || '未知错误'),
            data: null
        };
    }
}

// 获取歌曲URL
export async function getSongUrl(songId) {
    try {
        // 从后端API获取歌曲详情，提取URL
        const response = await instance.get(`/sms/simplePlay/song/${songId}`);
        
        // 如果API返回了完整的歌曲对象，提取URL
        if (response.data) {
            return {
                success: true,
                code: 0,
                msg: '获取歌曲URL成功',
                data: { 
                    url: response.data.url || response.data.songUrl || '' 
                }
            };
        }
        
        return response;
    } catch (error) {
        console.error('获取歌曲URL失败:', error);
        // 返回错误信息
        return {
            success: false,
            code: -1,
            msg: '获取歌曲URL失败',
            data: null
        };
    }
}

// 获取歌词
export async function getLyrics(songId) {
    try {
        // 从歌曲详情API获取歌词
        const response = await instance.get(`/sms/simplePlay/song/${songId}`);
        
        // 如果API返回了完整的歌曲对象，提取歌词
        if (response.data) {
            return {
                success: true,
                code: 0,
                msg: '获取歌词成功',
                data: { 
                    lyrics: response.data.lyrics || response.data.lyricContent || '' 
                }
            };
        }
        
        return response;
    } catch (error) {
        console.error('获取歌词失败:', error);
        // 返回错误信息
        return {
            success: false,
            code: -1,
            msg: '获取歌词失败',
            data: null
        };
    }
}

// 获取分类名称
function getCategoryName(category) {
    const categoryNames = {
        featured: '精选',
        mainland: '内地',
        hktw: '港台',
        western: '欧美',
        korean: '韩国'
    };
    return categoryNames[category] || '推荐';
} 