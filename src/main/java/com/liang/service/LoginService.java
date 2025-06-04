package com.liang.service;

import com.liang.domain.Admin;
import com.liang.domain.User;

public interface LoginService {
    Admin adminLogin(String username, String password);
    User userLogin(String username, String password);
    User registerUser(User user);
    User selectUserByUsername(String username);

}


