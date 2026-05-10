export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <header className="bg-[#003366] border-b-4 border-[#FFCC00] py-4 px-6 shadow-md shadow-black/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-white text-2xl font-black tracking-tight uppercase">
            Pontificia Universidad Javeriana
          </h1>
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
            
          </div>
        </aside>
      </main>
    </div>
  );
}