import { useState, useEffect } from 'react';
import api from '../services/api';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import ConfirmModal from '../components/ConfirmModal';

export default function UsuariosMantenedor() {
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ rut: '', nombre: '', apellido: '', email: '', password: '' });
  const [editingId, setEditingId] = useState(null);
  const [deleteData, setDeleteData] = useState({ isOpen: false, row: null });

  const fetchUsuarios = async () => {
    try {
      const res = await api.get('/usuarios');
      setData(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchUsuarios(); }, []);

  const handleEdit = (row) => {
    setFormData({ rut: row.rut, nombre: row.nombre, apellido: row.apellido, email: row.email, password: '' });
    setEditingId(row.id);
    setModalOpen(true);
  };

  const handleDeleteClick = (row) => {
    setDeleteData({ isOpen: true, row });
  };

  const confirmDelete = async () => {
    if (deleteData.row) {
      try {
        await api.delete(`/usuarios/${deleteData.row.id}`);
        fetchUsuarios();
      } catch (error) {
        alert(error.response?.data?.message || error.response?.data?.error || 'Error al eliminar');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const payload = { ...formData };
        if (!payload.password || payload.password.trim() === '') {
          delete payload.password;
        }
        await api.put(`/usuarios/${editingId}`, payload);
      } else {
        await api.post('/usuarios', formData);
      }
      setModalOpen(false);
      fetchUsuarios();
    } catch (error) {
      alert(error.response?.data?.message || error.response?.data?.error || 'Error al guardar');
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'RUT', accessor: 'rut' },
    { header: 'Nombre', render: (row) => `${row.nombre} ${row.apellido}` },
    { header: 'Email', accessor: 'email' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-xl font-bold text-white">Mantenedor de Usuarios</h2>
        <button onClick={() => { setFormData({ rut: '', nombre: '', apellido: '', email: '', password: '' }); setEditingId(null); setModalOpen(true); }}
          className="app-accent-btn px-4 py-2 rounded-xl text-xs font-semibold text-white">
          Registrar Usuario
        </button>
      </div>

      <DataTable columns={columns} data={data} onEdit={handleEdit} onDelete={handleDeleteClick} />

      <ConfirmModal 
        isOpen={deleteData.isOpen} 
        onClose={() => setDeleteData({ isOpen: false, row: null })}
        onConfirm={confirmDelete}
        title="Eliminar Usuario"
        message={`¿Estás seguro que deseas eliminar a "${deleteData.row?.nombre} ${deleteData.row?.apellido}"? Esta acción revocará su acceso al sistema de inmediato.`}
      />

      <FormModal title={editingId ? 'Editar Usuario' : 'Nuevo Usuario'} isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit}>
        <div><label className="text-white block mb-1">RUT</label><input required className="w-full p-2 bg-slate-900 text-white rounded" value={formData.rut} onChange={e => setFormData({...formData, rut: e.target.value})} /></div>
        <div><label className="text-white block mb-1">Nombre</label><input required className="w-full p-2 bg-slate-900 text-white rounded" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} /></div>
        <div><label className="text-white block mb-1">Apellido</label><input required className="w-full p-2 bg-slate-900 text-white rounded" value={formData.apellido} onChange={e => setFormData({...formData, apellido: e.target.value})} /></div>
        <div><label className="text-white block mb-1">Email</label><input required type="email" className="w-full p-2 bg-slate-900 text-white rounded" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
        <div><label className="text-white block mb-1">Password {editingId && '(Dejar vacío para mantener)'}</label><input type="password" required={!editingId} className="w-full p-2 bg-slate-900 text-white rounded" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} /></div>
      </FormModal>
    </div>
  );
}
