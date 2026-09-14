import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DataTable from '../components/DataTable';

describe('DataTable Component', () => {
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nombre', accessor: 'nombre' }
  ];
  
  const mockData = [
    { id: 1, nombre: 'Item 1' },
    { id: 2, nombre: 'Item 2' },
    { id: 3, nombre: 'Item 3' }
  ];

  it('renders correctly with 3 rows of data', () => {
    render(<DataTable columns={columns} data={mockData} onEdit={()=>{}} onDelete={()=>{}} />);
    
    // Debería haber 4 filas en total (1 header + 3 de datos)
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(4);
    
    // Verifica que el contenido se renderiza
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('renders edit and delete buttons in every row', () => {
    render(<DataTable columns={columns} data={mockData} onEdit={()=>{}} onDelete={()=>{}} />);
    
    // Como hay 3 filas de datos, deberían existir 3 botones de Editar y 3 de Eliminar
    const editButtons = screen.getAllByText('Editar');
    const deleteButtons = screen.getAllByText('Eliminar');
    
    expect(editButtons.length).toBe(3);
    expect(deleteButtons.length).toBe(3);
  });
});
