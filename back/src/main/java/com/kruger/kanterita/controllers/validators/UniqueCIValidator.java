package com.kruger.kanterita.controllers.validators;

import com.kruger.kanterita.controllers.annotations.UniqueCI;
import com.kruger.kanterita.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueCIValidator implements ConstraintValidator<UniqueCI, String> {

    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return employeeRepository.findByCi(value) == null;
    }
}
