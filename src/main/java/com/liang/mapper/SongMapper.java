package com.liang.mapper;

import com.liang.domain.Song;

import java.util.List;

public interface SongMapper {
    void insert(Song song);
    Song selectById(int id);
    List<Song> selectAll();
    void deleteSong(int id);
}
