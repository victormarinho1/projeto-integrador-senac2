package com.senac.demo.denuncia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/denuncias")
public class DenunciaController {

    // ✅ Caminho absoluto dentro do container (montável via volume)
    private final String uploadDir = "/app/uploads/images/";

    @Autowired
    private DenunciaService denunciaService;

    @PostMapping
    public ResponseEntity<Denuncia> criar(@RequestBody Denuncia denuncia) {
        Denuncia criada = denunciaService.criar(denuncia);
        return ResponseEntity.status(201).body(criada);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Denuncia> buscarPorId(@PathVariable Long id) {
        Denuncia denuncia = denunciaService.buscarPorId(id);
        return ResponseEntity.ok(denuncia);
    }

    @GetMapping("/usuario-responsavel/{id}")
    public ResponseEntity<List<Denuncia>> buscarPorIdUsuarioResponsavel(@PathVariable Long id) {
        List<Denuncia> denuncias = denunciaService.buscarPorIdUsuarioResponsavel(id);
        return ResponseEntity.ok(denuncias);
    }

    @GetMapping("/usuario-denunciante/{id}")
    public ResponseEntity<List<Denuncia>> buscarPorIdUsuarioDenunciante(@PathVariable Long id) {
        List<Denuncia> denuncias = denunciaService.buscarPorIdUsuarioDenunciante(id);
        return ResponseEntity.ok(denuncias);
    }

    @GetMapping("/protocolo/{protocolo}")
    public ResponseEntity<Denuncia> buscarPorProtocolo(@PathVariable String protocolo) {
        Denuncia denuncia = denunciaService.buscarPorProtocolo(protocolo);
        return ResponseEntity.ok(denuncia);
    }

    @GetMapping
    public ResponseEntity<List<Denuncia>> listarTodas() {
        List<Denuncia> denuncias = denunciaService.listarTodas();
        return ResponseEntity.ok(denuncias);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Denuncia> atualizar(@PathVariable Long id, @RequestBody Denuncia denuncia) {
        Denuncia atualizada = denunciaService.atualizar(id, denuncia);
        return ResponseEntity.ok(atualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        denunciaService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/atender")
    public ResponseEntity<Denuncia> atenderDenuncia(@PathVariable Long id) {
        Denuncia denunciaAtendida = denunciaService.atenderDenuncia(id);
        return ResponseEntity.ok(denunciaAtendida);
    }

    @PatchMapping("/{protocolo}/prioridade")
    public ResponseEntity<Denuncia> definirPrioridade(@PathVariable String protocolo, @RequestBody PrioridadeDTO dto) {
        Denuncia denuncia = denunciaService.definirPrioridade(dto, protocolo);
        return ResponseEntity.ok(denuncia);
    }

    @PatchMapping("/{id}/finalizar-atendimento")
    public ResponseEntity<Denuncia> finalizarAtendimento(@PathVariable Long id, @RequestBody DevolutivaDTO dto) {
        Denuncia denuncia = denunciaService.finalizarAtendimento(id, dto);
        return ResponseEntity.ok(denuncia);
    }

    // ✅ Upload adaptado
    @PostMapping("/image")
    public ResponseEntity<String> uploadImages(@RequestParam("files") List<MultipartFile> files) {
        if (files.isEmpty()) {
            return ResponseEntity.badRequest().body("Por favor, envie ao menos um arquivo.");
        }

        StringBuilder message = new StringBuilder();

        for (MultipartFile file : files) {
            try {
                if (file.isEmpty()) continue;

                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                if (fileName.contains("..")) {
                    message.append("Nome de arquivo inválido: ").append(fileName).append("\n");
                    continue;
                }

                // ✅ Cria o diretório de destino se não existir
                Path directoryPath = Paths.get(uploadDir);
                Files.createDirectories(directoryPath);

                // ✅ Caminho completo do arquivo
                Path filePath = directoryPath.resolve(fileName);

                // ✅ Salva o arquivo
                file.transferTo(filePath.toFile());

                message.append("Imagem salva com sucesso: ").append(filePath).append("\n");

            } catch (IOException e) {
                message.append("Erro ao salvar o arquivo: ").append(e.getMessage()).append("\n");
            }
        }

        return ResponseEntity.ok(message.toString());
    }

    @GetMapping("/{id}/enviar-equipe")
    public ResponseEntity<Void> enviarEquipe(@PathVariable Long id) {
        denunciaService.enviarEquipe(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
