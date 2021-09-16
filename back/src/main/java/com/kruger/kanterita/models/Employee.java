package com.kruger.kanterita.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "employees")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Employee implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public Employee(String ci, String firstname, String lastname, String email) {
        this.ci = ci;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }

    public Employee() {

    }
}
