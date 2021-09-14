package com.kruger.kanterita.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "vaccine_types")
public class VaccineType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @OneToMany(mappedBy = "vaccineType")
    private List<Vaccine> vaccine;
}
