import instance from '../../utils/request.js';

// 本地mock数据 - 用户收藏列表
const mockFavorites = {
  // 用户ID为key，收藏列表为value
  0: [], // 默认用户
};

/**
 * 添加收藏
 * @param {Object} favoriteData 收藏数据
 * @param {number} favoriteData.user_id 用户ID
 * @param {number} favoriteData.id 收藏ID
 * @param {number} favoriteData.type 收藏类型（1-歌曲，2-歌单，3-歌手等）
 * @param {number} favoriteData.target_id 目标ID
 * @param {string} favoriteData.create_time 创建时间
 * @returns {Promise<Object>} 返回添加结果
 */
export const addFavorite = async (favoriteData) => {
  try {
    // 注释掉API调用
    // const response = await instance.post('/sms/favorite/add', favoriteData);
    // return response.data;
    
    // 使用本地mock数据
    const userId = favoriteData.user_id || 0;
    
    // 确保用户的收藏列表存在
    if (!mockFavorites[userId]) {
      mockFavorites[userId] = [];
    }
    
    // 检查是否已经收藏
    const existingIndex = mockFavorites[userId].findIndex(
      item => item.type === favoriteData.type && item.target_id === favoriteData.target_id
    );
    
    if (existingIndex !== -1) {
      return {
        code: 1,
        msg: '已经收藏过了',
        data: {}
      };
    }
    
    // 生成唯一ID
    const newId = Date.now();
    const newFavorite = {
      ...favoriteData,
      id: newId
    };
    
    mockFavorites[userId].push(newFavorite);
    
    console.log('使用本地Mock数据替代API调用 - addFavorite', newFavorite);
    
    return {
      code: 0,
      msg: '添加收藏成功',
      data: {
        id: newId
      }
    };
  } catch (error) {
    console.error('添加收藏失败:', error);
    return {
      code: -1,
      msg: '添加收藏失败',
      data: {}
    };
  }
};

/**
 * 获取用户收藏列表
 * @param {number} userId 用户ID
 * @returns {Promise<Object>} 返回收藏列表
 */
export const getFavoriteList = async (userId) => {
  try {
    // 注释掉API调用
    // const response = await instance.get('/sms/favorite/List', {
    //   params: { userId }
    // });
    // return response.data;
    
    // 使用本地mock数据
    const userIdNum = Number(userId) || 0;
    const favorites = mockFavorites[userIdNum] || [];
    
    console.log('使用本地Mock数据替代API调用 - getFavoriteList', favorites);
    
    return {
      code: 0,
      msg: '获取收藏列表成功',
      data: favorites
    };
  } catch (error) {
    console.error('获取收藏列表失败:', error);
    return {
      code: -1,
      msg: '获取收藏列表失败',
      data: []
    };
  }
};

/**
 * 删除收藏
 * @param {number} id 收藏ID
 * @returns {Promise<Object>} 返回删除结果
 */
export const removeFavorite = async (id) => {
  try {
    // 注释掉API调用
    // const response = await instance.delete(`/sms/favorite/remove/${id}`);
    // return response.data;
    
    // 使用本地mock数据
    let found = false;
    
    // 遍历所有用户的收藏列表
    Object.keys(mockFavorites).forEach(userId => {
      const index = mockFavorites[userId].findIndex(item => item.id === Number(id));
      if (index !== -1) {
        mockFavorites[userId].splice(index, 1);
        found = true;
      }
    });
    
    if (!found) {
      return {
        code: 1,
        msg: '收藏不存在',
        data: {}
      };
    }
    
    console.log('使用本地Mock数据替代API调用 - removeFavorite', id);
    
    return {
      code: 0,
      msg: '删除收藏成功',
      data: {}
    };
  } catch (error) {
    console.error('删除收藏失败:', error);
    return {
      code: -1,
      msg: '删除收藏失败',
      data: {}
    };
  }
}; 