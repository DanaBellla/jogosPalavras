const MAX_GUESSES = 6;
const STORAGE_KEY = 'dana_words_save_v1';

const app = {
  mode: 'daily',
  theme: 'animais',
  level: 'medium',
  hardMode: false,
  arcadeMode: false,
  secretWord: '',
  currentGuess: '',
  guesses: [],
  keyboardState: {},
  score: 0,
  streak: 0,
  timer: 45,
  gameOver: false,
  timerId: null,
};

const WORD_BANK = {
  animais: {
    easy: ['gato', 'urso', 'pato', 'lobo', 'zebra', 'panda'],
    medium: ['tigre', 'cobra', 'coala', 'sagui', 'guara', 'zebra'],
    hard: ['baleia', 'coruja', 'sucuri', 'tucano', 'onagro', 'paviao'],
    expert: ['elefante', 'tartaruga', 'macaco', 'flamingo', 'narval', 'hipopotamo']
  },
  frutas: {
    easy: ['maca', 'pera', 'uva', 'kiwi', 'manga', 'caju'],
    medium: ['banana', 'laranja', 'abacate', 'morango', 'melancia', 'coco'],
    hard: ['damasco', 'pitaya', 'acerola', 'cambuci', 'maracuja', 'abacaxi'],
    expert: ['cambuquira', 'cupuacu', 'graviola', 'carambola', 'jabuticaba', 'pitaya']
  },
  tecnologia: {
    easy: ['wifi', 'site', 'chip', 'tela', 'mouse', 'byte'],
    medium: ['robot', 'cursor', 'celular', 'teclado', 'notebook', 'sistema'],
    hard: ['codigo', 'servidor', 'nuvem', 'processador', 'browser', 'filtro'],
    expert: ['microchip', 'inteligencia', 'desenvolvedor', 'linguagem', 'computador', 'tecnologia']
  },
  esportes: {
    easy: ['bola', 'rede', 'gol', 'pulo', 'time', 'rio'],
    medium: ['tenis', 'atleta', 'corrida', 'ciclismo', 'vitoria', 'futebol'],
    hard: ['basquete', 'natacao', 'handebol', 'maratona', 'esgrima', 'atletismo'],
    expert: ['campeonato', 'triathlon', 'voleibol', 'ginastica', 'esgrima', 'pentatlo']
  }
};

const boardEl = document.getElementById('board');
const keyboardEl = document.getElementById('keyboard');
const statusEl = document.getElementById('status');
const scoreValue = document.getElementById('scoreValue');
const streakValue = document.getElementById('streakValue');
const timerValue = document.getElementById('timerValue');
const hardToggle = document.getElementById('hardMode');
const arcadeToggle = document.getElementById('arcadeMode');
const newGameBtn = document.getElementById('newGame');
const modeButtons = [...document.querySelectorAll('[data-mode]')];
const themeButtons = [...document.querySelectorAll('[data-theme]')];
const levelButtons = [...document.querySelectorAll('[data-level]')];

function normalizeWord(word) {
  return String(word || '').trim().toLowerCase().replace(/\s+/g, '');
}

function getWordLength(level) {
  const lengths = { easy: 5, medium: 5, hard: 6, expert: 6 };
  return lengths[level] || 5;
}

function getAvailableWords() {
  const pool = WORD_BANK[app.theme]?.[app.level] || WORD_BANK.animais.medium;
  return pool
    .map(normalizeWord)
    .filter((word) => word.length === getWordLength(app.level));
}

function getTodaySeed() {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

function chooseSecretWord() {
  const pool = getAvailableWords();
  if (!pool.length) return 'panda';

  if (app.mode === 'daily') {
    const salt = `${getTodaySeed()}-${app.theme}-${app.level}`;
    let hash = 0;
    for (let i = 0; i < salt.length; i += 1) {
      hash = (hash * 31 + salt.charCodeAt(i)) >>> 0;
    }
    return pool[hash % pool.length];
  }

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle('error', isError);
}

function saveState() {
  const payload = {
    mode: app.mode,
    theme: app.theme,
    level: app.level,
    hardMode: app.hardMode,
    arcadeMode: app.arcadeMode,
    secretWord: app.secretWord,
    currentGuess: app.currentGuess,
    guesses: app.guesses,
    keyboardState: app.keyboardState,
    score: app.score,
    streak: app.streak,
    timer: app.timer,
    gameOver: app.gameOver,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const saved = JSON.parse(raw);
    app.mode = saved.mode || app.mode;
    app.theme = saved.theme || app.theme;
    app.level = saved.level || app.level;
    app.hardMode = !!saved.hardMode;
    app.arcadeMode = !!saved.arcadeMode;
    app.secretWord = saved.secretWord || '';
    app.currentGuess = saved.currentGuess || '';
    app.guesses = Array.isArray(saved.guesses) ? saved.guesses : [];
    app.keyboardState = saved.keyboardState || {};
    app.score = saved.score || 0;
    app.streak = saved.streak || 0;
    app.timer = saved.timer || 45;
    app.gameOver = !!saved.gameOver;
  } catch (error) {
    console.warn('Estado salvo inválido.', error);
  }
}

function updateStats() {
  scoreValue.textContent = String(app.score);
  streakValue.textContent = String(app.streak);
  timerValue.textContent = app.arcadeMode ? String(app.timer) : '--';
}

function updateButtons() {
  modeButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === app.mode);
  });

  themeButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.theme === app.theme);
  });

  levelButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.level === app.level);
  });

  hardToggle.checked = app.hardMode;
  arcadeToggle.checked = app.arcadeMode;
  updateStats();
}

function clearTimer() {
  if (app.timerId) {
    clearInterval(app.timerId);
    app.timerId = null;
  }
}

function startTimer() {
  clearTimer();

  if (!app.arcadeMode) {
    app.timer = 45;
    timerValue.textContent = '--';
    return;
  }

  app.timer = 45;
  timerValue.textContent = String(app.timer);

  app.timerId = setInterval(() => {
    if (app.gameOver) {
      clearTimer();
      return;
    }

    app.timer -= 1;
    timerValue.textContent = String(app.timer);

    if (app.timer <= 0) {
      clearTimer();
      finishGame(false, `Tempo acabou! A palavra era ${app.secretWord.toUpperCase()}.`);
    }
  }, 1000);
}

function getFeedbackForWord(guess) {
  const result = Array(guess.length).fill('absent');
  const secretChars = app.secretWord.split('');
  const guessChars = guess.split('');

  for (let i = 0; i < guessChars.length; i += 1) {
    if (guessChars[i] === secretChars[i]) {
      result[i] = 'correct';
      secretChars[i] = null;
    }
  }

  for (let i = 0; i < guessChars.length; i += 1) {
    if (result[i] === 'correct') continue;
    const index = secretChars.indexOf(guessChars[i]);
    if (index !== -1) {
      result[i] = 'present';
      secretChars[index] = null;
    }
  }

  return result;
}

function getTileState(rowIndex, colIndex) {
  const guess = app.guesses[rowIndex];
  if (!guess) return '';
  return getFeedbackForWord(guess)[colIndex];
}

function renderBoard() {
  const cols = getWordLength(app.level);
  boardEl.innerHTML = '';

  for (let row = 0; row < MAX_GUESSES; row += 1) {
    const rowEl = document.createElement('div');
    rowEl.className = 'row';
    rowEl.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;

    const guess = row < app.guesses.length ? app.guesses[row] : row === app.guesses.length ? app.currentGuess : '';

    for (let col = 0; col < cols; col += 1) {
      const tile = document.createElement('div');
      tile.className = 'tile';

      if (guess[col]) {
        tile.textContent = guess[col].toUpperCase();
        tile.classList.add('filled');
      }

      if (row < app.guesses.length) {
        const state = getTileState(row, col);
        if (state) tile.classList.add(state);
      }

      rowEl.appendChild(tile);
    }

    boardEl.appendChild(rowEl);
  }
}

function renderKeyboard() {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'],
  ];

  keyboardEl.innerHTML = '';

  rows.forEach((rowLetters) => {
    const rowEl = document.createElement('div');
    rowEl.className = 'key-row';

    rowLetters.forEach((key) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'key';
      button.textContent = key;
      button.dataset.key = key;

      if (key === 'ENTER' || key === 'DELETE') button.classList.add('wide');

      const normalizedKey = key.toLowerCase();
      const state = app.keyboardState[normalizedKey] || '';
      if (state) button.classList.add(state);

      button.addEventListener('click', () => handleKeyInput(key));
      rowEl.appendChild(button);
    });

    keyboardEl.appendChild(rowEl);
  });
}

function updateKeyboardState(guess) {
  const feedback = getFeedbackForWord(guess);
  const chars = guess.split('');

  chars.forEach((letter, index) => {
    const state = feedback[index];
    const current = app.keyboardState[letter] || 'absent';
    const priority = { absent: 0, present: 1, correct: 2 };
    if (priority[state] > priority[current]) {
      app.keyboardState[letter] = state;
    }
  });
}

function isHardModeValid(guess) {
  if (!app.hardMode) return true;

  for (const previousGuess of app.guesses) {
    const feedback = getFeedbackForWord(previousGuess);

    for (let index = 0; index < previousGuess.length; index += 1) {
      if (feedback[index] === 'correct' && guess[index] !== previousGuess[index]) {
        return false;
      }

      if (feedback[index] === 'present' && !guess.includes(previousGuess[index])) {
        return false;
      }
    }
  }

  return true;
}

function finishGame(won, message) {
  app.gameOver = true;
  clearTimer();

  if (won) {
    app.streak += 1;
    const points = 100 + (MAX_GUESSES - app.guesses.length) * 25 + (app.arcadeMode ? app.timer * 3 : 0);
    app.score += points;
  } else {
    app.streak = 0;
  }

  setStatus(message, false);
  renderBoard();
  renderKeyboard();
  updateStats();
  saveState();
}

function submitGuess() {
  const guess = normalizeWord(app.currentGuess);
  const expectedLength = getWordLength(app.level);

  if (!guess) {
    setStatus('Digite uma palavra antes de enviar.', true);
    return;
  }

  if (guess.length !== expectedLength) {
    setStatus(`A palavra precisa ter ${expectedLength} letras.`, true);
    return;
  }

  const validWords = getAvailableWords();
  if (!validWords.includes(guess)) {
    setStatus('Essa palavra não está na lista do tema atual.', true);
    return;
  }

  if (!isHardModeValid(guess)) {
    setStatus('Modo difícil: mantenha as letras já reveladas.', true);
    return;
  }

  app.guesses.push(guess);
  updateKeyboardState(guess);

  if (guess === app.secretWord) {
    finishGame(true, `Você acertou! A palavra era ${app.secretWord.toUpperCase()}.`);
    app.currentGuess = '';
    renderBoard();
    renderKeyboard();
    return;
  }

  app.currentGuess = '';

  if (app.guesses.length >= MAX_GUESSES) {
    finishGame(false, `Fim de jogo! A palavra era ${app.secretWord.toUpperCase()}.`);
    return;
  }

  setStatus('Boa tentativa! Tente outra palavra.');
  renderBoard();
  renderKeyboard();
  saveState();
}

function handleKeyInput(key) {
  if (app.gameOver) return;

  if (key === 'ENTER') {
    submitGuess();
    return;
  }

  if (key === 'DELETE') {
    app.currentGuess = app.currentGuess.slice(0, -1);
    setStatus('Digite uma palavra válida.');
    renderBoard();
    saveState();
    return;
  }

  const normalized = String(key).toLowerCase();
  if (!/^[a-z]$/.test(normalized)) return;
  if (app.currentGuess.length >= getWordLength(app.level)) return;

  app.currentGuess += normalized;
  setStatus('Tentativa em andamento...');
  renderBoard();
  saveState();
}

function buildNewGame() {
  clearTimer();
  app.secretWord = chooseSecretWord();
  app.currentGuess = '';
  app.guesses = [];
  app.keyboardState = {};
  app.gameOver = false;
  setStatus('Nova partida iniciada. Boa sorte!');
  renderBoard();
  renderKeyboard();
  startTimer();
  updateStats();
  saveState();
}

function bindEvents() {
  modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      app.mode = button.dataset.mode;
      updateButtons();
      buildNewGame();
    });
  });

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      app.theme = button.dataset.theme;
      updateButtons();
      buildNewGame();
    });
  });

  levelButtons.forEach((button) => {
    button.addEventListener('click', () => {
      app.level = button.dataset.level;
      updateButtons();
      buildNewGame();
    });
  });

  hardToggle.addEventListener('change', () => {
    app.hardMode = hardToggle.checked;
    updateButtons();
    buildNewGame();
  });

  arcadeToggle.addEventListener('change', () => {
    app.arcadeMode = arcadeToggle.checked;
    updateButtons();
    buildNewGame();
  });

  newGameBtn.addEventListener('click', () => {
    updateButtons();
    buildNewGame();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleKeyInput('ENTER');
    } else if (event.key === 'Backspace') {
      handleKeyInput('DELETE');
    } else if (/^[a-zA-Z]$/.test(event.key)) {
      handleKeyInput(event.key.toUpperCase());
    }
  });
}

function init() {
  loadState();
  updateButtons();
  bindEvents();

  if (!app.secretWord) {
    buildNewGame();
  } else {
    setStatus('Partida carregada. Continue de onde parou.');
    renderBoard();
    renderKeyboard();
    startTimer();
    updateStats();
  }
}

init();
