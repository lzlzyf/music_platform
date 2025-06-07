package com.liang.service;

import com.liang.domain.Singer;

import java.util.List;

public interface AdminSingerService {
    void addSinger(Singer singer);
    void updateSinger(Singer singer);
    void deleteSinger(int id);
    Singer getSingerById(int id);
    Singer getSingerByName(String name);
    List<Singer> getAllSingers();
}
