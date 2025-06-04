package com.liang.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Song_list {
    private int id;
    private String name;
    private String type;
    private String introduction;
    private String cover;
    private LocalDateTime create_time;

}
