package com.liang.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Song_list_comment {
    private int id;
    private int user_id;
    private int song_list_id;
    private String content;
    private int score;
    private LocalDateTime create_time;
}
