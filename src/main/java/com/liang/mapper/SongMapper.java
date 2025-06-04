package com.liang.mapper;

import com.liang.domain.Song;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface SongMapper {
    void insert(Song song);
    List<Song> selectAll();
    Song selectById(int id);
    void update(Song song);
    void deleteById(int id);
    void incrementPlayCount(@Param("id") int songId);
}

