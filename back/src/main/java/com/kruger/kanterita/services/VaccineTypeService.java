package com.kruger.kanterita.services;

import com.kruger.kanterita.models.VaccineType;
import com.kruger.kanterita.repositories.VaccineTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VaccineTypeService {

    private final VaccineTypeRepository repository;

    public Optional<VaccineType> getById(Long id) {
        return repository.findById(id);
    }

    public List<VaccineType> getAll() {
        return repository.findAll();
    }

    @Transactional
    public VaccineType create(VaccineType vaccineType) {
        return repository.save(vaccineType);
    }
}
