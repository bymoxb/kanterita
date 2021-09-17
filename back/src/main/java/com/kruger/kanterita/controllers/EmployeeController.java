package com.kruger.kanterita.controllers;

import com.kruger.kanterita.controllers.vo.EmployeeCreateVO;
import com.kruger.kanterita.controllers.vo.EmployeeUpdateVO;
import com.kruger.kanterita.models.Employee;
import com.kruger.kanterita.models.Vaccine;
import com.kruger.kanterita.models.VaccineType;
import com.kruger.kanterita.services.EmployeeService;
import com.kruger.kanterita.services.VaccineService;
import com.kruger.kanterita.services.VaccineTypeService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Api(tags = {"employee"})
@RestController
@RequestMapping("/api/employee")
@Validated
@RequiredArgsConstructor
@Slf4j
public class EmployeeController {

    private final EmployeeService employeeService;
    private final VaccineService vaccineService;
    private final VaccineTypeService vaccineTypeService;

    @ApiOperation(value = "Filtrar empleados")
    @GetMapping("/search")
    public ResponseEntity<List<Employee>> search(
            @ApiParam("Estado de vacunacion") @RequestParam(required = false, name = "vaccination-status", defaultValue = "true") Boolean state,
            @ApiParam("Tipo de vacuna vacuna") @RequestParam(required = false, name = "vaccine-type") int vaccineType,
            @ApiParam("Fecha de inicio") @RequestParam(required = false, name = "from") String from,
            @ApiParam("Fecha de fin") @RequestParam(required = false, name = "to") String to
    ) {
        return new ResponseEntity<>(employeeService.getAll(), HttpStatus.OK);
    }

    @ApiOperation(value = "Obtener información del usuario autenticado")
    @GetMapping("/me")
    public ResponseEntity<Employee> me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return new ResponseEntity<>(employeeService.findByCi(auth.getName()), HttpStatus.OK);
    }

    @ApiOperation(value = "Obtener la lista de los empleados registrados")
    @GetMapping
    public ResponseEntity<List<Employee>> getAll() {
        return new ResponseEntity<>(employeeService.getAll(), HttpStatus.OK);
    }

    @ApiOperation(value = "Registrar un nuevo empleado")
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

    @ApiOperation(value = "Actualizar al emplado autenticado")
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
