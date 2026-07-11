package com.veterinaria.auth.service;

import com.veterinaria.auth.dto.LoginRequest;
import com.veterinaria.auth.dto.LoginResponse;
import com.veterinaria.auth.exception.InvalidCredentialsException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final String configuredUsername;
    private final String configuredPassword;
    private final JwtService jwtService;

    public AuthService(
            @Value("${app.auth.username}") String configuredUsername,
            @Value("${app.auth.password}") String configuredPassword,
            JwtService jwtService) {

        this.configuredUsername = configuredUsername;
        this.configuredPassword = configuredPassword;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {
        boolean validUsername = configuredUsername.equals(request.username());
        boolean validPassword = configuredPassword.equals(request.password());

        if (!validUsername || !validPassword) {
            throw new InvalidCredentialsException(
                    "Usuario o contraseña incorrectos"
            );
        }

        String token = jwtService.generateToken(request.username());

        return new LoginResponse(
                token,
                "Bearer",
                jwtService.getExpirationSeconds()
        );
    }
}