import { useState, useEffect } from 'react';
import api from '../services/api';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import ConfirmModal from '../components/ConfirmModal';

export default function ProductosMantenedor() {
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', descripcionCorta: '', descripcionLarga: '', imagen: '', precioNeto: 0, stockActual: 0, stockMinimo: 0, stockBajo: 0, stockAlto: 0 });
  const [editingId, setEditingId] = useState(null);
  const [deleteData, setDeleteData] = useState({ isOpen: false, row: null });

  const fetchProductos = async () => {
    try {
      const res = await api.get('/productos');
      setData(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchProductos(); }, []);

  const handleEdit = (row) => {
    setFormData({ nombre: row.nombre, descripcionCorta: row.descripcionCorta, descripcionLarga: row.descripcionLarga, imagen: row.imagen, precioNeto: row.precioNeto, stockActual: row.stockActual, stockMinimo: row.stockMinimo, stockBajo: row.stockBajo, stockAlto: row.stockAlto });
    setEditingId(row.id);
    setModalOpen(true);
  };

  const handleDeleteClick = (row) => {
    setDeleteData({ isOpen: true, row });
  };

  const confirmDelete = async () => {
    if (deleteData.row) {
      try {
        await api.delete(`/productos/${deleteData.row.id}`);
        fetchProductos();
      } catch (error) {
        alert(error.response?.data?.message || 'Error al eliminar');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/productos/${editingId}`, formData);
      } else {
        await api.post('/productos', formData);
      }
      setModalOpen(false);
      fetchProductos();
    } catch (error) {
      alert(error.response?.data?.message || 'Error al guardar');
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'SKU', accessor: 'sku' },
    { header: 'Nombre', accessor: 'nombre' },
    { header: 'Precio Neto', accessor: 'precioNeto', render: (row) => `$${row.precioNeto}` },
    { header: 'Precio Venta (IVA 19%)', accessor: 'precioVenta', render: (row) => <span className="text-purple-300 font-bold">${row.precioVenta}</span> },
    { header: 'Stock Actual', accessor: 'stockActual' },
    { header: 'Estado', accessor: 'estado', render: (row) => {
        if (row.stockActual <= row.stockMinimo) return <span className="text-[10px] bg-rose-950/80 text-rose-300 px-2 py-0.5 rounded border border-rose-500/50">Stock Crítico</span>;
        if (row.stockActual <= row.stockBajo) return <span className="text-[10px] bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded border border-amber-500/50">Stock Bajo</span>;
        return <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/50">Stock Óptimo</span>;
    }}
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-xl font-bold text-white">Catálogo de Productos</h2>
        <button onClick={() => { setFormData({ nombre: '', descripcionCorta: '', descripcionLarga: '', imagen: '', precioNeto: 0, stockActual: 0, stockMinimo: 0, stockBajo: 0, stockAlto: 0 }); setEditingId(null); setModalOpen(true); }}
          className="app-accent-btn px-4 py-2 rounded-xl text-xs font-semibold text-white">
          Nuevo Producto
        </button>
      </div>

      <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDeleteClick} />

      <ConfirmModal 
        isOpen={deleteData.isOpen} 
        onClose={() => setDeleteData({ isOpen: false, row: null })}
        onConfirm={confirmDelete}
        title="Eliminar Producto"
        message={`¿Estás seguro que deseas eliminar el producto "${deleteData.row?.nombre}"? Esta acción es permanente y no se puede deshacer.`}
      />

      <FormModal title={editingId ? 'Editar Producto' : 'Nuevo Producto'} isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-white block mb-1">Nombre</label><input required className="w-full p-2 bg-slate-900 text-white rounded" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} /></div>
          <div><label className="text-white block mb-1">Desc Corta</label><input required className="w-full p-2 bg-slate-900 text-white rounded" value={formData.descripcionCorta} onChange={e => setFormData({...formData, descripcionCorta: e.target.value})} /></div>
          <div><label className="text-white block mb-1">Desc Larga</label><input required className="w-full p-2 bg-slate-900 text-white rounded" value={formData.descripcionLarga} onChange={e => setFormData({...formData, descripcionLarga: e.target.value})} /></div>
          <div className="col-span-2"><label className="text-white block mb-1">Imagen URL</label><input required className="w-full p-2 bg-slate-900 text-white rounded" value={formData.imagen} onChange={e => setFormData({...formData, imagen: e.target.value})} /></div>
          <div><label className="text-white block mb-1">Precio Neto</label><input required type="number" className="w-full p-2 bg-slate-900 text-white rounded" value={formData.precioNeto} onChange={e => setFormData({...formData, precioNeto: parseFloat(e.target.value)})} /></div>
          <div><label className="text-white block mb-1">Stock Actual</label><input required type="number" className="w-full p-2 bg-slate-900 text-white rounded" value={formData.stockActual} onChange={e => setFormData({...formData, stockActual: parseInt(e.target.value)})} /></div>
          <div><label className="text-white block mb-1">Stock Mínimo</label><input required type="number" className="w-full p-2 bg-slate-900 text-white rounded" value={formData.stockMinimo} onChange={e => setFormData({...formData, stockMinimo: parseInt(e.target.value)})} /></div>
          <div><label className="text-white block mb-1">Stock Bajo</label><input required type="number" className="w-full p-2 bg-slate-900 text-white rounded" value={formData.stockBajo} onChange={e => setFormData({...formData, stockBajo: parseInt(e.target.value)})} /></div>
          <div><label className="text-white block mb-1">Stock Alto</label><input required type="number" className="w-full p-2 bg-slate-900 text-white rounded" value={formData.stockAlto} onChange={e => setFormData({...formData, stockAlto: parseInt(e.target.value)})} /></div>
        </div>
      </FormModal>
    </div>
  );
}
