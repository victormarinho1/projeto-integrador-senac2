package com.senac.demo.dashboard;

import com.senac.demo.denuncia.DenunciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    DashboardService dashboardService;

    @GetMapping("/total-status")
    public ResponseEntity<ContagemStatusDenunciaDTO> getTotalStatus() {
        ContagemStatusDenunciaDTO c = this.dashboardService.contagemStatusDenunciaDTO();
        return ResponseEntity.ok(c);
    }

    @GetMapping("/denuncias-atendidas")
    public ResponseEntity<List<DenunciasPorUsuarioDTO>> getDenunciasAtendidas() {
        List<DenunciasPorUsuarioDTO> d = this.dashboardService.getDenunciasAtendidas();
        return ResponseEntity.ok(d);
    }
}
