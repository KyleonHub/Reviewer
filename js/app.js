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
  { id: 'subj-os', name: 'Operating Systems' },
  { id: 'subj-fb', name: 'Feedback & Control Systems' },
  { id: 'subj-fmss', name: 'Mixed Signals & Sensors' },
  { id: 'subj-cpe', name: 'Data & Digital Communication' }
];

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
    subjects = raw ? JSON.parse(raw) : [...DEFAULT_SUBJECTS];
  } catch (e) {
    subjects = [...DEFAULT_SUBJECTS];
  }
  renderMainMenuView();
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
  document.getElementById('modesChooserView').classList.remove('hidden');
  document.getElementById('activeStudyArena').classList.add('hidden');
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
          <i data-lucide="${s.id === 'subj-rlw' ? 'award' : 'folder'}" class="w-5 h-5"></i>
        </div>
        <span class="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 break-words leading-snug">
          ${escapeHtml(s.name)}
        </span>
      </div>

      <div class="flex items-center gap-1 shrink-0">
        ${s.id !== 'subj-rlw' ? `
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
  document.getElementById('modesChooserView').classList.add('hidden');
  document.getElementById('activeStudyArena').classList.remove('hidden');

  const rlw = window.RLW_SUBJECT;
  score = 0;
  currentIndex = 0;
  isAnswered = false;
  isFlipped = false;
  selectedOption = null;

  if (modeName === 'flashcards') {
    activeItems = [...(rlw.flashcards || [])];
    if (randomize) activeItems.sort(() => Math.random() - 0.5);
    renderFlashcard();
  } else {
    // Randomizer Quiz: full randomized pool of all lesson questions
    currentMode = 'randomizer';
    const rawQuestions = rlw.questions || [];
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
        <span class="text-xs text-zinc-400">Rizal's Life and Works</span>
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
