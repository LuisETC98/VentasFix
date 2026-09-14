import { useEffect } from 'react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-toast">
      <div className="app-surface-card w-full max-w-sm rounded-2xl p-6 relative border border-rose-500/40 shadow-[0_0_40px_-10px_rgba(225,29,72,0.3)]">
        
        {/* Icono de advertencia */}
        <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-rose-950/80 border border-rose-500/50 mb-4">
          <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h3 className="text-lg font-display font-bold text-white text-center mb-2">{title}</h3>
        <p className="text-sm text-slate-300 text-center mb-6 leading-relaxed">
          {message}
        </p>

        <div className="flex items-center gap-3 w-full">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-purple-900/60 hover:bg-slate-800 hover:text-white transition"
          >
            Cancelar
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-rose-500 border border-rose-400/50 hover:from-rose-500 hover:to-rose-400 shadow-lg shadow-rose-600/30 transition"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
