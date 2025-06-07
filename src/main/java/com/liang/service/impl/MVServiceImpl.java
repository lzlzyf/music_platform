package com.liang.service.impl;

import com.liang.domain.MV;
import com.liang.mapper.MVMapper;
import com.liang.service.MVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MVServiceImpl implements MVService {

    @Autowired
    private MVMapper mvMapper;

    @Override
    public List<MV> getAllMVs() {
        return mvMapper.selectAll();
    }

    @Override
    public MV getMVById(int id) {
        return mvMapper.selectById(id);
    }

    @Override
    public void addMV(MV mv) {
        mvMapper.insert(mv);
    }

    @Override
    public void updateMV(MV mv) {
        mvMapper.update(mv);
    }

    @Override
    public void deleteMV(int id) {
        mvMapper.deleteById(id);
    }
}
