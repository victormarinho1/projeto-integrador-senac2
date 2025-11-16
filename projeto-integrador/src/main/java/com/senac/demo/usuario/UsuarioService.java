package com.senac.demo.usuario;

import com.senac.demo.core.authentication.RegisterDTO;
import com.senac.demo.core.exception.EmailAlreadyTakenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario criarUsuario(RegisterDTO usuario) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(usuario.email());
        if (usuarioExistente.isPresent()) {
            throw new EmailAlreadyTakenException();
        }

        return usuarioRepository.save(new Usuario(usuario.nome(),usuario.sobrenome(),
                usuario.email(),new BCryptPasswordEncoder().encode(usuario.senha())));
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com e-mail: " + email));
    }

    public List<Usuario> listarUsuarios(){
        return usuarioRepository.findAllByOrderByIdAsc();
    }


    public Usuario atualizarUsuario(Long id, Usuario usuarioAtualizado) {
        Usuario usuarioExistente = buscarPorId(id);

        usuarioExistente.setNome(usuarioAtualizado.getNome());
        usuarioExistente.setSobrenome(usuarioAtualizado.getSobrenome());
        usuarioExistente.setEmail(usuarioAtualizado.getEmail());
        usuarioExistente.setSenha(usuarioAtualizado.getSenha());
        usuarioExistente.setFuncao(usuarioAtualizado.getFuncao());
        usuarioExistente.setAtivo(usuarioAtualizado.getAtivo());
        usuarioExistente.setData_atualizacao(LocalDateTime.now());

        return usuarioRepository.save(usuarioExistente);
    }

    public void trocar_status(Long id) {
        Usuario usuarioExistente = buscarPorId(id);
        usuarioExistente.setAtivo(Boolean.valueOf(!usuarioExistente.getAtivo()));
        usuarioRepository.save(usuarioExistente);
    }

    public void excluirUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.usuarioRepository.findByEmail(username).get();
    }
}
