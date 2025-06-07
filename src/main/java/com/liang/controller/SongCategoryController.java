package com.liang.controller;

import com.liang.AOP.GetAdmin;
import com.liang.domain.SongCategory;
import com.liang.service.SongCategoryService;
import com.liang.utils.ResponseResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/sms/song-category")
public class SongCategoryController {

    @Resource
    private SongCategoryService categoryService;

    // 获取所有分类
    @GetMapping("/list")
    @GetAdmin
    public ResponseResult getAllCategories() {
        List<SongCategory> categories = categoryService.getAllCategories();
        return new ResponseResult(200, "获取成功", categories);
    }


    @GetMapping("/{id}")
    @GetAdmin
    public ResponseResult getCategoryById(@PathVariable int id) {
        SongCategory category = categoryService.getCategoryById(id);
        if (category == null) {
            return new ResponseResult(404, "分类不存在", null);
        }
        return new ResponseResult(200, "获取成功", category);
    }

    @PostMapping("/add")
    @GetAdmin
    public ResponseResult addCategory(@RequestBody SongCategory category) {
        categoryService.addCategory(category);
        return new ResponseResult(200, "添加成功", null);
    }

    @PutMapping("/update")
    @GetAdmin
    public ResponseResult updateCategory(@RequestBody SongCategory category) {
        categoryService.updateCategory(category);
        return new ResponseResult(200, "更新成功", null);
    }

    @DeleteMapping("/delete/{id}")
    @GetAdmin
    public ResponseResult deleteCategory(@PathVariable int id) {
        categoryService.deleteCategory(id);
        return new ResponseResult(200, "删除成功", null);
    }
}
