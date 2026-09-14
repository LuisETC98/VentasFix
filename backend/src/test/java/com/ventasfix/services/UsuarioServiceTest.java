package com.ventasfix.services;

import com.ventasfix.dto.UsuarioDTO;
import com.ventasfix.models.Usuario;
import com.ventasfix.repositories.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UsuarioService usuarioService;

    @Test
    public void testEmailSufijoInvalido() {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setRut("123");
        dto.setNombre("Test");
        dto.setApellido("User");
        dto.setEmail("test@gmail.com");
        dto.setPassword("pass");

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            usuarioService.save(dto);
        });

        assertEquals("El email debe terminar en @ventasfix.cl", exception.getMessage());
        verify(usuarioRepository, never()).save(any());
    }

    @Test
    public void testCifradoPasswordAntesDeGuardar() {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setRut("123");
        dto.setNombre("Test");
        dto.setApellido("User");
        dto.setEmail("test@ventasfix.cl");
        dto.setPassword("pass123");

        when(usuarioRepository.existsByEmail(any())).thenReturn(false);
        when(usuarioRepository.existsByRut(any())).thenReturn(false);
        when(passwordEncoder.encode("pass123")).thenReturn("encryptedPass");
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Usuario guardado = usuarioService.save(dto);

        verify(passwordEncoder).encode("pass123");
        assertEquals("encryptedPass", guardado.getPassword());
        verify(usuarioRepository).save(any(Usuario.class));
    }
}
