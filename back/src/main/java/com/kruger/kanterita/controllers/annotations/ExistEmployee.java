package com.kruger.kanterita.controllers.annotations;

import com.kruger.kanterita.controllers.validators.ExistEmployeeValidator;
import com.kruger.kanterita.controllers.validators.UniqueCIValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ExistEmployeeValidator.class)
public @interface ExistEmployee {
    String message() default "Empleado no encontrado";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String[] values();
}
