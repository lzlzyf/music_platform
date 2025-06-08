package com.liang.controller;

import com.liang.AOP.GetAdmin;
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
    @GetAdmin
    public ResponseResult addSinger(@RequestBody Singer singer) {
        adminSingerService.addSinger(singer);
        return new ResponseResult(200, "添加成功", null);
    }

    //获取单个歌手
    @GetMapping("/{id}")
    @GetAdmin
    public ResponseResult getSingerById(@PathVariable int id) {

        Singer singer = adminSingerService.getSingerById(id);
        if (singer == null) {
            return new ResponseResult(404, "歌手不存在", null);
        }
        return new ResponseResult(200, "查询成功", singer);
    }

    //获取全部歌手
    @GetMapping("/list")
    @GetAdmin
    public ResponseResult getAllSingers() {
        List<Singer> singers = adminSingerService.getAllSingers();
        return new ResponseResult(200, "查询成功",singers);
    }

    @PutMapping("/update")
    @GetAdmin

    public ResponseResult updateSinger(@RequestBody Singer singer){
        adminSingerService.updateSinger(singer);
        return new ResponseResult(200, "更新成功", null);
    }

    @DeleteMapping("/delete/{id}")
    @GetAdmin
    public ResponseResult deleteSinger(@PathVariable int id){
        adminSingerService.deleteSinger(id);
        return new ResponseResult(200, "删除成功", null);
    }




}






