package com.liang.controller;

import com.liang.domain.Singer;
import com.liang.service.AdminSingerService;
import com.liang.utils.AuthContextHolder;
import com.liang.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@RestController
@RequestMapping("/sms/admin/Singer")
public class AdminSingerController {

    @Autowired
    private AdminSingerService adminSingerService;
    //添加歌手
    @RequestMapping("/add")
    public ResponseResult addSinger(@RequestBody Singer singer, HttpServletRequest request) {
        Long adminId = AuthContextHolder.getUserIdToken(request);
        if(adminId == null){
            return new ResponseResult(401, "未授权", null);
        }
        adminSingerService.addSinger(singer);
        return new ResponseResult(200, "添加成功", null);
    }

    //获取单个歌手
    @GetMapping("/{id}")
    public ResponseResult getSingerById(@PathVariable int id,HttpServletRequest request) {
        Long adminId = AuthContextHolder.getUserIdToken(request);
        if(adminId == null){
            return new ResponseResult(401, "未授权", null);
        }
        Singer singer = adminSingerService.getSingerById(id);
        if (singer == null) {
            return new ResponseResult(404, "歌手不存在", null);
        }
        return new ResponseResult(200, "查询成功", singer);
    }

    //获取全部歌手
    @GetMapping("/list")
    public ResponseResult getAllSingers(HttpServletRequest request) {
        Long adminId = AuthContextHolder.getUserIdToken(request);
        if(adminId == null){
            return new ResponseResult(401, "未授权", null);
        }
        List<Singer> singers = adminSingerService.getAllSingers();
        return new ResponseResult(200, "查询成功",singers);
    }

    @PutMapping("/update")
    public ResponseResult updateSinger(@RequestBody Singer singer,HttpServletRequest request){
        Long adminId = AuthContextHolder.getUserIdToken(request);
        if(adminId == null){
            return new ResponseResult(401, "未授权", null);
        }
        adminSingerService.updateSinger(singer);
        return new ResponseResult(200, "更新成功", null);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseResult deleteSinger(@PathVariable int id,HttpServletRequest request){
        Long adminId = AuthContextHolder.getUserIdToken(request);
        if(adminId == null){
            return new ResponseResult(401, "未授权", null);
        }
        adminSingerService.deleteSinger(id);
        return new ResponseResult(200, "删除成功", null);
    }




}






