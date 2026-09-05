// Data for Mixed Signals and Sensors (FMSS)
window.FMSS_SUBJECT = {
  "id": "subj-fmss",
  "name": "Mixed Signals and Sensors (FMSS)",
  "description": "Comprehensive engineering reviewer covering operational amplifiers, 741 IC architecture, sensor signal conditioning, circuit computations, and datapath communication.",
  "questions": [
    {
      "id": "fmss-mcq-1",
      "type": "mcq",
      "question": "Ano ang pangunahing tungkulin ng isang Amplifier sa Fundamentals of Mixed Signals and Sensors (FMSS)?",
      "options": [
        "I-convert ang digital na signal papuntang electromagnetic wave",
        "Palakasin ang mahinang electrical signal mula sa sensor o mixed-signal source para magamit ng ADC o processor",
        "I-filter lamang ang DC voltage nang walang pagbabago sa amplitude",
        "Mag-imbak ng volatile memory habang may kuryente"
      ],
      "correctIndex": 1,
      "explanation": "Ang amplifier ay kumukuha ng mahinang signal (karaniwang microvolts o millivolts) mula sa sensor at pinapalakas ang voltage, current, o power nito upang epektibong maproseso ng ADC o controller."
    },
    {
      "id": "fmss-mcq-2",
      "type": "mcq",
      "question": "Alin sa mga sumusunod ang tamang daloy ng signal chain sa FMSS system architecture?",
      "options": [
        "Processing Circuits \u2192 Amplifiers \u2192 Sensor \u2192 Stimuli \u2192 Output Signal",
        "Input Signal (Stimuli) \u2192 Sensor (Inducers) \u2192 Output Signal (AC/DC) \u2192 Amplifiers \u2192 Processing Circuits",
        "Amplifiers \u2192 Input Signal \u2192 ADC \u2192 Sensor \u2192 Stimuli",
        "Sensor \u2192 Processing Circuits \u2192 Stimuli \u2192 Output Signal \u2192 Amplifiers"
      ],
      "correctIndex": 1,
      "explanation": "Ang tamang daloy ay: Input Signal (Stimuli mula sa pisikal na mundo) \u2192 Sensor (Inducers/Transducers) \u2192 Electrical Output Signal (AC/DC) \u2192 Amplifiers (Signal Conditioning) \u2192 Processing Circuits (ADC/Microcontroller)."
    },
    {
      "id": "fmss-mcq-3",
      "type": "mcq",
      "question": "Bakit kailangang dumaan ang signal ng mga sensor tulad ng strain gauges at thermocouples sa amplifier bago ang Analog-to-Digital Converter (ADC)?",
      "options": [
        "Dahil ang output ng mga sensor na ito ay digital na kailangang gawing analog",
        "Dahil lumilikha ang mga sensor na ito ng napakababang boltahe sa millivolt (mV) o microvolt (\u00b5V) range na hindi mababasa nang tumpak ng ADC",
        "Upang baguhin ang frequency ng signal patungong gigahertz range",
        "Dahil kailangang patayin ang boltahe upang maprotektahan ang baterya"
      ],
      "correctIndex": 1,
      "explanation": "Karamihan sa sensor outputs ay nasa microvolt o millivolt level lamang. Kailangan ng analog front-end amplifier upang i-boost ang signal sa standard ADC dynamic range (hal. 0-3.3V o 0-5V)."
    },
    {
      "id": "fmss-mcq-4",
      "type": "mcq",
      "question": "Ano ang pagkakaiba ng Linear Electronics sa Digital Electronics?",
      "options": [
        "Ang digital ay gumagamit ng tuloy-tuloy na analog variables samantalang ang linear ay binary lamang",
        "Ang digital ay gumagamit ng discrete signals na kinakatawan ng mga numero (karaniwang binary), samantalang ang linear ay continuous/analog variables kung saan ang output ay direktang nagbabago ayon sa input",
        "Walang pagkakaiba, pareho silang gumagamit lamang ng logic gates",
        "Ang linear electronics ay para lamang sa mga switch at relay"
      ],
      "correctIndex": 1,
      "explanation": "Sa Linear Electronics, continuous ang signal at direktang proporsyonal ang output sa input (tulad ng amplification). Sa Digital Electronics, discrete levels (0 at 1) ang nagrerepresenta ng impormasyon."
    },
    {
      "id": "fmss-mcq-5",
      "type": "mcq",
      "question": "Aling uri ng amplifier ang espesyal na dinisenyo para sa tumpak at low-noise amplification ng sensor outputs na may mataas na CMRR?",
      "options": [
        "Class C RF Power Amplifier",
        "Instrumentation Amplifier",
        "Push-Pull Transistor Amplifier",
        "Common Collector Buffer"
      ],
      "correctIndex": 1,
      "explanation": "Ang Instrumentation Amplifier (In-Amp) ay espesyal na binuo para sa sensor conditioning dahil sa napakataas na input impedance, napakababang noise, at napakataas na Common-Mode Rejection Ratio (CMRR)."
    },
    {
      "id": "fmss-mcq-6",
      "type": "mcq",
      "question": "Ano ang mga katangian ng Input at Output Impedance ng isang Ideal Operational Amplifier?",
      "options": [
        "Zero Input Impedance at Infinite Output Impedance",
        "Infinite Input Impedance (Zin = \u221e) at Zero Output Impedance (Zout = 0 \u03a9)",
        "100 \u03a9 Input Impedance at 1 M\u03a9 Output Impedance",
        "Parehong 50 \u03a9 para sa characteristic impedance matching"
      ],
      "correctIndex": 1,
      "explanation": "Ang ideal op-amp ay may Infinite Input Impedance (walang current na pumapasok sa inputs, Iin = 0) at Zero Output Impedance (perpektong boltahe anuman ang load current)."
    },
    {
      "id": "fmss-mcq-7",
      "type": "mcq",
      "question": "Ano ang ipinahihiwatig ng konseptong 'Virtual Ground' o 'Virtual Short' sa isang op-amp circuit na may negative feedback?",
      "options": [
        "Ang dalawang input ay pisikal na magkadikit sa pamamagitan ng wire",
        "Dahil sa napakataas na open-loop gain (Avol \u2248 \u221e), pinipilit ng negative feedback na magkapantay ang boltahe sa inverting at non-inverting terminals (V+ \u2248 V-)",
        "Ang output boltahe ay palaging 0 Volts",
        "Konektado ang inverting terminal nang direkta sa earth ground rod"
      ],
      "correctIndex": 1,
      "explanation": "Dahil Vout = Avol * (V+ - V-) at napakalaki ng Avol, kapag may negative feedback at nasa linear region ang op-amp, V+ - V- \u2248 0, kaya V+ \u2248 V-."
    },
    {
      "id": "fmss-mcq-8",
      "type": "mcq",
      "question": "Ano ang ibig sabihin ng Common-Mode Rejection Ratio (CMRR) sa isang differential op-amp?",
      "options": [
        "Kakayahan ng op-amp na maglabas ng maximum current",
        "Kakayahan ng op-amp na tanggihan ang ingay (noise) o signals na sabay na lumilitaw sa dalawang input terminals",
        "Bilis ng pagbabago ng boltahe kada microsecond",
        "Dalas ng pagpalit ng supply voltage"
      ],
      "correctIndex": 1,
      "explanation": "CMRR = |Ad / Acm|. Sinusukat nito kung gaano kahusay tanggihan ng op-amp ang unwanted common-mode noise (tulad ng 60Hz hum) habang pinalalakas ang differential sensor signal."
    },
    {
      "id": "fmss-mcq-9",
      "type": "mcq",
      "question": "Ano ang depinisyon ng 'Slew Rate' (SR) ng isang operational amplifier?",
      "options": [
        "Ang pinakamababang temperatura kung saan gagana ang IC",
        "Ang maximum rate of change ng output voltage sa paglipas ng panahon (karaniwang nasusukat sa V/\u00b5s)",
        "Ang resistance sa pagitan ng power pins at ground",
        "Ang halaga ng input bias current kapag naka-off ang supply"
      ],
      "correctIndex": 1,
      "explanation": "Slew Rate (SR = dVout/dt) ay ang pinakamabilis na bilis ng pag-akyat o pagbaba ng output voltage, sinusukat sa Volts per microsecond (V/\u00b5s)."
    },
    {
      "id": "fmss-mcq-10",
      "type": "mcq",
      "question": "Ano ang 'Input Offset Voltage' (Vos) sa isang praktikal na op-amp?",
      "options": [
        "Ang supply voltage na kinakailangan upang umandar ang panloob na transistors",
        "Ang boltaheng kailangang ilapat sa pagitan ng mga input terminal upang maging eksaktong 0V ang output",
        "Ang pinakamataas na boltahe bago masira ang op-amp",
        "Ang boltahe sa Pin 8 ng LM741"
      ],
      "correctIndex": 1,
      "explanation": "Dahil sa kaunting mismatch sa internal differential pair transistors, may bahagyang output error voltage kapag 0V ang inputs. Ang Input Offset Voltage ay ang boltaheng pantabla sa inputs para mag-0V ang output."
    },
    {
      "id": "fmss-mcq-11",
      "type": "mcq",
      "question": "Sa karaniwang 8-pin DIP package ng LM741 Op-Amp, anong function ang nakatalaga sa Pin 2 at Pin 3?",
      "options": [
        "Pin 2: +Vcc, Pin 3: -Vee",
        "Pin 2: Inverting Input (V-), Pin 3: Non-Inverting Input (V+)",
        "Pin 2: Output, Pin 3: Offset Null",
        "Pin 2: Ground, Pin 3: No Connection"
      ],
      "correctIndex": 1,
      "explanation": "Sa LM741: Pin 2 ang Inverting Input (-), at Pin 3 ang Non-Inverting Input (+)."
    },
    {
      "id": "fmss-mcq-12",
      "type": "mcq",
      "question": "Aling mga pin sa LM741 ang ginagamit para sa 'Offset Null' upang itama ang DC input offset error gamit ang potentiometer?",
      "options": [
        "Pin 1 at Pin 5",
        "Pin 4 at Pin 7",
        "Pin 2 at Pin 6",
        "Pin 3 at Pin 8"
      ],
      "correctIndex": 0,
      "explanation": "Pin 1 at Pin 5 ang Offset Null terminals ng 741 kung saan ikinakabit ang potentiometer pabalik sa Pin 4 (-Vee)."
    },
    {
      "id": "fmss-mcq-13",
      "type": "mcq",
      "question": "Anong mga pin ang nakalaan para sa power supply ng LM741 op-amp?",
      "options": [
        "Pin 1 (+Vcc) at Pin 8 (-Vee)",
        "Pin 7 (+Vcc / Positive Supply) at Pin 4 (-Vee / Negative Supply)",
        "Pin 2 at Pin 3",
        "Pin 5 at Pin 6"
      ],
      "correctIndex": 1,
      "explanation": "Pin 7 ang positibong supply (+Vcc), at Pin 4 ang negatibong supply (-Vee)."
    },
    {
      "id": "fmss-mcq-14",
      "type": "mcq",
      "question": "Ano ang katangian ng Pin 8 sa karaniwang 741 Operational Amplifier IC?",
      "options": [
        "External clock sync pin",
        "NC (No Connection) \u2013 hindi nakakonekta sa anumang internal circuit",
        "High voltage boost trigger",
        "Analog ground reference"
      ],
      "correctIndex": 1,
      "explanation": "Ang Pin 8 sa LM741 8-pin DIP ay NC (No Connection) at iniwang bukas."
    },
    {
      "id": "fmss-mcq-15",
      "type": "mcq",
      "question": "Ayon sa maximum ratings ng standard 741 Op-Amp, ano ang maximum supply voltage (+Vcc, -Vee) na kaya nitong hawakan nang ligtas?",
      "options": [
        "\u00b15 V",
        "\u00b122 V",
        "\u00b150 V",
        "\u00b1120 V"
      ],
      "correctIndex": 1,
      "explanation": "Ang absolute maximum rating para sa supply voltage ng 741 op-amp ay \u00b122 V (bagaman karaniwang pinapagana sa \u00b115 V o \u00b112 V)."
    },
    {
      "id": "fmss-mcq-16",
      "type": "mcq",
      "question": "Ano ang maximum internal power dissipation (Pd) rating ng karaniwang 741 op-amp sa ambient temperature na 25\u00b0C?",
      "options": [
        "50 mW",
        "500 mW",
        "5 Watts",
        "25 Watts"
      ],
      "correctIndex": 1,
      "explanation": "Ang internal power dissipation (Pd) rating ng LM741 ay 500 mW sa 25\u00b0C."
    },
    {
      "id": "fmss-mcq-17",
      "type": "mcq",
      "question": "Gaano katagal maaaring i-short circuit sa ground o supply rail ang output terminal (Pin 6) ng LM741 nang hindi nasisira ang IC?",
      "options": [
        "5 milliseconds lamang",
        "10 segundo bago sumabog",
        "Indefinite (walang takdang tagal dahil sa internal short-circuit current limiting protection)",
        "Bawal i-short kahit 1 microsecond"
      ],
      "correctIndex": 2,
      "explanation": "Ang output ng LM741 ay may panloob na current-limiting circuitry kaya 'indefinite' ang short-circuit duration rating nito nang hindi nasusunog."
    },
    {
      "id": "fmss-mcq-18",
      "type": "mcq",
      "question": "[Kalkulasyon] Isang inverting amplifier circuit ang may Rin = 10 k\u03a9 at feedback resistor Rf = 100 k\u03a9. Ano ang closed-loop voltage gain (Av)?",
      "options": [
        "Av = +10",
        "Av = -10",
        "Av = +11",
        "Av = -0.1"
      ],
      "correctIndex": 1,
      "explanation": "Pormula para sa Inverting Amplifier: Av = -Rf / Rin. Kaya Av = - (100 k\u03a9 / 10 k\u03a9) = -10. May 180\u00b0 phase inversion kaya may negative sign."
    },
    {
      "id": "fmss-mcq-19",
      "type": "mcq",
      "question": "[Kalkulasyon] Kung ang inverting amplifier na may gain na Av = -10 ay pinasukan ng input signal na Vin = +0.5 V, ano ang magiging output voltage (Vout)?",
      "options": [
        "+5.0 V",
        "-5.0 V",
        "+0.05 V",
        "-10.5 V"
      ],
      "correctIndex": 1,
      "explanation": "Vout = Av * Vin = (-10) * (+0.5 V) = -5.0 V."
    },
    {
      "id": "fmss-mcq-20",
      "type": "mcq",
      "question": "[Kalkulasyon] Isang non-inverting amplifier ang may R1 = 10 k\u03a9 at Rf = 40 k\u03a9. Kung ang input boltahe ay Vin = +1.5 V, ano ang Vout?",
      "options": [
        "+4.0 V",
        "+6.0 V",
        "+7.5 V",
        "-6.0 V"
      ],
      "correctIndex": 2,
      "explanation": "Pormula para sa Non-Inverting Amplifier: Av = 1 + (Rf / R1) = 1 + (40k / 10k) = 1 + 4 = 5. Pagkatapos, Vout = Av * Vin = 5 * 1.5 V = +7.5 V."
    },
    {
      "id": "fmss-mcq-21",
      "type": "mcq",
      "question": "[Kalkulasyon - Saturation] Ang isang non-inverting amplifier ay pinapagana ng \u00b115 V dual power supply (kung saan ang saturation voltage Vsat = \u00b114 V). Kung Av = 20 at ang input ay Vin = 1.0 V, ano ang magiging aktwal na output Vout?",
      "options": [
        "+20 V nang walang pagbabago",
        "+14 V (clipping / saturated sa positive supply rail)",
        "-20 V",
        "0 V dahil masisira agad ang circuit"
      ],
      "correctIndex": 1,
      "explanation": "Kahit ang theoretical output ay Av * Vin = 20 * 1V = 20V, hindi maaaring lumampas ang output ng op-amp sa supply rails nito. Magka-clipping o sasagad ang output sa saturation voltage na humigit-kumulang +14 V."
    },
    {
      "id": "fmss-mcq-22",
      "type": "mcq",
      "question": "[Kalkulasyon - Buffer] Ano ang voltage gain (Av) ng isang Voltage Follower (Unity-Gain Buffer) circuit kung saan direktang nakakonekta ang output sa inverting input (Rf = 0)?",
      "options": [
        "Av = 0",
        "Av = 1",
        "Av = \u221e",
        "Av = -1"
      ],
      "correctIndex": 1,
      "explanation": "Sa Voltage Follower: Av = 1 + (0 / R1) = 1. Ang Vout = Vin. Ginagamit ito para sa impedance buffering upang maiwasan ang loading effect sa mahihinang sensors."
    },
    {
      "id": "fmss-mcq-23",
      "type": "mcq",
      "question": "[Kalkulasyon - Slew Rate] Kung ang isang op-amp ay may Slew Rate na SR = 0.5 V/\u00b5s, gaano katagal aabutin ang output nito upang magbago mula -10 V patungong +10 V?",
      "options": [
        "10 microseconds",
        "20 microseconds",
        "40 microseconds",
        "100 microseconds"
      ],
      "correctIndex": 2,
      "explanation": "\u0394V = (+10 V) - (-10 V) = 20 V. Oras \u0394t = \u0394V / SR = 20 V / (0.5 V/\u00b5s) = 40 \u00b5s."
    },
    {
      "id": "fmss-mcq-24",
      "type": "mcq",
      "question": "[Kalkulasyon - Summing Amp] Isang inverting summing amplifier ang may tatlong input resistor: R1 = 10 k\u03a9, R2 = 10 k\u03a9, at feedback resistor Rf = 20 k\u03a9. Kung V1 = 1 V at V2 = 2 V, ano ang Vout?",
      "options": [
        "-3.0 V",
        "-6.0 V",
        "+6.0 V",
        "-1.5 V"
      ],
      "correctIndex": 1,
      "explanation": "Vout = -Rf * (V1/R1 + V2/R2) = -20k * (1V/10k + 2V/10k) = -20k * (0.1m + 0.2m) = -20k * 0.3m = -6.0 V."
    },
    {
      "id": "fmss-mcq-25",
      "type": "mcq",
      "question": "[Kalkulasyon - Ultrasonic Sensor] Ang bilis ng tunog sa hangin ay tinatayang 340 m/s. Kung ang isang ultrasonic sensor ay nagpadala ng ping at natanggap ang echo pagkalipas ng 4 milliseconds (0.004 s), ano ang distansya ng bagay?",
      "options": [
        "1.36 metro",
        "0.68 metro (68 sentimetro)",
        "2.72 metro",
        "0.34 metro"
      ],
      "correctIndex": 1,
      "explanation": "Ang tunog ay naglakbay papunta at pabalik (round trip), kaya d = (v * t) / 2 = (340 m/s * 0.004 s) / 2 = 1.36 m / 2 = 0.68 m o 68 cm."
    },
    {
      "id": "fmss-mcq-26",
      "type": "mcq",
      "question": "Sino ang tanyag na circuit designer sa Fairchild Semiconductor na nag-disenyo ng unang commercially available monolithic op-amp (\u00b5A702 noong 1963 at \u00b5A709 noong 1965)?",
      "options": [
        "Robert Noyce",
        "Bob Widlar",
        "Gordon Moore",
        "Jack Kilby"
      ],
      "correctIndex": 1,
      "explanation": "Si Bob Widlar ang maalamat na analog designer na lumikha ng unang monolithic op-amps sa Fairchild Semiconductor bago lumipat sa National Semiconductor."
    },
    {
      "id": "fmss-mcq-27",
      "type": "mcq",
      "question": "Noong anong taon ipinakilala ng Fairchild Semiconductor ang \u00b5A741 na naging pamantayan ng industriya (industry standard)?",
      "options": [
        "1948",
        "1963",
        "1967",
        "1985"
      ],
      "correctIndex": 2,
      "explanation": "Noong 1967 inilabas ang \u00b5A741 na nagtampok ng internal frequency compensation capacitor (30pF), kaya hindi na ito nag-ooscillate nang kusa at naging industry standard."
    },
    {
      "id": "fmss-mcq-28",
      "type": "mcq",
      "question": "Bago naimbento ang mga transistors at integrated circuits noong 1948, ano ang ginamit na teknolohiya para buuin ang mga unang operational amplifiers?",
      "options": [
        "Vacuum Tubes",
        "Mechanical gears at relays lamang",
        "Silicon microprocessors",
        "Carbon nanotubes"
      ],
      "correctIndex": 0,
      "explanation": "Ang mga unang op-amp noong 1940s para sa analog computers ay gumamit ng Vacuum Tubes para sa mathematical operations (addition, integration, differentiation)."
    },
    {
      "id": "fmss-mcq-29",
      "type": "mcq",
      "question": "Anong uri ng sensor ang gumagamit ng magnetic field at Lorentz force upang matukoy ang presensya o posisyon ng magnetic objects?",
      "options": [
        "Piezoelectric Sensor",
        "Hall Effect Sensor",
        "Capacitive Touch Sensor",
        "Thermocouple"
      ],
      "correctIndex": 1,
      "explanation": "Ang Hall Effect Sensor ay gumagana sa pamamagitan ng paglikha ng transverse voltage kapag may magnetic field na tumama sa conductor na may dumadaloy na kuryente."
    },
    {
      "id": "fmss-mcq-30",
      "type": "mcq",
      "question": "Anong optical wavelength range ang tinutukoy ng isang Flame Sensor upang matukoy ang pagkakaroon ng apoy?",
      "options": [
        "100 hanggang 300 nm (Far Ultraviolet)",
        "760 hanggang 1100 nm (Infrared light spectrum)",
        "400 hanggang 700 nm (Visible spectrum lamang)",
        "2000 hanggang 5000 nm"
      ],
      "correctIndex": 1,
      "explanation": "Ayon sa FMSS manual, ang Flame Sensor ay sensitibo sa infrared wavelength na 760 hanggang 1100 nm na inilalabas ng apoy."
    },
    {
      "id": "fmss-mcq-31",
      "type": "mcq",
      "question": "Paano gumagana ang isang Capacitive Touch Sensor kapag inilalapit o idinidikit ang daliri ng tao?",
      "options": [
        "Naglalabas ito ng init na sumusukat sa temperatura ng balat",
        "Dahil may dielectric at capacitive characteristics ang katawan ng tao, kumikilos ito bilang karagdagang capacitor na nagpapabago sa kabuuang capacitance ng sensor",
        "Bumabara ito sa magnetic flux ng sensor",
        "Gumagawa ito ng high-voltage electric arc"
      ],
      "correctIndex": 1,
      "explanation": "Ang katawan ng tao ay may electrical capacitance; kapag lumalapit sa sensor, nagbabago ang dielectric property na nagreresulta sa pagbabago ng capacitance na nade-detect ng circuit."
    },
    {
      "id": "fmss-mcq-32",
      "type": "mcq",
      "question": "Aling sensor ang may kakayahang sumukat ng static at dynamic acceleration kasama na ang gravity sa tatlong orthogonal na direksyon (X, Y, Z)?",
      "options": [
        "Digital Tilt Sensor",
        "Triple Axis Accelerometer",
        "Line-Tracking Sensor",
        "Joystick Module"
      ],
      "correctIndex": 1,
      "explanation": "Ang Triple Axis Accelerometer ay sumusukat ng acceleration sa X, Y, at Z axes, na ginagamit sa orientation, motion detection, at drop detection."
    },
    {
      "id": "fmss-mcq-33",
      "type": "mcq",
      "question": "Ano ang dalawang modules o mekanismo na ginagamit sa isang Digital Tilt Sensor?",
      "options": [
        "Optical laser at prism",
        "Mercury-based at Ball-based switch",
        "Piezoelectric crystal at magnetostrictive rod",
        "Carbon brush at slip ring"
      ],
      "correctIndex": 1,
      "explanation": "Ang digital tilt sensors ay gumagamit ng Mercury-based module (likidong mercury na nagdudugtong sa contacts) o Ball-based module (gumugulong na metal ball)."
    },
    {
      "id": "fmss-mcq-34",
      "type": "mcq",
      "question": "Anong uri ng electrical signal ang inilalabas ng isang Joystick Module sa bawat axis (X at Y)?",
      "options": [
        "Pure digital serial packet (SPI)",
        "Dalawang magkahiwalay na analog voltage outputs mula sa dalawang potentiometers",
        "High-frequency square wave",
        "Differential current loop na 4-20 mA"
      ],
      "correctIndex": 1,
      "explanation": "Ang karaniwang joystick module ay binubuo ng dalawang potentiometers na nagbibigay ng analog output voltage depende sa posisyon ng X at Y axes."
    },
    {
      "id": "fmss-mcq-35",
      "type": "mcq",
      "question": "Alin sa mga sumusunod ang mga gas na kayang matukoy ng karaniwang mga gas sensor (tulad ng MQ series)?",
      "options": [
        "LPG, Butane, Propane, Methane, Alcohol, Hydrogen, at Smoke",
        "Oxygen at Nitrogen lamang",
        "Argon at Helium lamang",
        "Wala, liquid fluids lamang ang nasusukat nito"
      ],
      "correctIndex": 0,
      "explanation": "Ayon sa FMSS syllabus, ang gas sensors ay ginagamit upang mag-detect ng LPG, butane, propane, methane, alcohol, hydrogen, at usok (smoke)."
    },
    {
      "id": "fmss-mcq-36",
      "type": "mcq",
      "question": "Alin sa mga sumusunod ang HINDI kabilang sa mga paraan ng Biometric Authentication ayon sa Unit 2.1?",
      "options": [
        "Iris scans",
        "Fingerprint sensors",
        "Face recognition",
        "RFID Tag pinging"
      ],
      "correctIndex": 3,
      "explanation": "Ang RFID ay hiwalay na radio-frequency identification technology. Ang Biometric methods ay nakabatay sa biological features: Iris scans, Fingerprint sensors, at Face recognition."
    },
    {
      "id": "fmss-mcq-37",
      "type": "mcq",
      "question": "Ano ang tatlong pangunahing Communication Media na nagbibigay-daan sa Datapath Communication ayon sa FMSS?",
      "options": [
        "Bluetooth, Wi-Fi, at Zigbee lamang",
        "Wireless media, Optical media, at Wires",
        "Copper cables, Aluminum cables, at Gold cables",
        "Audio waves, Seismic waves, at Water waves"
      ],
      "correctIndex": 1,
      "explanation": "Ang tatlong kategorya ng Communication Media sa datapath ay: 1. Wireless media, 2. Optical media, at 3. Wires (metallic conductors)."
    },
    {
      "id": "fmss-mcq-38",
      "type": "mcq",
      "question": "Bakit itinuturing na 'Volatile' memory ang RAM (Random Access Memory)?",
      "options": [
        "Dahil mabilis itong sumabog kapag uminit",
        "Dahil nawawala ang lahat ng datos na nakaimbak dito kapag nawalan ng supply ng kuryente",
        "Dahil hindi ito maaaring sulatan ng bagong data",
        "Dahil permanenteng nakaukit ang instructions sa silicon chip"
      ],
      "correctIndex": 1,
      "explanation": "Ang RAM ay volatile memory\u2014nangangailangan ito ng tuloy-tuloy na kuryente upang mapanatili ang laman nitong datos. Mawawala ang data kapag pinatay ang system."
    },
    {
      "id": "fmss-mcq-39",
      "type": "mcq",
      "question": "Alin sa mga sumusunod ang kabilang sa mga halimbawa o uri sa ilalim ng RAM sa memory block architecture?",
      "options": [
        "Processor registers, Working memory (Main RAM), at Buffer memory (caches, buffers, scratchpad)",
        "CD-ROM, DVD-ROM, at Blu-ray discs",
        "Flash ROM BIOS chips lamang",
        "Magnetic hard disk platters"
      ],
      "correctIndex": 0,
      "explanation": "Ayon sa FMSS Unit 2.1, ang mga sub-category sa ilalim ng RAM ay: 1. Processor registers, 2. Working memory (Main Memory RAM), at 3. Buffer memory (caches, buffers, scratchpad memory)."
    },
    {
      "id": "fmss-mcq-40",
      "type": "mcq",
      "question": "Anong uri ng memory ang naglalaman ng permanenteng embedded instructions para sa system startup at maaaring maging flash-programmable?",
      "options": [
        "Dynamic RAM (DRAM)",
        "Read-Only Memory (ROM)",
        "Processor Cache L1",
        "Scratchpad RAM"
      ],
      "correctIndex": 1,
      "explanation": "Ang ROM (Read-Only Memory) ay non-volatile at naglalaman ng permanent embedded code / firmware (maaaring mask ROM, EEPROM, o flash-programmable)."
    },
    {
      "id": "fmss-mcq-41",
      "type": "mcq",
      "question": "[Kalkulasyon - dB Gain] Kung ang isang amplifier circuit ay may linear voltage gain na Av = 100, ano ang katumbas nitong gain sa decibels (dB)?",
      "options": [
        "20 dB",
        "40 dB",
        "60 dB",
        "100 dB"
      ],
      "correctIndex": 1,
      "explanation": "Av(dB) = 20 * log10(Av) = 20 * log10(100) = 20 * 2 = 40 dB."
    },
    {
      "id": "fmss-mcq-42",
      "type": "mcq",
      "question": "[Kalkulasyon - ADC Step Size] Ang isang 10-bit Analog-to-Digital Converter (ADC) ay may reference voltage na Vref = 5.0 V. Ano ang resolution o step size (LSB voltage) nito?",
      "options": [
        "4.88 mV",
        "9.76 mV",
        "1.22 mV",
        "48.8 mV"
      ],
      "correctIndex": 0,
      "explanation": "Resolution = Vref / (2^n) = 5.0 V / 1024 = 0.0048828 V \u2248 4.88 mV bawat digital count."
    },
    {
      "id": "fmss-mcq-43",
      "type": "mcq",
      "question": "[Kalkulasyon - Temperature Sensor] Ang isang LM35 linear temperature sensor ay naglalabas ng 10 mV kada degree Celsius (10 mV/\u00b0C). Kung ang nasukat na output voltage ay 350 mV, ano ang temperatura?",
      "options": [
        "25\u00b0C",
        "35\u00b0C",
        "70\u00b0C",
        "3.5\u00b0C"
      ],
      "correctIndex": 1,
      "explanation": "Temperatura = Vout / (10 mV/\u00b0C) = 350 mV / (10 mV/\u00b0C) = 35\u00b0C."
    },
    {
      "id": "fmss-mcq-44",
      "type": "mcq",
      "question": "[Kalkulasyon - Inverting Amp] Mayroon kang inverting amplifier na may Rin = 2 k\u03a9. Nais mong magkaroon ng closed-loop gain na Av = -25. Anong halaga ng feedback resistor Rf ang dapat mong gamitin?",
      "options": [
        "25 k\u03a9",
        "50 k\u03a9",
        "100 k\u03a9",
        "12.5 k\u03a9"
      ],
      "correctIndex": 1,
      "explanation": "|Av| = Rf / Rin \u2192 Rf = |Av| * Rin = 25 * 2 k\u03a9 = 50 k\u03a9."
    },
    {
      "id": "fmss-mcq-45",
      "type": "mcq",
      "question": "[Kalkulasyon - Non-Inverting Amp] May non-inverting amplifier na may R1 = 5 k\u03a9 at Rf = 45 k\u03a9. Kung ang input boltahe ay Vin = 0.2 V, ano ang Vout?",
      "options": [
        "1.8 V",
        "2.0 V",
        "2.2 V",
        "0.9 V"
      ],
      "correctIndex": 1,
      "explanation": "Av = 1 + (Rf / R1) = 1 + (45k / 5k) = 1 + 9 = 10. Pagkatapos, Vout = 10 * 0.2 V = 2.0 V."
    },
    {
      "id": "fmss-mcq-46",
      "type": "mcq",
      "question": "[Kalkulasyon - Ultrasonic Time] Kung ang target na bagay ay nasa layong 1.7 metro mula sa ultrasonic sensor (sound speed = 340 m/s), gaano katagal ang aabutin bago bumalik ang echo sa sensor?",
      "options": [
        "5 ms",
        "10 ms",
        "20 ms",
        "15 ms"
      ],
      "correctIndex": 1,
      "explanation": "Kabuuang distansya (round trip) = 2 * 1.7 m = 3.4 m. Oras t = d / v = 3.4 m / (340 m/s) = 0.010 segundo = 10 milliseconds."
    },
    {
      "id": "fmss-mcq-47",
      "type": "mcq",
      "question": "[Kalkulasyon - Difference Amplifier] Sa isang balanced difference amplifier kung saan R1 = R3 = 10 k\u03a9 at Rf = R2 = 50 k\u03a9, ang differential gain ay Ad = Rf / R1 = 5. Kung V1 = 2.1 V at V2 = 2.5 V, ano ang Vout?",
      "options": [
        "1.0 V",
        "2.0 V",
        "0.4 V",
        "-2.0 V"
      ],
      "correctIndex": 1,
      "explanation": "Vout = (Rf / R1) * (V2 - V1) = 5 * (2.5 V - 2.1 V) = 5 * 0.4 V = 2.0 V."
    },
    {
      "id": "fmss-mcq-48",
      "type": "mcq",
      "question": "[Kalkulasyon - Full Power Bandwidth] Kung ang isang op-amp ay may Slew Rate na SR = 0.5 V/\u00b5s (0.5 x 10^6 V/s) at nais nating maglabas ng sine wave na may peak voltage na Vp = 10 V, ano ang maximum undistorted frequency (fmax)?",
      "options": [
        "7.96 kHz",
        "15.9 kHz",
        "79.6 kHz",
        "1.59 kHz"
      ],
      "correctIndex": 0,
      "explanation": "fmax = SR / (2 * \u03c0 * Vp) = (0.5 x 10^6) / (2 * 3.14159 * 10) = 500,000 / 62.8318 \u2248 7,958 Hz o 7.96 kHz."
    },
    {
      "id": "fmss-mcq-49",
      "type": "mcq",
      "question": "Alin sa mga sumusunod ang halimbawa ng NON-LINEAR processing circuit na gumagamit ng operational amplifier ayon sa Unit 1?",
      "options": [
        "Summing amplifier",
        "Instrumentation amplifier",
        "Precision Rectifier at Comparator",
        "Differentiator"
      ],
      "correctIndex": 2,
      "explanation": "Ayon sa FMSS manual, ang Non-Linear Processing Circuits ay kinabibilangan ng: 1. Precision rectifier, 2. Peak detector, 3. Comparator, at 4. Sample-and-Hold amplifier."
    },
    {
      "id": "fmss-mcq-50",
      "type": "mcq",
      "question": "Aling active filter topology ang kilala at kabilang sa mga linear op-amp applications sa FMSS?",
      "options": [
        "Sallen-Key Network",
        "Hartley Tank",
        "Colpitts Bridge",
        "Class E Network"
      ],
      "correctIndex": 0,
      "explanation": "Ang Sallen-Key Network, Multiple-Feedback Network, State-Variable Filter, at Twin-T Filters ay ang mga pangunahing Active Filters na nakatala sa syllabus."
    },
    {
      "id": "fmss-mcq-51",
      "type": "mcq",
      "question": "Aling waveform generator circuit na gumagamit ng op-amp ang naglalabas ng napakalinis na sine wave gamit ang lead-lag RC bridge network?",
      "options": [
        "Wien-Bridge Oscillator",
        "Square-wave generator",
        "Precision clamper",
        "Schmitt trigger"
      ],
      "correctIndex": 0,
      "explanation": "Ang Wien-bridge oscillator ay karaniwang ginagamit para sa audio-frequency sine wave generation dahil sa mataas nitong stability at low distortion."
    },
    {
      "id": "fmss-mcq-52",
      "type": "mcq",
      "question": "Ano ang 'Input Bias Current' (Ib) ng isang praktikal na op-amp?",
      "options": [
        "Ang average ng dalawang DC currents na dumadaloy papasok sa inverting at non-inverting input terminals",
        "Ang current na dumadaloy palabas ng Pin 6",
        "Ang current na kailangan para buksan ang output relay",
        "Ang leakage current sa pagitan ng Pin 4 at Pin 7"
      ],
      "correctIndex": 0,
      "explanation": "Ib = (Ib+ + Ib-) / 2. Ito ang DC base/gate current na kailangan ng input differential transistors ng op-amp upang gumana nang maayos."
    },
    {
      "id": "fmss-mcq-53",
      "type": "mcq",
      "question": "Ano ang 'Input Offset Current' (Ios) ng isang op-amp?",
      "options": [
        "Ang pagkakaiba sa pagitan ng dalawang input bias currents (|Ib+ - Ib-|)",
        "Ang kabuuan ng supply currents",
        "Ang short-circuit current sa Pin 6",
        "Ang current sa pamamagitan ng feedback resistor"
      ],
      "correctIndex": 0,
      "explanation": "Input Offset Current (Ios = |Ib+ - Ib-|) ay ang pagkakaiba ng dalawang input currents dahil sa bahagyang mismatch ng internal input transistors."
    },
    {
      "id": "fmss-mcq-54",
      "type": "mcq",
      "question": "Ano ang operating temperature range ng standard commercial-grade LM741 op-amp?",
      "options": [
        "0\u00b0C hanggang 70\u00b0C o -40\u00b0C hanggang 85\u00b0C",
        "-273\u00b0C hanggang 100\u00b0C",
        "100\u00b0C hanggang 500\u00b0C",
        "Walang limitasyon"
      ],
      "correctIndex": 0,
      "explanation": "Ang commercial at industrial grade 741 ay karaniwang nagpapatakbo sa -40\u00b0C hanggang 85\u00b0C (o 0\u00b0C to 70\u00b0C), habang ang military-grade (LM741A) ay -55\u00b0C hanggang 125\u00b0C."
    },
    {
      "id": "fmss-mcq-55",
      "type": "mcq",
      "question": "Anong uri ng sensor ang gumagamit ng optical spectral range mula ultraviolet (UV) hanggang far infrared?",
      "options": [
        "Light Sensitive Sensor",
        "Digital Tilt Sensor",
        "Ultrasonic Sensor",
        "Capacitive Touch Sensor"
      ],
      "correctIndex": 0,
      "explanation": "Ayon sa Unit 2.1, ang Light Sensitive Sensor ay isang electromagnetic radiation detector na sumasaklaw mula UV hanggang far infrared spectral range."
    },
    {
      "id": "fmss-mcq-56",
      "type": "mcq",
      "question": "Alin sa mga sumusunod ang kabilang sa Buffer Memory sa ilalim ng RAM architecture?",
      "options": [
        "Caches, Buffers, at Scratchpad memory",
        "EEPROM chips",
        "Hard disk drives",
        "Punched cards"
      ],
      "correctIndex": 0,
      "explanation": "Sa Unit 2.1, ang Buffer Memory sa ilalim ng RAM ay binubuo ng: 1. Caches, 2. Buffers, at 3. Scratchpad memory."
    },
    {
      "id": "fmss-mcq-57",
      "type": "mcq",
      "question": "Ano ang teknolohiya kung saan ang mga tunog, salita, o parirala na binibigkas ng tao ay iko-convert sa electrical signals upang makilala ng system?",
      "options": [
        "Voice Recognition",
        "Ultrasonic Ranging",
        "Capacitive Coupling",
        "RFID Ping"
      ],
      "correctIndex": 0,
      "explanation": "Ayon sa Unit 2.1, ang Voice Recognition ay nagko-convert ng spoken sounds o words sa electrical signals para sa digital processing."
    },
    {
      "id": "fmss-mcq-58",
      "type": "mcq",
      "question": "Anong uri ng sensor ang nagbibigay ng feedback sa system controller upang makagawa ito ng tamang desisyon sa pagpapainit o pagpapalamig?",
      "options": [
        "Temperature Sensor",
        "Line-Tracking Sensor",
        "Tilt Sensor",
        "RFID Reader"
      ],
      "correctIndex": 0,
      "explanation": "Ang Temperature Sensor ay nagbibigay ng temperature feedback sa system controller para sa closed-loop decision making."
    },
    {
      "id": "fmss-mcq-59",
      "type": "mcq",
      "question": "Bakit napakahalaga ng Sample-and-Hold (S/H) amplifier sa mixed-signal Analog-to-Digital conversion?",
      "options": [
        "Pinapanatili nitong pareho ang analog voltage sa panahon ng conversion upang hindi magbago habang sinusukat ng ADC",
        "Ibinababa nito ang frequency sa zero permanently",
        "Pinapabilis nito ang takbo ng fan",
        "Tinatanggal nito ang pangangailangan para sa power supply"
      ],
      "correctIndex": 0,
      "explanation": "Sa ADC conversion, kailangan ng sampling capacitor at buffer (Sample-and-Hold) upang manatiling matatag ang boltahe habang ikinukumpas ng ADC ang digital quantization."
    },
    {
      "id": "fmss-mcq-60",
      "type": "mcq",
      "question": "Ano ang nangyayari kapag ang isang op-amp ay pinatakbo sa 'Open-Loop' mode nang walang anumang negative feedback resistor?",
      "options": [
        "Gagana ito bilang Voltage Comparator na madaling mag-saturate sa +Vsat o -Vsat",
        "Gagana ito bilang eksaktong unity-gain buffer",
        "Laging magiging 0V ang output",
        "Sasabog agad ang op-amp"
      ],
      "correctIndex": 0,
      "explanation": "Dahil sa napakataas na open-loop gain (Avol \u2265 200,000), kahit ilang microvolts lamang na pagkakaiba sa inputs ay magdudulot agad ng saturation sa positive o negative rail (+Vsat / -Vsat). Ito ang prinsipyo ng Comparator."
    },
    {
      "id": "fmss-tf-1",
      "type": "tf",
      "question": "Ang isang ideal operational amplifier ay may zero input impedance at infinite output impedance.",
      "answer": false,
      "explanation": "MALI. Baligtad ito: Ang ideal op-amp ay may INFINITE input impedance (Zin = \u221e) at ZERO output impedance (Zout = 0 \u03a9)."
    },
    {
      "id": "fmss-tf-2",
      "type": "tf",
      "question": "Sa ilalim ng negative feedback, ang boltahe sa inverting input terminal (Pin 2) ay halos kapantay ng boltahe sa non-inverting input terminal (Pin 3) dahil sa napakataas na open-loop gain.",
      "answer": true,
      "explanation": "TAMA. Ito ang pundasyon ng 'Virtual Short' concept (V+ \u2248 V-) sa linear operation ng op-amp."
    },
    {
      "id": "fmss-tf-3",
      "type": "tf",
      "question": "Ang output terminal (Pin 6) ng LM741 op-amp ay may proteksyon laban sa short-circuit at maaaring i-short sa ground nang walang takdang tagal (indefinitely) nang hindi nasisira.",
      "answer": true,
      "explanation": "TAMA. Ayon sa maximum ratings ng 741 datasheet, ang output short-circuit duration ay 'Indefinite' dahil sa internal current-limiting protection."
    },
    {
      "id": "fmss-tf-4",
      "type": "tf",
      "question": "Ang voltage gain ng isang standard non-inverting amplifier ay maaaring maging mas mababa sa 1.",
      "answer": false,
      "explanation": "MALI. Ang gain ng non-inverting amplifier ay Av = 1 + (Rf / R1). Dahil ang Rf at R1 ay positibong resistances, ang pinakamababang posibleng gain ay Av = 1 (kapag Rf = 0, voltage follower)."
    },
    {
      "id": "fmss-tf-5",
      "type": "tf",
      "question": "Ang Slew Rate ng isang op-amp ay sumusukat sa pinakamababang boltaheng kayang ma-detect ng differential input.",
      "answer": false,
      "explanation": "MALI. Ang Slew Rate ay ang time rate of change ng output voltage (dVout/dt), sinusukat sa V/\u00b5s, na nagtatakda kung gaano kabilis makakasunod ang output sa mabilis na pagbabago ng input."
    },
    {
      "id": "fmss-tf-6",
      "type": "tf",
      "question": "Ang Common-Mode Rejection Ratio (CMRR) ng isang ideal operational amplifier ay infinite (walang hanggan).",
      "answer": true,
      "explanation": "TAMA. Sa ideal op-amp, CMRR = \u221e, na nangangahulugang perpektong tinatanggihan ang anumang ingay o signal na parehong nasa inverting at non-inverting inputs."
    },
    {
      "id": "fmss-tf-7",
      "type": "tf",
      "question": "Ang Pin 8 sa isang standard LM741 8-pin DIP integrated circuit ay ginagamit para sa panlabas na clock generator.",
      "answer": false,
      "explanation": "MALI. Ang Pin 8 ng LM741 ay NC (No Connection) at walang kinalaman sa clock signal."
    },
    {
      "id": "fmss-tf-8",
      "type": "tf",
      "question": "Ang Flame Sensor ay sensitibo sa ultraviolet light sa 100-200 nm range lamang.",
      "answer": false,
      "explanation": "MALI. Ayon sa FMSS curriculum, ang karaniwang flame sensor ay nagde-detect ng infrared light wavelength sa 760\u20131100 nm na inilalabas ng apoy."
    },
    {
      "id": "fmss-tf-9",
      "type": "tf",
      "question": "Ang Hall Effect sensor ay isang omni-polar magnetic sensor na ginagamit upang matukoy ang presensya ng magnetic fields o magnetic objects.",
      "answer": true,
      "explanation": "TAMA. Ang Hall effect sensor ay gumagana batay sa Lorentz force sa dumadaloy na electrons kapag may magnetic field."
    },
    {
      "id": "fmss-tf-10",
      "type": "tf",
      "question": "Ang ROM (Read-Only Memory) ay isang halimbawa ng volatile memory kung saan nabubura ang data sa sandaling mawalan ng kuryente.",
      "answer": false,
      "explanation": "MALI. Ang ROM ay NON-VOLATILE memory (nananatili ang data kahit walang kuryente). Ang RAM ang volatile."
    },
    {
      "id": "fmss-tf-11",
      "type": "tf",
      "question": "Ang isang ultrasonic sensor ay nagkakalkula ng distansya batay sa Time-of-Flight (ToF) ng sonar sound wave mula sa transmitter patungo sa target at pabalik sa receiver.",
      "answer": true,
      "explanation": "TAMA. Ang pormula ay Distance = (Speed of Sound * Time) / 2."
    },
    {
      "id": "fmss-tf-12",
      "type": "tf",
      "question": "Kahit anong laki ng input signal sa isang op-amp, hindi maaaring lumampas ang magnitude ng output voltage sa supply rails (+Vcc at -Vee).",
      "answer": true,
      "explanation": "TAMA. Kapag naabot na ng theoretical Vout ang supply limits, magaganap ang saturation (clipping) sa humigit-kumulang Vcc - 1V hanggang 2V para sa standard op-amps tulad ng 741."
    },
    {
      "id": "fmss-tf-13",
      "type": "tf",
      "question": "Ang Line-Tracking Sensor ay naglalabas ng TTL (Transistor-Transistor Logic) signal upang matukoy ang itim na linya sa puting background o puti sa itim.",
      "answer": true,
      "explanation": "TAMA. Gumagamit ito ng infrared reflectance at naglalabas ng binary/TTL logic levels (HIGH/LOW)."
    },
    {
      "id": "fmss-tf-14",
      "type": "tf",
      "question": "Noong 1963, ang unang commercially available monolithic operational amplifier (\u00b5A702) ay dinisenyo ni Bob Widlar sa Fairchild Semiconductor.",
      "answer": true,
      "explanation": "TAMA. Si Bob Widlar ang lumikha ng \u00b5A702 noong 1963 at \u00b5A709 noong 1965 sa Fairchild Semiconductor."
    },
    {
      "id": "fmss-tf-15",
      "type": "tf",
      "question": "Ang isang Voltage Follower circuit ay may mataas na voltage gain ngunit mababang current gain.",
      "answer": false,
      "explanation": "MALI. Ang Voltage Follower ay may voltage gain na Av = 1, ngunit may napakataas na current at power gain kaya ito ay mainam na impedance matching buffer."
    },
    {
      "id": "fmss-tf-16",
      "type": "tf",
      "question": "Ang isang operational amplifier na pinapagana sa open-loop configuration ay kumikilos bilang isang analog multiplier.",
      "answer": false,
      "explanation": "MALI. Sa open-loop configuration, dahil sa napakalaking gain, kumikilos ito bilang Voltage Comparator (detecting whether V+ > V-)."
    },
    {
      "id": "fmss-tf-17",
      "type": "tf",
      "question": "Sa isang inverting amplifier, ang non-inverting input terminal (Pin 3) ay karaniwang nakakabit sa ground, kaya ang inverting input terminal (Pin 2) ay tinatawag na Virtual Ground.",
      "answer": true,
      "explanation": "TAMA. Dahil V+ = 0V (ground) at V+ \u2248 V- sa ilalim ng negative feedback, ang V- ay nasa 0V din (Virtual Ground) kahit hindi nakadikit sa ground wire."
    },
    {
      "id": "fmss-tf-18",
      "type": "tf",
      "question": "Ang probability ng communication errors sa datapath communication ay maaaring makalkula gamit ang mga pamamaraan sa communication theory.",
      "answer": true,
      "explanation": "TAMA. Ayon sa Unit 2.1, ang probability ng errors sa wired, wireless, o optical media ay kinakalkula gamit ang communication theory."
    },
    {
      "id": "fmss-tf-19",
      "type": "tf",
      "question": "Ang feedback resistor (Rf) sa isang non-inverting amplifier ay nagdudulot ng 180-degree phase inversion sa output waveform.",
      "answer": false,
      "explanation": "MALI. Sa non-inverting amplifier, in-phase (0\u00b0 phase shift) ang output at input. Ang inverting amplifier ang nagdudulot ng 180\u00b0 phase inversion."
    },
    {
      "id": "fmss-tf-20",
      "type": "tf",
      "question": "Ang processor registers at main working memory ay parehong nasa ilalim ng kategoryang RAM (Random Access Memory).",
      "answer": true,
      "explanation": "TAMA. Ayon sa Unit 2.1 Memory Block, ang processor registers, working memory (main RAM), at buffer memory ay pawang mga uri sa ilalim ng RAM."
    },
    {
      "id": "fmss-id-1",
      "type": "id",
      "question": "Anong IC chip ang itinuturing na 'industry standard' na 8-pin operational amplifier na ipinakilala ng Fairchild Semiconductor noong 1967?",
      "answer": "741",
      "acceptableAnswers": [
        "LM741",
        "uA741",
        "\u00b5A741",
        "741 op-amp",
        "741 op amp",
        "741 opamp"
      ],
      "hint": "Karaniwang 3-digit number na nagsisimula sa 7"
    },
    {
      "id": "fmss-id-2",
      "type": "id",
      "question": "Ano ang tawag sa electronic circuit na kumukuha ng mahinang signal mula sa sensor at pinapalakas ang voltage, current, o power nito?",
      "answer": "Amplifier",
      "acceptableAnswers": [
        "Amplifiers",
        "Pampalakas",
        "Amp"
      ],
      "hint": "Nagsisimula sa titik 'A'"
    },
    {
      "id": "fmss-id-3",
      "type": "id",
      "question": "Anong pin sa 8-pin DIP package ng LM741 ang nagbibigay ng output voltage (Vout)?",
      "answer": "Pin 6",
      "acceptableAnswers": [
        "6",
        "Pin6"
      ],
      "hint": "Nasa pagitan ng Pin 5 at Pin 7"
    },
    {
      "id": "fmss-id-4",
      "type": "id",
      "question": "Anong pin sa LM741 ang nakalaan para sa Inverting Input terminal (V-)?",
      "answer": "Pin 2",
      "acceptableAnswers": [
        "2",
        "Pin2"
      ],
      "hint": "Katabi ng Pin 1 at Pin 3"
    },
    {
      "id": "fmss-id-5",
      "type": "id",
      "question": "Anong pin sa LM741 ang nakalaan para sa Non-Inverting Input terminal (V+)?",
      "answer": "Pin 3",
      "acceptableAnswers": [
        "3",
        "Pin3"
      ],
      "hint": "Kasunod ng Inverting pin"
    },
    {
      "id": "fmss-id-6",
      "type": "id",
      "question": "Ano ang tawag sa rate of change ng output voltage sa paglipas ng panahon na sinusukat sa V/\u00b5s?",
      "answer": "Slew Rate",
      "acceptableAnswers": [
        "Slew-rate",
        "SR"
      ],
      "hint": "Dalawang salita, acronym ay SR"
    },
    {
      "id": "fmss-id-7",
      "type": "id",
      "question": "Anong sensor ang sumusukat ng magnetic field gamit ang Lorentz force sa dumadaloy na charge carriers?",
      "answer": "Hall Effect Sensor",
      "acceptableAnswers": [
        "Hall Sensor",
        "Hall-effect sensor",
        "Hall Effect"
      ],
      "hint": "Ipinangalan kay Edwin Hall"
    },
    {
      "id": "fmss-id-8",
      "type": "id",
      "question": "Anong sensor ang gumagamit ng sonar sound waves upang kalkulahin ang distansya ng isang bagay?",
      "answer": "Ultrasonic Sensor",
      "acceptableAnswers": [
        "Ultrasonic",
        "Sonar Sensor",
        "Sonar"
      ],
      "hint": "Nagsisimula sa 'Ultra-'"
    },
    {
      "id": "fmss-id-9",
      "type": "id",
      "question": "Ano ang acronym para sa ratio na sumusukat sa kakayahan ng op-amp na tanggihan ang common-mode signals sa dalawang inputs?",
      "answer": "CMRR",
      "acceptableAnswers": [
        "Common-Mode Rejection Ratio",
        "Common Mode Rejection Ratio"
      ],
      "hint": "4 na titik, nagsisimula sa C"
    },
    {
      "id": "fmss-id-10",
      "type": "id",
      "question": "Anong uri ng op-amp circuit ang may closed-loop gain na Av = 1 at ginagamit para sa impedance isolation?",
      "answer": "Voltage Follower",
      "acceptableAnswers": [
        "Unity Gain Buffer",
        "Buffer",
        "Buffer Amplifier",
        "Voltage buffer"
      ],
      "hint": "Tinatawag ding unity-gain buffer"
    },
    {
      "id": "fmss-id-11",
      "type": "id",
      "question": "Sino ang Amerikanong circuit designer na lumikha ng \u00b5A702 at \u00b5A709 sa Fairchild Semiconductor?",
      "answer": "Bob Widlar",
      "acceptableAnswers": [
        "Widlar",
        "Robert Widlar"
      ],
      "hint": "Unang pangalan ay Bob"
    },
    {
      "id": "fmss-id-12",
      "type": "id",
      "question": "Anong uri ng sensor ang gumagamit ng mercury o gumugulong na metal ball sa loob upang matukoy ang pagkiling ng aparato?",
      "answer": "Digital Tilt Sensor",
      "acceptableAnswers": [
        "Tilt Sensor",
        "Tilt Switch",
        "Digital tilt switch"
      ],
      "hint": "Nagsisimula sa salitang 'Tilt'"
    },
    {
      "id": "fmss-id-13",
      "type": "id",
      "question": "Anong teknolohiya ang ginagamit para sa pagkilala o identification gamit ang tugon ng isang tag sa radio frequency waves?",
      "answer": "RFID",
      "acceptableAnswers": [
        "Radio Frequency Identification",
        "Radio-Frequency Identification"
      ],
      "hint": "4 na titik acronym na ginagamit sa smart cards at tollways"
    },
    {
      "id": "fmss-id-14",
      "type": "id",
      "question": "Anong pin sa 741 Op-Amp ang kumakatawan sa positibong power supply rail (+Vcc)?",
      "answer": "Pin 7",
      "acceptableAnswers": [
        "7",
        "Pin7"
      ],
      "hint": "Katabi ng output pin sa itaas na hilera"
    },
    {
      "id": "fmss-id-15",
      "type": "id",
      "question": "Anong pin sa 741 Op-Amp ang kumakatawan sa negatibong power supply rail (-Vee)?",
      "answer": "Pin 4",
      "acceptableAnswers": [
        "4",
        "Pin4"
      ],
      "hint": "Nasa ibabang sulok katabi ng Pin 3"
    },
    {
      "id": "fmss-id-16",
      "type": "id",
      "question": "Ano ang tawag sa circuit na binubuo ng capacitor at switch na nag-iingat ng analog voltage level habang nagko-convert ang ADC?",
      "answer": "Sample-and-Hold",
      "acceptableAnswers": [
        "Sample and Hold",
        "S/H",
        "Sample and hold amplifier",
        "Sample-and-hold amplifier"
      ],
      "hint": "May acronym na S/H"
    },
    {
      "id": "fmss-id-17",
      "type": "id",
      "question": "Anong uri ng sensor ang ginagamit sa robotics upang matukoy ang itim na linya sa puting sahig o puting linya sa itim?",
      "answer": "Line-Tracking Sensor",
      "acceptableAnswers": [
        "Line Tracking Sensor",
        "Line tracking",
        "Line follower sensor"
      ],
      "hint": "Line-..."
    },
    {
      "id": "fmss-id-18",
      "type": "id",
      "question": "Ano ang tawag sa variable resistor na ikinakabit sa Pin 1 at Pin 5 ng 741 upang i-zero ang input offset voltage?",
      "answer": "Potentiometer",
      "acceptableAnswers": [
        "Pot",
        "Trimmer",
        "Trimpot"
      ],
      "hint": "3-terminal variable resistor"
    },
    {
      "id": "fmss-id-19",
      "type": "id",
      "question": "Ano ang pangunahing non-linear application ng op-amp na naghahambing ng dalawang boltahe at naglalabas ng digital HIGH o LOW?",
      "answer": "Comparator",
      "acceptableAnswers": [
        "Voltage Comparator",
        "Paghahambing"
      ],
      "hint": "Nagsisimula sa 'Comp-'"
    },
    {
      "id": "fmss-id-20",
      "type": "id",
      "question": "Anong uri ng memory ang nagpapanatili ng nilalaman kahit walang kuryente at ginagamit para sa BIOS o firmware?",
      "answer": "ROM",
      "acceptableAnswers": [
        "Read-Only Memory",
        "Read Only Memory",
        "Flash ROM"
      ],
      "hint": "3-titik acronym, kabaligtaran ng RAM"
    },
    {
      "id": "fmss-match-1",
      "type": "matching",
      "title": "Op-Amp Pins & Terminal Functions (LM741 DIP-8)",
      "pairs": [
        {
          "term": "Pin 2",
          "definition": "Inverting Input Terminal (V-)"
        },
        {
          "term": "Pin 3",
          "definition": "Non-Inverting Input Terminal (V+)"
        },
        {
          "term": "Pin 4",
          "definition": "Negative Power Supply Rail (-Vee)"
        },
        {
          "term": "Pin 6",
          "definition": "Single-Ended Output Terminal (Vout)"
        },
        {
          "term": "Pin 7",
          "definition": "Positive Power Supply Rail (+Vcc)"
        }
      ]
    },
    {
      "id": "fmss-match-2",
      "type": "matching",
      "title": "Op-Amp Circuit Topologies & Voltage Gain Formulas",
      "pairs": [
        {
          "term": "Inverting Amplifier",
          "definition": "Av = - (Rf / Rin) na may 180\u00b0 phase inversion"
        },
        {
          "term": "Non-Inverting Amplifier",
          "definition": "Av = 1 + (Rf / R1) nang walang phase shift"
        },
        {
          "term": "Voltage Follower",
          "definition": "Av = 1 (Vout = Vin) para sa impedance isolation"
        },
        {
          "term": "Summing Amplifier",
          "definition": "Vout = -Rf * (V1/R1 + V2/R2 + ...)"
        },
        {
          "term": "Open-Loop Comparator",
          "definition": "Vout = \u00b1Vsat depende kung mas mataas ang V+ o V-"
        }
      ]
    },
    {
      "id": "fmss-match-3",
      "type": "matching",
      "title": "Sensors and Their Operating Principles",
      "pairs": [
        {
          "term": "Hall Effect Sensor",
          "definition": "Deteksyon ng magnetic objects gamit ang Lorentz force"
        },
        {
          "term": "Ultrasonic Sensor",
          "definition": "Pagsukat ng distansya gamit ang Time-of-Flight ng sonar"
        },
        {
          "term": "Capacitive Touch",
          "definition": "Pagbabago ng dielectric capacitance kapag lumapit ang daliri"
        },
        {
          "term": "Flame Sensor",
          "definition": "Pagtukoy ng apoy sa 760-1100 nm infrared wavelength"
        },
        {
          "term": "Accelerometer",
          "definition": "Pagsukat ng static at dynamic acceleration sa X, Y, Z"
        }
      ]
    },
    {
      "id": "fmss-match-4",
      "type": "matching",
      "title": "Ideal vs. Practical Op-Amp Characteristics",
      "pairs": [
        {
          "term": "Open-Loop Gain (Avol)",
          "definition": "Ideal: Walang hanggan (\u221e) | Praktikal 741: ~200,000"
        },
        {
          "term": "Input Impedance (Zin)",
          "definition": "Ideal: Walang hanggan (\u221e) | Praktikal 741: ~2 Megaohms"
        },
        {
          "term": "Output Impedance (Zout)",
          "definition": "Ideal: Zero (0 \u03a9) | Praktikal 741: ~75 Ohms"
        },
        {
          "term": "Slew Rate (SR)",
          "definition": "Ideal: Walang hanggan (\u221e) | Praktikal 741: ~0.5 V/\u00b5s"
        },
        {
          "term": "Input Offset Voltage (Vos)",
          "definition": "Ideal: Zero (0 V) | Praktikal 741: ~1 hanggang 5 mV"
        }
      ]
    }
  ],
  "flashcards": [
    {
      "id": "fmss-fc-1",
      "front": "Ano ang tatlong ginintuang panuntunan (Golden Rules) ng isang Ideal Op-Amp?",
      "back": "1. Walang current na pumapasok sa alinmang input terminal (I+ = I- = 0 dahil Zin = \u221e).\n2. Kapag may negative feedback at linear ang circuit, V+ = V- (Virtual Short / Virtual Ground).\n3. Zero output impedance (Zout = 0 \u03a9).",
      "hint": "Zin = \u221e, Iin = 0, at V+ = V-"
    },
    {
      "id": "fmss-fc-2",
      "front": "Pormula: Inverting Amplifier Voltage Gain at Output",
      "back": "Gain: Av = - (Rf / Rin)\nOutput: Vout = - (Rf / Rin) * Vin\n\nTandaan: May 180\u00b0 phase inversion kaya baligtad ang sign ng output kumpara sa input.",
      "hint": "Av = -Rf / Rin"
    },
    {
      "id": "fmss-fc-3",
      "front": "Pormula: Non-Inverting Amplifier Voltage Gain at Output",
      "back": "Gain: Av = 1 + (Rf / R1)\nOutput: Vout = [1 + (Rf / R1)] * Vin\n\nTandaan: Walang phase shift (in-phase ang output at input) at ang gain ay laging \u2265 1.",
      "hint": "Av = 1 + (Rf / R1)"
    },
    {
      "id": "fmss-fc-4",
      "front": "Pinout: 8 Pins ng Standard LM741 Op-Amp",
      "back": "Pin 1: Offset Null\nPin 2: Inverting Input (V-)\nPin 3: Non-Inverting Input (V+)\nPin 4: -Vee (Negative Supply Rail)\nPin 5: Offset Null\nPin 6: Output (Vout)\nPin 7: +Vcc (Positive Supply Rail)\nPin 8: NC (No Connection)",
      "hint": "Inputs: Pin 2 at 3 | Output: Pin 6 | Supply: Pin 4 at 7"
    },
    {
      "id": "fmss-fc-5",
      "front": "Ano ang Slew Rate (SR) at paano ito nakakaapekto sa high-frequency signals?",
      "back": "Ang Slew Rate (SR = dV/dt) ay ang maximum rate ng pagbabago ng output voltage kada microsecond (sa 741: 0.5 V/\u00b5s).\n\nKapag ang input frequency ay lumampas sa full-power bandwidth (fmax = SR / (2\u03c0 * Vp)), ang sine wave ay nagiging triangular wave dahil sa slew-rate distortion.",
      "hint": "dV/dt nasusukat sa V/\u00b5s"
    },
    {
      "id": "fmss-fc-6",
      "front": "Ano ang Common-Mode Rejection Ratio (CMRR)?",
      "back": "CMRR = |Ad / Acm| o sa decibels: 20 * log10(|Ad / Acm|).\n\nIto ang sukatan ng kahusayan ng op-amp na magpalakas ng differential signal (Ad) habang tinatanggihan ang common-mode noise (Acm) tulad ng 60Hz power line hum.",
      "hint": "Ad / Acm sa decibels"
    },
    {
      "id": "fmss-fc-7",
      "front": "Ano ang Rail-to-Rail vs. Standard Op-Amp Saturation?",
      "back": "Standard Op-Amp (tulad ng 741): Ang output ay nagka-clip sa humigit-kumulang 1V hanggang 2V sa ilalim ng supply rails (hal. \u00b115V supply \u2192 Vsat \u2248 \u00b113.5V to \u00b114V).\n\nRail-to-Rail Op-Amp: Ang output ay kayang umabot sa halos kapantay ng supply voltage mismo (hal. 0V hanggang 5V).",
      "hint": "Vout clipping sa supply rails"
    },
    {
      "id": "fmss-fc-8",
      "front": "Paano kinakalkula ang distansya gamit ang Ultrasonic Sensor?",
      "back": "Pormula: Distance = (Speed of Sound * Time) / 2\n\nKung v = 340 m/s at ang echo time ay t:\nDistance (m) = (340 * t) / 2 = 170 * t\n\nHinahati sa 2 dahil ang tunog ay naglakbay papunta at pabalik mula sa target.",
      "hint": "d = (v * t) / 2"
    },
    {
      "id": "fmss-fc-9",
      "front": "Ano ang papel ng Analog Front-End (AFE) sa Mixed-Signal Systems?",
      "back": "Ang AFE ay binubuo ng amplifiers, filters, at conditioning circuits na naglilinis, nag-i-scale, at nag-aalis ng noise sa mahinang analog sensor signal bago ito ipasok sa Analog-to-Digital Converter (ADC).",
      "hint": "Paghahanda ng analog signal para sa ADC"
    },
    {
      "id": "fmss-fc-10",
      "front": "Ano ang pagkakaiba ng ROM at RAM sa memory architecture?",
      "back": "ROM (Read-Only Memory): Non-volatile (hindi nabubura kahit mawalan ng kuryente), naglalaman ng permanent/embedded startup firmware.\n\nRAM (Random Access Memory): Volatile (nabubura kapag nawalan ng kuryente), nagsisilbing high-speed working memory, registers, at caches.",
      "hint": "Non-volatile vs. Volatile"
    },
    {
      "id": "fmss-fc-11",
      "front": "Paano gumagana ang Hall Effect Sensor sa detection ng magnetic fields?",
      "back": "Kapag may dumaang magnetic field perpendicular sa semiconductor strip na may kuryente, inililihis ng Lorentz force ang electrons sa isang gilid. Lumilikha ito ng measurable potential difference na tinatawag na Hall Voltage (VH).",
      "hint": "Lorentz force sa charge carriers"
    },
    {
      "id": "fmss-fc-12",
      "front": "Ano ang Voltage Follower (Buffer) at kailan ito kailangan?",
      "back": "Ang Voltage Follower ay may Av = 1 (Vout = Vin). Mayroon itong napakataas na Zin at napakababang Zout.\n\nKailangan ito kapag ang signal source o sensor ay may mataas na output impedance (mahina ang drive capability) upang maiwasan ang boltaheng bumagsak kapag ikinabit ang sumunod na circuit (Loading Effect).",
      "hint": "Av = 1, panlaban sa loading effect"
    },
    {
      "id": "fmss-fc-13",
      "front": "Ano ang Sallen-Key Active Filter?",
      "back": "Isang sikat na active filter topology na gumagamit ng isang op-amp at passive RC components para bumuo ng 2nd-order Low-Pass, High-Pass, o Band-Pass filter na may mataas na Q-factor at madaling i-tune.",
      "hint": "2nd-order active filter"
    },
    {
      "id": "fmss-fc-14",
      "front": "Pormula: Closed-Loop Bandwidth ng Op-Amp",
      "back": "Gain-Bandwidth Product (GBWP) = Acl * fcl = parehong constant.\n\nHalimbawa: Kung ang 741 ay may GBWP = 1 MHz:\n- Kapag ang gain ay Av = 10, ang bandwidth ay 100 kHz.\n- Kapag ang gain ay Av = 100, ang bandwidth ay bababa sa 10 kHz.",
      "hint": "GBWP = Gain * Bandwidth"
    },
    {
      "id": "fmss-fc-15",
      "front": "Ano ang Summing Amplifier at ano ang pormula nito?",
      "back": "Ang Inverting Summing Amplifier ay pinagsasama ang maraming input voltages:\nVout = -Rf * (V1/R1 + V2/R2 + V3/R3 + ...)\n\nKapag pare-pareho ang resistors (R1 = R2 = Rf), Vout = -(V1 + V2 + V3) na nagsisilbing analog adder.",
      "hint": "Analog addition circuit"
    },
    {
      "id": "fmss-fc-16",
      "front": "Bakit kailangan ng Differential / Instrumentation Amplifier sa Bridge Sensors?",
      "back": "Ang Wheatstone bridge sensors (tulad ng strain gauges) ay naglalabas ng napakaliit na differential voltage na nakalutang sa malaking common-mode DC offset. Tanging ang Instrumentation Amplifier ang may kakayahang palakasin ang maliit na differential signal habang tinatapon ang common-mode voltage dahil sa napakataas nitong CMRR.",
      "hint": "High CMRR para sa strain gauge bridges"
    },
    {
      "id": "fmss-fc-17",
      "front": "Ano ang Decibel (dB) formula para sa Voltage Gain?",
      "back": "Gain sa Decibels: Av(dB) = 20 * log10(Vout / Vin)\n\nMahahalagang puntos:\n- 0 dB = Gain ng 1 (Unity)\n- +20 dB = Gain ng 10\n- +40 dB = Gain ng 100\n- +60 dB = Gain ng 1,000\n- -3 dB = Cutoff frequency kung saan ang boltahe ay bumababa sa 70.7% (1/\u221a2).",
      "hint": "20 * log10(Av)"
    }
  ],
  "matching": [
    {
      "id": "fmss-match-1",
      "type": "matching",
      "title": "Op-Amp Pins & Terminal Functions (LM741 DIP-8)",
      "pairs": [
        {
          "term": "Pin 2",
          "definition": "Inverting Input Terminal (V-)"
        },
        {
          "term": "Pin 3",
          "definition": "Non-Inverting Input Terminal (V+)"
        },
        {
          "term": "Pin 4",
          "definition": "Negative Power Supply Rail (-Vee)"
        },
        {
          "term": "Pin 6",
          "definition": "Single-Ended Output Terminal (Vout)"
        },
        {
          "term": "Pin 7",
          "definition": "Positive Power Supply Rail (+Vcc)"
        }
      ]
    },
    {
      "id": "fmss-match-2",
      "type": "matching",
      "title": "Op-Amp Circuit Topologies & Voltage Gain Formulas",
      "pairs": [
        {
          "term": "Inverting Amplifier",
          "definition": "Av = - (Rf / Rin) na may 180\u00b0 phase inversion"
        },
        {
          "term": "Non-Inverting Amplifier",
          "definition": "Av = 1 + (Rf / R1) nang walang phase shift"
        },
        {
          "term": "Voltage Follower",
          "definition": "Av = 1 (Vout = Vin) para sa impedance isolation"
        },
        {
          "term": "Summing Amplifier",
          "definition": "Vout = -Rf * (V1/R1 + V2/R2 + ...)"
        },
        {
          "term": "Open-Loop Comparator",
          "definition": "Vout = \u00b1Vsat depende kung mas mataas ang V+ o V-"
        }
      ]
    },
    {
      "id": "fmss-match-3",
      "type": "matching",
      "title": "Sensors and Their Operating Principles",
      "pairs": [
        {
          "term": "Hall Effect Sensor",
          "definition": "Deteksyon ng magnetic objects gamit ang Lorentz force"
        },
        {
          "term": "Ultrasonic Sensor",
          "definition": "Pagsukat ng distansya gamit ang Time-of-Flight ng sonar"
        },
        {
          "term": "Capacitive Touch",
          "definition": "Pagbabago ng dielectric capacitance kapag lumapit ang daliri"
        },
        {
          "term": "Flame Sensor",
          "definition": "Pagtukoy ng apoy sa 760-1100 nm infrared wavelength"
        },
        {
          "term": "Accelerometer",
          "definition": "Pagsukat ng static at dynamic acceleration sa X, Y, Z"
        }
      ]
    },
    {
      "id": "fmss-match-4",
      "type": "matching",
      "title": "Ideal vs. Practical Op-Amp Characteristics",
      "pairs": [
        {
          "term": "Open-Loop Gain (Avol)",
          "definition": "Ideal: Walang hanggan (\u221e) | Praktikal 741: ~200,000"
        },
        {
          "term": "Input Impedance (Zin)",
          "definition": "Ideal: Walang hanggan (\u221e) | Praktikal 741: ~2 Megaohms"
        },
        {
          "term": "Output Impedance (Zout)",
          "definition": "Ideal: Zero (0 \u03a9) | Praktikal 741: ~75 Ohms"
        },
        {
          "term": "Slew Rate (SR)",
          "definition": "Ideal: Walang hanggan (\u221e) | Praktikal 741: ~0.5 V/\u00b5s"
        },
        {
          "term": "Input Offset Voltage (Vos)",
          "definition": "Ideal: Zero (0 V) | Praktikal 741: ~1 hanggang 5 mV"
        }
      ]
    }
  ],
  "interactiveLab": {
    "title": "Interactive Op-Amp & Component Workbench",
    "defaultCircuit": "inverting",
    "circuits": [
      {
        "id": "inverting",
        "name": "Inverting Amplifier",
        "formula": "Av = -Rf / Rin",
        "voutFormula": "Vout = - (Rf / Rin) * Vin",
        "phaseShift": 180,
        "defaultRf": 100,
        "defaultRin": 10,
        "defaultVin": 1.0,
        "defaultVcc": 15.0
      },
      {
        "id": "nonInverting",
        "name": "Non-Inverting Amplifier",
        "formula": "Av = 1 + (Rf / R1)",
        "voutFormula": "Vout = (1 + Rf / R1) * Vin",
        "phaseShift": 0,
        "defaultRf": 90,
        "defaultRin": 10,
        "defaultVin": 1.0,
        "defaultVcc": 15.0
      },
      {
        "id": "buffer",
        "name": "Voltage Follower (Buffer)",
        "formula": "Av = 1",
        "voutFormula": "Vout = Vin",
        "phaseShift": 0,
        "defaultRf": 0,
        "defaultRin": 10,
        "defaultVin": 2.5,
        "defaultVcc": 15.0
      },
      {
        "id": "comparator",
        "name": "Open-Loop Comparator",
        "formula": "Vout = +Vsat if Vin > Vref else -Vsat",
        "voutFormula": "Vout = sgn(Vin - Vref) * Vsat",
        "phaseShift": 0,
        "defaultRf": 0,
        "defaultRin": 10,
        "defaultVin": 1.0,
        "defaultVcc": 15.0
      }
    ],
    "pinout741": [
      {
        "pin": 1,
        "name": "Offset Null",
        "desc": "Connects to a 10k potentiometer to Pin 4 to zero out input DC offset voltage."
      },
      {
        "pin": 2,
        "name": "Inverting Input (V-)",
        "desc": "Negative differential input. Signal applied here produces a 180\u00b0 inverted output."
      },
      {
        "pin": 3,
        "name": "Non-Inverting Input (V+)",
        "desc": "Positive differential input. Signal applied here produces an in-phase output."
      },
      {
        "pin": 4,
        "name": "-Vee (Negative Supply)",
        "desc": "Negative DC supply rail (typically -15V to -12V, absolute maximum -22V)."
      },
      {
        "pin": 5,
        "name": "Offset Null",
        "desc": "Paired with Pin 1 for balance adjustment."
      },
      {
        "pin": 6,
        "name": "Output (Vout)",
        "desc": "Single-ended low-impedance output terminal (~75 \u03a9 open-loop, protected against shorts)."
      },
      {
        "pin": 7,
        "name": "+Vcc (Positive Supply)",
        "desc": "Positive DC supply rail (typically +15V to +12V, absolute maximum +22V)."
      },
      {
        "pin": 8,
        "name": "NC (No Connection)",
        "desc": "Not connected internally. Leave floating."
      }
    ]
  }
};
