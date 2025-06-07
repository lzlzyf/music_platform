package com.liang.service.impl;

import com.liang.domain.Song_list;
import com.liang.mapper.SongListMapper;
import com.liang.service.SongListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongListServiceImpl implements SongListService {

    @Autowired
    private SongListMapper songListMapper;

    @Override
    public void createPlaylist(Song_list playlist) {
        songListMapper.insert(playlist);
    }

    @Override
    public List<Song_list> getPlaylistsByUserId(int userId) {
        return songListMapper.selectByUserId(userId);
    }

    @Override
    public Song_list getPlaylistById(int id) {
        return songListMapper.selectById(id);
    }

    @Override
    public void updatePlaylist(Song_list playlist) {
        songListMapper.update(playlist);
    }

    @Override
    public void deletePlaylist(int id) {
        songListMapper.deleteById(id);
    }

    @Override
    public void addSongToPlaylist(int playlistId, int songId) {
        songListMapper.addSongToPlaylist(playlistId, songId);
    }
}
