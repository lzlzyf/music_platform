package com.liang.service.impl;

import com.liang.domain.Singer;
import com.liang.mapper.AdminSingerMapper;
import com.liang.service.AdminSingerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class AdminSingerServiceImpl implements AdminSingerService {

    @Autowired
    private AdminSingerMapper adminSingerMapper;
    @Override
    public void addSinger(Singer singer) {
        adminSingerMapper.insert(singer);
    }

    @Override
    public void updateSinger(Singer singer) {
        adminSingerMapper.update(singer);
    }

    @Override
    public void deleteSinger(int id) {
        adminSingerMapper.deleteById(id);
    }

    @Override
    public Singer getSingerById(int id) {
        return adminSingerMapper.selectById(id);
    }

    @Override
    public Singer getSingerByName(String name) {
        return adminSingerMapper.selectByName(name);
    }

    @Override
    public List<Singer> getAllSingers() {
        return adminSingerMapper.selectAll();
    }
}
