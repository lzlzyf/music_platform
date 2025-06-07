package com.liang.mapper;

import com.liang.domain.SongCategory;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SongCategoryMapper {
    void insert(SongCategory category);
    void update(SongCategory category);
    void deleteById(int id);
    SongCategory selectById(int id);
    List<SongCategory> selectAll();
}