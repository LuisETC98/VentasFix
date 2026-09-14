package com.ventasfix.repositories;

import com.ventasfix.models.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    boolean existsByRutEmpresa(String rutEmpresa);
}
