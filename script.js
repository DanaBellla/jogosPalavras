const MAX_GUESSES = 6;
const STORAGE_KEY = 'dana_words_save_v2';

const app = {
  wordLength: 5,
  secretWord: '',
  currentGuess: '',
  cursorIndex: 0,
  guesses: [],
  keyboardState: {},
  score: 0,
  streak: 0,
  gameOver: false,
};

const WORD_BANK = window.DANA_WORD_BANK;

const boardEl = document.getElementById('board');
const keyboardEl = document.getElementById('keyboard');
const statusEl = document.getElementById('status');
const scoreValue = document.getElementById('scoreValue');
const streakValue = document.getElementById('streakValue');
const newGameBtn = document.getElementById('newGame');
const lengthButtons = [...document.querySelectorAll('[data-word-length]')];

function normalizeWord(word) {
  return String(word || '').trim().toLowerCase().replace(/\s+/g, '');
}

function getWordLength() {
  return app.wordLength;
}

function getAvailableWords() {
  return WORD_BANK[app.wordLength]
    .map(normalizeWord)
    .filter((word) => word.length === getWordLength());
}

function chooseSecretWord() {
  const pool = getAvailableWords();
  const alternatives = pool.filter((word) => word !== app.secretWord);
  const choices = alternatives.length ? alternatives : pool;
  return choices[Math.floor(Math.random() * choices.length)];
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle('error', isError);
}

function saveState() {
  const payload = {
    wordLength: app.wordLength,
    secretWord: app.secretWord,
    currentGuess: app.currentGuess,
    cursorIndex: app.cursorIndex,
    guesses: app.guesses,
    keyboardState: app.keyboardState,
    score: app.score,
    streak: app.streak,
    gameOver: app.gameOver,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const saved = JSON.parse(raw);
    app.wordLength = [5, 6].includes(saved.wordLength) ? saved.wordLength : app.wordLength;
    app.secretWord = saved.secretWord || '';
    app.currentGuess = saved.currentGuess || '';
    app.cursorIndex = Number.isInteger(saved.cursorIndex)
      ? Math.min(saved.cursorIndex, app.currentGuess.length)
      : app.currentGuess.length;
    app.guesses = Array.isArray(saved.guesses) ? saved.guesses : [];
    app.keyboardState = saved.keyboardState || {};
    app.score = saved.score || 0;
    app.streak = saved.streak || 0;
    app.gameOver = !!saved.gameOver;
  } catch (error) {
    console.warn('Estado salvo inválido.', error);
  }
}

function updateStats() {
  scoreValue.textContent = String(app.score);
  streakValue.textContent = String(app.streak);
}

function updateButtons() {
  lengthButtons.forEach((button) => {
    button.classList.toggle('active', Number(button.dataset.wordLength) === app.wordLength);
  });

  updateStats();
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
  const cols = getWordLength();
  boardEl.innerHTML = '';

  for (let row = 0; row < MAX_GUESSES; row += 1) {
    const rowEl = document.createElement('div');
    rowEl.className = 'row';
    rowEl.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;

    const guess = row < app.guesses.length ? app.guesses[row] : row === app.guesses.length ? app.currentGuess : '';

    for (let col = 0; col < cols; col += 1) {
      const tile = document.createElement('div');
      tile.className = 'tile';

      if (row === app.guesses.length
        && col === Math.min(app.cursorIndex, cols - 1)
        && !app.gameOver) {
        tile.classList.add('selected');
      }

      if (row === app.guesses.length && !app.gameOver) {
        tile.setAttribute('role', 'button');
        tile.tabIndex = 0;
        tile.setAttribute('aria-label', `Posição ${col + 1}${guess[col] ? `, letra ${guess[col].toUpperCase()}` : ', vazia'}`);
        tile.addEventListener('click', () => {
          app.cursorIndex = Math.min(col, app.currentGuess.length);
          renderBoard();
          saveState();
        });
        tile.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.stopPropagation();
            app.cursorIndex = Math.min(col, app.currentGuess.length);
            renderBoard();
            saveState();
          }
        });
      }

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

function finishGame(won, message) {
  app.gameOver = true;

  if (won) {
    app.streak += 1;
    const points = 100 + (MAX_GUESSES - app.guesses.length) * 25;
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
  const expectedLength = getWordLength();

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
    setStatus('Essa palavra não está no repertório do jogo.', true);
    return;
  }

  app.guesses.push(guess);
  updateKeyboardState(guess);

  if (guess === app.secretWord) {
    app.currentGuess = '';
    app.cursorIndex = 0;
    finishGame(true, `Você acertou! A palavra era ${app.secretWord.toUpperCase()}.`);
    return;
  }

  app.currentGuess = '';
  app.cursorIndex = 0;

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
    if (app.cursorIndex > 0) {
      app.currentGuess = app.currentGuess.slice(0, app.cursorIndex - 1)
        + app.currentGuess.slice(app.cursorIndex);
      app.cursorIndex -= 1;
    }
    setStatus('Digite uma palavra válida.');
    renderBoard();
    saveState();
    return;
  }

  if (key === 'DELETE_FORWARD') {
    app.currentGuess = app.currentGuess.slice(0, app.cursorIndex)
      + app.currentGuess.slice(app.cursorIndex + 1);
    renderBoard();
    saveState();
    return;
  }

  const normalized = String(key).toLowerCase();
  if (!/^[a-z]$/.test(normalized)) return;
  app.currentGuess = app.currentGuess.slice(0, app.cursorIndex)
    + normalized
    + app.currentGuess.slice(app.cursorIndex);
  app.currentGuess = app.currentGuess.slice(0, getWordLength());
  app.cursorIndex = Math.min(app.cursorIndex + 1, app.currentGuess.length);
  setStatus('Tentativa em andamento...');
  renderBoard();
  saveState();
}

function buildNewGame() {
  app.secretWord = chooseSecretWord();
  app.currentGuess = '';
  app.cursorIndex = 0;
  app.guesses = [];
  app.keyboardState = {};
  app.gameOver = false;
  setStatus('Nova partida iniciada. Boa sorte!');
  renderBoard();
  renderKeyboard();
  updateStats();
  saveState();
}

function bindEvents() {
  lengthButtons.forEach((button) => {
    button.addEventListener('click', () => {
      app.wordLength = Number(button.dataset.wordLength);
      updateButtons();
      buildNewGame();
    });
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
    } else if (event.key === 'Delete') {
      handleKeyInput('DELETE_FORWARD');
    } else if (event.key === 'ArrowLeft') {
      app.cursorIndex = Math.max(0, app.cursorIndex - 1);
      renderBoard();
    } else if (event.key === 'ArrowRight') {
      app.cursorIndex = Math.min(app.currentGuess.length, app.cursorIndex + 1);
      renderBoard();
    } else if (event.key === 'Home') {
      app.cursorIndex = 0;
      renderBoard();
    } else if (event.key === 'End') {
      app.cursorIndex = app.currentGuess.length;
      renderBoard();
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
    updateStats();
  }
}

init();
