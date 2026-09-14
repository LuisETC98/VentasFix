package com.ventasfix.services;

import com.ventasfix.dto.ProductoDTO;
import com.ventasfix.models.Producto;
import com.ventasfix.repositories.ProductoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProductoServiceTest {

    @Mock
    private ProductoRepository productoRepository;

    @InjectMocks
    private ProductoService productoService;

    @Test
    public void testCalculoPrecioVenta() {
        ProductoDTO dto = new ProductoDTO();
        dto.setSku("SKU-1");
        dto.setNombre("Test");
        dto.setPrecioNeto(1000.0);
        dto.setStockActual(10);
        dto.setStockMinimo(2);
        dto.setStockBajo(5);
        dto.setStockAlto(20);

        when(productoRepository.existsBySku(any())).thenReturn(false);
        when(productoRepository.save(any(Producto.class))).thenAnswer(i -> i.getArgument(0));

        Producto guardado = productoService.save(dto);

        // 1000 + 19% = 1190
        assertEquals(1190.0, guardado.getPrecioVenta());
        verify(productoRepository).save(any(Producto.class));
    }
}
