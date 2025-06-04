package com.liang.utils;

import javax.servlet.http.HttpServletRequest;

public class AuthContextHolder {

    //从请求头token获取userid
//    public static Long getUserIdToken(HttpServletRequest request) {
//        //从请求头token
//        String token = request.getHeader("token");
//        //调用工具类
//        Long userId = JwtHelper.getUserId(token);
//        return userId;
//    }
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
