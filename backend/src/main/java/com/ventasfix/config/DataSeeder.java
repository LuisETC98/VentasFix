package com.ventasfix.config;

import com.ventasfix.dto.ClienteDTO;
import com.ventasfix.dto.ProductoDTO;
import com.ventasfix.dto.UsuarioDTO;
import com.ventasfix.services.ClienteService;
import com.ventasfix.services.ProductoService;
import com.ventasfix.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ProductoService productoService;

    @Autowired
    private ClienteService clienteService;

    @Override
    public void run(String... args) throws Exception {
        try {
            // Usuarios
            if (usuarioService.findAll().isEmpty()) {
                UsuarioDTO u1 = new UsuarioDTO();
                u1.setRut("11.111.111-1");
                u1.setNombre("Admin");
                u1.setApellido("VentasFix");
                u1.setEmail("admin@ventasfix.cl");
                u1.setPassword("admin123");
                usuarioService.save(u1);

                UsuarioDTO u2 = new UsuarioDTO();
                u2.setRut("22.222.222-2");
                u2.setNombre("Carlos");
                u2.setApellido("Silva");
                u2.setEmail("csilva@ventasfix.cl");
                u2.setPassword("carlos123");
                usuarioService.save(u2);
            }

            // Productos
            if (productoService.findAll().isEmpty()) {
                ProductoDTO p1 = new ProductoDTO();
                p1.setNombre("Laptop Pro 15");
                p1.setDescripcionCorta("Laptop de alto rendimiento");
                p1.setDescripcionLarga("Laptop con procesador i9 y 32GB RAM.");
                p1.setImagen("https://via.placeholder.com/150");
                p1.setPrecioNeto(1000000.0);
                p1.setStockActual(50);
                p1.setStockMinimo(10);
                p1.setStockBajo(20);
                p1.setStockAlto(100);
                productoService.save(p1);

                ProductoDTO p2 = new ProductoDTO();
                p2.setNombre("Monitor 4K");
                p2.setDescripcionCorta("Monitor UHD 27 pulgadas");
                p2.setDescripcionLarga("Monitor 4K para diseño gráfico con panel IPS.");
                p2.setImagen("https://via.placeholder.com/150");
                p2.setPrecioNeto(250000.0);
                p2.setStockActual(15);
                p2.setStockMinimo(5);
                p2.setStockBajo(10);
                p2.setStockAlto(50);
                productoService.save(p2);
            }

            // Clientes
            if (clienteService.findAll().isEmpty()) {
                ClienteDTO c1 = new ClienteDTO();
                c1.setRutEmpresa("76.123.456-7");
                c1.setRubro("Tecnología");
                c1.setRazonSocial("TechCorp SpA");
                c1.setTelefono("+56912345678");
                c1.setDireccion("Av. Providencia 123");
                c1.setNombreContacto("Juan Pérez");
                c1.setEmailContacto("jperez@techcorp.cl");
                clienteService.save(c1);

                ClienteDTO c2 = new ClienteDTO();
                c2.setRutEmpresa("77.987.654-3");
                c2.setRubro("Educación");
                c2.setRazonSocial("Educa SA");
                c2.setTelefono("+56987654321");
                c2.setDireccion("Calle Los Leones 456");
                c2.setNombreContacto("María Gómez");
                c2.setEmailContacto("mgomez@educa.cl");
                clienteService.save(c2);
            }
        } catch (Exception e) {
            System.out.println("Los datos ya existen o hubo un error en la carga: " + e.getMessage());
        }
    }
}
