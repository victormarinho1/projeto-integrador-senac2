package com.senac.demo.dashboard;

import com.senac.demo.denuncia.DenunciaService;
import com.senac.demo.denuncia.StatusDenuncia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    @Autowired
    DenunciaService denunciaService;


    public ContagemStatusDenunciaDTO contagemStatusDenunciaDTO(){
      int total_nova =  this.denunciaService.buscarPorStatus(StatusDenuncia.NOVA).size();
      int total_em_andamento =  this.denunciaService.buscarPorStatus(StatusDenuncia.EM_ANDAMENTO).size();
      int total_concluida =  this.denunciaService.buscarPorStatus(StatusDenuncia.CONCLUIDA).size();

      return new ContagemStatusDenunciaDTO(total_nova,total_em_andamento,total_concluida);
    }

    public List<DenunciasPorUsuarioDTO> getDenunciasAtendidas() {
        return denunciaService.getDenunciasAtendidas();
    }
}
