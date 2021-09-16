package com.kruger.kanterita.repositories;

import com.kruger.kanterita.models.VaccineType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VaccineTypeRepository extends JpaRepository<VaccineType, Long> {
    Optional<VaccineType> findById(Long id);
}
