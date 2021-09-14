package com.kruger.kanterita.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "vaccine")
public class Vaccine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(nullable = false)
    private Date vaccination_date;

    @Column(nullable = false)
    private Integer doses_number;

    @ManyToOne(optional = false)
    @JoinColumn(name = "vaccine_type_id")
    private VaccineType vaccineType;

    @OneToOne(optional = false)
    @JoinColumn(name = "employee_id", unique = true)
    private Employee employee;

}
