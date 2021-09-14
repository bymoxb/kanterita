package com.kruger.kanterita.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(unique = true, nullable = false, length = 10)
    private String ci;

    @Column(nullable = false)
    private String firstname;

    @Column(nullable = false)
    private String lastname;

    @Column(unique = true, nullable = false)
    private String email;

    //
    @Column
    private Date birthday;

    @Column
    private String address;

    @Column(length = 10)
    private String phone;

    @OneToOne(mappedBy = "employee")
    private Vaccine vaccine;

    //
    @OneToOne(mappedBy = "employee")
    private User user;
}
