import React from 'react';
import { KMapCell, KMapGrouping } from '../../types/kmap';
import { COL_LABELS, ROW_LABELS } from '../../utils/kmapSolver';

interface KMapGridProps {
  cells: KMapCell[];
  groupings: KMapGrouping[];
  onToggleCell: (minterm: number) => void;
  hoveredTerm: string | null;
  onHoverTerm: (term: string | null) => void;
}

export const KMapGrid: React.FC<KMapGridProps> = ({
  cells,
  groupings,
  onToggleCell,
  hoveredTerm,
  onHoverTerm
}) => {
  return (
    <div className="flex flex-col items-center select-none w-full max-w-2xl mx-auto">
      {/* Top Header Labels for FS (Columns) */}
      <div className="w-full pl-20 sm:pl-24 pr-2 grid grid-cols-4 gap-2 mb-2 text-center font-mono">
        {COL_LABELS.map((col, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs"
          >
            <span className="font-extrabold text-indigo-400">{col.code}</span>
            <span className="text-[10px] text-zinc-400 font-semibold">{col.label}</span>
          </div>
        ))}
      </div>

      {/* Main Grid Area: Left Row Labels + 2x4 Cells Container */}
      <div className="w-full flex items-stretch gap-2 sm:gap-3">
        {/* Left Row Labels for M (Rows) */}
        <div className="w-16 sm:w-20 flex flex-col justify-between py-1 gap-2 font-mono">
          {ROW_LABELS.map((row, rIdx) => (
            <div
              key={rIdx}
              className="flex-1 flex flex-col items-center justify-center p-2 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs"
            >
              <span className="text-[10px] uppercase text-zinc-500 font-bold">M</span>
              <span className="font-extrabold text-emerald-400 text-sm">{row.code}</span>
              <span className="text-[10px] text-zinc-400 font-semibold">{row.label}</span>
            </div>
          ))}
        </div>

        {/* 2x4 Interactive Cells & Grouping Overlays */}
        <div className="flex-1 relative rounded-2xl bg-zinc-950 border border-zinc-800 p-2 shadow-2xl overflow-hidden">
          {/* 2x4 Cell Buttons */}
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-44 sm:h-52">
            {cells.map(cell => {
              const isActive = cell.value === 1;
              return (
                <button
                  key={cell.minterm}
                  type="button"
                  onClick={() => onToggleCell(cell.minterm)}
                  className={`relative z-10 flex flex-col items-center justify-between p-2 rounded-xl border transition-all duration-150 active:scale-95 group focus:outline-none ${
                    isActive
                      ? 'bg-zinc-900/90 border-zinc-700/80 hover:border-zinc-500 shadow-md'
                      : 'bg-zinc-950/70 border-zinc-800/60 hover:border-zinc-700 text-zinc-600'
                  }`}
                >
                  {/* Minterm subscript label in top-left */}
                  <div className="w-full flex items-center justify-between text-[10px] font-mono">
                    <span className="text-zinc-500 font-bold group-hover:text-zinc-300">
                      m<sub>{cell.minterm}</sub>
                    </span>
                    <span className="text-[9px] text-zinc-600 group-hover:text-zinc-400">
                      {cell.binary}
                    </span>
                  </div>

                  {/* Cell Value: Big '1' or '0' */}
                  <div
                    className={`text-2xl sm:text-3xl font-black font-mono transition-transform group-hover:scale-110 ${
                      isActive
                        ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                        : 'text-zinc-700 group-hover:text-zinc-500'
                    }`}
                  >
                    {cell.value}
                  </div>

                  {/* Bottom hint label */}
                  <div className="text-[9px] font-mono text-zinc-500">
                    {isActive ? 'ON' : 'OFF'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ======================================================= */}
          {/* GROUPING OVERLAY BOXES                                  */}
          {/* ======================================================= */}
          <div className="absolute inset-2 pointer-events-none z-20">
            {groupings.map((grp, gIdx) => {
              const isHovered = hoveredTerm === grp.term;
              const termColor = grp.color;

              return grp.rects.map((rect, rIdx) => {
                const isWraparoundLeft = rect.colStart === 0 && grp.rects.length > 1;
                const isWraparoundRight = rect.colStart === 3 && grp.rects.length > 1;

                // Position styling based on 4 columns (25% each) and 2 rows (50% each)
                const left = `${rect.colStart * 25}%`;
                const top = `${rect.rowStart * 50}%`;
                const width = `${rect.colSpan * 25}%`;
                const height = `${rect.rowSpan * 50}%`;

                return (
                  <div
                    key={`${grp.id}-${rIdx}`}
                    style={{
                      left,
                      top,
                      width,
                      height,
                      borderColor: termColor,
                      backgroundColor: `${termColor}${isHovered ? '40' : '22'}`
                    }}
                    onMouseEnter={() => onHoverTerm(grp.term)}
                    onMouseLeave={() => onHoverTerm(null)}
                    className={`absolute p-1 transition-all duration-200 pointer-events-auto cursor-pointer ${
                      isWraparoundRight
                        ? 'rounded-l-2xl border-2 border-r-0 border-dashed'
                        : isWraparoundLeft
                        ? 'rounded-r-2xl border-2 border-l-0 border-dashed'
                        : 'rounded-2xl border-2'
                    } ${
                      isHovered
                        ? 'ring-4 ring-white/30 shadow-lg scale-[1.02]'
                        : 'shadow-sm'
                    }`}
                  >
                    {/* Small Group Label Badge */}
                    {rIdx === 0 && (
                      <div
                        style={{ backgroundColor: termColor }}
                        className="absolute -top-2.5 left-2 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold text-black uppercase font-mono shadow-sm flex items-center gap-1"
                      >
                        <span>G{gIdx + 1}:</span>
                        <span className="font-black">{grp.term}</span>
                      </div>
                    )}
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>

      {/* Grid Axis Legend */}
      <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-500 mt-3 px-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
          <span>Columns: Inputs F &amp; S (Gray Code: 00 &rarr; 01 &rarr; 11 &rarr; 10)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Rows: Input M (0 &rarr; 1)</span>
        </div>
      </div>
    </div>
  );
};
