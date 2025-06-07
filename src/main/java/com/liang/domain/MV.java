package com.liang.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MV {
    private int id;
    private String title;
    private String description;
    private String video_path;
    private String cover_path;
    private LocalDateTime createTime;
}