package com.ventasfix.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "clientes")
@Data
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String rutEmpresa;

    @Column(nullable = false)
    private String rubro;

    @Column(nullable = false)
    private String razonSocial;

    @Column(nullable = false)
    private String telefono;

    @Column(nullable = false)
    private String direccion;

    @Column(nullable = false)
    private String nombreContacto;

    @Column(nullable = false)
    private String emailContacto;
}
