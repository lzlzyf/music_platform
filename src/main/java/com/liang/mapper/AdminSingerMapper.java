package com.liang.mapper;

import com.liang.domain.Singer;

import java.util.List;

public interface AdminSingerMapper {
    void insert(Singer singer);
    List<Singer> selectAll();
    void update(Singer singer);
    void deleteById(int id);
    Singer selectById(int id);
    Singer selectByName(String name);

}
