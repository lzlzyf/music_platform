package com.liang.utils;

import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
public class AuthContextHolder {

    public static boolean isAdmin(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        Integer userType = JwtHelper.getUserType(token);
        return userType != null && userType == 1;
    }

    public static Long getUserIdToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            return JwtHelper.getUserId(token);
        }
        return null;
    }

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
