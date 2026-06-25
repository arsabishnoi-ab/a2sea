type BirdSequenceOptions = {
  volume?: number;
};

type Chirp = {
  at: number;
  dur: number;
  f0: number;
  f1: number;
  amp: number;
};

const DEFAULT_CHIRPS: Chirp[] = [
  { at: 0.28, dur: 0.11, f0: 2800, f1: 2100, amp: 0.08 },
  { at: 1.32, dur: 0.09, f0: 3200, f1: 2600, amp: 0.14 },
  { at: 1.52, dur: 0.07, f0: 3500, f1: 2900, amp: 0.16 },
  { at: 1.68, dur: 0.08, f0: 3100, f1: 2400, amp: 0.15 },
  { at: 1.98, dur: 0.1, f0: 3400, f1: 2200, amp: 0.17 },
  { at: 2.42, dur: 0.12, f0: 2900, f1: 1800, amp: 0.18 },
  { at: 2.72, dur: 0.14, f0: 2600, f1: 1600, amp: 0.12 },
];

function addChirp(
  data: Float32Array,
  sampleRate: number,
  startSec: number,
  durationSec: number,
  f0: number,
  f1: number,
  amplitude: number
) {
  const start = Math.floor(startSec * sampleRate);
  const end = Math.min(data.length, Math.floor((startSec + durationSec) * sampleRate));

  for (let i = start; i < end; i++) {
    const t = (i - start) / sampleRate;
    const p = t / durationSec;
    const env = Math.sin(Math.PI * p);
    const freq = f0 + (f1 - f0) * p;
    const tone =
      Math.sin((2 * Math.PI * freq * t) / 1) * 0.72 +
      Math.sin((2 * Math.PI * freq * 1.8 * t) / 1) * 0.18 +
      Math.sin((2 * Math.PI * freq * 2.6 * t) / 1) * 0.1;
    data[i] += tone * env * amplitude;
  }
}

function addWingFlutter(
  data: Float32Array,
  sampleRate: number,
  startSec: number,
  endSec: number,
  amplitude: number
) {
  const start = Math.floor(startSec * sampleRate);
  const end = Math.min(data.length, Math.floor(endSec * sampleRate));
  let phase = 0;

  for (let i = start; i < end; i++) {
    const t = (i - start) / sampleRate;
    const pulse = Math.max(0, Math.sin(t * 22 * Math.PI));
    const noise = (Math.random() * 2 - 1) * pulse;
    phase += 0.04;
    const flutter = noise * amplitude * (0.55 + Math.sin(phase) * 0.45);
    data[i] += flutter;
  }
}

function buildBirdBuffer(ctx: AudioContext, durationSec: number, chirps: Chirp[]) {
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * durationSec);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  chirps.forEach(({ at, dur, f0, f1, amp }) => {
    addChirp(data, sampleRate, at, dur, f0, f1, amp);
  });

  addWingFlutter(data, sampleRate, 1.42, 2.55, 0.025);

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    let master = 1;
    if (t < 0.08) master = t / 0.08;
    if (t > durationSec - 0.35) master = Math.max(0, (durationSec - t) / 0.35);
    data[i] *= master;
  }

  return buffer;
}

export class BirdAmbience {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private source: AudioBufferSourceNode | null = null;
  private cachedKey = "";
  private cachedBuffer: AudioBuffer | null = null;
  private playing = false;
  private muted = false;
  private targetVolume = 0.32;
  private playToken = 0;

  private async getContext() {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }
    return this.ctx;
  }

  private getBuffer(ctx: AudioContext, durationSec: number, chirps: Chirp[]) {
    const key = `${durationSec}:${chirps.map((c) => c.at).join(",")}`;
    if (this.cachedKey === key && this.cachedBuffer) {
      return this.cachedBuffer;
    }
    this.cachedBuffer = buildBirdBuffer(ctx, durationSec, chirps);
    this.cachedKey = key;
    return this.cachedBuffer;
  }

  private teardownNodes() {
    if (this.source) {
      try {
        this.source.onended = null;
        this.source.stop();
      } catch {
        /* already stopped */
      }
      this.source.disconnect();
      this.source = null;
    }
    this.masterGain?.disconnect();
    this.masterGain = null;
    this.playing = false;
  }

  async resume() {
    const ctx = await this.getContext();
    return ctx.state === "running";
  }

  async playForDuration(durationSec: number, options: BirdSequenceOptions = {}) {
    const token = ++this.playToken;
    this.teardownNodes();

    const { volume = 0.32 } = options;
    this.targetVolume = volume;

    if (this.muted) return false;

    try {
      const ctx = await this.getContext();
      if (token !== this.playToken) return false;

      const buffer = this.getBuffer(ctx, durationSec, DEFAULT_CHIRPS);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = false;

      this.masterGain = ctx.createGain();
      this.masterGain.gain.value = volume;
      source.connect(this.masterGain);
      this.masterGain.connect(ctx.destination);

      source.onended = () => {
        if (token === this.playToken) {
          this.teardownNodes();
        }
      };

      source.start(0);
      this.source = source;
      this.playing = true;
      return true;
    } catch {
      this.teardownNodes();
      return false;
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (!this.masterGain || !this.ctx) return;
    this.masterGain.gain.setTargetAtTime(muted ? 0 : this.targetVolume, this.ctx.currentTime, 0.08);
    if (muted) this.teardownNodes();
  }

  isMuted() {
    return this.muted;
  }

  isPlaying() {
    return this.playing;
  }

  stop() {
    this.playToken++;
    this.teardownNodes();
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
    this.cachedBuffer = null;
    this.cachedKey = "";
  }
}
