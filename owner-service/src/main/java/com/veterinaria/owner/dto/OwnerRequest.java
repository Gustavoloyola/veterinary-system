package com.veterinaria.owner.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record OwnerRequest(

        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
        String name,

        @NotBlank(message = "El teléfono es obligatorio")
        @Size(max = 15, message = "El teléfono no puede exceder 15 caracteres")
        String phone,

        @NotBlank(message = "El correo es obligatorio")
        @Email(message = "El correo no tiene un formato válido")
        @Size(max = 150, message = "El correo no puede exceder 150 caracteres")
        String email,

        @Size(max = 250, message = "La dirección no puede exceder 250 caracteres")
        String address
) {
}