// Web Audio API Synthesizer for Interactive Sound FX
let audioCtx = null;
let soundEnabled = typeof window !== 'undefined' 
  ? localStorage.getItem('rekon_sound_enabled') !== 'false' 
  : true;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function toggleSound() {
  soundEnabled = !soundEnabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('rekon_sound_enabled', String(soundEnabled));
  }
  if (soundEnabled) {
    playTone(520, 0.08, 'sine');
  }
  return soundEnabled;
}

export function playTone(freq = 440, duration = 0.1, type = 'sine') {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.debug('Audio error:', e);
  }
}

export function playClickSound() {
  playTone(560, 0.05, 'sine');
}

export function playSuccessChime() {
  if (!soundEnabled) return;
  setTimeout(() => playTone(523.25, 0.12, 'triangle'), 0);   // C5
  setTimeout(() => playTone(659.25, 0.12, 'triangle'), 110); // E5
  setTimeout(() => playTone(783.99, 0.25, 'triangle'), 220); // G5
}

export function playWarningChime() {
  if (!soundEnabled) return;
  setTimeout(() => playTone(340, 0.15, 'sawtooth'), 0);
  setTimeout(() => playTone(280, 0.2, 'sawtooth'), 110);
}
