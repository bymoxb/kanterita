package com.kruger.kanterita.services;

import com.kruger.kanterita.enums.Rol;
import com.kruger.kanterita.exceptions.EmployeeException;
import com.kruger.kanterita.models.Employee;
import com.kruger.kanterita.models.User;
import com.kruger.kanterita.repositories.EmployeeRepository;
import com.kruger.kanterita.repositories.UserRepository;
import com.kruger.kanterita.repositories.VaccineTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserService userService;

    public Optional<Employee> getById(Long id) {
        return employeeRepository.findById(id);
    }

    public List<Employee> getAll() {
        return (List<Employee>) employeeRepository.findAll();
    }

    public Employee findByCi(String ci) {
        return employeeRepository.findByCi(ci);
    }

    @Transactional
    public Employee create(Employee employee) throws EmployeeException {
        Employee employeeCreated = employeeRepository.save(employee);
        User user = new User(employee.getCi(), employee.getCi(), Rol.EMPLOYEE, employeeCreated);
        userService.create(user);
        return employeeCreated;
    }

    @Transactional
    public Employee createAdmin(Employee employee) throws EmployeeException {
        Employee employeeCreated = employeeRepository.save(employee);
        User user = new User(employee.getCi(), employee.getCi(), Rol.ADMIN, employeeCreated);
        userService.create(user);
        return employeeCreated;
    }

    @Transactional
    public Employee update(Employee employee) {
        return employeeRepository.save(employee);
    }
}
