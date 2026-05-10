import { BookOpen } from 'lucide-react';
import type { Program } from '../types';

interface ProgramCardProps {
  program: Program;
  onSelect: (program: Program) => void;
}

export const ProgramCard = ({ program, onSelect }: ProgramCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-5 h-5 text-[#003366]" />
        <span className="text-sm font-semibold text-gray-700">
          {program.category}
        </span>
      </div>
      <h3 className="text-lg font-bold text-black mb-2 uppercase leading-tight">
        {program.title}
      </h3>
      <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
        {program.description}
      </p>
      <button
        type="button"
        onClick={() => onSelect(program)}
        className="w-full bg-[#fcaa27] hover:bg-[#e59820] text-black font-bold py-2.5 px-4 rounded transition-colors uppercase text-sm"
      >
        Inscríbeme
      </button>
    </div>
  );
};
