package com.liang.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Singer {
    private int id;
    private String name;
    private String nationality;
    private String introduction;
    private String avatar;
    private LocalDateTime create_time;


}
