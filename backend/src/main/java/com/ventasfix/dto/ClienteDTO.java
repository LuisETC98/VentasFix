package com.ventasfix.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ClienteDTO {
    @NotBlank
    private String rutEmpresa;

    @NotBlank
    private String rubro;

    @NotBlank
    private String razonSocial;

    @NotBlank
    private String telefono;

    @NotBlank
    private String direccion;

    @NotBlank
    private String nombreContacto;

    @NotBlank
    @Email
    private String emailContacto;
}
