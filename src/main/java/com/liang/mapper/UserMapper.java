package com.liang.mapper;

import com.liang.domain.User;


public interface UserMapper {
    User selectById(int id);
    void update(User user);
}
