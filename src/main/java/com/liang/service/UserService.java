package com.liang.service;

import com.liang.domain.User;

public interface UserService {
    User getUserById(int userId);
    void updateUser(User user);
    boolean changePassword(int userId,String Oldpassword,String newPassword);
}
