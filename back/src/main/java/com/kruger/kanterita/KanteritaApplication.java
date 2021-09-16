package com.kruger.kanterita;

import com.kruger.kanterita.models.Employee;
import com.kruger.kanterita.models.VaccineType;
import com.kruger.kanterita.services.EmployeeService;
import com.kruger.kanterita.services.VaccineTypeService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class KanteritaApplication {

    public static void main(String[] args) {
        SpringApplication.run(KanteritaApplication.class, args);
    }

    @Bean
    CommandLineRunner run(EmployeeService employeeService, VaccineTypeService vaccineTypeService) {
        return args -> {
            vaccineTypeService.create(new VaccineType("Pfizer"));
            vaccineTypeService.create(new VaccineType("AstraZeneca"));
            vaccineTypeService.create(new VaccineType("Sputnik"));
            vaccineTypeService.create(new VaccineType("Jhonson&Jhonson"));

            employeeService.createAdmin(new Employee(
                    "1234567890",
                    "luis",
                    "illapa",
                    "moxb@outlook.es"
            ));
        };
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
