package com.liang.controller;

import com.liang.domain.Song;
import com.liang.service.SongService;
import com.liang.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sms/simplePlay")
public class SongController {

    @Autowired
    private SongService songService;
    //添加音乐
    @RequestMapping("/add")
    public ResponseResult addSong(@RequestBody Song song) {
        songService.addSong(song);
        return new ResponseResult(200, "添加成功", null);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseResult deleteSong(@PathVariable int id) {
        songService.deleteSong(id);
        return new ResponseResult(200, "删除成功", null);
    }


    @GetMapping("/songs")
    public ResponseResult getAllSongs() {
        List<Song> songs = songService.getAllSongs();
        return new ResponseResult(200, "获取成功", songs);
    }

    @GetMapping("/song/{songId}")
    public ResponseResult getSongById(@PathVariable int songId) {
        Song song = songService.getSongById(songId);
        if(song == null) {
            return new ResponseResult(404, "歌曲不存在", null);
        }
        return new ResponseResult(200, "获取成功", song);
    }
}
