package com.kruger.kanterita.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kruger.kanterita.enums.Rol;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    @OneToOne(optional = false)
    @JoinColumn(name = "employee_id", unique = true)
    private Employee employee;

    public User(String username, String password, Rol rol, Employee employee) {
        this.username = username;
        this.password = password;
        this.rol = rol;
        this.employee = employee;
    }

    public User() {
    }
}
