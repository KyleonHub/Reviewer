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
  { id: 'subj-fmss', name: "Mixed Signals", isSpecial: true }
];

const TEMPLATE_SUBJECT_IDS = ['subj-os', 'subj-fb', 'subj-cpe'];

function getActiveSubjectData() {
  if (!currentSubject) return window.RLW_SUBJECT;
  if (currentSubject.id === 'subj-fmss') {
    return window.FMSS_SUBJECT || window.RLW_SUBJECT;
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

  const isFmss = currentSubject && currentSubject.id === 'subj-fmss';
  const subjData = getActiveSubjectData();
  const qCount = (subjData && subjData.questions) ? subjData.questions.length : 0;
  const fcCount = (subjData && subjData.flashcards) ? subjData.flashcards.length : 0;

  let cardsHtml = '';

  if (isFmss) {
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
          <i data-lucide="${s.id === 'subj-rlw' ? 'award' : (s.id === 'subj-fmss' ? 'cpu' : 'folder')}" class="w-5 h-5"></i>
        </div>
        <span class="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 break-words leading-snug">
          ${escapeHtml(s.name)}
        </span>
      </div>

      <div class="flex items-center gap-1 shrink-0">
        ${(s.id !== 'subj-rlw' && s.id !== 'subj-fmss') ? `
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
          ${isFlipped ? 'Rate your recall below' : (card.hint ? `Pahiwatig: ${card.hint}` : 'Tap card to view answer')}
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
              ${selectedOption === q.correctIndex ? 'Tama!' : 'Mali.'}
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
              ${selectedOption === q.answer ? 'Tama!' : `Mali. Ang tamang sagot ay ${q.answer ? 'TRUE' : 'FALSE'}.`}
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
            <span class="text-xs font-bold uppercase tracking-wider text-brand-500">Identification / Tukuyin</span>
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
              placeholder="I-type ang iyong sagot dito..." 
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
          <span>${q.hint ? `Pahiwatig: ${q.hint}` : ''}</span>
          ${!isAnswered ? `
            <button onclick="revealIdAnswer()" class="text-brand-500 hover:underline font-semibold py-1">
              Hindi alam? Ipakita ang sagot
            </button>
          ` : ''}
        </div>

        ${isAnswered ? `
          <div class="p-4 rounded-2xl border text-xs space-y-1 ${
            selectedOption === 'correct' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200' : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200'
          }">
            <span class="font-bold">${selectedOption === 'correct' ? 'Tama! Magaling.' : 'Mali.'}</span>
            <div>Tamang Sagot: <span class="font-black text-sm">${q.answer}</span></div>
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
          <h2 class="text-lg sm:text-xl font-black text-zinc-900 dark:text-white">Pagkabitin ang mga Konsepto at Kahulugan</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Column A (Terms) -->
          <div class="space-y-2.5">
            <span class="text-xs font-bold text-zinc-400 uppercase">Column A: Konsepto / Pangalan</span>
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
            <span class="text-xs font-bold text-zinc-400 uppercase">Column B: Kahulugan</span>
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
            <h3 class="text-xl font-black text-emerald-600">Lahat ay matagumpay na naipagkabit!</h3>
            <button onclick="startMatchingMode()" class="px-6 py-3 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-md">
              Maglaro Muli
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
            <span class="text-xs font-bold text-zinc-400">Naipagkabit: ${matchedCount} / ${totalPairs}</span>
          </div>
          <h2 class="text-base sm:text-lg font-black text-zinc-900 dark:text-white mt-1">
            ${q.title || 'Pagkabitin ang bawat konsepto sa tamang kahulugan'}
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <!-- Column A: Terms -->
          <div class="space-y-2">
            <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Column A: Konsepto</span>
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
            <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Column B: Kahulugan</span>
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
            Matagumpay na naipagkabit ang lahat ng pares!
          </div>
          <div class="flex justify-end pt-1 sm:pt-2">
            <button onclick="advanceRndMatch()" class="min-h-[44px] px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm active:scale-95">
              <span>${currentIndex + 1 === activeItems.length ? 'View Final Score' : 'Next Question'}</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>
        ` : `
          <div class="flex justify-between items-center pt-2">
            <span class="text-xs text-zinc-400">Piliin ang konsepto sa Column A at itugma sa Column B</span>
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
// INTERACTIVE WORKBENCH (FOR MIXED SIGNALS & SENSORS)
// =========================================================================

let wbState = {
  tab: 'circuit', // 'circuit', 'pinout', 'sensor'
  circuitType: 'inverting', // 'inverting', 'nonInverting', 'buffer', 'comparator'
  rf: 100, // kOhms
  rin: 10, // kOhms
  vin: 1.0, // V
  vcc: 15.0, // V
  acMode: true,
  selectedPin: 2,
  sensorType: 'ultrasonic', // 'ultrasonic', 'temp', 'strain', 'flame'
  sensorStimulus: 0.005 // 5ms echo, etc.
};
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
  if (type === 'buffer') {
    wbState.rf = 0;
    wbState.rin = 10;
  } else if (type === 'inverting') {
    wbState.rf = 100;
    wbState.rin = 10;
  } else if (type === 'nonInverting') {
    wbState.rf = 90;
    wbState.rin = 10;
  } else if (type === 'comparator') {
    wbState.rf = 0;
    wbState.rin = 10;
  }
  renderInteractiveWorkbench();
}

function updateWbParam(param, value) {
  wbState[param] = parseFloat(value);
  renderInteractiveWorkbench(true); // partial redraw
}

function selectWbPin(pinNum) {
  sounds.playFlip();
  wbState.selectedPin = pinNum;
  renderInteractiveWorkbench(true);
}

function selectWbSensor(sensorType) {
  sounds.playFlip();
  wbState.sensorType = sensorType;
  if (sensorType === 'ultrasonic') wbState.sensorStimulus = 0.004;
  else if (sensorType === 'temp') wbState.sensorStimulus = 35.0;
  else if (sensorType === 'strain') wbState.sensorStimulus = 25.0;
  else if (sensorType === 'flame') wbState.sensorStimulus = 900;
  renderInteractiveWorkbench(true);
}

function renderInteractiveWorkbench(keepScroll = false) {
  const arena = document.getElementById('activeStudyArena');
  if (!arena) return;

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
          <i data-lucide="activity" class="w-4 h-4"></i>
          <span class="hidden sm:inline">1. Op-Amp Circuit Lab</span>
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
          <span class="hidden sm:inline">3. Sensor Chain</span>
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
// TAB 1: OP-AMP CIRCUIT LAB
// ----------------------------------------------------
function renderCircuitLabContent(Av, theoreticalVout, actualVout, Vsat, isSaturated, phaseDeg) {
  return `
    <div class="space-y-6">
      <!-- Circuit Type Selector Buttons -->
      <div class="flex flex-wrap gap-2">
        <button 
          onclick="setWbCircuit('inverting')" 
          class="px-3.5 py-2 rounded-xl text-xs font-extrabold border transition-all ${wbState.circuitType === 'inverting' ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 ring-2 ring-cyan-500/20' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-cyan-500'}"
        >
          Inverting Amplifier
        </button>
        <button 
          onclick="setWbCircuit('nonInverting')" 
          class="px-3.5 py-2 rounded-xl text-xs font-extrabold border transition-all ${wbState.circuitType === 'nonInverting' ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 ring-2 ring-cyan-500/20' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-cyan-500'}"
        >
          Non-Inverting Amplifier
        </button>
        <button 
          onclick="setWbCircuit('buffer')" 
          class="px-3.5 py-2 rounded-xl text-xs font-extrabold border transition-all ${wbState.circuitType === 'buffer' ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 ring-2 ring-cyan-500/20' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-cyan-500'}"
        >
          Voltage Follower (Buffer)
        </button>
        <button 
          onclick="setWbCircuit('comparator')" 
          class="px-3.5 py-2 rounded-xl text-xs font-extrabold border transition-all ${wbState.circuitType === 'comparator' ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-300 ring-2 ring-cyan-500/20' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-cyan-500'}"
        >
          Voltage Comparator
        </button>
      </div>

      <!-- Live Calculation Card -->
      <div class="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-xl space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-cyan-500">Live Mathematical Transfer</span>
            <h3 class="text-base font-black text-zinc-900 dark:text-white">
              ${wbState.circuitType === 'inverting' ? 'Inverting Configuration (180° Inverted)' : (wbState.circuitType === 'nonInverting' ? 'Non-Inverting Configuration (In-Phase)' : (wbState.circuitType === 'buffer' ? 'Unity-Gain Buffer (Av = 1)' : 'Open-Loop Comparator'))}
            </h3>
          </div>
          <div class="flex items-center gap-2">
            ${isSaturated ? `
              <span class="px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-extrabold border border-rose-500/30 flex items-center gap-1">
                <i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i> Saturated (Clipped)
              </span>
            ` : `
              <span class="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold border border-emerald-500/30 flex items-center gap-1">
                <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Linear Operation
              </span>
            `}
          </div>
        </div>

        <!-- Metrics Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800">
            <span class="text-[11px] font-bold text-zinc-400 uppercase">Closed-Loop Gain (Av)</span>
            <div class="text-lg sm:text-xl font-black text-cyan-600 dark:text-cyan-400">
              ${wbState.circuitType === 'comparator' ? 'Avol ≈ ∞' : Av.toFixed(2)}
            </div>
            <span class="text-[10px] text-zinc-400">${wbState.circuitType === 'inverting' ? '-Rf / Rin' : (wbState.circuitType === 'nonInverting' ? '1 + (Rf / Rin)' : 'Av = 1')}</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800">
            <span class="text-[11px] font-bold text-zinc-400 uppercase">Input Voltage (Vin)</span>
            <div class="text-lg sm:text-xl font-black text-zinc-900 dark:text-white">
              ${wbState.vin >= 0 ? '+' : ''}${wbState.vin.toFixed(2)} V
            </div>
            <span class="text-[10px] text-zinc-400">Peak Amplitude</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800">
            <span class="text-[11px] font-bold text-zinc-400 uppercase">Output (Vout)</span>
            <div class="text-lg sm:text-xl font-black ${isSaturated ? 'text-rose-500' : 'text-emerald-500'}">
              ${actualVout >= 0 ? '+' : ''}${actualVout.toFixed(2)} V
            </div>
            <span class="text-[10px] text-zinc-400">${isSaturated ? `Clamped to ±${Vsat.toFixed(1)}V` : 'Av × Vin'}</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800">
            <span class="text-[11px] font-bold text-zinc-400 uppercase">Virtual Ground</span>
            <div class="text-lg sm:text-xl font-black text-purple-500">
              ${wbState.circuitType === 'inverting' ? '0.00 V (V- ≈ V+)' : `${wbState.vin.toFixed(2)} V (V- = V+)`}
            </div>
            <span class="text-[10px] text-zinc-400">Virtual Short Principle</span>
          </div>
        </div>

        <!-- Interactive Sliders Panel -->
        <div class="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- Rf Slider -->
          ${wbState.circuitType !== 'buffer' && wbState.circuitType !== 'comparator' ? `
            <div class="space-y-1.5">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-zinc-500">Feedback Resistor (Rf)</span>
                <span class="text-cyan-600 dark:text-cyan-400">${wbState.rf} kΩ</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="300" 
                step="5" 
                value="${wbState.rf}" 
                oninput="updateWbParam('rf', this.value)"
                class="w-full accent-cyan-500 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
              />
            </div>
          ` : ''}

          <!-- Rin Slider -->
          ${wbState.circuitType !== 'buffer' && wbState.circuitType !== 'comparator' ? `
            <div class="space-y-1.5">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-zinc-500">Input Resistor (Rin / R1)</span>
                <span class="text-cyan-600 dark:text-cyan-400">${wbState.rin} kΩ</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                step="1" 
                value="${wbState.rin}" 
                oninput="updateWbParam('rin', this.value)"
                class="w-full accent-cyan-500 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
              />
            </div>
          ` : ''}

          <!-- Vin Slider -->
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-bold">
              <span class="text-zinc-500">Input Amplitude (Vin)</span>
              <span class="text-cyan-600 dark:text-cyan-400">${wbState.vin.toFixed(2)} V</span>
            </div>
            <input 
              type="range" 
              min="-5.0" 
              max="5.0" 
              step="0.1" 
              value="${wbState.vin}" 
              oninput="updateWbParam('vin', this.value)"
              class="w-full accent-cyan-500 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
            />
          </div>

          <!-- Dual Supply Rails -->
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-bold">
              <span class="text-zinc-500">Supply Rails (±Vcc)</span>
              <span class="text-cyan-600 dark:text-cyan-400">±${wbState.vcc} V</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="22" 
              step="1" 
              value="${wbState.vcc}" 
              oninput="updateWbParam('vcc', this.value)"
              class="w-full accent-cyan-500 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
            />
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
              <span class="w-2.5 h-1 bg-sky-400 rounded-full inline-block"></span> CH1: Vin
            </span>
            <span class="flex items-center gap-1.5 ${isSaturated ? 'text-rose-400' : 'text-emerald-400'}">
              <span class="w-2.5 h-1 ${isSaturated ? 'bg-rose-400' : 'bg-emerald-400'} rounded-full inline-block"></span> CH2: Vout ${isSaturated ? '(Clipped)' : ''}
            </span>
          </div>
        </div>

        <div class="relative w-full rounded-2xl overflow-hidden border border-zinc-800 bg-[#0a0f18]">
          <canvas id="oscCanvas" width="800" height="240" class="w-full h-48 sm:h-56 block"></canvas>
        </div>
        <div class="flex justify-between text-[11px] text-zinc-400 px-1 font-mono">
          <span>Scale: 5V / Division | Time base: 1ms / Div</span>
          <span>Rails Saturation: ±${Vsat.toFixed(1)}V</span>
        </div>
      </div>

    </div>
  `;
}

// ----------------------------------------------------
// TAB 2: 741 IC PINOUT EXPLORER
// ----------------------------------------------------
function renderPinoutContent() {
  const pinDetails = [
    { pin: 1, name: "Offset Null", desc: "Ginagamit kasama ng 10k potentiometer patungo sa Pin 4 (-Vee) upang i-zero out ang DC input offset voltage na dulot ng transistor mismatch." },
    { pin: 2, name: "Inverting Input (V-)", desc: "Ang differential inverting input terminal. Ang signal na papasok dito ay pinalalakas at may 180° phase inversion sa output." },
    { pin: 3, name: "Non-Inverting Input (V+)", desc: "Ang differential non-inverting input terminal. Ang signal na papasok dito ay lumalabas na in-phase (0° phase shift) sa output." },
    { pin: 4, name: "-Vee (Negative Supply Rail)", desc: "Negatibong power supply voltage terminal. Karaniwang ikinakabit sa -15V o -12V DC (o sa Ground sa single-supply mode). Maximum: -22V." },
    { pin: 5, name: "Offset Null", desc: "Pangalawang offset null terminal na kapareha ng Pin 1 para sa pagsasaayos ng DC balance gamit ang potentiometer wiper." },
    { pin: 6, name: "Output Terminal (Vout)", desc: "Ang solong output terminal ng op-amp. May napakababang output impedance (~75 Ω open loop) at may proteksyon laban sa continuous short circuit." },
    { pin: 7, name: "+Vcc (Positive Supply Rail)", desc: "Positibong power supply voltage terminal. Karaniwang ikinakabit sa +15V o +12V DC. Maximum: +22V." },
    { pin: 8, name: "NC (No Connection)", desc: "Hindi nakakonekta sa anumang internal circuit ng silicon die. Dapat iwang bukas (floating)." }
  ];

  const sel = pinDetails.find(p => p.pin === wbState.selectedPin) || pinDetails[1];

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      
      <!-- Visual DIP-8 Chip Package -->
      <div class="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xl flex flex-col items-center">
        <span class="text-xs font-bold uppercase tracking-wider text-cyan-500 mb-4">LM741 DIP-8 Package (Tap Pin to Inspect)</span>
        
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
          <h4 class="font-bold text-zinc-400 uppercase tracking-wider">741 Maximum Operating Limits</h4>
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
              <span>Internal Power Dissipation (Pd): Max <strong>500 mW</strong> sa 25°C</span>
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
// TAB 3: SENSOR-TO-ADC SIGNAL CHAIN
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
          <span class="text-xs font-bold text-cyan-700 dark:text-cyan-300">Kinalkulang Distansya mula sa Echo</span>
          <div class="text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono">${distCm.toFixed(1)} cm</div>
          <p class="text-[11px] text-zinc-500">Pormula: d = (v × t) / 2 = (340 m/s × ${(wbState.sensorStimulus * 1000).toFixed(1)}ms) / 2</p>
        </div>
      </div>
    `;
  } else if (wbState.sensorType === 'temp') {
    const rawMv = wbState.sensorStimulus * 10; // 10mV/°C
    const amplifiedV = (rawMv * 10) / 1000; // Gain of 10
    sensorDetailsHtml = `
      <div class="space-y-4">
        <div class="flex justify-between items-center text-xs font-bold">
          <span class="text-zinc-500">Temperatura ng Kapaligiran</span>
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
            <span class="text-[10px] font-bold text-zinc-400">Amplifier Output (Gain ×10)</span>
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
          <span class="text-zinc-500">Puersa / Timbang (Force Load)</span>
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
            <span class="text-[10px] font-bold text-zinc-400">Bridge Output (Wheatstone)</span>
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
          <span class="text-zinc-500">Optical Wavelength</span>
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
            <span>${isFlameDetected ? 'APOY NADE-TECT! (760–1100 nm Detected)' : 'Ligtas / Walang Apoy (Normal Spectrum)'}</span>
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
// OSCILLOSCOPE ANIMATION LOOP
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
window.updateWbParam = updateWbParam;
window.selectWbPin = selectWbPin;
window.selectWbSensor = selectWbSensor;

