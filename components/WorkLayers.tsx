"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { workLayers } from "@/data/workLayers";
import "./WorkLayers.css";

const EASE = "sine.inOut";
const NUMBER_SIZE = 50;

export function WorkLayers() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const root: HTMLElement = node;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = workLayers.length;
    const order = workLayers.map((_, i) => i);
    let offsetTop = 200;
    let offsetLeft = 700;
    let cardWidth = 200;
    let cardHeight = 300;
    let gap = 40;
    let progressWidth = 500;
    let clicks = 0;
    let stepping = false;
    let cancelled = false;
    let paused = true;
    let looping = false;
    let inited = false;

    const q = (sel: string) => root.querySelector(sel) as HTMLElement | null;
    const card = (i: number) => q(`[data-card="${i}"]`);
    const slideItem = (i: number) => q(`[data-slide="${i}"]`);

    function layoutMetrics() {
      const height = root.clientHeight;
      const width = root.clientWidth;
      const mobile = width < 768;
      cardWidth = mobile ? 110 : 200;
      cardHeight = mobile ? 160 : 300;
      gap = mobile ? 16 : 40;
      offsetTop = height - (mobile ? 270 : 430);
      offsetLeft = mobile ? 16 : Math.max(24, width - 830);
      progressWidth = Math.min(500, (q(".wl-progress-bg")?.clientWidth ?? 500) || 500);
    }

    function restX(index: number) {
      return offsetLeft + index * (cardWidth + gap);
    }

    function init() {
      layoutMetrics();
      const [active, ...rest] = order;
      const { clientWidth: width, clientHeight: height } = root;

      gsap.set(q(".wl-pagination"), {
        top: offsetTop + cardHeight + 30,
        left: offsetLeft,
        y: 200,
        opacity: 0,
        zIndex: 60,
      });

      gsap.set(card(active), {
        x: 0,
        y: 0,
        width,
        height,
        borderRadius: 0,
        zIndex: 20,
      });

      gsap.set(q(".wl-progress-fg"), {
        width: progressWidth * (1 / n) * (active + 1),
      });

      rest.forEach((i, index) => {
        gsap.set(card(i), {
          x: restX(index) + 400,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
        });
        gsap.set(slideItem(i), { x: (index + 1) * NUMBER_SIZE });
      });
      gsap.set(slideItem(active), { x: 0 });
      gsap.set(q(".wl-indicator"), { x: -width });

      const startDelay = 0.45;
      rest.forEach((i, index) => {
        gsap.to(card(i), {
          x: restX(index),
          zIndex: 30,
          delay: startDelay,
          ease: EASE,
        });
      });
      gsap.to(q(".wl-pagination"), { y: 0, opacity: 1, ease: EASE, delay: startDelay });
    }

    function animate(target: gsap.TweenTarget, duration: number, properties: gsap.TweenVars) {
      return new Promise<void>((resolve) => {
        gsap.to(target, {
          ...properties,
          duration,
          onComplete: () => resolve(),
        });
      });
    }

    function step() {
      return new Promise<void>((resolve) => {
        if (cancelled) {
          resolve();
          return;
        }
        stepping = true;
        order.push(order.shift() as number);

        const [active, ...rest] = order;
        const prv = rest[rest.length - 1];

        gsap.set(card(prv), { zIndex: 10 });
        gsap.set(card(active), { zIndex: 20 });
        gsap.to(card(prv), { scale: 1.5, ease: EASE });

        gsap.to(slideItem(active), { x: 0, ease: EASE });
        gsap.to(slideItem(prv), { x: -NUMBER_SIZE, ease: EASE });
        gsap.to(q(".wl-progress-fg"), {
          width: progressWidth * (1 / n) * (active + 1),
          ease: EASE,
        });

        gsap.to(card(active), {
          x: 0,
          y: 0,
          ease: EASE,
          width: root.clientWidth,
          height: root.clientHeight,
          borderRadius: 0,
          onComplete: () => {
            const xNew = restX(rest.length - 1);
            gsap.set(card(prv), {
              x: xNew,
              y: offsetTop,
              width: cardWidth,
              height: cardHeight,
              zIndex: 30,
              borderRadius: 10,
              scale: 1,
            });
            gsap.set(slideItem(prv), { x: rest.length * NUMBER_SIZE });

            stepping = false;
            clicks = Math.max(0, clicks - 1);
            if (clicks > 0 && !cancelled) {
              void step().then(() => resolve());
            } else {
              resolve();
            }
          },
        });

        rest.forEach((i, index) => {
          if (i === prv) return;
          const xNew = restX(index);
          gsap.set(card(i), { zIndex: 30 });
          gsap.to(card(i), {
            x: xNew,
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            ease: EASE,
            delay: 0.1 * (index + 1),
          });
          gsap.to(slideItem(i), { x: (index + 1) * NUMBER_SIZE, ease: EASE });
        });
      });
    }

    function queueStep() {
      clicks += 1;
      if (!stepping) {
        void step();
      }
    }

    async function loop() {
      if (looping || reduced) return;
      looping = true;
      while (!cancelled) {
        if (paused || stepping) {
          await new Promise((r) => setTimeout(r, 180));
          continue;
        }
        const width = root.clientWidth;
        const indicator = q(".wl-indicator");
        gsap.set(indicator, { x: -width });
        await animate(indicator, 2.2, { x: 0, ease: EASE });
        if (cancelled || paused || stepping) continue;
        await animate(indicator, 0.7, { x: width, delay: 0.15, ease: EASE });
        gsap.set(indicator, { x: -width });
        if (cancelled || paused || stepping) continue;
        await step();
      }
      looping = false;
    }

    function applyStaticLayout() {
      layoutMetrics();
      const [active, ...rest] = order;
      gsap.set(card(active), {
        x: 0,
        y: 0,
        width: root.clientWidth,
        height: root.clientHeight,
        borderRadius: 0,
        zIndex: 20,
      });
      rest.forEach((i, index) => {
        gsap.set(card(i), {
          x: restX(index),
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
        });
      });
      gsap.set(q(".wl-pagination"), {
        top: offsetTop + cardHeight + 30,
        left: offsetLeft,
        y: 0,
        opacity: 1,
      });
    }

    function start() {
      if (inited) return;
      inited = true;
      if (reduced) {
        applyStaticLayout();
        return;
      }
      init();
      void loop();
    }

    layoutMetrics();
    gsap.set(card(order[0]), {
      x: 0,
      y: 0,
      width: root.clientWidth,
      height: root.clientHeight,
      borderRadius: 0,
      zIndex: 20,
    });
    order.slice(1).forEach((i) => {
      gsap.set(card(i), {
        x: root.clientWidth + 240,
        y: offsetTop,
        width: cardWidth,
        height: cardHeight,
        borderRadius: 10,
        zIndex: 30,
      });
    });

    const nextBtn = q("[data-wl-next]");
    const prevBtn = q("[data-wl-prev]");
    nextBtn?.addEventListener("click", queueStep);
    prevBtn?.addEventListener("click", queueStep);

    const onCardClick = (event: Event) => {
      const el = (event.target as HTMLElement).closest("[data-card]") as HTMLElement | null;
      if (!el) return;
      const index = Number(el.dataset.card);
      if (Number.isNaN(index)) return;
      if (index === order[0]) return;
      if (index === order[1]) queueStep();
    };
    root.addEventListener("click", onCardClick);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!inited || stepping) return;
        layoutMetrics();
        applyStaticLayout();
        gsap.set(q(".wl-progress-fg"), {
          width: progressWidth * (1 / n) * (order[0] + 1),
        });
      }, 120);
    };
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        paused = !entry.isIntersecting;
        if (entry.isIntersecting) start();
      },
      { threshold: 0.18 },
    );
    io.observe(root);

    return () => {
      cancelled = true;
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
      nextBtn?.removeEventListener("click", queueStep);
      prevBtn?.removeEventListener("click", queueStep);
      root.removeEventListener("click", onCardClick);
      gsap.killTweensOf(root.querySelectorAll("*"));
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="work-layers"
      className="work-layers"
      aria-label="Work layers"
    >
      <div className="wl-indicator" aria-hidden />

      {workLayers.map((layer, i) => (
        <div
          key={`card-${layer.id}`}
          data-card={i}
          className="wl-card"
          style={{ backgroundImage: `url(${layer.image})` }}
          role="img"
          aria-label={layer.place}
        />
      ))}

      <div className="wl-pagination">
        <button type="button" className="wl-arrow" data-wl-prev aria-label="Previous layer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="wl-arrow" data-wl-next aria-label="Next layer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="wl-progress-wrap">
          <div className="wl-progress-bg">
            <div className="wl-progress-fg" />
          </div>
        </div>
        <div className="wl-slide-numbers" aria-hidden>
          {workLayers.map((_, i) => (
            <div key={i} data-slide={i} className="wl-slide-item">
              {String(i + 1).padStart(2, "0")}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
