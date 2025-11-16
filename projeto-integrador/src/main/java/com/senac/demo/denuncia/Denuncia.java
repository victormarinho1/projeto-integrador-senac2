package com.senac.demo.denuncia;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.senac.demo.denunciaImagem.DenunciaImagem;
import com.senac.demo.usuario.Usuario;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "denuncia")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Denuncia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, columnDefinition = "TEXT")
    private String protocolo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @OneToMany(mappedBy = "denuncia", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DenunciaImagem> imagens = new ArrayList<>();

    @Column(name = "endereco_completo", columnDefinition = "TEXT")
    private String enderecoCompleto;

    @Column(length = 100)
    private String cidade;

    @Column(length = 100)
    private String rua;

    @Column(length = 100)
    private String bairro;

    @Column(length = 2)
    private String estado;

    @Column(length = 9)
    private String cep;

    @Column(precision = 10, scale = 8)
    private BigDecimal latitude;

    @Column(precision = 11, scale = 8)
    private BigDecimal longitude;

    @Column(nullable = true)
    private Boolean equipe_enviada;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 100)
    private StatusDenuncia status = StatusDenuncia.NOVA;

    @Enumerated(EnumType.STRING)
    @Column(length = 100)
    private PrioridadeDenuncia prioridade = PrioridadeDenuncia.SEM_ANALIZE;

    @Column(columnDefinition = "TEXT")
    private String devolutiva;

    @Column(name = "data_criacao", nullable = false, updatable = false)
    private LocalDateTime dataCriacao = LocalDateTime.now();

    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_usuario_responsavel", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_denuncia_usuario"))
    private Usuario usuarioResponsavel;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_usuario_denunciante", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_denuncia_usuario"))
    private Usuario usuarioDenunciante;
}
