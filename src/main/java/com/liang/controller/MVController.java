package com.liang.controller;

import com.liang.domain.MV;
import com.liang.service.MVService;
import com.liang.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sms/mv")
public class MVController {

    @Autowired
    private MVService mvService;

    // 获取所有 MV
    @GetMapping("/list")
    public ResponseResult getAllMVs() {
        List<MV> mvs = mvService.getAllMVs();
        return new ResponseResult(200, "获取成功", mvs);
    }

    @GetMapping("/{id}")
    public ResponseResult getMVById(@PathVariable int id) {
        MV mv = mvService.getMVById(id);
        if (mv == null) {
            return new ResponseResult(404, "MV不存在", null);
        }
        return new ResponseResult(200, "获取成功", mv);
    }

    @PostMapping("/add")
    public ResponseResult addMV(@RequestBody MV mv) {
        mvService.addMV(mv);
        return new ResponseResult(200, "添加成功", null);
    }

    @PutMapping("/update")
    public ResponseResult updateMV(@RequestBody MV mv) {
        mvService.updateMV(mv);
        return new ResponseResult(200, "更新成功", null);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseResult deleteMV(@PathVariable int id) {
        mvService.deleteMV(id);
        return new ResponseResult(200, "删除成功", null);
    }
}
