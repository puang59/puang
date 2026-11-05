// Tiny synthesized sound effects built on the Web Audio API (no audio files).
// Browsers keep the AudioContext suspended until the first user gesture,
// so hover sounds stay silent until the visitor has clicked something.

const STORAGE_KEY = "sfx-muted";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
// Notes run through a low-pass filter and a soft reverb so they sound blurred.
let noteBus: AudioNode | null = null;
let clickNoise: AudioBuffer | null = null;
let muted = false;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
	if (loaded || typeof window === "undefined") return;
	loaded = true;
	let stored: string | null = null;
	try {
		stored = localStorage.getItem(STORAGE_KEY);
	} catch {}
	// Without a saved choice, start muted on touch devices (phones, tablets).
	muted =
		stored === null
			? window.matchMedia("(hover: none) and (pointer: coarse)").matches
			: stored === "1";
}

function audio() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		const Ctor =
			window.AudioContext ??
			(window as unknown as { webkitAudioContext?: typeof AudioContext })
				.webkitAudioContext;
		if (!Ctor) return null;
		ctx = new Ctor();
		master = ctx.createGain();
		master.gain.value = 0.9;
		master.connect(ctx.destination);
		noteBus = createNoteBus(ctx, master);
		clickNoise = createNoise(ctx, 0.04);
	}
	if (ctx.state === "suspended") void ctx.resume();
	return ctx;
}

function createNoise(ac: AudioContext, seconds: number) {
	const buffer = ac.createBuffer(
		1,
		Math.ceil(ac.sampleRate * seconds),
		ac.sampleRate,
	);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
	return buffer;
}

// Decaying stereo noise used as a cheap room reverb impulse.
function createImpulse(ac: AudioContext, seconds: number) {
	const length = Math.ceil(ac.sampleRate * seconds);
	const buffer = ac.createBuffer(2, length, ac.sampleRate);
	for (let channel = 0; channel < 2; channel++) {
		const data = buffer.getChannelData(channel);
		for (let i = 0; i < length; i++) {
			data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;
		}
	}
	return buffer;
}

function createNoteBus(ac: AudioContext, out: AudioNode) {
	const lowpass = ac.createBiquadFilter();
	lowpass.type = "lowpass";
	lowpass.frequency.value = 1100;
	lowpass.Q.value = 0.3;

	const dry = ac.createGain();
	dry.gain.value = 0.55;
	const reverb = ac.createConvolver();
	reverb.buffer = createImpulse(ac, 2.2);
	const wet = ac.createGain();
	wet.gain.value = 0.6;

	lowpass.connect(dry).connect(out);
	lowpass.connect(reverb).connect(wet).connect(out);
	return lowpass;
}

export function isMuted() {
	load();
	return muted;
}

export function setMuted(next: boolean) {
	muted = next;
	try {
		localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
	} catch {}
	for (const listener of listeners) listener();
}

export function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

// One sine voice with a gentle attack and an exponential tail.
function voice(
	ac: AudioContext,
	out: AudioNode,
	freq: number,
	peak: number,
	attack: number,
	decay: number,
	start: number,
) {
	const osc = ac.createOscillator();
	const gain = ac.createGain();
	osc.type = "sine";
	osc.frequency.setValueAtTime(freq, start);
	gain.gain.setValueAtTime(0.0001, start);
	gain.gain.exponentialRampToValueAtTime(peak, start + attack);
	gain.gain.exponentialRampToValueAtTime(0.0001, start + attack + decay);
	osc.connect(gain).connect(out);
	osc.start(start);
	osc.stop(start + attack + decay + 0.05);
}

// Muted mechanical-key click: a tiny band-passed noise tap over a low thud.
export function playClick() {
	if (isMuted()) return;
	const ac = audio();
	if (!ac || !master || !clickNoise) return;
	const t = ac.currentTime;

	const tap = ac.createBufferSource();
	tap.buffer = clickNoise;
	const band = ac.createBiquadFilter();
	band.type = "bandpass";
	// Slight variation so repeated clicks don't sound robotic.
	band.frequency.value = 1800 * (0.9 + Math.random() * 0.2);
	band.Q.value = 1.2;
	const tapGain = ac.createGain();
	tapGain.gain.setValueAtTime(0.0001, t);
	tapGain.gain.exponentialRampToValueAtTime(0.03, t + 0.002);
	tapGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
	tap.connect(band).connect(tapGain).connect(master);
	tap.start(t);
	tap.stop(t + 0.04);

	voice(ac, master, 150, 0.018, 0.002, 0.045, t);
}

// A minor pentatonic from A3 upward, so any run of notes sounds musical.
const SCALE = [
	220, 261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25, 783.99, 880,
];

let lastNoteAt = 0;

// Soft, blurred note for a contribution cell. Rows set the pitch (top is
// highest), the week nudges it through the scale, and busier days ring a
// little louder and longer.
export function playNote(row: number, week: number, level: number) {
	if (isMuted()) return;
	const ac = audio();
	if (!ac || !noteBus || ac.state !== "running") return;

	// Sweeping fast across the chart shouldn't turn into noise.
	const now = ac.currentTime;
	if (now - lastNoteAt < 0.045) return;
	lastNoteAt = now;

	const index = Math.min(SCALE.length - 1, 6 - row + (week % 5));
	const detune = 1 + (((week * 7 + row) % 5) - 2) * 0.002;
	const freq = (SCALE[index] ?? 440) * detune;
	const peak = 0.012 + level * 0.004;
	const decay = 0.9 + level * 0.15;

	voice(ac, noteBus, freq, peak, 0.03, decay, now);
	voice(ac, noteBus, freq * 2, peak * 0.12, 0.04, decay * 0.5, now);
}
