package com.senac.demo.core.authentication;

import com.senac.demo.usuario.Usuario;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {


    public Usuario getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Usuario user = (Usuario) authentication.getPrincipal();
            return user;
        }
        throw new RuntimeException();
    }
}