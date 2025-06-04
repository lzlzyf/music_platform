package com.liang.service;

import com.liang.domain.Song;

public interface PlayService {
    Song getSongById(int songId);
    void incrementPlayCount(int songId);
}
