import { useState, useEffect, useMemo } from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { getPrograms } from './services/api';
import type { Program, ProgramCategory, Lead } from './types';
import { Filters } from './components/Filters';
import { ProgramCard } from './components/ProgramCard';
import { LeadForm } from './components/LeadForm';
import { LeadTable } from './components/LeadTable';
import { useLeads } from './context/LeadContext';

export default function App() {
  const { leads, addLead, removeLead } = useLeads();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory | 'Todos'>('Todos');
  const [selectedProgramForLead, setSelectedProgramForLead] = useState<Program | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    let mounted = true;
    getPrograms()
      .then((data) => {
        if (mounted) {
          setPrograms(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchSearch =
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        selectedCategory === 'Todos' || program.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [programs, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE);
  const paginatedPrograms = filteredPrograms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSelectProgram = (program: Program) => {
    setSelectedProgramForLead(program);
  };

  const handleLeadSubmit = (name: string, email: string) => {
    if (!selectedProgramForLead) return;

    const newLead: Lead = {
      id: crypto.randomUUID(),
      name,
      email,
      programId: selectedProgramForLead.id,
      date: new Date().toISOString(),
    };

    addLead(newLead);
    setSelectedProgramForLead(null);
    alert('Registro guardado exitosamente');
  };

  const handleLeadCancel = () => {
    setSelectedProgramForLead(null);
  };

  const handleRemoveLead = (id: string, name: string) => {
    if (window.confirm(`¿Está seguro de eliminar el registro de ${name}?`)) {
      removeLead(id);
    }
  };

  const scrollToLeads = () => {
    document.getElementById('leads-table-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <header className="bg-[#003366] border-b-4 border-[#FFCC00] py-4 px-6 shadow-md shadow-black/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo-javeriana.png" alt="Logo Universidad Javeriana" className="h-12 object-contain hidden sm:block" />
            <div className="hidden sm:block w-px h-10 bg-white/30"></div>
            <div className="flex flex-col">
              <span className="text-[#FFCC00] text-xs font-bold tracking-widest uppercase">Dirección de Mercadeo</span>
              <h1 className="text-white text-xl md:text-2xl font-black tracking-tight uppercase leading-none">
                Gestión de Prospectos
              </h1>
            </div>
          </div>
          <button
            onClick={scrollToLeads}
            className="flex items-center gap-2 bg-[#d88c22] hover:bg-[#e59820] text-black px-4 py-2 rounded text-sm font-bold uppercase transition-colors shadow-sm"
          >
            Ver Registros
            <ArrowDownCircle className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 my-4">
        <section className="lg:col-span-8 bg-white border border-gray-200 rounded-xl shadow-sm p-6 min-h-[600px] flex flex-col">
          <h2 className="text-[#d88c22] font-bold text-xl uppercase mb-1">
            Oferta Académica
          </h2>
          <p className="text-gray-500 text-sm mb-6 pb-4 border-b border-gray-100">
            Programas de pregrado, posgrado y educación continua
          </p>
          <div className="flex-1 flex flex-col">
            <Filters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            
            {isLoading ? (
              <div className="flex-1 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366]"></div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                  {paginatedPrograms.map((program) => (
                    <ProgramCard
                      key={program.id}
                      program={program}
                      onSelect={handleSelectProgram}
                    />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-6 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-bold bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors uppercase"
                    >
                      Anterior
                    </button>
                    <span className="text-sm font-semibold text-gray-600">
                      Página {currentPage} de {totalPages}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-bold bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors uppercase"
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <aside className="lg:col-span-4 bg-white border border-gray-200 rounded-xl shadow-sm p-6 min-h-[600px] flex flex-col">
          <h2 className="text-[#d88c22] font-bold text-xl uppercase mb-1">
            Registro de Aspirantes
          </h2>
          <p className="text-gray-500 text-sm mb-6 pb-4 border-b border-gray-100">
            Inscripción a programas académicos
          </p>
          <div className="flex-1 flex flex-col">
            <LeadForm
              program={selectedProgramForLead}
              onSubmit={handleLeadSubmit}
              onCancel={handleLeadCancel}
            />
          </div>
        </aside>
      </main>

      <div id="leads-table-section" className="w-full max-w-7xl mx-auto px-6 pb-12 pt-4">
        <LeadTable leads={leads} programs={programs} onRemoveLead={handleRemoveLead} />
      </div>
    </div>
  );
}