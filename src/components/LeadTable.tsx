import { CheckCircle } from 'lucide-react';
import type { Lead, Program } from '../types';

interface LeadTableProps {
  leads: Lead[];
  programs: Program[];
}

export const LeadTable = ({ leads, programs }: LeadTableProps) => {
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

  if (leads.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 overflow-hidden flex flex-col">
      <h2 className="text-[#d88c22] font-bold text-xl uppercase mb-1">
        Nuevos Interesados
      </h2>
      <p className="text-gray-500 text-sm mb-6 pb-4 border-b border-gray-100">
        Tabla de gestión de leads registrados
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 font-bold">Nombre</th>
              <th className="px-4 py-3 font-bold">Email</th>
              <th className="px-4 py-3 font-bold">Programa Interés</th>
              <th className="px-4 py-3 font-bold">Fecha Registro</th>
              <th className="px-4 py-3 font-bold text-center">Estado (Validado)</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-gray-900">{lead.name}</td>
                <td className="px-4 py-3 text-gray-600">{lead.email}</td>
                <td className="px-4 py-3 text-gray-600">{getProgramName(lead.programId)}</td>
                <td className="px-4 py-3 text-gray-600">{formatDate(lead.date)}</td>
                <td className="px-4 py-3 flex justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};