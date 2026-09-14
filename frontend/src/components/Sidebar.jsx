import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ onLogout }) {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: 'layout-dashboard', label: 'Dashboard' },
    { path: '/usuarios', icon: 'users', label: 'Usuarios' },
    { path: '/productos', icon: 'package', label: 'Productos' },
    { path: '/clientes', icon: 'building-2', label: 'Clientes Empresa' },
  ];

  return (
    <aside className="w-full md:w-64 app-surface border-r border-purple-900/40 flex flex-col justify-between shrink-0 shadow-2xl">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/50 font-display font-extrabold text-lg border border-purple-400/40">
            VF
          </div>
          <div>
            <span className="font-display font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              VentasFix <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">PRO</span>
            </span>
            <span className="text-[11px] text-purple-200/70 block leading-none mt-0.5">Administración</span>
          </div>
        </div>

        <nav className="space-y-1.5">
          {navItems.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link key={item.path} to={item.path}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all border border-transparent ${
                  isActive 
                  ? 'text-white bg-purple-600/90 shadow-lg shadow-purple-600/30 border-purple-400/30' 
                  : 'text-slate-300 hover:text-white hover:bg-purple-950/40'
                }`}>
                <div className="flex items-center gap-3">
                  <span>{item.label}</span>
                </div>
                {isActive && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-400/20 text-purple-200 border border-purple-400/30">Activo</span>}
              </Link>
            )
          })}
        </nav>

        {/* Indicador de Regla Fiscal */}
        <div className="mt-8 p-3.5 rounded-xl bg-purple-950/40 border border-purple-900/60 text-purple-200 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-white text-[11px]">
            <span>Régimen Tributario</span>
          </div>
          <p className="text-[10px] text-purple-300/70 leading-relaxed font-mono">
            IVA: 19% CLP<br />
            Cálculo: Neto × 1.19
          </p>
        </div>
      </div>

      <div className="p-4 border-t border-purple-950/60 bg-slate-950/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-900 to-indigo-950 text-purple-200 border border-purple-700/50 flex items-center justify-center font-bold text-xs font-display">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold truncate text-white">Administrador</p>
          </div>
        </div>
        <button onClick={onLogout} className="text-slate-400 hover:text-rose-400 transition p-1.5 rounded-lg hover:bg-rose-950/50">
          Salir
        </button>
      </div>
    </aside>
  );
}
