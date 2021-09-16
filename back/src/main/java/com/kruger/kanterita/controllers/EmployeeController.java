package com.kruger.kanterita.controllers;

import com.kruger.kanterita.controllers.vo.EmployeeCreateVO;
import com.kruger.kanterita.controllers.vo.EmployeeUpdateVO;
import com.kruger.kanterita.models.Employee;
import com.kruger.kanterita.models.User;
import com.kruger.kanterita.models.Vaccine;
import com.kruger.kanterita.models.VaccineType;
import com.kruger.kanterita.services.EmployeeService;
import com.kruger.kanterita.services.VaccineService;
import com.kruger.kanterita.services.VaccineTypeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/employee")
@Validated
@RequiredArgsConstructor
@Slf4j
public class EmployeeController {

    private final EmployeeService employeeService;
    private final VaccineService vaccineService;
    private final VaccineTypeService vaccineTypeService;

    @GetMapping
    public ResponseEntity<List<Employee>> getAll() {
        return new ResponseEntity<>(employeeService.getAll(), HttpStatus.OK);
    }

    @GetMapping
    @RequestMapping("/search")
    public ResponseEntity<List<Employee>> search(
            @RequestParam(required = false, name = "vaccination-status", defaultValue = "true") String state,
            @RequestParam(required = false, name = "vaccine-type") String vaccineType,
            @RequestParam(required = false, name = "from") String from,
            @RequestParam(required = false, name = "to") String to
    ) {
        return new ResponseEntity<>(employeeService.getAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Employee> getById(@PathVariable Long id) {
        Optional<Employee> employee = employeeService.getById(id);
        if (!employee.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(employee.get(), HttpStatus.OK);
    }

    @GetMapping
    @RequestMapping("/me")
    public ResponseEntity<Employee> me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        return new ResponseEntity<>(employeeService.findByCi(auth.getName()), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Employee> create(@Valid @RequestBody EmployeeCreateVO request) {

        Employee employee = new Employee(
                request.getCi(),
                request.getFirstname(),
                request.getLastname(),
                request.getEmail()
        );

        return new ResponseEntity<>(employeeService.create(employee), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Employee> update(@Valid @RequestBody EmployeeUpdateVO request) throws ParseException {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Employee employee = employeeService.findByCi(auth.getName());

        if (employee == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        employee.setPhone(request.getPhone());
        employee.setBirthday(dateFormat.parse(request.getBirthday()));
        employee.setAddress(request.getAddress());

        if (request.getVaccination_status()) {
            Optional<VaccineType> tempVaccineType = vaccineTypeService.getById(Long.valueOf(request.getVaccine_type()));

            if (tempVaccineType.isPresent()) {
                VaccineType vaccineType = tempVaccineType.get();

                Vaccine tempVaccine = vaccineService.findByEmployeeId(employee.getId());
                Vaccine vaccine = tempVaccine != null ? tempVaccine : new Vaccine();

                vaccine.setEmployee(employee);
                vaccine.setVaccination_date(dateFormat.parse(request.getVaccination_date()));
                vaccine.setDoses_number(Integer.parseInt(request.getDoses_number()));
                vaccine.setVaccineType(vaccineType);

                employee.setVaccine(
                        tempVaccine != null
                                ? vaccineService.update(vaccine)
                                : vaccineService.create(vaccine)
                );
            }
        }

        return new ResponseEntity<>(employeeService.update(employee), HttpStatus.OK);
    }

}
