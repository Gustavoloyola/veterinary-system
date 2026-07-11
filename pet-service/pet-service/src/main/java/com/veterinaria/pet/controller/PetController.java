package com.veterinaria.pet.controller;

import com.veterinaria.pet.dto.PetRequest;
import com.veterinaria.pet.entity.Pet;
import com.veterinaria.pet.service.PetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Pet create(@Valid @RequestBody PetRequest request) {
        return petService.create(request);
    }

    @GetMapping
    public List<Pet> findAll(
            @RequestParam(required = false) String species,
            @RequestParam(required = false) Long ownerId) {
        return petService.findAll(species, ownerId);
    }

    @GetMapping("/{id}")
    public Pet findById(@PathVariable Long id) {
        return petService.findById(id);
    }

    @PutMapping("/{id}")
    public Pet update(
            @PathVariable Long id,
            @Valid @RequestBody PetRequest request) {
        return petService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        petService.delete(id);
    }
}