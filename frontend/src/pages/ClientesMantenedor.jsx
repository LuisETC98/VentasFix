import { useState, useEffect } from 'react';
import api from '../services/api';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import ConfirmModal from '../components/ConfirmModal';

export default function ClientesMantenedor() {
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ rutEmpresa: '', rubro: '', razonSocial: '', telefono: '', direccion: '', nombreContacto: '', emailContacto: '' });
  const [editingId, setEditingId] = useState(null);
  const [deleteData, setDeleteData] = useState({ isOpen: false, row: null });

  const fetchClientes = async () => {
    try {
      const res = await api.get('/clientes');
      setData(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchClientes(); }, []);

  const handleEdit = (row) => {
    setFormData({ rutEmpresa: row.rutEmpresa, rubro: row.rubro, razonSocial: row.razonSocial, telefono: row.telefono, direccion: row.direccion, nombreContacto: row.nombreContacto, emailContacto: row.emailContacto });
    setEditingId(row.id);
    setModalOpen(true);
  };

  const handleDeleteClick = (row) => {
    setDeleteData({ isOpen: true, row });
  };

  const confirmDelete = async () => {
    if (deleteData.row) {
      try {
        await api.delete(`/clientes/${deleteData.row.id}`);
        fetchClientes();
      } catch (error) {
        alert(error.response?.data?.message || 'Error al eliminar');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/clientes/${editingId}`, formData);
      } else {
        await api.post('/clientes', formData);
      }
      setModalOpen(false);
      fetchClientes();
    } catch (error) {
      alert(error.response?.data?.message || 'Error al guardar');
    }
  };

  const columns = [
    { header: 'RUT Empresa', accessor: 'rutEmpresa' },
    { header: 'Razón Social', accessor: 'razonSocial' },
    { header: 'Rubro', accessor: 'rubro' },
    { header: 'Contacto', render: (row) => `${row.nombreContacto} (${row.emailContacto})` }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-xl font-bold text-white">Directorio de Clientes Empresa</h2>
        <button onClick={() => { setFormData({ rutEmpresa: '', rubro: '', razonSocial: '', telefono: '', direccion: '', nombreContacto: '', emailContacto: '' }); setEditingId(null); setModalOpen(true); }}
          className="app-accent-btn px-4 py-2 rounded-xl text-xs font-semibold text-white">
          Registrar Cliente
        </button>
      </div>

      <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDeleteClick} />

      <ConfirmModal 
        isOpen={deleteData.isOpen} 
        onClose={() => setDeleteData({ isOpen: false, row: null })}
        onConfirm={confirmDelete}
        title="Eliminar Cliente Empresa"
        message={`¿Estás seguro que deseas eliminar el registro de la empresa "${deleteData.row?.razonSocial}"? Se perderán todos sus datos de contacto de forma permanente.`}
      />

      <FormModal title={editingId ? 'Editar Cliente' : 'Nuevo Cliente'} isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-white block mb-1">RUT Empresa</label><input required className="w-full p-2 bg-slate-900 text-white rounded" value={formData.rutEmpresa} onChange={e => setFormData({...formData, rutEmpresa: e.target.value})} /></div>
          <div><label className="text-white block mb-1">Razón Social</label><input required className="w-full p-2 bg-slate-900 text-white rounded" value={formData.razonSocial} onChange={e => setFormData({...formData, razonSocial: e.target.value})} /></div>
          <div><label className="text-white block mb-1">Rubro</label><input required className="w-full p-2 bg-slate-900 text-white rounded" value={formData.rubro} onChange={e => setFormData({...formData, rubro: e.target.value})} /></div>
          <div><label className="text-white block mb-1">Teléfono</label><input required className="w-full p-2 bg-slate-900 text-white rounded" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} /></div>
          <div className="col-span-2"><label className="text-white block mb-1">Dirección</label><input required className="w-full p-2 bg-slate-900 text-white rounded" value={formData.direccion} onChange={e => setFormData({...formData, direccion: e.target.value})} /></div>
          <div><label className="text-white block mb-1">Nombre Contacto</label><input required className="w-full p-2 bg-slate-900 text-white rounded" value={formData.nombreContacto} onChange={e => setFormData({...formData, nombreContacto: e.target.value})} /></div>
          <div><label className="text-white block mb-1">Email Contacto</label><input required type="email" className="w-full p-2 bg-slate-900 text-white rounded" value={formData.emailContacto} onChange={e => setFormData({...formData, emailContacto: e.target.value})} /></div>
        </div>
      </FormModal>
    </div>
  );
}
