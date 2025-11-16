package com.senac.demo.core.authentication;

public record LoginDTO(
        String email,
        String senha
) {
}