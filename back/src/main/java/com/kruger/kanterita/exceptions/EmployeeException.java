package com.kruger.kanterita.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
public class EmployeeException extends RuntimeException {
    public EmployeeException(String message) {
        super(message);
    }
}
