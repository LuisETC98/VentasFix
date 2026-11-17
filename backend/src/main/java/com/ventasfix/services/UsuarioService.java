package com.ventasfix.services;

import com.ventasfix.dto.UsuarioDTO;
import com.ventasfix.models.Usuario;
import com.ventasfix.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario findById(Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Transactional
    public Usuario save(UsuarioDTO dto) {
        if (dto.getPassword() == null || dto.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("La contraseña es obligatoria");
        }
        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        if (usuarioRepository.existsByRut(dto.getRut())) {
            throw new RuntimeException("El RUT ya está registrado");
        }
        if (!dto.getEmail().endsWith("@ventasfix.cl")) {
            throw new IllegalArgumentException("El email debe terminar en @ventasfix.cl");
        }
        
        Usuario usuario = new Usuario();
        usuario.setRut(dto.getRut());
        usuario.setNombre(dto.getNombre());
        usuario.setApellido(dto.getApellido());
        usuario.setEmail(dto.getEmail());
        usuario.setPassword(passwordEncoder.encode(dto.getPassword()));
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public Usuario update(Long id, UsuarioDTO dto) {
        Usuario usuario = findById(id);
        
        if (!usuario.getEmail().equals(dto.getEmail()) && usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        if (!usuario.getRut().equals(dto.getRut()) && usuarioRepository.existsByRut(dto.getRut())) {
            throw new RuntimeException("El RUT ya está registrado");
        }
        if (!dto.getEmail().endsWith("@ventasfix.cl")) {
            throw new IllegalArgumentException("El email debe terminar en @ventasfix.cl");
        }

        usuario.setRut(dto.getRut());
        usuario.setNombre(dto.getNombre());
        usuario.setApellido(dto.getApellido());
        usuario.setEmail(dto.getEmail());
        if (dto.getPassword() != null && !dto.getPassword().trim().isEmpty()){
            usuario.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public void delete(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado");
        }
        usuarioRepository.deleteById(id);
    }
}
