import React, { useState, useMemo } from 'react';
import { KMapCell } from '../../types/kmap';
import { createInitialGrid, solveKMap, KMAP_PRESETS } from '../../utils/kmapSolver';
import { KMapGrid } from './KMapGrid';
import { CircuitDiagram } from './CircuitDiagram';
import { RotateCcw, Sparkles, Binary, Cpu, Info } from 'lucide-react';

export const KMapSolver: React.FC = () => {
  // Initialize with notebook example preset: m1, m2, m3, m6, m7
  const [selectedPresetId, setSelectedPresetId] = useState<string>('notebook-example');
  const [cells, setCells] = useState<KMapCell[]>(() =>
    createInitialGrid([1, 2, 3, 6, 7])
  );
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);

  // Re-run automated prime implicant and minimal grouping solver whenever cells change
  const { groupings, minimizedSOP, expandedSOP, mintermList } = useMemo(
    () => solveKMap(cells),
    [cells]
  );

  // Toggle cell between 0 and 1
  const handleToggleCell = (minterm: number) => {
    setSelectedPresetId('custom');
    setCells(prev =>
      prev.map(cell =>
        cell.minterm === minterm
          ? { ...cell, value: cell.value === 1 ? 0 : 1 }
          : cell
      )
    );
  };

  // Apply selected preset
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = KMAP_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setCells(createInitialGrid(preset.minterms));
    }
  };

  // Reset to All Zeros
  const handleReset = () => {
    handleSelectPreset('all-zeros');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 text-zinc-100 font-sans p-4 sm:p-6">
      {/* ======================================================== */}
      {/* 1. HEADER SECTION                                        */}
      {/* ======================================================== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/30">
              <Binary className="w-5 h-5" />
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
              3-Variable K-Map Solver &amp; Circuit Visualizer
            </h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Variables: <span className="font-mono text-indigo-400 font-bold">F</span> (MSB),{' '}
            <span className="font-mono text-indigo-400 font-bold">S</span> (Middle),{' '}
            <span className="font-mono text-emerald-400 font-bold">M</span> (LSB). Gray Code 2x4 Grid.
          </p>
        </div>

        {/* Preset Selector & Clear Button */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <select
              value={selectedPresetId}
              onChange={e => handleSelectPreset(e.target.value)}
              className="w-full py-2 pl-3 pr-8 text-xs font-mono font-bold rounded-xl border border-zinc-700 bg-zinc-950 text-zinc-200 focus:outline-none focus:border-indigo-500 cursor-pointer shadow-sm"
            >
              <option value="custom" disabled>
                -- Select or Edit Preset --
              </option>
              {KMAP_PRESETS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleReset}
            title="Reset Grid to 0s"
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 border border-zinc-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. MATHEMATICAL EXPRESSION DISPLAY CARDS                  */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Expanded SOP */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-zinc-500">
              <Info className="w-3.5 h-3.5" /> Canonical SOP (Minterms)
            </span>
            <span className="text-[11px] text-zinc-400">
              Σm({mintermList.join(', ') || '∅'})
            </span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 font-mono text-xs sm:text-sm text-zinc-300 overflow-x-auto whitespace-nowrap">
            {expandedSOP || '0'}
          </div>
        </div>

        {/* Minimized SOP */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-indigo-500/30 shadow-sm space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-indigo-400">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Minimized Expression
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold">
              Optimal Quine-McCluskey
            </span>
          </div>

          <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/40 flex items-center justify-between font-mono text-sm sm:text-base font-bold overflow-x-auto">
            <span className="text-zinc-400">Y =</span>
            <div className="flex items-center gap-2 pl-2">
              {groupings.length === 0 ? (
                <span className="text-zinc-500">0</span>
              ) : minimizedSOP === '1' ? (
                <span className="text-emerald-400">1</span>
              ) : (
                groupings.map((grp, i) => (
                  <React.Fragment key={grp.id}>
                    {i > 0 && <span className="text-zinc-500">+</span>}
                    <button
                      type="button"
                      onMouseEnter={() => setHoveredTerm(grp.term)}
                      onMouseLeave={() => setHoveredTerm(null)}
                      style={{ color: grp.color }}
                      className={`px-2 py-1 rounded-lg border border-dashed transition-all cursor-pointer ${
                        hoveredTerm === grp.term
                          ? 'bg-white/10 ring-2 ring-white/30 scale-105 border-white'
                          : 'border-transparent hover:border-zinc-700'
                      }`}
                    >
                      {grp.term}
                    </button>
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. INTERACTIVE 2x4 KARNAUGH MAP GRID                     */}
      {/* ======================================================== */}
      <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              Interactive 2x4 K-Map Grid
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">
              (Click any cell to toggle 0 / 1)
            </span>
          </div>

          {/* Group Count Badge */}
          <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
            <span>Groups:</span>
            <span className="font-bold text-indigo-400">{groupings.length}</span>
          </div>
        </div>

        {/* 2x4 K-Map Grid */}
        <KMapGrid
          cells={cells}
          groupings={groupings}
          onToggleCell={handleToggleCell}
          hoveredTerm={hoveredTerm}
          onHoverTerm={setHoveredTerm}
        />

        {/* Implicants Legend */}
        {groupings.length > 0 && (
          <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center gap-2 justify-center">
            {groupings.map(grp => (
              <div
                key={grp.id}
                onMouseEnter={() => setHoveredTerm(grp.term)}
                onMouseLeave={() => setHoveredTerm(null)}
                style={{ borderColor: grp.color }}
                className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
                  hoveredTerm === grp.term ? 'bg-zinc-800 ring-2 ring-white/20' : 'bg-zinc-950'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: grp.color }}
                ></span>
                <span className="font-bold text-zinc-200">{grp.name}:</span>
                <span className="font-black" style={{ color: grp.color }}>
                  {grp.term}
                </span>
                <span className="text-[10px] text-zinc-500">
                  (m<sub>{grp.minterms.join(',')}</sub>)
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 4. DYNAMIC LOGIC CIRCUIT VISUALIZER                      */}
      {/* ======================================================== */}
      <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
              Synthesized Logic Circuit Diagram
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">
            Hover over terms above to highlight corresponding gates
          </span>
        </div>

        {/* Circuit Diagram Component */}
        <CircuitDiagram
          groupings={groupings}
          minimizedSOP={minimizedSOP}
          hoveredTerm={hoveredTerm}
          onHoverTerm={setHoveredTerm}
        />
      </div>
    </div>
  );
};
