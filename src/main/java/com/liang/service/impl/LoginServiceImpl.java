package com.liang.service.impl;

import com.liang.domain.Admin;
import com.liang.domain.User;
import com.liang.mapper.LoginMapper;
import com.liang.service.LoginService;
import com.liang.utils.MD5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private LoginMapper loginMapper;


    @Override
    public Admin adminLogin(String username, String password) {
        Admin admin = loginMapper.selectAdminByUsername(username);
        if (admin == null || !admin.getPassword().equals(MD5.encrypt(password))) {
            return null;
        }
        return admin;
    }

    @Override
    public User userLogin(String username, String password) {
        User user = loginMapper.selectUserByUsername(username);
        if (user == null || !user.getPassword().equals(MD5.encrypt(password))) {
            return null;
        }
            return user;
   }



    @Override
    public User registerUser(User user) {
        user.setPassword(MD5.encrypt(user.getPassword().trim()));
        loginMapper.insertUser(user);
        return user;
    }

    @Override
    public User selectUserByUsername(String username) {
        User user = loginMapper.selectUserByUsername(username);
        if (user == null) {
            return null;
        }
        return user;
    }

}
