import { KMapCell, KMapGrouping } from '../types/kmap';

// Standard 3-Variable Gray-Code Mapping:
// Variables: F (MSB), S (Middle), M (LSB)
// Columns: FS in Gray Code: 00, 01, 11, 10
// Rows: M: 0, 1
export const COL_LABELS = [
  { code: '00', label: 'F̄S̄', f: 0, s: 0 },
  { code: '01', label: 'F̄S', f: 0, s: 1 },
  { code: '11', label: 'FS', f: 1, s: 1 },
  { code: '10', label: 'FS̄', f: 1, s: 0 }
] as const;

export const ROW_LABELS = [
  { code: '0', label: 'M̄', m: 0 },
  { code: '1', label: 'M', m: 1 }
] as const;

// Helper: Calculate minterm index from (row, col)
export function getMintermIndex(row: number, col: number): number {
  const f = COL_LABELS[col].f;
  const s = COL_LABELS[col].s;
  const m = ROW_LABELS[row].m;
  return (f << 2) | (s << 1) | m;
}

// Generate initial 2x4 grid cells
export function createInitialGrid(activeMinterms: number[] = []): KMapCell[] {
  const cells: KMapCell[] = [];
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      const minterm = getMintermIndex(r, c);
      const binary = minterm.toString(2).padStart(3, '0');
      cells.push({
        row: r,
        col: c,
        minterm,
        binary,
        value: activeMinterms.includes(minterm) ? 1 : 0,
        fVal: COL_LABELS[c].f as 0 | 1,
        sVal: COL_LABELS[c].s as 0 | 1,
        mVal: ROW_LABELS[r].m as 0 | 1
      });
    }
  }
  return cells;
}

// Generate all possible valid rectangular candidate groups on the 2x4 torus grid
interface CandidateGroup {
  minterms: number[];
  cells: { row: number; col: number }[];
  size: 1 | 2 | 4 | 8;
  term: string;
  rects: { rowStart: number; rowSpan: number; colStart: number; colSpan: number }[];
}

// Simplify a set of cells to its Boolean product term
export function simplifyGroupCells(cells: { row: number; col: number }[]): string {
  if (cells.length === 8) return '1';
  if (cells.length === 0) return '0';

  const fVals = new Set<number>();
  const sVals = new Set<number>();
  const mVals = new Set<number>();

  for (const c of cells) {
    fVals.add(COL_LABELS[c.col].f);
    sVals.add(COL_LABELS[c.col].s);
    mVals.add(ROW_LABELS[c.row].m);
  }

  const parts: string[] = [];

  if (fVals.size === 1) {
    parts.push(fVals.has(1) ? 'F' : 'F̄');
  }
  if (sVals.size === 1) {
    parts.push(sVals.has(1) ? 'S' : 'S̄');
  }
  if (mVals.size === 1) {
    parts.push(mVals.has(1) ? 'M' : 'M̄');
  }

  return parts.length > 0 ? parts.join('') : '1';
}

// Generate all valid K-map rectangular geometric patterns
function getAllGeometricCandidates(): CandidateGroup[] {
  const candidates: CandidateGroup[] = [];

  // Size 8: Entire 2x4 grid
  {
    const cells: { row: number; col: number }[] = [];
    const minterms: number[] = [];
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 4; c++) {
        cells.push({ row: r, col: c });
        minterms.push(getMintermIndex(r, c));
      }
    }
    candidates.push({
      minterms,
      cells,
      size: 8,
      term: '1',
      rects: [{ rowStart: 0, rowSpan: 2, colStart: 0, colSpan: 4 }]
    });
  }

  // Size 4: 2x2 blocks (with horizontal wraparound)
  for (let c = 0; c < 4; c++) {
    const c1 = c;
    const c2 = (c + 1) % 4;
    const cells = [
      { row: 0, col: c1 },
      { row: 0, col: c2 },
      { row: 1, col: c1 },
      { row: 1, col: c2 }
    ];
    const minterms = cells.map(cell => getMintermIndex(cell.row, cell.col));
    const term = simplifyGroupCells(cells);
    const rects =
      c === 3
        ? [
            { rowStart: 0, rowSpan: 2, colStart: 3, colSpan: 1 },
            { rowStart: 0, rowSpan: 2, colStart: 0, colSpan: 1 }
          ]
        : [{ rowStart: 0, rowSpan: 2, colStart: c, colSpan: 2 }];

    candidates.push({ minterms, cells, size: 4, term, rects });
  }

  // Size 4: 1x4 full rows
  for (let r = 0; r < 2; r++) {
    const cells = [
      { row: r, col: 0 },
      { row: r, col: 1 },
      { row: r, col: 2 },
      { row: r, col: 3 }
    ];
    const minterms = cells.map(cell => getMintermIndex(cell.row, cell.col));
    const term = simplifyGroupCells(cells);
    candidates.push({
      minterms,
      cells,
      size: 4,
      term,
      rects: [{ rowStart: r, rowSpan: 1, colStart: 0, colSpan: 4 }]
    });
  }

  // Size 2: 2x1 columns
  for (let c = 0; c < 4; c++) {
    const cells = [
      { row: 0, col: c },
      { row: 1, col: c }
    ];
    const minterms = cells.map(cell => getMintermIndex(cell.row, cell.col));
    const term = simplifyGroupCells(cells);
    candidates.push({
      minterms,
      cells,
      size: 2,
      term,
      rects: [{ rowStart: 0, rowSpan: 2, colStart: c, colSpan: 1 }]
    });
  }

  // Size 2: 1x2 horizontal pairs (with wraparound)
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      const c1 = c;
      const c2 = (c + 1) % 4;
      const cells = [
        { row: r, col: c1 },
        { row: r, col: c2 }
      ];
      const minterms = cells.map(cell => getMintermIndex(cell.row, cell.col));
      const term = simplifyGroupCells(cells);
      const rects =
        c === 3
          ? [
              { rowStart: r, rowSpan: 1, colStart: 3, colSpan: 1 },
              { rowStart: r, rowSpan: 1, colStart: 0, colSpan: 1 }
            ]
          : [{ rowStart: r, rowSpan: 1, colStart: c, colSpan: 2 }];

      candidates.push({ minterms, cells, size: 2, term, rects });
    }
  }

  // Size 1: Individual cells
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      const cells = [{ row: r, col: c }];
      const minterms = [getMintermIndex(r, c)];
      const term = simplifyGroupCells(cells);
      candidates.push({
        minterms,
        cells,
        size: 1,
        term,
        rects: [{ rowStart: r, rowSpan: 1, colStart: c, colSpan: 1 }]
      });
    }
  }

  return candidates;
}

const ALL_CANDIDATES = getAllGeometricCandidates();

// Distinct modern color palettes for overlay groups
const GROUP_COLORS = [
  {
    color: '#10b981', // Emerald
    borderColor: 'border-emerald-500',
    bgColor: 'bg-emerald-500/20 text-emerald-400'
  },
  {
    color: '#f59e0b', // Amber
    borderColor: 'border-amber-500',
    bgColor: 'bg-amber-500/20 text-amber-400'
  },
  {
    color: '#8b5cf6', // Violet
    borderColor: 'border-violet-500',
    bgColor: 'bg-violet-500/20 text-violet-400'
  },
  {
    color: '#38bdf8', // Sky
    borderColor: 'border-sky-500',
    bgColor: 'bg-sky-500/20 text-sky-400'
  },
  {
    color: '#ec4899', // Pink
    borderColor: 'border-pink-500',
    bgColor: 'bg-pink-500/20 text-pink-400'
  }
];

// Main Solver: Find Prime Implicants and Minimal Cover
export function solveKMap(cells: KMapCell[]): {
  groupings: KMapGrouping[];
  minimizedSOP: string;
  expandedSOP: string;
  mintermList: number[];
} {
  const activeSet = new Set<number>();
  for (const c of cells) {
    if (c.value === 1) activeSet.add(c.minterm);
  }

  const mintermList = Array.from(activeSet).sort((a, b) => a - b);

  // Edge case: All 0s
  if (mintermList.length === 0) {
    return {
      groupings: [],
      minimizedSOP: '0',
      expandedSOP: '0',
      mintermList: []
    };
  }

  // Edge case: All 1s
  if (mintermList.length === 8) {
    const octal = ALL_CANDIDATES.find(c => c.size === 8)!;
    return {
      groupings: [
        {
          id: 'group-octal',
          name: 'Group 1 (Octet: 8 cells)',
          term: '1',
          minterms: octal.minterms,
          cells: octal.cells,
          size: 8,
          color: GROUP_COLORS[0].color,
          borderColor: GROUP_COLORS[0].borderColor,
          bgColor: GROUP_COLORS[0].bgColor,
          rects: octal.rects
        }
      ],
      minimizedSOP: '1',
      expandedSOP: 'm0 + m1 + m2 + m3 + m4 + m5 + m6 + m7',
      mintermList
    };
  }

  // Generate Expanded SOP
  const expandedTerms = mintermList.map(m => {
    const f = (m >> 2) & 1 ? 'F' : 'F̄';
    const s = (m >> 1) & 1 ? 'S' : 'S̄';
    const mVar = m & 1 ? 'M' : 'M̄';
    return `${f}${s}${mVar}`;
  });
  const expandedSOP = expandedTerms.join(' + ');

  // 1. Find all valid candidate groups whose minterms are all active
  const validCandidates = ALL_CANDIDATES.filter(cand =>
    cand.minterms.every(m => activeSet.has(m))
  );

  // 2. Filter to Prime Implicants (groups not strictly contained within a larger valid group)
  const primeImplicants = validCandidates.filter(c1 => {
    const isSubset = validCandidates.some(
      c2 =>
        c2.size > c1.size &&
        c1.minterms.every(m => c2.minterms.includes(m))
    );
    return !isSubset;
  });

  // 3. Find minimal set cover for active minterms using greedy set cover with preference for larger groups
  const uncovered = new Set<number>(mintermList);
  const selectedGroups: CandidateGroup[] = [];

  // 3a. Essential Prime Implicants (minterms covered by only ONE prime implicant)
  for (const m of mintermList) {
    const covering = primeImplicants.filter(pi => pi.minterms.includes(m));
    if (covering.length === 1) {
      const epi = covering[0];
      if (!selectedGroups.includes(epi)) {
        selectedGroups.push(epi);
        for (const coveredM of epi.minterms) {
          uncovered.delete(coveredM);
        }
      }
    }
  }

  // 3b. Greedy cover for remaining uncovered minterms
  while (uncovered.size > 0) {
    let bestPi: CandidateGroup | null = null;
    let maxNewCover = 0;

    for (const pi of primeImplicants) {
      if (selectedGroups.includes(pi)) continue;
      const newCoverCount = pi.minterms.filter(m => uncovered.has(m)).length;
      if (
        newCoverCount > maxNewCover ||
        (newCoverCount === maxNewCover && bestPi && pi.size > bestPi.size)
      ) {
        maxNewCover = newCoverCount;
        bestPi = pi;
      }
    }

    if (!bestPi || maxNewCover === 0) break;
    selectedGroups.push(bestPi);
    for (const m of bestPi.minterms) {
      uncovered.delete(m);
    }
  }

  // 4. Sort selected groups by size descending (Quad, Pair, Single)
  selectedGroups.sort((a, b) => b.size - a.size);

  // 5. Convert to KMapGrouping objects with colors
  const groupings: KMapGrouping[] = selectedGroups.map((grp, idx) => {
    const sizeName =
      grp.size === 8 ? 'Octet' : grp.size === 4 ? 'Quad' : grp.size === 2 ? 'Pair' : 'Single';
    const colorTheme = GROUP_COLORS[idx % GROUP_COLORS.length];
    return {
      id: `group-${idx + 1}`,
      name: `Group ${idx + 1} (${sizeName}: ${grp.size} cell${grp.size > 1 ? 's' : ''})`,
      term: grp.term,
      minterms: grp.minterms,
      cells: grp.cells,
      size: grp.size,
      color: colorTheme.color,
      borderColor: colorTheme.borderColor,
      bgColor: colorTheme.bgColor,
      rects: grp.rects
    };
  });

  const minimizedSOP = groupings.map(g => g.term).join(' + ') || '0';

  return {
    groupings,
    minimizedSOP,
    expandedSOP,
    mintermList
  };
}

// Built-in Presets
export const KMAP_PRESETS = [
  {
    id: 'notebook-example',
    name: 'Notebook Example (S + F̄M)',
    description: 'm1, m2, m3, m6, m7 → Quad (S) + Pair (F̄M)',
    minterms: [1, 2, 3, 6, 7]
  },
  {
    id: 'all-ones',
    name: 'All Ones (Tautology: 1)',
    description: 'All 8 minterms active → Entire grid simplifies to 1',
    minterms: [0, 1, 2, 3, 4, 5, 6, 7]
  },
  {
    id: 'all-zeros',
    name: 'All Zeros (Contradiction: 0)',
    description: 'No minterms active → 0',
    minterms: []
  },
  {
    id: 'wraparound-quad',
    name: 'Wraparound Quad (S̄)',
    description: 'Columns 00 and 10 across both rows: m0, m1, m4, m5 → S̄',
    minterms: [0, 1, 4, 5]
  },
  {
    id: 'majority-vote',
    name: 'Majority Vote Function',
    description: 'm3 (011), m5 (101), m6 (110), m7 (111) → FS + FM + SM',
    minterms: [3, 5, 6, 7]
  },
  {
    id: 'xor-checkerboard',
    name: 'Odd Parity / Checkerboard',
    description: 'm1, m2, m4, m7 → F ⊕ S ⊕ M',
    minterms: [1, 2, 4, 7]
  }
];
