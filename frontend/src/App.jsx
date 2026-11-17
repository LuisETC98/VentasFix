import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UsuariosMantenedor from './pages/UsuariosMantenedor';
import ProductosMantenedor from './pages/ProductosMantenedor';
import ClientesMantenedor from './pages/ClientesMantenedor';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="orb-animated-1 absolute -top-24 -left-20 w-[40rem] h-[40rem] rounded-full blur-[115px]" style={{background: 'radial-gradient(circle, var(--color-glow-1) 0%, transparent 70%)'}}></div>
        <div className="orb-animated-2 absolute top-1/4 -right-24 w-[44rem] h-[44rem] rounded-full blur-[130px]" style={{background: 'radial-gradient(circle, var(--color-glow-2) 0%, transparent 70%)'}}></div>
        <div className="orb-animated-1 absolute -bottom-32 left-1/3 w-[38rem] h-[38rem] rounded-full blur-[125px]" style={{background: 'radial-gradient(circle, var(--color-glow-3) 0%, transparent 70%)'}}></div>
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="usuarios" element={<UsuariosMantenedor />} />
          <Route path="productos" element={<ProductosMantenedor />} />
          <Route path="clientes" element={<ClientesMantenedor />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
