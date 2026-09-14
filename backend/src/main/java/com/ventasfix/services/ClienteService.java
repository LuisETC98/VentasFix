package com.ventasfix.services;

import com.ventasfix.dto.ClienteDTO;
import com.ventasfix.models.Cliente;
import com.ventasfix.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    public Cliente findById(Long id) {
        return clienteRepository.findById(id).orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
    }

    @Transactional
    public Cliente save(ClienteDTO dto) {
        if(clienteRepository.existsByRutEmpresa(dto.getRutEmpresa())) {
            throw new RuntimeException("El RUT empresa ya está registrado");
        }
        Cliente cliente = new Cliente();
        return clienteRepository.save(mapDtoToEntity(dto, cliente));
    }

    @Transactional
    public Cliente update(Long id, ClienteDTO dto) {
        Cliente cliente = findById(id);
        if(!cliente.getRutEmpresa().equals(dto.getRutEmpresa()) && clienteRepository.existsByRutEmpresa(dto.getRutEmpresa())) {
            throw new RuntimeException("El RUT empresa ya está registrado");
        }
        return clienteRepository.save(mapDtoToEntity(dto, cliente));
    }

    @Transactional
    public void delete(Long id) {
        if(!clienteRepository.existsById(id)){
            throw new RuntimeException("Cliente no encontrado");
        }
        clienteRepository.deleteById(id);
    }

    private Cliente mapDtoToEntity(ClienteDTO dto, Cliente cliente) {
        cliente.setRutEmpresa(dto.getRutEmpresa());
        cliente.setRubro(dto.getRubro());
        cliente.setRazonSocial(dto.getRazonSocial());
        cliente.setTelefono(dto.getTelefono());
        cliente.setDireccion(dto.getDireccion());
        cliente.setNombreContacto(dto.getNombreContacto());
        cliente.setEmailContacto(dto.getEmailContacto());
        return cliente;
    }
}
