package com.kruger.kanterita.controllers.vo;

import com.kruger.kanterita.controllers.annotations.UniqueCI;
import com.kruger.kanterita.controllers.annotations.UniqueEmail;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class EmployeeCreateVO {

    @NotBlank(message = "Campo requerido")
    @Pattern(message = "Cédula inválida", regexp = "^\\d{10}$")
    @UniqueCI
    private String ci;

    @NotBlank(message = "Campo requerido")
    @Pattern(message = "Nombre inválido", regexp = "^([A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00f6\\u00f8-\\u00ff\\s]*)$")
    private String firstname;

    @NotBlank(message = "Campo requerido")
    @Pattern(message = "Apellido inválido", regexp = "^([A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00f6\\u00f8-\\u00ff\\s]*)$")
    private String lastname;

    @NotBlank(message = "Campo requerido")
    @Email(message = "Correo inválido")
    @UniqueEmail
    private String email;
}
