import { Search } from 'lucide-react';
import type { ProgramCategory } from '../types';

interface FiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ProgramCategory | 'Todos';
  onCategoryChange: (category: ProgramCategory | 'Todos') => void;
}

export const Filters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: FiltersProps) => {
  const categories: Array<ProgramCategory | 'Todos'> = ['Todos', 'Pregrado', 'Posgrado', 'Ed. Continua', 'Otros'];

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar programa..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#003366]"
        />
      </div>
      <div className="flex gap-2 items-center overflow-x-auto pb-2 sm:pb-0">
        <span className="text-sm font-bold text-gray-800 pr-2 hidden sm:block uppercase">Filtros</span>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-1.5 rounded text-sm font-semibold transition-colors whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#003366] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
