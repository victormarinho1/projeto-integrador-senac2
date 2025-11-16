package com.senac.demo.usuario;

import com.senac.demo.core.authentication.RegisterDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@Valid @RequestBody RegisterDTO usuario) {
        Usuario usuarioCriado = usuarioService.criarUsuario(usuario);
        return new ResponseEntity<>(usuarioCriado, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        Usuario usuario = usuarioService.buscarPorId(id);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Usuario> buscarPorEmail(@PathVariable String email) {
        Usuario usuario = usuarioService.buscarPorEmail(email);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listar() {
      return ResponseEntity.ok(usuarioService.listarUsuarios())  ;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizarUsuario(@PathVariable Long id, @Valid @RequestBody Usuario usuario) {
        Usuario usuarioAtualizado = usuarioService.atualizarUsuario(id, usuario);
        return new ResponseEntity<>(usuarioAtualizado, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirUsuario(@PathVariable Long id) {
        usuarioService.excluirUsuario(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/trocar-status/{id}")
    public ResponseEntity<Void> desativarUsuario(@PathVariable Long id) {
        usuarioService.trocar_status(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
