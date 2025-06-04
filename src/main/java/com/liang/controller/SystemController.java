package com.liang.controller;

import com.liang.domain.Admin;
import com.liang.domain.LoginForm;
import com.liang.domain.User;

import com.liang.service.LoginService;
import com.liang.utils.CreateVerifiCodeImage;
import com.liang.utils.JwtHelper;
import com.liang.utils.MD5;
import com.liang.utils.ResponseResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashMap;

@RestController
@RequestMapping("/sms/system")
public class SystemController   {

    @Resource
    private LoginService loginService;



    @RequestMapping("/getVerifiCodeImage")
    public void getVerifiCodeImage(HttpSession session, HttpServletResponse response) throws IOException {
        //使用工具类获取验证码图片
        BufferedImage verifiCodeImage = CreateVerifiCodeImage.getVerifiCodeImage();
        //获取验证码图片中的值
        String code = new String(CreateVerifiCodeImage.getVerifiCode());
        //将验证码中的值保存在session中，用于登陆时校验
        session.setAttribute("code",code);
        //将验证码图片返回给浏览器
        ImageIO.write(verifiCodeImage, "JPG", response.getOutputStream());
    }

   @PostMapping("/login")
    public ResponseResult login(@RequestBody LoginForm loginForm, HttpSession session){
        //获取域中验证码的值
        String code  = (String) session.getAttribute("code");
        //判断是否生效
        if(code == null || "".equals(code)){
            return new ResponseResult(200,"验证码失效，请重新输入验证码",null);
        }
        if(!loginForm.getVerifyCode().equalsIgnoreCase(code)){
            return new ResponseResult(201,"验证码错误",null);
        }
        session.removeAttribute("code");
        //根据身份校验用户名和密码

        Integer userType = loginForm.getUserType();
        String username = loginForm.getUsername();
        String password = MD5.encrypt(loginForm.getPassword());

        Object login = null;
        if(userType == 1) {
            login = loginService.adminLogin(username, password);
        } else{
            login = loginService.userLogin(username, password);
        }

        if(login == null) {
            return new ResponseResult(300,"用户名或密码错误，请重新输入",null);
        }

        Long userId = null;
        if (login instanceof Admin) {
            userId = (long) ((Admin) login).getId();
        } else {
            userId = (long) ((User) login).getId();
        }

        String token = JwtHelper.createToken(userId, userType);
        HashMap<String, Object> map = new HashMap<>();
        map.put("token", token);
        map.put("user", login);
        map.put("userType", userType);

        return new ResponseResult(200, "登录成功", map);
    }
    @PostMapping("/register")
    public ResponseResult register(@RequestBody User user){
        // 判断用户是否存在
        User existUser = loginService.selectUserByUsername(user.getUsername());
        if(existUser != null){
            return new ResponseResult(400,"用户已存在",null);
        }

        User registerUser = loginService.registerUser(user);

        return new ResponseResult(200,"注册成功",null);

    }


}