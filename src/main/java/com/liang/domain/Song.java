package com.liang.domain;

import javafx.scene.input.DataFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Song {
    private int id;
    private String name;
    private int singer_id;
    private String album;
    private String lyrics;
    private String file_path;
    private String cover;
    private LocalDateTime create_timel;
    private String duration;

}
