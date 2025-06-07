package com.liang.service.impl;

import com.liang.domain.User;
import com.liang.mapper.AdminUserMapper;
import com.liang.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminUserServiceImpl implements AdminUserService {

    @Autowired
    private AdminUserMapper userMapper;

    @Override
    public List<User> getAllUsers() {
        return userMapper.selectAll();
    }

    @Override
    public User getUserById(int id) {
        return userMapper.selectById(id);
    }

    @Override
    public void updateUser(User user) {
        userMapper.update(user);

    }

    @Override
    public void deleteUser(int id) {
        userMapper.deleteById(id);

    }
}
