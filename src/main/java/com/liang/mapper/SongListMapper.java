package com.liang.mapper;

import com.liang.domain.Song_list;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SongListMapper {
    void insert(Song_list playlist);

    List<Song_list> selectAll();

    Song_list selectById(int id);

    void update(Song_list playlist);

    void deleteById(int id);

}