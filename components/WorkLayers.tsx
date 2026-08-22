"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { workLayers } from "@/data/workLayers";
import "./WorkLayers.css";

const EASE = "sine.inOut";
const NUMBER_SIZE = 50;
const STAGE_W = 1440;
const STAGE_H = 900;
const CARD_W = 200;
const CARD_H = 300;
const CARD_GAP = 40;
const OFFSET_TOP = STAGE_H - 430;
const OFFSET_LEFT = STAGE_W - 830;
const PROGRESS_W = 500;

export function WorkLayers() {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    const frameNode = frameRef.current;
    const stageNode = stageRef.current;
    if (!node || !frameNode || !stageNode) return;
    const root: HTMLElement = node;
    const frame: HTMLElement = frameNode;
    const stage: HTMLElement = stageNode;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = workLayers.length;
    const order = workLayers.map((_, i) => i);
    let detailsEven = true;
    const offsetTop = OFFSET_TOP;
    const offsetLeft = OFFSET_LEFT;
    const cardWidth = CARD_W;
    const cardHeight = CARD_H;
    const gap = CARD_GAP;
    const progressWidth = PROGRESS_W;
    let clicks = 0;
    let stepping = false;
    let cancelled = false;
    let paused = true;
    let looping = false;
    let inited = false;

    const q = (sel: string) => root.querySelector(sel) as HTMLElement | null;
    const card = (i: number) => q(`[data-card="${i}"]`);
    const cardContent = (i: number) => q(`[data-content="${i}"]`);
    const slideItem = (i: number) => q(`[data-slide="${i}"]`);

    const detailsSel = (even: boolean) => (even ? "[data-details='even']" : "[data-details='odd']");

    function fitStage() {
      const s = frame.clientWidth / STAGE_W;
      if (!s || !Number.isFinite(s)) return;
      stage.style.transform = `scale(${s})`;
    }

    function layoutMetrics() {
      fitStage();
    }

    function fillDetails(even: boolean, index: number) {
      const layer = workLayers[index];
      const box = q(detailsSel(even));
      if (!box || !layer) return;
      const text = box.querySelector(".text");
      const t1 = box.querySelector(".wl-title-1");
      const t2 = box.querySelector(".wl-title-2");
      const desc = box.querySelector(".wl-desc");
      const cta = box.querySelector(".wl-cta-link") as HTMLAnchorElement | null;
      if (text) text.textContent = layer.place;
      if (t1) t1.textContent = layer.title;
      if (t2) t2.textContent = layer.title2;
      if (desc) desc.textContent = layer.description;
      if (cta) {
        cta.href = layer.href;
        cta.textContent = layer.cta;
      }
    }

    function restX(index: number) {
      return offsetLeft + index * (cardWidth + gap);
    }

    function init() {
      layoutMetrics();
      const [active, ...rest] = order;
      const activeDetails = detailsSel(detailsEven);
      const inactiveDetails = detailsSel(!detailsEven);
      const width = STAGE_W;
      const height = STAGE_H;

      fillDetails(detailsEven, active);

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
      gsap.set(cardContent(active), { x: 0, y: 0, opacity: 0 });
      gsap.set(activeDetails, { opacity: 0, zIndex: 22, x: -200 });
      gsap.set(inactiveDetails, { opacity: 0, zIndex: 12 });
      gsap.set(`${inactiveDetails} .text`, { y: 100 });
      gsap.set(`${inactiveDetails} .wl-title-1`, { y: 100 });
      gsap.set(`${inactiveDetails} .wl-title-2`, { y: 100 });
      gsap.set(`${inactiveDetails} .wl-desc`, { y: 50 });
      gsap.set(`${inactiveDetails} .wl-cta`, { y: 60 });

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
        gsap.set(cardContent(i), {
          x: restX(index) + 400,
          zIndex: 40,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
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
        gsap.to(cardContent(i), {
          x: restX(index),
          zIndex: 40,
          delay: startDelay,
          ease: EASE,
        });
      });
      gsap.to(q(".wl-pagination"), { y: 0, opacity: 1, ease: EASE, delay: startDelay });
      gsap.to(activeDetails, { opacity: 1, x: 0, ease: EASE, delay: startDelay });
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
        detailsEven = !detailsEven;

        const activeDetails = detailsSel(detailsEven);
        const inactiveDetails = detailsSel(!detailsEven);
        fillDetails(detailsEven, order[0]);

        gsap.set(activeDetails, { zIndex: 22 });
        gsap.to(activeDetails, { opacity: 1, delay: 0.4, ease: EASE });
        gsap.to(`${activeDetails} .text`, { y: 0, delay: 0.1, duration: 0.7, ease: EASE });
        gsap.to(`${activeDetails} .wl-title-1`, { y: 0, delay: 0.15, duration: 0.7, ease: EASE });
        gsap.to(`${activeDetails} .wl-title-2`, { y: 0, delay: 0.15, duration: 0.7, ease: EASE });
        gsap.to(`${activeDetails} .wl-desc`, { y: 0, delay: 0.3, duration: 0.4, ease: EASE });
        gsap.to(`${activeDetails} .wl-cta`, {
          y: 0,
          delay: 0.35,
          duration: 0.4,
          ease: EASE,
        });
        gsap.set(inactiveDetails, { zIndex: 12 });

        const [active, ...rest] = order;
        const prv = rest[rest.length - 1];

        gsap.set(card(prv), { zIndex: 10 });
        gsap.set(card(active), { zIndex: 20 });
        gsap.to(card(prv), { scale: 1.5, ease: EASE });

        gsap.to(cardContent(active), {
          y: offsetTop + cardHeight - 10,
          opacity: 0,
          duration: 0.3,
          ease: EASE,
        });
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
          width: STAGE_W,
          height: STAGE_H,
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
            gsap.set(cardContent(prv), {
              x: xNew,
              y: offsetTop + cardHeight - 100,
              opacity: 1,
              zIndex: 40,
            });
            gsap.set(slideItem(prv), { x: rest.length * NUMBER_SIZE });
            gsap.set(inactiveDetails, { opacity: 0 });
            gsap.set(`${inactiveDetails} .text`, { y: 100 });
            gsap.set(`${inactiveDetails} .wl-title-1`, { y: 100 });
            gsap.set(`${inactiveDetails} .wl-title-2`, { y: 100 });
            gsap.set(`${inactiveDetails} .wl-desc`, { y: 50 });
            gsap.set(`${inactiveDetails} .wl-cta`, { y: 60 });

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
          gsap.to(cardContent(i), {
            x: xNew,
            y: offsetTop + cardHeight - 100,
            opacity: 1,
            zIndex: 40,
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
        const width = STAGE_W;
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
        width: STAGE_W,
        height: STAGE_H,
        borderRadius: 0,
        zIndex: 20,
      });
      gsap.set(cardContent(active), { opacity: 0 });
      gsap.set(detailsSel(detailsEven), { opacity: 1, x: 0, zIndex: 22 });
      gsap.set(detailsSel(!detailsEven), { opacity: 0 });
      rest.forEach((i, index) => {
        gsap.set(card(i), {
          x: restX(index),
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
        });
        gsap.set(cardContent(i), {
          x: restX(index),
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
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
      width: STAGE_W,
      height: STAGE_H,
      borderRadius: 0,
      zIndex: 20,
    });
    order.slice(1).forEach((i) => {
      gsap.set(card(i), {
        x: STAGE_W + 240,
        y: offsetTop,
        width: cardWidth,
        height: cardHeight,
        borderRadius: 10,
        zIndex: 30,
      });
      gsap.set(cardContent(i), { opacity: 0 });
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
        fitStage();
      }, 80);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

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
      window.removeEventListener("orientationchange", onResize);
      window.clearTimeout(resizeTimer);
      nextBtn?.removeEventListener("click", queueStep);
      prevBtn?.removeEventListener("click", queueStep);
      root.removeEventListener("click", onCardClick);
      gsap.killTweensOf(root.querySelectorAll("*"));
    };
  }, []);

  const first = workLayers[0];

  return (
    <section
      ref={rootRef}
      id="work-layers"
      className="work-layers"
      aria-label="Work layers"
    >
      <div className="wl-rotator">
      <div className="wl-frame" ref={frameRef}>
      <div className="wl-stage" ref={stageRef}>
      <p className="wl-hint">Scroll or wait — layers advance</p>
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

      {workLayers.map((layer, i) => (
        <div key={`content-${layer.id}`} data-content={i} className="wl-card-content">
          <div className="wl-content-start" />
          <div className="wl-content-place">{layer.place}</div>
          <div className="wl-content-title-1">{layer.title}</div>
          <div className="wl-content-title-2">{layer.title2}</div>
        </div>
      ))}

      <DetailsPane even content={first} />
      <DetailsPane even={false} content={first} />

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
      </div>
      </div>
      </div>
    </section>
  );
}

function DetailsPane({
  even,
  content,
}: {
  even: boolean;
  content: (typeof workLayers)[number];
}) {
  return (
    <div className="wl-details" data-details={even ? "even" : "odd"}>
      <div className="wl-place-box">
        <div className="text">{content.place}</div>
      </div>
      <div className="wl-title-box">
        <div className="wl-title-1">{content.title}</div>
      </div>
      <div className="wl-title-box">
        <div className="wl-title-2">{content.title2}</div>
      </div>
      <p className="wl-desc">{content.description}</p>
      <div className="wl-cta">
        <span className="wl-cta-mark" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <a className="wl-cta-link" href={content.href}>
          {content.cta}
        </a>
      </div>
    </div>
  );
}
