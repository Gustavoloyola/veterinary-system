package com.veterinaria.pet.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "owner-service",
        url = "${owner-service.url}"
)
public interface OwnerClient {

    @GetMapping("/api/owners/{id}/exists")
    boolean existsById(@PathVariable("id") Long id);
}