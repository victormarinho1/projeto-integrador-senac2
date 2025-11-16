package com.senac.demo.denuncia;

import com.senac.demo.dashboard.DenunciaPorMesDTO;
import com.senac.demo.dashboard.DenunciasPorUsuarioDTO;
import com.senac.demo.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DenunciaRepository extends JpaRepository<Denuncia, Long> {
    Denuncia findByProtocolo(String protocolo);

    List<Denuncia> findByUsuarioResponsavel(Usuario responsavel);

    List<Denuncia> findByUsuarioDenunciante(Usuario denunciante);

    List<Denuncia> findByStatus(StatusDenuncia statusDenuncia);

    @Query("SELECT new com.senac.demo.dashboard.DenunciasPorUsuarioDTO(u.id, u.nome, COUNT(d)) " +
            "FROM Denuncia d " +
            "JOIN d.usuarioResponsavel u " +
            "GROUP BY u.id, u.nome " +
            "ORDER BY 3 DESC")
    List<DenunciasPorUsuarioDTO> countDenunciasAtendidasByUsuario();


    @Query("SELECT EXTRACT(MONTH FROM d.dataCriacao) AS mes, COUNT(d) AS total " +
            "FROM Denuncia d " +
            "GROUP BY EXTRACT(MONTH FROM d.dataCriacao)")
            List<DenunciaPorMesDTO> countDenunciasByMonth();
}
