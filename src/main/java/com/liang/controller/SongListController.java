package com.liang.controller;

import com.liang.AOP.GetUser;
import com.liang.domain.Song_list;
import com.liang.service.SongListService;
import com.liang.utils.AuthContextHolder;
import com.liang.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/sms/playlist")
public class SongListController {

    @Autowired
    private SongListService songListService;

    // 创建歌单
    @PostMapping("/create")
    public ResponseResult createPlaylist(@RequestBody Song_list playlist) {
        songListService.createPlaylist(playlist);
        return new ResponseResult(200, "创建成功", playlist);
    }

    // 获取所有歌单
    @GetMapping("/list")
    public ResponseResult getAllPlaylists(HttpServletRequest request) {
        List<Song_list> playlists = songListService.getPlaylists();
        return new ResponseResult(200, "获取成功", playlists);
    }

    @GetMapping("/{id}")
    public ResponseResult getPlaylistById(@PathVariable int id) {
        Song_list playlist = songListService.getPlaylistById(id);
        if (playlist == null) {
            return new ResponseResult(404, "歌单不存在", null);
        }
        return new ResponseResult(200, "获取成功", playlist);
    }

    @PutMapping("/update")
    public ResponseResult updatePlaylist(@RequestBody Song_list playlist) {
        songListService.updatePlaylist(playlist);
        return new ResponseResult(200, "更新成功", null);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseResult deletePlaylist(@PathVariable int id) {
        songListService.deletePlaylist(id);
        return new ResponseResult(200, "删除成功", null);
    }

}
