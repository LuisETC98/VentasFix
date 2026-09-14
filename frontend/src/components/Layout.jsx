import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';

export default function Layout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative z-10 app-workspace">
      <Sidebar onLogout={handleLogout} />
      
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 app-surface border-b border-purple-900/40 px-6 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-400">VentasFix</span>
            <span className="text-sm font-bold font-display text-white ml-2">Panel Administrativo</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <input type="text" placeholder="Buscar..." 
                className="w-56 pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-900/80 border border-purple-900/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition" />
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-7 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
