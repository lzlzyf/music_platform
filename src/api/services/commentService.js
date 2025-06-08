import instance from '../../utils/request.js';

/**
 * 提交评论
 * @param {Object} commentData 评论数据
 * @param {number} commentData.id 评论ID（新增时为0）
 * @param {number} commentData.user_id 用户ID
 * @param {number} commentData.song_list_id 歌单ID
 * @param {string} commentData.content 评论内容
 * @param {number} commentData.score 评分（1-5）
 * @param {string} commentData.create_time 创建时间（可选）
 * @returns {Promise} 提交结果
 */
export async function submitComment(commentData) {
    try {
        // 如果没有提供创建时间，添加当前时间
        if (!commentData.create_time) {
            commentData.create_time = new Date().toISOString();
        }
        
        console.log('提交评论，数据:', commentData);
        
        const response = await instance.post('/sms/comment/submit', commentData);
        
        console.log('评论提交响应:', response);
        
        return response;
    } catch (error) {
        console.error('提交评论失败:', error);
        return {
            success: false,
            code: 'ERROR_REQUEST',
            message: error.message || '提交评论失败'
        };
    }
}

/**
 * 获取歌单评论列表
 * @param {number} songListId 歌单ID
 * @returns {Promise} 评论列表
 */
export async function getComments(songListId) {
    try {
        console.log('获取歌单评论，歌单ID:', songListId);
        
        const response = await instance.get(`/sms/comment/List/${songListId}`);
        
        console.log('获取评论响应:', response);
        
        return response;
    } catch (error) {
        console.error('获取评论失败:', error);
        return {
            success: false,
            code: 'ERROR_REQUEST',
            message: error.message || '获取评论失败'
        };
    }
}

/**
 * 更新评论
 * @param {Object} commentData 评论数据
 * @returns {Promise} 更新结果
 */
export async function updateComment(commentData) {
    try {
        console.log('更新评论，数据:', commentData);
        
        const response = await instance.put('/sms/comment/update', commentData);
        
        console.log('更新评论响应:', response);
        
        return response;
    } catch (error) {
        console.error('更新评论失败:', error);
        return {
            success: false,
            code: 'ERROR_REQUEST',
            message: error.message || '更新评论失败'
        };
    }
}

/**
 * 删除评论
 * @param {number} commentId 评论ID
 * @returns {Promise} 删除结果
 */
export async function deleteComment(commentId) {
    try {
        console.log('删除评论，ID:', commentId);
        
        const response = await instance.delete(`/sms/comment/delete/${commentId}`);
        
        console.log('删除评论响应:', response);
        
        return response;
    } catch (error) {
        console.error('删除评论失败:', error);
        return {
            success: false,
            code: 'ERROR_REQUEST',
            message: error.message || '删除评论失败'
        };
    }
} 