package com.liang.utils;

import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
@Component
public class AuthContextHolder {
    //aop用户管理
    public boolean isAdmin(HttpServletRequest request) {
        String role = request.getHeader("User-Role");
        return "admin".equalsIgnoreCase(role);
    }

    public static Long getUserIdToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            return JwtHelper.getUserId(token);
        }
        return null;
    }

    //从请求头token获取name
//    public static String getUserName(HttpServletRequest request) {
//        //从header获取token
//        String token = request.getHeader("token");
//        //jwt从token获取username
//        String userName = JwtHelper.getUserName(token);
//        return userName;
//    }
    // 获取用户名
    public static String getUserName(HttpServletRequest request) {
        String tokenHeader = request.getHeader("Authorization");
        if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
            String token = tokenHeader.substring(7);
            return JwtHelper.getUserName(token);
        }
        return null;
    }
}
