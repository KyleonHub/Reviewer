// Main App Logic for Reviewer & RLW Interactive System

// 1. Sound Effects (Web Audio API)
class SoundSynth {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }
  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
  playFlip() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.08);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }
  playCorrect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.setValueAtTime(659.25, now + 0.09);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }
  playIncorrect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(120, now + 0.2);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }
}
const sounds = new SoundSynth();

// 2. Storage & Default Subjects List
const STORAGE_KEY = 'reviewer_subjects_list';
const THEME_KEY = 'reviewer_theme';

const DEFAULT_SUBJECTS = [
  { id: 'subj-rlw', name: "Rizal's Life and Works (RLW)", isSpecial: true },
  { id: 'subj-fmss', name: "Mixed Signals", isSpecial: true },
  { id: 'subj-logic', name: "Logic Circuits", isSpecial: true }
];

const TEMPLATE_SUBJECT_IDS = ['subj-os', 'subj-fb', 'subj-cpe'];

function getActiveSubjectData() {
  if (!currentSubject) return window.RLW_SUBJECT;
  if ((currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) {
    return window.FMSS_SUBJECT || window.RLW_SUBJECT;
  }
  if (currentSubject.id === 'subj-logic') {
    return window.logicData || window.RLW_SUBJECT;
  }
  return window.RLW_SUBJECT;
}

let subjects = [];
let currentSubject = null;
let currentMode = null; // 'flashcard', 'mcq', 'trueFalse', 'identification', 'matching', 'randomizer', 'gallery'

// Mode active session state
let activeItems = [];
let currentIndex = 0;
let score = 0;
let isAnswered = false;
let isFlipped = false;
let selectedOption = null;

// Levenshtein fuzzy string matcher
function isFuzzyMatch(userInput, targetAnswer, acceptableAnswers = []) {
  const norm = str => str.toLowerCase().replace(/[-_.,/()]/g, ' ').replace(/\s+/g, ' ').trim();
  const cleanUser = norm(userInput);
  const targets = [targetAnswer, ...acceptableAnswers].map(norm);
  if (targets.includes(cleanUser)) return true;

  const lev = (a, b) => {
    const m = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    for (let i = 0; i <= a.length; i++) m[i][0] = i;
    for (let j = 0; j <= b.length; j++) m[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
    }
    return m[a.length][b.length];
  };

  return targets.some(target => target.length >= 4 && lev(cleanUser, target) <= 2);
}

// Initialize Application
function initApp() {
  initTheme();
  loadSubjects();
  setupEventListeners();
}

function loadSubjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      subjects = JSON.parse(raw).filter(s => !TEMPLATE_SUBJECT_IDS.includes(s.id));
      if (!subjects.some(s => s.id === 'subj-rlw')) {
        subjects.unshift({ id: 'subj-rlw', name: "Rizal's Life and Works (RLW)", isSpecial: true });
      }
      if (!subjects.some(s => s.id === 'subj-fmss')) {
        subjects.push({ id: 'subj-fmss', name: "Mixed Signals", isSpecial: true });
      }
      if (!subjects.some(s => s.id === 'subj-logic')) {
        subjects.push({ id: 'subj-logic', name: "Logic Circuits", isSpecial: true });
      }
    } else {
      subjects = [...DEFAULT_SUBJECTS];
    }
  } catch (e) {
    subjects = [...DEFAULT_SUBJECTS];
  }
  saveSubjects();
}

function saveSubjects() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
  renderMainMenuView();
}

// Navigation & Screen View State
function showMainMenu() {
  currentSubject = null;
  currentMode = null;
  document.getElementById('mainMenuView').classList.remove('hidden');
  document.getElementById('subjectStudyView').classList.add('hidden');
  renderMainMenuView();
}

function openSubject(subjectId) {
  sounds.playFlip();
  currentSubject = subjects.find(s => s.id === subjectId) || subjects[0];
  document.getElementById('mainMenuView').classList.add('hidden');
  document.getElementById('subjectStudyView').classList.remove('hidden');
  
  document.getElementById('studySubjectTitle').textContent = currentSubject.name;
  showSubjectModesMenu();
}

function showSubjectModesMenu() {
  currentMode = null;
  if (typeof oscAnimationId !== 'undefined' && oscAnimationId) {
    cancelAnimationFrame(oscAnimationId);
    oscAnimationId = null;
  }
  document.getElementById('modesChooserView').classList.remove('hidden');
  document.getElementById('activeStudyArena').classList.add('hidden');
  renderSubjectModesCards();
}

function renderSubjectModesCards() {
  const container = document.getElementById('modesCardsContainer');
  if (!container) return;

  const isFmss = currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic');
  const isLogic = currentSubject && currentSubject.id === 'subj-logic';
  const subjData = getActiveSubjectData();
  const qCount = (subjData && subjData.questions) ? subjData.questions.length : 0;
  const fcCount = (subjData && subjData.flashcards) ? subjData.flashcards.length : 0;

  let cardsHtml = '';

  if (isLogic) {
    cardsHtml = `
      <!-- 1. Interactive Logic Workbench -->
      <div 
        onclick="startMode('workbench')"
        class="p-4 sm:p-5 rounded-2xl border border-emerald-500/40 bg-emerald-50/10 dark:bg-emerald-950/20 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between active:scale-[0.99]"
      >
        <div class="flex items-center gap-3 sm:gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20">
            <i data-lucide="binary" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white group-hover:text-emerald-400 transition-colors">
              Interactive Logic Workbench
            </h3>
            <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              7 Logic Gates, Circuit Simplifier & 7400 ICs
            </span>
          </div>
        </div>
        <i data-lucide="chevron-right" class="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform"></i>
      </div>

      <!-- 2. Randomizer Quiz -->
      <div 
        onclick="startMode('randomizer')"
        class="p-4 sm:p-5 rounded-2xl border border-purple-500/40 bg-purple-50/10 dark:bg-purple-950/20 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between active:scale-[0.99]"
      >
        <div class="flex items-center gap-3 sm:gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-purple-500/20">
            <i data-lucide="shuffle" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white group-hover:text-purple-400 transition-colors">
              Randomizer Quiz
            </h3>
            <span class="text-[11px] font-bold text-purple-600 dark:text-purple-400">
              ${qCount} Combinational Circuit & Gate Problems
            </span>
          </div>
        </div>
        <i data-lucide="chevron-right" class="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform"></i>
      </div>

      <!-- 3. Flashcards -->
      <div 
        onclick="startMode('flashcards')"
        class="p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-brand-500 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between active:scale-[0.99]"
      >
        <div class="flex items-center gap-3 sm:gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <i data-lucide="layers" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors">
              Flashcards
            </h3>
            <span class="text-[11px] font-bold text-zinc-400">
              ${fcCount} Boolean Theorems & Gate Identities
            </span>
          </div>
        </div>
        <i data-lucide="chevron-right" class="w-4 h-4 text-zinc-400 group-hover:text-brand-500 transition-colors"></i>
      </div>
    `;
  } else if (isFmss) {
    cardsHtml = `
      <!-- 1. Interactive Workbench -->
      <div 
        onclick="startMode('workbench')"
        class="p-4 sm:p-5 rounded-2xl border border-cyan-500/40 bg-cyan-50/10 dark:bg-cyan-950/20 hover:border-cyan-500 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between active:scale-[0.99]"
      >
        <div class="flex items-center gap-3 sm:gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-cyan-500/20">
            <i data-lucide="cpu" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white group-hover:text-cyan-400 transition-colors">
              Interactive Workbench
            </h3>
            <span class="text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
              Circuit Lab, 741 IC & Sensors
            </span>
          </div>
        </div>
        <i data-lucide="chevron-right" class="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform"></i>
      </div>

      <!-- 2. Randomizer Quiz -->
      <div 
        onclick="startMode('randomizer')"
        class="p-4 sm:p-5 rounded-2xl border border-purple-500/40 bg-purple-50/10 dark:bg-purple-950/20 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between active:scale-[0.99]"
      >
        <div class="flex items-center gap-3 sm:gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-purple-500/20">
            <i data-lucide="shuffle" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white group-hover:text-purple-400 transition-colors">
              Randomizer Quiz
            </h3>
            <span class="text-[11px] font-bold text-purple-600 dark:text-purple-400">
              ${qCount} Problems & Questions
            </span>
          </div>
        </div>
        <i data-lucide="chevron-right" class="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform"></i>
      </div>

      <!-- 3. Flashcards -->
      <div 
        onclick="startMode('flashcards')"
        class="p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-brand-500 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between active:scale-[0.99]"
      >
        <div class="flex items-center gap-3 sm:gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <i data-lucide="layers" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors">
              Flashcards
            </h3>
            <span class="text-[11px] font-bold text-zinc-400">
              ${fcCount} Formula & Theory Cards
            </span>
          </div>
        </div>
        <i data-lucide="chevron-right" class="w-4 h-4 text-zinc-400 group-hover:text-brand-500 transition-colors"></i>
      </div>
    `;
  } else {
    cardsHtml = `
      <!-- 1. Flashcards -->
      <div 
        onclick="startMode('flashcards')"
        class="p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-brand-500 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between active:scale-[0.99]"
      >
        <div class="flex items-center gap-3 sm:gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <i data-lucide="layers" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white group-hover:text-brand-500 transition-colors">
              Flashcards
            </h3>
            <span class="text-[11px] font-bold text-zinc-400">
              ${fcCount} Cards with Photos
            </span>
          </div>
        </div>
        <i data-lucide="chevron-right" class="w-4 h-4 text-zinc-400 group-hover:text-brand-500 transition-colors"></i>
      </div>

      <!-- 2. Randomizer Quiz -->
      <div 
        onclick="startMode('randomizer')"
        class="p-4 sm:p-5 rounded-2xl border border-purple-500/40 bg-purple-50/10 dark:bg-purple-950/20 hover:border-purple-500 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between active:scale-[0.99]"
      >
        <div class="flex items-center gap-3 sm:gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
            <i data-lucide="shuffle" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white group-hover:text-purple-400 transition-colors">
              Randomizer Quiz
            </h3>
            <span class="text-[11px] font-bold text-purple-400">
              ${qCount} Randomized Questions
            </span>
          </div>
        </div>
        <i data-lucide="chevron-right" class="w-4 h-4 text-purple-400"></i>
      </div>
    `;
  }

  container.innerHTML = cardsHtml;
  if (window.lucide) window.lucide.createIcons();
}

// Render Main Menu (Labels Only, Simple, Dark Mode)
function renderMainMenuView() {
  const grid = document.getElementById('subjectsGrid');
  const countBadge = document.getElementById('subjectCountBadge');
  countBadge.textContent = subjects.length;

  grid.innerHTML = subjects.map(s => `
    <div 
      onclick="openSubject('${s.id}')"
      class="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-md transition-all cursor-pointer select-none active:scale-[0.99]"
    >
      <div class="flex items-center gap-3 sm:gap-3.5 flex-1 min-w-0 pr-2">
        <div class="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-brand-50 dark:group-hover:bg-brand-950 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          <i data-lucide="${s.id === 'subj-rlw' ? 'award' : (s.id === 'subj-fmss' ? 'cpu' : (s.id === 'subj-logic' ? 'binary' : 'folder'))}" class="w-5 h-5"></i>
        </div>
        <span class="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 break-words leading-snug">
          ${escapeHtml(s.name)}
        </span>
      </div>

      <div class="flex items-center gap-1 shrink-0">
        ${(s.id !== 'subj-rlw' && s.id !== 'subj-fmss' && s.id !== 'subj-logic') ? `
          <button 
            onclick="deleteSubject(event, '${s.id}')"
            class="opacity-0 group-hover:opacity-100 p-2 text-zinc-400 hover:text-rose-500 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
            title="Delete"
          >
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        ` : ''}
        <i data-lucide="chevron-right" class="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 group-hover:text-brand-500 transition-transform"></i>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

// ----------------------------------------------------
// STUDY MODES IMPLEMENTATION FOR RLW
// ----------------------------------------------------

function startMode(modeName, randomize = false) {
  sounds.playFlip();
  currentMode = modeName;
  if (typeof oscAnimationId !== 'undefined' && oscAnimationId) {
    cancelAnimationFrame(oscAnimationId);
    oscAnimationId = null;
  }
  document.getElementById('modesChooserView').classList.add('hidden');
  document.getElementById('activeStudyArena').classList.remove('hidden');

  const activeData = getActiveSubjectData();
  score = 0;
  currentIndex = 0;
  isAnswered = false;
  isFlipped = false;
  selectedOption = null;

  if (modeName === 'workbench') {
    renderInteractiveWorkbench();
  } else if (modeName === 'flashcards') {
    activeItems = [...(activeData.flashcards || [])];
    if (randomize) activeItems.sort(() => Math.random() - 0.5);
    renderFlashcard();
  } else {
    // Randomizer Quiz: full randomized pool of all lesson questions
    currentMode = 'randomizer';
    const rawQuestions = activeData.questions || [];
    const pool = rawQuestions.map(q => {
      if (q.type === 'mcq') {
        const originalCorrect = q.options[q.correctIndex];
        const shuffledOpts = [...q.options].sort(() => Math.random() - 0.5);
        const newCorrectIndex = shuffledOpts.indexOf(originalCorrect);
        return {
          ...q,
          options: shuffledOpts,
          correctIndex: newCorrectIndex
        };
      } else if (q.type === 'matching') {
        return {
          ...q,
          shuffledTerms: [...q.pairs].sort(() => Math.random() - 0.5),
          shuffledDefs: [...q.pairs].sort(() => Math.random() - 0.5),
          matchedPairs: new Set(),
          selTerm: null,
          selDef: null
        };
      }
      return { ...q };
    });
    // Shuffle all questions so question formats and topics are completely mixed
    activeItems = pool.sort(() => Math.random() - 0.5);
    renderRandomizerItem();
  }
}

// A. Flashcard Mode
function renderFlashcard() {
  const arena = document.getElementById('activeStudyArena');
  const card = activeItems[currentIndex];
  const progress = Math.round(((currentIndex + 1) / activeItems.length) * 100);

  arena.innerHTML = `
    <div class="space-y-6 max-w-2xl mx-auto">
      <div class="flex items-center justify-between">
        <button onclick="showSubjectModesMenu()" class="text-xs font-bold text-zinc-500 hover:text-brand-500 flex items-center gap-1">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Modes
        </button>
        <div class="flex items-center gap-2">
          <button onclick="startMode('flashcards', true)" class="p-2 rounded-xl text-zinc-400 hover:text-brand-500 hover:bg-zinc-100 dark:hover:bg-zinc-800" title="Randomize / Shuffle">
            <i data-lucide="shuffle" class="w-4 h-4"></i>
          </button>
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            Card ${currentIndex + 1} of ${activeItems.length}
          </span>
        </div>
      </div>

      <div class="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
        <div class="bg-brand-600 h-full rounded-full transition-all duration-300" style="width: ${progress}%"></div>
      </div>

      <!-- Flip Card -->
      <div onclick="toggleCardFlip()" class="w-full cursor-pointer select-none rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-8 min-h-[300px] sm:min-h-[340px] flex flex-col justify-between shadow-xl transition-all hover:border-brand-500/50 active:scale-[0.99]">
        <div class="flex items-center justify-between text-xs font-bold text-zinc-400 uppercase">
          <span id="fcSideLabel">${isFlipped ? 'Answer & Context' : 'Question'}</span>
          <span class="flex items-center gap-1"><i data-lucide="rotate-cw" class="w-3 h-3"></i> Flip</span>
        </div>

        <div class="my-auto py-3 sm:py-4 space-y-3 sm:space-y-4 text-center">
          ${card.image ? `
            <div class="w-20 h-20 sm:w-28 sm:h-28 mx-auto rounded-2xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
              <img 
                src="${card.image.url}" 
                alt="${card.image.title || 'Supportive Photo'}" 
                class="w-full h-full object-cover object-top"
                onerror="this.parentElement.style.display='none';"
              />
            </div>
          ` : ''}
          <h2 id="fcMainText" class="text-base sm:text-xl font-black leading-relaxed text-zinc-900 dark:text-white whitespace-pre-line">
            ${isFlipped ? card.back : card.front}
          </h2>
          ${isFlipped && card.image && card.image.caption ? `
            <p class="text-xs text-zinc-500 dark:text-zinc-400 italic max-w-md mx-auto">
              ${card.image.caption}
            </p>
          ` : ''}
        </div>

        <div class="text-center text-xs text-zinc-400 font-medium">
          ${isFlipped ? 'Rate your recall below' : (card.hint ? ((currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? `Hint: ${card.hint}` : `Pahiwatig: ${card.hint}`) : ((currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Tap card to view answer' : 'Tap card to view answer'))}
        </div>
      </div>

      <!-- Rating Buttons -->
      <div class="grid grid-cols-3 gap-2 sm:gap-3">
        <button onclick="handleFlashcardNext(false)" class="min-h-[48px] px-2 sm:px-5 py-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 text-xs sm:text-sm font-bold flex items-center justify-center gap-1 sm:gap-1.5 transition-transform active:scale-95">
          <i data-lucide="x" class="w-4 h-4"></i> <span>Practice</span>
        </button>
        <button onclick="toggleCardFlip()" class="min-h-[48px] px-2 sm:px-5 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-1 sm:gap-1.5 transition-transform active:scale-95">
          <i data-lucide="rotate-cw" class="w-4 h-4"></i> <span>Flip</span>
        </button>
        <button onclick="handleFlashcardNext(true)" class="min-h-[48px] px-2 sm:px-5 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 text-xs sm:text-sm font-bold flex items-center justify-center gap-1 sm:gap-1.5 transition-transform active:scale-95">
          <i data-lucide="check" class="w-4 h-4"></i> <span>Got It!</span>
        </button>
      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}

function toggleCardFlip() {
  sounds.playFlip();
  isFlipped = !isFlipped;
  const card = activeItems[currentIndex];
  renderFlashcard();
}

function handleFlashcardNext(gotIt) {
  if (gotIt) {
    sounds.playCorrect();
    score++;
  } else {
    sounds.playIncorrect();
  }

  if (currentIndex + 1 < activeItems.length) {
    currentIndex++;
    isFlipped = false;
    renderFlashcard();
  } else {
    renderCompletionScreen('Flashcards', score, activeItems.length);
  }
}

// B. Multiple Choice Mode
function renderMcq() {
  const arena = document.getElementById('activeStudyArena');
  const q = activeItems[currentIndex];
  const progress = Math.round(((currentIndex + 1) / activeItems.length) * 100);

  arena.innerHTML = `
    <div class="space-y-6 max-w-2xl mx-auto">
      <div class="flex items-center justify-between">
        <button onclick="showSubjectModesMenu()" class="text-xs font-bold text-zinc-500 hover:text-brand-500 flex items-center gap-1">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Modes
        </button>
        <div class="flex items-center gap-2">
          <button onclick="startMode('randomizer')" class="p-2 rounded-xl text-zinc-400 hover:text-brand-500 hover:bg-zinc-100 dark:hover:bg-zinc-800" title="Randomize / Shuffle">
            <i data-lucide="shuffle" class="w-4 h-4"></i>
          </button>
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            ${currentIndex + 1} / ${activeItems.length}
          </span>
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            Score: ${score}
          </span>
        </div>
      </div>

      <div class="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
        <div class="bg-brand-600 h-full rounded-full transition-all duration-300" style="width: ${progress}%"></div>
      </div>

      <div class="rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-8 shadow-xl space-y-5 sm:space-y-6">
        
        ${q.circuitSvg ? `
          <div class="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-inner overflow-x-auto space-y-2">
            <div class="flex items-center justify-between text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
              <span class="flex items-center gap-1.5">
                <i data-lucide="binary" class="w-3.5 h-3.5"></i>
                Combinational Logic Circuit Diagram
              </span>
              <span class="text-zinc-500">Simplify to minimal form</span>
            </div>
            ${q.circuitSvg}
          </div>
        ` : ''}

        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4">
          ${q.image ? `
            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700 shadow-sm bg-zinc-100 dark:bg-zinc-800">
              <img 
                src="${q.image.url}" 
                alt="${q.image.title || 'Supportive Visual'}" 
                class="w-full h-full object-cover object-top"
                onerror="this.parentElement.style.display='none';"
              />
            </div>
          ` : ''}
          <div class="flex-1">
            <span class="text-xs font-bold uppercase tracking-wider text-brand-500">Multiple Choice</span>
            <h2 class="text-base sm:text-lg font-black text-zinc-900 dark:text-white leading-relaxed mt-1">
              ${q.question}
            </h2>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          ${q.options.map((opt, idx) => {
            let style = "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 hover:border-brand-500 active:scale-[0.98]";
            if (isAnswered) {
              if (idx === q.correctIndex) style = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold";
              else if (selectedOption === idx) style = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200";
              else style = "opacity-40 border-zinc-200 dark:border-zinc-800";
            }
            return `
              <button 
                onclick="handleMcqAnswer(${idx})" 
                ${isAnswered ? 'disabled' : ''}
                class="min-h-[48px] p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold flex items-center gap-3 transition-all ${style}"
              >
                <div class="w-7 h-7 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-xs font-bold flex items-center justify-center shrink-0">
                  ${String.fromCharCode(65 + idx)}
                </div>
                <span class="leading-snug">${opt}</span>
              </button>
            `;
          }).join('')}
        </div>

        ${isAnswered ? `
          <div class="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 text-xs space-y-1">
            <span class="font-bold ${selectedOption === q.correctIndex ? 'text-emerald-600' : 'text-rose-500'}">
              ${selectedOption === q.correctIndex ? ((currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Correct!' : 'Tama!') : ((currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Incorrect.' : 'Mali.')}
            </span>
            <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed">${q.explanation}</p>
          </div>
          <div class="flex justify-end pt-1 sm:pt-2">
            <button onclick="advanceMcq()" class="min-h-[44px] px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm active:scale-95">
              <span>${currentIndex + 1 === activeItems.length ? 'View Score' : 'Next Question'}</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}

function handleMcqAnswer(idx) {
  if (isAnswered) return;
  selectedOption = idx;
  isAnswered = true;
  const q = activeItems[currentIndex];
  if (idx === q.correctIndex) {
    sounds.playCorrect();
    score++;
  } else {
    sounds.playIncorrect();
  }
  renderMcq();
}

function advanceMcq() {
  if (currentIndex + 1 < activeItems.length) {
    currentIndex++;
    isAnswered = false;
    selectedOption = null;
    renderRandomizerItem();
  } else {
    renderCompletionScreen('Randomizer Quiz', score, activeItems.length);
  }
}

// C. True or False Mode
function renderTrueFalse() {
  const arena = document.getElementById('activeStudyArena');
  const q = activeItems[currentIndex];
  const progress = Math.round(((currentIndex + 1) / activeItems.length) * 100);

  arena.innerHTML = `
    <div class="space-y-6 max-w-2xl mx-auto">
      <div class="flex items-center justify-between">
        <button onclick="showSubjectModesMenu()" class="text-xs font-bold text-zinc-500 hover:text-brand-500 flex items-center gap-1">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Modes
        </button>
        <div class="flex items-center gap-2">
          <button onclick="startMode('randomizer')" class="p-2 rounded-xl text-zinc-400 hover:text-brand-500 hover:bg-zinc-100 dark:hover:bg-zinc-800" title="Randomize / Shuffle">
            <i data-lucide="shuffle" class="w-4 h-4"></i>
          </button>
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            ${currentIndex + 1} / ${activeItems.length}
          </span>
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            Score: ${score}
          </span>
        </div>
      </div>

      <div class="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
        <div class="bg-brand-600 h-full rounded-full transition-all duration-300" style="width: ${progress}%"></div>
      </div>

      <div class="rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-8 shadow-xl space-y-5 sm:space-y-6 text-center">
        ${q.circuitSvg ? `
          <div class="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-inner overflow-x-auto text-left space-y-2 mb-4">
            <div class="flex items-center justify-between text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
              <span class="flex items-center gap-1.5">
                <i data-lucide="binary" class="w-3.5 h-3.5"></i>
                Combinational Logic Circuit Diagram
              </span>
            </div>
            ${q.circuitSvg}
          </div>
        ` : ''}
        ${q.image ? `
          <div class="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
            <img 
              src="${q.image.url}" 
              alt="${q.image.title || 'Supportive Visual'}" 
              class="w-full h-full object-cover object-top"
              onerror="this.parentElement.style.display='none';"
            />
          </div>
        ` : ''}

        <span class="text-xs font-bold uppercase tracking-wider text-brand-500">True or False</span>
        <h2 class="text-base sm:text-xl font-black text-zinc-900 dark:text-white leading-relaxed max-w-lg mx-auto">
          "${q.question}"
        </h2>

        <div class="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto pt-2">
          <button 
            onclick="handleTfAnswer(true)"
            ${isAnswered ? 'disabled' : ''}
            class="min-h-[52px] sm:min-h-[60px] p-4 sm:p-5 rounded-2xl border text-base sm:text-lg font-black transition-all flex items-center justify-center ${
              isAnswered 
                ? (q.answer === true ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-600' : 'opacity-30 border-zinc-200 dark:border-zinc-800')
                : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 hover:border-emerald-500 active:scale-95'
            }"
          >
            TRUE
          </button>
          <button 
            onclick="handleTfAnswer(false)"
            ${isAnswered ? 'disabled' : ''}
            class="min-h-[52px] sm:min-h-[60px] p-4 sm:p-5 rounded-2xl border text-base sm:text-lg font-black transition-all flex items-center justify-center ${
              isAnswered 
                ? (q.answer === false ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-600' : 'opacity-30 border-zinc-200 dark:border-zinc-800')
                : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 hover:border-rose-500 active:scale-95'
            }"
          >
            FALSE
          </button>
        </div>

        ${isAnswered ? `
          <div class="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 text-xs space-y-1 text-left max-w-lg mx-auto">
            <span class="font-bold ${selectedOption === q.answer ? 'text-emerald-600' : 'text-rose-500'}">
              ${selectedOption === q.answer ? ((currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Correct!' : 'Tama!') : ((currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? `Incorrect. The correct answer is ${q.answer ? 'TRUE' : 'FALSE'}.` : `Mali. Ang tamang sagot ay ${q.answer ? 'TRUE' : 'FALSE'}.`)}
            </span>
            <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed">${q.explanation}</p>
          </div>
          <div class="flex justify-end pt-1 sm:pt-2">
            <button onclick="advanceTf()" class="min-h-[44px] px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm active:scale-95">
              <span>${currentIndex + 1 === activeItems.length ? 'View Score' : 'Next Statement'}</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}

function handleTfAnswer(val) {
  if (isAnswered) return;
  selectedOption = val;
  isAnswered = true;
  const q = activeItems[currentIndex];
  if (val === q.answer) {
    sounds.playCorrect();
    score++;
  } else {
    sounds.playIncorrect();
  }
  renderTrueFalse();
}

function advanceTf() {
  if (currentIndex + 1 < activeItems.length) {
    currentIndex++;
    isAnswered = false;
    selectedOption = null;
    renderRandomizerItem();
  } else {
    renderCompletionScreen('Randomizer Quiz', score, activeItems.length);
  }
}

// D. Identification Mode
function renderIdentification() {
  const arena = document.getElementById('activeStudyArena');
  const q = activeItems[currentIndex];
  const progress = Math.round(((currentIndex + 1) / activeItems.length) * 100);

  arena.innerHTML = `
    <div class="space-y-6 max-w-2xl mx-auto">
      <div class="flex items-center justify-between">
        <button onclick="showSubjectModesMenu()" class="text-xs font-bold text-zinc-500 hover:text-brand-500 flex items-center gap-1">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Modes
        </button>
        <div class="flex items-center gap-2">
          <button onclick="startMode('randomizer')" class="p-2 rounded-xl text-zinc-400 hover:text-brand-500 hover:bg-zinc-100 dark:hover:bg-zinc-800" title="Randomize / Shuffle">
            <i data-lucide="shuffle" class="w-4 h-4"></i>
          </button>
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            ${currentIndex + 1} / ${activeItems.length}
          </span>
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            Score: ${score}
          </span>
        </div>
      </div>

      <div class="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
        <div class="bg-brand-600 h-full rounded-full transition-all duration-300" style="width: ${progress}%"></div>
      </div>

      <div class="rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-8 shadow-xl space-y-5 sm:space-y-6">
        ${q.circuitSvg ? `
          <div class="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-inner overflow-x-auto space-y-2">
            <div class="flex items-center justify-between text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
              <span class="flex items-center gap-1.5">
                <i data-lucide="binary" class="w-3.5 h-3.5"></i>
                Combinational Logic Circuit Diagram
              </span>
            </div>
            ${q.circuitSvg}
          </div>
        ` : ''}
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4">
          ${q.image ? `
            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700 shadow-sm bg-zinc-100 dark:bg-zinc-800">
              <img 
                src="${q.image.url}" 
                alt="${q.image.title || 'Supportive Visual'}" 
                class="w-full h-full object-cover object-top"
                onerror="this.parentElement.style.display='none';"
              />
            </div>
          ` : ''}
          <div class="flex-1">
            <span class="text-xs font-bold uppercase tracking-wider text-brand-500">${(currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Identification' : 'Identification / Tukuyin'}</span>
            <h2 class="text-base sm:text-lg font-black text-zinc-900 dark:text-white leading-relaxed mt-1">
              ${q.question}
            </h2>
          </div>
        </div>

        <form id="idForm" onsubmit="handleIdSubmit(event)" class="space-y-3">
          <div class="flex gap-2.5 sm:gap-3">
            <input 
              type="text" 
              id="idInput"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              ${isAnswered ? 'disabled' : ''}
              placeholder="${(currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Type your answer here...' : 'I-type ang iyong sagot dito...'}" 
              class="flex-1 min-h-[48px] px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-base font-semibold outline-none focus:border-brand-500 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
            />
            ${!isAnswered ? `
              <button type="submit" class="min-h-[48px] px-5 sm:px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-sm active:scale-95 shrink-0">
                Check
              </button>
            ` : ''}
          </div>
        </form>

        <div class="flex items-center justify-between text-xs text-zinc-400">
          <span>${q.hint ? ((currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? `Hint: ${q.hint}` : `Pahiwatig: ${q.hint}`) : ''}</span>
          ${!isAnswered ? `
            <button onclick="revealIdAnswer()" class="text-brand-500 hover:underline font-semibold py-1">
              ${(currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? "Don't know? Show answer" : 'Hindi alam? Ipakita ang sagot'}
            </button>
          ` : ''}
        </div>

        ${isAnswered ? `
          <div class="p-4 rounded-2xl border text-xs space-y-1 ${
            selectedOption === 'correct' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200' : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200'
          }">
            <span class="font-bold">${selectedOption === 'correct' ? ((currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Correct! Well done.' : 'Tama! Magaling.') : ((currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Incorrect.' : 'Mali.')}</span>
            <div>${(currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Correct Answer:' : 'Tamang Sagot:'} <span class="font-black text-sm">${q.answer}</span></div>
          </div>
          <div class="flex justify-end pt-1 sm:pt-2">
            <button onclick="advanceId()" class="min-h-[44px] px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm active:scale-95">
              <span>${currentIndex + 1 === activeItems.length ? 'View Score' : 'Next'}</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
  if (!isAnswered) setTimeout(() => document.getElementById('idInput')?.focus(), 50);
  if (window.lucide) window.lucide.createIcons();
}

function handleIdSubmit(e) {
  e.preventDefault();
  if (isAnswered) return;
  const input = document.getElementById('idInput').value.trim();
  if (!input) return;

  const q = activeItems[currentIndex];
  const matched = isFuzzyMatch(input, q.answer, q.acceptableAnswers);
  isAnswered = true;
  selectedOption = matched ? 'correct' : 'wrong';

  if (matched) {
    sounds.playCorrect();
    score++;
  } else {
    sounds.playIncorrect();
  }
  renderIdentification();
}

function revealIdAnswer() {
  if (isAnswered) return;
  isAnswered = true;
  selectedOption = 'wrong';
  sounds.playIncorrect();
  renderIdentification();
}

function advanceId() {
  if (currentIndex + 1 < activeItems.length) {
    currentIndex++;
    isAnswered = false;
    selectedOption = null;
    renderRandomizerItem();
  } else {
    renderCompletionScreen('Randomizer Quiz', score, activeItems.length);
  }
}

// E. Matching Mode
let matchingTerms = [];
let matchingDefs = [];
let selTermId = null;
let selDefId = null;
let matchedPairIds = new Set();
let matchAttempts = 0;

function startMatchingMode() {
  const rlw = window.RLW_SUBJECT;
  const pairs = [...rlw.matching];
  matchingTerms = [...pairs].sort(() => Math.random() - 0.5);
  matchingDefs = [...pairs].sort(() => Math.random() - 0.5);
  selTermId = null;
  selDefId = null;
  matchedPairIds = new Set();
  matchAttempts = 0;
  renderMatching();
}

function renderMatching() {
  const arena = document.getElementById('activeStudyArena');
  const isAllMatched = matchedPairIds.size === matchingTerms.length;

  arena.innerHTML = `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <button onclick="showSubjectModesMenu()" class="text-xs font-bold text-zinc-500 hover:text-brand-500 flex items-center gap-1">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Modes
        </button>
        <div class="flex items-center gap-2">
          <button onclick="startMatchingMode()" class="p-2 rounded-xl text-zinc-400 hover:text-brand-500 hover:bg-zinc-100 dark:hover:bg-zinc-800" title="Randomize / Restart">
            <i data-lucide="shuffle" class="w-4 h-4"></i>
          </button>
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            Matched: ${matchedPairIds.size} / ${matchingTerms.length}
          </span>
        </div>
      </div>

      <div class="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-brand-500">Matching Type</span>
          <h2 class="text-lg sm:text-xl font-black text-zinc-900 dark:text-white">${(currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Match Concepts and Definitions' : 'Pagkabitin ang mga Konsepto at Kahulugan'}</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Column A (Terms) -->
          <div class="space-y-2.5">
            <span class="text-xs font-bold text-zinc-400 uppercase">${(currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Column A: Concept / Name' : 'Column A: Konsepto / Pangalan'}</span>
            ${matchingTerms.map(t => {
              const matched = matchedPairIds.has(t.id);
              const selected = selTermId === t.id;
              let style = "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 hover:border-brand-500";
              if (matched) style = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 opacity-60";
              else if (selected) style = "border-brand-600 bg-brand-50 dark:bg-brand-950 text-brand-600 ring-2 ring-brand-500/20";
              return `
                <button 
                  onclick="selectMatchTerm('${t.id}')"
                  ${matched ? 'disabled' : ''}
                  class="w-full p-4 rounded-xl border text-left font-bold text-sm transition-all ${style}"
                >
                  ${t.term}
                </button>
              `;
            }).join('')}
          </div>

          <!-- Column B (Definitions) -->
          <div class="space-y-2.5">
            <span class="text-xs font-bold text-zinc-400 uppercase">${(currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Column B: Definition' : 'Column B: Kahulugan'}</span>
            ${matchingDefs.map(d => {
              const matched = matchedPairIds.has(d.id);
              const selected = selDefId === d.id;
              let style = "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 hover:border-brand-500";
              if (matched) style = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 opacity-60";
              else if (selected) style = "border-brand-600 bg-brand-50 dark:bg-brand-950 text-brand-600 ring-2 ring-brand-500/20";
              return `
                <button 
                  onclick="selectMatchDef('${d.id}')"
                  ${matched ? 'disabled' : ''}
                  class="w-full p-4 rounded-xl border text-left text-xs font-semibold leading-relaxed transition-all ${style}"
                >
                  ${d.definition}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        ${isAllMatched ? `
          <div class="pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center space-y-4">
            <h3 class="text-xl font-black text-emerald-600">${(currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'All pairs matched successfully!' : 'Lahat ay matagumpay na naipagkabit!'}</h3>
            <button onclick="startMatchingMode()" class="px-6 py-3 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-md">
              ${(currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Play Again' : 'Maglaro Muli'}
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}

function selectMatchTerm(id) {
  sounds.playFlip();
  selTermId = id;
  if (selDefId) checkMatchPair(selTermId, selDefId);
  else renderMatching();
}

function selectMatchDef(id) {
  sounds.playFlip();
  selDefId = id;
  if (selTermId) checkMatchPair(selTermId, selDefId);
  else renderMatching();
}

function checkMatchPair(termId, defId) {
  matchAttempts++;
  if (termId === defId) {
    sounds.playCorrect();
    matchedPairIds.add(termId);
    selTermId = null;
    selDefId = null;
    renderMatching();
  } else {
    sounds.playIncorrect();
    renderMatching();
    setTimeout(() => {
      selTermId = null;
      selDefId = null;
      renderMatching();
    }, 600);
  }
}

// F. Randomizer Quiz Mode
function renderRandomizerItem() {
  const item = activeItems[currentIndex];
  if (!item) return;
  if (item.type === 'mcq') renderMcq();
  else if (item.type === 'tf') renderTrueFalse();
  else if (item.type === 'id') renderIdentification();
  else if (item.type === 'matching') renderRandomizerMatching();
  else renderFlashcard();
}

function renderRandomizerMatching() {
  const arena = document.getElementById('activeStudyArena');
  const q = activeItems[currentIndex];
  const progress = Math.round(((currentIndex + 1) / activeItems.length) * 100);
  const matchedCount = q.matchedPairs ? q.matchedPairs.size : 0;
  const totalPairs = q.pairs.length;
  const isFinished = matchedCount === totalPairs;

  arena.innerHTML = `
    <div class="space-y-6 max-w-2xl mx-auto">
      <div class="flex items-center justify-between">
        <button onclick="showSubjectModesMenu()" class="text-xs font-bold text-zinc-500 hover:text-brand-500 flex items-center gap-1">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Modes
        </button>
        <div class="flex items-center gap-2">
          <button onclick="startMode('randomizer')" class="p-2 rounded-xl text-zinc-400 hover:text-brand-500 hover:bg-zinc-100 dark:hover:bg-zinc-800" title="Restart / Reshuffle">
            <i data-lucide="shuffle" class="w-4 h-4"></i>
          </button>
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            ${currentIndex + 1} / ${activeItems.length}
          </span>
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
            Score: ${score}
          </span>
        </div>
      </div>

      <div class="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
        <div class="bg-purple-600 h-full rounded-full transition-all duration-300" style="width: ${progress}%"></div>
      </div>

      <div class="rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-8 shadow-xl space-y-5 sm:space-y-6">
        <div>
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-purple-500">Matching Type</span>
            <span class="text-xs font-bold text-zinc-400">${(currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Matched:' : 'Naipagkabit:'} ${matchedCount} / ${totalPairs}</span>
          </div>
          <h2 class="text-base sm:text-lg font-black text-zinc-900 dark:text-white mt-1">
            ${q.title || ((currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Match each concept with its correct definition' : 'Pagkabitin ang bawat konsepto sa tamang kahulugan')}
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <!-- Column A: Terms -->
          <div class="space-y-2">
            <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">${(currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Column A: Concept' : 'Column A: Konsepto'}</span>
            ${q.shuffledTerms.map((t) => {
              const isMatched = q.matchedPairs.has(t.term);
              const isSelected = q.selTerm === t.term;
              let style = "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 hover:border-purple-500 active:scale-[0.98]";
              if (isMatched) style = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 opacity-60 pointer-events-none";
              else if (isSelected) style = "border-purple-500 bg-purple-500/10 text-purple-500 ring-2 ring-purple-500/30";
              const safeTerm = t.term.replace(/'/g, "\\'");
              return `
                <button 
                  onclick="selectRndMatchTerm('${safeTerm}')"
                  ${isMatched ? 'disabled' : ''}
                  class="w-full min-h-[44px] p-3 rounded-xl border text-left font-bold text-xs sm:text-sm transition-all flex items-center ${style}"
                >
                  ${t.term}
                </button>
              `;
            }).join('')}
          </div>

          <!-- Column B: Definitions -->
          <div class="space-y-2">
            <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">${(currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Column B: Definition' : 'Column B: Kahulugan'}</span>
            ${q.shuffledDefs.map((d) => {
              const isMatched = Array.from(q.matchedPairs).some(term => {
                const pair = q.pairs.find(p => p.term === term);
                return pair && pair.definition === d.definition;
              });
              const isSelected = q.selDef === d.definition;
              let style = "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 hover:border-purple-500 active:scale-[0.98]";
              if (isMatched) style = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 opacity-60 pointer-events-none";
              else if (isSelected) style = "border-purple-500 bg-purple-500/10 text-purple-500 ring-2 ring-purple-500/30";
              const safeDef = d.definition.replace(/'/g, "\\'");
              return `
                <button 
                  onclick="selectRndMatchDef('${safeDef}')"
                  ${isMatched ? 'disabled' : ''}
                  class="w-full min-h-[44px] p-3 rounded-xl border text-left text-xs leading-relaxed transition-all flex items-center ${style}"
                >
                  ${d.definition}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        ${isFinished ? `
          <div class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 text-emerald-600 text-xs font-bold text-center">
            ${(currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'All pairs matched successfully!' : 'Matagumpay na naipagkabit ang lahat ng pares!'}
          </div>
          <div class="flex justify-end pt-1 sm:pt-2">
            <button onclick="advanceRndMatch()" class="min-h-[44px] px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm active:scale-95">
              <span>${currentIndex + 1 === activeItems.length ? 'View Final Score' : 'Next Question'}</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>
        ` : `
          <div class="flex justify-between items-center pt-2">
            <span class="text-xs text-zinc-400">${(currentSubject && (currentSubject.id === 'subj-fmss' || currentSubject.id === 'subj-logic')) ? 'Select concept from Column A and match with Column B' : 'Piliin ang konsepto sa Column A at itugma sa Column B'}</span>
            <button onclick="advanceRndMatch()" class="min-h-[40px] px-3 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 font-semibold active:scale-95">
              Skip Question
            </button>
          </div>
        `}
      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}

function selectRndMatchTerm(term) {
  const q = activeItems[currentIndex];
  if (!q || q.type !== 'matching') return;
  sounds.playFlip();
  q.selTerm = term;
  if (q.selDef) checkRndMatch(q);
  else renderRandomizerMatching();
}

function selectRndMatchDef(def) {
  const q = activeItems[currentIndex];
  if (!q || q.type !== 'matching') return;
  sounds.playFlip();
  q.selDef = def;
  if (q.selTerm) checkRndMatch(q);
  else renderRandomizerMatching();
}

function checkRndMatch(q) {
  const pair = q.pairs.find(p => p.term === q.selTerm);
  if (pair && pair.definition === q.selDef) {
    sounds.playCorrect();
    q.matchedPairs.add(q.selTerm);
    q.selTerm = null;
    q.selDef = null;
    if (q.matchedPairs.size === q.pairs.length) {
      score++;
    }
    renderRandomizerMatching();
  } else {
    sounds.playIncorrect();
    renderRandomizerMatching();
    setTimeout(() => {
      q.selTerm = null;
      q.selDef = null;
      renderRandomizerMatching();
    }, 600);
  }
}

function advanceRndMatch() {
  if (currentIndex + 1 < activeItems.length) {
    currentIndex++;
    isAnswered = false;
    selectedOption = null;
    renderRandomizerItem();
  } else {
    renderCompletionScreen('Randomizer Quiz', score, activeItems.length);
  }
}

// G. Supporting Visual Materials Gallery
function renderGallery() {
  const arena = document.getElementById('activeStudyArena');
  const rlw = window.RLW_SUBJECT;

  arena.innerHTML = `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <button onclick="showSubjectModesMenu()" class="text-xs font-bold text-zinc-500 hover:text-brand-500 flex items-center gap-1">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Modes
        </button>
        <span class="text-xs font-bold uppercase tracking-wider text-brand-500">Historical Visual Materials</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        ${rlw.visuals.map(v => `
          <div class="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-md space-y-3 flex flex-col">
            <div class="aspect-w-16 aspect-h-12 bg-zinc-900 h-52 overflow-hidden relative">
              <img 
                src="${v.url}" 
                alt="${v.title}" 
                loading="lazy" 
                class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                onerror="this.onerror=null; this.src='data:image/svg+xml,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'%236366f1\\' stroke-width=\\'2\\'><rect width=\\'18\\' height=\\'18\\' x=\\'3\\' y=\\'3\\' rx=\\'2\\'/><circle cx=\\'9\\' cy=\\'9\\' r=\\'2\\'/><path d=\\'m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\\'/></svg>';"
              />
            </div>
            <div class="p-4 pt-1 space-y-1.5 flex-1 flex flex-col justify-between">
              <h3 class="font-black text-sm text-zinc-900 dark:text-white">${v.title}</h3>
              <p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">${v.caption}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}

// Completion Score Screen
function renderCompletionScreen(modeTitle, finalScore, total) {
  sounds.playCorrect();
  const arena = document.getElementById('activeStudyArena');
  const pct = Math.round((finalScore / total) * 100);

  arena.innerHTML = `
    <div class="rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-12 text-center space-y-5 sm:space-y-6 shadow-xl max-w-lg mx-auto">
      <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-brand-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-brand-500/30">
        <i data-lucide="award" class="w-7 h-7 sm:w-8 sm:h-8"></i>
      </div>

      <div class="space-y-1">
        <h2 class="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">${modeTitle} Completed!</h2>
        <span class="text-xs text-zinc-400">${currentSubject ? currentSubject.name : 'Reviewer'}</span>
      </div>

      <div class="inline-flex items-center gap-5 sm:gap-6 p-3.5 sm:p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800">
        <div>
          <div class="text-xs font-bold text-zinc-400">Score</div>
          <div class="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">${finalScore} / ${total}</div>
        </div>
        <div class="w-px h-8 bg-zinc-300 dark:bg-zinc-700"></div>
        <div>
          <div class="text-xs font-bold text-zinc-400">Accuracy</div>
          <div class="text-xl sm:text-2xl font-black text-brand-600">${pct}%</div>
        </div>
      </div>

      <div class="flex items-center justify-center gap-2.5 sm:gap-3 pt-2">
        <button onclick="startMode('${currentMode}', true)" class="min-h-[44px] px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95">
          Retry Randomize
        </button>
        <button onclick="showSubjectModesMenu()" class="min-h-[44px] px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs sm:text-sm active:scale-95">
          Modes Menu
        </button>
      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Global modal and dark mode bindings
function setupEventListeners() {
  // Modal controls
  const addModal = document.getElementById('addModal');
  const openAddModalBtn = document.getElementById('openAddModalBtn');
  const closeAddModalBtn = document.getElementById('closeAddModalBtn');
  const cancelAddBtn = document.getElementById('cancelAddBtn');
  const addSubjectForm = document.getElementById('addSubjectForm');
  const subjectNameInput = document.getElementById('subjectNameInput');

  function openModal() {
    addModal.classList.remove('hidden');
    addModal.classList.add('flex');
    subjectNameInput.value = '';
    setTimeout(() => subjectNameInput.focus(), 50);
  }
  function closeModal() {
    addModal.classList.add('hidden');
    addModal.classList.remove('flex');
  }

  if (openAddModalBtn) openAddModalBtn.addEventListener('click', openModal);
  if (closeAddModalBtn) closeAddModalBtn.addEventListener('click', closeModal);
  if (cancelAddBtn) cancelAddBtn.addEventListener('click', closeModal);
  if (addModal) {
    addModal.addEventListener('click', (e) => {
      if (e.target === addModal) closeModal();
    });
  }

  if (addSubjectForm) {
    addSubjectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = subjectNameInput.value.trim();
      if (!name) return;
      subjects.push({ id: 'subj-' + Date.now(), name });
      saveSubjects();
      closeModal();
    });
  }

  // Keyboard shortcut for flashcard flip (Spacebar)
  window.addEventListener('keydown', (e) => {
    if (currentMode === 'flashcards' && e.code === 'Space' && e.target.tagName !== 'INPUT') {
      e.preventDefault();
      toggleCardFlip();
    }
  });
}

function deleteSubject(e, id) {
  e.stopPropagation();
  subjects = subjects.filter(s => s.id !== id);
  saveSubjects();
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const isDark = saved ? saved === 'dark' : true;
  setTheme(isDark);

  const btn = document.getElementById('themeToggleBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      const isCurrentlyDark = document.documentElement.classList.contains('dark');
      setTheme(!isCurrentlyDark);
    });
  }
}

function setTheme(isDark) {
  const icon = document.getElementById('themeIcon');
  if (isDark) {
    document.documentElement.classList.add('dark');
    localStorage.setItem(THEME_KEY, 'dark');
    if (icon) icon.setAttribute('data-lucide', 'sun');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem(THEME_KEY, 'light');
    if (icon) icon.setAttribute('data-lucide', 'moon');
  }
  if (window.lucide) window.lucide.createIcons();
}

// Expose functions globally for inline HTML attributes
window.openSubject = openSubject;
window.deleteSubject = deleteSubject;
window.showMainMenu = showMainMenu;
window.showSubjectModesMenu = showSubjectModesMenu;
window.startMode = startMode;
window.toggleCardFlip = toggleCardFlip;
window.handleFlashcardNext = handleFlashcardNext;
window.handleMcqAnswer = handleMcqAnswer;
window.advanceMcq = advanceMcq;
window.handleTfAnswer = handleTfAnswer;
window.advanceTf = advanceTf;
window.handleIdSubmit = handleIdSubmit;
window.revealIdAnswer = revealIdAnswer;
window.advanceId = advanceId;
window.startMatchingMode = startMatchingMode;
window.selectMatchTerm = selectMatchTerm;
window.selectMatchDef = selectMatchDef;

// Run initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}



// =========================================================================
// INTERACTIVE WORKBENCH (FULL ENGLISH WITH STEP-BY-STEP RESISTOR CALCULATOR)
// =========================================================================

let wbState = {
  tab: 'circuit', // 'circuit', 'pinout', 'sensor'
  circuitType: 'inverting', // 'inverting', 'nonInverting', 'buffer', 'comparator'
  viewMode: 'values', // 'values' or 'symbolic'
  rf: 50, // kOhms
  rin: 10, // kOhms
  vin: 0.2, // V
  vcc: 15.0, // V
  targetGain: 10, // for resistor sizing calculation
  selectedPin: 2,
  sensorType: 'ultrasonic',
  sensorStimulus: 0.006
};

function toggleWbViewMode(mode) {
  wbState.viewMode = mode;
  renderInteractiveWorkbench(true);
}
let oscAnimationId = null;

function setWbTab(tabName) {
  sounds.playFlip();
  wbState.tab = tabName;
  if (oscAnimationId) {
    cancelAnimationFrame(oscAnimationId);
    oscAnimationId = null;
  }
  renderInteractiveWorkbench();
}

function setWbCircuit(type) {
  sounds.playFlip();
  wbState.circuitType = type;
  if (type === 'inverting') {
    wbState.rf = 50;
    wbState.rin = 10;
    wbState.vin = 0.2;
  } else if (type === 'nonInverting') {
    wbState.rf = 90;
    wbState.rin = 10;
    wbState.vin = 0.2;
  } else if (type === 'buffer') {
    wbState.rf = 0;
    wbState.rin = 10;
    wbState.vin = 1.5;
  } else if (type === 'comparator') {
    wbState.rf = 0;
    wbState.rin = 10;
    wbState.vin = 0.5;
  }
  renderInteractiveWorkbench();
}

function updateWbParam(param, value) {
  wbState[param] = parseFloat(value);
  renderInteractiveWorkbench(true);
}

function selectWbPin(pinNum) {
  sounds.playFlip();
  wbState.selectedPin = pinNum;
  renderInteractiveWorkbench(true);
}

function selectWbSensor(sensorType) {
  sounds.playFlip();
  wbState.sensorType = sensorType;
  if (sensorType === 'ultrasonic') wbState.sensorStimulus = 0.006;
  else if (sensorType === 'temp') wbState.sensorStimulus = 35.0;
  else if (sensorType === 'strain') wbState.sensorStimulus = 25.0;
  else if (sensorType === 'flame') wbState.sensorStimulus = 900;
  renderInteractiveWorkbench(true);
}

function renderInteractiveWorkbench(keepScroll = false) {
  const arena = document.getElementById('activeStudyArena');
  if (!arena) return;

  if (currentSubject && currentSubject.id === 'subj-logic') {
    renderLogicWorkbench();
    return;
  }

  const Vsat = wbState.vcc - 1.0;
  let Av = 1;
  let theoreticalVout = wbState.vin;
  let phaseDeg = 0;

  if (wbState.circuitType === 'inverting') {
    Av = -(wbState.rf / Math.max(0.1, wbState.rin));
    theoreticalVout = Av * wbState.vin;
    phaseDeg = 180;
  } else if (wbState.circuitType === 'nonInverting') {
    Av = 1 + (wbState.rf / Math.max(0.1, wbState.rin));
    theoreticalVout = Av * wbState.vin;
    phaseDeg = 0;
  } else if (wbState.circuitType === 'buffer') {
    Av = 1.0;
    theoreticalVout = wbState.vin;
    phaseDeg = 0;
  } else if (wbState.circuitType === 'comparator') {
    theoreticalVout = wbState.vin > 0 ? Vsat : -Vsat;
    Av = wbState.vin > 0 ? Infinity : -Infinity;
  }

  const isSaturated = Math.abs(theoreticalVout) > Vsat;
  const actualVout = Math.max(-Vsat, Math.min(Vsat, theoreticalVout));

  arena.innerHTML = `
    <div class="space-y-6 max-w-4xl mx-auto">
      
      <!-- Top Navigation & Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <button onclick="showSubjectModesMenu()" class="text-xs font-bold text-zinc-500 hover:text-cyan-500 flex items-center gap-1.5 transition-colors self-start">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Modes
        </button>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
            <i data-lucide="cpu" class="w-3.5 h-3.5"></i> Component Workbench
          </span>
        </div>
      </div>

      <!-- Workbench Sub-Tabs -->
      <div class="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
        <button 
          onclick="setWbTab('circuit')" 
          class="py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${wbState.tab === 'circuit' ? 'bg-white dark:bg-zinc-800 text-cyan-600 dark:text-cyan-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}"
        >
          <i data-lucide="calculator" class="w-4 h-4"></i>
          <span class="hidden sm:inline">1. Resistor & Circuit Lab</span>
          <span class="sm:hidden">Circuit Lab</span>
        </button>
        <button 
          onclick="setWbTab('pinout')" 
          class="py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${wbState.tab === 'pinout' ? 'bg-white dark:bg-zinc-800 text-cyan-600 dark:text-cyan-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}"
        >
          <i data-lucide="cpu" class="w-4 h-4"></i>
          <span class="hidden sm:inline">2. 741 IC Pinout</span>
          <span class="sm:hidden">741 Pinout</span>
        </button>
        <button 
          onclick="setWbTab('sensor')" 
          class="py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${wbState.tab === 'sensor' ? 'bg-white dark:bg-zinc-800 text-cyan-600 dark:text-cyan-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}"
        >
          <i data-lucide="git-commit" class="w-4 h-4"></i>
          <span class="hidden sm:inline">3. Sensor Signal Chain</span>
          <span class="sm:hidden">Sensors</span>
        </button>
      </div>

      ${wbState.tab === 'circuit' ? renderCircuitLabContent(Av, theoreticalVout, actualVout, Vsat, isSaturated, phaseDeg) : ''}
      ${wbState.tab === 'pinout' ? renderPinoutContent() : ''}
      ${wbState.tab === 'sensor' ? renderSensorContent() : ''}

    </div>
  `;

  if (window.lucide) window.lucide.createIcons();

  if (wbState.tab === 'circuit') {
    startOscilloscope(Av, Vsat, phaseDeg);
  }
}

// ----------------------------------------------------
// TAB 1: RESISTOR & CIRCUIT LAB (CUSTOMIZABLE CIRCUIT TEMPLATES)
// ----------------------------------------------------
function renderCircuitSchematicSvg(circuitType, rin, rf, vin, actualVout, Av, isSaturated, Vsat) {
  const isInverting = circuitType === 'inverting';
  const isNonInverting = circuitType === 'nonInverting';
  const isBuffer = circuitType === 'buffer';
  const isComp = circuitType === 'comparator';
  const isSym = wbState.viewMode === 'symbolic';

  return `
    <div class="w-full overflow-x-auto rounded-2xl bg-zinc-950 border border-zinc-800/80 p-2 sm:p-4 shadow-2xl">
      <svg viewBox="0 0 720 250" class="w-full min-w-[560px] h-auto font-sans select-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="schemGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.75" fill="#27272a" />
          </pattern>
        </defs>

        <!-- Background Grid -->
        <rect width="720" height="250" fill="url(#schemGrid)" rx="12" />

        <!-- Op-Amp Triangle -->
        <polygon points="345,70 345,190 445,130" fill="#090d16" stroke="#38bdf8" stroke-width="2.5" stroke-linejoin="round" />
        <text x="357" y="112" fill="#f43f5e" font-size="20" font-weight="900" text-anchor="middle">-</text>
        <text x="357" y="162" fill="#10b981" font-size="19" font-weight="900" text-anchor="middle">+</text>
        <text x="385" y="134" fill="#71717a" font-size="10" font-weight="bold" letter-spacing="1">741 IC</text>

        <!-- Power Supply Rails -->
        <line x1="392" y1="98" x2="392" y2="72" stroke="#52525b" stroke-width="1.5" stroke-dasharray="2,2" />
        <text x="392" y="66" fill="#a1a1aa" font-size="9" font-weight="bold" text-anchor="middle">+Vcc (+${wbState.vcc.toFixed(1)}V)</text>
        <line x1="392" y1="162" x2="392" y2="188" stroke="#52525b" stroke-width="1.5" stroke-dasharray="2,2" />
        <text x="392" y="200" fill="#a1a1aa" font-size="9" font-weight="bold" text-anchor="middle">-Vcc (-${wbState.vcc.toFixed(1)}V)</text>

        ${isInverting ? `
          <!-- INVERTING AMPLIFIER SCHEMATIC -->
          <circle cx="45" cy="105" r="4.5" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
          <line x1="49.5" y1="105" x2="115" y2="105" stroke="#38bdf8" stroke-width="2.5" />
          
          <!-- Input Vin Label (No Given Tag) -->
          <text x="45" y="86" fill="#38bdf8" font-size="13" font-weight="800" text-anchor="middle">${isSym ? 'Vin' : `Vin = ${vin >= 0 ? '+' : ''}${vin.toFixed(2)}V`}</text>

          <!-- Input Resistor Rin (No Given Tag) -->
          <rect x="115" y="93" width="90" height="24" rx="5" fill="#0c1929" stroke="#06b6d4" stroke-width="2" />
          <text x="160" y="109" fill="#22d3ee" font-size="12" font-weight="bold" text-anchor="middle">${isSym ? 'Rin' : `Rin = ${rin} kΩ`}</text>

          <line x1="205" y1="105" x2="275" y2="105" stroke="#38bdf8" stroke-width="2.5" />

          <!-- Summing Junction (Virtual Ground) -->
          <circle cx="275" cy="105" r="4" fill="#06b6d4" />
          <line x1="275" y1="105" x2="345" y2="105" stroke="#38bdf8" stroke-width="2.5" />
          <text x="275" y="125" fill="#06b6d4" font-size="9" font-weight="bold" text-anchor="middle">V- ≈ 0.00V</text>
          <text x="275" y="136" fill="#71717a" font-size="8" text-anchor="middle">(Virtual Ground)</text>

          <!-- Feedback Loop with Rf (No Given Tag) -->
          <line x1="275" y1="105" x2="275" y2="40" stroke="#c084fc" stroke-width="2.5" />
          <line x1="275" y1="40" x2="340" y2="40" stroke="#c084fc" stroke-width="2.5" />
          
          <rect x="340" y="28" width="90" height="24" rx="5" fill="#200b3b" stroke="#c084fc" stroke-width="2" />
          <text x="385" y="44" fill="#f3e8ff" font-size="12" font-weight="bold" text-anchor="middle">${isSym ? 'Rf' : `Rf = ${rf} kΩ`}</text>

          <line x1="430" y1="40" x2="495" y2="40" stroke="#c084fc" stroke-width="2.5" />
          <line x1="495" y1="40" x2="495" y2="130" stroke="#c084fc" stroke-width="2.5" />
          <circle cx="495" cy="130" r="4" fill="#c084fc" />

          <!-- Non-Inverting Terminal tied to Ground -->
          <line x1="345" y1="155" x2="275" y2="155" stroke="#10b981" stroke-width="2.5" />
          <line x1="275" y1="155" x2="275" y2="195" stroke="#10b981" stroke-width="2.5" />
          <line x1="260" y1="195" x2="290" y2="195" stroke="#10b981" stroke-width="2.5" />
          <line x1="265" y1="200" x2="285" y2="200" stroke="#10b981" stroke-width="2" />
          <line x1="270" y1="205" x2="280" y2="205" stroke="#10b981" stroke-width="1.5" />
          <text x="275" y="222" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">0V (GND)</text>
        ` : ''}

        ${isNonInverting ? `
          <!-- NON-INVERTING AMPLIFIER SCHEMATIC -->
          <circle cx="45" cy="155" r="4.5" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
          <line x1="49.5" y1="155" x2="345" y2="155" stroke="#38bdf8" stroke-width="2.5" />
          
          <!-- Input Vin Label (No Given Tag) -->
          <text x="45" y="136" fill="#38bdf8" font-size="13" font-weight="800" text-anchor="middle">${isSym ? 'Vin' : `Vin = ${vin >= 0 ? '+' : ''}${vin.toFixed(2)}V`}</text>

          <!-- Inverting terminal divider -->
          <line x1="345" y1="105" x2="275" y2="105" stroke="#f43f5e" stroke-width="2.5" />
          <circle cx="275" cy="105" r="4" fill="#f43f5e" />

          <!-- Resistor R1 to Ground (No Given Tag) -->
          <line x1="275" y1="105" x2="275" y2="140" stroke="#06b6d4" stroke-width="2.5" />
          <rect x="230" y="140" width="90" height="24" rx="5" fill="#0c1929" stroke="#06b6d4" stroke-width="2" />
          <text x="275" y="156" fill="#22d3ee" font-size="12" font-weight="bold" text-anchor="middle">${isSym ? 'R1' : `R1 = ${rin} kΩ`}</text>

          <line x1="275" y1="164" x2="275" y2="195" stroke="#06b6d4" stroke-width="2.5" />
          <line x1="260" y1="195" x2="290" y2="195" stroke="#06b6d4" stroke-width="2.5" />
          <line x1="265" y1="200" x2="285" y2="200" stroke="#06b6d4" stroke-width="2" />
          <line x1="270" y1="205" x2="280" y2="205" stroke="#06b6d4" stroke-width="1.5" />
          <text x="275" y="222" fill="#06b6d4" font-size="10" font-weight="bold" text-anchor="middle">0V (GND)</text>

          <!-- Feedback Rf to Output (No Given Tag) -->
          <line x1="275" y1="105" x2="275" y2="40" stroke="#c084fc" stroke-width="2.5" />
          <line x1="275" y1="40" x2="340" y2="40" stroke="#c084fc" stroke-width="2.5" />
          
          <rect x="340" y="28" width="90" height="24" rx="5" fill="#200b3b" stroke="#c084fc" stroke-width="2" />
          <text x="385" y="44" fill="#f3e8ff" font-size="12" font-weight="bold" text-anchor="middle">${isSym ? 'Rf' : `Rf = ${rf} kΩ`}</text>

          <line x1="430" y1="40" x2="495" y2="40" stroke="#c084fc" stroke-width="2.5" />
          <line x1="495" y1="40" x2="495" y2="130" stroke="#c084fc" stroke-width="2.5" />
          <circle cx="495" cy="130" r="4" fill="#c084fc" />
        ` : ''}

        ${isBuffer ? `
          <!-- VOLTAGE FOLLOWER SCHEMATIC -->
          <circle cx="45" cy="155" r="4.5" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
          <line x1="49.5" y1="155" x2="345" y2="155" stroke="#38bdf8" stroke-width="2.5" />
          <text x="45" y="136" fill="#38bdf8" font-size="13" font-weight="800" text-anchor="middle">${isSym ? 'Vin' : `Vin = ${vin >= 0 ? '+' : ''}${vin.toFixed(2)}V`}</text>

          <!-- Direct Feedback Wire -->
          <line x1="345" y1="105" x2="275" y2="105" stroke="#c084fc" stroke-width="2.5" />
          <line x1="275" y1="105" x2="275" y2="40" stroke="#c084fc" stroke-width="2.5" />
          <line x1="275" y1="40" x2="495" y2="40" stroke="#c084fc" stroke-width="2.5" />
          <line x1="495" y1="40" x2="495" y2="130" stroke="#c084fc" stroke-width="2.5" />
          <circle cx="495" cy="130" r="4" fill="#c084fc" />
          
          <rect x="325" y="28" width="140" height="24" rx="5" fill="#200b3b" stroke="#c084fc" stroke-width="1.5" />
          <text x="395" y="44" fill="#e9d5ff" font-size="10" font-weight="bold" text-anchor="middle">Direct Feedback (Rf = 0Ω)</text>
        ` : ''}

        ${isComp ? `
          <!-- COMPARATOR SCHEMATIC -->
          <circle cx="45" cy="155" r="4.5" fill="#0284c7" stroke="#38bdf8" stroke-width="2" />
          <line x1="49.5" y1="155" x2="345" y2="155" stroke="#38bdf8" stroke-width="2.5" />
          <text x="45" y="136" fill="#38bdf8" font-size="13" font-weight="800" text-anchor="middle">${isSym ? 'Vin' : `Vin = ${vin >= 0 ? '+' : ''}${vin.toFixed(2)}V`}</text>

          <!-- Inverting to Ground (Vref) -->
          <line x1="345" y1="105" x2="275" y2="105" stroke="#f43f5e" stroke-width="2.5" />
          <line x1="275" y1="105" x2="275" y2="145" stroke="#f43f5e" stroke-width="2.5" />
          <line x1="260" y1="145" x2="290" y2="145" stroke="#f43f5e" stroke-width="2.5" />
          <line x1="265" y1="150" x2="285" y2="150" stroke="#f43f5e" stroke-width="2" />
          <line x1="270" y1="155" x2="280" y2="155" stroke="#f43f5e" stroke-width="1.5" />
          <text x="275" y="172" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">Vref = 0V</text>
          <text x="390" y="45" fill="#71717a" font-size="10" font-weight="bold" text-anchor="middle">Open-Loop (No Feedback)</text>
        ` : ''}

        <!-- OUTPUT NODE -->
        <line x1="445" y1="130" x2="620" y2="130" stroke="${isSaturated ? '#f43f5e' : '#34d399'}" stroke-width="3" />
        <circle cx="620" cy="130" r="5" fill="${isSaturated ? '#f43f5e' : '#10b981'}" stroke="#ffffff" stroke-width="1.5" />

        <!-- Output Result Box -->
        <rect x="525" y="65" width="180" height="52" rx="8" fill="#091410" stroke="${isSaturated ? '#f43f5e' : '#10b981'}" stroke-width="1.5" />
        <text x="615" y="86" fill="${isSaturated ? '#fb7185' : '#34d399'}" font-size="13" font-weight="900" text-anchor="middle">
          ${isSym ? (isInverting ? 'Vout = -(Rf/Rin) Vin' : (isNonInverting ? 'Vout = (1 + Rf/R1) Vin' : 'Vout = Vin')) : `Vout = ${actualVout >= 0 ? '+' : ''}${actualVout.toFixed(2)} V`}
        </text>
        <text x="615" y="106" fill="#a1a1aa" font-size="10" font-mono font-weight="bold" text-anchor="middle">
          ${isComp ? (vin > 0 ? '+Vsat' : '-Vsat') : (isSym ? (isInverting ? 'Av = -(Rf/Rin)' : 'Av = 1 + (Rf/R1)') : `Av = ${Av.toFixed(2)}`)}
        </text>

        ${!isSym && isSaturated ? `
          <rect x="545" y="145" width="140" height="20" rx="4" fill="#4c0519" stroke="#f43f5e" stroke-width="1" />
          <text x="615" y="159" fill="#fca5a5" font-size="9" font-weight="bold" text-anchor="middle">⚠️ Saturated at ±${Vsat.toFixed(1)}V</text>
        ` : `
          <text x="615" y="155" fill="#6ee7b7" font-size="10" font-weight="bold" text-anchor="middle">✓ Linear Operation</text>
        `}
      </svg>
    </div>
  `;
}

function renderCircuitLabContent(Av, theoreticalVout, actualVout, Vsat, isSaturated, phaseDeg) {
  const isInverting = wbState.circuitType === 'inverting';
  const isNonInverting = wbState.circuitType === 'nonInverting';

  let gainFormula = '';
  let gainCalc = '';
  let voutFormula = 'Vout = Av × Vin';
  let voutCalc = '';
  let resistorFormula = '';
  let resistorCalc = '';

  if (isInverting) {
    gainFormula = 'Av = - (Rf / Rin)';
    gainCalc = `Av = - (${wbState.rf} kΩ / ${wbState.rin} kΩ) = ${Av.toFixed(2)}`;
    voutCalc = `Vout = (${Av.toFixed(2)}) × (${wbState.vin >= 0 ? '+' : ''}${wbState.vin.toFixed(2)} V) = ${actualVout.toFixed(2)} V`;
    resistorFormula = 'Rf = |Av| × Rin  |  Rin = Rf / |Av|';
    resistorCalc = `For desired |Av| = ${wbState.targetGain}: Required Rf = ${wbState.targetGain} × ${wbState.rin} kΩ = ${(wbState.targetGain * wbState.rin).toFixed(1)} kΩ`;
  } else if (isNonInverting) {
    gainFormula = 'Av = 1 + (Rf / R1)';
    gainCalc = `Av = 1 + (${wbState.rf} kΩ / ${wbState.rin} kΩ) = 1 + ${(wbState.rf / wbState.rin).toFixed(2)} = ${Av.toFixed(2)}`;
    voutCalc = `Vout = (${Av.toFixed(2)}) × (${wbState.vin >= 0 ? '+' : ''}${wbState.vin.toFixed(2)} V) = ${actualVout.toFixed(2)} V`;
    resistorFormula = 'Rf = (Av - 1) × R1  |  R1 = Rf / (Av - 1)';
    resistorCalc = `For desired Av = ${wbState.targetGain}: Required Rf = (${wbState.targetGain} - 1) × ${wbState.rin} kΩ = ${(Math.max(0, wbState.targetGain - 1) * wbState.rin).toFixed(1)} kΩ`;
  } else if (wbState.circuitType === 'buffer') {
    gainFormula = 'Av = 1.0 (Unity Gain Buffer)';
    gainCalc = 'Av = 1.0 (Direct Output Feedback, Rf = 0)';
    voutCalc = `Vout = Vin = ${wbState.vin.toFixed(2)} V`;
    resistorFormula = 'No external gain resistors needed (Impedance isolation buffer)';
    resistorCalc = 'Rf = 0 Ω, R1 = Open (Infinite)';
  } else {
    gainFormula = 'Open-Loop Voltage Comparator';
    gainCalc = 'Av = Avol ≈ ∞ (No negative feedback)';
    voutCalc = wbState.vin > 0 ? `Vin > 0V → Vout = +Vsat = +${Vsat.toFixed(1)} V` : `Vin < 0V → Vout = -Vsat = -${Vsat.toFixed(1)} V`;
    resistorFormula = 'Non-Linear Switching Operation';
    resistorCalc = 'Output swings to saturation rails';
  }

  return `
    <div class="space-y-6">
      
      <!-- 1. CIRCUIT TEMPLATE SELECTOR & VIEW MODE TOGGLE -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <div>
          <span class="text-[10px] font-black uppercase tracking-wider text-zinc-400">Circuit Template:</span>
          <h4 class="text-sm font-black text-zinc-900 dark:text-white">Select Op-Amp Circuit Architecture</h4>
        </div>
        <!-- View Mode Toggle -->
        <div class="flex items-center gap-1.5 bg-zinc-200/80 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs">
          <button 
            onclick="toggleWbViewMode('values')" 
            class="px-3 py-1 rounded-lg font-bold transition-all ${wbState.viewMode !== 'symbolic' ? 'bg-cyan-600 text-white shadow-sm' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Custom Values
          </button>
          <button 
            onclick="toggleWbViewMode('symbolic')" 
            class="px-3 py-1 rounded-lg font-bold transition-all ${wbState.viewMode === 'symbolic' ? 'bg-cyan-600 text-white shadow-sm' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Formula Template
          </button>
        </div>
      </div>

      <!-- Circuit Template Buttons -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button 
          onclick="setWbCircuit('inverting')" 
          class="p-3.5 rounded-2xl border text-left transition-all ${isInverting ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/40 ring-2 ring-cyan-500/20 shadow-sm' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-cyan-500'}"
        >
          <div class="font-extrabold text-xs sm:text-sm text-zinc-900 dark:text-white">Inverting Amplifier</div>
          <div class="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">Av = - (Rf / Rin)</div>
        </button>
        <button 
          onclick="setWbCircuit('nonInverting')" 
          class="p-3.5 rounded-2xl border text-left transition-all ${isNonInverting ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/40 ring-2 ring-cyan-500/20 shadow-sm' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-cyan-500'}"
        >
          <div class="font-extrabold text-xs sm:text-sm text-zinc-900 dark:text-white">Non-Inverting Amplifier</div>
          <div class="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">Av = 1 + (Rf / R1)</div>
        </button>
        <button 
          onclick="setWbCircuit('buffer')" 
          class="p-3.5 rounded-2xl border text-left transition-all ${wbState.circuitType === 'buffer' ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/40 ring-2 ring-cyan-500/20 shadow-sm' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-cyan-500'}"
        >
          <div class="font-extrabold text-xs sm:text-sm text-zinc-900 dark:text-white">Voltage Follower</div>
          <div class="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">Av = 1.0 (Unity Buffer)</div>
        </button>
        <button 
          onclick="setWbCircuit('comparator')" 
          class="p-3.5 rounded-2xl border text-left transition-all ${wbState.circuitType === 'comparator' ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/40 ring-2 ring-cyan-500/20 shadow-sm' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-cyan-500'}"
        >
          <div class="font-extrabold text-xs sm:text-sm text-zinc-900 dark:text-white">Voltage Comparator</div>
          <div class="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">Open-Loop Switching</div>
        </button>
      </div>

      <!-- 2. MAIN CIRCUIT TEMPLATE & SCHEMATIC (CLEAN SCHEMATIC) -->
      <div class="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xl space-y-5">
        
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-cyan-500">Circuit Template Schematic</span>
            <h3 class="text-base sm:text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
              <span>${isInverting ? 'Inverting Amplifier Template' : (isNonInverting ? 'Non-Inverting Amplifier Template' : (wbState.circuitType === 'buffer' ? 'Voltage Follower (Buffer) Template' : 'Voltage Comparator Template'))}</span>
            </h3>
          </div>
          <div>
            ${isSaturated ? `
              <span class="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-extrabold border border-rose-500/30 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-rose-500"></span> Saturated at ±${Vsat.toFixed(1)}V
              </span>
            ` : `
              <span class="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold border border-emerald-500/30 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Linear Operation
              </span>
            `}
          </div>
        </div>

        <!-- Schematic Vector Diagram -->
        <div class="space-y-2">
          ${renderCircuitSchematicSvg(wbState.circuitType, wbState.rin, wbState.rf, wbState.vin, actualVout, Av, isSaturated, Vsat)}
        </div>

        <!-- 3. CUSTOMIZABLE PARAMETERS PANEL (Direct Input + Slider + Quick Chips) -->
        <div class="space-y-3 pt-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <i data-lucide="sliders" class="w-3.5 h-3.5 text-cyan-500"></i>
              Customize Circuit Parameters
            </span>
            <span class="text-[11px] text-zinc-400 font-medium">Type values directly or drag sliders</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            
            <!-- Parameter 1: Feedback Resistor Rf -->
            ${wbState.circuitType !== 'buffer' && wbState.circuitType !== 'comparator' ? `
              <div class="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-zinc-500 dark:text-zinc-400">Feedback Rf</span>
                  <div class="flex items-center gap-1">
                    <input 
                      type="number" 
                      step="1" 
                      min="0" 
                      max="1000" 
                      value="${wbState.rf}" 
                      onchange="updateWbParam('rf', this.value)"
                      class="w-16 px-2 py-0.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-mono font-black text-purple-600 dark:text-purple-400 text-right outline-none focus:border-purple-500"
                    />
                    <span class="text-xs font-bold text-zinc-400">kΩ</span>
                  </div>
                </div>
                <input 
                  type="range" min="0" max="200" step="5" value="${wbState.rf}"
                  oninput="updateWbParam('rf', this.value)"
                  class="w-full accent-purple-500 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
                />
                <div class="flex gap-1 pt-0.5">
                  <button onclick="updateWbParam('rf', 10)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-purple-500 hover:text-white transition-colors">10k</button>
                  <button onclick="updateWbParam('rf', 50)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-purple-500 hover:text-white transition-colors">50k</button>
                  <button onclick="updateWbParam('rf', 90)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-purple-500 hover:text-white transition-colors">90k</button>
                  <button onclick="updateWbParam('rf', 100)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-purple-500 hover:text-white transition-colors">100k</button>
                </div>
              </div>
            ` : ''}

            <!-- Parameter 2: Input / Ground Resistor Rin/R1 -->
            ${wbState.circuitType !== 'buffer' && wbState.circuitType !== 'comparator' ? `
              <div class="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-zinc-500 dark:text-zinc-400">${isInverting ? 'Input Rin' : 'Ground R1'}</span>
                  <div class="flex items-center gap-1">
                    <input 
                      type="number" 
                      step="1" 
                      min="1" 
                      max="500" 
                      value="${wbState.rin}" 
                      onchange="updateWbParam('rin', this.value)"
                      class="w-16 px-2 py-0.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-mono font-black text-cyan-600 dark:text-cyan-400 text-right outline-none focus:border-cyan-500"
                    />
                    <span class="text-xs font-bold text-zinc-400">kΩ</span>
                  </div>
                </div>
                <input 
                  type="range" min="1" max="100" step="1" value="${wbState.rin}"
                  oninput="updateWbParam('rin', this.value)"
                  class="w-full accent-cyan-500 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
                />
                <div class="flex gap-1 pt-0.5">
                  <button onclick="updateWbParam('rin', 1)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-cyan-500 hover:text-white transition-colors">1k</button>
                  <button onclick="updateWbParam('rin', 5)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-cyan-500 hover:text-white transition-colors">5k</button>
                  <button onclick="updateWbParam('rin', 10)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-cyan-500 hover:text-white transition-colors">10k</button>
                  <button onclick="updateWbParam('rin', 20)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-cyan-500 hover:text-white transition-colors">20k</button>
                </div>
              </div>
            ` : ''}

            <!-- Parameter 3: Input Voltage Vin -->
            <div class="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-zinc-500 dark:text-zinc-400">Input Vin</span>
                <div class="flex items-center gap-1">
                  <input 
                    type="number" 
                    step="0.05" 
                    min="-15" 
                    max="15" 
                    value="${wbState.vin.toFixed(2)}" 
                    onchange="updateWbParam('vin', this.value)"
                    class="w-16 px-2 py-0.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-mono font-black text-sky-500 text-right outline-none focus:border-sky-500"
                  />
                  <span class="text-xs font-bold text-zinc-400">V</span>
                </div>
              </div>
              <input 
                type="range" min="-3.0" max="3.0" step="0.05" value="${wbState.vin}"
                oninput="updateWbParam('vin', this.value)"
                class="w-full accent-sky-500 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
              />
              <div class="flex gap-1 pt-0.5">
                <button onclick="updateWbParam('vin', 0.1)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-sky-500 hover:text-white transition-colors">0.1V</button>
                <button onclick="updateWbParam('vin', 0.2)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-sky-500 hover:text-white transition-colors">0.2V</button>
                <button onclick="updateWbParam('vin', 0.5)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-sky-500 hover:text-white transition-colors">0.5V</button>
                <button onclick="updateWbParam('vin', 1.0)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-sky-500 hover:text-white transition-colors">1.0V</button>
              </div>
            </div>

            <!-- Parameter 4: Power Supply Rails Vcc -->
            <div class="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-zinc-500 dark:text-zinc-400">Rails (±Vcc)</span>
                <div class="flex items-center gap-1">
                  <input 
                    type="number" 
                    step="0.5" 
                    min="3" 
                    max="18" 
                    value="${wbState.vcc}" 
                    onchange="updateWbParam('vcc', this.value)"
                    class="w-16 px-2 py-0.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-mono font-black text-amber-500 text-right outline-none focus:border-amber-500"
                  />
                  <span class="text-xs font-bold text-zinc-400">V</span>
                </div>
              </div>
              <input 
                type="range" min="5" max="18" step="1" value="${wbState.vcc}"
                oninput="updateWbParam('vcc', this.value)"
                class="w-full accent-amber-500 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
              />
              <div class="flex gap-1 pt-0.5">
                <button onclick="updateWbParam('vcc', 5)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-amber-500 hover:text-white transition-colors">±5V</button>
                <button onclick="updateWbParam('vcc', 9)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-amber-500 hover:text-white transition-colors">±9V</button>
                <button onclick="updateWbParam('vcc', 12)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-amber-500 hover:text-white transition-colors">±12V</button>
                <button onclick="updateWbParam('vcc', 15)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-200/70 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-amber-500 hover:text-white transition-colors">±15V</button>
              </div>
            </div>

          </div>
        </div>

        <!-- 4. CALCULATED RESULTS & STEP-BY-STEP SOLUTION -->
        <div class="space-y-3 pt-2">
          <span class="text-xs font-black uppercase tracking-wider text-zinc-400">Calculated Outputs & Step-by-Step Solution</span>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <!-- Step 1: Voltage Gain -->
            <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 space-y-2">
              <div class="flex items-center gap-1.5 text-xs font-black text-cyan-600 dark:text-cyan-400 uppercase">
                <span>• Step 1: Voltage Gain</span>
              </div>
              <div class="text-xs font-mono text-zinc-400 font-semibold">${gainFormula}</div>
              <div class="p-2.5 rounded-xl bg-white dark:bg-zinc-900 font-mono text-sm font-black text-cyan-600 dark:text-cyan-300">
                ${gainCalc}
              </div>
            </div>

            <!-- Step 2: Vout -->
            <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 space-y-2">
              <div class="flex items-center gap-1.5 text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase">
                <span>• Step 2: Output Voltage (Vout)</span>
              </div>
              <div class="text-xs font-mono text-zinc-400 font-semibold">${voutFormula}</div>
              <div class="p-2.5 rounded-xl bg-white dark:bg-zinc-900 font-mono text-sm font-black ${isSaturated ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-300'}">
                ${voutCalc}
              </div>
            </div>

            <!-- Step 3: Resistor Sizing for Target Gain -->
            <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-purple-600 dark:text-purple-400 uppercase">• Step 3: Resistor Sizing</span>
                <span class="text-[10px] font-bold text-zinc-400">Target |Av| = ${wbState.targetGain}</span>
              </div>
              <div class="text-xs font-mono text-zinc-400 font-semibold">${resistorFormula}</div>
              <div class="p-2.5 rounded-xl bg-white dark:bg-zinc-900 font-mono text-xs font-black text-purple-600 dark:text-purple-300 leading-relaxed">
                ${resistorCalc}
              </div>
              ${wbState.circuitType !== 'buffer' && wbState.circuitType !== 'comparator' ? `
                <div class="pt-1 flex items-center gap-2">
                  <span class="text-[10px] font-bold text-zinc-400 shrink-0">Change Target:</span>
                  <input 
                    type="range" min="2" max="50" step="1" value="${wbState.targetGain}"
                    oninput="updateWbParam('targetGain', this.value)"
                    class="w-full accent-purple-500 h-1 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
                  />
                </div>
              ` : ''}
            </div>

          </div>
        </div>

      </div>

      <!-- Real-Time Dual-Trace Oscilloscope -->
      <div class="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 p-5 sm:p-6 shadow-2xl space-y-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span class="text-xs font-bold uppercase tracking-wider text-zinc-300">Live Dual-Trace Oscilloscope</span>
          </div>
          <div class="flex items-center gap-4 text-xs font-bold">
            <span class="flex items-center gap-1.5 text-sky-400">
              <span class="w-2.5 h-1 bg-sky-400 rounded-full inline-block"></span> CH1: Vin (${wbState.vin.toFixed(2)}V)
            </span>
            <span class="flex items-center gap-1.5 ${isSaturated ? 'text-rose-400' : 'text-emerald-400'}">
              <span class="w-2.5 h-1 ${isSaturated ? 'bg-rose-400' : 'bg-emerald-400'} rounded-full inline-block"></span> CH2: Vout (${actualVout.toFixed(2)}V ${isSaturated ? '- CLIPPED' : ''})
            </span>
          </div>
        </div>

        <div class="relative w-full rounded-2xl overflow-hidden border border-zinc-800 bg-[#0a0f18]">
          <canvas id="oscCanvas" width="800" height="220" class="w-full h-48 sm:h-56 block"></canvas>
        </div>
        <div class="flex justify-between text-[11px] text-zinc-400 px-1 font-mono">
          <span>Scale: 5V / Division | Time base: 1ms / Div</span>
          <span>Rails Saturation Limits: ±${Vsat.toFixed(1)}V</span>
        </div>
      </div>

    </div>
  `;
}

// ----------------------------------------------------
// TAB 2: 741 IC PINOUT EXPLORER (FULL ENGLISH)
// ----------------------------------------------------
function renderPinoutContent() {
  const pinDetails = [
    { pin: 1, name: "Offset Null", desc: "Used in conjunction with a 10 kΩ potentiometer to Pin 4 (-Vee) to zero out input DC offset voltage caused by internal differential transistor mismatch." },
    { pin: 2, name: "Inverting Input (V-)", desc: "The differential inverting input terminal. Signals applied here are amplified with a 180° phase inversion at the output (Vout = -Rf/Rin * Vin)." },
    { pin: 3, name: "Non-Inverting Input (V+)", desc: "The differential non-inverting input terminal. Signals applied here produce an in-phase output waveform (Vout = [1 + Rf/R1] * Vin)." },
    { pin: 4, name: "-Vee (Negative Supply Rail)", desc: "Negative DC power supply voltage terminal. Typically connected to -15V or -12V DC (or Ground in single-supply mode). Absolute maximum rating: -22V." },
    { pin: 5, name: "Offset Null", desc: "Second offset null terminal paired with Pin 1 for balance adjustment using the potentiometer wiper terminal." },
    { pin: 6, name: "Output Terminal (Vout)", desc: "The single-ended low-impedance output terminal (~75 Ω open-loop impedance). Internally protected against continuous short-circuits to ground or supply rails." },
    { pin: 7, name: "+Vcc (Positive Supply Rail)", desc: "Positive DC power supply voltage terminal. Typically connected to +15V or +12V DC. Absolute maximum rating: +22V." },
    { pin: 8, name: "NC (No Connection)", desc: "Not internally connected to the silicon chip. Must be left floating and isolated." }
  ];

  const sel = pinDetails.find(p => p.pin === wbState.selectedPin) || pinDetails[1];

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      
      <!-- Visual DIP-8 Chip Package -->
      <div class="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xl flex flex-col items-center">
        <span class="text-xs font-bold uppercase tracking-wider text-cyan-500 mb-4">LM741 DIP-8 Package (Tap Any Pin)</span>
        
        <div class="relative w-56 sm:w-64 bg-zinc-900 rounded-3xl p-6 py-8 border-2 border-zinc-700 shadow-2xl text-center select-none">
          <!-- Top Notch -->
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-zinc-800 border-2 border-zinc-700 rounded-b-full"></div>
          
          <div class="space-y-1 mb-6">
            <h4 class="font-black text-lg text-zinc-100 tracking-widest font-mono">LM741CN</h4>
            <span class="text-[10px] text-zinc-500 uppercase tracking-wider">Operational Amplifier</span>
          </div>

          <!-- Pins Layout (Left 1-4, Right 8-5) -->
          <div class="space-y-3">
            <!-- Row 1: Pin 1 vs Pin 8 -->
            <div class="flex justify-between items-center">
              <button 
                onclick="selectWbPin(1)" 
                class="px-2.5 py-1.5 rounded-lg text-xs font-black transition-all ${wbState.selectedPin === 1 ? 'bg-cyan-500 text-white ring-4 ring-cyan-500/30' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}"
              >
                1. Offset Null
              </button>
              <button 
                onclick="selectWbPin(8)" 
                class="px-2.5 py-1.5 rounded-lg text-xs font-black transition-all ${wbState.selectedPin === 8 ? 'bg-cyan-500 text-white ring-4 ring-cyan-500/30' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}"
              >
                8. NC
              </button>
            </div>

            <!-- Row 2: Pin 2 vs Pin 7 -->
            <div class="flex justify-between items-center">
              <button 
                onclick="selectWbPin(2)" 
                class="px-2.5 py-1.5 rounded-lg text-xs font-black transition-all ${wbState.selectedPin === 2 ? 'bg-cyan-500 text-white ring-4 ring-cyan-500/30' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}"
              >
                2. Inverting (-)
              </button>
              <button 
                onclick="selectWbPin(7)" 
                class="px-2.5 py-1.5 rounded-lg text-xs font-black transition-all ${wbState.selectedPin === 7 ? 'bg-cyan-500 text-white ring-4 ring-cyan-500/30' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}"
              >
                7. +Vcc
              </button>
            </div>

            <!-- Row 3: Pin 3 vs Pin 6 -->
            <div class="flex justify-between items-center">
              <button 
                onclick="selectWbPin(3)" 
                class="px-2.5 py-1.5 rounded-lg text-xs font-black transition-all ${wbState.selectedPin === 3 ? 'bg-cyan-500 text-white ring-4 ring-cyan-500/30' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}"
              >
                3. Non-Inv (+)
              </button>
              <button 
                onclick="selectWbPin(6)" 
                class="px-2.5 py-1.5 rounded-lg text-xs font-black transition-all ${wbState.selectedPin === 6 ? 'bg-cyan-500 text-white ring-4 ring-cyan-500/30' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}"
              >
                6. Output
              </button>
            </div>

            <!-- Row 4: Pin 4 vs Pin 5 -->
            <div class="flex justify-between items-center">
              <button 
                onclick="selectWbPin(4)" 
                class="px-2.5 py-1.5 rounded-lg text-xs font-black transition-all ${wbState.selectedPin === 4 ? 'bg-cyan-500 text-white ring-4 ring-cyan-500/30' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}"
              >
                4. -Vee
              </button>
              <button 
                onclick="selectWbPin(5)" 
                class="px-2.5 py-1.5 rounded-lg text-xs font-black transition-all ${wbState.selectedPin === 5 ? 'bg-cyan-500 text-white ring-4 ring-cyan-500/30' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}"
              >
                5. Offset Null
              </button>
            </div>
          </div>
        </div>

        <span class="text-[11px] text-zinc-400 mt-4">Standard 8-Lead Dual In-Line Package (DIP-8)</span>
      </div>

      <!-- Selected Pin Technical Breakdown -->
      <div class="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xl space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-cyan-500/20">
            ${sel.pin}
          </div>
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-cyan-500">Pin Inspector</span>
            <h3 class="text-lg font-black text-zinc-900 dark:text-white">${sel.name}</h3>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          ${sel.desc}
        </div>

        <div class="space-y-2 text-xs">
          <h4 class="font-bold text-zinc-400 uppercase tracking-wider">741 Absolute Maximum Ratings</h4>
          <ul class="space-y-1.5 text-zinc-600 dark:text-zinc-300">
            <li class="flex items-center gap-2">
              <i data-lucide="zap" class="w-3.5 h-3.5 text-amber-500"></i>
              <span>Supply Voltage (+Vcc, -Vee): Max <strong>±22 V</strong></span>
            </li>
            <li class="flex items-center gap-2">
              <i data-lucide="shield" class="w-3.5 h-3.5 text-cyan-500"></i>
              <span>Differential Input Voltage (VD): Max <strong>±30 V</strong></span>
            </li>
            <li class="flex items-center gap-2">
              <i data-lucide="thermometer" class="w-3.5 h-3.5 text-rose-500"></i>
              <span>Power Dissipation (Pd): Max <strong>500 mW</strong> at 25°C</span>
            </li>
            <li class="flex items-center gap-2">
              <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i>
              <span>Output Short-Circuit Duration: <strong>Indefinite</strong> (Protected)</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  `;
}

// ----------------------------------------------------
// TAB 3: SENSOR-TO-ADC SIGNAL CHAIN (FULL ENGLISH)
// ----------------------------------------------------
function renderSensorContent() {
  let sensorDetailsHtml = '';

  if (wbState.sensorType === 'ultrasonic') {
    const soundSpeed = 340; // m/s
    const distMeters = (soundSpeed * wbState.sensorStimulus) / 2;
    const distCm = distMeters * 100;
    sensorDetailsHtml = `
      <div class="space-y-4">
        <div class="flex justify-between items-center text-xs font-bold">
          <span class="text-zinc-500">Echo Round-Trip Time (t)</span>
          <span class="text-cyan-600 dark:text-cyan-400 font-mono">${(wbState.sensorStimulus * 1000).toFixed(1)} ms</span>
        </div>
        <input 
          type="range" 
          min="0.001" 
          max="0.025" 
          step="0.0005" 
          value="${wbState.sensorStimulus}" 
          oninput="updateWbParam('sensorStimulus', this.value)"
          class="w-full accent-cyan-500 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
        />
        <div class="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-500/30 text-center space-y-1">
          <span class="text-xs font-bold text-cyan-700 dark:text-cyan-300">Calculated Distance from Sonar Echo</span>
          <div class="text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono">${distCm.toFixed(1)} cm</div>
          <p class="text-[11px] text-zinc-500">Formula: d = (v × t) / 2 = (340 m/s × ${(wbState.sensorStimulus * 1000).toFixed(1)}ms) / 2</p>
        </div>
      </div>
    `;
  } else if (wbState.sensorType === 'temp') {
    const rawMv = wbState.sensorStimulus * 10; // 10mV/°C
    const amplifiedV = (rawMv * 10) / 1000; // Gain of 10
    sensorDetailsHtml = `
      <div class="space-y-4">
        <div class="flex justify-between items-center text-xs font-bold">
          <span class="text-zinc-500">Ambient Temperature</span>
          <span class="text-amber-500 font-mono">${wbState.sensorStimulus.toFixed(1)} °C</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          step="1" 
          value="${wbState.sensorStimulus}" 
          oninput="updateWbParam('sensorStimulus', this.value)"
          class="w-full accent-amber-500 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
        />
        <div class="grid grid-cols-2 gap-3 text-center">
          <div class="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800">
            <span class="text-[10px] font-bold text-zinc-400">Sensor Output (10mV/°C)</span>
            <div class="text-lg font-black text-amber-500 font-mono">${rawMv.toFixed(0)} mV</div>
          </div>
          <div class="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800">
            <span class="text-[10px] font-bold text-zinc-400">Amplified ADC Input (Gain ×10)</span>
            <div class="text-lg font-black text-emerald-500 font-mono">${amplifiedV.toFixed(2)} V</div>
          </div>
        </div>
      </div>
    `;
  } else if (wbState.sensorType === 'strain') {
    const diffMv = (wbState.sensorStimulus / 50) * 10; // mV
    const inAmpV = (diffMv * 200) / 1000; // In-Amp gain 200
    sensorDetailsHtml = `
      <div class="space-y-4">
        <div class="flex justify-between items-center text-xs font-bold">
          <span class="text-zinc-500">Applied Force / Load</span>
          <span class="text-purple-500 font-mono">${wbState.sensorStimulus.toFixed(1)} kg</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="50" 
          step="1" 
          value="${wbState.sensorStimulus}" 
          oninput="updateWbParam('sensorStimulus', this.value)"
          class="w-full accent-purple-500 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
        />
        <div class="grid grid-cols-2 gap-3 text-center">
          <div class="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800">
            <span class="text-[10px] font-bold text-zinc-400">Bridge Differential Output</span>
            <div class="text-lg font-black text-purple-500 font-mono">${diffMv.toFixed(2)} mV</div>
          </div>
          <div class="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800">
            <span class="text-[10px] font-bold text-zinc-400">Instrumentation Amp (Gain ×200)</span>
            <div class="text-lg font-black text-emerald-500 font-mono">${inAmpV.toFixed(2)} V</div>
          </div>
        </div>
      </div>
    `;
  } else if (wbState.sensorType === 'flame') {
    const wl = wbState.sensorStimulus;
    const isFlameDetected = wl >= 760 && wl <= 1100;
    sensorDetailsHtml = `
      <div class="space-y-4">
        <div class="flex justify-between items-center text-xs font-bold">
          <span class="text-zinc-500">Optical Light Wavelength</span>
          <span class="text-rose-500 font-mono">${wl.toFixed(0)} nm</span>
        </div>
        <input 
          type="range" 
          min="400" 
          max="1400" 
          step="20" 
          value="${wl}" 
          oninput="updateWbParam('sensorStimulus', this.value)"
          class="w-full accent-rose-500 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
        />
        <div class="p-4 rounded-2xl text-center border ${isFlameDetected ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-600' : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-400'}">
          <div class="text-lg font-black flex items-center justify-center gap-2">
            <i data-lucide="${isFlameDetected ? 'flame' : 'shield-check'}" class="w-5 h-5"></i>
            <span>${isFlameDetected ? 'FIRE DETECTED! (760–1100 nm Flame IR Band Active)' : 'Normal Spectrum (No Flame Signature Detected)'}</span>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="space-y-6">
      
      <!-- Sensor Type Buttons -->
      <div class="flex flex-wrap gap-2">
        <button 
          onclick="selectWbSensor('ultrasonic')" 
          class="px-3 py-2 rounded-xl text-xs font-bold border transition-all ${wbState.sensorType === 'ultrasonic' ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500'}"
        >
          Ultrasonic Sensor
        </button>
        <button 
          onclick="selectWbSensor('temp')" 
          class="px-3 py-2 rounded-xl text-xs font-bold border transition-all ${wbState.sensorType === 'temp' ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500'}"
        >
          Temperature (LM35)
        </button>
        <button 
          onclick="selectWbSensor('strain')" 
          class="px-3 py-2 rounded-xl text-xs font-bold border transition-all ${wbState.sensorType === 'strain' ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500'}"
        >
          Strain Gauge Bridge
        </button>
        <button 
          onclick="selectWbSensor('flame')" 
          class="px-3 py-2 rounded-xl text-xs font-bold border transition-all ${wbState.sensorType === 'flame' ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500'}"
        >
          Flame Sensor (760-1100nm)
        </button>
      </div>

      <!-- 5-Stage Signal Chain Flow Visualizer -->
      <div class="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xl space-y-5">
        <div class="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <span class="text-xs font-bold uppercase tracking-wider text-cyan-500">FMSS Signal Chain Architecture</span>
          <span class="text-[11px] text-zinc-400 font-semibold">Unit 1 & Unit 2.1</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center text-xs">
          <div class="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
            <span class="text-[10px] font-bold text-zinc-400 uppercase">1. Stimulus</span>
            <div class="font-extrabold text-zinc-900 dark:text-white mt-1">Physical Signal</div>
          </div>
          <div class="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
            <span class="text-[10px] font-bold text-zinc-400 uppercase">2. Sensor</span>
            <div class="font-extrabold text-amber-500 mt-1">Transducer</div>
          </div>
          <div class="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
            <span class="text-[10px] font-bold text-zinc-400 uppercase">3. Conditioning</span>
            <div class="font-extrabold text-cyan-500 mt-1">Op-Amp / In-Amp</div>
          </div>
          <div class="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
            <span class="text-[10px] font-bold text-zinc-400 uppercase">4. Digitizer</span>
            <div class="font-extrabold text-purple-500 mt-1">ADC (S/H)</div>
          </div>
          <div class="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
            <span class="text-[10px] font-bold text-zinc-400 uppercase">5. Controller</span>
            <div class="font-extrabold text-emerald-500 mt-1">MCU / Memory</div>
          </div>
        </div>

        ${sensorDetailsHtml}
      </div>

    </div>
  `;
}

// ----------------------------------------------------
// OSCILLOSCOPE ANIMATION LOOP (FULL ENGLISH)
// ----------------------------------------------------
function startOscilloscope(Av, Vsat, phaseDeg) {
  const canvas = document.getElementById('oscCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let phase = 0;

  function draw() {
    if (!document.getElementById('oscCanvas')) return;
    const w = canvas.width;
    const h = canvas.height;
    const midY = h / 2;

    // Clear background
    ctx.fillStyle = '#0a0f18';
    ctx.fillRect(0, 0, w, h);

    // Grid Graticule (Dashed lines)
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);

    const numHoriz = 8;
    for (let i = 1; i < numHoriz; i++) {
      const y = (h / numHoriz) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    const numVert = 10;
    for (let i = 1; i < numVert; i++) {
      const x = (w / numVert) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Center 0V Reference Line
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(w, midY);
    ctx.stroke();

    // Saturation Rail Lines (±Vsat)
    const voltToPixel = (h / 2) / 20.0; // 20V full scale
    const satYPos = midY - (Vsat * voltToPixel);
    const satYNeg = midY + (Vsat * voltToPixel);

    ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, satYPos);
    ctx.lineTo(w, satYPos);
    ctx.moveTo(0, satYNeg);
    ctx.lineTo(w, satYNeg);
    ctx.stroke();
    ctx.setLineDash([]);

    // Channel 1: Input Waveform (Cyan)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const vinPeak = wbState.vin;
    for (let x = 0; x < w; x++) {
      const angle = phase + (x / w) * (Math.PI * 6);
      const vVal = vinPeak * Math.sin(angle);
      const y = midY - (vVal * voltToPixel);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Channel 2: Output Waveform (Emerald / Rose if saturated)
    const isSat = Math.abs(Av * vinPeak) > Vsat;
    ctx.strokeStyle = isSat ? '#f43f5e' : '#4ade80';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    const phaseRad = (phaseDeg * Math.PI) / 180;
    for (let x = 0; x < w; x++) {
      const angle = phase + (x / w) * (Math.PI * 6) + phaseRad;
      let vVal = 0;
      if (wbState.circuitType === 'comparator') {
        const inVal = vinPeak * Math.sin(angle - phaseRad);
        vVal = inVal > 0 ? Vsat : -Vsat;
      } else {
        vVal = Av * vinPeak * Math.sin(angle);
      }
      // Apply clipping at saturation
      vVal = Math.max(-Vsat, Math.min(Vsat, vVal));
      const y = midY - (vVal * voltToPixel);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    phase += 0.05;
    oscAnimationId = requestAnimationFrame(draw);
  }

  draw();
}

window.setWbTab = setWbTab;
window.setWbCircuit = setWbCircuit;
window.toggleWbViewMode = toggleWbViewMode;
window.updateWbParam = updateWbParam;
window.selectWbPin = selectWbPin;
window.selectWbSensor = selectWbSensor;


// =========================================================================
// LOGIC CIRCUITS WORKBENCH (INTERACTIVE GATES, SIMPLIFIER & 7400 PINOUTS)
// =========================================================================

let logicWbState = {
  tab: 'gates', // 'gates', 'simplifier', 'pinout'
  gate: 'AND',  // 'AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'
  diagramMode: 'standard', // 'standard', 'nand', 'nor'
  inA: 0,
  inB: 0,
  // Combinational Simplifier
  simpCircuit: 'c1', // 'c1', 'c2', 'c3', 'c4', 'c5'
  simA: 1,
  simB: 0,
  // 7400 Pinout
  chip: '7408',
  selectedPin: 1
};

function setLogicTab(tabName) {
  sounds.playFlip();
  logicWbState.tab = tabName;
  renderInteractiveWorkbench();
}

function setLogicGate(gateName) {
  sounds.playFlip();
  logicWbState.gate = gateName;
  renderInteractiveWorkbench(true);
}

function setLogicDiagramMode(mode) {
  sounds.playFlip();
  logicWbState.diagramMode = mode;
  renderInteractiveWorkbench(true);
}

function toggleLogicInput(inputKey) {
  sounds.playFlip();
  logicWbState[inputKey] = logicWbState[inputKey] === 1 ? 0 : 1;
  renderInteractiveWorkbench(true);
}

function setLogicSimpCircuit(circuitId) {
  sounds.playFlip();
  logicWbState.simpCircuit = circuitId;
  renderInteractiveWorkbench(true);
}

function toggleLogicSimInput(inputKey) {
  sounds.playFlip();
  logicWbState[inputKey] = logicWbState[inputKey] === 1 ? 0 : 1;
  renderInteractiveWorkbench(true);
}

function setLogicChip(chipName) {
  sounds.playFlip();
  logicWbState.chip = chipName;
  logicWbState.selectedPin = 1;
  renderInteractiveWorkbench(true);
}

function selectLogicPin(pinNum) {
  sounds.playFlip();
  logicWbState.selectedPin = pinNum;
  renderInteractiveWorkbench(true);
}

function evalLogicGate(gate, a, b) {
  switch (gate) {
    case 'AND': return (a && b) ? 1 : 0;
    case 'OR': return (a || b) ? 1 : 0;
    case 'NOT': return a === 1 ? 0 : 1;
    case 'NAND': return !(a && b) ? 1 : 0;
    case 'NOR': return !(a || b) ? 1 : 0;
    case 'XOR': return (a ^ b) ? 1 : 0;
    case 'XNOR': return !(a ^ b) ? 1 : 0;
    default: return 0;
  }
}

// ----------------------------------------------------
// TAB 1: LOGIC GATES LAB (WITH NAND & NOR UNIVERSAL CONVERSIONS)
// ----------------------------------------------------
function renderLogicGatesLabContent() {
  const g = logicWbState.gate;
  const mode = logicWbState.diagramMode || 'standard';
  const a = logicWbState.inA;
  const b = logicWbState.inB;
  const outY = evalLogicGate(g, a, b);

  const gatesList = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'];

  const gateDetails = {
    AND: {
      formula: 'Y = A · B',
      desc: 'Outputs HIGH (1) if and only if ALL inputs are 1.',
      ic: '7408 Quad 2-Input AND',
      nandDesc: '2 NAND Gates: First NAND creates (A·B)\', second NAND acts as an Inverter: ((A·B)\')\' = A·B',
      norDesc: '3 NOR Gates: De Morgan\'s Law: A·B = (A\' + B\')\'. Invert A and B with 2 NORs, then combine with a 3rd NOR.'
    },
    OR: {
      formula: 'Y = A + B',
      desc: 'Outputs HIGH (1) if AT LEAST ONE input is 1.',
      ic: '7432 Quad 2-Input OR',
      nandDesc: '3 NAND Gates: De Morgan\'s Law: A + B = (A\'·B\')\'. Invert A and B with 2 NANDs, then combine with a 3rd NAND.',
      norDesc: '2 NOR Gates: First NOR creates (A+B)\', second NOR acts as an Inverter: ((A+B)\')\' = A+B'
    },
    NOT: {
      formula: 'Y = A\'',
      desc: 'Inverts the digital input signal (1 becomes 0, 0 becomes 1).',
      ic: '7404 Hex Inverter',
      nandDesc: '1 NAND Gate: Tie both input pins together. Y = (A · A)\' = A\'',
      norDesc: '1 NOR Gate: Tie both input pins together. Y = (A + A)\' = A\''
    },
    NAND: {
      formula: 'Y = (A · B)\'',
      desc: 'Universal Gate. Outputs LOW (0) ONLY when all inputs are 1.',
      ic: '7400 Quad 2-Input NAND',
      nandDesc: '1 NAND Gate (Native Universal Gate).',
      norDesc: '4 NOR Gates: Synthesizes NAND using De Morgan inversion.'
    },
    NOR: {
      formula: 'Y = (A + B)\'',
      desc: 'Universal Gate. Outputs HIGH (1) ONLY when all inputs are 0.',
      ic: '7402 Quad 2-Input NOR',
      nandDesc: '4 NAND Gates: Synthesizes NOR using De Morgan inversion.',
      norDesc: '1 NOR Gate (Native Universal Gate).'
    },
    XOR: {
      formula: 'Y = A ⊕ B = A\'B + AB\'',
      desc: 'Exclusive-OR. Outputs 1 when inputs are DIFFERENT (odd parity).',
      ic: '7486 Quad 2-Input XOR',
      nandDesc: '4 NAND Gates: Standard 4-NAND XOR configuration.',
      norDesc: '5 NOR Gates: Standard 5-NOR XOR configuration.'
    },
    XNOR: {
      formula: 'Y = (A ⊕ B)\' = AB + A\'B\'',
      desc: 'Equivalence detector. Outputs 1 when inputs are EQUAL (even parity).',
      ic: '74266 Quad 2-Input XNOR',
      nandDesc: '5 NAND Gates: Synthesizes XNOR.',
      norDesc: '4 NOR Gates: Synthesizes XNOR.'
    }
  };

  const currentInfo = gateDetails[g];

  // Wire color coding
  const colA = a === 1 ? '#10b981' : '#0284c7';
  const colB = b === 1 ? '#10b981' : '#0284c7';
  const colY = outY === 1 ? '#10b981' : '#0284c7';

  // Truth table definitions
  const truthRows = (g === 'NOT') 
    ? [
        { a: 0, b: null, y: 1 },
        { a: 1, b: null, y: 0 }
      ]
    : [
        { a: 0, b: 0, y: evalLogicGate(g, 0, 0) },
        { a: 0, b: 1, y: evalLogicGate(g, 0, 1) },
        { a: 1, b: 0, y: evalLogicGate(g, 1, 0) },
        { a: 1, b: 1, y: evalLogicGate(g, 1, 1) }
      ];

  // Helper to generate the conversion SVG based on gate and mode
  function getDiagramSvg() {
    // 1. STANDARD IEEE DIAGRAM
    if (mode === 'standard') {
      return `
        <svg viewBox="0 0 600 200" class="w-full min-w-[500px] h-auto font-sans select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="logicGridStd" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.75" fill="#27272a" />
            </pattern>
          </defs>
          <rect width="600" height="200" fill="url(#logicGridStd)" rx="12" />

          <!-- INPUT A WIRE -->
          <line x1="100" y1="${g === 'NOT' ? '100' : '75'}" x2="230" y2="${g === 'NOT' ? '100' : '75'}" stroke="${colA}" stroke-width="${a === 1 ? '3.5' : '2.5'}" />
          <circle cx="100" cy="${g === 'NOT' ? '100' : '75'}" r="5" fill="${colA}" />
          <text x="75" y="${g === 'NOT' ? '105' : '80'}" fill="${colA}" font-size="14" font-weight="900">A=${a}</text>

          <!-- INPUT B WIRE -->
          ${g !== 'NOT' ? `
            <line x1="100" y1="125" x2="230" y2="125" stroke="${colB}" stroke-width="${b === 1 ? '3.5' : '2.5'}" />
            <circle cx="100" cy="125" r="5" fill="${colB}" />
            <text x="75" y="130" fill="${colB}" font-size="14" font-weight="900">B=${b}</text>
          ` : ''}

          <!-- GATE SYMBOLS -->
          ${g === 'AND' ? `
            <path d="M 230,55 L 280,55 A 45,45 0 0,1 280,145 L 230,145 Z" fill="#090d16" stroke="#10b981" stroke-width="2.5" />
            <line x1="325" y1="100" x2="480" y2="100" stroke="${colY}" stroke-width="${outY === 1 ? '4' : '2.5'}" />
          ` : ''}

          ${g === 'OR' ? `
            <path d="M 225,55 Q 260,100 225,145 Q 315,145 335,100 Q 315,55 225,55 Z" fill="#090d16" stroke="#10b981" stroke-width="2.5" />
            <line x1="335" y1="100" x2="480" y2="100" stroke="${colY}" stroke-width="${outY === 1 ? '4' : '2.5'}" />
          ` : ''}

          ${g === 'NOT' ? `
            <polygon points="230,65 230,135 300,100" fill="#090d16" stroke="#10b981" stroke-width="2.5" />
            <circle cx="306" cy="100" r="5" fill="#090d16" stroke="#10b981" stroke-width="2" />
            <line x1="311" y1="100" x2="480" y2="100" stroke="${colY}" stroke-width="${outY === 1 ? '4' : '2.5'}" />
          ` : ''}

          ${g === 'NAND' ? `
            <path d="M 230,55 L 280,55 A 45,45 0 0,1 280,145 L 230,145 Z" fill="#090d16" stroke="#10b981" stroke-width="2.5" />
            <circle cx="330" cy="100" r="5" fill="#090d16" stroke="#10b981" stroke-width="2" />
            <line x1="335" y1="100" x2="480" y2="100" stroke="${colY}" stroke-width="${outY === 1 ? '4' : '2.5'}" />
          ` : ''}

          ${g === 'NOR' ? `
            <path d="M 225,55 Q 260,100 225,145 Q 315,145 335,100 Q 315,55 225,55 Z" fill="#090d16" stroke="#10b981" stroke-width="2.5" />
            <circle cx="340" cy="100" r="5" fill="#090d16" stroke="#10b981" stroke-width="2" />
            <line x1="345" y1="100" x2="480" y2="100" stroke="${colY}" stroke-width="${outY === 1 ? '4' : '2.5'}" />
          ` : ''}

          ${g === 'XOR' ? `
            <path d="M 215,55 Q 250,100 215,145" fill="none" stroke="#10b981" stroke-width="2.5" />
            <path d="M 230,55 Q 265,100 230,145 Q 320,145 340,100 Q 320,55 230,55 Z" fill="#090d16" stroke="#10b981" stroke-width="2.5" />
            <line x1="340" y1="100" x2="480" y2="100" stroke="${colY}" stroke-width="${outY === 1 ? '4' : '2.5'}" />
          ` : ''}

          ${g === 'XNOR' ? `
            <path d="M 215,55 Q 250,100 215,145" fill="none" stroke="#10b981" stroke-width="2.5" />
            <path d="M 230,55 Q 265,100 230,145 Q 320,145 340,100 Q 320,55 230,55 Z" fill="#090d16" stroke="#10b981" stroke-width="2.5" />
            <circle cx="345" cy="100" r="5" fill="#090d16" stroke="#10b981" stroke-width="2" />
            <line x1="350" y1="100" x2="480" y2="100" stroke="${colY}" stroke-width="${outY === 1 ? '4' : '2.5'}" />
          ` : ''}

          <!-- OUTPUT INDICATOR -->
          <circle cx="480" cy="100" r="7" fill="${colY}" stroke="#ffffff" stroke-width="2" />
          <text x="500" y="105" fill="${colY}" font-size="16" font-weight="900">Y = ${outY}</text>
        </svg>
      `;
    }

    // 2. CONVERSION USING NAND GATES
    if (mode === 'nand') {
      if (g === 'NOT') {
        // NOT using 1 NAND: inputs tied together
        return `
          <svg viewBox="0 0 600 200" class="w-full min-w-[500px] h-auto font-sans select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="200" fill="#090d16" rx="12" stroke="#27272a" />
            <text x="30" y="30" fill="#a855f7" font-size="11" font-weight="bold">NOT Gate via 1 NAND (Tied Inputs): Y = (A·A)' = A'</text>

            <text x="60" y="105" fill="${colA}" font-size="14" font-weight="900">A=${a}</text>
            <circle cx="95" cy="100" r="5" fill="${colA}" />
            <line x1="95" y1="100" x2="160" y2="100" stroke="${colA}" stroke-width="2.5" />
            <!-- Split to both inputs of NAND -->
            <circle cx="160" cy="100" r="4" fill="${colA}" />
            <line x1="160" y1="100" x2="160" y2="80" stroke="${colA}" stroke-width="2.5" />
            <line x1="160" y1="80" x2="240" y2="80" stroke="${colA}" stroke-width="2.5" />
            <line x1="160" y1="100" x2="160" y2="120" stroke="${colA}" stroke-width="2.5" />
            <line x1="160" y1="120" x2="240" y2="120" stroke="${colA}" stroke-width="2.5" />

            <!-- NAND Gate -->
            <path d="M 240,65 L 290,65 A 35,35 0 0,1 290,135 L 240,135 Z" fill="#18181b" stroke="#06b6d4" stroke-width="2.5" />
            <circle cx="330" cy="100" r="5" fill="#18181b" stroke="#06b6d4" stroke-width="2" />
            <text x="275" y="105" fill="#06b6d4" font-size="11" font-weight="bold" text-anchor="middle">NAND</text>

            <line x1="335" y1="100" x2="470" y2="100" stroke="${colY}" stroke-width="3.5" />
            <circle cx="470" cy="100" r="7" fill="${colY}" stroke="#ffffff" stroke-width="2" />
            <text x="490" y="105" fill="${colY}" font-size="16" font-weight="900">Y = ${outY}</text>
          </svg>
        `;
      }

      if (g === 'AND') {
        // AND using 2 NANDs: NAND 1 followed by tied-input NAND 2 inverter
        const midVal = (a && b) ? 0 : 1;
        const midCol = midVal === 1 ? '#10b981' : '#0284c7';
        return `
          <svg viewBox="0 0 600 200" class="w-full min-w-[500px] h-auto font-sans select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="200" fill="#090d16" rx="12" stroke="#27272a" />
            <text x="30" y="30" fill="#a855f7" font-size="11" font-weight="bold">AND Gate via 2 NANDs: Y = ((A·B)')' = A·B</text>

            <!-- Inputs -->
            <text x="40" y="80" fill="${colA}" font-size="13" font-weight="900">A=${a}</text>
            <line x1="75" y1="75" x2="160" y2="75" stroke="${colA}" stroke-width="2.5" />
            <circle cx="75" cy="75" r="4" fill="${colA}" />

            <text x="40" y="130" fill="${colB}" font-size="13" font-weight="900">B=${b}</text>
            <line x1="75" y1="125" x2="160" y2="125" stroke="${colB}" stroke-width="2.5" />
            <circle cx="75" cy="125" r="4" fill="${colB}" />

            <!-- NAND 1 -->
            <path d="M 160,60 L 205,60 A 40,40 0 0,1 205,140 L 160,140 Z" fill="#18181b" stroke="#06b6d4" stroke-width="2.5" />
            <circle cx="250" cy="100" r="5" fill="#18181b" stroke="#06b6d4" stroke-width="2" />
            <text x="195" y="104" fill="#06b6d4" font-size="10" font-weight="bold" text-anchor="middle">NAND 1</text>

            <!-- Intermediate wire -->
            <line x1="255" y1="100" x2="330" y2="100" stroke="${midCol}" stroke-width="3" />
            <circle cx="330" cy="100" r="4" fill="${midCol}" />
            <text x="290" y="90" fill="#a1a1aa" font-size="10" font-mono font-weight="bold">(AB)'=${midVal}</text>

            <!-- Split to NAND 2 (Inverter) -->
            <line x1="330" y1="100" x2="330" y2="80" stroke="${midCol}" stroke-width="2.5" />
            <line x1="330" y1="80" x2="380" y2="80" stroke="${midCol}" stroke-width="2.5" />
            <line x1="330" y1="100" x2="330" y2="120" stroke="${midCol}" stroke-width="2.5" />
            <line x1="330" y1="120" x2="380" y2="120" stroke="${midCol}" stroke-width="2.5" />

            <!-- NAND 2 -->
            <path d="M 380,65 L 420,65 A 35,35 0 0,1 420,135 L 380,135 Z" fill="#18181b" stroke="#10b981" stroke-width="2.5" />
            <circle cx="460" cy="100" r="5" fill="#18181b" stroke="#10b981" stroke-width="2" />
            <text x="410" y="104" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">NAND 2</text>

            <line x1="465" y1="100" x2="520" y2="100" stroke="${colY}" stroke-width="3.5" />
            <circle cx="520" cy="100" r="7" fill="${colY}" stroke="#ffffff" stroke-width="2" />
            <text x="535" y="105" fill="${colY}" font-size="16" font-weight="900">Y = ${outY}</text>
          </svg>
        `;
      }

      if (g === 'OR') {
        // OR using 3 NANDs: 2 inverters on A and B feeding into a 3rd NAND (De Morgan: A + B = (A'·B')')
        const notA = a === 1 ? 0 : 1;
        const notB = b === 1 ? 0 : 1;
        const colNotA = notA === 1 ? '#10b981' : '#0284c7';
        const colNotB = notB === 1 ? '#10b981' : '#0284c7';
        return `
          <svg viewBox="0 0 600 200" class="w-full min-w-[500px] h-auto font-sans select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="200" fill="#090d16" rx="12" stroke="#27272a" />
            <text x="30" y="25" fill="#a855f7" font-size="11" font-weight="bold">OR Gate via 3 NANDs: Y = (A'·B')' = A + B (De Morgan's Law)</text>

            <!-- A into NAND 1 (Inverter) -->
            <text x="25" y="60" fill="${colA}" font-size="12" font-weight="900">A=${a}</text>
            <line x1="55" y1="55" x2="90" y2="55" stroke="${colA}" stroke-width="2.5" />
            <circle cx="90" cy="55" r="3" fill="${colA}" />
            <line x1="90" y1="55" x2="90" y2="45" stroke="${colA}" stroke-width="2" />
            <line x1="90" y1="45" x2="120" y2="45" stroke="${colA}" stroke-width="2" />
            <line x1="90" y1="55" x2="90" y2="65" stroke="${colA}" stroke-width="2" />
            <line x1="90" y1="65" x2="120" y2="65" stroke="${colA}" stroke-width="2" />
            <path d="M 120,35 L 145,35 A 20,20 0 0,1 145,75 L 120,75 Z" fill="#18181b" stroke="#06b6d4" stroke-width="2" />
            <circle cx="169" cy="55" r="4" fill="#18181b" stroke="#06b6d4" stroke-width="1.5" />
            <text x="140" y="58" fill="#06b6d4" font-size="8" font-weight="bold" text-anchor="middle">NAND 1</text>
            
            <line x1="173" y1="55" x2="270" y2="55" stroke="${colNotA}" stroke-width="2.5" />
            <text x="200" y="48" fill="#a1a1aa" font-size="9" font-mono>A'=${notA}</text>

            <!-- B into NAND 2 (Inverter) -->
            <text x="25" y="145" fill="${colB}" font-size="12" font-weight="900">B=${b}</text>
            <line x1="55" y1="140" x2="90" y2="140" stroke="${colB}" stroke-width="2.5" />
            <circle cx="90" cy="140" r="3" fill="${colB}" />
            <line x1="90" y1="140" x2="90" y2="130" stroke="${colB}" stroke-width="2" />
            <line x1="90" y1="130" x2="120" y2="130" stroke="${colB}" stroke-width="2" />
            <line x1="90" y1="140" x2="90" y2="150" stroke="${colB}" stroke-width="2" />
            <line x1="90" y1="150" x2="120" y2="150" stroke="${colB}" stroke-width="2" />
            <path d="M 120,120 L 145,120 A 20,20 0 0,1 145,160 L 120,160 Z" fill="#18181b" stroke="#06b6d4" stroke-width="2" />
            <circle cx="169" cy="140" r="4" fill="#18181b" stroke="#06b6d4" stroke-width="1.5" />
            <text x="140" y="143" fill="#06b6d4" font-size="8" font-weight="bold" text-anchor="middle">NAND 2</text>

            <line x1="173" y1="140" x2="270" y2="140" stroke="${colNotB}" stroke-width="2.5" />
            <text x="200" y="155" fill="#a1a1aa" font-size="9" font-mono>B'=${notB}</text>

            <!-- Connections to NAND 3 -->
            <line x1="270" y1="55" x2="310" y2="80" stroke="${colNotA}" stroke-width="2.5" />
            <line x1="270" y1="140" x2="310" y2="120" stroke="${colNotB}" stroke-width="2.5" />

            <!-- NAND 3 -->
            <path d="M 310,65 L 350,65 A 35,35 0 0,1 350,135 L 310,135 Z" fill="#18181b" stroke="#10b981" stroke-width="2.5" />
            <circle cx="390" cy="100" r="5" fill="#18181b" stroke="#10b981" stroke-width="2" />
            <text x="340" y="104" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">NAND 3</text>

            <line x1="395" y1="100" x2="480" y2="100" stroke="${colY}" stroke-width="3.5" />
            <circle cx="480" cy="100" r="7" fill="${colY}" stroke="#ffffff" stroke-width="2" />
            <text x="495" y="105" fill="${colY}" font-size="16" font-weight="900">Y = ${outY}</text>
          </svg>
        `;
      }

      // Default fallback for NAND mode on other gates
      return `
        <div class="p-6 text-center text-zinc-400 font-mono text-xs">
          Universal NAND implementation for ${g}: ${currentInfo.nandDesc}
        </div>
      `;
    }

    // 3. CONVERSION USING NOR GATES
    if (mode === 'nor') {
      if (g === 'NOT') {
        // NOT using 1 NOR: inputs tied together
        return `
          <svg viewBox="0 0 600 200" class="w-full min-w-[500px] h-auto font-sans select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="200" fill="#090d16" rx="12" stroke="#27272a" />
            <text x="30" y="30" fill="#a855f7" font-size="11" font-weight="bold">NOT Gate via 1 NOR (Tied Inputs): Y = (A + A)' = A'</text>

            <text x="60" y="105" fill="${colA}" font-size="14" font-weight="900">A=${a}</text>
            <circle cx="95" cy="100" r="5" fill="${colA}" />
            <line x1="95" y1="100" x2="160" y2="100" stroke="${colA}" stroke-width="2.5" />
            <circle cx="160" cy="100" r="4" fill="${colA}" />
            <line x1="160" y1="100" x2="160" y2="80" stroke="${colA}" stroke-width="2.5" />
            <line x1="160" y1="80" x2="235" y2="80" stroke="${colA}" stroke-width="2.5" />
            <line x1="160" y1="100" x2="160" y2="120" stroke="${colA}" stroke-width="2.5" />
            <line x1="160" y1="120" x2="235" y2="120" stroke="${colA}" stroke-width="2.5" />

            <!-- NOR Gate -->
            <path d="M 230,65 Q 260,100 230,135 Q 305,135 325,100 Q 305,65 230,65 Z" fill="#18181b" stroke="#06b6d4" stroke-width="2.5" />
            <circle cx="330" cy="100" r="5" fill="#18181b" stroke="#06b6d4" stroke-width="2" />
            <text x="275" y="104" fill="#06b6d4" font-size="11" font-weight="bold" text-anchor="middle">NOR</text>

            <line x1="335" y1="100" x2="470" y2="100" stroke="${colY}" stroke-width="3.5" />
            <circle cx="470" cy="100" r="7" fill="${colY}" stroke="#ffffff" stroke-width="2" />
            <text x="490" y="105" fill="${colY}" font-size="16" font-weight="900">Y = ${outY}</text>
          </svg>
        `;
      }

      if (g === 'OR') {
        // OR using 2 NORs: NOR 1 followed by tied-input NOR 2 inverter
        const midVal = (a || b) ? 0 : 1;
        const midCol = midVal === 1 ? '#10b981' : '#0284c7';
        return `
          <svg viewBox="0 0 600 200" class="w-full min-w-[500px] h-auto font-sans select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="200" fill="#090d16" rx="12" stroke="#27272a" />
            <text x="30" y="30" fill="#a855f7" font-size="11" font-weight="bold">OR Gate via 2 NORs: Y = ((A + B)')' = A + B</text>

            <!-- Inputs -->
            <text x="40" y="80" fill="${colA}" font-size="13" font-weight="900">A=${a}</text>
            <line x1="75" y1="75" x2="160" y2="75" stroke="${colA}" stroke-width="2.5" />
            <circle cx="75" cy="75" r="4" fill="${colA}" />

            <text x="40" y="130" fill="${colB}" font-size="13" font-weight="900">B=${b}</text>
            <line x1="75" y1="125" x2="160" y2="125" stroke="${colB}" stroke-width="2.5" />
            <circle cx="75" cy="125" r="4" fill="${colB}" />

            <!-- NOR 1 -->
            <path d="M 155,60 Q 185,100 155,140 Q 235,140 255,100 Q 235,60 155,60 Z" fill="#18181b" stroke="#06b6d4" stroke-width="2.5" />
            <circle cx="260" cy="100" r="5" fill="#18181b" stroke="#06b6d4" stroke-width="2" />
            <text x="205" y="104" fill="#06b6d4" font-size="10" font-weight="bold" text-anchor="middle">NOR 1</text>

            <!-- Intermediate wire -->
            <line x1="265" y1="100" x2="330" y2="100" stroke="${midCol}" stroke-width="3" />
            <circle cx="330" cy="100" r="4" fill="${midCol}" />
            <text x="295" y="90" fill="#a1a1aa" font-size="10" font-mono font-weight="bold">(A+B)'=${midVal}</text>

            <!-- Split to NOR 2 (Inverter) -->
            <line x1="330" y1="100" x2="330" y2="80" stroke="${midCol}" stroke-width="2.5" />
            <line x1="330" y1="80" x2="375" y2="80" stroke="${midCol}" stroke-width="2.5" />
            <line x1="330" y1="100" x2="330" y2="120" stroke="${midCol}" stroke-width="2.5" />
            <line x1="330" y1="120" x2="375" y2="120" stroke="${midCol}" stroke-width="2.5" />

            <!-- NOR 2 -->
            <path d="M 370,65 Q 395,100 370,135 Q 435,135 450,100 Q 435,65 370,65 Z" fill="#18181b" stroke="#10b981" stroke-width="2.5" />
            <circle cx="455" cy="100" r="5" fill="#18181b" stroke="#10b981" stroke-width="2" />
            <text x="415" y="104" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">NOR 2</text>

            <line x1="460" y1="100" x2="520" y2="100" stroke="${colY}" stroke-width="3.5" />
            <circle cx="520" cy="100" r="7" fill="${colY}" stroke="#ffffff" stroke-width="2" />
            <text x="535" y="105" fill="${colY}" font-size="16" font-weight="900">Y = ${outY}</text>
          </svg>
        `;
      }

      if (g === 'AND') {
        // AND using 3 NORs: 2 inverters on A and B feeding into a 3rd NOR (De Morgan: A · B = (A' + B')')
        const notA = a === 1 ? 0 : 1;
        const notB = b === 1 ? 0 : 1;
        const colNotA = notA === 1 ? '#10b981' : '#0284c7';
        const colNotB = notB === 1 ? '#10b981' : '#0284c7';
        return `
          <svg viewBox="0 0 600 200" class="w-full min-w-[500px] h-auto font-sans select-none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="200" fill="#090d16" rx="12" stroke="#27272a" />
            <text x="30" y="25" fill="#a855f7" font-size="11" font-weight="bold">AND Gate via 3 NORs: Y = (A' + B')' = A · B (De Morgan's Law)</text>

            <!-- A into NOR 1 (Inverter) -->
            <text x="25" y="60" fill="${colA}" font-size="12" font-weight="900">A=${a}</text>
            <line x1="55" y1="55" x2="90" y2="55" stroke="${colA}" stroke-width="2.5" />
            <circle cx="90" cy="55" r="3" fill="${colA}" />
            <line x1="90" y1="55" x2="90" y2="45" stroke="${colA}" stroke-width="2" />
            <line x1="90" y1="45" x2="115" y2="45" stroke="${colA}" stroke-width="2" />
            <line x1="90" y1="55" x2="90" y2="65" stroke="${colA}" stroke-width="2" />
            <line x1="90" y1="65" x2="115" y2="65" stroke="${colA}" stroke-width="2" />
            <path d="M 115,35 Q 130,55 115,75 Q 160,75 170,55 Q 160,35 115,35 Z" fill="#18181b" stroke="#06b6d4" stroke-width="2" />
            <circle cx="174" cy="55" r="4" fill="#18181b" stroke="#06b6d4" stroke-width="1.5" />
            <text x="140" y="58" fill="#06b6d4" font-size="8" font-weight="bold" text-anchor="middle">NOR 1</text>
            
            <line x1="178" y1="55" x2="270" y2="55" stroke="${colNotA}" stroke-width="2.5" />
            <text x="200" y="48" fill="#a1a1aa" font-size="9" font-mono>A'=${notA}</text>

            <!-- B into NOR 2 (Inverter) -->
            <text x="25" y="145" fill="${colB}" font-size="12" font-weight="900">B=${b}</text>
            <line x1="55" y1="140" x2="90" y2="140" stroke="${colB}" stroke-width="2.5" />
            <circle cx="90" cy="140" r="3" fill="${colB}" />
            <line x1="90" y1="140" x2="90" y2="130" stroke="${colB}" stroke-width="2" />
            <line x1="90" y1="130" x2="115" y2="130" stroke="${colB}" stroke-width="2" />
            <line x1="90" y1="140" x2="90" y2="150" stroke="${colB}" stroke-width="2" />
            <line x1="90" y1="150" x2="115" y2="150" stroke="${colB}" stroke-width="2" />
            <path d="M 115,120 Q 130,140 115,160 Q 160,160 170,140 Q 160,120 115,120 Z" fill="#18181b" stroke="#06b6d4" stroke-width="2" />
            <circle cx="174" cy="140" r="4" fill="#18181b" stroke="#06b6d4" stroke-width="1.5" />
            <text x="140" y="143" fill="#06b6d4" font-size="8" font-weight="bold" text-anchor="middle">NOR 2</text>

            <line x1="178" y1="140" x2="270" y2="140" stroke="${colNotB}" stroke-width="2.5" />
            <text x="200" y="155" fill="#a1a1aa" font-size="9" font-mono>B'=${notB}</text>

            <!-- Connections to NOR 3 -->
            <line x1="270" y1="55" x2="310" y2="80" stroke="${colNotA}" stroke-width="2.5" />
            <line x1="270" y1="140" x2="310" y2="120" stroke="${colNotB}" stroke-width="2.5" />

            <!-- NOR 3 -->
            <path d="M 310,65 Q 335,100 310,135 Q 380,135 395,100 Q 380,65 310,65 Z" fill="#18181b" stroke="#10b981" stroke-width="2.5" />
            <circle cx="400" cy="100" r="5" fill="#18181b" stroke="#10b981" stroke-width="2" />
            <text x="355" y="104" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">NOR 3</text>

            <line x1="405" y1="100" x2="480" y2="100" stroke="${colY}" stroke-width="3.5" />
            <circle cx="480" cy="100" r="7" fill="${colY}" stroke="#ffffff" stroke-width="2" />
            <text x="495" y="105" fill="${colY}" font-size="16" font-weight="900">Y = ${outY}</text>
          </svg>
        `;
      }

      // Default fallback for NOR mode
      return `
        <div class="p-6 text-center text-zinc-400 font-mono text-xs">
          Universal NOR implementation for ${g}: ${currentInfo.norDesc}
        </div>
      `;
    }
  }

  return `
    <div class="space-y-6">
      
      <!-- 1. GATE SELECTOR & IMPLEMENTATION MODE SWITCHER -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <div>
          <span class="text-[10px] font-black uppercase tracking-wider text-zinc-400">Target Gate:</span>
          <h4 class="text-sm font-black text-zinc-900 dark:text-white">Select Logic Function</h4>
        </div>
        
        <!-- View Mode: Standard vs Universal NAND vs Universal NOR -->
        <div class="flex flex-wrap items-center gap-1.5 bg-zinc-200/80 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs">
          <button 
            onclick="setLogicDiagramMode('standard')" 
            class="px-3 py-1 rounded-lg font-bold transition-all ${mode === 'standard' ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Standard Symbol
          </button>
          <button 
            onclick="setLogicDiagramMode('nand')" 
            class="px-3 py-1 rounded-lg font-bold transition-all ${mode === 'nand' ? 'bg-cyan-600 text-white shadow-sm' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Convert to NAND Only
          </button>
          <button 
            onclick="setLogicDiagramMode('nor')" 
            class="px-3 py-1 rounded-lg font-bold transition-all ${mode === 'nor' ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}"
          >
            Convert to NOR Only
          </button>
        </div>
      </div>

      <!-- Gate Selector Buttons -->
      <div class="flex flex-wrap gap-2">
        ${gatesList.map(name => `
          <button 
            onclick="setLogicGate('${name}')"
            class="px-3.5 py-2 rounded-xl text-xs font-black border transition-all ${g === name ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/20 shadow-sm' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-emerald-500'}"
          >
            ${name} Gate
          </button>
        `).join('')}
      </div>

      <!-- 2. MAIN INTERACTIVE GATE CANVAS & SCHEMATIC -->
      <div class="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xl space-y-5">
        
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider ${mode === 'standard' ? 'text-emerald-500' : (mode === 'nand' ? 'text-cyan-500' : 'text-purple-500')}">
              ${mode === 'standard' ? 'Standard IEEE Gate Symbol' : (mode === 'nand' ? 'Universal NAND Equivalent Circuit' : 'Universal NOR Equivalent Circuit')}
            </span>
            <h3 class="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
              ${g} Gate (${mode === 'standard' ? 'Standard' : (mode === 'nand' ? 'Built Entirely from NAND Gates' : 'Built Entirely from NOR Gates')})
            </h3>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-extrabold border ${outY === 1 ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 border-emerald-500/30' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border-zinc-700'}">
              Output Y: ${outY === 1 ? 'HIGH (1)' : 'LOW (0)'}
            </span>
          </div>
        </div>

        <!-- SVG Logic Gate Diagram with Dynamic Glowing Wires -->
        <div class="w-full overflow-x-auto rounded-2xl bg-zinc-950 border border-zinc-800/80 p-3 sm:p-5 shadow-2xl">
          ${getDiagramSvg()}
        </div>

        <!-- INPUT SWITCH TOGGLE BUTTONS -->
        <div class="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
          <span class="text-xs font-black uppercase tracking-wider text-zinc-400">Interactive Inputs:</span>
          
          <button 
            onclick="toggleLogicInput('inA')"
            class="px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${a === 1 ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm' : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'}"
          >
            <span>Input A:</span>
            <span class="px-2 py-0.5 rounded bg-black/20 font-mono font-black">${a}</span>
            <span class="text-[10px] opacity-75">(Click to toggle)</span>
          </button>

          ${g !== 'NOT' ? `
            <button 
              onclick="toggleLogicInput('inB')"
              class="px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${b === 1 ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm' : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'}"
            >
              <span>Input B:</span>
              <span class="px-2 py-0.5 rounded bg-black/20 font-mono font-black">${b}</span>
              <span class="text-[10px] opacity-75">(Click to toggle)</span>
            </button>
          ` : ''}
        </div>

        <!-- CONVERSION EXPLANATION BANNER (WHEN IN NAND OR NOR MODE) -->
        ${mode !== 'standard' ? `
          <div class="p-4 rounded-2xl border text-xs space-y-1 ${mode === 'nand' ? 'bg-cyan-50/50 dark:bg-cyan-950/30 border-cyan-500/30 text-cyan-800 dark:text-cyan-200' : 'bg-purple-50/50 dark:bg-purple-950/30 border-purple-500/30 text-purple-800 dark:text-purple-200'}">
            <div class="font-black flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <i data-lucide="info" class="w-3.5 h-3.5"></i>
              ${mode === 'nand' ? 'NAND-Only Conversion Theory' : 'NOR-Only Conversion Theory'}
            </div>
            <p class="leading-relaxed font-medium">
              ${mode === 'nand' ? currentInfo.nandDesc : currentInfo.norDesc}
            </p>
          </div>
        ` : ''}

        <!-- 3. TRUTH TABLE & UNIVERSAL CONVERSION REFERENCE TABLE -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          
          <!-- LIVE TRUTH TABLE -->
          <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <i data-lucide="table" class="w-4 h-4"></i> Live Dynamic Truth Table
              </span>
              <span class="text-[10px] font-mono text-zinc-400">Green = Active State</span>
            </div>

            <table class="w-full text-xs font-mono text-center border-collapse">
              <thead>
                <tr class="border-b border-zinc-200 dark:border-zinc-700 text-zinc-400 font-bold">
                  <th class="py-1.5">A</th>
                  ${g !== 'NOT' ? '<th class="py-1.5">B</th>' : ''}
                  <th class="py-1.5 text-emerald-500">Output (Y)</th>
                  <th class="py-1.5 font-sans font-normal text-zinc-500 text-[10px]">State</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-200/60 dark:divide-zinc-700/60 font-bold">
                ${truthRows.map(r => {
                  const isActive = (r.a === a && (g === 'NOT' || r.b === b));
                  return `
                    <tr class="transition-colors ${isActive ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-black' : 'text-zinc-700 dark:text-zinc-300'}">
                      <td class="py-1.5">${r.a}</td>
                      ${g !== 'NOT' ? `<td class="py-1.5">${r.b}</td>` : ''}
                      <td class="py-1.5 text-emerald-500 text-sm">${r.y}</td>
                      <td class="py-1.5 font-sans text-[10px]">
                        ${isActive ? '<span class="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold text-[9px]">ACTIVE</span>' : ''}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>

          <!-- UNIVERSAL GATE CONVERSION SUMMARY TABLE -->
          <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 space-y-2.5">
            <span class="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <i data-lucide="layers" class="w-4 h-4"></i> Universal Gate Conversion Matrix
            </span>
            
            <div class="overflow-x-auto">
              <table class="w-full text-[11px] text-left border-collapse">
                <thead>
                  <tr class="border-b border-zinc-200 dark:border-zinc-700 font-bold text-zinc-400">
                    <th class="py-1 px-1.5">Function</th>
                    <th class="py-1 px-1.5 text-cyan-500">Using NAND</th>
                    <th class="py-1 px-1.5 text-purple-500">Using NOR</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-200/60 dark:divide-zinc-700/60 font-mono">
                  <tr class="${g === 'NOT' ? 'bg-purple-500/10 font-bold text-purple-400' : 'text-zinc-700 dark:text-zinc-300'}">
                    <td class="py-1 px-1.5 font-sans font-bold">NOT (Inverter)</td>
                    <td class="py-1 px-1.5">1 NAND (Tied)</td>
                    <td class="py-1 px-1.5">1 NOR (Tied)</td>
                  </tr>
                  <tr class="${g === 'AND' ? 'bg-purple-500/10 font-bold text-purple-400' : 'text-zinc-700 dark:text-zinc-300'}">
                    <td class="py-1 px-1.5 font-sans font-bold">AND Gate</td>
                    <td class="py-1 px-1.5">2 NANDs</td>
                    <td class="py-1 px-1.5">3 NORs</td>
                  </tr>
                  <tr class="${g === 'OR' ? 'bg-purple-500/10 font-bold text-purple-400' : 'text-zinc-700 dark:text-zinc-300'}">
                    <td class="py-1 px-1.5 font-sans font-bold">OR Gate</td>
                    <td class="py-1 px-1.5">3 NANDs</td>
                    <td class="py-1 px-1.5">2 NORs</td>
                  </tr>
                  <tr class="${g === 'XOR' ? 'bg-purple-500/10 font-bold text-purple-400' : 'text-zinc-700 dark:text-zinc-300'}">
                    <td class="py-1 px-1.5 font-sans font-bold">XOR Gate</td>
                    <td class="py-1 px-1.5">4 NANDs</td>
                    <td class="py-1 px-1.5">5 NORs</td>
                  </tr>
                  <tr class="${g === 'XNOR' ? 'bg-purple-500/10 font-bold text-purple-400' : 'text-zinc-700 dark:text-zinc-300'}">
                    <td class="py-1 px-1.5 font-sans font-bold">XNOR Gate</td>
                    <td class="py-1 px-1.5">5 NANDs</td>
                    <td class="py-1 px-1.5">4 NORs</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="pt-1 text-[10px] text-zinc-500 dark:text-zinc-400 italic">
              💡 Tip: Click "Convert to NAND Only" or "Convert to NOR Only" above to view the live schematic!
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
}

// ----------------------------------------------------
// TAB 2: COMBINATIONAL CIRCUIT SIMPLIFIER LAB
// ----------------------------------------------------
function renderLogicSimplifierLabContent() {
  const cId = logicWbState.simpCircuit;
  const a = logicWbState.simA;
  const b = logicWbState.simB;

  const circuits = {
    c1: {
      name: "AND-OR Network (Distributive Law)",
      unsimplified: "Y = A·B + A·B'",
      simplified: "Y = A",
      steps: [
        "Circuit contains two 2-input AND gates feeding an OR gate.",
        "Step 1: Write equation from gate outputs: Y = A·B + A·B'",
        "Step 2: Factor out common term A (Distributive Law): Y = A·(B + B')",
        "Step 3: Apply Complement Law (B + B' = 1): Y = A·(1)",
        "Step 4: Identity Law: Y = A"
      ],
      calcOut: (a, b) => a,
      svg: `
        <svg viewBox="0 0 520 160" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg">
          <text x="20" y="45" fill="${a === 1 ? '#10b981' : '#0284c7'}" font-size="12" font-weight="bold">A=${a}</text>
          <text x="20" y="115" fill="${b === 1 ? '#10b981' : '#0284c7'}" font-size="12" font-weight="bold">B=${b}</text>
          <line x1="45" y1="40" x2="160" y2="40" stroke="${a === 1 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <line x1="60" y1="40" x2="60" y2="95" stroke="${a === 1 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <line x1="60" y1="95" x2="160" y2="95" stroke="${a === 1 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <line x1="45" y1="110" x2="90" y2="110" stroke="${b === 1 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <line x1="80" y1="110" x2="80" y2="55" stroke="${b === 1 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <line x1="80" y1="55" x2="160" y2="55" stroke="${b === 1 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <polygon points="90,105 90,125 110,115" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/>
          <circle cx="114" cy="115" r="3" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/>
          <line x1="117" y1="115" x2="160" y2="115" stroke="${b === 0 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <path d="M 160,32 L 180,32 A 18,18 0 0,1 180,68 L 160,68 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/>
          <text x="210" y="44" fill="#a1a1aa" font-size="9" font-mono>${(a && b) ? '1' : '0'}</text>
          <path d="M 160,87 L 180,87 A 18,18 0 0,1 180,123 L 160,123 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/>
          <text x="210" y="120" fill="#a1a1aa" font-size="9" font-mono>${(a && !b) ? '1' : '0'}</text>
          <line x1="198" y1="50" x2="310" y2="68" stroke="#06b6d4" stroke-width="2"/>
          <line x1="198" y1="105" x2="310" y2="86" stroke="#06b6d4" stroke-width="2"/>
          <path d="M 305,60 Q 320,77 305,94 Q 335,94 345,77 Q 335,60 305,60 Z" fill="#090d16" stroke="#10b981" stroke-width="2"/>
          <line x1="345" y1="77" x2="420" y2="77" stroke="${a === 1 ? '#10b981' : '#0284c7'}" stroke-width="2.5"/>
          <circle cx="420" cy="77" r="4" fill="${a === 1 ? '#10b981' : '#0284c7'}"/>
          <text x="430" y="81" fill="${a === 1 ? '#10b981' : '#0284c7'}" font-size="14" font-weight="900">Y = ${a}</text>
        </svg>
      `
    },
    c2: {
      name: "Dual-OR into AND Network",
      unsimplified: "Y = (A' + B)(A + B)",
      simplified: "Y = B",
      steps: [
        "Circuit contains two OR gates with one inverted input, feeding an AND gate.",
        "Step 1: Write equation: Y = (A' + B)(A + B)",
        "Step 2: Expand using Distributive Law: Y = A'A + A'B + BA + B·B",
        "Step 3: Since A'·A = 0 and B·B = B: Y = 0 + A'B + AB + B",
        "Step 4: Factor: Y = B·(A' + A + 1) = B·(1) = B"
      ],
      calcOut: (a, b) => b,
      svg: `
        <svg viewBox="0 0 520 160" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg">
          <text x="20" y="45" fill="${a === 1 ? '#10b981' : '#0284c7'}" font-size="12" font-weight="bold">A=${a}</text>
          <text x="20" y="115" fill="${b === 1 ? '#10b981' : '#0284c7'}" font-size="12" font-weight="bold">B=${b}</text>
          <line x1="45" y1="40" x2="80" y2="40" stroke="${a === 1 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <line x1="60" y1="40" x2="60" y2="105" stroke="${a === 1 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <line x1="60" y1="105" x2="160" y2="105" stroke="${a === 1 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <polygon points="80,30 80,50 100,40" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/>
          <circle cx="104" cy="40" r="3" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/>
          <line x1="107" y1="40" x2="160" y2="40" stroke="${a === 0 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <line x1="45" y1="110" x2="160" y2="110" stroke="${b === 1 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <line x1="85" y1="110" x2="85" y2="55" stroke="${b === 1 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <line x1="85" y1="55" x2="160" y2="55" stroke="${b === 1 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <path d="M 160,35 Q 175,48 160,60 Q 190,60 200,48 Q 190,35 160,35 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/>
          <path d="M 160,95 Q 175,108 160,120 Q 190,120 200,108 Q 190,95 160,95 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/>
          <line x1="200" y1="48" x2="310" y2="68" stroke="#06b6d4" stroke-width="2"/>
          <line x1="200" y1="108" x2="310" y2="86" stroke="#06b6d4" stroke-width="2"/>
          <path d="M 310,60 L 330,60 A 17,17 0 0,1 330,94 L 310,94 Z" fill="#090d16" stroke="#10b981" stroke-width="2"/>
          <line x1="347" y1="77" x2="420" y2="77" stroke="${b === 1 ? '#10b981' : '#0284c7'}" stroke-width="2.5"/>
          <circle cx="420" cy="77" r="4" fill="${b === 1 ? '#10b981' : '#0284c7'}"/>
          <text x="430" y="81" fill="${b === 1 ? '#10b981' : '#0284c7'}" font-size="14" font-weight="900">Y = ${b}</text>
        </svg>
      `
    },
    c3: {
      name: "De Morgan Negative-NAND",
      unsimplified: "Y = (A' · B')'",
      simplified: "Y = A + B",
      steps: [
        "Inverters feed into a 2-input NAND gate.",
        "Step 1: Write unsimplified equation: Y = (A' · B')'",
        "Step 2: Apply De Morgan's First Law: (X · Y)' = X' + Y'",
        "Step 3: Substitute: Y = (A')' + (B')'",
        "Step 4: Double Complement Involution: Y = A + B (Standard OR gate!)"
      ],
      calcOut: (a, b) => (a || b) ? 1 : 0,
      svg: `
        <svg viewBox="0 0 520 150" class="w-full h-auto max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg">
          <text x="20" y="45" fill="${a === 1 ? '#10b981' : '#0284c7'}" font-size="12" font-weight="bold">A=${a}</text>
          <text x="20" y="105" fill="${b === 1 ? '#10b981' : '#0284c7'}" font-size="12" font-weight="bold">B=${b}</text>
          <line x1="35" y1="40" x2="80" y2="40" stroke="${a === 1 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <polygon points="80,30 80,50 100,40" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/>
          <circle cx="104" cy="40" r="3" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/>
          <line x1="107" y1="40" x2="200" y2="40" stroke="${a === 0 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <line x1="35" y1="100" x2="80" y2="100" stroke="${b === 1 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <polygon points="80,90 80,110 100,100" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/>
          <circle cx="104" cy="100" r="3" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/>
          <line x1="107" y1="100" x2="200" y2="100" stroke="${b === 0 ? '#10b981' : '#0284c7'}" stroke-width="2"/>
          <path d="M 200,30 L 225,30 A 25,25 0 0,1 225,110 L 200,110 Z" fill="#090d16" stroke="#06b6d4" stroke-width="2"/>
          <circle cx="254" cy="70" r="4" fill="#090d16" stroke="#06b6d4" stroke-width="2"/>
          <line x1="258" y1="70" x2="360" y2="70" stroke="${(a || b) ? '#10b981' : '#0284c7'}" stroke-width="2.5"/>
          <circle cx="360" cy="70" r="4" fill="${(a || b) ? '#10b981' : '#0284c7'}"/>
          <text x="370" y="74" fill="${(a || b) ? '#10b981' : '#0284c7'}" font-size="14" font-weight="900">Y = ${(a || b) ? 1 : 0}</text>
        </svg>
      `
    }
  };

  const curr = circuits[cId] || circuits.c1;
  const outY = curr.calcOut(a, b);

  return `
    <div class="space-y-6">
      
      <!-- Preset Circuit Selectors -->
      <div class="flex flex-wrap gap-2">
        <button 
          onclick="setLogicSimpCircuit('c1')"
          class="px-3.5 py-2 rounded-xl text-xs font-black border transition-all ${cId === 'c1' ? 'border-cyan-500 bg-cyan-50/60 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 ring-2 ring-cyan-500/20' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}"
        >
          1. Distributive AND-OR (A·B + A·B')
        </button>
        <button 
          onclick="setLogicSimpCircuit('c2')"
          class="px-3.5 py-2 rounded-xl text-xs font-black border transition-all ${cId === 'c2' ? 'border-cyan-500 bg-cyan-50/60 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 ring-2 ring-cyan-500/20' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}"
        >
          2. Dual-OR into AND ((A'+B)(A+B))
        </button>
        <button 
          onclick="setLogicSimpCircuit('c3')"
          class="px-3.5 py-2 rounded-xl text-xs font-black border transition-all ${cId === 'c3' ? 'border-cyan-500 bg-cyan-50/60 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 ring-2 ring-cyan-500/20' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}"
        >
          3. De Morgan Negative-NAND ((A'B')')
        </button>
      </div>

      <!-- MAIN SIMPLIFIER CANVAS -->
      <div class="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xl space-y-5">
        
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-cyan-500">Combinational Circuit Schematic</span>
            <h3 class="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
              ${curr.name}
            </h3>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-mono font-black border bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 border-emerald-500/30">
              Simplified: ${curr.simplified}
            </span>
          </div>
        </div>

        <!-- SVG Diagram -->
        <div class="w-full overflow-x-auto rounded-2xl bg-zinc-950 border border-zinc-800/80 p-3 sm:p-5 shadow-2xl">
          ${curr.svg}
        </div>

        <!-- Inputs Toggle -->
        <div class="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
          <span class="text-xs font-black uppercase tracking-wider text-zinc-400">Test Inputs:</span>
          
          <button 
            onclick="toggleLogicSimInput('simA')"
            class="px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${a === 1 ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'}"
          >
            <span>Input A:</span>
            <span class="px-2 py-0.5 rounded bg-black/20 font-mono font-black">${a}</span>
          </button>

          <button 
            onclick="toggleLogicSimInput('simB')"
            class="px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${b === 1 ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700'}"
          >
            <span>Input B:</span>
            <span class="px-2 py-0.5 rounded bg-black/20 font-mono font-black">${b}</span>
          </button>

          <div class="ml-auto font-mono text-xs font-bold text-emerald-500 flex items-center gap-1.5">
            <span>Result: Y = ${outY}</span>
          </div>
        </div>

        <!-- Step-by-Step Simplification Solution Breakdown -->
        <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 space-y-2.5">
          <span class="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
            <i data-lucide="check-circle" class="w-4 h-4"></i> Step-by-Step Algebraic Reduction
          </span>

          <div class="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
            ${curr.steps.map(step => `
              <div class="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 font-mono">
                ${step}
              </div>
            `).join('')}
          </div>
        </div>

      </div>

    </div>
  `;
}

// ----------------------------------------------------
// TAB 3: 7400-SERIES IC PINOUT EXPLORER
// ----------------------------------------------------
function renderLogicPinoutContent() {
  const c = logicWbState.chip;
  const pin = logicWbState.selectedPin;

  const chips = {
    '7408': {
      name: '7408 Quad 2-Input AND Gate',
      tech: 'TTL Standard / 74LS08 Low-Power Schottky',
      pins: [
        { num: 1, name: '1A', desc: 'Gate 1 Input A' },
        { num: 2, name: '1B', desc: 'Gate 1 Input B' },
        { num: 3, name: '1Y', desc: 'Gate 1 Output (1Y = 1A · 1B)' },
        { num: 4, name: '2A', desc: 'Gate 2 Input A' },
        { num: 5, name: '2B', desc: 'Gate 2 Input B' },
        { num: 6, name: '2Y', desc: 'Gate 2 Output (2Y = 2A · 2B)' },
        { num: 7, name: 'GND', desc: 'Ground Reference (0V)' },
        { num: 8, name: '3Y', desc: 'Gate 3 Output (3Y = 3A · 3B)' },
        { num: 9, name: '3B', desc: 'Gate 3 Input B' },
        { num: 10, name: '3A', desc: 'Gate 3 Input A' },
        { num: 11, name: '4Y', desc: 'Gate 4 Output (4Y = 4A · 4B)' },
        { num: 12, name: '4B', desc: 'Gate 4 Input B' },
        { num: 13, name: '4A', desc: 'Gate 4 Input A' },
        { num: 14, name: 'VCC', desc: 'Positive DC Power Supply (+5.0V)' }
      ]
    },
    '7432': {
      name: '7432 Quad 2-Input OR Gate',
      tech: 'TTL Standard / 74LS32 Low-Power Schottky',
      pins: [
        { num: 1, name: '1A', desc: 'Gate 1 Input A' },
        { num: 2, name: '1B', desc: 'Gate 1 Input B' },
        { num: 3, name: '1Y', desc: 'Gate 1 Output (1Y = 1A + 1B)' },
        { num: 4, name: '2A', desc: 'Gate 2 Input A' },
        { num: 5, name: '2B', desc: 'Gate 2 Input B' },
        { num: 6, name: '2Y', desc: 'Gate 2 Output (2Y = 2A + 2B)' },
        { num: 7, name: 'GND', desc: 'Ground Reference (0V)' },
        { num: 8, name: '3Y', desc: 'Gate 3 Output (3Y = 3A + 3B)' },
        { num: 9, name: '3B', desc: 'Gate 3 Input B' },
        { num: 10, name: '3A', desc: 'Gate 3 Input A' },
        { num: 11, name: '4Y', desc: 'Gate 4 Output (4Y = 4A + 4B)' },
        { num: 12, name: '4B', desc: 'Gate 4 Input B' },
        { num: 13, name: '4A', desc: 'Gate 4 Input A' },
        { num: 14, name: 'VCC', desc: 'Positive DC Power Supply (+5.0V)' }
      ]
    },
    '7400': {
      name: '7400 Quad 2-Input NAND Gate',
      tech: 'TTL Standard / 74LS00 Universal Gate',
      pins: [
        { num: 1, name: '1A', desc: 'Gate 1 Input A' },
        { num: 2, name: '1B', desc: 'Gate 1 Input B' },
        { num: 3, name: '1Y', desc: 'Gate 1 Output (1Y = (1A · 1B)\')' },
        { num: 4, name: '2A', desc: 'Gate 2 Input A' },
        { num: 5, name: '2B', desc: 'Gate 2 Input B' },
        { num: 6, name: '2Y', desc: 'Gate 2 Output (2Y = (2A · 2B)\')' },
        { num: 7, name: 'GND', desc: 'Ground Reference (0V)' },
        { num: 8, name: '3Y', desc: 'Gate 3 Output (3Y = (3A · 3B)\')' },
        { num: 9, name: '3B', desc: 'Gate 3 Input B' },
        { num: 10, name: '3A', desc: 'Gate 3 Input A' },
        { num: 11, name: '4Y', desc: 'Gate 4 Output (4Y = (4A · 4B)\')' },
        { num: 12, name: '4B', desc: 'Gate 4 Input B' },
        { num: 13, name: '4A', desc: 'Gate 4 Input A' },
        { num: 14, name: 'VCC', desc: 'Positive DC Power Supply (+5.0V)' }
      ]
    },
    '7404': {
      name: '7404 Hex Inverter (6 NOT Gates)',
      tech: 'TTL Standard / 74LS04 Hex Inverter',
      pins: [
        { num: 1, name: '1A', desc: 'Inverter 1 Input' },
        { num: 2, name: '1Y', desc: 'Inverter 1 Output (1Y = 1A\')' },
        { num: 3, name: '2A', desc: 'Inverter 2 Input' },
        { num: 4, name: '2Y', desc: 'Inverter 2 Output (2Y = 2A\')' },
        { num: 5, name: '3A', desc: 'Inverter 3 Input' },
        { num: 6, name: '3Y', desc: 'Inverter 3 Output (3Y = 3A\')' },
        { num: 7, name: 'GND', desc: 'Ground Reference (0V)' },
        { num: 8, name: '4Y', desc: 'Inverter 4 Output (4Y = 4A\')' },
        { num: 9, name: '4A', desc: 'Inverter 4 Input' },
        { num: 10, name: '5Y', desc: 'Inverter 5 Output (5Y = 5A\')' },
        { num: 11, name: '5A', desc: 'Inverter 5 Input' },
        { num: 12, name: '6Y', desc: 'Inverter 6 Output (6Y = 6A\')' },
        { num: 13, name: '6A', desc: 'Inverter 6 Input' },
        { num: 14, name: 'VCC', desc: 'Positive DC Power Supply (+5.0V)' }
      ]
    }
  };

  const activeChip = chips[c] || chips['7408'];
  const activePinInfo = activeChip.pins.find(p => p.num === pin) || activeChip.pins[0];

  return `
    <div class="space-y-6">
      <div class="flex flex-wrap gap-2">
        ${Object.keys(chips).map(chipKey => `
          <button 
            onclick="setLogicChip('${chipKey}')"
            class="px-3.5 py-2 rounded-xl text-xs font-black border transition-all ${c === chipKey ? 'border-purple-500 bg-purple-50/60 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 ring-2 ring-purple-500/20' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}"
          >
            ${chipKey} IC
          </button>
        `).join('')}
      </div>

      <div class="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xl space-y-5">
        <div class="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-purple-500">DIP-14 Dual In-line Package</span>
            <h3 class="text-base sm:text-lg font-black text-zinc-900 dark:text-white">${activeChip.name}</h3>
          </div>
          <span class="text-xs font-mono text-zinc-400">Click any pin to inspect</span>
        </div>

        <!-- Interactive 14-Pin DIP Visualizer -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          <!-- DIP-14 Graphic -->
          <div class="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex justify-center">
            <div class="relative w-52 py-6 px-4 bg-zinc-900 border-2 border-zinc-700 rounded-xl shadow-2xl flex flex-col justify-between">
              
              <!-- Chip Notch -->
              <div class="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-3 bg-zinc-950 rounded-b-full border-b border-zinc-700"></div>
              <div class="text-center font-mono font-black text-xs text-zinc-400 pb-4 pt-1">${c} DIP-14</div>

              <div class="flex justify-between items-stretch">
                <!-- Left Pins (1 to 7) -->
                <div class="space-y-2">
                  ${activeChip.pins.slice(0, 7).map(p => `
                    <button 
                      onclick="selectLogicPin(${p.num})"
                      class="flex items-center gap-2 p-1 rounded transition-all ${pin === p.num ? 'text-purple-400 font-black' : 'text-zinc-400 hover:text-white'}"
                    >
                      <span class="w-4 h-2 bg-zinc-500 rounded-sm"></span>
                      <span class="text-xs font-mono">${p.num}: ${p.name}</span>
                    </button>
                  `).join('')}
                </div>

                <!-- Right Pins (14 down to 8) -->
                <div class="space-y-2 text-right">
                  ${activeChip.pins.slice(7).reverse().map(p => `
                    <button 
                      onclick="selectLogicPin(${p.num})"
                      class="flex items-center justify-end gap-2 p-1 rounded transition-all ${pin === p.num ? 'text-purple-400 font-black' : 'text-zinc-400 hover:text-white'}"
                    >
                      <span class="text-xs font-mono">${p.name} :${p.num}</span>
                      <span class="w-4 h-2 bg-zinc-500 rounded-sm"></span>
                    </button>
                  `).join('')}
                </div>
              </div>

            </div>
          </div>

          <!-- Pin Detail Card -->
          <div class="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-xl bg-purple-600 text-white font-mono font-black flex items-center justify-center text-sm">
                ${activePinInfo.num}
              </div>
              <div>
                <h4 class="font-extrabold text-sm text-zinc-900 dark:text-white">Pin ${activePinInfo.num} - ${activePinInfo.name}</h4>
                <span class="text-[11px] text-purple-600 dark:text-purple-400 font-bold">${activeChip.name}</span>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-700 dark:text-zinc-300">
              <span class="font-bold">Function:</span> ${activePinInfo.desc}
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs font-mono">
              <div class="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700">
                <div class="text-[10px] text-zinc-400">Voltage Rating</div>
                <div class="font-bold text-emerald-500">4.75V to 5.25V</div>
              </div>
              <div class="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700">
                <div class="text-[10px] text-zinc-400">Propagation Delay</div>
                <div class="font-bold text-cyan-500">~ 9 ns (typ)</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
}

// ----------------------------------------------------
// MAIN ROUTER FOR LOGIC CIRCUITS WORKBENCH
// ----------------------------------------------------
function renderLogicWorkbench() {
  const arena = document.getElementById('activeStudyArena');
  if (!arena) return;

  arena.innerHTML = `
    <div class="space-y-6 max-w-4xl mx-auto">
      
      <!-- Top Navigation & Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <button onclick="showSubjectModesMenu()" class="text-xs font-bold text-zinc-500 hover:text-emerald-500 flex items-center gap-1.5 transition-colors self-start">
          <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Modes
        </button>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
            <i data-lucide="binary" class="w-3.5 h-3.5"></i> Logic Circuits Workbench
          </span>
        </div>
      </div>

      <!-- Workbench Sub-Tabs -->
      <div class="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold">
        <button 
          onclick="setLogicTab('gates')" 
          class="py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${logicWbState.tab === 'gates' ? 'bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}"
        >
          <i data-lucide="cpu" class="w-4 h-4"></i>
          <span class="hidden sm:inline">1. Logic Gates Lab</span>
          <span class="sm:hidden">Gates Lab</span>
        </button>
        <button 
          onclick="setLogicTab('simplifier')" 
          class="py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${logicWbState.tab === 'simplifier' ? 'bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}"
        >
          <i data-lucide="git-merge" class="w-4 h-4"></i>
          <span class="hidden sm:inline">2. Circuit Simplifier</span>
          <span class="sm:hidden">Simplifier</span>
        </button>
        <button 
          onclick="setLogicTab('pinout')" 
          class="py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${logicWbState.tab === 'pinout' ? 'bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}"
        >
          <i data-lucide="circuit-board" class="w-4 h-4"></i>
          <span class="hidden sm:inline">3. 7400 IC Pinouts</span>
          <span class="sm:hidden">7400 ICs</span>
        </button>
      </div>

      ${logicWbState.tab === 'gates' ? renderLogicGatesLabContent() : ''}
      ${logicWbState.tab === 'simplifier' ? renderLogicSimplifierLabContent() : ''}
      ${logicWbState.tab === 'pinout' ? renderLogicPinoutContent() : ''}

    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

window.setLogicTab = setLogicTab;
window.setLogicGate = setLogicGate;
window.setLogicDiagramMode = setLogicDiagramMode;
window.toggleLogicInput = toggleLogicInput;
window.setLogicSimpCircuit = setLogicSimpCircuit;
window.toggleLogicSimInput = toggleLogicSimInput;
window.setLogicChip = setLogicChip;
window.selectLogicPin = selectLogicPin;
