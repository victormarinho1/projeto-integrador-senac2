package com.senac.demo.core.authentication;

import com.senac.demo.core.config.TokenService;
import com.senac.demo.core.exception.EmailOrPasswordInvalidException;
import com.senac.demo.usuario.Usuario;
import com.senac.demo.usuario.UsuarioService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController{

    @Autowired
    private AuthenticationManager authenticationManager;


    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private TokenService tokenService;


    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid LoginDTO loginDTO) {
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(loginDTO.email(), loginDTO.senha());
            var auth = this.authenticationManager.authenticate(usernamePassword);

            var token = tokenService.generateToken((Usuario) auth.getPrincipal());
            return ResponseEntity.ok(new LoginResponseDTO(token));

        } catch (org.springframework.security.core.AuthenticationException e) {
            throw new EmailOrPasswordInvalidException();
        }
    }


    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO registerDTO){
        this.usuarioService.criarUsuario(registerDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


}