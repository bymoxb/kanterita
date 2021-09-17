package com.kruger.kanterita.controllers;

import com.kruger.kanterita.models.VaccineType;
import com.kruger.kanterita.services.VaccineTypeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = {"vaccine-types"})
@RestController
@RequestMapping("/api/vaccine-types")
@RequiredArgsConstructor
public class VaccineTypesController {
    private final VaccineTypeService vaccineTypeService;

    @ApiOperation(value = "Obtener la lista de las vacunas registradas")
    @GetMapping
    public ResponseEntity<List<VaccineType>> getAll() {
        return new ResponseEntity<>(vaccineTypeService.getAll(), HttpStatus.OK);
    }
}
