package com.kruger.kanterita.repositories;

import com.kruger.kanterita.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findById(Long id);

    Employee findByCi(String ci);

    Employee findByEmail(String email);
}
