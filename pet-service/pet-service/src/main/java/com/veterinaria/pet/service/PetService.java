package com.veterinaria.pet.service;

import com.veterinaria.pet.client.OwnerClient;
import com.veterinaria.pet.dto.PetRequest;
import com.veterinaria.pet.entity.Pet;
import com.veterinaria.pet.exception.ResourceNotFoundException;
import com.veterinaria.pet.repository.PetRepository;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PetService {

    private final PetRepository petRepository;
    private final OwnerClient ownerClient;

    public Pet create(PetRequest request) {
        validateOwner(request.ownerId());

        Pet pet = Pet.builder()
                .name(request.name())
                .species(request.species())
                .breed(request.breed())
                .birthDate(request.birthDate())
                .ownerId(request.ownerId())
                .build();

        return petRepository.save(pet);
    }

    public List<Pet> findAll(String species, Long ownerId) {
        if (species != null && !species.isBlank()) {
            return petRepository.findBySpeciesIgnoreCase(species);
        }

        if (ownerId != null) {
            return petRepository.findByOwnerId(ownerId);
        }

        return petRepository.findAll();
    }

    public Pet findById(Long id) {
        return petRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Mascota no encontrada con id: " + id
                        )
                );
    }

    public Pet update(Long id, PetRequest request) {
        validateOwner(request.ownerId());

        Pet pet = findById(id);

        pet.setName(request.name());
        pet.setSpecies(request.species());
        pet.setBreed(request.breed());
        pet.setBirthDate(request.birthDate());
        pet.setOwnerId(request.ownerId());

        return petRepository.save(pet);
    }

    public void delete(Long id) {
        Pet pet = findById(id);
        petRepository.delete(pet);
    }

    private void validateOwner(Long ownerId) {
        try {
            boolean exists = ownerClient.existsById(ownerId);

            if (!exists) {
                throw new ResourceNotFoundException(
                        "No existe un propietario con id: " + ownerId
                );
            }
        } catch (FeignException.NotFound exception) {
            throw new ResourceNotFoundException(
                    "No existe un propietario con id: " + ownerId
            );
        }
    }
}