package com.kruger.kanterita.controllers.vo;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Null;

@Data
public class EmployeeUpdateVO {

    @NotBlank(message = "Campo requerido")
    @Pattern(message = "Fecha de nacimiento inválida", regexp = "^\\d{4}-([0]\\d|1[0-2])-([0-2]\\d|3[01])$")
    private String birthday;

    @NotBlank(message = "Campo requerido")
    private String address;

    @NotBlank(message = "Campo requerido")
    @Pattern(message = "Teléfono inválido", regexp = "^\\d{10}$")
    private String phone;

    @NotNull
    private Boolean vaccination_status;

    //
    @Pattern(message = "Tipo de vacuna inválida", regexp = "^[\\d \\s\\-]*$|")
    private String vaccine_type;

    @Pattern(message = "Número de dósis inválida", regexp = "^[\\d \\s\\-]*$|")
    private String doses_number;

    @Pattern(message = "Fecha de vacunación inválida", regexp = "^[\\d{4}\\-([0]\\d|1[0-2])\\-([0-2]\\d|3[01]) \\s\\-]*$|")
    private String vaccination_date;
}
