package com.ventasfix.services;

import com.ventasfix.dto.ProductoDTO;
import com.ventasfix.models.Producto;
import com.ventasfix.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> findAll() {
        return productoRepository.findAll();
    }

    public Producto findById(Long id) {
        return productoRepository.findById(id).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    @Transactional
    public Producto save(ProductoDTO dto) {
        Producto producto = new Producto();
        producto.setSku("TEMP-" + System.currentTimeMillis()); // Evitar restricción null/unique temporalmente
        producto = mapDtoToEntity(dto, producto);
        Producto saved = productoRepository.save(producto);
        
        saved.setSku(String.format("SKU-%04d", saved.getId()));
        return productoRepository.save(saved);
    }

    @Transactional
    public Producto update(Long id, ProductoDTO dto) {
        Producto producto = findById(id);
        return productoRepository.save(mapDtoToEntity(dto, producto));
    }

    @Transactional
    public void delete(Long id) {
        if(!productoRepository.existsById(id)){
            throw new RuntimeException("Producto no encontrado");
        }
        productoRepository.deleteById(id);
    }

    private Producto mapDtoToEntity(ProductoDTO dto, Producto producto) {
        producto.setNombre(dto.getNombre());
        producto.setDescripcionCorta(dto.getDescripcionCorta());
        producto.setDescripcionLarga(dto.getDescripcionLarga());
        producto.setImagen(dto.getImagen());
        producto.setPrecioNeto(dto.getPrecioNeto());
        // Regla de negocio: Precio Venta = Neto + 19%
        producto.setPrecioVenta(dto.getPrecioNeto() * 1.19);
        producto.setStockActual(dto.getStockActual());
        producto.setStockMinimo(dto.getStockMinimo());
        producto.setStockBajo(dto.getStockBajo());
        producto.setStockAlto(dto.getStockAlto());
        return producto;
    }
}
