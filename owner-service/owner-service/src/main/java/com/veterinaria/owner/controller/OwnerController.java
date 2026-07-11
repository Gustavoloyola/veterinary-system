package com.veterinaria.owner.controller;

import com.veterinaria.owner.dto.OwnerRequest;
import com.veterinaria.owner.entity.Owner;
import com.veterinaria.owner.service.OwnerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/owners")
@RequiredArgsConstructor
public class OwnerController {

    private final OwnerService ownerService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Owner create(@Valid @RequestBody OwnerRequest request) {
        return ownerService.create(request);
    }

    @GetMapping
    public List<Owner> findAll() {
        return ownerService.findAll();
    }

    @GetMapping("/{id}")
    public Owner findById(@PathVariable Long id) {
        return ownerService.findById(id);
    }

    @GetMapping("/{id}/exists")
    public boolean existsById(@PathVariable Long id) {
        return ownerService.existsById(id);
    }

    @PutMapping("/{id}")
    public Owner update(
            @PathVariable Long id,
            @Valid @RequestBody OwnerRequest request) {
        return ownerService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        ownerService.delete(id);
    }
}