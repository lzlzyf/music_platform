package com.liang.service;

import com.liang.domain.Song;

import java.util.List;

public interface SimplePlayService {
    Song getSongById(int songId);
    List<Song> getAllSongs();
}
