package com.liang.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginForm {
    private String password;
    private String username;
    private int userType;
    private String verifyCode;
    private Long userId;

}


