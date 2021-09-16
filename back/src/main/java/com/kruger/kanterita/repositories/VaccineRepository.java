package com.kruger.kanterita.repositories;

import com.kruger.kanterita.models.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VaccineRepository extends JpaRepository<Vaccine, Long> {
    Vaccine findByEmployeeId(Long id);
}
