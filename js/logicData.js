// Logic Circuits & Digital Electronics Reviewer Dataset
// 100% Full English: Standard Gates, Combinational Logic Simplification, Boolean Algebra & 7400 ICs

window.logicData = {
  subjectId: "subj-logic",
  subjectName: "Logic Circuits",
  description: "Digital logic gates, truth tables, Boolean algebra laws, combinational circuit simplification, and 7400-series ICs.",
  
  flashcards: [
    {
      id: "fc-logic-1",
      front: "What is an AND gate, and what is its truth condition?",
      back: "An AND gate outputs HIGH (1) IF AND ONLY IF all of its inputs are HIGH (1).\n\nBoolean Expression: Y = A · B\nStandard IC: 7408 Quad 2-input AND",
      hint: "All inputs must be 1"
    },
    {
      id: "fc-logic-2",
      front: "What is an OR gate, and what is its truth condition?",
      back: "An OR gate outputs HIGH (1) if at least one of its inputs is HIGH (1). It outputs LOW (0) only when all inputs are 0.\n\nBoolean Expression: Y = A + B\nStandard IC: 7432 Quad 2-input OR",
      hint: "At least one input is 1"
    },
    {
      id: "fc-logic-3",
      front: "Why are NAND and NOR gates called Universal Gates?",
      back: "A Universal Gate can be used to construct all other fundamental logic functions (NOT, AND, OR, XOR, XNOR) without requiring any other gate type.\n\n7400 = Quad 2-input NAND\n7402 = Quad 2-input NOR",
      hint: "Can build any logic function"
    },
    {
      id: "fc-logic-4",
      front: "State De Morgan's First and Second Laws.",
      back: "1. (A · B)' = A' + B'\nThe complement of a product equals the sum of the complements (NAND = Negative-OR).\n\n2. (A + B)' = A' · B'\nThe complement of a sum equals the product of the complements (NOR = Negative-AND).",
      hint: "Break the line, change the sign"
    },
    {
      id: "fc-logic-5",
      front: "What is the Boolean function of an Exclusive-OR (XOR) gate?",
      back: "An XOR gate outputs HIGH (1) when its inputs are DIFFERENT (odd parity).\n\nBoolean Expression:\nY = A ⊕ B = A'B + AB'\n\nStandard IC: 7486 Quad 2-input XOR",
      hint: "Different inputs = 1"
    },
    {
      id: "fc-logic-6",
      front: "What is the Absorption Law in Boolean Algebra?",
      back: "1. A + A·B = A\nProof: A(1 + B) = A(1) = A\n\n2. A · (A + B) = A\nProof: A·A + A·B = A + A·B = A\n\n3. A + A'·B = A + B",
      hint: "Reduces redundant terms"
    },
    {
      id: "fc-logic-7",
      front: "What is the difference between a Half Adder and a Full Adder?",
      back: "• Half Adder: Adds two 1-bit inputs (A, B). Produces Sum (S = A ⊕ B) and Carry Out (C = A·B). Has NO Carry-In.\n\n• Full Adder: Adds three 1-bit inputs (A, B, Cin). Produces Sum (S = A ⊕ B ⊕ Cin) and Carry Out (Cout = A·B + Cin·(A ⊕ B)).",
      hint: "Carry-in input capability"
    },
    {
      id: "fc-logic-8",
      front: "What is the duality principle in Boolean Algebra?",
      back: "Any valid Boolean equation remains valid if:\n1. All AND (·) operations are swapped with OR (+) operations.\n2. All OR (+) operations are swapped with AND (·) operations.\n3. All 0s and 1s are interchanged.\nVariables remain uncomplemented.",
      hint: "Swap AND with OR, 0 with 1"
    }
  ],

  questions: [
    // -------------------------------------------------------------------------
    // COMBINATIONAL LOGIC CIRCUIT SIMPLIFICATION QUESTIONS (WITH SVG DIAGRAMS)
    // -------------------------------------------------------------------------
    {
      id: "q-logic-c1",
      type: "mcq",
      circuitSvg: `
        <svg viewBox="0 0 540 160" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg">
          <!-- Inputs A and B -->
          <text x="20" y="45" fill="#38bdf8" font-size="12" font-weight="bold">A</text>
          <text x="20" y="115" fill="#38bdf8" font-size="12" font-weight="bold">B</text>
          
          <!-- Wire A branching to AND1 and AND2 -->
          <line x1="35" y1="40" x2="160" y2="40" stroke="#38bdf8" stroke-width="2"/>
          <line x1="60" y1="40" x2="60" y2="95" stroke="#38bdf8" stroke-width="2"/>
          <circle cx="60" cy="40" r="3" fill="#38bdf8"/>
          <line x1="60" y1="95" x2="160" y2="95" stroke="#38bdf8" stroke-width="2"/>

          <!-- Wire B branching to AND1 and Inverter for AND2 -->
          <line x1="35" y1="110" x2="90" y2="110" stroke="#38bdf8" stroke-width="2"/>
          <line x1="80" y1="110" x2="80" y2="55" stroke="#38bdf8" stroke-width="2"/>
          <circle cx="80" cy="110" r="3" fill="#38bdf8"/>
          <line x1="80" y1="55" x2="160" y2="55" stroke="#38bdf8" stroke-width="2"/>

          <!-- NOT Gate on B input for AND2 -->
          <polygon points="90,105 90,125 110,115" fill="#18181b" stroke="#f43f5e" stroke-width="2"/>
          <circle cx="114" cy="115" r="3" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/>
          <line x1="117" y1="115" x2="160" y2="115" stroke="#38bdf8" stroke-width="2"/>

          <!-- AND Gate 1 (top: A and B) -->
          <path d="M 160,32 L 180,32 A 18,18 0 0,1 180,68 L 160,68 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/>
          <line x1="198" y1="50" x2="270" y2="50" stroke="#06b6d4" stroke-width="2"/>
          <text x="210" y="44" fill="#a1a1aa" font-size="9" font-mono>A·B</text>

          <!-- AND Gate 2 (bottom: A and B') -->
          <path d="M 160,87 L 180,87 A 18,18 0 0,1 180,123 L 160,123 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/>
          <line x1="198" y1="105" x2="270" y2="105" stroke="#06b6d4" stroke-width="2"/>
          <text x="210" y="120" fill="#a1a1aa" font-size="9" font-mono>A·B'</text>

          <!-- Connecting to OR Gate -->
          <line x1="270" y1="50" x2="310" y2="68" stroke="#06b6d4" stroke-width="2"/>
          <line x1="270" y1="105" x2="310" y2="86" stroke="#06b6d4" stroke-width="2"/>

          <!-- OR Gate -->
          <path d="M 305,60 Q 320,77 305,94 Q 335,94 345,77 Q 335,60 305,60 Z" fill="#090d16" stroke="#10b981" stroke-width="2"/>
          <line x1="345" y1="77" x2="420" y2="77" stroke="#10b981" stroke-width="2.5"/>
          <circle cx="420" cy="77" r="4" fill="#10b981"/>
          <text x="430" y="81" fill="#34d399" font-size="14" font-weight="900">Y</text>
        </svg>
      `,
      question: "Examine the combinational circuit diagram above. What is the simplified minimal Boolean expression for the output Y?",
      options: [
        "Y = A",
        "Y = B",
        "Y = A ⊕ B",
        "Y = A + B"
      ],
      correctIndex: 0,
      explanation: "Step-by-step circuit simplification:\n1. Top AND gate produces: T1 = A · B\n2. Bottom AND gate produces: T2 = A · B'\n3. OR gate combines them: Y = T1 + T2 = A·B + A·B'\n4. Factor out A (Distributive Law): Y = A · (B + B')\n5. Complement Law (B + B' = 1): Y = A · (1) = A\nThe entire 3-gate circuit simplifies down to a single wire: Y = A."
    },
    {
      id: "q-logic-c2",
      type: "mcq",
      circuitSvg: `
        <svg viewBox="0 0 540 160" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg">
          <!-- Inputs A and B -->
          <text x="20" y="45" fill="#38bdf8" font-size="12" font-weight="bold">A</text>
          <text x="20" y="115" fill="#38bdf8" font-size="12" font-weight="bold">B</text>
          
          <line x1="35" y1="40" x2="80" y2="40" stroke="#38bdf8" stroke-width="2"/>
          <line x1="60" y1="40" x2="60" y2="105" stroke="#38bdf8" stroke-width="2"/>
          <circle cx="60" cy="40" r="3" fill="#38bdf8"/>
          <line x1="60" y1="105" x2="160" y2="105" stroke="#38bdf8" stroke-width="2"/>

          <!-- Inverter on A for OR1 -->
          <polygon points="80,30 80,50 100,40" fill="#18181b" stroke="#f43f5e" stroke-width="2"/>
          <circle cx="104" cy="40" r="3" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/>
          <line x1="107" y1="40" x2="160" y2="40" stroke="#38bdf8" stroke-width="2"/>

          <!-- Wire B -->
          <line x1="35" y1="110" x2="160" y2="110" stroke="#38bdf8" stroke-width="2"/>
          <line x1="85" y1="110" x2="85" y2="55" stroke="#38bdf8" stroke-width="2"/>
          <circle cx="85" cy="110" r="3" fill="#38bdf8"/>
          <line x1="85" y1="55" x2="160" y2="55" stroke="#38bdf8" stroke-width="2"/>

          <!-- OR Gate 1 (top: A' + B) -->
          <path d="M 160,35 Q 175,48 160,60 Q 190,60 200,48 Q 190,35 160,35 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/>
          <line x1="200" y1="48" x2="270" y2="48" stroke="#06b6d4" stroke-width="2"/>
          <text x="210" y="42" fill="#a1a1aa" font-size="9" font-mono>A' + B</text>

          <!-- OR Gate 2 (bottom: A + B) -->
          <path d="M 160,95 Q 175,108 160,120 Q 190,120 200,108 Q 190,95 160,95 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/>
          <line x1="200" y1="108" x2="270" y2="108" stroke="#06b6d4" stroke-width="2"/>
          <text x="210" y="125" fill="#a1a1aa" font-size="9" font-mono>A + B</text>

          <!-- AND Gate output -->
          <line x1="270" y1="48" x2="310" y2="68" stroke="#06b6d4" stroke-width="2"/>
          <line x1="270" y1="108" x2="310" y2="86" stroke="#06b6d4" stroke-width="2"/>
          <path d="M 310,60 L 330,60 A 17,17 0 0,1 330,94 L 310,94 Z" fill="#090d16" stroke="#10b981" stroke-width="2"/>
          <line x1="347" y1="77" x2="420" y2="77" stroke="#10b981" stroke-width="2.5"/>
          <circle cx="420" cy="77" r="4" fill="#10b981"/>
          <text x="430" y="81" fill="#34d399" font-size="14" font-weight="900">Y</text>
        </svg>
      `,
      question: "In the dual OR-gate circuit feeding an AND gate above, what is the simplified output expression for Y?",
      options: [
        "Y = B",
        "Y = A",
        "Y = A' · B",
        "Y = A + B"
      ],
      correctIndex: 0,
      explanation: "Step-by-step simplification using Boolean algebra:\n1. Top OR gate produces: T1 = (A' + B)\n2. Bottom OR gate produces: T2 = (A + B)\n3. The AND gate output: Y = (A' + B)(A + B)\n4. Expand or apply Distributive Law over OR: Y = B + (A' · A)\n5. Since A' · A = 0: Y = B + 0 = B.\nThe circuit simplifies to the single input B."
    },
    {
      id: "q-logic-c3",
      type: "mcq",
      circuitSvg: `
        <svg viewBox="0 0 540 150" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg">
          <!-- Two inverters into a NAND gate -->
          <text x="20" y="45" fill="#38bdf8" font-size="12" font-weight="bold">A</text>
          <text x="20" y="105" fill="#38bdf8" font-size="12" font-weight="bold">B</text>

          <line x1="35" y1="40" x2="80" y2="40" stroke="#38bdf8" stroke-width="2"/>
          <polygon points="80,30 80,50 100,40" fill="#18181b" stroke="#f43f5e" stroke-width="2"/>
          <circle cx="104" cy="40" r="3" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/>
          <line x1="107" y1="40" x2="200" y2="40" stroke="#38bdf8" stroke-width="2"/>

          <line x1="35" y1="100" x2="80" y2="100" stroke="#38bdf8" stroke-width="2"/>
          <polygon points="80,90 80,110 100,100" fill="#18181b" stroke="#f43f5e" stroke-width="2"/>
          <circle cx="104" cy="100" r="3" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/>
          <line x1="107" y1="100" x2="200" y2="100" stroke="#38bdf8" stroke-width="2"/>

          <!-- NAND Gate -->
          <path d="M 200,30 L 225,30 A 25,25 0 0,1 225,110 L 200,110 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/>
          <circle cx="254" cy="70" r="4" fill="#090d16" stroke="#06b6d4" stroke-width="2"/>
          <line x1="258" y1="70" x2="360" y2="70" stroke="#10b981" stroke-width="2.5"/>
          <circle cx="360" cy="70" r="4" fill="#10b981"/>
          <text x="370" y="74" fill="#34d399" font-size="14" font-weight="900">Y</text>
        </svg>
      `,
      question: "The circuit above feeds inverted inputs A' and B' into a NAND gate. According to De Morgan's Law, what single standard gate is this equivalent to?",
      options: [
        "OR gate (Y = A + B)",
        "AND gate (Y = A · B)",
        "NOR gate (Y = (A + B)')",
        "XOR gate (Y = A ⊕ B)"
      ],
      correctIndex: 0,
      explanation: "By De Morgan's Law:\n1. The inputs to the NAND gate are A' and B'.\n2. The NAND operation performs: Y = (A' · B')'\n3. By De Morgan's first theorem: (X · Y)' = X' + Y'\n4. Substituting: Y = (A')' + (B')' = A + B.\nThis circuit is the exact De Morgan equivalent of a standard OR gate (Negative-NAND = OR)."
    },
    {
      id: "q-logic-c4",
      type: "mcq",
      circuitSvg: `
        <svg viewBox="0 0 540 150" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg">
          <!-- Absorption Circuit: A feeding directly to OR, and A+B into AND -->
          <text x="20" y="45" fill="#38bdf8" font-size="12" font-weight="bold">A</text>
          <text x="20" y="105" fill="#38bdf8" font-size="12" font-weight="bold">B</text>

          <line x1="35" y1="40" x2="130" y2="40" stroke="#38bdf8" stroke-width="2"/>
          <line x1="60" y1="40" x2="60" y2="120" stroke="#38bdf8" stroke-width="2"/>
          <circle cx="60" cy="40" r="3" fill="#38bdf8"/>
          <line x1="60" y1="120" x2="260" y2="120" stroke="#38bdf8" stroke-width="2"/>

          <line x1="35" y1="100" x2="130" y2="100" stroke="#38bdf8" stroke-width="2"/>

          <!-- AND gate for A and B -->
          <path d="M 130,30 L 155,30 A 25,25 0 0,1 155,110 L 130,110 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/>
          <line x1="180" y1="70" x2="260" y2="70" stroke="#06b6d4" stroke-width="2"/>
          <text x="190" y="65" fill="#a1a1aa" font-size="9" font-mono>A·B</text>

          <!-- OR Gate combining A and (A·B) -->
          <line x1="260" y1="70" x2="300" y2="85" stroke="#06b6d4" stroke-width="2"/>
          <line x1="260" y1="120" x2="300" y2="105" stroke="#38bdf8" stroke-width="2"/>
          <path d="M 295,78 Q 310,95 295,112 Q 330,112 340,95 Q 330,78 295,78 Z" fill="#090d16" stroke="#10b981" stroke-width="2"/>
          <line x1="340" y1="95" x2="420" y2="95" stroke="#10b981" stroke-width="2.5"/>
          <circle cx="420" cy="95" r="4" fill="#10b981"/>
          <text x="430" y="99" fill="#34d399" font-size="14" font-weight="900">Y</text>
        </svg>
      `,
      question: "The circuit above implements Y = A + (A · B). Using the Absorption Law of Boolean algebra, what is the simplified output?",
      options: [
        "Y = A",
        "Y = B",
        "Y = A + B",
        "Y = 1"
      ],
      correctIndex: 0,
      explanation: "Absorption Law derivation:\n1. Expression from circuit: Y = A + (A · B)\n2. Factor out A: Y = A · (1 + B)\n3. Since 1 + B = 1 for any value of B (Null element):\n4. Y = A · (1) = A.\nThe term (A · B) is completely absorbed by A, proving the AND gate is redundant!"
    },
    {
      id: "q-logic-c5",
      type: "mcq",
      circuitSvg: `
        <svg viewBox="0 0 540 170" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg">
          <!-- XOR implementation using 4 NAND gates -->
          <rect x="10" y="10" width="520" height="150" rx="12" fill="#090d16" stroke="#27272a"/>
          <text x="30" y="35" fill="#a855f7" font-size="11" font-weight="bold">4-NAND Gate Network</text>
          
          <text x="30" y="70" fill="#38bdf8" font-size="12" font-weight="bold">A</text>
          <text x="30" y="120" fill="#38bdf8" font-size="12" font-weight="bold">B</text>

          <!-- Gate 1 (Input NAND) -->
          <rect x="80" y="65" width="55" height="36" rx="6" fill="#18181b" stroke="#06b6d4" stroke-width="1.5"/>
          <text x="107" y="87" fill="#06b6d4" font-size="10" font-weight="bold" text-anchor="middle">NAND 1</text>

          <!-- Gate 2 & Gate 3 -->
          <rect x="210" y="40" width="55" height="36" rx="6" fill="#18181b" stroke="#06b6d4" stroke-width="1.5"/>
          <text x="237" y="62" fill="#06b6d4" font-size="10" font-weight="bold" text-anchor="middle">NAND 2</text>

          <rect x="210" y="95" width="55" height="36" rx="6" fill="#18181b" stroke="#06b6d4" stroke-width="1.5"/>
          <text x="237" y="117" fill="#06b6d4" font-size="10" font-weight="bold" text-anchor="middle">NAND 3</text>

          <!-- Gate 4 (Output NAND) -->
          <rect x="340" y="68" width="55" height="36" rx="6" fill="#18181b" stroke="#10b981" stroke-width="2"/>
          <text x="367" y="90" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">NAND 4</text>

          <line x1="395" y1="86" x2="470" y2="86" stroke="#10b981" stroke-width="2.5"/>
          <circle cx="470" cy="86" r="4" fill="#10b981"/>
          <text x="480" y="90" fill="#34d399" font-size="13" font-weight="900">Y</text>
        </svg>
      `,
      question: "The standard 4-NAND gate network shown above is widely used in digital IC design. What fundamental logic operation does it synthesize?",
      options: [
        "Exclusive-OR (XOR): Y = A ⊕ B",
        "Exclusive-NOR (XNOR): Y = (A ⊕ B)'",
        "Full Adder Carry Out",
        "Multiplexer Selector"
      ],
      correctIndex: 0,
      explanation: "A standard 4-NAND gate circuit synthesizes an XOR gate (Y = A ⊕ B = A'B + AB'):\n1. NAND 1 produces: (AB)'\n2. NAND 2 receives A and (AB)', producing: [A · (AB)']' = A' + AB = A' + B\n3. NAND 3 receives B and (AB)', producing: [B · (AB)']' = B' + AB = B' + A\n4. NAND 4 combines them: [(A' + B)(B' + A)]' = A'B + AB' = A ⊕ B."
    },

    // -------------------------------------------------------------------------
    // CORE LOGIC GATES & BOOLEAN THEOREMS (MCQ)
    // -------------------------------------------------------------------------
    {
      id: "q-logic-1",
      type: "mcq",
      question: "Which of the following logic gates produces a LOW (0) output only when both inputs are HIGH (1)?",
      options: [
        "NAND gate",
        "NOR gate",
        "AND gate",
        "XOR gate"
      ],
      correctIndex: 0,
      explanation: "A NAND gate is an inverted AND gate. Its truth table output is 1 for (0,0), (0,1), and (1,0), and produces 0 only when both inputs are 1."
    },
    {
      id: "q-logic-2",
      type: "mcq",
      question: "What is the output of a 2-input XOR gate when both inputs are HIGH (A = 1, B = 1)?",
      options: [
        "0 (LOW)",
        "1 (HIGH)",
        "High-Impedance (Z)",
        "Indeterminate"
      ],
      correctIndex: 0,
      explanation: "An XOR (Exclusive-OR) gate outputs 1 only when the inputs are strictly different (0,1 or 1,0). When both inputs are equal (1,1 or 0,0), the output is 0."
    },
    {
      id: "q-logic-3",
      type: "mcq",
      question: "Which 7400-series TTL IC contains four 2-input NAND gates?",
      options: [
        "7400",
        "7402",
        "7408",
        "7432"
      ],
      correctIndex: 0,
      explanation: "The 7400 IC is the classic Quad 2-input NAND gate chip. 7402 is Quad NOR, 7408 is Quad AND, and 7432 is Quad OR."
    },
    {
      id: "q-logic-4",
      type: "mcq",
      question: "According to Boolean Algebra, what does the expression A + A' simplify to?",
      options: [
        "1",
        "0",
        "A",
        "A'"
      ],
      correctIndex: 0,
      explanation: "By the Complement Law of Boolean Algebra, A + A' = 1. Since either A or A' must always be 1, their logical sum is always HIGH."
    },
    {
      id: "q-logic-5",
      type: "mcq",
      question: "How many minterms are possible for a Boolean function with 4 input variables?",
      options: [
        "16",
        "8",
        "32",
        "4"
      ],
      correctIndex: 0,
      explanation: "For n input variables, the number of possible input combinations (and minterms) is 2^n. For 4 variables, 2^4 = 16 minterms (m0 to m15)."
    },
    {
      id: "q-logic-6",
      type: "mcq",
      question: "What is the primary purpose of grouping adjacent 1s in a Karnaugh Map (K-Map)?",
      options: [
        "To eliminate variables that change state and obtain minimal SOP expressions",
        "To invert the phase of the digital clock",
        "To increase the propagation delay through the gates",
        "To convert binary into two's complement"
      ],
      correctIndex: 0,
      explanation: "Grouping adjacent powers-of-two (1, 2, 4, 8, 16) cells in a K-map simplifies Boolean expressions by eliminating variables whose complementary values appear in the group."
    },
    {
      id: "q-logic-7",
      type: "mcq",
      question: "What is the Boolean expression for the Carry Out of a Half Adder?",
      options: [
        "C = A · B",
        "C = A + B",
        "C = A ⊕ B",
        "C = (A · B)'"
      ],
      correctIndex: 0,
      explanation: "In a half adder, the Carry occurs only when both bits A and B are 1 (1 + 1 = 10 in binary). Therefore, Carry Out C = A · B."
    },
    {
      id: "q-logic-8",
      type: "mcq",
      question: "What is the propagation delay of a logic gate?",
      options: [
        "The time required for an output signal to respond to a change at the input",
        "The voltage drop across the pull-up resistor",
        "The frequency of the master system clock",
        "The current drawn when all outputs are in high-Z state"
      ],
      correctIndex: 0,
      explanation: "Propagation delay (tpd) is the time elapsed between the transition of an input signal (usually measured at 50% amplitude) and the corresponding transition of the output."
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

    // -------------------------------------------------------------------------
    // MATCHING TYPE QUESTION
    // -------------------------------------------------------------------------
    {
      id: "q-logic-m1",
      type: "matching",
      title: "Match each 7400-Series Digital IC to its internal gate configuration",
      pairs: [
        { term: "7400", definition: "Quad 2-Input NAND Gates" },
        { term: "7402", definition: "Quad 2-Input NOR Gates" },
        { term: "7404", definition: "Hex Inverters (NOT Gates)" },
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
        { term: "Commutative Law", definition: "A + B = B + A  and  A · B = B · A" },
        { term: "Idempotent Law", definition: "A + A = A  and  A · A = A" },
        { term: "Complement Law", definition: "A + A' = 1  and  A · A' = 0" },
        { term: "De Morgan's First Law", definition: "(A · B)' = A' + B'" },
        { term: "Absorption Law", definition: "A + A · B = A" }
      ]
    }
  ]
};
