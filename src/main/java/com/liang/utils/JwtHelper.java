package com.liang.utils;

import io.jsonwebtoken.*;
import org.springframework.util.StringUtils;

import java.util.Date;

public class JwtHelper {
    private static long tokenExpiration = 7 * 24 * 60 * 60 * 1000;
    private static String tokenSignKey = "123456";

    //生成token字符串
    public static String createToken(Long userId, Integer userType) {
        String token = Jwts.builder()

                .setSubject("YYGH-USER")

                .setExpiration(new Date(System.currentTimeMillis() + tokenExpiration))

                .claim("userId", userId)
//                .claim("userName", userName)
                .claim("userType", userType)

                .signWith(SignatureAlgorithm.HS512, tokenSignKey)
//                .compressWith(CompressionCodecs.GZIP)
                .compact();
        return token;
    }

    //从token字符串获取userid
//    public static Long getUserId(String token) {
//        if(StringUtils.isEmpty(token)) return null;
//        Jws<Claims> claimsJws = Jwts.parser().setSigningKey(tokenSignKey).parseClaimsJws(token);
//        Claims claims = claimsJws.getBody();
//        Integer userId = (Integer)claims.get("userId");
//        return userId.longValue();
//    }
    public static Long getUserId(String token) {
        if (StringUtils.isEmpty(token)) return null;

        Jws<Claims> claimsJws = Jwts.parser().setSigningKey(tokenSignKey).parseClaimsJws(token);
        Claims claims = claimsJws.getBody();

        // 从claims中获取userId，注意类型转换
        Object userIdObj = claims.get("userId");
        if (userIdObj == null) {
            return null; // 或抛出异常，根据业务需求处理
        }

        // 安全转换为Long类型
        if (userIdObj instanceof Long) {
            return (Long) userIdObj;
        } else if (userIdObj instanceof Integer) {
            return ((Integer) userIdObj).longValue();
        } else {
            throw new IllegalArgumentException("无效的userId类型: " + userIdObj.getClass().getName());
        }
    }

    //从token字符串获取userType
    public static Integer getUserType(String token) {
        if(StringUtils.isEmpty(token)) return null;
        Jws<Claims> claimsJws
                = Jwts.parser().setSigningKey(tokenSignKey).parseClaimsJws(token);
        Claims claims = claimsJws.getBody();
        return (Integer)(claims.get("userType"));
    }

    //从token字符串获取userName
    public static String getUserName(String token) {
        if(StringUtils.isEmpty(token)) return "";
        Jws<Claims> claimsJws
                = Jwts.parser().setSigningKey(tokenSignKey).parseClaimsJws(token);
        Claims claims = claimsJws.getBody();
        return (String)claims.get("userName");
    }

    //判断token是否有效
    public static boolean isExpiration(String token){
        try {
            boolean isExpire = Jwts.parser()
                    .setSigningKey(tokenSignKey)
                    .parseClaimsJws(token)
                    .getBody()
                    .getExpiration().before(new Date());
            //没有过期，有效，返回false
            return isExpire;
        }catch(Exception e) {
            //过期出现异常，返回true
            return true;
        }
    }


    /**
     * 刷新Token
     * @param token
     * @return
     */
    public String refreshToken(String token) {
        String refreshedToken;
        try {
            final Claims claims = Jwts.parser()
                    .setSigningKey(tokenSignKey)
                    .parseClaimsJws(token)
                    .getBody();
            refreshedToken = JwtHelper.createToken(getUserId(token), getUserType(token));
        } catch (Exception e) {
            refreshedToken = null;
        }
        return refreshedToken;
    }

    public static void main(String[] args) {
//        String token = JwtHelper.createToken(1L, "lucy");
//        System.out.println(token);
//        System.out.println(JwtHelper.getUserId(token));
//        System.out.println(JwtHelper.getUserName(token));
    }
}
