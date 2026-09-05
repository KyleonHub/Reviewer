// Logic Circuits & Digital Electronics Reviewer Dataset
// 100% Full English: Comprehensive Boolean Algebra Laws (1-12), Digital Logic Gates, Combinational Simplification, 7400-Series ICs & Adders

window.logicData = {
  subjectId: "subj-logic",
  subjectName: "Logic Circuits",
  description: "Digital logic gates, truth tables, Boolean algebra laws (1-12), combinational circuit simplification, De Morgan universal gate conversions, and 7400-series IC pinouts.",
  
  flashcards: [
    // ----------------------------------------------------
    // 12 BOOLEAN ALGEBRA LAWS & THEOREMS
    // ----------------------------------------------------
    {
      id: "fc-logic-law1",
      category: "laws",
      front: "1. What are the Identity Laws in Boolean Algebra?",
      back: "OR Form: A + 0 = A\nAND Form: A · 1 = A\n\nExplanation: Adding 0 to any variable or ANDing any variable with 1 leaves the variable unchanged.",
      hint: "Adding 0 or ANDing 1 preserves the variable"
    },
    {
      id: "fc-logic-law2",
      category: "laws",
      front: "2. What are the Null (Domination) Laws in Boolean Algebra?",
      back: "OR Form: A + 1 = 1\nAND Form: A · 0 = 0\n\nExplanation: Any variable ORed with 1 is forced to 1. Any variable ANDed with 0 is forced to 0 (dominates the output).",
      hint: "1 dominates OR; 0 dominates AND"
    },
    {
      id: "fc-logic-law3",
      category: "laws",
      front: "3. What are the Idempotent Laws in Boolean Algebra?",
      back: "OR Form: A + A = A\nAND Form: A · A = A\n\nExplanation: Combining a variable with itself under OR or AND yields the variable itself (no arithmetic doubling or squaring).",
      hint: "Combining a variable with itself yields itself"
    },
    {
      id: "fc-logic-law4",
      category: "laws",
      front: "4. What are the Complement Laws in Boolean Algebra?",
      back: "OR Form: A + A' = 1\nAND Form: A · A' = 0\n\nExplanation: One of (A or A') must always be 1 and the other 0. Thus, their sum is always 1 (HIGH) and their product is always 0 (LOW).",
      hint: "Variable combined with its inverse"
    },
    {
      id: "fc-logic-law5",
      category: "laws",
      front: "5. What is the Double Negation (Involution) Law?",
      back: "Expression: (A')' = A\n\nExplanation: Inverting a Boolean variable twice restores its original truth value. Two cascading NOT inverters cancel each other out.",
      hint: "Double inverter cancellation"
    },
    {
      id: "fc-logic-law6",
      category: "laws",
      front: "6. What are the Commutative Laws in Boolean Algebra?",
      back: "OR Form: A + B = B + A\nAND Form: A · B = B · A\n\nExplanation: The physical order of inputs does not affect the output of an OR or AND logic gate.",
      hint: "Order of inputs does not matter"
    },
    {
      id: "fc-logic-law7",
      category: "laws",
      front: "7. What are the Associative Laws in Boolean Algebra?",
      back: "OR Form: (A + B) + C = A + (B + C)\nAND Form: (A · B) · C = A · (B · C)\n\nExplanation: The grouping of inputs using parentheses does not alter the logical result when identical operators are chained.",
      hint: "Grouping of inputs does not matter"
    },
    {
      id: "fc-logic-law8a",
      category: "laws",
      front: "8a. What is the First Distributive Law (AND over OR)?",
      back: "Expression: A · (B + C) = A·B + A·C\n\nExplanation: Standard algebraic multiplication distributing over logical addition.",
      hint: "Multiplication over addition"
    },
    {
      id: "fc-logic-law8b",
      category: "laws",
      front: "8b. What is the Second Distributive Law (OR over AND - Dual Form)?",
      back: "Expression: A + (B · C) = (A + B) · (A + C)\n\nCRUCIAL EXAM NOTE: This has NO counterpart in ordinary arithmetic! It allows factoring sum terms directly.",
      hint: "OR distributing over AND: A + BC = (A+B)(A+C)"
    },
    {
      id: "fc-logic-law9a",
      category: "laws",
      front: "9a. What are the Basic Absorption Laws (Forms 1 & 2)?",
      back: "Form 1: A + A·B = A\nProof: A·(1 + B) = A·(1) = A\n\nForm 2: A · (A + B) = A\nProof: A·A + A·B = A + A·B = A",
      hint: "Redundant product term is absorbed"
    },
    {
      id: "fc-logic-law9b",
      category: "laws",
      front: "9b. What are the Advanced Absorption Laws (Forms 3 & 4)?",
      back: "Form 3: A + A'·B = A + B\nProof: (A + A')(A + B) = (1)(A + B) = A + B\n\nForm 4: A · (A' + B) = A·B\nProof: A·A' + A·B = 0 + A·B = A·B",
      hint: "A + A'B = A + B (inverting term drops out)"
    },
    {
      id: "fc-logic-law10",
      category: "laws",
      front: "10. What is the Consensus Theorem (Standard & Dual Form)?",
      back: "SOP Form: A·B + A'·C + B·C = A·B + A'·C\n(The term B·C is the redundant consensus term and is eliminated!)\n\nPOS Dual Form: (A + B)·(A' + C)·(B + C) = (A + B)·(A' + C)\n\nIdentification Rule: Find variable A and its complement A' in two terms; the product of the remaining variables (BC) is redundant.",
      hint: "AB + A'C + BC = AB + A'C"
    },
    {
      id: "fc-logic-law11",
      category: "laws",
      front: "11. State De Morgan's First and Second Theorems.",
      back: "Theorem 1: (A · B)' = A' + B'\nThe complement of a product is the sum of complements (NAND = Negative-OR / Bubble-OR).\n\nTheorem 2: (A + B)' = A' · B'\nThe complement of a sum is the product of complements (NOR = Negative-AND / Bubble-AND).\n\nMemory Rule: 'Break the line, change the sign.'",
      hint: "Break the line, change the sign"
    },
    {
      id: "fc-logic-law12",
      category: "laws",
      front: "12. What is the Duality Principle in Boolean Algebra?",
      back: "Principle: Any valid Boolean equation remains valid if you systematically:\n1. Swap every OR (+) with AND (·)\n2. Swap every AND (·) with OR (+)\n3. Swap every 0 with 1, and every 1 with 0\n(Variables remain uncomplemented).\n\nWhy it matters: Every Boolean law comes in dual pairs (e.g. Identity: A+0=A vs A·1=A; Absorption: A+AB=A vs A(A+B)=A).",
      hint: "Swap + with · and 0 with 1"
    },

    // ----------------------------------------------------
    // LOGIC GATES & 7400-SERIES IC PINOUTS
    // ----------------------------------------------------
    {
      id: "fc-logic-and",
      category: "gates",
      front: "What is an AND gate, its Boolean formula, and its 7400 IC code?",
      back: "Function: Outputs HIGH (1) if and only if ALL inputs are HIGH (1).\n\nFormula: Y = A · B\nStandard IC: 7408 Quad 2-Input AND Gate (DIP-14)\nTruth: 0·0=0, 0·1=0, 1·0=0, 1·1=1",
      hint: "All inputs must be 1"
    },
    {
      id: "fc-logic-or",
      category: "gates",
      front: "What is an OR gate, its Boolean formula, and its 7400 IC code?",
      back: "Function: Outputs HIGH (1) if AT LEAST ONE input is HIGH (1). Outputs LOW (0) only when all inputs are 0.\n\nFormula: Y = A + B\nStandard IC: 7432 Quad 2-Input OR Gate (DIP-14)\nTruth: 0+0=0, 0+1=1, 1+0=1, 1+1=1",
      hint: "At least one input is 1"
    },
    {
      id: "fc-logic-not",
      category: "gates",
      front: "What is a NOT gate (Inverter) and its 7400 IC code?",
      back: "Function: Inverts the digital logic state (0 -> 1, 1 -> 0).\n\nFormula: Y = A' (or A with overbar)\nStandard IC: 7404 Hex Inverter (contains 6 independent NOT gates in a 14-pin DIP package).",
      hint: "Inverts logic state; 7404"
    },
    {
      id: "fc-logic-buffer",
      category: "gates",
      front: "What is a Buffer / Driver, its purpose, and its 7400 IC code?",
      back: "Function: Non-inverting logic buffer (Y = A). Provides current amplification and high fan-out drive capacity.\n\nStandard IC: 7407 Hex Buffer / Driver with Open-Collector outputs (requires external pull-up resistor).",
      hint: "Non-inverting high current driver; 7407"
    },
    {
      id: "fc-logic-nand",
      category: "gates",
      front: "What is a NAND gate, why is it Universal, and what is its 7400 IC code?",
      back: "Function: Inverted AND gate. Outputs LOW (0) only when ALL inputs are HIGH (1).\n\nFormula: Y = (A · B)'\nStandard IC: 7400 Quad 2-Input NAND Gate\n\nUniversal Gate: Any digital logic circuit or Boolean equation can be synthesized using ONLY NAND gates.",
      hint: "Universal gate; 7400 IC"
    },
    {
      id: "fc-logic-nor",
      category: "gates",
      front: "What is a NOR gate, its pinout caution, and its 7400 IC code?",
      back: "Function: Inverted OR gate. Outputs HIGH (1) only when ALL inputs are LOW (0).\n\nFormula: Y = (A + B)'\nStandard IC: 7402 Quad 2-Input NOR Gate\n\nCRITICAL PINOUT WARNING: In 7402, Pin 1 is the OUTPUT (1Y), with inputs on Pins 2 & 3. This is the opposite of 7400/7408 where Pin 1 is an input!",
      hint: "Outputs on pins 1, 4, 10, 13; 7402 IC"
    },
    {
      id: "fc-logic-xor",
      category: "gates",
      front: "What is an XOR (Exclusive-OR) gate and its 7400 IC code?",
      back: "Function: Outputs HIGH (1) when inputs are DIFFERENT (odd parity detector). Outputs LOW when inputs are identical.\n\nFormula: Y = A ⊕ B = A'B + AB'\nStandard IC: 7486 Quad 2-Input XOR Gate\nTruth: 0⊕0=0, 0⊕1=1, 1⊕0=1, 1⊕1=0",
      hint: "Odd parity detector; 7486 IC"
    },
    {
      id: "fc-logic-xnor",
      category: "gates",
      front: "What is an XNOR (Exclusive-NOR) gate and its 7400 IC code?",
      back: "Function: Outputs HIGH (1) when inputs are IDENTICAL (equality detector / even parity).\n\nFormula: Y = (A ⊕ B)' = AB + A'B'\nStandard IC: 74266 Quad 2-Input XNOR Gate (open collector) / 74HC7266",
      hint: "Equivalence detector; 74266 IC"
    },
    {
      id: "fc-logic-multi",
      category: "gates",
      front: "What are common multi-input 7400-series gate ICs?",
      back: "• 7410: Triple 3-Input NAND Gate\n• 7411: Triple 3-Input AND Gate\n• 7427: Triple 3-Input NOR Gate\n• 7420: Dual 4-Input NAND Gate (with NC pins 3 & 11)\n• 7421: Dual 4-Input AND Gate\n• 7430: Single 8-Input NAND Gate",
      hint: "7410 (3-NAND), 7420 (4-NAND), 7430 (8-NAND)"
    },

    // ----------------------------------------------------
    // UNIVERSAL GATE CONVERSIONS
    // ----------------------------------------------------
    {
      id: "fc-logic-conv-not",
      category: "conversions",
      front: "How do you implement a NOT gate using only NAND or only NOR?",
      back: "Using NAND: Tie both inputs of a NAND gate together: Y = (A · A)' = A'\n\nUsing NOR: Tie both inputs of a NOR gate together: Y = (A + A)' = A'\n\nRequired Gates: Exactly 1 gate.",
      hint: "Tie inputs together (1 gate)"
    },
    {
      id: "fc-logic-conv-and",
      category: "conversions",
      front: "How do you convert and implement an AND gate using NAND-only vs NOR-only?",
      back: "Using NAND (2 Gates):\n1. Gate 1 computes NAND: T1 = (A · B)'\n2. Gate 2 inverts T1: Y = (T1 · T1)' = ((AB)')' = AB\n\nUsing NOR (3 Gates - De Morgan):\n1. Invert A using NOR inverter: A'\n2. Invert B using NOR inverter: B'\n3. Feed A' and B' into 3rd NOR: Y = (A' + B')' = (A')' · (B')' = AB",
      hint: "2 NANDs or 3 NORs"
    },
    {
      id: "fc-logic-conv-or",
      category: "conversions",
      front: "How do you convert and implement an OR gate using NAND-only vs NOR-only?",
      back: "Using NAND (3 Gates - De Morgan):\n1. Invert A using NAND inverter: A'\n2. Invert B using NAND inverter: B'\n3. Feed A' and B' into 3rd NAND: Y = (A' · B')' = (A')' + (B')' = A + B\n\nUsing NOR (2 Gates):\n1. Gate 1 computes NOR: T1 = (A + B)'\n2. Gate 2 inverts T1: Y = ((A + B)')' = A + B",
      hint: "3 NANDs or 2 NORs"
    },
    {
      id: "fc-logic-conv-xor",
      category: "conversions",
      front: "How many NAND gates are required to implement a 2-input XOR gate?",
      back: "A 2-input XOR gate requires exactly 4 NAND gates.\n\nStructure:\n1. NAND 1: T1 = (AB)'\n2. NAND 2: T2 = (A · T1)' = A' + B\n3. NAND 3: T3 = (B · T1)' = B' + A\n4. NAND 4: Y = (T2 · T3)' = A ⊕ B",
      hint: "4 NAND gates"
    },

    // ----------------------------------------------------
    // ARITHMETIC CIRCUITS, SOP/POS & K-MAPS
    // ----------------------------------------------------
    {
      id: "fc-logic-adder",
      category: "circuits",
      front: "What is the difference between a Half Adder and a Full Adder?",
      back: "Half Adder (2 inputs: A, B):\n• Sum S = A ⊕ B\n• Carry C = A · B\n(Has NO Carry-In input)\n\nFull Adder (3 inputs: A, B, Cin):\n• Sum S = A ⊕ B ⊕ Cin\n• Carry Out Cout = AB + Cin·(A ⊕ B) = AB + BCin + ACin",
      hint: "Full adder has Cin; Half adder does not"
    },
    {
      id: "fc-logic-sop-pos",
      category: "circuits",
      front: "What is the difference between SOP (Sum of Products) and POS (Product of Sums)?",
      back: "• SOP (Sum of Products): Boolean terms formed by ANDing variables (minterms), combined together with OR operators (e.g. AB + A'C). Evaluates 1s of the truth table.\n\n• POS (Product of Sums): Boolean terms formed by ORing variables (maxterms), combined together with AND operators (e.g. (A + B)(A' + C)). Evaluates 0s of the truth table.",
      hint: "SOP = OR of ANDs; POS = AND of ORs"
    },
    {
      id: "fc-logic-kmap",
      category: "circuits",
      front: "What are the core rules for grouping cells in a Karnaugh Map (K-Map)?",
      back: "1. Groups must contain powers of 2 number of cells (1, 2, 4, 8, 16).\n2. Groups must be rectangular or square (no diagonals, no L-shapes).\n3. Groups may wrap around edges and corners.\n4. Make groups as large as possible to eliminate the most variables.\n5. Groups may overlap to minimize total gates.",
      hint: "Powers of 2, wrap-around, largest rectangles"
    }
  ],

  questions: [
    // -------------------------------------------------------------------------
    // COMBINATIONAL CIRCUIT DIAGRAM QUESTIONS (WITH HIGH-DETAIL SVGs)
    // -------------------------------------------------------------------------
    {
      id: "q-logic-c1",
      type: "mcq",
      circuitSvg: `<svg viewBox="0 0 540 160" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg"><text x="20" y="45" fill="#38bdf8" font-size="12" font-weight="bold">A</text><text x="20" y="115" fill="#38bdf8" font-size="12" font-weight="bold">B</text><line x1="35" y1="40" x2="160" y2="40" stroke="#38bdf8" stroke-width="2"/><line x1="60" y1="40" x2="60" y2="95" stroke="#38bdf8" stroke-width="2"/><circle cx="60" cy="40" r="3" fill="#38bdf8"/><line x1="60" y1="95" x2="160" y2="95" stroke="#38bdf8" stroke-width="2"/><line x1="35" y1="110" x2="90" y2="110" stroke="#38bdf8" stroke-width="2"/><line x1="80" y1="110" x2="80" y2="55" stroke="#38bdf8" stroke-width="2"/><circle cx="80" cy="110" r="3" fill="#38bdf8"/><line x1="80" y1="55" x2="160" y2="55" stroke="#38bdf8" stroke-width="2"/><polygon points="90,105 90,125 110,115" fill="#18181b" stroke="#f43f5e" stroke-width="2"/><circle cx="114" cy="115" r="3" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/><line x1="117" y1="115" x2="160" y2="115" stroke="#38bdf8" stroke-width="2"/><path d="M 160,32 L 180,32 A 18,18 0 0,1 180,68 L 160,68 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/><line x1="198" y1="50" x2="270" y2="50" stroke="#06b6d4" stroke-width="2"/><text x="210" y="44" fill="#a1a1aa" font-size="9" font-mono>A·B</text><path d="M 160,87 L 180,87 A 18,18 0 0,1 180,123 L 160,123 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/><line x1="198" y1="105" x2="270" y2="105" stroke="#06b6d4" stroke-width="2"/><text x="210" y="120" fill="#a1a1aa" font-size="9" font-mono>A·B'</text><line x1="270" y1="50" x2="310" y2="68" stroke="#06b6d4" stroke-width="2"/><line x1="270" y1="105" x2="310" y2="86" stroke="#06b6d4" stroke-width="2"/><path d="M 305,60 Q 320,77 305,94 Q 335,94 345,77 Q 335,60 305,60 Z" fill="#090d16" stroke="#10b981" stroke-width="2"/><line x1="345" y1="77" x2="420" y2="77" stroke="#10b981" stroke-width="2.5"/><circle cx="420" cy="77" r="4" fill="#10b981"/><text x="430" y="81" fill="#34d399" font-size="14" font-weight="900">Y</text></svg>`,
      question: "Examine the combinational circuit diagram above. Using Boolean algebra, what is the simplified minimal output Y?",
      options: [
        "Y = A",
        "Y = B",
        "Y = A ⊕ B",
        "Y = A + B"
      ],
      correctIndex: 0,
      explanation: "Step-by-step circuit simplification:\n1. Top AND gate produces: T1 = A · B\n2. Bottom AND gate produces: T2 = A · B'\n3. OR gate combines them: Y = A·B + A·B'\n4. Factor out A (Distributive Law): Y = A · (B + B')\n5. Complement Law (B + B' = 1): Y = A · (1) = A.\nThe entire 3-gate network simplifies to the single input A."
    },
    {
      id: "q-logic-c2",
      type: "mcq",
      circuitSvg: `<svg viewBox="0 0 540 160" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg"><text x="20" y="45" fill="#38bdf8" font-size="12" font-weight="bold">A</text><text x="20" y="115" fill="#38bdf8" font-size="12" font-weight="bold">B</text><line x1="35" y1="40" x2="80" y2="40" stroke="#38bdf8" stroke-width="2"/><line x1="60" y1="40" x2="60" y2="105" stroke="#38bdf8" stroke-width="2"/><circle cx="60" cy="40" r="3" fill="#38bdf8"/><line x1="60" y1="105" x2="160" y2="105" stroke="#38bdf8" stroke-width="2"/><polygon points="80,30 80,50 100,40" fill="#18181b" stroke="#f43f5e" stroke-width="2"/><circle cx="104" cy="40" r="3" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/><line x1="107" y1="40" x2="160" y2="40" stroke="#38bdf8" stroke-width="2"/><line x1="35" y1="110" x2="160" y2="110" stroke="#38bdf8" stroke-width="2"/><line x1="85" y1="110" x2="85" y2="55" stroke="#38bdf8" stroke-width="2"/><circle cx="85" cy="110" r="3" fill="#38bdf8"/><line x1="85" y1="55" x2="160" y2="55" stroke="#38bdf8" stroke-width="2"/><path d="M 160,35 Q 175,48 160,60 Q 190,60 200,48 Q 190,35 160,35 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/><line x1="200" y1="48" x2="270" y2="48" stroke="#06b6d4" stroke-width="2"/><text x="210" y="42" fill="#a1a1aa" font-size="9" font-mono>A' + B</text><path d="M 160,95 Q 175,108 160,120 Q 190,120 200,108 Q 190,95 160,95 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/><line x1="200" y1="108" x2="270" y2="108" stroke="#06b6d4" stroke-width="2"/><text x="210" y="125" fill="#a1a1aa" font-size="9" font-mono>A + B</text><line x1="270" y1="48" x2="310" y2="68" stroke="#06b6d4" stroke-width="2"/><line x1="270" y1="108" x2="310" y2="86" stroke="#06b6d4" stroke-width="2"/><path d="M 310,60 L 330,60 A 17,17 0 0,1 330,94 L 310,94 Z" fill="#090d16" stroke="#10b981" stroke-width="2"/><line x1="347" y1="77" x2="420" y2="77" stroke="#10b981" stroke-width="2.5"/><circle cx="420" cy="77" r="4" fill="#10b981"/><text x="430" y="81" fill="#34d399" font-size="14" font-weight="900">Y</text></svg>`,
      question: "In the dual OR-gate circuit feeding an AND gate above, what is the simplified output expression for Y?",
      options: [
        "Y = B",
        "Y = A",
        "Y = A' · B",
        "Y = A + B"
      ],
      correctIndex: 0,
      explanation: "Step-by-step simplification using Boolean algebra:\n1. Top OR gate produces: T1 = (A' + B)\n2. Bottom OR gate produces: T2 = (A + B)\n3. AND gate output: Y = (A' + B)(A + B)\n4. Applying Distributive Law (OR over AND): Y = B + (A' · A)\n5. Since A' · A = 0 (Complement Law): Y = B + 0 = B."
    },
    {
      id: "q-logic-c3",
      type: "mcq",
      circuitSvg: `<svg viewBox="0 0 540 150" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg"><text x="20" y="45" fill="#38bdf8" font-size="12" font-weight="bold">A</text><text x="20" y="105" fill="#38bdf8" font-size="12" font-weight="bold">B</text><line x1="35" y1="40" x2="80" y2="40" stroke="#38bdf8" stroke-width="2"/><polygon points="80,30 80,50 100,40" fill="#18181b" stroke="#f43f5e" stroke-width="2"/><circle cx="104" cy="40" r="3" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/><line x1="107" y1="40" x2="200" y2="40" stroke="#38bdf8" stroke-width="2"/><line x1="35" y1="100" x2="80" y2="100" stroke="#38bdf8" stroke-width="2"/><polygon points="80,90 80,110 100,100" fill="#18181b" stroke="#f43f5e" stroke-width="2"/><circle cx="104" cy="100" r="3" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/><line x1="107" y1="100" x2="200" y2="100" stroke="#38bdf8" stroke-width="2"/><path d="M 200,30 L 225,30 A 25,25 0 0,1 225,110 L 200,110 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/><circle cx="254" cy="70" r="4" fill="#090d16" stroke="#06b6d4" stroke-width="2"/><line x1="258" y1="70" x2="360" y2="70" stroke="#10b981" stroke-width="2.5"/><circle cx="360" cy="70" r="4" fill="#10b981"/><text x="370" y="74" fill="#34d399" font-size="14" font-weight="900">Y</text></svg>`,
      question: "The circuit above feeds inverted inputs A' and B' into a NAND gate. According to De Morgan's Law, what single standard gate is this equivalent to?",
      options: [
        "OR gate (Y = A + B)",
        "AND gate (Y = A · B)",
        "NOR gate (Y = (A + B)')",
        "XOR gate (Y = A ⊕ B)"
      ],
      correctIndex: 0,
      explanation: "By De Morgan's Law:\n1. NAND operation: Y = (A' · B')'\n2. Applying De Morgan: (X · Y)' = X' + Y'\n3. Substituting: Y = (A')' + (B')' = A + B.\nThis circuit is the exact De Morgan universal equivalent of a standard OR gate (Negative-NAND = OR)."
    },
    {
      id: "q-logic-c6",
      type: "mcq",
      circuitSvg: `<svg viewBox="0 0 540 180" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="10" width="510" height="160" rx="12" fill="#090d16" stroke="#27272a"/><text x="35" y="35" fill="#a855f7" font-size="11" font-weight="bold">Consensus Theorem Circuit</text><rect x="40" y="50" width="110" height="30" rx="6" fill="#18181b" stroke="#06b6d4" stroke-width="1.5"/><text x="95" y="70" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">AND 1: A · B</text><rect x="40" y="90" width="110" height="30" rx="6" fill="#18181b" stroke="#06b6d4" stroke-width="1.5"/><text x="95" y="110" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">AND 2: A' · C</text><rect x="40" y="130" width="110" height="30" rx="6" fill="#18181b" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="3,3"/><text x="95" y="150" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">AND 3: B · C</text><line x1="150" y1="65" x2="250" y2="85" stroke="#06b6d4" stroke-width="2"/><line x1="150" y1="105" x2="250" y2="105" stroke="#06b6d4" stroke-width="2"/><line x1="150" y1="145" x2="250" y2="125" stroke="#f43f5e" stroke-width="2" stroke-dasharray="3,3"/><path d="M 250,75 Q 270,105 250,135 Q 290,135 305,105 Q 290,75 250,75 Z" fill="#18181b" stroke="#10b981" stroke-width="2"/><line x1="305" y1="105" x2="380" y2="105" stroke="#10b981" stroke-width="2.5"/><circle cx="380" cy="105" r="4" fill="#10b981"/><text x="390" y="109" fill="#34d399" font-size="14" font-weight="900">Y</text></svg>`,
      question: "In the 3-term AND-OR circuit above implementing Y = AB + A'C + BC, which AND gate can be completely eliminated without altering the logic function?",
      options: [
        "AND 3 (BC) - Eliminated by Consensus Theorem",
        "AND 1 (AB) - Eliminated by De Morgan's Law",
        "AND 2 (A'C) - Eliminated by Absorption Law",
        "None of the gates can be eliminated"
      ],
      correctIndex: 0,
      explanation: "By the Consensus Theorem:\nAB + A'C + BC = AB + A'C.\nVariable A appears in both true and complemented forms (A and A'). The remaining variables B and C form the consensus product term (BC), which is completely redundant and can be removed without affecting the circuit output."
    },
    {
      id: "q-logic-c7",
      type: "mcq",
      circuitSvg: `<svg viewBox="0 0 540 160" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="10" width="510" height="140" rx="12" fill="#090d16" stroke="#27272a"/><text x="35" y="35" fill="#a855f7" font-size="11" font-weight="bold">Half Adder Circuit Schematic</text><text x="35" y="65" fill="#38bdf8" font-size="12" font-weight="bold">A</text><text x="35" y="115" fill="#38bdf8" font-size="12" font-weight="bold">B</text><path d="M 120,40 Q 132,55 120,70 Q 148,70 156,55 Q 148,40 120,40 Z" fill="#18181b" stroke="#38bdf8" stroke-width="2"/><path d="M 115,40 Q 127,55 115,70" fill="none" stroke="#38bdf8" stroke-width="2"/><line x1="156" y1="55" x2="250" y2="55" stroke="#38bdf8" stroke-width="2.5"/><text x="260" y="59" fill="#38bdf8" font-size="12" font-weight="bold">Sum (S = A ⊕ B)</text><path d="M 120,95 L 138,95 A 15,15 0 0,1 138,125 L 120,125 Z" fill="#18181b" stroke="#10b981" stroke-width="2"/><line x1="153" y1="110" x2="250" y2="110" stroke="#10b981" stroke-width="2.5"/><text x="260" y="114" fill="#34d399" font-size="12" font-weight="bold">Carry (C = A · B)</text></svg>`,
      question: "Examine the Half Adder schematic above. When inputs A = 1 and B = 1, what are the values of Sum (S) and Carry (C)?",
      options: [
        "Sum = 0, Carry = 1",
        "Sum = 1, Carry = 0",
        "Sum = 1, Carry = 1",
        "Sum = 0, Carry = 0"
      ],
      correctIndex: 0,
      explanation: "For inputs A = 1, B = 1 in a Half Adder:\n• Sum: S = A ⊕ B = 1 ⊕ 1 = 0\n• Carry: C = A · B = 1 · 1 = 1\nIn binary arithmetic, 1 + 1 = 10_2 (which has sum 0 and carry 1)."
    },

    // -------------------------------------------------------------------------
    // 12 BOOLEAN ALGEBRA LAWS & THEOREMS MCQs
    // -------------------------------------------------------------------------
    {
      id: "q-logic-law-q1",
      type: "mcq",
      question: "According to the Identity Laws in Boolean algebra, what do the expressions A + 0 and A · 1 equal?",
      options: [
        "Both equal A",
        "A + 0 = 1, and A · 1 = 0",
        "A + 0 = 0, and A · 1 = 1",
        "Both equal 1"
      ],
      correctIndex: 0,
      explanation: "By the Identity Laws, 0 is the identity element for OR (A + 0 = A), and 1 is the identity element for AND (A · 1 = A)."
    },
    {
      id: "q-logic-law-q2",
      type: "mcq",
      question: "Which Boolean theorem states that A + 1 = 1 and A · 0 = 0?",
      options: [
        "Null (Domination) Laws",
        "Idempotent Laws",
        "Complement Laws",
        "Involution Law"
      ],
      correctIndex: 0,
      explanation: "The Null (or Domination) Laws state that 1 dominates the OR operation (A + 1 = 1), and 0 dominates the AND operation (A · 0 = 0)."
    },
    {
      id: "q-logic-law-q3",
      type: "mcq",
      question: "What does the expression A + A simplify to under Boolean algebra?",
      options: [
        "A (Idempotent Law)",
        "2A (Arithmetic addition)",
        "1 (Complement Law)",
        "A² (Power Law)"
      ],
      correctIndex: 0,
      explanation: "Under the Idempotent Law, A + A = A and A · A = A. Redundant repeated operations on the same variable produce the variable itself."
    },
    {
      id: "q-logic-law-q4",
      type: "mcq",
      question: "What are the results of the Complement Laws: A + A' and A · A'?",
      options: [
        "A + A' = 1, and A · A' = 0",
        "A + A' = 0, and A · A' = 1",
        "Both equal A",
        "Both equal A'"
      ],
      correctIndex: 0,
      explanation: "Since A and A' always have opposite logic values (one is 1, the other is 0), their logical sum A + A' is always 1, and their logical product A · A' is always 0."
    },
    {
      id: "q-logic-law-q5",
      type: "mcq",
      question: "What is the result of applying the Involution (Double Negation) Law to the expression ((A + B)')'?",
      options: [
        "A + B",
        "A' + B'",
        "A · B",
        "(A · B)'"
      ],
      correctIndex: 0,
      explanation: "By the Involution Law, (X')' = X. Inverting any expression twice cancels both inversions, restoring the original expression A + B."
    },
    {
      id: "q-logic-law-q6",
      type: "mcq",
      question: "Which of the following demonstrates the unique Boolean Distributive Law of OR over AND?",
      options: [
        "A + (B · C) = (A + B) · (A + C)",
        "A · (B + C) = A·B + A·C",
        "A + B = B + A",
        "A · (B · C) = (A · B) · C"
      ],
      correctIndex: 0,
      explanation: "The second Distributive Law states that A + (B·C) = (A + B)(A + C). This is unique to Boolean algebra and has no equivalent in standard elementary algebra."
    },
    {
      id: "q-logic-law-q7",
      type: "mcq",
      question: "Simplify the Boolean expression Y = A + A'·B using the Absorption Law.",
      options: [
        "Y = A + B",
        "Y = A · B",
        "Y = A",
        "Y = B"
      ],
      correctIndex: 0,
      explanation: "Form 3 of the Absorption Law states: A + A'B = (A + A')(A + B) = (1)(A + B) = A + B. The complemented variable A' drops out completely."
    },
    {
      id: "q-logic-law-q8",
      type: "mcq",
      question: "Using De Morgan's Theorem, what is the equivalent expression for (A' + B)'?",
      options: [
        "A · B'",
        "A + B'",
        "A' · B'",
        "(A · B)'"
      ],
      correctIndex: 0,
      explanation: "Applying De Morgan's theorem: (X + Y)' = X' · Y'. Substituting X = A' and Y = B gives (A')' · B' = A · B'."
    },
    {
      id: "q-logic-law-q9",
      type: "mcq",
      question: "What is the Dual of the Boolean equation A · (B + 0) = A · B according to the Duality Principle?",
      options: [
        "A + (B · 1) = A + B",
        "A · (B + 1) = A · B",
        "A' · (B' + 1) = A' · B'",
        "A + (B · 0) = A + B"
      ],
      correctIndex: 0,
      explanation: "To form the dual, swap every · with +, every + with ·, and every 0 with 1 without complementing variables:\nA · (B + 0) = A · B becomes A + (B · 1) = A + B."
    },

    // -------------------------------------------------------------------------
    // 7400-SERIES IC PINOUTS & HARDWARE QUESTIONS
    // -------------------------------------------------------------------------
    {
      id: "q-logic-pin-1",
      type: "mcq",
      question: "Why does the 7402 Quad 2-Input NOR gate require special attention during breadboarding compared to 7400 or 7408?",
      options: [
        "Pin 1 is an OUTPUT (1Y), whereas in 7400/7408 Pin 1 is an INPUT",
        "The supply voltage must be negative (-5V)",
        "It contains 6 gates instead of 4",
        "It requires a dual-rail clock signal"
      ],
      correctIndex: 0,
      explanation: "In the 7402 NOR IC, Gate 1's output is on Pin 1, and its inputs are on Pins 2 and 3. In the 7400 (NAND) and 7408 (AND), Pins 1 and 2 are inputs and Pin 3 is the output."
    },
    {
      id: "q-logic-pin-2",
      type: "mcq",
      question: "What are the standard Power (VCC) and Ground (GND) pin numbers on a standard 14-pin DIP TTL logic IC (e.g. 7400, 7404, 7408, 7432)?",
      options: [
        "Pin 14 = VCC (+5V), Pin 7 = GND (0V)",
        "Pin 1 = VCC (+5V), Pin 14 = GND (0V)",
        "Pin 7 = VCC (+5V), Pin 14 = GND (0V)",
        "Pin 8 = VCC (+5V), Pin 1 = GND (0V)"
      ],
      correctIndex: 0,
      explanation: "In standard DIP-14 TTL IC packages, Pin 14 is connected to positive power supply VCC (+5.0V), and Pin 7 is connected to 0V ground reference."
    },
    {
      id: "q-logic-pin-3",
      type: "mcq",
      question: "The 7407 and 74266 ICs feature Open-Collector outputs. What external component is mandatory for them to output a HIGH logic level?",
      options: [
        "A pull-up resistor connected to VCC",
        "A bypass decoupling capacitor connected to GND",
        "A Zener diode connected across the inputs",
        "An inductor connected in series"
      ],
      correctIndex: 0,
      explanation: "Open-collector outputs cannot actively drive the line HIGH; they only sink current to ground (LOW). An external pull-up resistor (typically 1kΩ to 10kΩ) connected to VCC is required to pull the line HIGH."
    },
    {
      id: "q-logic-pin-4",
      type: "mcq",
      question: "How many 3-input NAND gates are contained inside a single 7410 DIP-14 integrated circuit?",
      options: [
        "3 (Triple 3-Input NAND)",
        "2 (Dual 3-Input NAND)",
        "4 (Quad 3-Input NAND)",
        "1 (Single 3-Input NAND)"
      ],
      correctIndex: 0,
      explanation: "The 7410 is a Triple 3-Input NAND gate IC. Since 3 gates × 3 inputs = 9 pins, plus 3 outputs = 12 pins, plus VCC and GND = 14 pins total."
    },
    {
      id: "q-logic-pin-5",
      type: "mcq",
      question: "What should always be done with unused input pins on CMOS logic ICs (e.g. 74HC series)?",
      options: [
        "Tie them to VCC or GND through a resistor to prevent floating state oscillations",
        "Leave them completely open/floating",
        "Short them directly together and leave floating",
        "Connect them to the signal output"
      ],
      correctIndex: 0,
      explanation: "CMOS inputs have extremely high impedance. Leaving unused inputs floating causes them to float between logic levels, resulting in parasitic oscillation, noise, and excessive supply current draw."
    },

    // -------------------------------------------------------------------------
    // TRUE OR FALSE QUESTIONS
    // -------------------------------------------------------------------------
    {
      id: "q-logic-tf1",
      type: "tf",
      question: "A NOR gate outputs HIGH (1) if and only if all of its inputs are LOW (0).",
      answer: true,
      explanation: "True. A NOR gate is an inverted OR gate. Since OR outputs 0 only when all inputs are 0, NOR inverts this to 1 only when all inputs are 0."
    },
    {
      id: "q-logic-tf2",
      type: "tf",
      question: "The Boolean expression A · (B + C) is in Sum of Products (SOP) form.",
      answer: false,
      explanation: "False. A · (B + C) is in Product of Sums (POS) form. Its expanded SOP form is AB + AC."
    },
    {
      id: "q-logic-tf3",
      type: "tf",
      question: "Any logic gate or digital circuit can be constructed entirely out of 2-input NOR gates.",
      answer: true,
      explanation: "True. NOR is a Universal Gate (along with NAND), capable of implementing NOT, AND, OR, XOR, and all combinational and sequential logic circuits."
    },
    {
      id: "q-logic-tf4",
      type: "tf",
      question: "In Boolean algebra, the operation A + A simplifies to 2A.",
      answer: false,
      explanation: "False. In Boolean algebra, the Idempotent Law states that A + A = A, and A · A = A. Arithmetic coefficients like 2 do not exist."
    },
    {
      id: "q-logic-tf5",
      type: "tf",
      question: "An XNOR gate outputs HIGH (1) whenever its inputs have an even number of 1s (or both inputs are identical).",
      answer: true,
      explanation: "True. An XNOR (Exclusive-NOR) gate is also known as an Equivalence or Even Parity detector. For 2 inputs, it outputs 1 when A=B (0,0 or 1,1)."
    },
    {
      id: "q-logic-tf6",
      type: "tf",
      question: "De Morgan's theorem states that (A + B)' is equal to A' + B'.",
      answer: false,
      explanation: "False. (A + B)' equals A' · B' (the logical product of the complements). The rule is: 'break the line, change the sign'."
    },
    {
      id: "q-logic-tf7",
      type: "tf",
      question: "According to the Consensus Theorem, the term BC in the expression AB + A'C + BC is strictly necessary for circuit operation.",
      answer: false,
      explanation: "False. The Consensus Theorem proves that BC is completely redundant and can be safely eliminated: AB + A'C + BC = AB + A'C."
    },
    {
      id: "q-logic-tf8",
      type: "tf",
      question: "In a standard Full Adder circuit, the Sum output S is equal to A ⊕ B ⊕ Cin.",
      answer: true,
      explanation: "True. The Sum of a full adder is calculated by XORing all three inputs: S = A ⊕ B ⊕ Cin."
    },

    // -------------------------------------------------------------------------
    // IDENTIFICATION QUESTIONS
    // -------------------------------------------------------------------------
    {
      id: "q-logic-id1",
      type: "id",
      question: "What logic gate produces a 1 output when an ODD number of its inputs are 1?",
      answer: "XOR",
      acceptableAnswers: ["XOR", "XOR gate", "Exclusive OR", "Exclusive-OR"],
      hint: "Symbol ⊕",
      explanation: "The XOR (Exclusive-OR) gate is an odd-parity detector. For any number of inputs, it outputs 1 if and only if the count of 1s is odd."
    },
    {
      id: "q-logic-id2",
      type: "id",
      question: "What Boolean law states that changing the grouping of variables does not change the result: A + (B + C) = (A + B) + C?",
      answer: "Associative Law",
      acceptableAnswers: ["Associative Law", "Associative", "Associative Property"],
      hint: "Deals with parentheses and grouping",
      explanation: "The Associative Law states that operations can be grouped in any order: A + (B + C) = (A + B) + C, and A(BC) = (AB)C."
    },
    {
      id: "q-logic-id3",
      type: "id",
      question: "What graphical tool uses a 2D grid ordered in Gray Code to simplify Boolean expressions?",
      answer: "Karnaugh Map",
      acceptableAnswers: ["Karnaugh Map", "K-Map", "Karnaugh", "K map"],
      hint: "Named after Maurice Karnaugh",
      explanation: "A Karnaugh Map (K-Map) arranges truth table minterms in Gray code order so that adjacent cells differ by exactly one binary variable, allowing visual minimization."
    },
    {
      id: "q-logic-id4",
      type: "id",
      question: "What combinational logic circuit adds two 1-bit numbers along with a Carry-In from a previous stage?",
      answer: "Full Adder",
      acceptableAnswers: ["Full Adder", "Full adder circuit"],
      hint: "Has 3 inputs: A, B, and Cin",
      explanation: "A Full Adder takes three inputs (A, B, Cin) and produces two outputs: Sum (S = A ⊕ B ⊕ Cin) and Carry Out (Cout)."
    },
    {
      id: "q-logic-id5",
      type: "id",
      question: "What 7400-series IC number corresponds to the Hex Inverter (six NOT gates in a single 14-pin DIP package)?",
      answer: "7404",
      acceptableAnswers: ["7404", "74LS04", "74HC04", "74HCT04"],
      hint: "Quad NAND is 7400, Hex Inverter is 74__",
      explanation: "The 7404 (e.g. 74LS04 / 74HC04) is the industry standard Hex Inverter containing 6 independent NOT gates."
    },
    {
      id: "q-logic-id6",
      type: "id",
      question: "What theorem states that the redundant term BC can be dropped from the expression AB + A'C + BC?",
      answer: "Consensus Theorem",
      acceptableAnswers: ["Consensus Theorem", "Consensus", "Consensus law"],
      hint: "Redundant product term rule",
      explanation: "The Consensus Theorem states that AB + A'C + BC = AB + A'C. Term BC is called the consensus term."
    },

    // -------------------------------------------------------------------------
    // MATCHING TYPE QUESTIONS
    // -------------------------------------------------------------------------
    {
      id: "q-logic-m1",
      type: "matching",
      title: "Match each 7400-Series Digital IC to its internal gate configuration",
      pairs: [
        { term: "7400", definition: "Quad 2-Input NAND Gates" },
        { term: "7402", definition: "Quad 2-Input NOR Gates (Outputs on 1, 4, 10, 13)" },
        { term: "7404", definition: "Hex Inverters (6 NOT Gates)" },
        { term: "7408", definition: "Quad 2-Input AND Gates" },
        { term: "7432", definition: "Quad 2-Input OR Gates" },
        { term: "7486", definition: "Quad 2-Input XOR Gates" }
      ]
    },
    {
      id: "q-logic-m2",
      type: "matching",
      title: "Match each Boolean Law to its algebraic definition",
      pairs: [
        { term: "Identity Law", definition: "A + 0 = A  and  A · 1 = A" },
        { term: "Null Law", definition: "A + 1 = 1  and  A · 0 = 0" },
        { term: "Idempotent Law", definition: "A + A = A  and  A · A = A" },
        { term: "Complement Law", definition: "A + A' = 1  and  A · A' = 0" },
        { term: "Distributive Law (Dual)", definition: "A + (B · C) = (A + B) · (A + C)" },
        { term: "Consensus Theorem", definition: "AB + A'C + BC = AB + A'C" }
      ]
    }
  ]
};
