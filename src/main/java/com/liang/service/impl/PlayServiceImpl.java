package com.liang.service.impl;

import com.liang.domain.Song;
import com.liang.mapper.SongMapper;
import com.liang.service.PlayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayServiceImpl implements PlayService {

    @Autowired
    private SongMapper songMapper;

    @Override
    public Song getSongById(int songId) {
        return songMapper.selectById(songId);
    }

    @Override
    public void incrementPlayCount(int songId) {
        songMapper.incrementPlayCount(songId);

    }
}
