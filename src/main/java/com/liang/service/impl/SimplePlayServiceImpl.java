package com.liang.service.impl;

import com.liang.domain.Song;
import com.liang.mapper.SimpleSongMapper;
import com.liang.service.SimplePlayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;


@Service
public class SimplePlayServiceImpl implements SimplePlayService {

    @Autowired
    private SimpleSongMapper simpleSongMapper;

    @Override
    public Song getSongById(int songId) {
        return simpleSongMapper.selectById(songId);
    }

    @Override
    public List<Song> getAllSongs() {
        return simpleSongMapper.selectAll();
    }
}
