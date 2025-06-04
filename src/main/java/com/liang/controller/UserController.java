package com.liang.controller;

import com.liang.domain.User;
import com.liang.mapper.UserMapper;
import com.liang.service.UserService;
import com.liang.utils.AuthContextHolder;
import com.liang.utils.ResponseResult;
import org.apache.ibatis.annotations.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping ("/sms/user")
public class UserController {
    @Autowired
    private UserService userService;

    //获取用户信息
    @GetMapping("/info")
    public ResponseResult getUser(HttpServletRequest request){
        Long userId = AuthContextHolder.getUserIdToken(request);
        if(userId == null){
            return new ResponseResult(401,"未授权",null);
        }
        User user = userService.getUserById(userId.intValue());
        if(user == null){
            return new ResponseResult(404,"用户不存在",null);
        }
        return new ResponseResult(200,"获取成功",user);
    }
    // 更新用户信息
    @PutMapping("/update")
    public ResponseResult updateUserInfo(@RequestBody User user, HttpServletRequest request) {
        Long userId = AuthContextHolder.getUserIdToken(request);
        if (userId == null || user.getId() != userId.intValue()) {
            return new ResponseResult(401, "无权限操作", null);
        }
        boolean success = userService.updateUser(user);
        if (!success) {
            return new ResponseResult(500, "更新失败", null);
        }
        return new ResponseResult(200, "更新成功", null);
    }
    // 修改密码
    @PostMapping("/change-password")
    public ResponseResult changePassword(@RequestParam String oldPassword,
                                         @RequestParam String newPassword,
                                         HttpServletRequest request) {
        Long userId = AuthContextHolder.getUserIdToken(request);
        if (userId == null) {
            return new ResponseResult(401, "未授权", null);
        }
        boolean success = userService.changePassword(userId.intValue(), oldPassword, newPassword);
        if (!success) {
            return new ResponseResult(400, "旧密码错误或更新失败", null);
        }
        return new ResponseResult(200, "密码修改成功", null);
    }
}
