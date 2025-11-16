package com.senac.demo.usuario;

public record UsuarioDTO(
        Long id,
        String nome,
        String email,
        String funcao,
        Boolean ativo
) {

}
