package com.senac.demo.denuncia;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum PrioridadeDenuncia {
    BAIXA,
    MEDIA,
    ALTA,
    CRITICA,
    SEM_ANALIZE;


    @JsonCreator
    public static PrioridadeDenuncia fromString(String value) {
        // Garante que o valor seja ignorante a maiúsculas/minúsculas
        for (PrioridadeDenuncia prioridade : PrioridadeDenuncia.values()) {
            if (prioridade.name().equalsIgnoreCase(value)) {
                return prioridade;
            }
        }
        throw new IllegalArgumentException("Valor inválido para PrioridadeDenuncia: " + value);
    }
}
