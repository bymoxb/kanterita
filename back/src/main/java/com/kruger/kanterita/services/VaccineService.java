package com.kruger.kanterita.services;

import com.kruger.kanterita.models.Vaccine;
import com.kruger.kanterita.repositories.VaccineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VaccineService {

    private final VaccineRepository repository;

    public Vaccine findByEmployeeId(Long employeeId) {
        return repository.findByEmployeeId(employeeId);
    }

    @Transactional
    public Vaccine create(Vaccine vaccine) {
        return repository.save(vaccine);
    }

    @Transactional
    public Vaccine update(Vaccine vaccine) {
        return repository.save(vaccine);
    }
}
