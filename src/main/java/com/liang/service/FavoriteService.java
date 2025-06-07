package com.liang.service;

import com.liang.domain.User_favorite;

import java.util.List;

public interface FavoriteService {
    void addFavorite(User_favorite favorite);
    List<User_favorite> getFavorite();
    void removeFavorite(int id);

}
