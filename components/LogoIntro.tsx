"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BirdAmbience } from "@/lib/birdAmbience";

const LOGO_SRC = "/brand/a2sea-logo.png";
const LOGO_RENDER_FILTER = "brightness(1.04) saturate(1.05) contrast(1.02)";
const LOGO_MAX_PX = 680;
const LOGO_VW = 76;
const LOGO_ASPECT = 241 / 765;

// Calibrated for a2sea-logo.png (765×241) — not the original 800×445 embed
const BIRD_REGION = { x: 0.02, y: 0.01, w: 0.28, h: 0.93 };
const TEXT_REGION = { x: 0.31, y: 0.01, w: 0.68, h: 0.74 };
const TAG_REGION = { x: 0.05, y: 0.79, w: 0.93, h: 0.21 };

const LETTER_XFRAC = [0.316, 0.454, 0.601, 0.732, 0.879];
const LETTER_WFRAC = [0.123, 0.133, 0.118, 0.134, 0.122];

const LETTER_DELAYS = [0.4, 0.62, 0.84, 1.06, 1.28];
const LETTER_DUR = 0.88;
const TAG_DELAY = 1.55;
const TAG_DUR = 0.55;
const BIRD_DELAY = 1.45;
const BIRD_DUR = 1.3;
const INTRO_ANIM_DURATION = BIRD_DELAY + BIRD_DUR + 0.45;

type Particle = {
  x: number;
  y: number;
  r: number;
  vy: number;
  dr: number;
  a: number;
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5);
}

function eOut(t: number, p = 3) {
  return 1 - Math.pow(1 - t, p);
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function getLogoDimensions(probeWidth: number, naturalW: number, naturalH: number) {
  const aspect = naturalW > 0 ? naturalH / naturalW : LOGO_ASPECT;
  const lw =
    probeWidth > 0
      ? probeWidth
      : Math.min(LOGO_MAX_PX, (window.innerWidth * LOGO_VW) / 100);
  const lh = lw * aspect;
  return { lw, lh };
}

export function LogoIntro() {
  const bgRef = useRef<HTMLCanvasElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const widthProbeRef = useRef<HTMLDivElement>(null);
  const birdCvRef = useRef<HTMLCanvasElement>(null);
  const textCvRef = useRef<HTMLCanvasElement>(null);
  const tagCvRef = useRef<HTMLCanvasElement>(null);

  const wtRef = useRef(0);
  const ptsRef = useRef<Particle[]>([]);
  const lwRef = useRef(0);
  const lhRef = useRef(0);
  const t0Ref = useRef<number | null>(null);
  const animRunningRef = useRef(false);
  const idleTRef = useRef(0);
  const lastTsRef = useRef(0);
  const rafRef = useRef(0);
  const birdRef = useRef<BirdAmbience | null>(null);
  const soundEnabledRef = useRef(true);
  const animStartedRef = useRef(false);
  const [soundOn, setSoundOn] = useState(false);

  const playBirdSequence = useCallback(async () => {
    if (!soundEnabledRef.current) return false;
    if (!birdRef.current) birdRef.current = new BirdAmbience();
    const ok = await birdRef.current.playForDuration(INTRO_ANIM_DURATION, { volume: 0.32 });
    if (ok) setSoundOn(true);
    return ok;
  }, []);

  const toggleSound = useCallback(() => {
    soundEnabledRef.current = !soundEnabledRef.current;
    if (!birdRef.current) birdRef.current = new BirdAmbience();

    if (soundEnabledRef.current) {
      birdRef.current.setMuted(false);
      setSoundOn(true);
    } else {
      birdRef.current.setMuted(true);
      setSoundOn(false);
    }
  }, []);

  const resizeBg = useCallback(() => {
    const cv = bgRef.current;
    if (!cv) return;
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
    ptsRef.current = Array.from({ length: 150 }, () => ({
      x: Math.random() * cv.width,
      y: Math.random() * cv.height,
      r: Math.random() * 1.1 + 0.15,
      vy: 0.12 + Math.random() * 0.22,
      dr: Math.random() * 3,
      a: Math.random() * 0.45 + 0.12,
    }));
  }, []);

  const drawBg = useCallback(() => {
    const cv = bgRef.current;
    if (!cv) return;
    const cx = cv.getContext("2d");
    if (!cx) return;

    const W = cv.width;
    const H = cv.height;
    const wt = wtRef.current;

    cx.fillStyle = "#030508";
    cx.fillRect(0, 0, W, H);

    const baseY = H * 0.75;
    for (let l = 3; l >= 0; l--) {
      const amp = 24 - l * 4;
      const freq = 0.006 + l * 0.0028;
      const spd = 0.85 + l * 0.3;
      const yo = l * 12;

      cx.beginPath();
      cx.moveTo(0, H);
      for (let x = 0; x <= W; x += 3) {
        const y =
          baseY +
          yo +
          Math.sin(x * freq + wt * spd) * amp +
          Math.sin(x * freq * 1.8 + wt * spd * 0.75) * (amp * 0.4) +
          Math.sin(x * freq * 0.45 + wt * spd * 1.4) * (amp * 0.25);
        cx.lineTo(x, y);
      }
      cx.lineTo(W, H);
      cx.closePath();
      cx.fillStyle = `rgba(10,${48 + l * 14},${98 + l * 22},${0.1 + l * 0.05})`;
      cx.fill();

      cx.beginPath();
      for (let x = 0; x <= W; x += 3) {
        const y =
          baseY +
          yo +
          Math.sin(x * freq + wt * spd) * amp +
          Math.sin(x * freq * 1.8 + wt * spd * 0.75) * (amp * 0.4) +
          Math.sin(x * freq * 0.45 + wt * spd * 1.4) * (amp * 0.25);
        if (x === 0) cx.moveTo(x, y);
        else cx.lineTo(x, y);
      }
      cx.strokeStyle = `rgba(56,120,160,${0.06 + l * 0.025})`;
      cx.lineWidth = l === 3 ? 1.4 : 0.7;
      cx.stroke();
    }

    cx.save();
    ptsRef.current.forEach((p, i) => {
      p.y -= p.vy;
      p.x += Math.sin(wt * p.dr) * 0.28;
      if (p.y < -5) p.y = cv.height + 5;
      cx.globalAlpha = p.a;
      cx.fillStyle = i % 3 === 0 ? "#6a8fa8" : "#4a6d85";
      cx.beginPath();
      cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      cx.fill();
    });
    cx.restore();
  }, []);

  const setupCanvases = useCallback(() => {
    const logoImg = logoImgRef.current;
    const logoWrap = logoWrapRef.current;
    if (!logoImg || !logoWrap) return;

    const { lw: LW, lh: LH } = getLogoDimensions(
      widthProbeRef.current?.offsetWidth ?? 0,
      logoImg.naturalWidth,
      logoImg.naturalHeight
    );

    lwRef.current = LW;
    lhRef.current = LH;

    logoWrap.style.width = `${LW}px`;
    logoWrap.style.height = `${LH}px`;

    const dpr = window.devicePixelRatio || 1;
    [birdCvRef, textCvRef, tagCvRef].forEach((ref) => {
      const c = ref.current;
      if (!c) return;
      c.width = Math.round(LW * dpr);
      c.height = Math.round(LH * dpr);
      c.style.width = `${LW}px`;
      c.style.height = `${LH}px`;
      const ctx = c.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }
    });
  }, []);

  const clearLayerCanvas = useCallback((c: HTMLCanvasElement) => {
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  const replayAnim = useCallback(() => {
    setupCanvases();
    t0Ref.current = null;
    idleTRef.current = 0;

    [birdCvRef, textCvRef, tagCvRef].forEach((ref) => {
      const c = ref.current;
      if (c) clearLayerCanvas(c);
    });

    if (birdCvRef.current) birdCvRef.current.style.opacity = "0";
    if (tagCvRef.current) tagCvRef.current.style.opacity = "0";
    animRunningRef.current = true;
    void playBirdSequence();
  }, [setupCanvases, clearLayerCanvas, playBirdSequence]);

  const startAnimOnce = useCallback(() => {
    if (animStartedRef.current) {
      setupCanvases();
      return;
    }
    animStartedRef.current = true;
    replayAnim();
  }, [setupCanvases, replayAnim]);

  const frame = useCallback(
    (ts: number) => {
      rafRef.current = requestAnimationFrame(frame);

      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.05);
      lastTsRef.current = ts;
      wtRef.current += dt * 0.8;
      drawBg();

      if (!animRunningRef.current) return;

      const logoImg = logoImgRef.current;
      const textCv = textCvRef.current;
      const tagCv = tagCvRef.current;
      const birdCv = birdCvRef.current;
      if (!logoImg || !textCv || !tagCv || !birdCv) return;

      const LW = lwRef.current;
      const LH = lhRef.current;
      if (!LW || !LH) return;

      if (t0Ref.current === null) t0Ref.current = ts;
      const t = (ts - t0Ref.current) / 1000;

      const tCtx = textCv.getContext("2d");
      if (!tCtx) return;
      tCtx.clearRect(0, 0, LW, LH);

      for (let i = 0; i < 5; i++) {
        const lt = clamp((t - LETTER_DELAYS[i]) / LETTER_DUR, 0, 1);
        if (lt <= 0) continue;

        const lx = LETTER_XFRAC[i] * LW;
        const lw = LETTER_WFRAC[i] * LW;
        const ly = TEXT_REGION.y * LH;
        const lh = TEXT_REGION.h * LH;
        const dropProgress = easeOutQuint(lt);
        const dropY = -LH * 0.09 * (1 - dropProgress);
        const alpha = easeOutCubic(clamp(lt * 1.2, 0, 1));
        const scale = 0.985 + 0.015 * dropProgress;

        const lcx = lx + lw / 2;
        const lcy = ly + lh / 2;

        tCtx.save();
        tCtx.globalAlpha = alpha;
        tCtx.filter = LOGO_RENDER_FILTER;
        tCtx.beginPath();
        tCtx.rect(lx, 0, lw, ly + lh + 2);
        tCtx.clip();
        tCtx.translate(lcx, lcy + dropY);
        tCtx.scale(scale, scale);
        tCtx.translate(-lcx, -lcy);
        tCtx.drawImage(
          logoImg,
          LETTER_XFRAC[i] * logoImg.naturalWidth,
          0,
          LETTER_WFRAC[i] * logoImg.naturalWidth,
          logoImg.naturalHeight,
          lx,
          0,
          lw,
          LH
        );
        tCtx.restore();
      }

      const tgt = clamp((t - TAG_DELAY) / TAG_DUR, 0, 1);
      if (tgt > 0) {
        tagCv.style.opacity = "1";
        const gCtx = tagCv.getContext("2d");
        if (gCtx) {
          gCtx.clearRect(0, 0, LW, LH);
          const ry = TAG_REGION.y * LH;
          const rh = TAG_REGION.h * LH;
          const rx = TAG_REGION.x * LW;
          const rw = TAG_REGION.w * LW;
          const slide = (1 - easeOutCubic(tgt)) * 8;
          gCtx.save();
          gCtx.globalAlpha = easeOutCubic(tgt);
          gCtx.filter = LOGO_RENDER_FILTER;
          gCtx.beginPath();
          gCtx.rect(rx, ry, rw, rh);
          gCtx.clip();
          gCtx.drawImage(
            logoImg,
            TAG_REGION.x * logoImg.naturalWidth,
            TAG_REGION.y * logoImg.naturalHeight,
            TAG_REGION.w * logoImg.naturalWidth,
            TAG_REGION.h * logoImg.naturalHeight,
            rx,
            ry + slide,
            rw,
            rh
          );
          gCtx.restore();
        }
      }

      const bt = clamp((t - BIRD_DELAY) / BIRD_DUR, 0, 1);
      if (bt > 0) {
        birdCv.style.opacity = "1";
        const bCtx = birdCv.getContext("2d");
        if (bCtx) {
          bCtx.clearRect(0, 0, LW, LH);

          const ep = eOut(bt, 3);
          const bAlpha = clamp(bt * 3.5, 0, 1);
          const bx = BIRD_REGION.x * LW;
          const by = BIRD_REGION.y * LH;
          const bw = BIRD_REGION.w * LW;
          const bh = BIRD_REGION.h * LH;
          const bcx = bx + bw / 2;
          const bcy = by + bh / 2;

          const fromX = -LW * 0.55;
          const fromY = -LH * 0.28;
          const curX = fromX * (1 - ep);
          const arcY = fromY * (1 - eOut(bt, 2)) + Math.sin(bt * Math.PI) * (-LH * 0.07);
          const rot = (-20 * (1 - eOut(bt, 2)) * Math.PI) / 180;
          const flap = bt < 1 ? Math.sin(bt * Math.PI * 7) * 0.05 * (1 - bt) : 0;
          const scl = 0.82 + 0.18 * ep;

          bCtx.save();
          bCtx.globalAlpha = bAlpha;
          bCtx.filter = LOGO_RENDER_FILTER;
          bCtx.beginPath();
          bCtx.rect(bx - 4, by - 4, bw + 8, bh + 8);
          bCtx.clip();
          bCtx.translate(bcx + curX, bcy + arcY);
          bCtx.rotate(rot + flap);
          bCtx.scale(scl, scl);
          bCtx.translate(-bcx, -bcy);
          bCtx.drawImage(
            logoImg,
            BIRD_REGION.x * logoImg.naturalWidth,
            BIRD_REGION.y * logoImg.naturalHeight,
            BIRD_REGION.w * logoImg.naturalWidth,
            BIRD_REGION.h * logoImg.naturalHeight,
            bx,
            by,
            bw,
            bh
          );
          bCtx.restore();
        }
      }

      if (bt >= 1) {
        idleTRef.current += dt;
        const fy = Math.sin(idleTRef.current * 1.1) * 2.5;
        const rot = (Math.sin(idleTRef.current * 0.7) * 1 * Math.PI) / 180;
        const bx = BIRD_REGION.x * LW;
        const by = BIRD_REGION.y * LH;
        const bw = BIRD_REGION.w * LW;
        const bh = BIRD_REGION.h * LH;
        const bcx = bx + bw / 2;
        const bcy = by + bh / 2;

        const bCtx = birdCv.getContext("2d");
        if (bCtx) {
          bCtx.clearRect(0, 0, LW, LH);
          bCtx.save();
          bCtx.globalAlpha = 1;
          bCtx.filter = LOGO_RENDER_FILTER;
          bCtx.beginPath();
          bCtx.rect(bx - 4, by - 4, bw + 8, bh + 8);
          bCtx.clip();
          bCtx.translate(bcx, bcy + fy);
          bCtx.rotate(rot);
          bCtx.translate(-bcx, -bcy);
          bCtx.drawImage(
            logoImg,
            BIRD_REGION.x * logoImg.naturalWidth,
            BIRD_REGION.y * logoImg.naturalHeight,
            BIRD_REGION.w * logoImg.naturalWidth,
            BIRD_REGION.h * logoImg.naturalHeight,
            bx,
            by,
            bw,
            bh
          );
          bCtx.restore();
        }
      }
    },
    [drawBg]
  );

  const syncLogo = useCallback(() => {
    const img = logoImgRef.current;
    if (img?.complete && img.naturalWidth > 0) startAnimOnce();
  }, [startAnimOnce]);

  useEffect(() => {
    resizeBg();
    lastTsRef.current = performance.now();
    rafRef.current = requestAnimationFrame(frame);

    syncLogo();
    let syncRaf = 0;
    const scheduleSync = (framesLeft: number) => {
      syncRaf = requestAnimationFrame(() => {
        syncLogo();
        if (framesLeft > 1) scheduleSync(framesLeft - 1);
      });
    };
    scheduleSync(3);

    const onResize = () => {
      resizeBg();
      const img = logoImgRef.current;
      if (img?.complete && img.naturalWidth > 0) setupCanvases();
    };
    const onFirstInteraction = () => {
      if (!soundEnabledRef.current) return;
      if (!birdRef.current) birdRef.current = new BirdAmbience();
      void birdRef.current.resume();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("pointerdown", onFirstInteraction, { once: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(syncRaf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerdown", onFirstInteraction);
      birdRef.current?.stop();
      birdRef.current = null;
    };
  }, [resizeBg, frame, syncLogo, setupCanvases]);

  const boot = useCallback(() => {
    syncLogo();
  }, [syncLogo]);

  return (
    <section
      id="top"
      className="relative h-[100svh] w-full overflow-hidden bg-[#030508]"
      aria-label="a2sea intro"
    >
      <canvas ref={bgRef} className="absolute inset-0 h-full w-full" aria-hidden />

      <div className="absolute inset-0 grid place-items-center px-4">
        <div
          ref={widthProbeRef}
          className="pointer-events-none invisible absolute h-0 w-[min(680px,76vw)]"
          aria-hidden
        />
        <div ref={logoWrapRef} className="relative mx-auto shrink-0 overflow-visible">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={logoImgRef}
            id="logo-full"
            src={LOGO_SRC}
            alt="a2sea"
            className="invisible block h-auto w-full max-w-[min(680px,76vw)]"
            onLoad={boot}
          />

          <canvas
            ref={birdCvRef}
            id="bird-canvas"
            className="pointer-events-none absolute left-0 top-0 z-[3] h-full w-full opacity-0"
            aria-hidden
          />
          <canvas
            ref={textCvRef}
            id="text-canvas"
            className="pointer-events-none absolute left-0 top-0 z-[4] h-full w-full"
            aria-hidden
          />
          <canvas
            ref={tagCvRef}
            id="tag-canvas"
            className="pointer-events-none absolute left-0 top-0 z-[5] h-full w-full opacity-0"
            aria-hidden
          />

        </div>
      </div>

      <div className="fixed bottom-[18px] right-[18px] z-[100] flex items-center gap-2">
        <button
          type="button"
          onClick={() => void toggleSound()}
          aria-label={soundOn ? "Mute bird sound" : "Play bird sound"}
          aria-pressed={soundOn}
          className="cursor-pointer rounded border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-[14px] py-[7px] text-[#a8b4c0] transition-colors hover:bg-[rgba(255,255,255,0.08)]"
        >
          {soundOn ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 10v4h4l5 4V6L8 10H4z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M16 8.5c1.2 1.1 1.9 2.6 1.9 4.2s-.7 3.1-1.9 4.2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M18.5 6c2.1 2 3.4 4.8 3.4 7.8s-1.3 5.8-3.4 7.8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 10v4h4l5 4V6L8 10H4z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M16 9l4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M20 9l-4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
        <button
          type="button"
          id="btn"
          onClick={replayAnim}
          className="cursor-pointer rounded border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-[18px] py-[7px] text-xs tracking-[0.12em] text-[#a8b4c0] transition-colors hover:bg-[rgba(255,255,255,0.08)]"
        >
          ↺ Replay
        </button>
      </div>
    </section>
  );
}
