package com.liang.mapper;

import com.liang.domain.User_favorite;
import java.util.List;

public interface UserFavoriteMapper {
    void insert(User_favorite favorite);
    List<User_favorite> selectAll();
    void deleteById(int id);
    User_favorite selectById(int id);
}
