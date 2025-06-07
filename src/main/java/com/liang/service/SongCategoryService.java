package com.liang.service;

import com.liang.domain.SongCategory;
import java.util.List;

public interface SongCategoryService {
    void addCategory(SongCategory category);
    void updateCategory(SongCategory category);
    void deleteCategory(int id);
    SongCategory getCategoryById(int id);
    List<SongCategory> getAllCategories();
}
