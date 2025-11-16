package com.senac.demo.denunciaImagem;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.senac.demo.denuncia.Denuncia;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "denuncia_imagem")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DenunciaImagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_denuncia", nullable = false, foreignKey = @ForeignKey(name = "fk_imagem_denuncia"))
    private Denuncia denuncia;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String url;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "data_criacao", nullable = false, updatable = false)
    private LocalDateTime dataCriacao = LocalDateTime.now();
}
