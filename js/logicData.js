// Logic Circuits & Digital Electronics Reviewer Dataset
// 100% Full English
// MIDTERM EXAM COVERAGE:
// I.   Simplify and draw the Logic Gate Diagram of the simplified expression (10 pts)
// II.  NAND and NOR Gate Design & Universal Conversions (20 pts)
// III. Combinational Logic Circuits, Analysis & Adders (20 pts)

window.logicData = {
  subjectId: "subj-logic",
  subjectName: "Logic Circuits",
  description: "Midterm Exam Reviewer: Expression Simplification & Gate Diagrams (10 pts), NAND & NOR Gate Design (20 pts), Combinational Circuits & Adders (20 pts).",

  flashcards: [
    // =========================================================================
    // PART I: 12 BOOLEAN ALGEBRA LAWS & SIMPLIFICATION (10 PTS)
    // =========================================================================
    {
      id: "fc-logic-1",
      category: "part1",
      partName: "Part I: Simplification",
      front: "1. Identity Laws in Boolean Algebra",
      back: "• OR Form: A + 0 = A\n• AND Form: A · 1 = A\n\nRule: Adding 0 (null element for OR) or ANDing 1 (identity element for AND) leaves the variable unchanged.",
      hint: "A + 0 = A, A · 1 = A"
    },
    {
      id: "fc-logic-2",
      category: "part1",
      partName: "Part I: Simplification",
      front: "2. Null (Domination) Laws",
      back: "• OR Form: A + 1 = 1\n• AND Form: A · 0 = 0\n\nRule: 1 dominates any OR gate output (HIGH). 0 dominates any AND gate output (LOW).",
      hint: "A + 1 = 1, A · 0 = 0"
    },
    {
      id: "fc-logic-3",
      category: "part1",
      partName: "Part I: Simplification",
      front: "3. Idempotent Laws",
      back: "• OR Form: A + A = A\n• AND Form: A · A = A\n\nRule: Repeating the same variable into an OR or AND gate produces the variable itself. There are no arithmetic coefficients (no 2A or A²).",
      hint: "A + A = A, A · A = A"
    },
    {
      id: "fc-logic-4",
      category: "part1",
      partName: "Part I: Simplification",
      front: "4. Complement Laws",
      back: "• OR Form: A + A' = 1\n• AND Form: A · A' = 0\n\nRule: A variable and its complement always have opposite logic levels (1 and 0). Their logical sum is always 1; their product is always 0.",
      hint: "A + A' = 1, A · A' = 0"
    },
    {
      id: "fc-logic-5",
      category: "part1",
      partName: "Part I: Simplification",
      front: "5. Double Negation (Involution) Law",
      back: "• Expression: (A')' = A\n\nRule: Inverting a signal twice restores the original logic level. Two cascading inverters cancel each other out.",
      hint: "(A')' = A"
    },
    {
      id: "fc-logic-6",
      category: "part1",
      partName: "Part I: Simplification",
      front: "6. Commutative Laws",
      back: "• OR Form: A + B = B + A\n• AND Form: A · B = B · A\n\nRule: Swapping the order of input wires into an OR or AND gate does not change the output.",
      hint: "Input order does not matter"
    },
    {
      id: "fc-logic-7",
      category: "part1",
      partName: "Part I: Simplification",
      front: "7. Associative Laws",
      back: "• OR Form: (A + B) + C = A + (B + C)\n• AND Form: (A · B) · C = A · (B · C)\n\nRule: Input signals can be grouped in any order when combining identical logic gates.",
      hint: "Grouping does not matter"
    },
    {
      id: "fc-logic-8a",
      category: "part1",
      partName: "Part I: Simplification",
      front: "8a. Distributive Law of AND over OR",
      back: "• Expression: A · (B + C) = A·B + A·C\n\nRule: Standard factoring / distribution: multiplying an input across an OR sum.",
      hint: "A(B + C) = AB + AC"
    },
    {
      id: "fc-logic-8b",
      category: "part1",
      partName: "Part I: Simplification",
      front: "8b. Distributive Law of OR over AND (Dual Form)",
      back: "• Expression: A + (B · C) = (A + B) · (A + C)\n\nCRITICAL EXAM RULE: This has NO counterpart in elementary algebra! It allows distributing an OR term into product terms.",
      hint: "A + BC = (A+B)(A+C)"
    },
    {
      id: "fc-logic-9a",
      category: "part1",
      partName: "Part I: Simplification",
      front: "9a. Basic Absorption Laws (Forms 1 & 2)",
      back: "• Form 1: A + A·B = A\nProof: A(1 + B) = A(1) = A\n\n• Form 2: A · (A + B) = A\nProof: A·A + A·B = A + AB = A",
      hint: "A + AB = A"
    },
    {
      id: "fc-logic-9b",
      category: "part1",
      partName: "Part I: Simplification",
      front: "9b. Advanced Absorption Laws (Forms 3 & 4)",
      back: "• Form 3: A + A'·B = A + B\nProof: (A + A')(A + B) = (1)(A + B) = A + B\n\n• Form 4: A · (A' + B) = A·B\nProof: A·A' + A·B = 0 + AB = AB",
      hint: "A + A'B = A + B"
    },
    {
      id: "fc-logic-10",
      category: "part1",
      partName: "Part I: Simplification",
      front: "10. Consensus Theorem (SOP & POS Forms)",
      back: "• SOP Form: A·B + A'·C + B·C = A·B + A'·C\n(The term B·C is the redundant consensus term and is eliminated!)\n\n• POS Dual Form: (A + B)(A' + C)(B + C) = (A + B)(A' + C)\n\nRule: If variable A appears true in one term and complemented (A') in another, the product of the remaining variables (BC) is redundant.",
      hint: "AB + A'C + BC = AB + A'C"
    },
    {
      id: "fc-logic-11",
      category: "part1",
      partName: "Part I: Simplification",
      front: "11. De Morgan's Theorems",
      back: "• First Theorem: (A · B)' = A' + B'\n(Complement of a product is the sum of complements: NAND = Negative-OR)\n\n• Second Theorem: (A + B)' = A' · B'\n(Complement of a sum is the product of complements: NOR = Negative-AND)\n\nRule: 'Break the line, change the sign.'",
      hint: "Break the line, change the sign"
    },
    {
      id: "fc-logic-12",
      category: "part1",
      partName: "Part I: Simplification",
      front: "12. Duality Principle",
      back: "Principle: Any true Boolean equation remains true if you swap every OR (+) with AND (·), and every 0 with 1 throughout (variables remain uncomplemented).\n\nExample: Dual of A + 0 = A is A · 1 = A.",
      hint: "Swap + with · and 0 with 1"
    },

    // =========================================================================
    // PART II: NAND AND NOR GATE DESIGN & UNIVERSAL CONVERSIONS (20 PTS)
    // =========================================================================
    {
      id: "fc-logic-u1",
      category: "part2",
      partName: "Part II: Universal Design",
      front: "Why are NAND and NOR called Universal Logic Gates?",
      back: "Definition: A Universal Gate can implement EVERY fundamental logic function (NOT, AND, OR, XOR, XNOR) and synthesize any combinational or sequential circuit without requiring any other gate type.",
      hint: "Can construct all other gates"
    },
    {
      id: "fc-logic-u2",
      category: "part2",
      partName: "Part II: Universal Design",
      front: "How is a NOT Gate implemented using NAND vs NOR?",
      back: "• Using NAND (1 Gate): Tie both inputs together: Y = (A · A)' = A'\n• Using NOR (1 Gate): Tie both inputs together: Y = (A + A)' = A'\n\nGate Count: 1 gate each.",
      hint: "Tie inputs together (1 gate)"
    },
    {
      id: "fc-logic-u3",
      category: "part2",
      partName: "Part II: Universal Design",
      front: "How is an AND Gate synthesized using NAND-only vs NOR-only?",
      back: "• Using NAND (2 Gates):\n1. Compute NAND: T1 = (AB)'\n2. Invert with NAND: Y = ((AB)')' = AB\n\n• Using NOR (3 Gates - De Morgan):\n1. Invert A: A' = (A+A)'\n2. Invert B: B' = (B+B)'\n3. Feed into 3rd NOR: Y = (A' + B')' = (A')'(B')' = AB",
      hint: "2 NANDs or 3 NORs"
    },
    {
      id: "fc-logic-u4",
      category: "part2",
      partName: "Part II: Universal Design",
      front: "How is an OR Gate synthesized using NAND-only vs NOR-only?",
      back: "• Using NAND (3 Gates - De Morgan):\n1. Invert A: A' = (AA)'\n2. Invert B: B' = (BB)'\n3. Feed into 3rd NAND: Y = (A' · B')' = (A')' + (B')' = A + B\n\n• Using NOR (2 Gates):\n1. Compute NOR: T1 = (A+B)'\n2. Invert with NOR: Y = ((A+B)')' = A + B",
      hint: "3 NANDs or 2 NORs"
    },
    {
      id: "fc-logic-u5",
      category: "part2",
      partName: "Part II: Universal Design",
      front: "How many NAND gates are required to implement a 2-input XOR Gate?",
      back: "An XOR gate requires exactly 4 NAND gates:\n1. NAND 1: T1 = (AB)'\n2. NAND 2: T2 = (A · T1)' = A' + B\n3. NAND 3: T3 = (B · T1)' = B' + A\n4. NAND 4: Y = (T2 · T3)' = A'B + AB' = A ⊕ B",
      hint: "4 NAND gates"
    },
    {
      id: "fc-logic-u6",
      category: "part2",
      partName: "Part II: Universal Design",
      front: "Summary Matrix of Universal Gate Counts",
      back: "Function | NAND-Only Gates | NOR-Only Gates\nNOT      | 1               | 1\nAND      | 2               | 3\nOR       | 3               | 2\nNOR      | 4               | 1\nNAND     | 1               | 4\nXOR      | 4               | 5\nXNOR     | 5               | 4",
      hint: "Memorize: NOT=1/1, AND=2/3, OR=3/2, XOR=4/5"
    },
    {
      id: "fc-logic-u7",
      category: "part2",
      partName: "Part II: Universal Design",
      front: "What is Bubble-to-Bubble Logic in De Morgan conversion?",
      back: "Rule: When converting an AND-OR network to an all-NAND network:\n• Output of 1st level AND gates become NAND (inversion bubbles added at outputs).\n• 2nd level OR gate becomes a Negative-OR (inversion bubbles at inputs).\n• Bubbles on the same wire cancel out! Thus, an AND-OR circuit is directly equivalent to a 2-level NAND-NAND circuit.",
      hint: "AND-OR is equivalent to NAND-NAND"
    },

    // =========================================================================
    // PART III: COMBINATIONAL LOGIC CIRCUITS & ADDERS (20 PTS)
    // =========================================================================
    {
      id: "fc-logic-c1",
      category: "part3",
      partName: "Part III: Combinational Circuits",
      front: "What is a Combinational Logic Circuit?",
      back: "Definition: A digital circuit whose output at any given instant depends SOLELY on the present combination of its inputs. It contains NO memory elements, no feedback loops, and no clock signals.",
      hint: "Output depends only on present inputs"
    },
    {
      id: "fc-logic-c2",
      category: "part3",
      partName: "Part III: Combinational Circuits",
      front: "What is a Half Adder? State its equations and gate diagram.",
      back: "Inputs: A, B (2 bits, NO carry-in)\nOutputs:\n• Sum: S = A ⊕ B (1 XOR gate)\n• Carry: C = A · B (1 AND gate)\n\nTruth Table:\n0+0 -> S=0, C=0\n0+1 -> S=1, C=0\n1+0 -> S=1, C=0\n1+1 -> S=0, C=1",
      hint: "Sum = A ⊕ B, Carry = AB"
    },
    {
      id: "fc-logic-c3",
      category: "part3",
      partName: "Part III: Combinational Circuits",
      front: "What is a Full Adder? State its equations and gate requirements.",
      back: "Inputs: A, B, Cin (3 bits)\nOutputs:\n• Sum: S = A ⊕ B ⊕ Cin\n• Carry Out: Cout = AB + Cin·(A ⊕ B) = AB + BCin + ACin\n\nConstruction: Can be built using TWO Half Adders and ONE OR gate.",
      hint: "Sum = A ⊕ B ⊕ Cin, Cout = AB + Cin(A ⊕ B)"
    },
    {
      id: "fc-logic-c4",
      category: "part3",
      partName: "Part III: Combinational Circuits",
      front: "What is a Multiplexer (MUX)?",
      back: "Definition: A data selector combinational circuit that selects one of 2^n input data lines and forwards it to a single output line based on n select lines.\n\nExample: 2-to-1 MUX equation:\nY = S' · D0 + S · D1",
      hint: "Many-to-one data selector"
    },
    {
      id: "fc-logic-c5",
      category: "part3",
      partName: "Part III: Combinational Circuits",
      front: "What is Propagation Delay in Combinational Circuits?",
      back: "Definition: The time delay between a change in an input voltage and the resulting transition of the output voltage.\n\nCritical Path: The longest propagation delay path through the circuit gates from any input to the output. Determines the maximum operating frequency.",
      hint: "Longest gate delay path"
    }
  ],

  questions: [
    {
      id: "q-mid-kmap-notebook",
      part: "part1",
      partTitle: "Part I: Simplify & Gate Diagram",
      type: "mcq",
      circuitSvg: `<svg viewBox="0 0 540 180" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg">
        <!-- Input rails -->
        <text x="40" y="25" fill="#818cf8" font-size="12" font-weight="bold" font-family="monospace">F</text>
        <line x1="40" y1="30" x2="40" y2="160" stroke="#4f46e5" stroke-width="2"/>
        <line x1="40" y1="50" x2="70" y2="50" stroke="#4f46e5" stroke-width="1.5"/>
        <circle cx="40" cy="50" r="3" fill="#818cf8"/>
        <!-- Inverter on F -->
        <polygon points="70,43 85,50 70,57" fill="#18181b" stroke="#818cf8" stroke-width="1.5"/>
        <circle cx="88" cy="50" r="2.5" fill="#18181b" stroke="#818cf8" stroke-width="1.5"/>
        <line x1="91" y1="50" x2="200" y2="50" stroke="#818cf8" stroke-width="1.5" stroke-dasharray="3,3"/>
        <text x="95" y="42" fill="#818cf8" font-size="10" font-family="monospace">F̄</text>

        <text x="120" y="25" fill="#818cf8" font-size="12" font-weight="bold" font-family="monospace">S</text>
        <line x1="120" y1="30" x2="120" y2="160" stroke="#4f46e5" stroke-width="2"/>

        <text x="160" y="25" fill="#818cf8" font-size="12" font-weight="bold" font-family="monospace">M</text>
        <line x1="160" y1="30" x2="160" y2="160" stroke="#4f46e5" stroke-width="2"/>

        <!-- AND gate for F̄·M -->
        <circle cx="91" cy="70" r="3" fill="#f59e0b"/>
        <line x1="91" y1="70" x2="220" y2="70" stroke="#f59e0b" stroke-width="1.5"/>
        <circle cx="160" cy="85" r="3" fill="#f59e0b"/>
        <line x1="160" y1="85" x2="220" y2="85" stroke="#f59e0b" stroke-width="1.5"/>
        <path d="M 220 60 L 244 60 A 18 18 0 0 1 244 96 L 220 96 Z" fill="#18181b" stroke="#f59e0b" stroke-width="2"/>
        <text x="234" y="82" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">AND</text>
        <line x1="262" y1="78" x2="330" y2="78" stroke="#f59e0b" stroke-width="2"/>
        <text x="270" y="72" fill="#fbbf24" font-size="11" font-family="monospace" font-weight="bold">F̄M</text>

        <!-- Tap for S (Direct Rail) -->
        <circle cx="120" cy="120" r="3" fill="#10b981"/>
        <line x1="120" y1="120" x2="330" y2="120" stroke="#10b981" stroke-width="2"/>
        <text x="270" y="115" fill="#10b981" font-size="11" font-family="monospace" font-weight="bold">S</text>

        <!-- Final OR Gate -->
        <line x1="330" y1="78" x2="345" y2="88" stroke="#64748b" stroke-width="1.5"/>
        <line x1="330" y1="120" x2="345" y2="110" stroke="#64748b" stroke-width="1.5"/>
        <path d="M 345 75 Q 360 99 345 123 Q 380 121 395 99 Q 380 77 345 75 Z" fill="#18181b" stroke="#10b981" stroke-width="2"/>
        <text x="366" y="103" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">OR</text>
        <line x1="395" y1="99" x2="470" y2="99" stroke="#10b981" stroke-width="2.5"/>
        <circle cx="470" cy="99" r="4" fill="#10b981"/>
        <text x="480" y="104" fill="#34d399" font-size="14" font-weight="bold" font-family="monospace">Y = S + F̄M</text>
      </svg>`,
      question: "Simplify the 3-variable Boolean function F(F, S, M) = Σm(1, 2, 3, 6, 7) using a 2x4 Gray-code Karnaugh Map and select the minimal Sum of Products (SOP).",
      options: [
        "Y = S + F̄M (Quad of 4 cells yields S; Pair of 2 cells yields F̄M)",
        "Y = F + S'M (Quad of 4 cells yields F; Pair of 2 cells yields S'M)",
        "Y = SM + F̄S (Pair of 2 cells yields SM; Pair of 2 cells yields F̄S)",
        "Y = F'S + FM (Pair of 2 cells yields F'S; Pair of 2 cells yields FM)"
      ],
      correctIndex: 0,
      explanation: "Step-by-Step 3-Variable K-Map Minimization for F(F, S, M) = Σm(1, 2, 3, 6, 7):\n" +
        "1. Grid Layout: Columns FS = 00, 01, 11, 10; Rows M = 0, 1.\n" +
        "2. Plotting 1s:\n" +
        "   - Row M=0 (M̄): m2 (col 01), m6 (col 11)\n" +
        "   - Row M=1 (M): m1 (col 00), m3 (col 01), m7 (col 11)\n" +
        "3. Optimal Rectangular Grouping:\n" +
        "   - Group 1 (Quad: 4 cells): Columns F̄S (m2, m3) and FS (m6, m7) across both rows M=0 and M=1. Variables F and M change from 0 to 1 and are eliminated; S stays 1 -> Yields S.\n" +
        "   - Group 2 (Pair: 2 cells): Row M=1, columns F̄S̄ (m1) and F̄S (m3). Variable S changes and is eliminated; F stays 0 (F̄) and M stays 1 (M) -> Yields F̄M.\n" +
        "4. Minimized SOP: Y = S + F̄M.\n" +
        "Logic Circuit: 1 inverter on F, 1 2-input AND gate for F̄·M, and 1 2-input OR gate producing Y = S + F̄M."
    },
    // =========================================================================
    // SECTION I: SIMPLIFY AND DRAW LOGIC GATE DIAGRAM (10 PTS)
    // =========================================================================
    {
      id: "q-mid-s1",
      part: "part1",
      partTitle: "Part I: Simplify & Gate Diagram",
      type: "mcq",
      circuitSvg: `<svg viewBox="0 0 540 160" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg"><text x="20" y="45" fill="#38bdf8" font-size="12" font-weight="bold">A</text><text x="20" y="115" fill="#38bdf8" font-size="12" font-weight="bold">B</text><line x1="35" y1="40" x2="160" y2="40" stroke="#38bdf8" stroke-width="2"/><line x1="60" y1="40" x2="60" y2="95" stroke="#38bdf8" stroke-width="2"/><circle cx="60" cy="40" r="3" fill="#38bdf8"/><line x1="60" y1="95" x2="160" y2="95" stroke="#38bdf8" stroke-width="2"/><line x1="35" y1="110" x2="90" y2="110" stroke="#38bdf8" stroke-width="2"/><line x1="80" y1="110" x2="80" y2="55" stroke="#38bdf8" stroke-width="2"/><circle cx="80" cy="110" r="3" fill="#38bdf8"/><line x1="80" y1="55" x2="160" y2="55" stroke="#38bdf8" stroke-width="2"/><polygon points="90,105 90,125 110,115" fill="#18181b" stroke="#f43f5e" stroke-width="2"/><circle cx="114" cy="115" r="3" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/><line x1="117" y1="115" x2="160" y2="115" stroke="#38bdf8" stroke-width="2"/><path d="M 160,32 L 180,32 A 18,18 0 0,1 180,68 L 160,68 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/><line x1="198" y1="50" x2="270" y2="50" stroke="#06b6d4" stroke-width="2"/><text x="210" y="44" fill="#a1a1aa" font-size="9" font-mono>A·B</text><path d="M 160,87 L 180,87 A 18,18 0 0,1 180,123 L 160,123 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/><line x1="198" y1="105" x2="270" y2="105" stroke="#06b6d4" stroke-width="2"/><text x="210" y="120" fill="#a1a1aa" font-size="9" font-mono>A·B'</text><line x1="270" y1="50" x2="310" y2="68" stroke="#06b6d4" stroke-width="2"/><line x1="270" y1="105" x2="310" y2="86" stroke="#06b6d4" stroke-width="2"/><path d="M 305,60 Q 320,77 305,94 Q 335,94 345,77 Q 335,60 305,60 Z" fill="#090d16" stroke="#10b981" stroke-width="2"/><line x1="345" y1="77" x2="420" y2="77" stroke="#10b981" stroke-width="2.5"/><circle cx="420" cy="77" r="4" fill="#10b981"/><text x="430" y="81" fill="#34d399" font-size="14" font-weight="900">Y</text></svg>`,
      question: "Simplify the Boolean expression Y = A·B + A·B' and identify what the minimal logic diagram reduces to.",
      options: [
        "Y = A (Diagram reduces to a direct wire from input A)",
        "Y = B (Diagram reduces to a direct wire from input B)",
        "Y = A + B (Diagram is a single 2-input OR gate)",
        "Y = A ⊕ B (Diagram is a single 2-input XOR gate)"
      ],
      correctIndex: 0,
      explanation: "Derivation:\n1. Expression: Y = AB + AB'\n2. Factor out A (Distributive Law): Y = A(B + B')\n3. Complement Law (B + B' = 1): Y = A(1)\n4. Identity Law (A · 1 = A): Y = A.\nThe entire 3-gate circuit (2 AND gates + 1 OR gate + 1 inverter) simplifies to a single direct wire: Y = A."
    },
    {
      id: "q-mid-s2",
      part: "part1",
      partTitle: "Part I: Simplify & Gate Diagram",
      type: "mcq",
      circuitSvg: `<svg viewBox="0 0 540 160" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg"><text x="20" y="45" fill="#38bdf8" font-size="12" font-weight="bold">A</text><text x="20" y="115" fill="#38bdf8" font-size="12" font-weight="bold">B</text><line x1="35" y1="40" x2="80" y2="40" stroke="#38bdf8" stroke-width="2"/><line x1="60" y1="40" x2="60" y2="105" stroke="#38bdf8" stroke-width="2"/><circle cx="60" cy="40" r="3" fill="#38bdf8"/><line x1="60" y1="105" x2="160" y2="105" stroke="#38bdf8" stroke-width="2"/><polygon points="80,30 80,50 100,40" fill="#18181b" stroke="#f43f5e" stroke-width="2"/><circle cx="104" cy="40" r="3" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/><line x1="107" y1="40" x2="160" y2="40" stroke="#38bdf8" stroke-width="2"/><line x1="35" y1="110" x2="160" y2="110" stroke="#38bdf8" stroke-width="2"/><line x1="85" y1="110" x2="85" y2="55" stroke="#38bdf8" stroke-width="2"/><circle cx="85" cy="110" r="3" fill="#38bdf8"/><line x1="85" y1="55" x2="160" y2="55" stroke="#38bdf8" stroke-width="2"/><path d="M 160,35 Q 175,48 160,60 Q 190,60 200,48 Q 190,35 160,35 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/><line x1="200" y1="48" x2="270" y2="48" stroke="#06b6d4" stroke-width="2"/><text x="210" y="42" fill="#a1a1aa" font-size="9" font-mono>A' + B</text><path d="M 160,95 Q 175,108 160,120 Q 190,120 200,108 Q 190,95 160,95 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/><line x1="200" y1="108" x2="270" y2="108" stroke="#06b6d4" stroke-width="2"/><text x="210" y="125" fill="#a1a1aa" font-size="9" font-mono>A + B</text><line x1="270" y1="48" x2="310" y2="68" stroke="#06b6d4" stroke-width="2"/><line x1="270" y1="108" x2="310" y2="86" stroke="#06b6d4" stroke-width="2"/><path d="M 310,60 L 330,60 A 17,17 0 0,1 330,94 L 310,94 Z" fill="#090d16" stroke="#10b981" stroke-width="2"/><line x1="347" y1="77" x2="420" y2="77" stroke="#10b981" stroke-width="2.5"/><circle cx="420" cy="77" r="4" fill="#10b981"/><text x="430" y="81" fill="#34d399" font-size="14" font-weight="900">Y</text></svg>`,
      question: "Simplify the dual OR-AND expression Y = (A' + B)(A + B). What does its simplified logic gate diagram consist of?",
      options: [
        "Y = B (A single wire directly from input B)",
        "Y = A (A single wire directly from input A)",
        "Y = A' · B (An inverter on A feeding an AND gate with B)",
        "Y = A · B (A single 2-input AND gate)"
      ],
      correctIndex: 0,
      explanation: "Derivation:\n1. Expression: Y = (A' + B)(A + B)\n2. Distributive Law (OR over AND): Y = B + (A' · A)\n3. Complement Law (A' · A = 0): Y = B + 0\n4. Identity Law (B + 0 = B): Y = B.\nThe diagram reduces to a direct connection from input B."
    },
    {
      id: "q-mid-s3",
      part: "part1",
      partTitle: "Part I: Simplify & Gate Diagram",
      type: "mcq",
      question: "Simplify the expression Y = A + A'·B and choose the correct simplified expression and its gate diagram representation.",
      options: [
        "Y = A + B (Single 2-input OR gate with inputs A and B)",
        "Y = A · B (Single 2-input AND gate with inputs A and B)",
        "Y = A (Direct line from input A)",
        "Y = A ⊕ B (Single 2-input XOR gate)"
      ],
      correctIndex: 0,
      explanation: "Derivation via Absorption Law 3:\nY = A + A'B\n= (A + A')(A + B)   [Distributive Law]\n= (1)(A + B)        [Complement Law]\n= A + B             [Identity Law]\nThe simplified gate diagram is simply ONE 2-input OR gate receiving inputs A and B."
    },
    {
      id: "q-mid-s4",
      part: "part1",
      partTitle: "Part I: Simplify & Gate Diagram",
      type: "mcq",
      circuitSvg: `<svg viewBox="0 0 540 180" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="10" width="510" height="160" rx="12" fill="#090d16" stroke="#27272a"/><text x="35" y="35" fill="#a855f7" font-size="11" font-weight="bold">Consensus Circuit Simplification</text><rect x="40" y="50" width="110" height="30" rx="6" fill="#18181b" stroke="#06b6d4" stroke-width="1.5"/><text x="95" y="70" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">AND 1: A · B</text><rect x="40" y="90" width="110" height="30" rx="6" fill="#18181b" stroke="#06b6d4" stroke-width="1.5"/><text x="95" y="110" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">AND 2: A' · C</text><rect x="40" y="130" width="110" height="30" rx="6" fill="#18181b" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="3,3"/><text x="95" y="150" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">AND 3: B · C</text><line x1="150" y1="65" x2="250" y2="85" stroke="#06b6d4" stroke-width="2"/><line x1="150" y1="105" x2="250" y2="105" stroke="#06b6d4" stroke-width="2"/><line x1="150" y1="145" x2="250" y2="125" stroke="#f43f5e" stroke-width="2" stroke-dasharray="3,3"/><path d="M 250,75 Q 270,105 250,135 Q 290,135 305,105 Q 290,75 250,75 Z" fill="#18181b" stroke="#10b981" stroke-width="2"/><line x1="305" y1="105" x2="380" y2="105" stroke="#10b981" stroke-width="2.5"/><circle cx="380" cy="105" r="4" fill="#10b981"/><text x="390" y="109" fill="#34d399" font-size="14" font-weight="900">Y</text></svg>`,
      question: "Simplify the 3-term expression Y = AB + A'C + BC using the Consensus Theorem. What does the final drawn logic circuit contain?",
      options: [
        "Y = AB + A'C (Two 2-input AND gates feeding a single 2-input OR gate)",
        "Y = BC (A single 2-input AND gate)",
        "Y = A + B + C (A single 3-input OR gate)",
        "Y = AB + BC (Two AND gates feeding an OR gate)"
      ],
      correctIndex: 0,
      explanation: "By the Consensus Theorem:\nY = AB + A'C + BC = AB + A'C.\nVariable A appears complemented and uncomplemented. The term formed by the other variables (BC) is redundant.\nThe simplified logic diagram requires only 2 AND gates (for AB and A'C) feeding ONE 2-input OR gate, removing the 3rd AND gate completely."
    },
    {
      id: "q-mid-s5",
      part: "part1",
      partTitle: "Part I: Simplify & Gate Diagram",
      type: "mcq",
      question: "Simplify the expression Y = A'B + AB' and identify the single standard logic gate that draws this exact function.",
      options: [
        "Y = A ⊕ B (A single 2-input XOR gate)",
        "Y = (A ⊕ B)' (A single 2-input XNOR gate)",
        "Y = A + B (A single 2-input OR gate)",
        "Y = A · B (A single 2-input AND gate)"
      ],
      correctIndex: 0,
      explanation: "The canonical sum-of-products A'B + AB' is the exact definition of the Exclusive-OR (XOR) function: Y = A ⊕ B. Drawing this requires just ONE 2-input XOR gate."
    },

    // =========================================================================
    // SECTION II: NAND AND NOR GATE DESIGN & UNIVERSAL CONVERSIONS (20 PTS)
    // =========================================================================
    {
      id: "q-mid-u1",
      part: "part2",
      partTitle: "Part II: NAND & NOR Design",
      type: "mcq",
      circuitSvg: `<svg viewBox="0 0 500 130" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg"><text x="30" y="65" fill="#38bdf8" font-size="13" font-weight="bold">A</text><line x1="50" y1="60" x2="100" y2="60" stroke="#38bdf8" stroke-width="2"/><line x1="80" y1="60" x2="80" y2="45" stroke="#38bdf8" stroke-width="2"/><line x1="80" y1="45" x2="120" y2="45" stroke="#38bdf8" stroke-width="2"/><line x1="80" y1="60" x2="80" y2="75" stroke="#38bdf8" stroke-width="2"/><line x1="80" y1="75" x2="120" y2="75" stroke="#38bdf8" stroke-width="2"/><circle cx="80" cy="60" r="3" fill="#38bdf8"/><path d="M 120,35 L 145,35 A 25,25 0 0,1 145,85 L 120,85 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/><circle cx="174" cy="60" r="4" fill="#090d16" stroke="#06b6d4" stroke-width="2"/><line x1="178" y1="60" x2="270" y2="60" stroke="#10b981" stroke-width="2.5"/><circle cx="270" cy="60" r="4" fill="#10b981"/><text x="280" y="64" fill="#34d399" font-size="13" font-weight="bold">Y = A'</text></svg>`,
      question: "The circuit above ties both inputs of a 2-input NAND gate together. What logic gate function does this design synthesize?",
      options: [
        "NOT Gate (Inverter): Y = A'",
        "Buffer: Y = A",
        "AND Gate: Y = A · A",
        "OR Gate: Y = A + A"
      ],
      correctIndex: 0,
      explanation: "When both inputs of a NAND gate are connected to A, the Boolean function is Y = (A · A)'. By the Idempotent Law, A · A = A. Substituting gives Y = A'. Thus, a single NAND gate with tied inputs functions as an Inverter."
    },
    {
      id: "q-mid-u2",
      part: "part2",
      partTitle: "Part II: NAND & NOR Design",
      type: "mcq",
      circuitSvg: `<svg viewBox="0 0 540 140" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg"><text x="20" y="50" fill="#38bdf8" font-size="12" font-weight="bold">A</text><text x="20" y="90" fill="#38bdf8" font-size="12" font-weight="bold">B</text><line x1="40" y1="45" x2="100" y2="45" stroke="#38bdf8" stroke-width="2"/><line x1="40" y1="85" x2="100" y2="85" stroke="#38bdf8" stroke-width="2"/><path d="M 100,30 L 125,30 A 25,25 0 0,1 125,100 L 100,100 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/><circle cx="154" cy="65" r="4" fill="#090d16" stroke="#06b6d4" stroke-width="2"/><text x="170" y="55" fill="#a1a1aa" font-size="10" font-mono>(AB)'</text><line x1="158" y1="65" x2="210" y2="65" stroke="#06b6d4" stroke-width="2"/><line x1="190" y1="65" x2="190" y2="50" stroke="#06b6d4" stroke-width="2"/><line x1="190" y1="50" x2="230" y2="50" stroke="#06b6d4" stroke-width="2"/><line x1="190" y1="65" x2="190" y2="80" stroke="#06b6d4" stroke-width="2"/><line x1="190" y1="80" x2="230" y2="80" stroke="#06b6d4" stroke-width="2"/><circle cx="190" cy="65" r="3" fill="#06b6d4"/><path d="M 230,35 L 255,35 A 25,25 0 0,1 255,95 L 230,95 Z" fill="#090d16" stroke="#10b981" stroke-width="2"/><circle cx="284" cy="65" r="4" fill="#090d16" stroke="#10b981" stroke-width="2"/><line x1="288" y1="65" x2="360" y2="65" stroke="#10b981" stroke-width="2.5"/><circle cx="360" cy="65" r="4" fill="#10b981"/><text x="370" y="69" fill="#34d399" font-size="13" font-weight="900">Y = A · B</text></svg>`,
      question: "How many 2-input NAND gates are used in the schematic above to synthesize a standard AND gate (Y = A · B)?",
      options: [
        "2 NAND gates",
        "3 NAND gates",
        "1 NAND gate",
        "4 NAND gates"
      ],
      correctIndex: 0,
      explanation: "Implementing an AND gate using NAND logic requires 2 gates: Gate 1 computes (AB)', and Gate 2 acts as an inverter with tied inputs to produce ((AB)')' = AB."
    },
    {
      id: "q-mid-u3",
      part: "part2",
      partTitle: "Part II: NAND & NOR Design",
      type: "mcq",
      question: "How many 2-input NOR gates are required to implement a standard 2-input AND gate (Y = A · B)?",
      options: [
        "3 NOR gates",
        "2 NOR gates",
        "4 NOR gates",
        "1 NOR gate"
      ],
      correctIndex: 0,
      explanation: "By De Morgan's theorem, A · B = (A' + B')'. Therefore, synthesizing AND using NOR requires:\n1. 1 NOR gate to invert A -> A'\n2. 1 NOR gate to invert B -> B'\n3. 1 NOR gate to combine (A' + B')' = AB\nTotal: Exactly 3 NOR gates."
    },
    {
      id: "q-mid-u4",
      part: "part2",
      partTitle: "Part II: NAND & NOR Design",
      type: "mcq",
      question: "How many 2-input NAND gates are required to design an OR gate (Y = A + B)?",
      options: [
        "3 NAND gates",
        "2 NAND gates",
        "1 NAND gate",
        "4 NAND gates"
      ],
      correctIndex: 0,
      explanation: "By De Morgan's theorem, A + B = (A' · B')'. Therefore:\n1. 1 NAND inverter for A -> A'\n2. 1 NAND inverter for B -> B'\n3. 1 NAND gate to combine (A' · B')' = A + B\nTotal: Exactly 3 NAND gates."
    },
    {
      id: "q-mid-u5",
      part: "part2",
      partTitle: "Part II: NAND & NOR Design",
      type: "mcq",
      circuitSvg: `<svg viewBox="0 0 540 170" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="520" height="150" rx="12" fill="#090d16" stroke="#27272a"/><text x="30" y="35" fill="#a855f7" font-size="11" font-weight="bold">Universal 4-NAND Gate Design</text><text x="30" y="70" fill="#38bdf8" font-size="12" font-weight="bold">A</text><text x="30" y="120" fill="#38bdf8" font-size="12" font-weight="bold">B</text><rect x="80" y="65" width="55" height="36" rx="6" fill="#18181b" stroke="#06b6d4" stroke-width="1.5"/><text x="107" y="87" fill="#06b6d4" font-size="10" font-weight="bold" text-anchor="middle">NAND 1</text><rect x="210" y="40" width="55" height="36" rx="6" fill="#18181b" stroke="#06b6d4" stroke-width="1.5"/><text x="237" y="62" fill="#06b6d4" font-size="10" font-weight="bold" text-anchor="middle">NAND 2</text><rect x="210" y="95" width="55" height="36" rx="6" fill="#18181b" stroke="#06b6d4" stroke-width="1.5"/><text x="237" y="117" fill="#06b6d4" font-size="10" font-weight="bold" text-anchor="middle">NAND 3</text><rect x="340" y="68" width="55" height="36" rx="6" fill="#18181b" stroke="#10b981" stroke-width="2"/><text x="367" y="90" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">NAND 4</text><line x1="395" y1="86" x2="470" y2="86" stroke="#10b981" stroke-width="2.5"/><circle cx="470" cy="86" r="4" fill="#10b981"/><text x="480" y="90" fill="#34d399" font-size="13" font-weight="900">Y</text></svg>`,
      question: "The standard 4-NAND gate network shown above is widely tested in digital examinations. What logic function does it design?",
      options: [
        "Exclusive-OR (XOR): Y = A ⊕ B",
        "Exclusive-NOR (XNOR): Y = (A ⊕ B)'",
        "Half Adder Carry Out",
        "Full Adder Sum"
      ],
      correctIndex: 0,
      explanation: "A 4-NAND gate network synthesizes the XOR function (Y = A ⊕ B = A'B + AB'):\n1. NAND 1: (AB)'\n2. NAND 2: (A · (AB)')' = A' + B\n3. NAND 3: (B · (AB)')' = B' + A\n4. NAND 4: [(A' + B)(B' + A)]' = A'B + AB' = A ⊕ B."
    },
    {
      id: "q-mid-u6",
      part: "part2",
      partTitle: "Part II: NAND & NOR Design",
      type: "mcq",
      question: "According to De Morgan's theorem, an OR gate with inverted inputs (Negative-OR or Bubble-OR) is logically equivalent to which single gate?",
      options: [
        "NAND gate",
        "NOR gate",
        "AND gate",
        "XOR gate"
      ],
      correctIndex: 0,
      explanation: "Negative-OR equation: Y = A' + B'. By De Morgan's first theorem, A' + B' = (A · B)', which is the exact equation of a NAND gate."
    },
    {
      id: "q-mid-u7",
      part: "part2",
      partTitle: "Part II: NAND & NOR Design",
      type: "mcq",
      question: "According to De Morgan's theorem, an AND gate with inverted inputs (Negative-AND or Bubble-AND) is logically equivalent to which single gate?",
      options: [
        "NOR gate",
        "NAND gate",
        "OR gate",
        "XNOR gate"
      ],
      correctIndex: 0,
      explanation: "Negative-AND equation: Y = A' · B'. By De Morgan's second theorem, A' · B' = (A + B)', which is the exact equation of a NOR gate."
    },

    // =========================================================================
    // SECTION III: COMBINATIONAL LOGIC CIRCUITS & ADDERS (20 PTS)
    // =========================================================================
    {
      id: "q-mid-c1",
      part: "part3",
      partTitle: "Part III: Combinational Circuits",
      type: "mcq",
      circuitSvg: `<svg viewBox="0 0 540 160" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="10" width="510" height="140" rx="12" fill="#090d16" stroke="#27272a"/><text x="35" y="35" fill="#a855f7" font-size="11" font-weight="bold">Half Adder Circuit Schematic</text><text x="35" y="65" fill="#38bdf8" font-size="12" font-weight="bold">A</text><text x="35" y="115" fill="#38bdf8" font-size="12" font-weight="bold">B</text><path d="M 120,40 Q 132,55 120,70 Q 148,70 156,55 Q 148,40 120,40 Z" fill="#18181b" stroke="#38bdf8" stroke-width="2"/><path d="M 115,40 Q 127,55 115,70" fill="none" stroke="#38bdf8" stroke-width="2"/><line x1="156" y1="55" x2="250" y2="55" stroke="#38bdf8" stroke-width="2.5"/><text x="260" y="59" fill="#38bdf8" font-size="12" font-weight="bold">Sum (S = A ⊕ B)</text><path d="M 120,95 L 138,95 A 15,15 0 0,1 138,125 L 120,125 Z" fill="#18181b" stroke="#10b981" stroke-width="2"/><line x1="153" y1="110" x2="250" y2="110" stroke="#10b981" stroke-width="2.5"/><text x="260" y="114" fill="#34d399" font-size="12" font-weight="bold">Carry (C = A · B)</text></svg>`,
      question: "In the Half Adder circuit above, what are the output states for Sum (S) and Carry (C) when inputs are A = 1 and B = 1?",
      options: [
        "Sum = 0, Carry = 1",
        "Sum = 1, Carry = 0",
        "Sum = 1, Carry = 1",
        "Sum = 0, Carry = 0"
      ],
      correctIndex: 0,
      explanation: "In a half adder with A=1, B=1:\n• Sum: S = A ⊕ B = 1 ⊕ 1 = 0\n• Carry: C = A · B = 1 · 1 = 1\nIn binary addition: 1 + 1 = 10_2 (which has sum 0 and carry 1)."
    },
    {
      id: "q-mid-c2",
      part: "part3",
      partTitle: "Part III: Combinational Circuits",
      type: "mcq",
      question: "How many Half Adders and OR gates are required to construct a complete Full Adder circuit?",
      options: [
        "Two Half Adders and One OR gate",
        "Two Half Adders and Two OR gates",
        "Three Half Adders and One AND gate",
        "One Half Adder and Two OR gates"
      ],
      correctIndex: 0,
      explanation: "A Full Adder can be constructed using exactly TWO Half Adders and ONE OR gate. Half Adder 1 adds A and B; Half Adder 2 adds the sum to Cin; the OR gate combines the two partial carries."
    },
    {
      id: "q-mid-c3",
      part: "part3",
      partTitle: "Part III: Combinational Circuits",
      type: "mcq",
      circuitSvg: `<svg viewBox="0 0 540 160" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="10" width="510" height="140" rx="12" fill="#090d16" stroke="#27272a"/><text x="35" y="35" fill="#a855f7" font-size="11" font-weight="bold">2-to-1 Multiplexer (MUX) Circuit</text><text x="35" y="60" fill="#38bdf8" font-size="11" font-mono>D0</text><text x="35" y="95" fill="#38bdf8" font-size="11" font-mono>D1</text><text x="35" y="130" fill="#f43f5e" font-size="11" font-mono>Select (S)</text><rect x="150" y="45" width="45" height="25" rx="4" fill="#18181b" stroke="#06b6d4"/><text x="172" y="62" fill="#06b6d4" font-size="9" text-anchor="middle">AND 1</text><rect x="150" y="85" width="45" height="25" rx="4" fill="#18181b" stroke="#06b6d4"/><text x="172" y="102" fill="#06b6d4" font-size="9" text-anchor="middle">AND 2</text><path d="M 260,60 Q 275,77 260,94 Q 290,94 300,77 Q 290,60 260,60 Z" fill="#18181b" stroke="#10b981" stroke-width="2"/><line x1="300" y1="77" x2="380" y2="77" stroke="#10b981" stroke-width="2.5"/><text x="390" y="81" fill="#34d399" font-size="13" font-weight="bold">Y</text></svg>`,
      question: "The combinational circuit above is a 2-to-1 Multiplexer (MUX). What is its Boolean expression for output Y?",
      options: [
        "Y = S' · D0 + S · D1",
        "Y = S · D0 + S' · D1",
        "Y = D0 ⊕ D1 ⊕ S",
        "Y = (D0 + S) · (D1 + S')"
      ],
      correctIndex: 0,
      explanation: "A 2-to-1 MUX selects data input D0 when select line S = 0 (enabled via inverter S'), and selects D1 when S = 1. Its canonical expression is Y = S'·D0 + S·D1."
    },
    {
      id: "q-mid-c4",
      part: "part3",
      partTitle: "Part III: Combinational Circuits",
      type: "mcq",
      question: "A combinational circuit has 3 cascaded logic gate levels with propagation delays of 8 ns, 12 ns, and 10 ns. What is the total propagation delay through the circuit?",
      options: [
        "30 ns",
        "12 ns",
        "10 ns",
        "20 ns"
      ],
      correctIndex: 0,
      explanation: "In a combinational logic circuit, the total propagation delay through a series of cascaded logic gates is the sum of the individual gate delays: 8 ns + 12 ns + 10 ns = 30 ns."
    },
    {
      id: "q-mid-c5",
      part: "part3",
      partTitle: "Part III: Combinational Circuits",
      type: "mcq",
      question: "Which digital combinational circuit detects whether two 1-bit binary numbers A and B are equal?",
      options: [
        "XNOR gate: Y = (A ⊕ B)'",
        "XOR gate: Y = A ⊕ B",
        "NAND gate: Y = (AB)'",
        "NOR gate: Y = (A + B)'"
      ],
      correctIndex: 0,
      explanation: "An XNOR gate is an equivalence comparator. It outputs HIGH (1) if and only if both inputs are equal (0,0 or 1,1): Y = AB + A'B' = (A ⊕ B)'."
    },

    // =========================================================================
    // MATCHING AND IDENTIFICATION QUESTIONS
    // =========================================================================
    {
      id: "q-mid-m1",
      part: "part2",
      partTitle: "Part II: NAND & NOR Gate Design",
      type: "matching",
      title: "Match each logic function to the number of 2-input NAND gates required to synthesize it",
      pairs: [
        { term: "NOT Gate", definition: "1 NAND Gate (inputs tied together)" },
        { term: "AND Gate", definition: "2 NAND Gates (NAND followed by inverter)" },
        { term: "OR Gate", definition: "3 NAND Gates (De Morgan inverted inputs)" },
        { term: "XOR Gate", definition: "4 NAND Gates (Cross-coupled network)" },
        { term: "XNOR Gate", definition: "5 NAND Gates" }
      ]
    },
    {
      id: "q-mid-m2",
      part: "part1",
      partTitle: "Part I: Simplify & Gate Diagram",
      type: "matching",
      title: "Match each Boolean algebraic law to its defining equation",
      pairs: [
        { term: "Identity Law", definition: "A + 0 = A  and  A · 1 = A" },
        { term: "Null Law", definition: "A + 1 = 1  and  A · 0 = 0" },
        { term: "Distributive Law (Dual)", definition: "A + (B · C) = (A + B) · (A + C)" },
        { term: "Absorption Law (Form 3)", definition: "A + A' · B = A + B" },
        { term: "Consensus Theorem", definition: "AB + A'C + BC = AB + A'C" }
      ]
    },
    {
      id: "q-mid-id1",
      part: "part3",
      partTitle: "Part III: Combinational Circuits",
      type: "id",
      question: "What digital arithmetic circuit adds two 1-bit numbers A and B and produces a Sum and Carry without a Carry-In input?",
      answer: "Half Adder",
      acceptableAnswers: ["Half Adder", "Half adder circuit"],
      hint: "S = A ⊕ B, C = AB",
      explanation: "A Half Adder adds two 1-bit inputs (A, B) producing Sum and Carry, but lacks a Carry-In (Cin) input."
    },
    {
      id: "q-mid-id2",
      part: "part3",
      partTitle: "Part III: Combinational Circuits",
      type: "id",
      question: "What digital circuit adds three 1-bit inputs (A, B, and Cin) to produce Sum and Carry Out?",
      answer: "Full Adder",
      acceptableAnswers: ["Full Adder", "Full adder circuit"],
      hint: "Has 3 inputs: A, B, and Cin",
      explanation: "A Full Adder takes three binary inputs (A, B, Cin) and computes Sum S = A ⊕ B ⊕ Cin and Carry Out Cout = AB + Cin(A ⊕ B)."
    }
  ]
};
