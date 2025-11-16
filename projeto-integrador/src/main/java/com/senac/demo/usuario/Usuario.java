package com.senac.demo.usuario;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String nome;

    @Column(nullable = false, length = 255)
    private String sobrenome;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private UsuarioFuncao funcao = UsuarioFuncao.DENUNCIANTE;


    @Column(nullable = false)
    private Boolean ativo = (Boolean) true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime data_criacao = LocalDateTime.now();

    @Column
    private LocalDateTime data_atualizacao;


    public Usuario(String nome, String sobrenome, String email, String senha) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.senha = senha;
        this.funcao = UsuarioFuncao.DENUNCIANTE;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
         if(this.funcao == UsuarioFuncao.ADMIN) {
             return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
         }else if(this.funcao == UsuarioFuncao.CONSELHEIRO) {
             return List.of(new SimpleGrantedAuthority("ROLE_CONSELHEIRO"));
         }else {
             return List.of(new SimpleGrantedAuthority("ROLE_DENUNCIANTE"));
         }


    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isEnabled(){
        return this.ativo;
    }
}