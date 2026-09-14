package com.ventasfix.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "productos")
@Data
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String sku;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String descripcionCorta;

    @Column(nullable = false, length = 1000)
    private String descripcionLarga;

    @Column(nullable = false)
    private String imagen;

    @Column(nullable = false)
    private Double precioNeto;

    @Column(nullable = false)
    private Double precioVenta;

    @Column(nullable = false)
    private Integer stockActual;

    @Column(nullable = false)
    private Integer stockMinimo;

    @Column(nullable = false)
    private Integer stockBajo;

    @Column(nullable = false)
    private Integer stockAlto;
}
