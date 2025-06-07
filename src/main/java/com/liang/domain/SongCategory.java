package com.liang.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SongCategory {
    private int id;
    private String categoryName; // 分类名称，如 "流行", "摇滚"
    private String description;  // 描述
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
