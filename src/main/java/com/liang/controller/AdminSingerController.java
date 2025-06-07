package com.liang.controller;

import com.liang.AOP.AdminOnly;
import com.liang.domain.Singer;
import com.liang.service.AdminSingerService;
import com.liang.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/sms/admin/Singer")
public class AdminSingerController {

    @Autowired
    private AdminSingerService adminSingerService;
    //添加歌手
    @RequestMapping("/add")
    @AdminOnly
    public ResponseResult addSinger(@RequestBody Singer singer) {
        adminSingerService.addSinger(singer);
        return new ResponseResult(200, "添加成功", null);
    }

    //获取单个歌手
    @GetMapping("/{id}")
    @AdminOnly
    public ResponseResult getSingerById(@PathVariable int id) {
        Singer singer = adminSingerService.getSingerById(id);
        if (singer == null) {
            return new ResponseResult(404, "歌手不存在", null);
        }
        return new ResponseResult(200, "查询成功", singer);
    }
    //依据名字获取
    @GetMapping("/{name}")
    @AdminOnly
    public ResponseResult getSingerByName(@PathVariable String name) {
        Singer singer = adminSingerService.getSingerByName(name);
        if(singer == null) {
            return new ResponseResult(404, "歌手不存在", null);
        }
        return new ResponseResult(200, "查询成功", singer);
    }
    //获取全部歌手
    @GetMapping("/list")
    @AdminOnly
    public ResponseResult getAllSingers() {
        return new ResponseResult(200, "查询成功", adminSingerService.getAllSingers());
    }

    @PutMapping("/update")
    @AdminOnly
    public ResponseResult updateSinger(@RequestBody Singer singer){
        adminSingerService.updateSinger(singer);
        return new ResponseResult(200, "更新成功", null);
    }

    @DeleteMapping("/delete/{id}")
    @AdminOnly
    public ResponseResult deleteSinger(@PathVariable int id){
        adminSingerService.deleteSinger(id);
        return new ResponseResult(200, "删除成功", null);
    }




}






