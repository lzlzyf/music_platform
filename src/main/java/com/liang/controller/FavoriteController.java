package com.liang.controller;

import com.liang.domain.User_favorite;
import com.liang.service.FavoriteService;
import com.liang.utils.AuthContextHolder;
import com.liang.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/sms/favorite")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    //添加收藏
    @RequestMapping("/add")
    public ResponseResult addFavorite(@RequestBody User_favorite favorite, HttpServletRequest request){
        Long userId = AuthContextHolder.getUserIdToken(request);
        if(userId == null) {
            return new ResponseResult(401, "请先登录", null);
        }
        favorite.setUser_id(userId.intValue());
        favoriteService.addFavorite(favorite);
        return new ResponseResult(200, "添加成功", null);
    }

    //查询用户所有收藏
    @GetMapping("List")
    public ResponseResult getFavoriteByUserId(HttpServletRequest request){
        Long userId = AuthContextHolder.getUserIdToken(request);
        if(userId == null) {
            return new ResponseResult(401, "请先登录", null);
        }
        List<User_favorite> favorites = favoriteService.getFavoriteByUserId(userId.intValue());
        return new ResponseResult(200, "查询成功", favoriteService.getFavoriteByUserId(userId.intValue()));
    }

    //取消收藏
    @DeleteMapping("/remove/{id}")
    public ResponseResult removeFavorite(@PathVariable int id, HttpServletRequest request){
        Long userId = AuthContextHolder.getUserIdToken(request);
        if(userId == null){
            return new ResponseResult(401, "请先登录", null);
        }
        List<User_favorite> favorites = favoriteService.getFavoriteByUserId(userId.intValue());
        boolean found = false;
        for(User_favorite favorite : favorites){
            if(favorite.getId() == id){
                found = true;

                if(favorite.getUser_id() != userId.intValue()){
                    return new ResponseResult(401, "未授权", null);
                }
                break;
            }
        }
        if(!found){
            return new ResponseResult(404, "收藏不存在", null);
        }

        //删除收藏
        favoriteService.removeFavorite(id);
        return new ResponseResult(200, "取消成功", null);
    }

}
