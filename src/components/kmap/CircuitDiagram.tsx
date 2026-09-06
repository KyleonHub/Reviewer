import React from 'react';
import { KMapGrouping } from '../../types/kmap';

interface CircuitDiagramProps {
  groupings: KMapGrouping[];
  minimizedSOP: string;
  hoveredTerm: string | null;
  onHoverTerm: (term: string | null) => void;
}

export const CircuitDiagram: React.FC<CircuitDiagramProps> = ({
  groupings,
  minimizedSOP,
  hoveredTerm,
  onHoverTerm
}) => {
  // Edge case: All 0s
  if (minimizedSOP === '0' || groupings.length === 0) {
    return (
      <div className="w-full h-48 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-500 font-mono text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/50"></span>
          <span>Constant LOW (0 V / Logic 0)</span>
        </div>
        <p className="text-xs text-zinc-600 mt-1">Output tied directly to GND.</p>
      </div>
    );
  }

  // Edge case: All 1s
  if (minimizedSOP === '1') {
    return (
      <div className="w-full h-48 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-400 font-mono text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
          <span className="text-emerald-400 font-bold">Constant HIGH (VCC / Logic 1)</span>
        </div>
        <p className="text-xs text-zinc-600 mt-1">Output tied directly to VCC (All minterms active).</p>
      </div>
    );
  }

  // Layout geometry for the 3-variable circuit
  const width = 640;
  const height = Math.max(260, 90 + groupings.length * 70);

  // Vertical Input Rail X positions
  const railX = {
    F: 40,
    F_bar: 75,
    S: 110,
    S_bar: 145,
    M: 180,
    M_bar: 215
  };

  // Determine which inverted rails are required
  const needsFBar = groupings.some(g => g.term.includes('F̄'));
  const needsSBar = groupings.some(g => g.term.includes('S̄'));
  const needsMBar = groupings.some(g => g.term.includes('M̄'));

  // Calculate AND gates Y positions
  const startGateY = 70;
  const gateSpacing = 65;

  const andGates = groupings.map((grp, idx) => {
    const y = startGateY + idx * gateSpacing;
    const term = grp.term;
    const isHovered = hoveredTerm === term;
    return {
      id: `gate-${idx}`,
      term,
      color: grp.color,
      isHovered,
      y,
      x: 320,
      isSingleLiteral: term.length <= 2 && !term.includes('+') // e.g. "S" or "F̄"
    };
  });

  // Final OR gate position
  const orGateX = 490;
  const orGateY =
    andGates.length === 1
      ? andGates[0].y
      : (andGates[0].y + andGates[andGates.length - 1].y) / 2;

  return (
    <div className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 overflow-hidden relative shadow-inner">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
            IEEE/ANSI Logic Schematic
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-mono">
            SOP Implementation
          </span>
        </div>
        <div className="text-xs font-mono text-zinc-400">
          Output: <span className="text-emerald-400 font-bold">Y = {minimizedSOP}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[580px] select-none"
        >
          <defs>
            <linearGradient id="railGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* =================================================== */}
          {/* 1. INPUT RAILS & INVERTERS                          */}
          {/* =================================================== */}
          {/* Rail F */}
          <g>
            <text x={railX.F} y={20} fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">F</text>
            <line x1={railX.F} y1={25} x2={railX.F} y2={height - 20} stroke="#4f46e5" strokeWidth="2" />
            {needsFBar && (
              <>
                {/* Tap to Inverter */}
                <line x1={railX.F} y1={36} x2={railX.F_bar - 18} y2={36} stroke="#4f46e5" strokeWidth="1.5" />
                <circle cx={railX.F} cy={36} r="2.5" fill="#818cf8" />
                {/* Inverter Triangle */}
                <path d={`M ${railX.F_bar - 18} 31 L ${railX.F_bar - 6} 36 L ${railX.F_bar - 18} 41 Z`} fill="#18181b" stroke="#818cf8" strokeWidth="1.5" />
                <circle cx={railX.F_bar - 3} cy={36} r="2.5" fill="#18181b" stroke="#818cf8" strokeWidth="1.5" />
                {/* Inverted Rail Line */}
                <line x1={railX.F_bar} y1={36} x2={railX.F_bar} y2={height - 20} stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x={railX.F_bar} y={20} fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">F̄</text>
              </>
            )}
          </g>

          {/* Rail S */}
          <g>
            <text x={railX.S} y={20} fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">S</text>
            <line x1={railX.S} y1={25} x2={railX.S} y2={height - 20} stroke="#4f46e5" strokeWidth="2" />
            {needsSBar && (
              <>
                <line x1={railX.S} y1={36} x2={railX.S_bar - 18} y2={36} stroke="#4f46e5" strokeWidth="1.5" />
                <circle cx={railX.S} cy={36} r="2.5" fill="#818cf8" />
                <path d={`M ${railX.S_bar - 18} 31 L ${railX.S_bar - 6} 36 L ${railX.S_bar - 18} 41 Z`} fill="#18181b" stroke="#818cf8" strokeWidth="1.5" />
                <circle cx={railX.S_bar - 3} cy={36} r="2.5" fill="#18181b" stroke="#818cf8" strokeWidth="1.5" />
                <line x1={railX.S_bar} y1={36} x2={railX.S_bar} y2={height - 20} stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x={railX.S_bar} y={20} fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">S̄</text>
              </>
            )}
          </g>

          {/* Rail M */}
          <g>
            <text x={railX.M} y={20} fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">M</text>
            <line x1={railX.M} y1={25} x2={railX.M} y2={height - 20} stroke="#4f46e5" strokeWidth="2" />
            {needsMBar && (
              <>
                <line x1={railX.M} y1={36} x2={railX.M_bar - 18} y2={36} stroke="#4f46e5" strokeWidth="1.5" />
                <circle cx={railX.M} cy={36} r="2.5" fill="#818cf8" />
                <path d={`M ${railX.M_bar - 18} 31 L ${railX.M_bar - 6} 36 L ${railX.M_bar - 18} 41 Z`} fill="#18181b" stroke="#818cf8" strokeWidth="1.5" />
                <circle cx={railX.M_bar - 3} cy={36} r="2.5" fill="#18181b" stroke="#818cf8" strokeWidth="1.5" />
                <line x1={railX.M_bar} y1={36} x2={railX.M_bar} y2={height - 20} stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x={railX.M_bar} y={20} fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">M̄</text>
              </>
            )}
          </g>

          {/* =================================================== */}
          {/* 2. AND GATES & TAPS FOR PRODUCT TERMS               */}
          {/* =================================================== */}
          {andGates.map(gate => {
            const term = gate.term;
            const y = gate.y;
            const isHovered = gate.isHovered;
            const strokeColor = isHovered ? gate.color : '#94a3b8';
            const strokeW = isHovered ? 2.5 : 1.5;

            // Extract literals from term
            const hasF = term.includes('F') && !term.includes('F̄');
            const hasFBar = term.includes('F̄');
            const hasS = term.includes('S') && !term.includes('S̄');
            const hasSBar = term.includes('S̄');
            const hasM = term.includes('M') && !term.includes('M̄');
            const hasMBar = term.includes('M̄');

            const literals: { rx: number; name: string }[] = [];
            if (hasF) literals.push({ rx: railX.F, name: 'F' });
            if (hasFBar) literals.push({ rx: railX.F_bar, name: 'F̄' });
            if (hasS) literals.push({ rx: railX.S, name: 'S' });
            if (hasSBar) literals.push({ rx: railX.S_bar, name: 'S̄' });
            if (hasM) literals.push({ rx: railX.M, name: 'M' });
            if (hasMBar) literals.push({ rx: railX.M_bar, name: 'M̄' });

            // If single literal (e.g. "S"), no AND gate is needed; wire runs directly
            if (literals.length === 1) {
              const rx = literals[0].rx;
              return (
                <g
                  key={gate.id}
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => onHoverTerm(term)}
                  onMouseLeave={() => onHoverTerm(null)}
                  filter={isHovered ? 'url(#glow)' : undefined}
                >
                  <circle cx={rx} cy={y} r="3" fill={strokeColor} />
                  <line x1={rx} y1={y} x2={orGateX} y2={y} stroke={strokeColor} strokeWidth={strokeW} />
                  <text
                    x={gate.x}
                    y={y - 8}
                    fill={isHovered ? gate.color : '#cbd5e1'}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {term} (Direct Rail)
                  </text>
                </g>
              );
            }

            // Multi-literal AND gate
            const inputY1 = y - 10;
            const inputY2 = y + 10;
            const inputOffsets = literals.length === 2 ? [inputY1, inputY2] : [y - 12, y, y + 12];

            return (
              <g
                key={gate.id}
                className="cursor-pointer transition-all duration-150"
                onMouseEnter={() => onHoverTerm(term)}
                onMouseLeave={() => onHoverTerm(null)}
                filter={isHovered ? 'url(#glow)' : undefined}
              >
                {/* Horizontal Tap Lines from Rails to AND Gate */}
                {literals.map((lit, i) => {
                  const ty = inputOffsets[i] || y;
                  return (
                    <g key={i}>
                      <circle cx={lit.rx} cy={ty} r="3" fill={strokeColor} />
                      <line x1={lit.rx} y1={ty} x2={gate.x} y2={ty} stroke={strokeColor} strokeWidth={strokeW} />
                    </g>
                  );
                })}

                {/* IEEE/ANSI 2-Input/3-Input AND Gate Path */}
                {/* Flat back at x, arc on right side */}
                <path
                  d={`M ${gate.x} ${y - 18} L ${gate.x + 24} ${y - 18} A 18 18 0 0 1 ${gate.x + 24} ${y + 18} L ${gate.x} ${y + 18} Z`}
                  fill={isHovered ? '#1e1b4b' : '#18181b'}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                />

                {/* Gate Label */}
                <text
                  x={gate.x + 14}
                  y={y + 4}
                  fill={isHovered ? gate.color : '#e2e8f0'}
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  AND
                </text>

                <text
                  x={gate.x + 48}
                  y={y - 8}
                  fill={isHovered ? gate.color : '#94a3b8'}
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {term}
                </text>

                {/* Lead wire from AND output to OR gate */}
                <line
                  x1={gate.x + 42}
                  y1={y}
                  x2={orGateX}
                  y2={y}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                />
              </g>
            );
          })}

          {/* =================================================== */}
          {/* 3. FINAL OR GATE (WHEN > 1 PRODUCT TERM)            */}
          {/* =================================================== */}
          {andGates.length > 1 && (
            <g>
              {/* OR Gate Inputs Routing */}
              {andGates.map((gate, i) => (
                <line
                  key={i}
                  x1={orGateX}
                  y1={gate.y}
                  x2={orGateX + 15}
                  y2={orGateY + (i === 0 ? -12 : 12)}
                  stroke={gate.isHovered ? gate.color : '#64748b'}
                  strokeWidth="1.5"
                />
              ))}

              {/* Standard IEEE/ANSI OR Gate Path */}
              {/* Curved back edge, converging pointed arcs on front */}
              <path
                d={`M ${orGateX + 15} ${orGateY - 24} 
                    Q ${orGateX + 30} ${orGateY} ${orGateX + 15} ${orGateY + 24} 
                    Q ${orGateX + 50} ${orGateY + 22} ${orGateX + 65} ${orGateY} 
                    Q ${orGateX + 50} ${orGateY - 22} ${orGateX + 15} ${orGateY - 24} Z`}
                fill="#18181b"
                stroke="#10b981"
                strokeWidth="2"
              />

              <text
                x={orGateX + 36}
                y={orGateY + 4}
                fill="#a7f3d0"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                OR
              </text>

              {/* Output Terminal */}
              <line
                x1={orGateX + 65}
                y1={orGateY}
                x2={width - 45}
                y2={orGateY}
                stroke="#10b981"
                strokeWidth="2.5"
              />
              <circle cx={width - 45} cy={orGateY} r="3.5" fill="#10b981" />
              <text
                x={width - 32}
                y={orGateY + 4}
                fill="#34d399"
                fontSize="14"
                fontWeight="bold"
                fontFamily="monospace"
              >
                Y
              </text>
            </g>
          )}

          {/* Single Gate Direct Output */}
          {andGates.length === 1 && (
            <g>
              <line
                x1={andGates[0].x + 42}
                y1={andGates[0].y}
                x2={width - 45}
                y2={andGates[0].y}
                stroke="#10b981"
                strokeWidth="2.5"
              />
              <circle cx={width - 45} cy={andGates[0].y} r="3.5" fill="#10b981" />
              <text
                x={width - 32}
                y={andGates[0].y + 4}
                fill="#34d399"
                fontSize="14"
                fontWeight="bold"
                fontFamily="monospace"
              >
                Y
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
