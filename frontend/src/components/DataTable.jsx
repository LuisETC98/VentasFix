export default function DataTable({ columns, data, onEdit, onDelete }) {
  return (
    <div className="app-surface-card rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-purple-950/80">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="py-3.5 px-4">{col.header}</th>
              ))}
              <th className="py-3.5 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-950/60 text-slate-200">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-purple-950/20 transition-colors">
                {columns.map((col, cIdx) => (
                  <td key={cIdx} className="py-3.5 px-4">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => onEdit(row)} className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded hover:bg-purple-800 transition">Editar</button>
                    <button onClick={() => onDelete(row)} className="px-2 py-1 bg-rose-900/50 text-rose-300 rounded hover:bg-rose-800 transition">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="py-8 text-center text-slate-500">
                  No hay registros disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
