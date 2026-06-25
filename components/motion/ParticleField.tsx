"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const PARTICLE_COUNT = 360;
const MOUSE_RADIUS   = 140;
const REPEL_FORCE    = 9;
const RETURN_SPEED   = 0.05;
const FRICTION       = 0.87;

/** rgb of the particle ink — deep teal/charcoal reads well on paper */
const INK = "14,124,139";

function buildSphere(cx: number, cy: number, radius: number): Particle[] {
  const out: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = radius * Math.cbrt(Math.random());

    const x3d = r * Math.sin(phi) * Math.cos(theta);
    const y3d = r * Math.cos(phi);
    const z3d = r * Math.sin(phi) * Math.sin(theta);

    const ox = cx + x3d;
    const oy = cy + y3d;

    const depth   = (z3d / radius + 1) / 2;
    const opacity = depth * 0.32 + 0.05;
    const size    = depth * 1.5 + 0.4;

    out.push({ x: ox, y: oy, originX: ox, originY: oy, vx: 0, vy: 0, size, opacity });
  }
  return out;
}

export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced   = useReducedMotion() ?? false;

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c: CanvasRenderingContext2D = ctx;

    let raf = 0;
    let particles: Particle[] = [];
    const mouse = { x: -2000, y: -2000 };

    function rebuild() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      canvas!.width  = w;
      canvas!.height = h;
      particles = buildSphere(w / 2, h / 2, Math.min(w, h) * 0.4);
    }

    function tick() {
      const w = canvas!.width;
      const h = canvas!.height;
      c.clearRect(0, 0, w, h);

      for (const p of particles) {
        const dx   = mouse.x - p.x;
        const dy   = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const t = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const f = t * t * REPEL_FORCE;
          p.vx -= (dx / dist) * f;
          p.vy -= (dy / dist) * f;
        }

        p.vx += (p.originX - p.x) * RETURN_SPEED;
        p.vy += (p.originY - p.y) * RETURN_SPEED;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x  += p.vx;
        p.y  += p.vy;

        c.beginPath();
        c.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        c.fillStyle = `rgba(${INK},${p.opacity.toFixed(2)})`;
        c.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() { mouse.x = -2000; mouse.y = -2000; }
    function onTouch(e: TouchEvent) {
      const rect = canvas!.getBoundingClientRect();
      const t = e.touches[0];
      if (t) { mouse.x = t.clientX - rect.left; mouse.y = t.clientY - rect.top; }
    }

    const ro = new ResizeObserver(rebuild);
    ro.observe(canvas);
    rebuild();
    tick();

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("touchend", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchend", onLeave);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className ?? "absolute inset-0 h-full w-full"}
      style={{ touchAction: "none" }}
    />
  );
}
