package com.liang.controller;

import com.liang.domain.User_favorite;
import com.liang.service.FavoriteService;
import com.liang.utils.AuthContextHolder;
import com.liang.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/sms/favorite")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    // 添加收藏
    @PostMapping("/add")
    public ResponseResult addFavorite(@RequestBody User_favorite favorite, HttpServletRequest request) {
        Long userId = AuthContextHolder.getUserIdToken(request);
        if (userId == null) {
            return new ResponseResult(401, "未授权", null);
        }
        favorite.setUser_id(userId.intValue());
        favoriteService.addFavorite(favorite);
        return new ResponseResult(200, "收藏成功", null);
    }


    // 查询用户所有收藏
    @GetMapping("/list")
    public ResponseResult getFavorite(HttpServletRequest request){
        Long userId = AuthContextHolder.getUserIdToken(request);
        if(userId == null) {
            return new ResponseResult(401, "请先登录", null);
        }
        return new ResponseResult(200, "查询成功", favoriteService.getFavorite());
    }

    // 取消收藏
    @DeleteMapping("/remove/{id}")
    public ResponseResult removeFavorite(@PathVariable int id, HttpServletRequest request) {
        Long userId = AuthContextHolder.getUserIdToken(request);
        if (userId == null) {
            return new ResponseResult(401, "请先登录", null);
        }
        favoriteService.removeFavorite(id);
        return new ResponseResult(200, "取消收藏成功", null);
    }
}
