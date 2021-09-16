package com.kruger.kanterita.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "vaccine")
public class Vaccine implements Serializable {

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

    public Vaccine(Date vaccination_date, Integer doses_number, VaccineType vaccineType, Employee employee) {
        this.vaccination_date = vaccination_date;
        this.doses_number = doses_number;
        this.vaccineType = vaccineType;
        this.employee = employee;
    }

    public Vaccine() {

    }
}
