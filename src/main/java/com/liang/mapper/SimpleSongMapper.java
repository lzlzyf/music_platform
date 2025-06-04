package com.liang.mapper;

import com.liang.domain.Song;

import java.util.List;

public interface SimpleSongMapper {
    Song selectById(int id);
    List<Song> selectAll();
}
