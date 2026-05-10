import { useState, useMemo } from 'react';
import { CheckCircle, Search, Trash2 } from 'lucide-react';
import type { Lead, Program } from '../types';

interface LeadTableProps {
  leads: Lead[];
  programs: Program[];
  onRemoveLead: (id: string, name: string) => void;
}

export const LeadTable = ({ leads, programs, onRemoveLead }: LeadTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const getProgramName = (id: number) => {
    const prog = programs.find((p) => p.id === id);
    return prog ? prog.title : 'Programa desconocido';
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const searchLower = searchQuery.toLowerCase();
      const programName = getProgramName(lead.programId).toLowerCase();
      return (
        lead.name.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower) ||
        programName.includes(searchLower)
      );
    });
  }, [leads, searchQuery, programs]);

  if (leads.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 overflow-hidden flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-gray-100 gap-4">
        <div>
          <h2 className="text-[#d88c22] font-bold text-xl uppercase mb-1">
            Nuevos Interesados
          </h2>
          <p className="text-gray-500 text-sm">
            Tabla de gestión de leads registrados
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar interesado..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003366]"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 font-bold">Nombre</th>
              <th className="px-4 py-3 font-bold">Email</th>
              <th className="px-4 py-3 font-bold">Programa Interés</th>
              <th className="px-4 py-3 font-bold">Fecha Registro</th>
              <th className="px-4 py-3 font-bold text-center">Estado</th>
              <th className="px-4 py-3 font-bold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-gray-900">{lead.name}</td>
                <td className="px-4 py-3 text-gray-600">{lead.email}</td>
                <td className="px-4 py-3 text-gray-600">{getProgramName(lead.programId)}</td>
                <td className="px-4 py-3 text-gray-600">{formatDate(lead.date)}</td>
                <td className="px-4 py-3 flex justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onRemoveLead(lead.id, lead.name)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                    title="Eliminar registro"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};