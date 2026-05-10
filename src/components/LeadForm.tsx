import { useState } from 'react';
import type { Program } from '../types';

interface LeadFormProps {
  program: Program | null;
  onSubmit: (name: string, email: string) => void;
  onCancel: () => void;
}

export const LeadForm = ({ program, onSubmit, onCancel }: LeadFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Normalización
    const trimmedName = name.trim().toUpperCase();
    const cleanEmail = email.trim().toLowerCase();

    // Regex ultra estricto para el nombre: solo letras (incluye acentos y la eñe) y espacios.
    // Bloquea números, signos de puntuación, etiquetas <script>, etc.
    const nameRegex = /^[A-ZÁÉÍÓÚÑÜ\s]+$/i;
    
    // Regex ultra estricto para el correo local: 
    // Obliga a que empiece y termine con alfanuméricos, permitiendo puntos o guiones intermedios,
    // pero prohibiendo cosas como ".@javeriana..." o múltiples puntos seguidos "..".
    const emailRegex = /^[a-z0-9]+([._-][a-z0-9]+)*@javeriana\.edu\.co$/i;

    if (!trimmedName) {
      setError('El nombre es obligatorio.');
      return;
    }
    
    if (!nameRegex.test(trimmedName)) {
      setError('El nombre solo debe contener letras (no se permiten números ni símbolos).');
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      setError('El formato del correo es inválido. Intente sin caracteres especiales al inicio de @javeriana.edu.co.');
      return;
    }

    setError('');
    onSubmit(trimmedName, cleanEmail);
    setName('');
    setEmail('');
  };

  if (!program) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 h-full min-h-[400px]">
        <p className="text-gray-500 font-medium">
          Seleccione un programa del catálogo de la izquierda haciendo clic en "Inscribir" para iniciar el proceso.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
      <div className="mb-2 pb-4 border-b border-gray-100">
        <h3 className="text-xs font-bold text-gray-500 uppercase mb-1">Programa seleccionado</h3>
        <p className="text-lg font-bold text-[#003366] leading-tight">{program.title}</p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">
          Nombre Completo
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003366]"
          placeholder="Ej. Marcelo Zeballos"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
          Correo Electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003366]"
          placeholder="ejemplo@javeriana.edu.co"
        />
      </div>

      {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2.5 px-4 rounded transition-colors uppercase text-sm"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 bg-[#003366] hover:bg-[#002244] text-white font-bold py-2.5 px-4 rounded transition-colors uppercase text-sm shadow-md"
        >
          Confirmar
        </button>
      </div>
    </form>
  );
};