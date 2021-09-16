package com.kruger.kanterita.controllers.annotations;

import com.kruger.kanterita.controllers.validators.UniqueCIValidator;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueCIValidator.class)
@Documented
public @interface UniqueCI {
    String message() default "Cédula ya ha sido registrada";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
