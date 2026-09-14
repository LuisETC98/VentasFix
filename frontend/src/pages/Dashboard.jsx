import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ totalUsuarios: 0, totalProductos: 0, totalClientes: 0 });
  const [stockInfo, setStockInfo] = useState({ critical: 0, low: 0, optimal: 0 });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsRes = await api.get('/dashboard/stats');
        setStats(statsRes.data);

        const prodRes = await api.get('/productos');
        let critical = 0;
        let low = 0;
        let optimal = 0;

        prodRes.data.forEach(p => {
          if (p.stockActual <= p.stockMinimo) critical++;
          else if (p.stockActual <= p.stockBajo) low++;
          else optimal++;
        });

        setStockInfo({ critical, low, optimal });
      } catch (error) {
        console.error("Error al cargar dashboard:", error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-7">
      <div className="app-surface-card p-6 md:p-7 rounded-2xl relative overflow-hidden group">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-purple-300 bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-500/40 inline-block">Panel de Control</span>
          <h1 className="text-xl md:text-3xl font-display font-extrabold text-white tracking-tight">Supervisión Operativa VentasFix</h1>
          <p className="text-xs md:text-sm text-slate-300">Resumen general de métricas del sistema y estado de inventario.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="app-surface-card p-6 rounded-2xl relative overflow-hidden">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Usuarios</span>
          <div className="text-4xl font-display font-black text-white mt-2">{stats.totalUsuarios}</div>
        </div>
        <div className="app-surface-card p-6 rounded-2xl relative overflow-hidden">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Productos</span>
          <div className="text-4xl font-display font-black text-white mt-2">{stats.totalProductos}</div>
          <span className="text-[10px] font-semibold text-purple-300 flex items-center gap-1 bg-purple-950/60 px-2 py-0.5 mt-2 rounded-full border border-purple-500/40 w-fit">
            IVA 19% incl.
          </span>
        </div>
        <div className="app-surface-card p-6 rounded-2xl relative overflow-hidden">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Clientes</span>
          <div className="text-4xl font-display font-black text-white mt-2">{stats.totalClientes}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="app-surface-card p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-sm text-white">Estado de Existencias</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-purple-300 border border-purple-900/60 font-semibold">Tiempo real</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-rose-500/40 bg-rose-950/30 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-rose-300">Bajo Stock Mínimo (Crítico)</p>
                <p className="text-[11px] text-rose-400/80">Reabastecimiento urgente</p>
              </div>
              <span className="text-sm font-bold font-mono px-2.5 py-1 rounded-lg bg-rose-950/80 text-rose-200 border border-rose-500/50">
                {stockInfo.critical} SKUs
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-amber-500/40 bg-amber-950/30 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-amber-300">Nivel de Stock Bajo</p>
                <p className="text-[11px] text-amber-400/80">Próximo al umbral de seguridad</p>
              </div>
              <span className="text-sm font-bold font-mono px-2.5 py-1 rounded-lg bg-amber-950/80 text-amber-200 border border-amber-500/50">
                {stockInfo.low} SKUs
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/30 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-300">Stock Óptimo</p>
                <p className="text-[11px] text-emerald-400/80">Existencias en nivel normal</p>
              </div>
              <span className="text-sm font-bold font-mono px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-200 border border-emerald-500/50">
                {stockInfo.optimal} SKUs
              </span>
            </div>
          </div>
        </div>

        <div className="app-surface-card p-6 rounded-2xl flex flex-col justify-center">
           <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-500/40 text-purple-200 text-xs space-y-2">
             <p className="font-bold text-sm text-white">Cálculo de Precios con IVA (19%)</p>
             <p className="text-xs text-purple-300/80 leading-relaxed">
               Los precios de venta mostrados en todo el sistema se computan automáticamente desde la base de datos aplicando la fórmula:
               <br/><br/>
               <span className="font-mono text-white bg-purple-900/60 px-2 py-1 rounded border border-purple-400/30">Precio Venta = Precio Neto × 1.19</span>
             </p>
           </div>
        </div>
      </div>
    </div>
  );
}
