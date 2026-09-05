// Data for Mixed Signals and Sensors (FMSS) - 100% Full English
window.FMSS_SUBJECT = {
  "id": "subj-fmss",
  "name": "Mixed Signals",
  "description": "Comprehensive engineering reviewer covering operational amplifier circuit analysis, resistor computations, 741 IC architecture, sensor signal conditioning, and datapath communication.",
  "questions": [
    {
      "id": "fmss-mcq-p1-gain",
      "type": "mcq",
      "question": "[Computation] An inverting amplifier has:\n\u2022 Rin = 10 k\u03a9\n\u2022 Rf = 50 k\u03a9\n\u2022 Vin = 0.2 V\n\nCalculate the Voltage Gain (Av):",
      "options": [
        "Av = -5.0",
        "Av = +5.0",
        "Av = -0.2",
        "Av = -50.0"
      ],
      "correctIndex": 0,
      "explanation": "Formula for Inverting Amplifier: Av = - (Rf / Rin) = - (50 k\u03a9 / 10 k\u03a9) = -5.0. The negative sign indicates a 180\u00b0 phase inversion."
    },
    {
      "id": "fmss-mcq-p1-vout",
      "type": "mcq",
      "question": "[Computation] An inverting amplifier has:\n\u2022 Rin = 10 k\u03a9\n\u2022 Rf = 50 k\u03a9\n\u2022 Vin = 0.2 V\n\nCalculate the Output Voltage (Vout):",
      "options": [
        "+1.0 V",
        "-1.0 V",
        "-0.04 V",
        "+10.0 V"
      ],
      "correctIndex": 1,
      "explanation": "Vout = Av * Vin = - (Rf / Rin) * Vin = - (50k / 10k) * 0.2 V = -5 * 0.2 V = -1.0 V."
    },
    {
      "id": "fmss-mcq-p1-rf",
      "type": "mcq",
      "question": "[Resistor Computation] An inverting amplifier circuit requires a voltage gain of Av = -5. If the input resistor is Rin = 10 k\u03a9, calculate the required feedback resistor (Rf):",
      "options": [
        "Rf = 2 k\u03a9",
        "Rf = 50 k\u03a9",
        "Rf = 10 k\u03a9",
        "Rf = 100 k\u03a9"
      ],
      "correctIndex": 1,
      "explanation": "From |Av| = Rf / Rin: Rf = |Av| * Rin = 5 * 10 k\u03a9 = 50 k\u03a9."
    },
    {
      "id": "fmss-mcq-p1-rin",
      "type": "mcq",
      "question": "[Resistor Computation] You are designing an inverting amplifier with Rf = 50 k\u03a9 to achieve a voltage gain of Av = -10. Calculate the required input resistor (Rin):",
      "options": [
        "Rin = 5 k\u03a9",
        "Rin = 10 k\u03a9",
        "Rin = 500 k\u03a9",
        "Rin = 2.5 k\u03a9"
      ],
      "correctIndex": 0,
      "explanation": "Rin = Rf / |Av| = 50 k\u03a9 / 10 = 5 k\u03a9."
    },
    {
      "id": "fmss-mcq-p5-gain",
      "type": "mcq",
      "question": "[Computation] A non-inverting amplifier has:\n\u2022 Rf = 90 k\u03a9\n\u2022 R1 = 10 k\u03a9\n\u2022 Vin = 0.2 V\n\nCalculate the Voltage Gain (Av):",
      "options": [
        "Av = 9.0",
        "Av = 10.0",
        "Av = -9.0",
        "Av = 1.0"
      ],
      "correctIndex": 1,
      "explanation": "Formula for Non-Inverting Amplifier: Av = 1 + (Rf / R1) = 1 + (90 k\u03a9 / 10 k\u03a9) = 1 + 9 = 10.0. The output is in-phase (no negative sign)."
    },
    {
      "id": "fmss-mcq-p5-vout",
      "type": "mcq",
      "question": "[Computation] A non-inverting amplifier has:\n\u2022 Rf = 90 k\u03a9\n\u2022 R1 = 10 k\u03a9\n\u2022 Vin = 0.2 V\n\nCalculate the Output Voltage (Vout):",
      "options": [
        "+1.8 V",
        "+2.0 V",
        "-2.0 V",
        "+0.9 V"
      ],
      "correctIndex": 1,
      "explanation": "Vout = Av * Vin = [1 + (Rf / R1)] * Vin = [1 + (90k / 10k)] * 0.2 V = 10 * 0.2 V = +2.0 V."
    },
    {
      "id": "fmss-mcq-p5-rf",
      "type": "mcq",
      "question": "[Resistor Computation] A non-inverting amplifier requires a closed-loop gain of Av = 10. If the ground resistor is R1 = 10 k\u03a9, calculate the required feedback resistor (Rf):",
      "options": [
        "Rf = 90 k\u03a9",
        "Rf = 100 k\u03a9",
        "Rf = 10 k\u03a9",
        "Rf = 9 k\u03a9"
      ],
      "correctIndex": 0,
      "explanation": "From Av = 1 + (Rf / R1): Rf = (Av - 1) * R1 = (10 - 1) * 10 k\u03a9 = 9 * 10 k\u03a9 = 90 k\u03a9."
    },
    {
      "id": "fmss-mcq-p5-r1",
      "type": "mcq",
      "question": "[Resistor Computation] A non-inverting amplifier has feedback resistor Rf = 90 k\u03a9 and needs a voltage gain of Av = 19. Calculate the required resistor R1:",
      "options": [
        "R1 = 5 k\u03a9",
        "R1 = 10 k\u03a9",
        "R1 = 4.74 k\u03a9",
        "R1 = 20 k\u03a9"
      ],
      "correctIndex": 0,
      "explanation": "R1 = Rf / (Av - 1) = 90 k\u03a9 / (19 - 1) = 90 k\u03a9 / 18 = 5 k\u03a9."
    },
    {
      "id": "fmss-mcq-c1",
      "type": "mcq",
      "question": "[Resistor Computation] An inverting amplifier has Rin = 4.7 k\u03a9 and needs to amplify a sensor signal by a factor of -20. What feedback resistor Rf should be selected?",
      "options": [
        "Rf = 94 k\u03a9",
        "Rf = 47 k\u03a9",
        "Rf = 23.5 k\u03a9",
        "Rf = 9.4 k\u03a9"
      ],
      "correctIndex": 0,
      "explanation": "Rf = |Av| * Rin = 20 * 4.7 k\u03a9 = 94 k\u03a9."
    },
    {
      "id": "fmss-mcq-c2",
      "type": "mcq",
      "question": "[Resistor Computation] A non-inverting amplifier has R1 = 2.2 k\u03a9 and requires a closed-loop voltage gain of Av = 25. What is the required value of Rf?",
      "options": [
        "Rf = 52.8 k\u03a9",
        "Rf = 55.0 k\u03a9",
        "Rf = 24.0 k\u03a9",
        "Rf = 100 k\u03a9"
      ],
      "correctIndex": 0,
      "explanation": "Rf = (Av - 1) * R1 = (25 - 1) * 2.2 k\u03a9 = 24 * 2.2 k\u03a9 = 52.8 k\u03a9."
    },
    {
      "id": "fmss-mcq-c3",
      "type": "mcq",
      "question": "[Computation - Saturation] An inverting amplifier with Av = -10 is powered by \u00b115V supply rails (saturation voltage Vsat = \u00b114V). If the input is Vin = +2.0 V, what is the actual output Vout?",
      "options": [
        "-20.0 V",
        "-14.0 V (Clipped / Saturated)",
        "+14.0 V",
        "0.0 V"
      ],
      "correctIndex": 1,
      "explanation": "Theoretical Vout = -10 * 2.0 V = -20 V. However, the op-amp output cannot exceed its supply rail limits, so it is clamped to the negative saturation level of -14.0 V."
    },
    {
      "id": "fmss-mcq-c4",
      "type": "mcq",
      "question": "[Computation - Buffer] What is the closed-loop voltage gain (Av) and output voltage (Vout) of a Voltage Follower (Buffer) with Rf = 0 \u03a9 when Vin = 3.3 V?",
      "options": [
        "Av = 1.0, Vout = 3.3 V",
        "Av = 0, Vout = 0 V",
        "Av = \u221e, Vout = 14 V",
        "Av = -1.0, Vout = -3.3 V"
      ],
      "correctIndex": 0,
      "explanation": "In a voltage follower, the output is directly connected to the inverting input (Rf = 0). Therefore, Av = 1 and Vout = Vin = 3.3 V."
    },
    {
      "id": "fmss-mcq-c5",
      "type": "mcq",
      "question": "[Computation - Summing Amp] An inverting summing amplifier has Rf = 20 k\u03a9, R1 = 10 k\u03a9, and R2 = 10 k\u03a9. If input voltages are V1 = 0.5 V and V2 = 1.0 V, calculate Vout:",
      "options": [
        "-3.0 V",
        "+3.0 V",
        "-1.5 V",
        "-6.0 V"
      ],
      "correctIndex": 0,
      "explanation": "Vout = -Rf * (V1/R1 + V2/R2) = -20k * (0.5V/10k + 1.0V/10k) = -20k * (0.05m + 0.10m) = -20k * 0.15m = -3.0 V."
    },
    {
      "id": "fmss-mcq-c6",
      "type": "mcq",
      "question": "[Computation - Slew Rate] An op-amp has a Slew Rate of SR = 0.5 V/\u00b5s. How long does it take for the output to swing from -10 V to +10 V?",
      "options": [
        "20 \u00b5s",
        "40 \u00b5s",
        "10 \u00b5s",
        "80 \u00b5s"
      ],
      "correctIndex": 1,
      "explanation": "\u0394V = (+10 V) - (-10 V) = 20 V. Time \u0394t = \u0394V / SR = 20 V / (0.5 V/\u00b5s) = 40 microseconds."
    },
    {
      "id": "fmss-mcq-c7",
      "type": "mcq",
      "question": "[Computation - Ultrasonic Distance] An ultrasonic sensor detects an echo return time of t = 6 ms (0.006 s). Given the speed of sound is 340 m/s, calculate the distance to the target:",
      "options": [
        "1.02 meters",
        "2.04 meters",
        "0.51 meters",
        "3.40 meters"
      ],
      "correctIndex": 0,
      "explanation": "Distance = (Speed of Sound * Time) / 2 = (340 m/s * 0.006 s) / 2 = 2.04 m / 2 = 1.02 meters (102 cm)."
    },
    {
      "id": "fmss-mcq-c8",
      "type": "mcq",
      "question": "[Computation - Decibel Gain] An amplifier circuit has a linear voltage gain of Av = 200. What is its voltage gain expressed in decibels (dB)?",
      "options": [
        "46.02 dB",
        "23.01 dB",
        "40.00 dB",
        "60.00 dB"
      ],
      "correctIndex": 0,
      "explanation": "Av(dB) = 20 * log10(Av) = 20 * log10(200) = 20 * 2.30103 \u2248 46.02 dB."
    },
    {
      "id": "fmss-mcq-c9",
      "type": "mcq",
      "question": "[Computation - ADC Resolution] A 10-bit Analog-to-Digital Converter (ADC) operates with a reference voltage of Vref = 5.0 V. Calculate the voltage represented by 1 Least Significant Bit (LSB):",
      "options": [
        "4.88 mV",
        "9.76 mV",
        "1.22 mV",
        "2.44 mV"
      ],
      "correctIndex": 0,
      "explanation": "LSB Step Size = Vref / 2^n = 5.0 V / 1024 = 0.0048828 V \u2248 4.88 mV."
    },
    {
      "id": "fmss-mcq-c10",
      "type": "mcq",
      "question": "[Computation - Temperature Sensor] An LM35 precision temperature sensor outputs 10 mV/\u00b0C. If the op-amp circuit measures an output of 420 mV, what is the temperature?",
      "options": [
        "42.0 \u00b0C",
        "4.20 \u00b0C",
        "84.0 \u00b0C",
        "21.0 \u00b0C"
      ],
      "correctIndex": 0,
      "explanation": "Temperature = Vout / (10 mV/\u00b0C) = 420 mV / (10 mV/\u00b0C) = 42.0 \u00b0C."
    },
    {
      "id": "fmss-mcq-th1",
      "type": "mcq",
      "question": "What is the primary definition and role of an Amplifier in Fundamentals of Mixed Signals and Sensors (FMSS)?",
      "options": [
        "A device that converts digital packets to radio frequencies",
        "A circuit that takes a weak electrical signal from a sensor or mixed-signal source and increases its voltage, current, or power for effective processing",
        "A passive network that filters out AC ripple without changing amplitude",
        "A permanent storage device for analog waveforms"
      ],
      "correctIndex": 1,
      "explanation": "An amplifier boosts small electrical signals (often in the microvolt or millivolt range) produced by sensors into usable voltage levels for analog-to-digital converters (ADCs) or controllers."
    },
    {
      "id": "fmss-mcq-th2",
      "type": "mcq",
      "question": "Which of the following represents the correct signal chain architecture in FMSS systems?",
      "options": [
        "Processing Circuits \u2192 Amplifiers \u2192 Sensor \u2192 Stimuli \u2192 Output Signal",
        "Input Signal (Stimuli) \u2192 Sensor (Inducers) \u2192 Output Signal (AC/DC) \u2192 Amplifiers \u2192 Processing Circuits",
        "Amplifiers \u2192 Sensor \u2192 Stimuli \u2192 Digitizer \u2192 Input Signal",
        "Sensor \u2192 Processing Circuits \u2192 Output Signal \u2192 Stimuli \u2192 Amplifiers"
      ],
      "correctIndex": 1,
      "explanation": "Physical stimuli stimulate the sensor (inducer), which outputs a weak AC or DC signal, followed by signal conditioning amplifiers, and finally processing circuits (ADC/microcontroller)."
    },
    {
      "id": "fmss-mcq-th3",
      "type": "mcq",
      "question": "What distinguishes Linear Electronics from Digital Electronics?",
      "options": [
        "Digital electronics represents continuous physical variables, while linear electronics uses discrete digits",
        "Digital electronics represents varying physical quantities by discrete signals (binary numbers), while Linear electronics represents signals as continuous analog variables whose output varies directly with input",
        "Both fields deal exclusively with binary logic gates",
        "Linear electronics uses only mechanical switches and relays"
      ],
      "correctIndex": 1,
      "explanation": "In Linear Electronics, circuits operate on continuous analog variables where output varies directly with input changes (such as amplification). In Digital Electronics, values are represented as discrete digits (binary)."
    },
    {
      "id": "fmss-mcq-th4",
      "type": "mcq",
      "question": "Which type of amplifier is specifically designed for high-accuracy, low-noise amplification of low-level differential sensor outputs with high CMRR?",
      "options": [
        "Class C RF Amplifier",
        "Instrumentation Amplifier",
        "Push-Pull Power Buffer",
        "Darlington Pair"
      ],
      "correctIndex": 1,
      "explanation": "Instrumentation Amplifiers (In-Amps) are precision differential amplifiers offering extremely high input impedance, very low DC offset, low noise, and high Common-Mode Rejection Ratio (CMRR)."
    },
    {
      "id": "fmss-mcq-th5",
      "type": "mcq",
      "question": "What are the input and output impedance characteristics of an IDEAL Operational Amplifier?",
      "options": [
        "Zero input impedance and infinite output impedance",
        "Infinite input impedance (Zin = \u221e) and zero output impedance (Zout = 0 \u03a9)",
        "50 \u03a9 input impedance and 50 \u03a9 output impedance",
        "1 k\u03a9 input impedance and 1 M\u03a9 output impedance"
      ],
      "correctIndex": 1,
      "explanation": "An ideal op-amp draws zero current into its input terminals (Zin = \u221e) and can deliver any output current without voltage drop (Zout = 0 \u03a9)."
    },
    {
      "id": "fmss-mcq-th6",
      "type": "mcq",
      "question": "What does the 'Virtual Ground' or 'Virtual Short' concept state for an op-amp operating with negative feedback?",
      "options": [
        "The two inputs are physically welded together with a copper wire",
        "Due to the nearly infinite open-loop gain (Avol \u2248 \u221e), negative feedback forces the voltage difference between inverting and non-inverting inputs to approach zero (V+ \u2248 V-)",
        "The output voltage is always 0 Volts",
        "The non-inverting terminal is disconnected from the power supply"
      ],
      "correctIndex": 1,
      "explanation": "Since Vout = Avol * (V+ - V-) and Avol is massive, a finite output voltage requires V+ - V- \u2248 0, meaning V+ \u2248 V-."
    },
    {
      "id": "fmss-mcq-th7",
      "type": "mcq",
      "question": "What is Common-Mode Rejection Ratio (CMRR)?",
      "options": [
        "The ratio of differential voltage gain to common-mode voltage gain: CMRR = |Ad / Acm|",
        "The time rate of change of output voltage",
        "The total power consumed by the op-amp from the supply rails",
        "The ratio of feedback resistance to input resistance"
      ],
      "correctIndex": 0,
      "explanation": "CMRR = |Ad / Acm|. It measures the op-amp's ability to amplify the desired differential signal while rejecting unwanted common-mode noise present on both inputs."
    },
    {
      "id": "fmss-mcq-th8",
      "type": "mcq",
      "question": "On the standard 8-pin DIP package of the LM741 Op-Amp, which pins correspond to the Inverting Input, Non-Inverting Input, and Output?",
      "options": [
        "Pin 1: Inverting, Pin 2: Non-Inverting, Pin 3: Output",
        "Pin 2: Inverting (V-), Pin 3: Non-Inverting (V+), Pin 6: Output (Vout)",
        "Pin 4: Inverting, Pin 7: Non-Inverting, Pin 6: Output",
        "Pin 3: Inverting, Pin 2: Non-Inverting, Pin 8: Output"
      ],
      "correctIndex": 1,
      "explanation": "In LM741: Pin 2 is Inverting Input (-), Pin 3 is Non-Inverting Input (+), and Pin 6 is Output."
    },
    {
      "id": "fmss-mcq-th9",
      "type": "mcq",
      "question": "Which pins are used for the Offset Null adjustment on the LM741 op-amp?",
      "options": [
        "Pin 1 and Pin 5",
        "Pin 4 and Pin 7",
        "Pin 2 and Pin 3",
        "Pin 6 and Pin 8"
      ],
      "correctIndex": 0,
      "explanation": "Pins 1 and 5 are the Offset Null terminals connected to a 10k potentiometer to trim out the input DC offset voltage."
    },
    {
      "id": "fmss-mcq-th10",
      "type": "mcq",
      "question": "What is the function of Pin 8 on the standard LM741 8-pin DIP IC?",
      "options": [
        "Master clock input",
        "NC (No Connection) \u2013 not internally connected to the chip",
        "Auxiliary output buffer",
        "Chassis earth ground"
      ],
      "correctIndex": 1,
      "explanation": "Pin 8 on the LM741 DIP-8 package is NC (No Connection) and should be left unconnected."
    },
    {
      "id": "fmss-mcq-th11",
      "type": "mcq",
      "question": "According to the maximum ratings of the standard 741 Op-Amp, what is the maximum permissible supply voltage (+Vcc, -Vee)?",
      "options": [
        "\u00b15 V",
        "\u00b122 V",
        "\u00b150 V",
        "\u00b112 V"
      ],
      "correctIndex": 1,
      "explanation": "The absolute maximum supply voltage rating for the LM741 is \u00b122 V (though it is commonly operated at \u00b115 V or \u00b112 V)."
    },
    {
      "id": "fmss-mcq-th12",
      "type": "mcq",
      "question": "How long can the output terminal (Pin 6) of an LM741 op-amp be short-circuited to ground without destroying the IC?",
      "options": [
        "5 milliseconds",
        "10 seconds",
        "Indefinitely (due to internal short-circuit current limiting protection)",
        "Short circuits will destroy the op-amp instantaneously"
      ],
      "correctIndex": 2,
      "explanation": "The LM741 datasheet specifies 'Indefinite' output short-circuit duration because of built-in internal current-limiting protection."
    },
    {
      "id": "fmss-mcq-th13",
      "type": "mcq",
      "question": "Who designed the first commercially available monolithic operational amplifier (\u00b5A702 in 1963 and \u00b5A709 in 1965) at Fairchild Semiconductor?",
      "options": [
        "Robert Noyce",
        "Bob Widlar",
        "Gordon Moore",
        "Jack Kilby"
      ],
      "correctIndex": 1,
      "explanation": "Bob Widlar was the legendary analog designer who created the first monolithic op-amps at Fairchild Semiconductor before moving to National Semiconductor."
    },
    {
      "id": "fmss-mcq-th14",
      "type": "mcq",
      "question": "Which op-amp introduced by Fairchild Semiconductor in 1967 became the world industry standard due to its internal frequency compensation capacitor?",
      "options": [
        "\u00b5A702",
        "\u00b5A709",
        "\u00b5A741",
        "LM101"
      ],
      "correctIndex": 2,
      "explanation": "The \u00b5A741 introduced in 1967 included an internal 30pF compensation capacitor, making it unconditionally stable and the universal industry standard."
    },
    {
      "id": "fmss-mcq-th15",
      "type": "mcq",
      "question": "Which sensor uses the Hall effect (Lorentz force on moving electrons in a magnetic field) to detect magnetic objects?",
      "options": [
        "Hall Effect Sensor",
        "Capacitive Touch Sensor",
        "Piezoelectric Sensor",
        "Thermocouple"
      ],
      "correctIndex": 0,
      "explanation": "A Hall Effect Sensor generates an electrical voltage transverse to current flow when exposed to an external magnetic field."
    },
    {
      "id": "fmss-mcq-th16",
      "type": "mcq",
      "question": "What optical wavelength band does a typical Flame Sensor detect to identify fire?",
      "options": [
        "100 to 300 nm (Far UV)",
        "760 to 1100 nm (Near Infrared)",
        "400 to 700 nm (Visible spectrum only)",
        "2000 to 5000 nm (Thermal infrared)"
      ],
      "correctIndex": 1,
      "explanation": "According to the FMSS curriculum, standard flame sensors detect light in the 760\u20131100 nm infrared wavelength band produced by fire."
    },
    {
      "id": "fmss-mcq-th17",
      "type": "mcq",
      "question": "What are the two common internal sensing modules used in Digital Tilt Sensors?",
      "options": [
        "Mercury-based and Ball-based modules",
        "Optical laser and prism",
        "Piezoelectric crystal and magnetostrictive rod",
        "Hall sensor and coil"
      ],
      "correctIndex": 0,
      "explanation": "Digital tilt sensors use either liquid mercury (mercury-based) or a rolling metal ball (ball-based) to open or close an electrical contact when tilted."
    },
    {
      "id": "fmss-mcq-th18",
      "type": "mcq",
      "question": "Which sensor is capable of detecting dynamic and static acceleration in three orthogonal axes (X, Y, Z)?",
      "options": [
        "Digital Tilt Sensor",
        "Triple Axis Accelerometer",
        "Line-Tracking Sensor",
        "Analog Sound Sensor"
      ],
      "correctIndex": 1,
      "explanation": "A Triple Axis Accelerometer measures acceleration (including gravitational force) along X, Y, and Z axes."
    },
    {
      "id": "fmss-mcq-th19",
      "type": "mcq",
      "question": "What are the three fundamental Communication Media categories for Datapath Communication in FMSS?",
      "options": [
        "Bluetooth, Wi-Fi, and Zigbee",
        "Wireless media, Optical media, and Wires",
        "Copper, Gold, and Silver",
        "Radio, Satellite, and Microwave"
      ],
      "correctIndex": 1,
      "explanation": "Unit 2.1 lists three communication media: 1. Wireless media, 2. Optical media, and 3. Wires (metallic conductors)."
    },
    {
      "id": "fmss-mcq-th20",
      "type": "mcq",
      "question": "Which of the following sub-categories belong to RAM (Random Access Memory) in digital system architecture?",
      "options": [
        "Processor registers, Working memory (Main Memory RAM), and Buffer memory (caches, buffers, scratchpad)",
        "Mask ROM, EEPROM, and Flash BIOS",
        "Hard disk platters and magnetic tape",
        "Optical CD-ROM discs"
      ],
      "correctIndex": 0,
      "explanation": "Unit 2.1 lists three RAM types/examples: 1. Processor registers, 2. Working memory (Main Memory RAM), and 3. Buffer memory (caches, buffers, scratchpad memory)."
    },
    {
      "id": "fmss-tf-en-1",
      "type": "tf",
      "question": "An ideal operational amplifier has zero input impedance and infinite output impedance.",
      "answer": false,
      "explanation": "FALSE. An ideal op-amp has INFINITE input impedance (Zin = \u221e) and ZERO output impedance (Zout = 0 \u03a9)."
    },
    {
      "id": "fmss-tf-en-2",
      "type": "tf",
      "question": "In an inverting amplifier with Rin = 10 k\u03a9 and Rf = 50 k\u03a9, the voltage gain is Av = -5.0, producing a 180\u00b0 phase inversion.",
      "answer": true,
      "explanation": "TRUE. Av = -Rf / Rin = -50k / 10k = -5.0. The negative sign represents a 180\u00b0 phase inversion."
    },
    {
      "id": "fmss-tf-en-3",
      "type": "tf",
      "question": "In a non-inverting amplifier with Rf = 90 k\u03a9 and R1 = 10 k\u03a9, the voltage gain is Av = 10.0 and the output is in-phase with the input.",
      "answer": true,
      "explanation": "TRUE. Av = 1 + (Rf / R1) = 1 + (90k / 10k) = 1 + 9 = 10.0."
    },
    {
      "id": "fmss-tf-en-4",
      "type": "tf",
      "question": "Under negative feedback in linear mode, the voltage difference between inverting and non-inverting inputs is forced to zero (V+ \u2248 V-) due to massive open-loop gain.",
      "answer": true,
      "explanation": "TRUE. This is the foundation of the 'Virtual Short' / 'Virtual Ground' principle."
    },
    {
      "id": "fmss-tf-en-5",
      "type": "tf",
      "question": "The output of an op-amp can exceed its supply rail voltages (+Vcc and -Vee) if the input voltage is high enough.",
      "answer": false,
      "explanation": "FALSE. The op-amp output voltage is strictly bounded by its power supply rails and will saturate (clip) near \u00b1Vsat."
    },
    {
      "id": "fmss-tf-en-6",
      "type": "tf",
      "question": "The LM741 operational amplifier has built-in short-circuit protection on its output pin (Pin 6), allowing it to be grounded indefinitely without destruction.",
      "answer": true,
      "explanation": "TRUE. The LM741 maximum ratings list output short-circuit duration as 'Indefinite'."
    },
    {
      "id": "fmss-tf-en-7",
      "type": "tf",
      "question": "Pin 8 of the standard LM741 DIP-8 package is used to connect an external reference voltage.",
      "answer": false,
      "explanation": "FALSE. Pin 8 is NC (No Connection) and has no internal connection to the chip."
    },
    {
      "id": "fmss-tf-en-8",
      "type": "tf",
      "question": "An Ultrasonic Sensor computes target distance using the formula Distance = (Speed of Sound * Time) / 2.",
      "answer": true,
      "explanation": "TRUE. The time is divided by 2 because the acoustic pulse travels to the object and back (round-trip)."
    },
    {
      "id": "fmss-tf-en-9",
      "type": "tf",
      "question": "RAM (Random Access Memory) is non-volatile, meaning it permanently retains data even when power is turned off.",
      "answer": false,
      "explanation": "FALSE. RAM is VOLATILE memory and loses all stored information when power is lost. ROM is non-volatile."
    },
    {
      "id": "fmss-tf-en-10",
      "type": "tf",
      "question": "A Voltage Follower (Buffer) circuit has a voltage gain of Av = 1, high input impedance, and low output impedance to eliminate loading effects on weak sensors.",
      "answer": true,
      "explanation": "TRUE. A buffer provides unity voltage gain (Av = 1) with massive current gain for impedance isolation."
    },
    {
      "id": "fmss-id-en-1",
      "type": "id",
      "question": "What is the industry-standard 8-pin operational amplifier IC introduced by Fairchild Semiconductor in 1967?",
      "answer": "741",
      "acceptableAnswers": [
        "LM741",
        "uA741",
        "\u00b5A741",
        "741 Op-Amp",
        "741 op amp"
      ],
      "hint": "3-digit number beginning with 7"
    },
    {
      "id": "fmss-id-en-2",
      "type": "id",
      "question": "What pin on the LM741 DIP-8 package serves as the Inverting Input terminal (V-)?",
      "answer": "Pin 2",
      "acceptableAnswers": [
        "2",
        "Pin2"
      ],
      "hint": "Adjacent to Pin 1 and Pin 3"
    },
    {
      "id": "fmss-id-en-3",
      "type": "id",
      "question": "What pin on the LM741 DIP-8 package serves as the Non-Inverting Input terminal (V+)?",
      "answer": "Pin 3",
      "acceptableAnswers": [
        "3",
        "Pin3"
      ],
      "hint": "Input pin located between Pin 2 and Pin 4"
    },
    {
      "id": "fmss-id-en-4",
      "type": "id",
      "question": "What pin on the LM741 DIP-8 package serves as the single-ended Output terminal (Vout)?",
      "answer": "Pin 6",
      "acceptableAnswers": [
        "6",
        "Pin6"
      ],
      "hint": "Located on the right side between Pin 5 and Pin 7"
    },
    {
      "id": "fmss-id-en-5",
      "type": "id",
      "question": "What term refers to the maximum rate of change of an op-amp's output voltage over time, measured in V/\u00b5s?",
      "answer": "Slew Rate",
      "acceptableAnswers": [
        "Slew rate",
        "SR"
      ],
      "hint": "Abbreviated as SR"
    },
    {
      "id": "fmss-id-en-6",
      "type": "id",
      "question": "What ratio measures an op-amp's ability to reject identical noise signals present on both input terminals?",
      "answer": "CMRR",
      "acceptableAnswers": [
        "Common-Mode Rejection Ratio",
        "Common Mode Rejection Ratio"
      ],
      "hint": "4-letter acronym starting with C"
    },
    {
      "id": "fmss-id-en-7",
      "type": "id",
      "question": "What sensor detects magnetic objects and magnetic fields using the Lorentz force on charge carriers?",
      "answer": "Hall Effect Sensor",
      "acceptableAnswers": [
        "Hall Sensor",
        "Hall effect",
        "Hall Effect"
      ],
      "hint": "Named after Edwin Hall"
    },
    {
      "id": "fmss-id-en-8",
      "type": "id",
      "question": "What sensor measures distance by transmitting high-frequency sonar sound pulses and timing the echo return?",
      "answer": "Ultrasonic Sensor",
      "acceptableAnswers": [
        "Ultrasonic",
        "Sonar Sensor",
        "Sonar"
      ],
      "hint": "Begins with 'Ultra-'"
    },
    {
      "id": "fmss-id-en-9",
      "type": "id",
      "question": "In an inverting amplifier with Rin = 10 k\u03a9 and Rf = 50 k\u03a9, what is the numerical voltage gain (Av)?",
      "answer": "-5",
      "acceptableAnswers": [
        "-5.0",
        "-5V/V"
      ],
      "hint": "-Rf / Rin"
    },
    {
      "id": "fmss-id-en-10",
      "type": "id",
      "question": "In a non-inverting amplifier with R1 = 10 k\u03a9 and Rf = 90 k\u03a9, what is the numerical voltage gain (Av)?",
      "answer": "10",
      "acceptableAnswers": [
        "10.0",
        "+10",
        "+10.0"
      ],
      "hint": "1 + (Rf / R1)"
    },
    {
      "id": "fmss-match-en-1",
      "type": "matching",
      "title": "LM741 DIP-8 Package Pinout & Terminal Functions",
      "pairs": [
        {
          "term": "Pin 2",
          "definition": "Inverting Input (V-)"
        },
        {
          "term": "Pin 3",
          "definition": "Non-Inverting Input (V+)"
        },
        {
          "term": "Pin 4",
          "definition": "Negative Supply Rail (-Vee)"
        },
        {
          "term": "Pin 6",
          "definition": "Output Terminal (Vout)"
        },
        {
          "term": "Pin 7",
          "definition": "Positive Supply Rail (+Vcc)"
        }
      ]
    },
    {
      "id": "fmss-match-en-2",
      "type": "matching",
      "title": "Op-Amp Circuit Topologies & Transfer Formulas",
      "pairs": [
        {
          "term": "Inverting Amplifier",
          "definition": "Av = - (Rf / Rin) with 180\u00b0 phase inversion"
        },
        {
          "term": "Non-Inverting Amplifier",
          "definition": "Av = 1 + (Rf / R1) in-phase"
        },
        {
          "term": "Voltage Follower",
          "definition": "Av = 1 (Vout = Vin) for impedance buffering"
        },
        {
          "term": "Summing Amplifier",
          "definition": "Vout = -Rf * (V1/R1 + V2/R2 + ...)"
        },
        {
          "term": "Voltage Comparator",
          "definition": "Vout saturates to +Vsat or -Vsat based on input polarity"
        }
      ]
    },
    {
      "id": "fmss-match-en-3",
      "type": "matching",
      "title": "Sensors and Their Physical Operating Principles",
      "pairs": [
        {
          "term": "Hall Effect Sensor",
          "definition": "Magnetic detection via Lorentz force on carriers"
        },
        {
          "term": "Ultrasonic Sensor",
          "definition": "Distance ranging via acoustic Time-of-Flight (d = vt/2)"
        },
        {
          "term": "Flame Sensor",
          "definition": "Optical detection in 760-1100 nm infrared flame band"
        },
        {
          "term": "Capacitive Touch",
          "definition": "Dielectric loading alters electrode capacitance"
        },
        {
          "term": "Triple Axis Accelerometer",
          "definition": "Measures static/dynamic acceleration in X, Y, Z"
        }
      ]
    },
    {
      "id": "fmss-match-en-4",
      "type": "matching",
      "title": "Ideal vs. Practical 741 Op-Amp Specifications",
      "pairs": [
        {
          "term": "Open-Loop Gain (Avol)",
          "definition": "Ideal: Infinite (\u221e) | Practical 741: ~200,000"
        },
        {
          "term": "Input Impedance (Zin)",
          "definition": "Ideal: Infinite (\u221e) | Practical 741: ~2 Megaohms"
        },
        {
          "term": "Output Impedance (Zout)",
          "definition": "Ideal: Zero (0 \u03a9) | Practical 741: ~75 Ohms"
        },
        {
          "term": "Slew Rate (SR)",
          "definition": "Ideal: Infinite (\u221e) | Practical 741: ~0.5 V/\u00b5s"
        },
        {
          "term": "Input Offset Voltage (Vos)",
          "definition": "Ideal: Zero (0 V) | Practical 741: ~1 to 5 mV"
        }
      ]
    }
  ],
  "flashcards": [
    {
      "id": "fmss-fc-en-1",
      "front": "Problem 1: Inverting Amplifier Formulas\nRin = 10 k\u03a9, Rf = 50 k\u03a9, Vin = 0.2 V",
      "back": "1. Voltage Gain:\n   Av = - (Rf / Rin) = - (50k / 10k) = -5.0\n\n2. Output Voltage:\n   Vout = Av * Vin = -5.0 * 0.2 V = -1.0 V\n\n3. Resistor Sizing:\n   Rf = |Av| * Rin = 5 * 10k = 50 k\u03a9\n   Rin = Rf / |Av| = 50k / 5 = 10 k\u03a9",
      "hint": "Av = -Rf/Rin | Vout = Av*Vin"
    },
    {
      "id": "fmss-fc-en-2",
      "front": "Problem 5: Non-Inverting Amplifier Formulas\nRf = 90 k\u03a9, R1 = 10 k\u03a9, Vin = 0.2 V",
      "back": "1. Voltage Gain:\n   Av = 1 + (Rf / R1) = 1 + (90k / 10k) = 1 + 9 = 10.0\n\n2. Output Voltage:\n   Vout = Av * Vin = 10.0 * 0.2 V = +2.0 V\n\n3. Resistor Sizing:\n   Rf = (Av - 1) * R1 = (10 - 1) * 10k = 90 k\u03a9\n   R1 = Rf / (Av - 1) = 90k / 9 = 10 k\u03a9",
      "hint": "Av = 1 + Rf/R1 | Vout = Av*Vin"
    },
    {
      "id": "fmss-fc-en-3",
      "front": "What are the Three Golden Rules of an Ideal Op-Amp?",
      "back": "1. Zero Input Current: I+ = I- = 0 because input impedance is infinite (Zin = \u221e).\n2. Virtual Short: In linear operation with negative feedback, V+ = V-.\n3. Zero Output Impedance: Zout = 0 \u03a9.",
      "hint": "Iin = 0, V+ = V-, Zout = 0"
    },
    {
      "id": "fmss-fc-en-4",
      "front": "Standard LM741 DIP-8 Package Pinout",
      "back": "Pin 1: Offset Null\nPin 2: Inverting Input (V-)\nPin 3: Non-Inverting Input (V+)\nPin 4: -Vee (Negative DC Supply Rail)\nPin 5: Offset Null\nPin 6: Output Terminal (Vout)\nPin 7: +Vcc (Positive DC Supply Rail)\nPin 8: NC (No Connection)",
      "hint": "Inputs: 2, 3 | Output: 6 | Supply: 4, 7"
    },
    {
      "id": "fmss-fc-en-5",
      "front": "LM741 Absolute Maximum Operating Ratings",
      "back": "\u2022 Supply Voltage: \u00b122 V\n\u2022 Differential Input Voltage: \u00b130 V\n\u2022 Common-Mode Input Voltage: \u00b117 V\n\u2022 Power Dissipation (Pd): 500 mW at 25\u00b0C\n\u2022 Operating Temperature: -40\u00b0C to +85\u00b0C\n\u2022 Output Short-Circuit Duration: Indefinite (Protected)",
      "hint": "Supply max \u00b122V, Short-circuit indefinite"
    },
    {
      "id": "fmss-fc-en-6",
      "front": "Slew Rate (SR) Definition & Full-Power Bandwidth Formula",
      "back": "Slew Rate is the maximum time rate of change of output voltage:\nSR = dVout / dt (typically 0.5 V/\u00b5s for 741)\n\nFull-Power Bandwidth:\nfmax = SR / (2 * \u03c0 * Vp)\nAbove fmax, sine waves distort into triangular waves.",
      "hint": "SR = dV/dt in V/\u00b5s"
    },
    {
      "id": "fmss-fc-en-7",
      "front": "Ultrasonic Sensor Distance Formula",
      "back": "Distance = (Speed of Sound * Echo Return Time) / 2\n\nGiven v = 340 m/s:\nDistance (m) = (340 * t) / 2 = 170 * t\nDivided by 2 because the acoustic pulse travels round-trip.",
      "hint": "d = (v * t) / 2"
    },
    {
      "id": "fmss-fc-en-8",
      "front": "Decibel Voltage Gain Formula",
      "back": "Av(dB) = 20 * log10(Vout / Vin)\n\nKey Conversions:\n\u2022 0 dB = Gain of 1\n\u2022 20 dB = Gain of 10\n\u2022 40 dB = Gain of 100\n\u2022 60 dB = Gain of 1000",
      "hint": "20 * log10(Av)"
    }
  ],
  "matching": [
    {
      "id": "fmss-match-en-1",
      "type": "matching",
      "title": "LM741 DIP-8 Package Pinout & Terminal Functions",
      "pairs": [
        {
          "term": "Pin 2",
          "definition": "Inverting Input (V-)"
        },
        {
          "term": "Pin 3",
          "definition": "Non-Inverting Input (V+)"
        },
        {
          "term": "Pin 4",
          "definition": "Negative Supply Rail (-Vee)"
        },
        {
          "term": "Pin 6",
          "definition": "Output Terminal (Vout)"
        },
        {
          "term": "Pin 7",
          "definition": "Positive Supply Rail (+Vcc)"
        }
      ]
    },
    {
      "id": "fmss-match-en-2",
      "type": "matching",
      "title": "Op-Amp Circuit Topologies & Transfer Formulas",
      "pairs": [
        {
          "term": "Inverting Amplifier",
          "definition": "Av = - (Rf / Rin) with 180\u00b0 phase inversion"
        },
        {
          "term": "Non-Inverting Amplifier",
          "definition": "Av = 1 + (Rf / R1) in-phase"
        },
        {
          "term": "Voltage Follower",
          "definition": "Av = 1 (Vout = Vin) for impedance buffering"
        },
        {
          "term": "Summing Amplifier",
          "definition": "Vout = -Rf * (V1/R1 + V2/R2 + ...)"
        },
        {
          "term": "Voltage Comparator",
          "definition": "Vout saturates to +Vsat or -Vsat based on input polarity"
        }
      ]
    },
    {
      "id": "fmss-match-en-3",
      "type": "matching",
      "title": "Sensors and Their Physical Operating Principles",
      "pairs": [
        {
          "term": "Hall Effect Sensor",
          "definition": "Magnetic detection via Lorentz force on carriers"
        },
        {
          "term": "Ultrasonic Sensor",
          "definition": "Distance ranging via acoustic Time-of-Flight (d = vt/2)"
        },
        {
          "term": "Flame Sensor",
          "definition": "Optical detection in 760-1100 nm infrared flame band"
        },
        {
          "term": "Capacitive Touch",
          "definition": "Dielectric loading alters electrode capacitance"
        },
        {
          "term": "Triple Axis Accelerometer",
          "definition": "Measures static/dynamic acceleration in X, Y, Z"
        }
      ]
    },
    {
      "id": "fmss-match-en-4",
      "type": "matching",
      "title": "Ideal vs. Practical 741 Op-Amp Specifications",
      "pairs": [
        {
          "term": "Open-Loop Gain (Avol)",
          "definition": "Ideal: Infinite (\u221e) | Practical 741: ~200,000"
        },
        {
          "term": "Input Impedance (Zin)",
          "definition": "Ideal: Infinite (\u221e) | Practical 741: ~2 Megaohms"
        },
        {
          "term": "Output Impedance (Zout)",
          "definition": "Ideal: Zero (0 \u03a9) | Practical 741: ~75 Ohms"
        },
        {
          "term": "Slew Rate (SR)",
          "definition": "Ideal: Infinite (\u221e) | Practical 741: ~0.5 V/\u00b5s"
        },
        {
          "term": "Input Offset Voltage (Vos)",
          "definition": "Ideal: Zero (0 V) | Practical 741: ~1 to 5 mV"
        }
      ]
    }
  ]
};
