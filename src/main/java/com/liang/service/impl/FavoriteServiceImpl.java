package com.liang.service.impl;

import com.liang.domain.User_favorite;
import com.liang.mapper.UserFavoriteMapper;
import com.liang.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private UserFavoriteMapper userFavoriteMapper;
    @Override
    public void addFavorite(User_favorite favorite) {
        userFavoriteMapper.insert(favorite);
    }

    @Override
    public List<User_favorite> getFavoriteByUserId(int userId) {
        return userFavoriteMapper.selectByUserId(userId);
    }

    @Override
    public void removeFavorite(int id) {
        userFavoriteMapper.deleById(id);
    }
}
