package com.liang.mapper;

import com.liang.domain.User_favorite;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UserFavoriteMapper {
    void insert(User_favorite favorite);
    List<User_favorite> selectByUserId(int userId);
    void deleById(int id);
    User_favorite selectById(int id);

}
