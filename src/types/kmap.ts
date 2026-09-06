export type VariableName = 'F' | 'S' | 'M';

export interface KMapCell {
  row: number; // 0 for M=0, 1 for M=1
  col: number; // 0 for FS=00, 1 for FS=01, 2 for FS=11, 3 for FS=10
  minterm: number; // 0 to 7
  binary: string; // e.g. "001"
  value: 0 | 1;
  fVal: 0 | 1;
  sVal: 0 | 1;
  mVal: 0 | 1;
}

export interface KMapGrouping {
  id: string;
  name: string; // e.g. "Group 1 (Quad: 4 cells)"
  term: string; // e.g. "S" or "F̄M"
  latexTerm?: string;
  minterms: number[];
  cells: { row: number; col: number }[];
  size: 1 | 2 | 4 | 8;
  color: string; // Tailwind color token or hex
  borderColor: string;
  bgColor: string;
  rects: {
    rowStart: number;
    rowSpan: number;
    colStart: number;
    colSpan: number;
  }[]; // Supports multiple split rectangles for wraparound groups
}

export interface CircuitGate {
  id: string;
  type: 'NOT' | 'AND' | 'OR' | 'INPUT' | 'OUTPUT';
  label: string;
  inputs: string[];
  output: string;
  x: number;
  y: number;
  highlightKey?: string;
}

export interface KMapPreset {
  id: string;
  name: string;
  description: string;
  minterms: number[];
}
