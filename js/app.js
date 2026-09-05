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
          ${isFlipped ? 'Rate your recall below' : (card.hint ? ((currentSubject && currentSubject.id === 'subj-fmss') ? `Hint: ${card.hint}` : `Pahiwatig: ${card.hint}`) : ((currentSubject && currentSubject.id === 'subj-fmss') ? 'Tap card to view answer' : 'Tap card to view answer'))}
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
              ${selectedOption === q.correctIndex ? ((currentSubject && currentSubject.id === 'subj-fmss') ? 'Correct!' : 'Tama!') : ((currentSubject && currentSubject.id === 'subj-fmss') ? 'Incorrect.' : 'Mali.')}
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
              ${selectedOption === q.answer ? ((currentSubject && currentSubject.id === 'subj-fmss') ? 'Correct!' : 'Tama!') : ((currentSubject && currentSubject.id === 'subj-fmss') ? `Incorrect. The correct answer is ${q.answer ? 'TRUE' : 'FALSE'}.` : `Mali. Ang tamang sagot ay ${q.answer ? 'TRUE' : 'FALSE'}.`)}
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
            <span class="text-xs font-bold uppercase tracking-wider text-brand-500">${(currentSubject && currentSubject.id === 'subj-fmss') ? 'Identification' : 'Identification / Tukuyin'}</span>
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
              placeholder="${(currentSubject && currentSubject.id === 'subj-fmss') ? 'Type your answer here...' : 'I-type ang iyong sagot dito...'}" 
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
          <span>${q.hint ? ((currentSubject && currentSubject.id === 'subj-fmss') ? `Hint: ${q.hint}` : `Pahiwatig: ${q.hint}`) : ''}</span>
          ${!isAnswered ? `
            <button onclick="revealIdAnswer()" class="text-brand-500 hover:underline font-semibold py-1">
              ${(currentSubject && currentSubject.id === 'subj-fmss') ? "Don't know? Show answer" : 'Hindi alam? Ipakita ang sagot'}
            </button>
          ` : ''}
        </div>

        ${isAnswered ? `
          <div class="p-4 rounded-2xl border text-xs space-y-1 ${
            selectedOption === 'correct' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200' : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200'
          }">
            <span class="font-bold">${selectedOption === 'correct' ? ((currentSubject && currentSubject.id === 'subj-fmss') ? 'Correct! Well done.' : 'Tama! Magaling.') : ((currentSubject && currentSubject.id === 'subj-fmss') ? 'Incorrect.' : 'Mali.')}</span>
            <div>${(currentSubject && currentSubject.id === 'subj-fmss') ? 'Correct Answer:' : 'Tamang Sagot:'} <span class="font-black text-sm">${q.answer}</span></div>
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
          <h2 class="text-lg sm:text-xl font-black text-zinc-900 dark:text-white">${(currentSubject && currentSubject.id === 'subj-fmss') ? 'Match Concepts and Definitions' : 'Pagkabitin ang mga Konsepto at Kahulugan'}</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Column A (Terms) -->
          <div class="space-y-2.5">
            <span class="text-xs font-bold text-zinc-400 uppercase">${(currentSubject && currentSubject.id === 'subj-fmss') ? 'Column A: Concept / Name' : 'Column A: Konsepto / Pangalan'}</span>
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
            <span class="text-xs font-bold text-zinc-400 uppercase">${(currentSubject && currentSubject.id === 'subj-fmss') ? 'Column B: Definition' : 'Column B: Kahulugan'}</span>
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
            <h3 class="text-xl font-black text-emerald-600">${(currentSubject && currentSubject.id === 'subj-fmss') ? 'All pairs matched successfully!' : 'Lahat ay matagumpay na naipagkabit!'}</h3>
            <button onclick="startMatchingMode()" class="px-6 py-3 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-md">
              ${(currentSubject && currentSubject.id === 'subj-fmss') ? 'Play Again' : 'Maglaro Muli'}
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
            <span class="text-xs font-bold text-zinc-400">${(currentSubject && currentSubject.id === 'subj-fmss') ? 'Matched:' : 'Naipagkabit:'} ${matchedCount} / ${totalPairs}</span>
          </div>
          <h2 class="text-base sm:text-lg font-black text-zinc-900 dark:text-white mt-1">
            ${q.title || ((currentSubject && currentSubject.id === 'subj-fmss') ? 'Match each concept with its correct definition' : 'Pagkabitin ang bawat konsepto sa tamang kahulugan')}
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <!-- Column A: Terms -->
          <div class="space-y-2">
            <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">${(currentSubject && currentSubject.id === 'subj-fmss') ? 'Column A: Concept' : 'Column A: Konsepto'}</span>
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
            <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">${(currentSubject && currentSubject.id === 'subj-fmss') ? 'Column B: Definition' : 'Column B: Kahulugan'}</span>
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
            ${(currentSubject && currentSubject.id === 'subj-fmss') ? 'All pairs matched successfully!' : 'Matagumpay na naipagkabit ang lahat ng pares!'}
          </div>
          <div class="flex justify-end pt-1 sm:pt-2">
            <button onclick="advanceRndMatch()" class="min-h-[44px] px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm active:scale-95">
              <span>${currentIndex + 1 === activeItems.length ? 'View Final Score' : 'Next Question'}</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>
        ` : `
          <div class="flex justify-between items-center pt-2">
            <span class="text-xs text-zinc-400">${(currentSubject && currentSubject.id === 'subj-fmss') ? 'Select concept from Column A and match with Column B' : 'Piliin ang konsepto sa Column A at itugma sa Column B'}</span>
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
