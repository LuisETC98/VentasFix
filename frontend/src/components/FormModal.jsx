export default function FormModal({ title, isOpen, onClose, onSubmit, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md relative z-10 animate-toast">
        <div className="app-surface-card rounded-3xl p-6 relative overflow-hidden border border-purple-500/40">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-display font-bold text-white">{title}</h2>
            <button type="button" onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-4 text-sm">
            {children}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-purple-900/40">
              <button type="button" onClick={onClose} className="px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-xl transition">Cancelar</button>
              <button type="submit" className="app-accent-btn px-4 py-2 rounded-xl text-white font-semibold transition">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
