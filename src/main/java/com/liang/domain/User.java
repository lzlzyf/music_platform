package com.liang.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private int id;
    private String username;
    private String password;
    private String email;
    private String nickname;
    private String phone;
    private String avatar;
    private String gender;
    private String hobby;
    private LocalDateTime create_time;


}
