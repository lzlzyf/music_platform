package com.liang.service.impl;

import com.liang.domain.SongCategory;
import com.liang.mapper.SongCategoryMapper;
import com.liang.service.SongCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongCategoryServiceImpl implements SongCategoryService {

    @Autowired
    private SongCategoryMapper categoryMapper;

    @Override
    public void addCategory(SongCategory category) {
        categoryMapper.insert(category);
    }

    @Override
    public void updateCategory(SongCategory category) {
        categoryMapper.update(category);
    }

    @Override
    public void deleteCategory(int id) {
        categoryMapper.deleteById(id);
    }

    @Override
    public SongCategory getCategoryById(int id) {
        return categoryMapper.selectById(id);
    }

    @Override
    public List<SongCategory> getAllCategories() {
        return categoryMapper.selectAll();
    }
}
