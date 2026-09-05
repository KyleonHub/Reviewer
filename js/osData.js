// Comprehensive study dataset for Operating Systems (OS)
// Fully covers Lectures 1 to 6:
// - Lec 1-3: History timeline (1981-2026), 8 Components + Scenarios, 8 Properties + Scenarios, PDF Q&As
// - Lec 4: Process Concept, 5-State Transition Model, PCB, Context Switching, Memory Layout
// - Lec 5: CPU Schedulers (Long/Short/Medium), Preemptive vs Non-Preemptive, FCFS, SJF, SRTF, RR, Priority, Gantt Charts & Metrics
// - Lec 6: Deadlock, 4 Coffman Conditions, Resource Allocation Graphs, Banker's Algorithm, Detection & Recovery

const OS_SUBJECT = {
  "id": "subj-os",
  "code": "OS",
  "name": "Operating Systems (OS)",
  "tag": "Core CS/CpE Course",
  "description": "Comprehensive Operating Systems reviewer: History timeline (1981-2026), 8 Components, 8 Properties, Process State Transitions (Lec 4), CPU Schedulers & Gantt Charts (Lec 5), and Deadlock with Banker's Algorithm (Lec 6).",
  "timeline": [
    {
      "year": "1981",
      "name": "MS-DOS",
      "date": "Jul 1, 1981",
      "family": "windows",
      "details": "Microsoft Disk Operating System. Command-line only, text-based, no GUI or mouse."
    },
    {
      "year": "1985",
      "name": "Windows 1.0",
      "date": "Nov 20, 1985",
      "family": "windows",
      "details": "Originally 'Interface Manager'. First graphical Windows with mouse support and tiled windows."
    },
    {
      "year": "1987",
      "name": "Windows 2.0",
      "date": "Dec 9, 1987",
      "family": "windows",
      "details": "Overlapping windows, window resizing, expanded memory support, better multitasking."
    },
    {
      "year": "1990",
      "name": "Windows 3.0",
      "date": "May 22, 1990",
      "family": "windows",
      "details": "Program Manager, desktop icons, Solitaire card game, widely user-friendly."
    },
    {
      "year": "1991",
      "name": "Linux Kernel",
      "date": "Sep 17, 1991",
      "family": "linux",
      "details": "Created by Linus Benedict Torvalds. Free, open-source UNIX-like kernel."
    },
    {
      "year": "1995",
      "name": "Windows 95",
      "date": "Aug 24, 1995",
      "family": "windows",
      "details": "Codename Chicago. Introduced Start Button, Start Menu, Taskbar, and Plug and Play."
    },
    {
      "year": "1998",
      "name": "Windows 98",
      "date": "Jun 25, 1998",
      "family": "windows",
      "details": "USB support, integrated Internet Explorer, FAT32 support, improved hardware drivers."
    },
    {
      "year": "2000",
      "name": "Windows 2000",
      "date": "Feb 17, 2000",
      "family": "windows",
      "details": "NT-based business OS. High stability, Active Directory, NTFS 3.0."
    },
    {
      "year": "2000",
      "name": "Windows ME",
      "date": "Jun 14, 2000",
      "family": "windows",
      "details": "Millennium Edition. Introduced System Restore; infamous for bugs ('Mistake Edition')."
    },
    {
      "year": "2000",
      "name": "Mac OS X Beta",
      "date": "Sep 13, 2000",
      "family": "mac",
      "details": "First public preview of Mac OS X. Debuted the Aqua graphical user interface."
    },
    {
      "year": "2001",
      "name": "Mac OS X 10.0 Cheetah",
      "date": "Mar 24, 2001",
      "family": "mac",
      "details": "First official Mac OS X. Aqua UI, UNIX-based, started big cat naming convention."
    },
    {
      "year": "2001",
      "name": "Mac OS X 10.1 Puma",
      "date": "Sep 25, 2001",
      "family": "mac",
      "details": "Substantial performance boost and bug fixes over the slow Cheetah release."
    },
    {
      "year": "2001",
      "name": "Windows XP",
      "date": "Oct 25, 2001",
      "family": "windows",
      "details": "eXPerience. Luna colorful UI, NT stability for consumers; lasted over 14 years."
    },
    {
      "year": "2002",
      "name": "Mac OS X 10.2 Jaguar",
      "date": "Aug 23, 2002",
      "family": "mac",
      "details": "iChat introduced, Quartz Extreme GPU acceleration, enhanced usability."
    },
    {
      "year": "2003",
      "name": "Mac OS X 10.3 Panther",
      "date": "Oct 24, 2003",
      "family": "mac",
      "details": "Faster Finder, Exposé window switching, FileVault encryption, brushed metal UI."
    },
    {
      "year": "2005",
      "name": "Mac OS X 10.4 Tiger",
      "date": "Apr 29, 2005",
      "family": "mac",
      "details": "Spotlight search, Dashboard widgets, Safari 2 RSS, transitioned Mac to Intel CPUs."
    },
    {
      "year": "2007",
      "name": "Windows Vista",
      "date": "Jan 30, 2007",
      "family": "windows",
      "details": "Aero Glass translucent UI, User Account Control (UAC); criticized for heavy resource demands."
    },
    {
      "year": "2007",
      "name": "Mac OS X 10.5 Leopard",
      "date": "Oct 26, 2007",
      "family": "mac",
      "details": "Time Machine backup utility, Spaces virtual desktops, 64-bit application support."
    },
    {
      "year": "2009",
      "name": "Windows 7",
      "date": "Jul 22, 2009",
      "family": "windows",
      "details": "Faster than Vista, pinned taskbar ('Superbar'), Aero Snap, high stability."
    },
    {
      "year": "2009",
      "name": "Mac OS X 10.6 Snow Leopard",
      "date": "Aug 28, 2009",
      "family": "mac",
      "details": "Refinement release focused on speed, 64-bit kernel, and dropping PowerPC support."
    },
    {
      "year": "2011",
      "name": "Mac OS X 10.7 Lion",
      "date": "Jul 20, 2011",
      "family": "mac",
      "details": "Launchpad, full-screen apps, iOS-inspired gestures, Mission Control."
    },
    {
      "year": "2012",
      "name": "Mac OS X 10.8 Mountain Lion",
      "date": "Jul 25, 2012",
      "family": "mac",
      "details": "Notification Center, iMessage integration, Gatekeeper security, Notes & Reminders."
    },
    {
      "year": "2012",
      "name": "Windows 8",
      "date": "Oct 26, 2012",
      "family": "windows",
      "details": "Metro UI, Live Tiles, touch-first optimization; controversially eliminated Start Menu."
    },
    {
      "year": "2013",
      "name": "Mac OS X 10.9 Mavericks",
      "date": "Jun 10, 2013",
      "family": "mac",
      "details": "Broke cat naming for California places. Finder tabs, App Nap, 100% free upgrades."
    },
    {
      "year": "2014",
      "name": "Mac OS X 10.10 Yosemite",
      "date": "Oct 16, 2014",
      "family": "mac",
      "details": "Flat modern design language, Continuity & Handoff with iOS devices."
    },
    {
      "year": "2015",
      "name": "Windows 10",
      "date": "Jul 29, 2015",
      "family": "windows",
      "details": "Start Menu returned, virtual desktops, Microsoft Edge; skipped Windows 9 to prevent legacy code conflicts."
    },
    {
      "year": "2015",
      "name": "Mac OS X 10.11 El Capitan",
      "date": "Sep 30, 2015",
      "family": "mac",
      "details": "Split View multitasking, Metal graphics API, performance refinements."
    },
    {
      "year": "2016",
      "name": "macOS 10.12 Sierra",
      "date": "Sep 20, 2016",
      "family": "mac",
      "details": "Rebranded from OS X to macOS. Siri integration, Apple Pay, Universal Clipboard."
    },
    {
      "year": "2017",
      "name": "macOS 10.13 High Sierra",
      "date": "Sep 25, 2017",
      "family": "mac",
      "details": "APFS (Apple File System) default, HEVC video support, Metal 2."
    },
    {
      "year": "2018",
      "name": "macOS 10.14 Mojave",
      "date": "Sep 24, 2018",
      "family": "mac",
      "details": "System-wide Dark Mode, Dynamic Desktop, Desktop Stacks cleanup."
    },
    {
      "year": "2019",
      "name": "macOS 10.15 Catalina",
      "date": "Oct 7, 2019",
      "family": "mac",
      "details": "Dropped 32-bit apps, split iTunes into Music/TV/Podcasts, Sidecar iPad display."
    },
    {
      "year": "2020",
      "name": "macOS 11 Big Sur",
      "date": "Nov 12, 2020",
      "family": "mac",
      "details": "Major UI redesign, Apple Silicon (M1) native architecture, new Control Center."
    },
    {
      "year": "2021",
      "name": "Windows 11",
      "date": "Oct 5, 2021",
      "family": "windows",
      "details": "Centered taskbar, rounded corners, Snap Layouts, DirectStorage, Android app emulation."
    },
    {
      "year": "2021",
      "name": "macOS 12 Monterey",
      "date": "Oct 25, 2021",
      "family": "mac",
      "details": "Universal Control, AirPlay to Mac, Focus Mode, Shortcuts on Mac."
    },
    {
      "year": "2022",
      "name": "macOS 13 Ventura",
      "date": "Oct 24, 2022",
      "family": "mac",
      "details": "Stage Manager, Continuity Camera using iPhone as webcam, Passkeys."
    },
    {
      "year": "2023",
      "name": "macOS 14 Sonoma",
      "date": "Sep 26, 2023",
      "family": "mac",
      "details": "Interactive desktop widgets, Game Mode, enhanced video presenter overlays."
    },
    {
      "year": "2024",
      "name": "macOS 15 Sequoia",
      "date": "Sep 16, 2024",
      "family": "mac",
      "details": "Apple Intelligence (AI), iPhone Mirroring with Mac control, window tiling."
    },
    {
      "year": "2026",
      "name": "macOS 16 Tahoe",
      "date": "Jun 29, 2026",
      "family": "mac",
      "details": "Next-generation spatial and neural computing integration (projected milestone)."
    }
  ],
  "visuals": [
    {
      "id": "vis-process-states",
      "title": "5-State Process Transition Model",
      "caption": "The fundamental lifecycle of a process: New -> Ready -> Running -> Waiting -> Terminated, driven by scheduler dispatch, I/O events, and timer interrupts.",
      "svg": "<svg viewBox=\"0 0 600 280\" class=\"w-full h-auto max-h-56 bg-zinc-900/60 rounded-xl p-2 border border-zinc-800\">\n  <defs>\n    <marker id=\"arr\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n      <path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"#6366f1\" />\n    </marker>\n    <marker id=\"arr-amber\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n      <path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"#f59e0b\" />\n    </marker>\n  </defs>\n  <!-- States -->\n  <rect x=\"30\" y=\"110\" width=\"80\" height=\"40\" rx=\"8\" fill=\"#1e1b4b\" stroke=\"#6366f1\" stroke-width=\"2\"/>\n  <text x=\"70\" y=\"135\" fill=\"#c7d2fe\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">NEW</text>\n  \n  <rect x=\"180\" y=\"110\" width=\"90\" height=\"40\" rx=\"8\" fill=\"#064e3b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"225\" y=\"135\" fill=\"#a7f3d0\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">READY</text>\n  \n  <rect x=\"340\" y=\"110\" width=\"95\" height=\"40\" rx=\"8\" fill=\"#312e81\" stroke=\"#818cf8\" stroke-width=\"2\"/>\n  <text x=\"387\" y=\"135\" fill=\"#e0e7ff\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">RUNNING</text>\n  \n  <rect x=\"250\" y=\"215\" width=\"110\" height=\"40\" rx=\"8\" fill=\"#78350f\" stroke=\"#f59e0b\" stroke-width=\"2\"/>\n  <text x=\"305\" y=\"240\" fill=\"#fde68a\" font-size=\"13\" font-weight=\"bold\" text-anchor=\"middle\">WAITING</text>\n  \n  <rect x=\"490\" y=\"110\" width=\"90\" height=\"40\" rx=\"8\" fill=\"#4c0519\" stroke=\"#f43f5e\" stroke-width=\"2\"/>\n  <text x=\"535\" y=\"135\" fill=\"#fecdd3\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">TERMINATED</text>\n  \n  <!-- Transitions -->\n  <!-- New -> Ready -->\n  <path d=\"M 110 130 L 176 130\" stroke=\"#6366f1\" stroke-width=\"2\" marker-end=\"url(#arr)\"/>\n  <text x=\"145\" y=\"122\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"middle\">Admitted</text>\n  \n  <!-- Ready -> Running -->\n  <path d=\"M 270 125 L 336 125\" stroke=\"#10b981\" stroke-width=\"2\" marker-end=\"url(#arr)\"/>\n  <text x=\"305\" y=\"118\" fill=\"#6ee7b7\" font-size=\"9\" text-anchor=\"middle\">Dispatch</text>\n  \n  <!-- Running -> Ready (Interrupt) -->\n  <path d=\"M 360 110 C 340 70, 250 70, 230 110\" fill=\"none\" stroke=\"#e0e7ff\" stroke-dasharray=\"3,3\" stroke-width=\"1.8\" marker-end=\"url(#arr)\"/>\n  <text x=\"295\" y=\"65\" fill=\"#cbd5e1\" font-size=\"10\" text-anchor=\"middle\">Interrupt (Time Slice / Preempt)</text>\n  \n  <!-- Running -> Waiting (I/O or Event Wait) -->\n  <path d=\"M 387 150 C 387 190, 365 220, 362 225\" fill=\"none\" stroke=\"#f59e0b\" stroke-width=\"2\" marker-end=\"url(#arr-amber)\"/>\n  <text x=\"420\" y=\"195\" fill=\"#fcd34d\" font-size=\"9\" text-anchor=\"middle\">I/O or Event Wait</text>\n  \n  <!-- Waiting -> Ready (I/O or Event Complete) -->\n  <path d=\"M 250 230 C 190 225, 190 180, 205 152\" fill=\"none\" stroke=\"#10b981\" stroke-width=\"2\" marker-end=\"url(#arr)\"/>\n  <text x=\"175\" y=\"195\" fill=\"#6ee7b7\" font-size=\"9\" text-anchor=\"middle\">I/O Complete</text>\n  \n  <!-- Running -> Terminated (Exit) -->\n  <path d=\"M 435 130 L 486 130\" stroke=\"#f43f5e\" stroke-width=\"2\" marker-end=\"url(#arr)\"/>\n  <text x=\"460\" y=\"122\" fill=\"#fca5a5\" font-size=\"10\" text-anchor=\"middle\">Exit</text>\n</svg>"
    },
    {
      "id": "vis-pcb-layout",
      "title": "Process Control Block (PCB) & Memory Layout",
      "caption": "PCB stores process metadata for context switching; memory is segmented into Text (code), Data (globals), Heap (dynamic allocation), and Stack (local vars/calls).",
      "svg": "<svg viewBox=\"0 0 600 240\" class=\"w-full h-auto max-h-56 bg-zinc-900/60 rounded-xl p-2 border border-zinc-800\">\n  <!-- PCB Box -->\n  <rect x=\"30\" y=\"20\" width=\"240\" height=\"200\" rx=\"10\" fill=\"#18181b\" stroke=\"#6366f1\" stroke-width=\"2\"/>\n  <rect x=\"30\" y=\"20\" width=\"240\" height=\"30\" rx=\"10\" fill=\"#4f46e5\"/>\n  <text x=\"150\" y=\"40\" fill=\"#ffffff\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Process Control Block (PCB)</text>\n  \n  <text x=\"45\" y=\"70\" fill=\"#cbd5e1\" font-size=\"11\">● Process ID (PID)</text>\n  <text x=\"45\" y=\"92\" fill=\"#cbd5e1\" font-size=\"11\">● Process State (Ready, Run...)</text>\n  <text x=\"45\" y=\"114\" fill=\"#cbd5e1\" font-size=\"11\">● Program Counter (PC)</text>\n  <text x=\"45\" y=\"136\" fill=\"#cbd5e1\" font-size=\"11\">● CPU Registers (AX, BX, SP...)</text>\n  <text x=\"45\" y=\"158\" fill=\"#cbd5e1\" font-size=\"11\">● CPU Scheduling Info (Priority)</text>\n  <text x=\"45\" y=\"180\" fill=\"#cbd5e1\" font-size=\"11\">● Memory Management (Page tbl)</text>\n  <text x=\"45\" y=\"202\" fill=\"#cbd5e1\" font-size=\"11\">● I/O Status Info & Open Files</text>\n\n  <!-- Process Memory Layout -->\n  <rect x=\"330\" y=\"20\" width=\"230\" height=\"200\" rx=\"10\" fill=\"#18181b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <rect x=\"330\" y=\"20\" width=\"230\" height=\"30\" rx=\"10\" fill=\"#059669\"/>\n  <text x=\"445\" y=\"40\" fill=\"#ffffff\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">Process Address Space (RAM)</text>\n\n  <rect x=\"345\" y=\"60\" width=\"200\" height=\"30\" fill=\"#047857\" rx=\"4\"/>\n  <text x=\"445\" y=\"80\" fill=\"#ecfdf5\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">STACK (↓ grows downward)</text>\n\n  <rect x=\"345\" y=\"95\" width=\"200\" height=\"20\" fill=\"#065f46\" rx=\"4\" opacity=\"0.4\"/>\n  <text x=\"445\" y=\"109\" fill=\"#94a3b8\" font-size=\"10\" text-anchor=\"middle\">↕ Free Memory Space</text>\n\n  <rect x=\"345\" y=\"120\" width=\"200\" height=\"30\" fill=\"#047857\" rx=\"4\"/>\n  <text x=\"445\" y=\"140\" fill=\"#ecfdf5\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">HEAP (↑ dynamic allocation)</text>\n\n  <rect x=\"345\" y=\"155\" width=\"200\" height=\"25\" fill=\"#064e3b\" rx=\"4\"/>\n  <text x=\"445\" y=\"172\" fill=\"#a7f3d0\" font-size=\"11\" text-anchor=\"middle\">DATA (Globals & Static vars)</text>\n\n  <rect x=\"345\" y=\"185\" width=\"200\" height=\"25\" fill=\"#022c22\" rx=\"4\"/>\n  <text x=\"445\" y=\"202\" fill=\"#6ee7b7\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">TEXT (Compiled Binary Code)</text>\n</svg>"
    },
    {
      "id": "vis-schedulers",
      "title": "The 3 Types of Schedulers",
      "caption": "Long-Term (Job) controls degree of multiprogramming; Short-Term (CPU) allocates CPU; Medium-Term (Swapper) swaps processes to/from disk.",
      "svg": "<svg viewBox=\"0 0 600 240\" class=\"w-full h-auto max-h-56 bg-zinc-900/60 rounded-xl p-2 border border-zinc-800\">\n  <!-- Job Pool / Disk -->\n  <rect x=\"20\" y=\"90\" width=\"100\" height=\"60\" rx=\"8\" fill=\"#3f3f46\" stroke=\"#71717a\" stroke-width=\"2\"/>\n  <text x=\"70\" y=\"115\" fill=\"#ffffff\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Disk Pool</text>\n  <text x=\"70\" y=\"132\" fill=\"#a1a1aa\" font-size=\"9\" text-anchor=\"middle\">(Submitted Jobs)</text>\n\n  <!-- Ready Queue -->\n  <rect x=\"200\" y=\"90\" width=\"110\" height=\"60\" rx=\"8\" fill=\"#1e1b4b\" stroke=\"#6366f1\" stroke-width=\"2\"/>\n  <text x=\"255\" y=\"115\" fill=\"#c7d2fe\" font-size=\"11\" font-weight=\"bold\" text-anchor=\"middle\">Ready Queue</text>\n  <text x=\"255\" y=\"132\" fill=\"#818cf8\" font-size=\"9\" text-anchor=\"middle\">(Main Memory / RAM)</text>\n\n  <!-- CPU -->\n  <rect x=\"400\" y=\"90\" width=\"90\" height=\"60\" rx=\"8\" fill=\"#064e3b\" stroke=\"#10b981\" stroke-width=\"2\"/>\n  <text x=\"445\" y=\"115\" fill=\"#a7f3d0\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">CPU</text>\n  <text x=\"445\" y=\"132\" fill=\"#6ee7b7\" font-size=\"9\" text-anchor=\"middle\">Execution</text>\n\n  <!-- Long Term Scheduler -->\n  <path d=\"M 120 120 L 195 120\" stroke=\"#f59e0b\" stroke-width=\"2\" marker-end=\"url(#arr)\"/>\n  <text x=\"158\" y=\"112\" fill=\"#fbbf24\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">Long-Term</text>\n  <text x=\"158\" y=\"138\" fill=\"#d97706\" font-size=\"8\" text-anchor=\"middle\">(Job Scheduler)</text>\n\n  <!-- Short Term Scheduler -->\n  <path d=\"M 310 120 L 395 120\" stroke=\"#10b981\" stroke-width=\"2\" marker-end=\"url(#arr)\"/>\n  <text x=\"353\" y=\"112\" fill=\"#34d399\" font-size=\"9\" font-weight=\"bold\" text-anchor=\"middle\">Short-Term</text>\n  <text x=\"353\" y=\"138\" fill=\"#059669\" font-size=\"8\" text-anchor=\"middle\">(CPU Scheduler)</text>\n\n  <!-- Medium Term Scheduler (Swap out and in) -->\n  <rect x=\"230\" y=\"190\" width=\"160\" height=\"35\" rx=\"6\" fill=\"#4c0519\" stroke=\"#f43f5e\" stroke-width=\"1.5\"/>\n  <text x=\"310\" y=\"212\" fill=\"#fecdd3\" font-size=\"10\" font-weight=\"bold\" text-anchor=\"middle\">Medium-Term (Swapping)</text>\n  <path d=\"M 255 150 L 255 188\" stroke=\"#f43f5e\" stroke-width=\"1.5\"/>\n  <path d=\"M 365 188 L 365 150\" stroke=\"#f43f5e\" stroke-width=\"1.5\"/>\n</svg>"
    },
    {
      "id": "vis-deadlock-rag",
      "title": "Resource Allocation Graph (RAG) & Deadlock Cycle",
      "caption": "A circular wait cycle in a RAG: P1 holds R1 and requests R2; P2 holds R2 and requests R1. With single-instance resources, a cycle guarantees deadlock.",
      "svg": "<svg viewBox=\"0 0 600 220\" class=\"w-full h-auto max-h-56 bg-zinc-900/60 rounded-xl p-2 border border-zinc-800\">\n  <!-- P1 -->\n  <circle cx=\"150\" cy=\"110\" r=\"35\" fill=\"#1e1b4b\" stroke=\"#818cf8\" stroke-width=\"2\"/>\n  <text x=\"150\" y=\"115\" fill=\"#e0e7ff\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">P1</text>\n  \n  <!-- P2 -->\n  <circle cx=\"450\" cy=\"110\" r=\"35\" fill=\"#1e1b4b\" stroke=\"#818cf8\" stroke-width=\"2\"/>\n  <text x=\"450\" y=\"115\" fill=\"#e0e7ff\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">P2</text>\n  \n  <!-- R1 -->\n  <rect x=\"265\" y=\"30\" width=\"70\" height=\"50\" rx=\"8\" fill=\"#3f3f46\" stroke=\"#e11d48\" stroke-width=\"2\"/>\n  <text x=\"300\" y=\"55\" fill=\"#ffffff\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">R1</text>\n  <circle cx=\"300\" cy=\"68\" r=\"4\" fill=\"#fb7185\"/>\n\n  <!-- R2 -->\n  <rect x=\"265\" y=\"140\" width=\"70\" height=\"50\" rx=\"8\" fill=\"#3f3f46\" stroke=\"#e11d48\" stroke-width=\"2\"/>\n  <text x=\"300\" y=\"165\" fill=\"#ffffff\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">R2</text>\n  <circle cx=\"300\" cy=\"178\" r=\"4\" fill=\"#fb7185\"/>\n\n  <!-- Edges -->\n  <!-- R1 assigned to P1 -->\n  <path d=\"M 265 55 L 180 90\" stroke=\"#10b981\" stroke-width=\"2\" marker-end=\"url(#arr)\"/>\n  <text x=\"210\" y=\"65\" fill=\"#6ee7b7\" font-size=\"10\">Holds (Allocated)</text>\n\n  <!-- P1 requests R2 -->\n  <path d=\"M 180 130 L 265 160\" stroke=\"#f59e0b\" stroke-width=\"2\" stroke-dasharray=\"3,3\" marker-end=\"url(#arr-amber)\"/>\n  <text x=\"195\" y=\"165\" fill=\"#fcd34d\" font-size=\"10\">Requests</text>\n\n  <!-- R2 assigned to P2 -->\n  <path d=\"M 335 160 L 420 130\" stroke=\"#10b981\" stroke-width=\"2\" marker-end=\"url(#arr)\"/>\n  <text x=\"360\" y=\"165\" fill=\"#6ee7b7\" font-size=\"10\">Holds (Allocated)</text>\n\n  <!-- P2 requests R1 -->\n  <path d=\"M 420 90 L 335 55\" stroke=\"#f59e0b\" stroke-width=\"2\" stroke-dasharray=\"3,3\" marker-end=\"url(#arr-amber)\"/>\n  <text x=\"375\" y=\"65\" fill=\"#fcd34d\" font-size=\"10\">Requests</text>\n\n  <!-- Deadlock Banner -->\n  <text x=\"300\" y=\"115\" fill=\"#f43f5e\" font-size=\"12\" font-weight=\"extrabold\" text-anchor=\"middle\">⚠️ CIRCULAR WAIT CYCLE</text>\n</svg>"
    }
  ],
  "flashcards": [
    {
      "id": "fc-os-1",
      "topic": "lec1-3-history",
      "front": "What are the 4 fundamental elements of a computer system?",
      "back": "1. HARDWARE (Physical electronic components & devices)\n2. SOFTWARE (Programs & operating instructions)\n3. PEOPLEWARE (Users, administrators, developers)\n4. DATA (Raw facts & input processed into information).",
      "hint": "Hardware, Software, Peopleware, Data"
    },
    {
      "id": "fc-os-2",
      "topic": "lec1-3-history",
      "front": "What is an Operating System (OS)?",
      "back": "An Operating System is an interface between a computer user and computer hardware. It is a collection of system software that manages hardware resources (CPU, memory, storage, I/O) and provides common services for computer programs.",
      "hint": "Interface & resource manager"
    },
    {
      "id": "fc-os-3",
      "topic": "lec1-3-history",
      "front": "Who founded Android and Microsoft?",
      "back": "• Andy Rubin – Founder of Android\n• Bill Gates – Co-founder of Microsoft",
      "hint": "Rubin & Gates"
    },
    {
      "id": "fc-os-4",
      "topic": "lec1-3-history",
      "front": "What was MS-DOS and when was it released?",
      "back": "Released on July 1, 1981. MS-DOS stands for Microsoft Disk Operating System. It was command-line only (CLI), text-based, had no mouse support, and no graphical user interface (GUI). Users had to type all commands.",
      "hint": "July 1, 1981, CLI, text-based"
    },
    {
      "id": "fc-os-5",
      "topic": "lec1-3-history",
      "front": "What was the original name of Windows 1.0 before release?",
      "back": "INTERFACE MANAGER. Released on Nov 20, 1985, Windows 1.0 was Microsoft's first graphical interface with mouse support, running on top of MS-DOS.",
      "hint": "Interface Manager (1985)"
    },
    {
      "id": "fc-os-6",
      "topic": "lec1-3-history",
      "front": "What key feature did Windows 2.0 introduce over Windows 1.0?",
      "back": "Overlapping windows, window resizing, and better multitasking (released Dec 9, 1987). Windows 1.0 only allowed tiled windows.",
      "hint": "Overlapping windows (1987)"
    },
    {
      "id": "fc-os-7",
      "topic": "lec1-3-history",
      "front": "What famous game was introduced with Windows 3.0 (May 22, 1990)?",
      "back": "Solitaire! Windows 3.0 also brought Program Manager, icons, significantly better graphics, and was widely user-friendly.",
      "hint": "Solitaire card game"
    },
    {
      "id": "fc-os-8",
      "topic": "lec1-3-history",
      "front": "Who created Linux and when was it released?",
      "back": "Linus Benedict Torvalds released the Linux kernel on September 17, 1991 as a free, open-source UNIX-like operating system kernel.",
      "hint": "Linus Torvalds, Sep 17, 1991"
    },
    {
      "id": "fc-os-9",
      "topic": "lec1-3-history",
      "front": "What were the breakthrough features and codename of Windows 95?",
      "back": "Codename: Chicago (Aug 24, 1995). Introduced the Start Button, Start Menu, Taskbar, and Plug and Play (PnP). It defined the first modern desktop Windows UI.",
      "hint": "Codename Chicago, Start Menu & Taskbar"
    },
    {
      "id": "fc-os-10",
      "topic": "lec1-3-history",
      "front": "Why was Windows ME (Millennium Edition) infamous, and what was its nickname?",
      "back": "Released June 14, 2000 for home users with System Restore. It was infamous for frequent crashes, instability, and hardware incompatibility, earning the nickname 'Mistake Edition'.",
      "hint": "Mistake Edition (2000)"
    },
    {
      "id": "fc-os-11",
      "topic": "lec1-3-history",
      "front": "What does 'XP' stand for in Windows XP (Oct 25, 2001)?",
      "back": "'eXPerience'. Windows XP combined NT stability with a colorful, friendly UI (Luna) and remained popular for over 14 years.",
      "hint": "eXPerience"
    },
    {
      "id": "fc-os-12",
      "topic": "lec1-3-history",
      "front": "Why did Microsoft skip naming a version 'Windows 9'?",
      "back": "Legacy third-party application code often checked for Windows 95 or 98 using shorthand like: if (version.startsWith(\"Windows 9\")). Naming it Windows 9 would cause legacy apps to falsely detect it as 95/98.",
      "hint": "Legacy code confusion with 95/98"
    },
    {
      "id": "fc-os-13",
      "topic": "lec1-3-history",
      "front": "What was the first official Mac OS X version and its naming style?",
      "back": "Mac OS X 10.0 Cheetah (March 24, 2001). Introduced the Aqua user interface and UNIX foundation. Apple used big cat names (Cheetah, Puma, Jaguar, Panther, Tiger, Leopard, Snow Leopard, Lion, Mountain Lion).",
      "hint": "Cheetah (10.0), Aqua interface, Big Cats"
    },
    {
      "id": "fc-os-14",
      "topic": "lec1-3-history",
      "front": "Which macOS version broke the 'big cat' naming convention?",
      "back": "Mac OS X 10.9 Mavericks (June 10, 2013), named after a famous California surf location. It also introduced Finder tabs and made OS upgrades completely free.",
      "hint": "Mavericks (10.9) - California locations"
    },
    {
      "id": "fc-os-15",
      "topic": "lec1-3-history",
      "front": "What major shift occurred in macOS 11 Big Sur (Nov 12, 2020)?",
      "back": "Biggest design overhaul in 20 years, redesigned Control Center, and native support for Apple Silicon (M1 ARM architecture). Also bumped major version from 10.x to 11.",
      "hint": "Apple Silicon M1 & Control Center"
    },
    {
      "id": "fc-os-16",
      "topic": "lec1-3-components",
      "front": "Name the 8 essential components of an Operating System.",
      "back": "1. Process Management\n2. File Management\n3. Network Management\n4. Main Memory Management (RAM)\n5. Secondary Storage Management (HDD/SSD)\n6. I/O Device Management\n7. Security Management\n8. Command Interpreter System (Shell)",
      "hint": "Process, File, Network, Memory, Storage, I/O, Security, Shell"
    },
    {
      "id": "fc-os-17",
      "topic": "lec1-3-components",
      "front": "What is the role of Process Management in an OS?",
      "back": "Handles process creation, scheduling, termination, synchronization, inter-process communication (IPC), and deadlock handling. A process is defined as an active, executing program.",
      "hint": "Creation, scheduling, termination of active programs"
    },
    {
      "id": "fc-os-18",
      "topic": "lec1-3-components",
      "front": "Scenario: You pressed a key on the keyboard and a letter appeared on screen. Which OS component handles this?",
      "back": "I/O Device Management (manages keyboard input buffers, device drivers, and display output).",
      "hint": "I/O Device Management"
    },
    {
      "id": "fc-os-19",
      "topic": "lec1-3-components",
      "front": "Scenario: Your computer asks for a password or biometric fingerprint when logging in. Which OS component handles this?",
      "back": "Security Management (protects system from unauthorized access, authenticates users, and ensures data integrity).",
      "hint": "Security Management"
    },
    {
      "id": "fc-os-20",
      "topic": "lec1-3-components",
      "front": "Scenario: You opened Chrome, PowerPoint, and Spotify all at the same time. Which OS component manages their execution?",
      "back": "Process Management (allocates CPU time slices and schedules threads across processes).",
      "hint": "Process Management"
    },
    {
      "id": "fc-os-21",
      "topic": "lec1-3-components",
      "front": "Scenario: You typed 'cd Desktop' or 'dir' in the terminal. Which OS component executes this?",
      "back": "Command Interpreter System (Shell) – the CLI/GUI bridge that parses user commands and triggers OS system calls.",
      "hint": "Command Interpreter System (Shell)"
    },
    {
      "id": "fc-os-22",
      "topic": "lec1-3-components",
      "front": "Scenario: You downloaded a 15GB movie and saved it onto your SSD. Which OS component handles block allocation?",
      "back": "Secondary Storage Management (manages free space, disk scheduling, and non-volatile block storage on HDD/SSD).",
      "hint": "Secondary Storage Management"
    },
    {
      "id": "fc-os-23",
      "topic": "lec1-3-properties",
      "front": "What is the difference between Multitasking and Multiprocessing?",
      "back": "• Multitasking: Rapidly switching a single CPU core between multiple tasks via small time slices so they appear concurrent.\n• Multiprocessing: Running tasks physically in parallel across TWO or more physical CPU cores or processors simultaneously.",
      "hint": "Time slicing on 1 CPU vs parallel cores"
    },
    {
      "id": "fc-os-24",
      "topic": "lec1-3-properties",
      "front": "What is Multithreading and what memory do threads share?",
      "back": "The ability to run multiple execution threads within the same process simultaneously. All threads of a process share the same code (text), data, and heap memory space, but each has its own private Stack and Program Counter.",
      "hint": "Threads of same process sharing memory"
    },
    {
      "id": "fc-os-25",
      "topic": "lec1-3-properties",
      "front": "What is Portability in an Operating System?",
      "back": "The ability of an OS to run on different hardware architectures (e.g. x86 Intel, AMD, ARM, RISC-V) with minimal or no source code alterations. Achieved by writing the kernel in high-level languages like C.",
      "hint": "Cross-hardware compilation"
    },
    {
      "id": "fc-os-26",
      "topic": "lec1-3-properties",
      "front": "Scenario: An automobile airbag deployment system inflates milliseconds upon collision. Which OS property is required?",
      "back": "Real-Time (RTOS) – tasks must respond within strict guaranteed deadlines; latency or delays can cause catastrophic failure.",
      "hint": "Real-Time (RTOS)"
    },
    {
      "id": "fc-os-27",
      "topic": "lec1-3-properties",
      "front": "Scenario: 30 university students log into the campus server simultaneously to compile their C code. Which property is active?",
      "back": "Time-Sharing (Multi-User) – the server allocates round-robin CPU time quanta to each student session seamlessly.",
      "hint": "Time-Sharing"
    },
    {
      "id": "fc-os-28",
      "topic": "lec1-3-properties",
      "front": "Scenario: Google Drive stores file chunks across multiple server clusters worldwide, appearing as a single folder. Which property is this?",
      "back": "Distributed OS capability – coordinating independent machines across a network to appear as a unified system.",
      "hint": "Distributed"
    },
    {
      "id": "fc-os-29",
      "topic": "lec4-process",
      "front": "What is the difference between a Program and a Process?",
      "back": "• Program: A passive entity stored on disk (executable file, e.g. a.out or app.exe).\n• Process: An active entity in execution, with an address space, program counter, stack, heap, and associated system resources.",
      "hint": "Passive code on disk vs active running program"
    },
    {
      "id": "fc-os-30",
      "topic": "lec4-process",
      "front": "List the 5 states in the classic Process State Transition Model.",
      "back": "1. NEW: Process is being created.\n2. READY: Waiting in ready queue to be allocated a CPU core.\n3. RUNNING: Instructions currently executing on the CPU.\n4. WAITING (BLOCKED): Waiting for an I/O completion or signal.\n5. TERMINATED: Process finished execution and resources are freed.",
      "hint": "New, Ready, Running, Waiting, Terminated"
    },
    {
      "id": "fc-os-31",
      "topic": "lec4-process",
      "front": "What causes the transition from RUNNING to READY?",
      "back": "An INTERRUPT, typically a timer interrupt indicating the process's allocated time slice (quantum) has expired, or preemption by a higher-priority process.",
      "hint": "Time slice expiration or preemption interrupt"
    },
    {
      "id": "fc-os-32",
      "topic": "lec4-process",
      "front": "What causes the transition from RUNNING to WAITING (BLOCKED)?",
      "back": "An I/O request (e.g. reading from disk, waiting for network packet, user keyboard input) or waiting for an operating system signal/child event.",
      "hint": "I/O or event wait"
    },
    {
      "id": "fc-os-33",
      "topic": "lec4-process",
      "front": "When an I/O operation completes, does the process return directly to RUNNING?",
      "back": "NO! The process moves from WAITING to the READY queue. It must wait for the CPU scheduler to dispatch it back to the RUNNING state.",
      "hint": "Waiting -> Ready (NOT directly to Running)"
    },
    {
      "id": "fc-os-34",
      "topic": "lec4-process",
      "front": "What is a Context Switch and why is it called 'pure overhead'?",
      "back": "Context Switching is saving the current state (registers, PC) of the running process into its PCB and loading the saved state of another ready process. It performs no useful user computation, making it pure system overhead.",
      "hint": "Save old PCB, restore new PCB; zero computation"
    },
    {
      "id": "fc-os-35",
      "topic": "lec4-process",
      "front": "What are the 4 memory segments of an active process address space?",
      "back": "1. TEXT: Compiled machine code instructions.\n2. DATA: Initialized and uninitialized global/static variables.\n3. HEAP: Dynamically allocated memory (malloc in C, new in C++/Java); grows upward.\n4. STACK: Function parameters, return addresses, and local variables; grows downward.",
      "hint": "Text, Data, Heap, Stack"
    },
    {
      "id": "fc-os-36",
      "topic": "lec5-scheduler",
      "front": "What are the 3 levels of CPU Schedulers and their frequencies?",
      "back": "1. Long-Term (Job Scheduler): Loads jobs from disk to RAM; controls degree of multiprogramming (infrequent).\n2. Short-Term (CPU Scheduler): Picks ready process to run on CPU; executes every few milliseconds (very frequent).\n3. Medium-Term (Swapper): Swaps processes out to disk to relieve RAM pressure (intermediate frequency).",
      "hint": "Job Scheduler, CPU Scheduler, Swapper"
    },
    {
      "id": "fc-os-37",
      "topic": "lec5-scheduler",
      "front": "What is the difference between Preemptive and Non-Preemptive Scheduling?",
      "back": "• Non-Preemptive: Once the CPU is allocated to a process, it keeps the CPU until it terminates or voluntarily waits for I/O (e.g. FCFS, basic SJF).\n• Preemptive: The OS can forcibly take the CPU away (e.g. Round Robin timer expiry, SRTF shorter job arrival, higher priority arrival).",
      "hint": "Voluntary yield vs forced CPU deprivation"
    },
    {
      "id": "fc-os-38",
      "topic": "lec5-scheduler",
      "front": "Define Turnaround Time (TAT) and Waiting Time (WT).",
      "back": "• Turnaround Time (TAT) = Completion Time - Arrival Time\n(Total time taken from submission to final completion).\n• Waiting Time (WT) = Turnaround Time - Burst Time\n(Total time spent waiting idly in the ready queue).",
      "hint": "TAT = CT - AT; WT = TAT - BT"
    },
    {
      "id": "fc-os-39",
      "topic": "lec5-scheduler",
      "front": "What is the 'Convoy Effect' in FCFS scheduling?",
      "back": "A phenomenon where short processes wait behind a very long CPU-bound process, causing high average waiting time and underutilization of I/O devices (like cars stuck behind a slow truck).",
      "hint": "Short jobs stuck behind long CPU-bound job"
    },
    {
      "id": "fc-os-40",
      "topic": "lec5-scheduler",
      "front": "Why is Shortest Job First (SJF) considered provably optimal?",
      "back": "SJF gives the MINIMUM average waiting time for any given set of stationary processes. However, its major drawback is that future CPU burst lengths cannot be known in advance (must be predicted).",
      "hint": "Minimum average waiting time"
    },
    {
      "id": "fc-os-41",
      "topic": "lec5-scheduler",
      "front": "How does the Time Quantum (q) affect Round Robin (RR) scheduling?",
      "back": "• If q is extremely large: RR degenerates into FCFS.\n• If q is extremely small: Context switch overhead dominates the CPU, crippling system throughput.\n• Rule of thumb: 80% of CPU bursts should be shorter than the time quantum.",
      "hint": "Large q -> FCFS; small q -> context switch overhead"
    },
    {
      "id": "fc-os-42",
      "topic": "lec5-scheduler",
      "front": "What is Starvation in Priority Scheduling, and what is its solution?",
      "back": "Starvation (Indefinite Blocking) occurs when low-priority processes never run because high-priority processes keep arriving.\nSolution: AGING – gradually increasing the priority of processes as they wait in the ready queue.",
      "hint": "Starvation solved by Aging"
    },
    {
      "id": "fc-os-43",
      "topic": "lec6-deadlock",
      "front": "What is Deadlock in an Operating System?",
      "back": "A situation where a set of processes are blocked because every process holds at least one resource and is waiting to acquire another resource held by some other process in the set, creating an unresolvable stalemate.",
      "hint": "Processes waiting for resources held by each other"
    },
    {
      "id": "fc-os-44",
      "topic": "lec6-deadlock",
      "front": "What are the 4 Coffman Conditions required for Deadlock?",
      "back": "ALL 4 must hold simultaneously:\n1. Mutual Exclusion (Non-shareable resource)\n2. Hold and Wait (Holding resources while requesting more)\n3. No Preemption (Resources cannot be forcibly seized)\n4. Circular Wait (Closed loop of waiting processes: P0->P1->...->P0).",
      "hint": "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait"
    },
    {
      "id": "fc-os-45",
      "topic": "lec6-deadlock",
      "front": "In a Resource Allocation Graph (RAG), how are requests and assignments drawn?",
      "back": "• Request Edge: Process -> Resource (Pi -> Rj; directed arrow pointing to resource)\n• Assignment Edge: Resource -> Process (Rj -> Pi; directed arrow pointing from resource instance to process).",
      "hint": "Pi -> Rj (Request); Rj -> Pi (Assignment)"
    },
    {
      "id": "fc-os-46",
      "topic": "lec6-deadlock",
      "front": "Does a cycle in a Resource Allocation Graph (RAG) always guarantee deadlock?",
      "back": "• If resources have SINGLE instances: YES, a cycle guarantees deadlock.\n• If resources have MULTIPLE instances: NO, a cycle is necessary but not sufficient (other processes outside the cycle may release instances).",
      "hint": "Single instance: yes; Multiple instances: not necessarily"
    },
    {
      "id": "fc-os-47",
      "topic": "lec6-deadlock",
      "front": "How does Deadlock Prevention work?",
      "back": "Deadlock Prevention eliminates the possibility of deadlock by constraining resource requests so that at least ONE of the 4 Coffman conditions can NEVER hold (e.g. denying Circular Wait by enforcing a strict global resource ordering).",
      "hint": "Invalidate at least 1 Coffman condition"
    },
    {
      "id": "fc-os-48",
      "topic": "lec6-deadlock",
      "front": "What is the Banker's Algorithm and what matrices does it use?",
      "back": "A deadlock avoidance algorithm developed by Edsger Dijkstra. Evaluates whether granting a resource request leaves the system in a SAFE STATE.\nUses: Available vector, Max matrix, Allocation matrix, and Need matrix where: Need[i][j] = Max[i][j] - Allocation[i][j].",
      "hint": "Dijkstra's Safe State algorithm (Need = Max - Alloc)"
    },
    {
      "id": "fc-os-49",
      "topic": "lec6-deadlock",
      "front": "What is the difference between a Safe State and an Unsafe State?",
      "back": "• Safe State: There exists at least one Safe Sequence <P1, P2, ... Pn> where every process can complete without deadlock.\n• Unsafe State: Deadlock is NOT yet guaranteed, but the OS can no longer prevent processes from potentially entering deadlock.",
      "hint": "Safe sequence exists vs vulnerability to deadlock"
    },
    {
      "id": "fc-os-50",
      "topic": "lec6-deadlock",
      "front": "What is the Ostrich Algorithm for deadlock handling?",
      "back": "To stick your head in the sand and ignore deadlocks altogether, assuming they occur rarely enough that rebooting is cheaper than the constant runtime overhead of prevention or avoidance. Used by most general-purpose OS (Windows, Linux, macOS).",
      "hint": "Ignore deadlocks (Windows, Linux, macOS approach)"
    }
  ],
  "questions": [
    {
      "id": "q-os-mcq-1",
      "type": "mcq",
      "question": "Which Windows version first introduced the modern Start Button, Start Menu, and Taskbar?",
      "options": [
        "Windows 3.0",
        "Windows 95",
        "Windows 98",
        "Windows XP"
      ],
      "correctIndex": 1,
      "explanation": "Windows 95 (released August 24, 1995, codename Chicago) revolutionized the desktop interface with the Start Button, Start Menu, and Taskbar."
    },
    {
      "id": "q-os-mcq-2",
      "type": "mcq",
      "question": "What was Bill Gates's original proposed name for Windows before release?",
      "options": [
        "Interface Manager",
        "Graphical DOS",
        "Desktop Window",
        "Vision OS"
      ],
      "correctIndex": 0,
      "explanation": "Bill Gates originally called it 'Interface Manager' before the marketing team convinced him that 'Windows' was far more appealing."
    },
    {
      "id": "q-os-mcq-3",
      "type": "mcq",
      "question": "Why did Microsoft officially skip naming a version 'Windows 9'?",
      "options": [
        "Superstition regarding the number 9 in Asian markets",
        "Legacy third-party code checking for 'Windows 95/98' used 'version.startsWith(\"Windows 9\")'",
        "Windows 8 had 9 cumulative updates",
        "Apple had already trademarked OS 9"
      ],
      "correctIndex": 1,
      "explanation": "Tons of legacy software inspected OS version strings with: if (version.startsWith('Windows 9')) to detect Windows 95 and 98. Naming it Windows 9 would cause apps to falsely run in 90s compatibility mode."
    },
    {
      "id": "q-os-mcq-4",
      "type": "mcq",
      "question": "Which macOS version broke the 12-year 'big cat' naming convention and was named after a surf spot?",
      "options": [
        "Mac OS X 10.6 Snow Leopard",
        "Mac OS X 10.8 Mountain Lion",
        "Mac OS X 10.9 Mavericks",
        "macOS 10.10 Yosemite"
      ],
      "correctIndex": 2,
      "explanation": "Mac OS X 10.9 Mavericks (released in 2013) transitioned Apple from feline predators to notable California geographic landmarks."
    },
    {
      "id": "q-os-mcq-5",
      "type": "mcq",
      "question": "Which OS component is responsible for allocating and deallocating temporary RAM space to running processes?",
      "options": [
        "Secondary Storage Management",
        "Main Memory Management",
        "Process Management",
        "File Management"
      ],
      "correctIndex": 1,
      "explanation": "Main Memory Management handles the allocation and deallocation of volatile RAM so that active processes have adequate execution space without collisions."
    },
    {
      "id": "q-os-mcq-6",
      "type": "mcq",
      "question": "A user launches Google Chrome, Spotify, and Visual Studio Code simultaneously. Which OS property is being utilized?",
      "options": [
        "Portability",
        "Multitasking",
        "Real-Time Processing",
        "Distributed Computing"
      ],
      "correctIndex": 1,
      "explanation": "Multitasking allows an OS to execute multiple user applications concurrently by dividing CPU time slices amongst active tasks."
    },
    {
      "id": "q-os-mcq-7",
      "type": "mcq",
      "question": "An anti-lock braking system (ABS) or automobile airbag requires which type of operating system?",
      "options": [
        "Batch Processing OS",
        "Time-Sharing OS",
        "Real-Time OS (RTOS)",
        "Distributed OS"
      ],
      "correctIndex": 2,
      "explanation": "Real-Time Operating Systems (RTOS) guarantee execution within strict deterministic deadlines where delayed computation leads to system failure."
    },
    {
      "id": "q-os-mcq-8",
      "type": "mcq",
      "question": "In the 5-state process model, what state does a process enter immediately after its I/O request finishes?",
      "options": [
        "Running",
        "Ready",
        "Waiting",
        "Terminated"
      ],
      "correctIndex": 1,
      "explanation": "When an I/O operation completes, the hardware raises an interrupt, and the OS places the process in the READY queue. It cannot jump straight to Running until the CPU scheduler dispatches it."
    },
    {
      "id": "q-os-mcq-9",
      "type": "mcq",
      "question": "Which data structure is maintained by the operating system to store all execution context and accounting details for an active process?",
      "options": [
        "File Allocation Table (FAT)",
        "Process Control Block (PCB)",
        "Translation Lookaside Buffer (TLB)",
        "Interrupt Vector Table (IVT)"
      ],
      "correctIndex": 1,
      "explanation": "The Process Control Block (PCB) holds the PID, program counter, register values, scheduling priority, memory limits, and open file lists for a process."
    },
    {
      "id": "q-os-mcq-10",
      "type": "mcq",
      "question": "Which CPU scheduling algorithm is mathematically provable to yield the minimum average waiting time?",
      "options": [
        "First-Come, First-Served (FCFS)",
        "Shortest Job First (SJF)",
        "Round Robin (RR)",
        "Priority Scheduling"
      ],
      "correctIndex": 1,
      "explanation": "SJF (Shortest Job First) is provably optimal because scheduling shorter jobs ahead reduces the cumulative waiting time for all subsequent processes."
    },
    {
      "id": "q-os-mcq-11",
      "type": "mcq",
      "question": "What undesirable phenomenon occurs in FCFS scheduling when a CPU-bound process holds the processor while multiple short I/O-bound processes wait behind it?",
      "options": [
        "Thrashing",
        "Convoy Effect",
        "Priority Inversion",
        "Belady's Anomaly"
      ],
      "correctIndex": 1,
      "explanation": "The Convoy Effect occurs in FCFS when smaller processes queue behind a massive CPU burst process, causing severe latency and device underutilization."
    },
    {
      "id": "q-os-mcq-12",
      "type": "mcq",
      "question": "In Round Robin scheduling, what happens if the time quantum (q) is chosen to be excessively large (approaching infinity)?",
      "options": [
        "The system suffers severe context switch overhead",
        "The scheduling behavior degenerates into standard FCFS",
        "Deadlock is immediately triggered",
        "Starvation occurs for all low-priority processes"
      ],
      "correctIndex": 1,
      "explanation": "If the time quantum exceeds the longest process burst time, no process is ever preempted, which makes Round Robin behave identically to First-Come, First-Served."
    },
    {
      "id": "q-os-mcq-13",
      "type": "mcq",
      "question": "Which technique is specifically used to prevent indefinite starvation of low-priority processes in Priority Scheduling?",
      "options": [
        "Swapping",
        "Aging",
        "Compaction",
        "Paging"
      ],
      "correctIndex": 1,
      "explanation": "Aging gradually increments the priority of waiting processes over time, ensuring that even the lowest priority job will eventually attain the highest priority and run."
    },
    {
      "id": "q-os-mcq-14",
      "type": "mcq",
      "question": "Which of the following is NOT one of the four necessary Coffman conditions for deadlock?",
      "options": [
        "Mutual Exclusion",
        "Preemption Allowed",
        "Hold and Wait",
        "Circular Wait"
      ],
      "correctIndex": 1,
      "explanation": "The Coffman condition is 'No Preemption' (resources cannot be seized forcibly). If preemption is allowed, deadlock cannot occur!"
    },
    {
      "id": "q-os-mcq-15",
      "type": "mcq",
      "question": "In Banker's Algorithm, if Max[i][j] = 9 and Allocation[i][j] = 4, what is the value of Need[i][j]?",
      "options": [
        "13",
        "5",
        "36",
        "0.44"
      ],
      "correctIndex": 1,
      "explanation": "Need is defined as Need = Max - Allocation. Therefore, 9 - 4 = 5 remaining resource instances required."
    },
    {
      "id": "q-os-mcq-16",
      "type": "mcq",
      "question": "What is the primary strategy used by Windows, Linux, and macOS to handle deadlocks in everyday operation?",
      "options": [
        "Strict avoidance using Banker's Algorithm on every system call",
        "Complete prevention by disabling mutual exclusion",
        "Deadlock ignorance (Ostrich Algorithm)",
        "Continuous cycle detection every 10 milliseconds"
      ],
      "correctIndex": 2,
      "explanation": "General-purpose operating systems employ the Ostrich Algorithm—they ignore potential deadlocks because the runtime cost of verification outweighs rare deadlock occurrences."
    },
    {
      "id": "q-os-mcq-17",
      "type": "mcq",
      "question": "A process has an arrival time of 0 ms, burst time of 8 ms, and completes at 14 ms. What is its Waiting Time?",
      "options": [
        "14 ms",
        "8 ms",
        "6 ms",
        "22 ms"
      ],
      "correctIndex": 2,
      "explanation": "Turnaround Time = Completion - Arrival = 14 - 0 = 14 ms. Waiting Time = Turnaround Time - Burst Time = 14 - 8 = 6 ms."
    },
    {
      "id": "q-os-mcq-18",
      "type": "mcq",
      "question": "Which macOS version was nicknamed the first official release with the Aqua interface and animal naming?",
      "options": [
        "Mac OS X 10.0 Cheetah",
        "Mac OS X 10.1 Puma",
        "Mac OS X 10.2 Jaguar",
        "Mac OS X Public Beta"
      ],
      "correctIndex": 0,
      "explanation": "Mac OS X 10.0 Cheetah (released March 24, 2001) was the first official commercial release featuring the Aqua UI."
    },
    {
      "id": "q-os-mcq-19",
      "type": "mcq",
      "question": "Which scheduler controls the 'degree of multiprogramming' by selecting jobs from secondary storage into memory?",
      "options": [
        "Short-Term Scheduler",
        "Long-Term Scheduler",
        "Medium-Term Scheduler",
        "I/O Dispatcher"
      ],
      "correctIndex": 1,
      "explanation": "The Long-Term Scheduler (Job Scheduler) determines how many processes reside simultaneously in main memory (the degree of multiprogramming)."
    },
    {
      "id": "q-os-mcq-20",
      "type": "mcq",
      "question": "What happens during a process context switch?",
      "options": [
        "The CPU converts virtual addresses to physical addresses",
        "The OS saves the state of the active process into its PCB and restores the state of another ready process",
        "The disk swaps dirty cache blocks into secondary storage",
        "All open file descriptors are terminated"
      ],
      "correctIndex": 1,
      "explanation": "A context switch preserves the state (PC, registers) of the outgoing process in its PCB and restores the execution state of the incoming process from its PCB."
    },
    {
      "id": "q-os-tf-1",
      "type": "trueFalse",
      "question": "MS-DOS provided full native GUI desktop support and built-in mouse interaction upon its 1981 debut.",
      "isTrue": false,
      "explanation": "False. MS-DOS was strictly a text-based, command-line interface (CLI) with no graphical user interface (GUI) or native mouse support."
    },
    {
      "id": "q-os-tf-2",
      "type": "trueFalse",
      "question": "A safe state in Banker's Algorithm guarantees that a system will not enter a deadlock condition.",
      "isTrue": true,
      "explanation": "True. A system is in a safe state if there exists at least one sequence of process executions that allows every process to satisfy its maximum claim without deadlock."
    },
    {
      "id": "q-os-tf-3",
      "type": "trueFalse",
      "question": "In a Resource Allocation Graph, the presence of a cycle always guarantees deadlock even when resources have multiple instances.",
      "isTrue": false,
      "explanation": "False. If resources possess multiple instances, a cycle is a necessary condition, but NOT sufficient. Another process outside the cycle may release an instance."
    },
    {
      "id": "q-os-tf-4",
      "type": "trueFalse",
      "question": "When a running process experiences an I/O completion interrupt, the OS moves it directly back into the RUNNING state.",
      "isTrue": false,
      "explanation": "False. The process transitions from WAITING to the READY queue. It must wait for the CPU scheduler to dispatch it before it can execute."
    },
    {
      "id": "q-os-tf-5",
      "type": "trueFalse",
      "question": "Linus Torvalds originally developed the Linux kernel as an open-source project in September 1991.",
      "isTrue": true,
      "explanation": "True. Linus Torvalds released version 0.01 of the Linux kernel on September 17, 1991."
    },
    {
      "id": "q-os-tf-6",
      "type": "trueFalse",
      "question": "Windows ME (Millennium Edition) was widely celebrated as the most stable business operating system ever released by Microsoft.",
      "isTrue": false,
      "explanation": "False. Windows ME was notoriously buggy, prone to frequent crashes, and widely ridiculed as the 'Mistake Edition'."
    },
    {
      "id": "q-os-tf-7",
      "type": "trueFalse",
      "question": "Multithreading allows multiple threads within the same process to share code, data, and heap memory spaces.",
      "isTrue": true,
      "explanation": "True. Threads belonging to the same process share address space (code, global data, heap), maintaining only private stack and register contexts."
    },
    {
      "id": "q-os-tf-8",
      "type": "trueFalse",
      "question": "Shortest Remaining Time First (SRTF) is the non-preemptive variant of Shortest Job First (SJF).",
      "isTrue": false,
      "explanation": "False. SRTF is the PREEMPTIVE version of SJF. Standard SJF is non-preemptive."
    },
    {
      "id": "q-os-tf-9",
      "type": "trueFalse",
      "question": "Deadlock avoidance requires the operating system to have a priori knowledge of the maximum resources each process will ever claim.",
      "isTrue": true,
      "explanation": "True. Algorithms like Banker's Algorithm require declaring the maximum resource demand vector in advance to evaluate safe transitions."
    },
    {
      "id": "q-os-tf-10",
      "type": "trueFalse",
      "question": "Context switching time is pure overhead because the system performs no useful computation for user programs during the switch.",
      "isTrue": true,
      "explanation": "True. Saving registers to the PCB and loading the next process state consumes CPU cycles without advancing application computation."
    },
    {
      "id": "q-os-id-1",
      "type": "identification",
      "question": "What is the original codename given to Windows 95 during its multi-year development at Microsoft?",
      "answer": "Chicago",
      "acceptableAnswers": [
        "Chicago",
        "Project Chicago"
      ],
      "hint": "Major Midwestern US city",
      "explanation": "Windows 95 was famously codenamed 'Chicago' before its historic August 1995 worldwide launch."
    },
    {
      "id": "q-os-id-2",
      "type": "identification",
      "question": "What formula calculates the Need matrix for process i and resource j in Banker's Algorithm?",
      "answer": "Max - Allocation",
      "acceptableAnswers": [
        "Max - Allocation",
        "Max - Alloc",
        "Need = Max - Allocation"
      ],
      "hint": "Difference between maximum claim and current allocation",
      "explanation": "Need[i][j] = Max[i][j] - Allocation[i][j]. It represents remaining resources the process may request."
    },
    {
      "id": "q-os-id-3",
      "type": "identification",
      "question": "Name the four necessary conditions formulated by Edward G. Coffman Jr. that must all hold simultaneously for deadlock to occur.",
      "answer": "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait",
      "acceptableAnswers": [
        "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait",
        "Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait"
      ],
      "hint": "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait",
      "explanation": "All 4 Coffman conditions must hold concurrently for deadlock to exist."
    },
    {
      "id": "q-os-id-4",
      "type": "identification",
      "question": "Which operating system scheduling metric is defined as the elapsed time from process submission to process completion (Completion Time - Arrival Time)?",
      "answer": "Turnaround Time",
      "acceptableAnswers": [
        "Turnaround Time",
        "TAT",
        "Turnaround"
      ],
      "hint": "TAT",
      "explanation": "Turnaround Time measures total time spent from arrival until completion: TAT = CT - AT."
    },
    {
      "id": "q-os-id-5",
      "type": "identification",
      "question": "Which OS component is responsible for interfacing between user commands (typed or graphical) and OS system calls (e.g. bash, PowerShell, zsh)?",
      "answer": "Command Interpreter System",
      "acceptableAnswers": [
        "Command Interpreter System",
        "Command Interpreter",
        "Shell",
        "CLI",
        "Command Line Interpreter"
      ],
      "hint": "Shell or Command Interpreter",
      "explanation": "The Command Interpreter System (Shell) parses text or GUI inputs and dispatches system calls to the operating system kernel."
    },
    {
      "id": "q-os-id-6",
      "type": "identification",
      "question": "What mechanism gradually increases the scheduling priority of waiting processes to prevent starvation in priority-based queues?",
      "answer": "Aging",
      "acceptableAnswers": [
        "Aging",
        "Process Aging"
      ],
      "hint": "Getting older over time",
      "explanation": "Aging is a technique where the priority of a process increases proportionally to its wait time in the ready queue."
    },
    {
      "id": "q-os-match-1",
      "type": "matching",
      "title": "Match the Operating System Milestone to Its Defining Achievement",
      "pairs": [
        {
          "term": "Windows 95",
          "definition": "Introduced Start Button, Start Menu, Taskbar, and Plug and Play (Codename Chicago)"
        },
        {
          "term": "Windows 1.0",
          "definition": "Originally named Interface Manager; first graphical Windows with mouse support"
        },
        {
          "term": "Mac OS X Mavericks",
          "definition": "Broke the big cat naming tradition in favor of California geographical locations"
        },
        {
          "term": "Windows ME",
          "definition": "Infamous for bugs and crashes; colloquially nicknamed 'Mistake Edition'"
        },
        {
          "term": "Linux (1991)",
          "definition": "Free and open-source UNIX-like kernel founded by Linus Benedict Torvalds"
        }
      ]
    },
    {
      "id": "q-os-match-2",
      "type": "matching",
      "title": "Match the OS Component to Its Operational Scenario",
      "pairs": [
        {
          "term": "I/O Device Management",
          "definition": "Typing keystrokes on a mechanical keyboard or printing a document"
        },
        {
          "term": "Security Management",
          "definition": "Authenticating user passwords or biometric facial recognition at login"
        },
        {
          "term": "Process Management",
          "definition": "Switching execution between Chrome, PowerPoint, and Spotify without conflict"
        },
        {
          "term": "Command Interpreter (Shell)",
          "definition": "Parsing user terminal commands such as 'cd Desktop' or 'mkdir Reviewer'"
        },
        {
          "term": "Secondary Storage Management",
          "definition": "Writing a downloaded 10 GB file onto physical sectors of an SSD drive"
        }
      ]
    },
    {
      "id": "q-os-match-3",
      "type": "matching",
      "title": "Match the 5 Process States to Their Descriptions",
      "pairs": [
        {
          "term": "NEW",
          "definition": "The process is currently being created and initialized by the OS"
        },
        {
          "term": "READY",
          "definition": "Residing in main memory waiting to be assigned a CPU core by the scheduler"
        },
        {
          "term": "RUNNING",
          "definition": "Instructions are currently being executed directly by the CPU"
        },
        {
          "term": "WAITING",
          "definition": "Blocked while waiting for an external event or I/O operation to complete"
        },
        {
          "term": "TERMINATED",
          "definition": "Has completed execution and is having its allocated resources reclaimed"
        }
      ]
    },
    {
      "id": "q-os-match-4",
      "type": "matching",
      "title": "Match the CPU Scheduling Algorithm to Its Defining Trait",
      "pairs": [
        {
          "term": "FCFS",
          "definition": "Non-preemptive queue that suffers from the slow Convoy Effect"
        },
        {
          "term": "SJF",
          "definition": "Provably optimal algorithm yielding minimum average waiting time"
        },
        {
          "term": "Round Robin",
          "definition": "Time-sharing algorithm using a fixed time quantum (q) and circular queue"
        },
        {
          "term": "SRTF",
          "definition": "Preemptive version of Shortest Job First that preempts if a shorter job arrives"
        },
        {
          "term": "Priority Scheduling",
          "definition": "Selects highest priority process; requires Aging to prevent starvation"
        }
      ]
    },
    {
      "id": "q-os-match-5",
      "type": "matching",
      "title": "Match the Deadlock Coffman Condition to Its Definition",
      "pairs": [
        {
          "term": "Mutual Exclusion",
          "definition": "At least one resource must be held in a non-shareable mode by only one process"
        },
        {
          "term": "Hold and Wait",
          "definition": "A process holds allocated resources while waiting to acquire additional ones"
        },
        {
          "term": "No Preemption",
          "definition": "Resources cannot be forcibly revoked; must be released voluntarily by the holder"
        },
        {
          "term": "Circular Wait",
          "definition": "A closed loop exists where each process holds resources needed by the next"
        },
        {
          "term": "Banker's Algorithm",
          "definition": "Avoidance algorithm verifying safe execution sequences using Need = Max - Alloc"
        }
      ]
    }
  ]
};

if (typeof window !== 'undefined') {
  window.osData = OS_SUBJECT;
  window.OS_SUBJECT = OS_SUBJECT;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = OS_SUBJECT;
}
