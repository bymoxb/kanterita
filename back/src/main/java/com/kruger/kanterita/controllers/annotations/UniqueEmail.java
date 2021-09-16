package com.kruger.kanterita.controllers.annotations;

import com.kruger.kanterita.controllers.validators.UniqueEmailValidator;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueEmailValidator.class)
@Documented
public @interface UniqueEmail {
    String message() default "Correo ya ha sido registrado";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
