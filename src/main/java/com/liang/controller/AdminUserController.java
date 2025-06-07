package com.liang.controller;


import com.liang.AOP.GetAdmin;
import com.liang.domain.User;
import com.liang.service.AdminUserService;
import com.liang.utils.AuthContextHolder;
import com.liang.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/sms/admin/user")
public class AdminUserController {

    @Autowired
    private AdminUserService adminUserService;

    // 获取所有用户
    @GetMapping("/list")
    @GetAdmin
    public ResponseResult getAllUsers() {
        List<User> users = adminUserService.getAllUsers();
        return new ResponseResult(200, "获取成功", users);
    }

    // 查询单个用户
    @GetMapping("/{id}")
    @GetAdmin
    public ResponseResult getUserById(@PathVariable int id) {
        User user = adminUserService.getUserById(id);
        if (user == null) {
            return new ResponseResult(404, "用户不存在", null);
        }
        return new ResponseResult(200, "获取成功", user);
    }

    // 修改用户信息
    @PutMapping("/update/")
    @GetAdmin
    public ResponseResult updateUser(@RequestBody User user) {
        adminUserService.updateUser(user);
        return new ResponseResult(200, "更新成功", null);
    }

    // 删除用户
    @DeleteMapping("/delete/{id}")
    public ResponseResult deleteUser(@PathVariable int id) {
        adminUserService.deleteUser(id);
        return new ResponseResult(200, "删除成功", null);
    }
}
