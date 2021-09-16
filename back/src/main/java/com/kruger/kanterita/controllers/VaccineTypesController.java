package com.kruger.kanterita.controllers;

import com.kruger.kanterita.models.VaccineType;
import com.kruger.kanterita.services.VaccineTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/vaccine-types")
@RequiredArgsConstructor
public class VaccineTypesController {
    private final VaccineTypeService vaccineTypeService;

    @GetMapping
    public ResponseEntity<List<VaccineType>> getAll() {
        return new ResponseEntity<>(vaccineTypeService.getAll(), HttpStatus.OK);
    }
}
