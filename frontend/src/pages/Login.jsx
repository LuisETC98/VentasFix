import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor complete todos los campos');
      return;
    }
    
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto app-canvas">
      <div className="w-full max-w-md relative z-10 animate-toast">
        <div className="app-surface-card rounded-3xl p-8 relative overflow-hidden border border-purple-500/40">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-500 flex items-center justify-center text-white shadow-xl shadow-purple-600/40 font-display font-extrabold text-2xl border border-purple-400/50 mb-3">
              VF
            </div>
            <h1 className="font-display font-extrabold text-2xl text-white tracking-tight flex items-center gap-2">
              VentasFix <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40">PRO</span>
            </h1>
            <p className="text-xs text-purple-200/80 mt-1">Plataforma de Administración y Backoffice</p>
          </div>

          {error && <div className="mb-4 text-xs text-rose-300 bg-rose-950/50 p-2 rounded border border-rose-900" role="alert">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Correo Institucional (@ventasfix.cl)</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-purple-900/80 focus:border-purple-400 focus:outline-none font-mono bg-slate-950/80 text-white placeholder-slate-500" 
                placeholder="admin@ventasfix.cl" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Contraseña</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-purple-900/80 focus:border-purple-400 focus:outline-none bg-slate-950/80 text-white placeholder-slate-500" 
                placeholder="••••••••" />
            </div>
            <button type="submit" className="app-accent-btn w-full py-2.5 rounded-xl text-xs font-semibold text-white mt-4 border border-purple-400/40 shadow-lg">
              Ingresar al Sistema
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
