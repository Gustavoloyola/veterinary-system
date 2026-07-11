package com.veterinaria.owner.service;

import com.veterinaria.owner.dto.OwnerRequest;
import com.veterinaria.owner.entity.Owner;
import com.veterinaria.owner.exception.DuplicateResourceException;
import com.veterinaria.owner.exception.ResourceNotFoundException;
import com.veterinaria.owner.repository.OwnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OwnerService {

    private final OwnerRepository ownerRepository;

    public Owner create(OwnerRequest request) {
        if (ownerRepository.existsByEmailIgnoreCase(request.email())) {
            throw new DuplicateResourceException(
                    "Ya existe un propietario con el correo: " + request.email()
            );
        }

        Owner owner = Owner.builder()
                .name(request.name())
                .phone(request.phone())
                .email(request.email())
                .address(request.address())
                .build();

        return ownerRepository.save(owner);
    }

    public List<Owner> findAll() {
        return ownerRepository.findAll();
    }

    public Owner findById(Long id) {
        return ownerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Propietario no encontrado con id: " + id
                        )
                );
    }

    public Owner update(Long id, OwnerRequest request) {
        Owner owner = findById(id);

        ownerRepository.findByEmailIgnoreCase(request.email())
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new DuplicateResourceException(
                            "Ya existe otro propietario con el correo: " + request.email()
                    );
                });

        owner.setName(request.name());
        owner.setPhone(request.phone());
        owner.setEmail(request.email());
        owner.setAddress(request.address());

        return ownerRepository.save(owner);
    }

    public void delete(Long id) {
        Owner owner = findById(id);
        ownerRepository.delete(owner);
    }

    public boolean existsById(Long id) {
        return ownerRepository.existsById(id);
    }
}