package com.senac.demo.core.authentication;

public record RegisterDTO(
        String nome,
        String sobrenome,
        String email,
        String senha

) {
}