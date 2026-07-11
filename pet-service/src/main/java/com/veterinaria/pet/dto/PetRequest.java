package com.veterinaria.pet.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record PetRequest(

        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
        String name,

        @NotBlank(message = "La especie es obligatoria")
        @Size(max = 50, message = "La especie no puede exceder 50 caracteres")
        String species,

        @Size(max = 50, message = "La raza no puede exceder 50 caracteres")
        String breed,

        @PastOrPresent(message = "La fecha de nacimiento no puede ser futura")
        LocalDate birthDate,

        @NotNull(message = "El propietario es obligatorio")
        @Positive(message = "El identificador del propietario debe ser mayor que cero")
        Long ownerId
) {
}