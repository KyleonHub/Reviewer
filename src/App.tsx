import React from 'react';
import { KMapSolver } from './components/kmap/KMapSolver';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-start py-8 px-4 sm:px-6 antialiased selection:bg-indigo-500 selection:text-white">
      <main className="w-full max-w-5xl mx-auto">
        <KMapSolver />
      </main>
    </div>
  );
};

export default App;
