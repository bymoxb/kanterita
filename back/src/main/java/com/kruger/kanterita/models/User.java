package com.kruger.kanterita.models;

import com.kruger.kanterita.enums.Rol;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    @OneToOne(optional = false)
    @JoinColumn(name = "employee_id", unique = true)
    private Employee employee;
}
