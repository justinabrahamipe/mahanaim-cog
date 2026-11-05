'use client';
import { useEffect, useRef, useState } from 'react';
import { gold } from '@/theme/tokens';

// A hand-drawn gold thread that runs down one margin, sweeps across the page with a
// small curl in the gap between two sections, then carries on down the other margin.
// It draws itself as you scroll, with a bead at the tip. The route is built from the
// real section positions, so the crossings land in section padding, not over text.

// Small seeded PRNG so the scribble looks hand-drawn but is the same on every render.
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CROSSING_RISE = 70; // how far above/below a section boundary a crossing starts/ends
const START_Y = 96; // below the header

function scribblePath(width: number, height: number, boundaries: number[]) {
  const rand = seeded(11);
  const wobble = (amount: number) => (rand() - 0.5) * 2 * amount;
  const gutter = Math.max(6, (width - 1200) / 2 - 36);
  const left = gutter;
  const right = width - gutter;

  let x = left;
  let y = START_Y;
  let d = `M ${x} ${y}`;

  const descendTo = (toY: number) => {
    const span = toY - y;
    d += ` C ${x + wobble(12)} ${y + span * 0.33}, ${x + wobble(12)} ${y + span * 0.66}, ${x} ${toY}`;
    y = toY;
  };

  const crossings = boundaries.filter((b) => b > y + CROSSING_RISE * 2.5 && b < height - CROSSING_RISE * 2);
  for (const b of crossings) {
    const toX = x === left ? right : left;
    const dir = toX > x ? 1 : -1;
    descendTo(b - CROSSING_RISE);

    // Sweep in towards the middle of the gap…
    const cx = width / 2 + wobble(width * 0.12);
    const cy = b + wobble(6);
    d += ` C ${x} ${b - 12}, ${cx - dir * 180} ${b - 34 + wobble(10)}, ${cx} ${cy}`;
    // …curl once, like a pen looping back on itself…
    d += ` C ${cx + dir * 48} ${cy - 6}, ${cx + dir * 40} ${cy - 52}, ${cx + dir * 6} ${cy - 42}`;
    d += ` C ${cx - dir * 26} ${cy - 32}, ${cx - dir * 14} ${cy + 8}, ${cx + dir * 32} ${cy + 6}`;
    // …and on to the far margin.
    d += ` C ${cx + dir * 220} ${cy + 4}, ${toX} ${b + 18}, ${toX} ${b + CROSSING_RISE}`;
    x = toX;
    y = b + CROSSING_RISE;
  }

  descendTo(Math.max(y + 1, height - 40));
  return d;
}

interface Geometry {
  width: number;
  height: number;
  d: string;
}

export default function ScrollThread() {
  const svgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const inkRef = useRef<SVGPathElement>(null);
  const beadRef = useRef<SVGCircleElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  // Ink already laid down survives re-routing (images loading, resizes), so the pen never restarts.
  const drawnRef = useRef(0);

  // Route the thread around the sections, and re-route whenever the page changes size.
  useEffect(() => {
    const svg = svgRef.current;
    const main = svg?.parentElement;
    if (!svg || !main) return;

    const build = () => {
      const mainTop = main.getBoundingClientRect().top;
      const sections = Array.from(main.children).filter((el) => el !== svg);
      const boundaries = sections.slice(1).map((el) => el.getBoundingClientRect().top - mainTop);
      const width = main.clientWidth;
      const height = main.scrollHeight;
      setGeometry((prev) => {
        const d = scribblePath(width, height, boundaries);
        return prev && prev.d === d && prev.width === width && prev.height === height ? prev : { width, height, d };
      });
    };

    build();
    const observer = new ResizeObserver(build);
    observer.observe(main);
    return () => observer.disconnect();
  }, []);

  // Draw the thread down to the point level with 60% of the viewport.
  useEffect(() => {
    const svg = svgRef.current;
    const track = trackRef.current;
    const ink = inkRef.current;
    const bead = beadRef.current;
    if (!geometry || !svg || !track || !ink || !bead) return;

    const total = track.getTotalLength();
    const SAMPLES = 600;
    const samples = Array.from({ length: SAMPLES + 1 }, (_, i) => {
      const length = (total * i) / SAMPLES;
      return { length, point: track.getPointAtLength(length) };
    });
    ink.style.strokeDasharray = `${total}`;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // The pen chases the scroll position rather than jumping to it, so you see the
    // stroke being drawn. `drawn` is how much ink is down so far, in path length.
    let drawn = Math.min(drawnRef.current, total);
    let frame = 0;

    const targetLength = () => {
      const target = window.innerHeight * 0.6 - svg.getBoundingClientRect().top;
      return (samples.find((s) => s.point.y >= target) ?? samples[SAMPLES]).length;
    };

    const paint = () => {
      ink.style.strokeDashoffset = `${total - drawn}`;
      const tip = track.getPointAtLength(drawn);
      bead.setAttribute('cx', String(tip.x));
      bead.setAttribute('cy', String(tip.y));
      bead.style.opacity = drawn > 1 ? '1' : '0';
    };

    const update = () => {
      frame = 0;
      const goal = targetLength();
      const gap = goal - drawn;
      if (reduceMotion || Math.abs(gap) < 0.5) {
        drawn = goal;
      } else {
        // Ease towards the goal, but keep a minimum pace so long strokes still read as drawing.
        drawn += Math.sign(gap) * Math.min(Math.abs(gap), Math.max(Math.abs(gap) * 0.08, 6));
      }
      paint();
      drawnRef.current = drawn;
      if (drawn !== goal) frame = requestAnimationFrame(update);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    paint();
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [geometry]);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      width={geometry?.width ?? 0}
      height={geometry?.height ?? 0}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 5, pointerEvents: 'none', overflow: 'visible' }}
    >
      {geometry && (
        <>
          {/* Invisible copy used only to measure the route; nothing ahead of the pen is shown. */}
          <path ref={trackRef} d={geometry.d} fill="none" stroke="none" />
          <path
            ref={inkRef}
            d={geometry.d}
            fill="none"
            stroke={gold}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 0 3px rgba(242, 183, 5, 0.45))' }}
          />
          <circle ref={beadRef} r={4.5} fill={gold} style={{ filter: 'drop-shadow(0 0 6px rgba(242, 183, 5, 0.8))' }} />
        </>
      )}
    </svg>
  );
}
