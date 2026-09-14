package com.ventasfix.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProductoDTO {
    private String sku;

    @NotBlank
    private String nombre;

    @NotBlank
    private String descripcionCorta;

    @NotBlank
    private String descripcionLarga;

    @NotBlank
    private String imagen;

    @NotNull
    private Double precioNeto;

    @NotNull
    private Integer stockActual;

    @NotNull
    private Integer stockMinimo;

    @NotNull
    private Integer stockBajo;

    @NotNull
    private Integer stockAlto;
}
