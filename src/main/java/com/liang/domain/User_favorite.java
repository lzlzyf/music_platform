package com.liang.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User_favorite {
    private int user_id;
    private int id;
    private int type;
    private int target_id;
    private LocalDateTime create_time;

}
