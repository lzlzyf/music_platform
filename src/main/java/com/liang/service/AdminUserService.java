package com.liang.service;

import com.liang.domain.User;
import java.util.List;

public interface AdminUserService {
    List<User> getAllUsers();
    User getUserById(int id);
    void updateUser(User user);
    void deleteUser(int id);
}
