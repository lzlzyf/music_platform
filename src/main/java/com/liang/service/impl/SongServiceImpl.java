package com.liang.service.impl;

import com.liang.domain.Song;
import com.liang.mapper.SongMapper;
import com.liang.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class SongServiceImpl implements SongService {

    @Autowired
    private SongMapper songMapper;
    @Override
    public void addSong(Song song) {
        songMapper.insert(song);
    }

    @Override
    public List<Song> getAllSongs() {
        return songMapper.selectAll();
    }


    @Override
    public Song getSongById(int id) {
        return songMapper.selectById(id);
    }

    @Override
    public void updateSong(Song song) {
        songMapper.updateSong(song);
    }

    @Override
    public void deleteSong(int id) {
        songMapper.deleteSong(id);
    }
}
