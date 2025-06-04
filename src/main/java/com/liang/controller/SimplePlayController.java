package com.liang.controller;

import com.liang.domain.Song;
import com.liang.service.SimplePlayService;
import com.liang.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/sms/simplePlay")
public class SimplePlayController {

    @Autowired
    private SimplePlayService simplePlayService;

    //获取所有歌曲信息
    @GetMapping("/songs")
    public ResponseResult getAllSongs() {
        List<Song> songs = simplePlayService.getAllSongs();
        return new ResponseResult(200, "获取成功", songs);
    }

    //获取单个歌曲信息
    @GetMapping("/song/{songId}")
    public ResponseResult getSongById(@PathVariable int songId) {
        Song song = simplePlayService.getSongById(songId);
        if(song == null) {
            return new ResponseResult(404, "歌曲不存在", null);
        }
        return new ResponseResult(200, "获取成功", song);
    }
}
