import { useState, useEffect, useMemo } from 'react';
import { getPrograms } from './services/api';
import type { Program, ProgramCategory } from './types';
import { Filters } from './components/Filters';
import { ProgramCard } from './components/ProgramCard';
import { LeadForm } from './components/LeadForm';

export default function App() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory | 'Todos'>('Todos');
  const [selectedProgramForLead, setSelectedProgramForLead] = useState<Program | null>(null);

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

  const handleSelectProgram = (program: Program) => {
    setSelectedProgramForLead(program);
  };

  const handleLeadSubmit = (name: string, email: string) => {
    console.log('Validación exitosa, datos limpios listos para localStorage:', { name, email, program: selectedProgramForLead });
    setSelectedProgramForLead(null);
  };

  const handleLeadCancel = () => {
    setSelectedProgramForLead(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <header className="bg-[#003366] border-b-4 border-[#FFCC00] py-4 px-6 shadow-md shadow-black/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-white text-2xl font-black tracking-tight uppercase">
            Pontificia Universidad Javeriana
          </h1>
          <img src="/logo-javeriana.png" alt="Logo Universidad Javeriana" className="h-12 object-contain" />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredPrograms.map((program) => (
                  <ProgramCard
                    key={program.id}
                    program={program}
                    onSelect={handleSelectProgram}
                  />
                ))}
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
    </div>
  );
}