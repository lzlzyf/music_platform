package com.liang.service.impl;

import com.liang.domain.User;
import com.liang.mapper.UserMapper;
import com.liang.service.UserService;
import com.liang.utils.MD5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User getUserById(int userId) {
        return userMapper.selectById(userId);
    }

    @Override
    public void updateUser(User user) {
         userMapper.update(user);
    }

    @Override
    public boolean changePassword(int userId, String Oldpassword, String newPassword) {
        User user = userMapper.selectById(userId);
        if(user == null || !user.getPassword().equals(MD5.encrypt(Oldpassword))){
            return false;
        }
        user.setPassword(MD5.encrypt(newPassword));
        userMapper.update(user);
        return true;
    }
}
