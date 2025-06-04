package com.liang.mapper;

import com.liang.domain.User;
import org.springframework.stereotype.Component;

@Component
public interface UserMapper {
    User selectById(int id);
    boolean update(User user);
}
