package com.senac.demo.dashboard;

public class DenunciasPorUsuarioDTO {

    private Long id;
    private String nome;
    private Long denunciasAtendidas;

    public DenunciasPorUsuarioDTO(Long id, String nome, Long denunciasAtendidas) {
        this.id = id;
        this.nome = nome;
        this.denunciasAtendidas = denunciasAtendidas;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getDenunciasAtendidas() {
        return denunciasAtendidas;
    }

    public void setDenunciasAtendidas(Long denunciasAtendidas) {
        this.denunciasAtendidas = denunciasAtendidas;
    }
}
