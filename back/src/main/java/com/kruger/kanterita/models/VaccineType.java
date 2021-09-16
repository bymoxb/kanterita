package com.kruger.kanterita.models;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Table(name = "vaccine_types")
public class VaccineType implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @OneToMany(mappedBy = "vaccineType")
    private List<Vaccine> vaccine;

    public VaccineType(String name) {
        this.name = name;
    }

    public VaccineType() {

    }
}
