package com.liang.mapper;

import com.liang.domain.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AdminUserMapper {
    List<User> selectAll();
    User selectById(int id);
    void update(User user);
    void deleteById(int id);
}