export interface KeystrokeRecord {
  char: string;
  expected: string;
  isCorrect: boolean;
  timestamp: number;
  index: number;
}

export interface StrictMatchState {
  currentIndex: number;
  userInput: string; // The raw typed string so far
  charStates: ('pending' | 'correct' | 'incorrect')[];
  errorsCount: number;
  totalKeystrokes: number;
  isCompleted: boolean;
  history: KeystrokeRecord[];
}

export function createInitialMatchState(targetTextLength: number): StrictMatchState {
  return {
    currentIndex: 0,
    userInput: '',
    charStates: new Array(targetTextLength).fill('pending'),
    errorsCount: 0,
    totalKeystrokes: 0,
    isCompleted: false,
    history: [],
  };
}

export function handleKeystroke(
  state: StrictMatchState,
  targetText: string,
  key: string,
  strictMode: boolean = true
): StrictMatchState {
  if (state.isCompleted) return state;

  // Handle Backspace
  if (key === 'Backspace') {
    if (state.currentIndex <= 0) return state;
    const newIdx = state.currentIndex - 1;
    const newCharStates = [...state.charStates];
    newCharStates[newIdx] = 'pending';
    return {
      ...state,
      currentIndex: newIdx,
      userInput: state.userInput.slice(0, -1),
      charStates: newCharStates,
    };
  }

  // Ignore non-character keys (Shift, Alt, Control, Meta, etc.)
  if (key.length > 1) return state;

  const expectedChar = targetText[state.currentIndex];
  if (!expectedChar) return state;

  const isCorrect = key === expectedChar;
  const newCharStates = [...state.charStates];

  if (strictMode) {
    if (!isCorrect) {
      // Mismatch in strict mode: record error, mark char as incorrect, DO NOT advance cursor
      newCharStates[state.currentIndex] = 'incorrect';
      return {
        ...state,
        errorsCount: state.errorsCount + 1,
        totalKeystrokes: state.totalKeystrokes + 1,
        charStates: newCharStates,
        history: [
          ...state.history,
          {
            char: key,
            expected: expectedChar,
            isCorrect: false,
            timestamp: Date.now(),
            index: state.currentIndex,
          },
        ],
      };
    }

    // Correct keystroke in strict mode: mark correct and advance
    newCharStates[state.currentIndex] = 'correct';
    const nextIdx = state.currentIndex + 1;
    const isCompleted = nextIdx >= targetText.length;

    return {
      ...state,
      currentIndex: nextIdx,
      userInput: state.userInput + key,
      charStates: newCharStates,
      totalKeystrokes: state.totalKeystrokes + 1,
      isCompleted,
      history: [
        ...state.history,
        {
          char: key,
          expected: expectedChar,
          isCorrect: true,
          timestamp: Date.now(),
          index: state.currentIndex,
        },
      ],
    };
  } else {
    // Non-strict mode: always advance cursor
    newCharStates[state.currentIndex] = isCorrect ? 'correct' : 'incorrect';
    const nextIdx = state.currentIndex + 1;
    const isCompleted = nextIdx >= targetText.length;

    return {
      ...state,
      currentIndex: nextIdx,
      userInput: state.userInput + key,
      charStates: newCharStates,
      errorsCount: isCorrect ? state.errorsCount : state.errorsCount + 1,
      totalKeystrokes: state.totalKeystrokes + 1,
      isCompleted,
      history: [
        ...state.history,
        {
          char: key,
          expected: expectedChar,
          isCorrect,
          timestamp: Date.now(),
          index: state.currentIndex,
        },
      ],
    };
  }
}
