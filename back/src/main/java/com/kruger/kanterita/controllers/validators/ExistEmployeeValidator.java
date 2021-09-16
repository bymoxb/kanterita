package com.kruger.kanterita.controllers.validators;

import com.kruger.kanterita.controllers.annotations.ExistEmployee;
import com.kruger.kanterita.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ExistEmployeeValidator implements ConstraintValidator<ExistEmployee, Long> {
    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public boolean isValid(Long value, ConstraintValidatorContext context) {
        return employeeRepository.findById(value) != null;
    }
}
