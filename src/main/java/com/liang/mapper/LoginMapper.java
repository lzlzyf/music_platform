package com.liang.mapper;

import com.liang.domain.Admin;
import com.liang.domain.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;


public interface LoginMapper {
    // 用户相关
    User selectUserByUsername(@Param("username") String username);
    void insertUser(User user);

    // 管理员相关
    Admin selectAdminByUsername(@Param("username") String username);
}

