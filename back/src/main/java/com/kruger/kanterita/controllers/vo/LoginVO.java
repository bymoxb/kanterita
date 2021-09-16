package com.kruger.kanterita.controllers.vo;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginVO {

    @NotBlank
    private String username;

    @NotBlank
    private String password;
}
