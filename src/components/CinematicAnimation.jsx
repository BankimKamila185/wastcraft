import React, { useEffect, useRef, useState, useCallback } from 'react';
import './CinematicAnimation.css';

// ── Config ─────────────────────────────────────────────
const N = 480;
const SECTION_VH = 600;
const BOUNDS = [0, 0.14, 0.28, 0.42, 0.57, 0.71, 0.86, 1.0];

const SCENE_COPY = [
  { headline: 'Every year, millions of tons\nof plastic waste are discarded.', sub: null, dark: false, align: 'bottom-left' },
  { headline: 'We intercept this waste\nat the source.', sub: 'Rivers  ·  Landfills  ·  Urban Centers', dark: false, align: 'bottom-left' },
  { headline: 'We saw waste\nas an opportunity.', sub: 'Collection  ·  Recycling  ·  Manufacturing  ·  Sustainable Products', dark: false, align: 'center' },
  { headline: 'We engineer discarded materials into\nhigh-performance building solutions.', sub: null, dark: false, align: 'bottom-center' },
  { headline: 'From a single recycled material\nto scalable sustainable infrastructure.', sub: null, dark: false, align: 'bottom-center' },
  { headline: 'Building the future\nof circular construction.', sub: null, dark: false, align: 'bottom-center' },
  { headline: 'Turning Waste Into Value', sub: 'Creating sustainable materials for a cleaner, smarter future.', dark: true, align: 'center', final: true },
];

function getScene(p) {
  for (let i = 0; i < BOUNDS.length - 1; i++) {
    if (p <= BOUNDS[i + 1]) {
      return { scene: i, sp: Math.max(0, Math.min(1, (p - BOUNDS[i]) / (BOUNDS[i + 1] - BOUNDS[i]))) };
    }
  }
  return { scene: 6, sp: 1 };
}

// ── 3D Projection Matrix ───────────────────────────────
function project3D(x, y, z, yaw, pitch, cx, cy) {
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);
  const cosP = Math.cos(pitch);
  const sinP = Math.sin(pitch);

  // Rotate Z (Yaw)
  const x1 = x * cosY - y * sinY;
  const y1 = x * sinY + y * cosY;

  // Rotate X (Pitch)
  const y2 = y1 * cosP - z * sinP;
  const z2 = y1 * sinP + z * cosP;

  return {
    x: cx + x1,
    y: cy + y2
  };
}

// ── 3D Shape Generators ───────────────────────────────
const makeCube = (cx, cy, cz, w, d, h) => {
  const hw = w / 2, hd = d / 2, hh = h / 2;
  const verts = [
    [cx - hw, cy - hd, cz - hh],
    [cx + hw, cy - hd, cz - hh],
    [cx + hw, cy + hd, cz - hh],
    [cx - hw, cy + hd, cz - hh],
    [cx - hw, cy - hd, cz + hh],
    [cx + hw, cy - hd, cz + hh],
    [cx + hw, cy + hd, cz + hh],
    [cx - hw, cy + hd, cz + hh]
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // bottom ring
    [4, 5], [5, 6], [6, 7], [7, 4], // top ring
    [0, 4], [1, 5], [2, 6], [3, 7]  // pillars
  ];
  return { verts, edges };
};

const makeRing = (r, cz, count = 48) => {
  const verts = [];
  const edges = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    verts.push([r * Math.cos(angle), r * Math.sin(angle), cz]);
    edges.push([i, (i + 1) % count]);
  }
  return { verts, edges };
};

const makeFlowLines = (w, h) => {
  const length = Math.max(w, h) * 0.8;
  const verts = [
    [-length, -length, 0], [0, 0, 0],
    [length, -length, 0], [0, 0, 0],
    [-length, length, 0], [0, 0, 0],
    [length, length, 0], [0, 0, 0]
  ];
  const edges = [[0, 1], [2, 3], [4, 5], [6, 7]];
  return { verts, edges };
};

const mergeShapes = (shapes) => {
  const verts = [];
  const edges = [];
  shapes.forEach(s => {
    const offset = verts.length;
    s.verts.forEach(v => verts.push(v));
    s.edges.forEach(e => edges.push([e[0] + offset, e[1] + offset]));
  });
  return { verts, edges };
};

function mapPartsToEdges(parts, shape) {
  const numEdges = shape.edges.length;
  parts.forEach((p, i) => {
    const edgeIdx = i % numEdges;
    const [i1, i2] = shape.edges[edgeIdx];
    const v1 = shape.verts[i1];
    const v2 = shape.verts[i2];
    const tEdge = (p.phase / (2 * Math.PI));
    p.staticX3 = v1[0] + (v2[0] - v1[0]) * tEdge;
    p.staticY3 = v1[1] + (v2[1] - v1[1]) * tEdge;
    p.staticZ3 = v1[2] + (v2[2] - v1[2]) * tEdge;
  });
}

function makeParticles(w, h) {
  return Array.from({ length: N }, (_, i) => ({
    id: i,
    x: Math.random() * w,
    y: Math.random() * h,
    homeX: Math.random() * w,
    homeY: Math.random() * h,
    tx: 0, ty: 0,
    tx3: 0, ty3: 0, tz3: 0,
    staticX3: 0, staticY3: 0, staticZ3: 0,
    r: 1.2 + Math.random() * 1.8,
    alpha: 0.45 + Math.random() * 0.45,
    phase: Math.random() * Math.PI * 2,
    speed: 0.04 + Math.random() * 0.028,
    type: i % 8 === 0 ? 'accent' : i % 4 === 0 ? 'green' : 'grey',
  }));
}

function precomputeStatic(parts, scene, w, h) {
  const n = parts.length;
  if (scene === 0) {
    const size = Math.min(w, h) * 0.45;
    parts.forEach(p => {
      p.staticX3 = (Math.random() - 0.5) * size;
      p.staticY3 = (Math.random() - 0.5) * size;
      p.staticZ3 = (Math.random() - 0.5) * size;
    });
  }
  else if (scene === 1) {
    const shape = makeFlowLines(w, h);
    mapPartsToEdges(parts, shape);
  }
  else if (scene === 2) {
    const shape = makeRing(Math.min(w, h) * 0.28, 0, 48);
    mapPartsToEdges(parts, shape);
  }
  else if (scene === 3) {
    const shape = makeCube(0, 0, 0, 160, 160, 24);
    mapPartsToEdges(parts, shape);
  }
  else if (scene === 4) {
    const shape = mergeShapes([
      makeCube(-160, 0, 0, 120, 120, 20),
      makeCube(0, 0, 0, 120, 120, 20),
      makeCube(160, 0, 0, 120, 120, 20)
    ]);
    mapPartsToEdges(parts, shape);
  }
  else if (scene === 5) {
    const shape = mergeShapes([
      makeCube(-90, -40, 50, 50, 50, 120),
      makeCube(90, -50, 70, 60, 60, 170),
      makeCube(0, 70, 30, 70, 70, 90)
    ]);
    mapPartsToEdges(parts, shape);
  }
  else if (scene === 6) {
    const size = Math.min(w, h) * 0.32;
    parts.forEach((p, i) => {
      const theta = (i / n) * Math.PI * 2 * 14;
      const r = size * (0.3 + 0.7 * (i / n));
      p.staticX3 = r * Math.cos(theta);
      p.staticY3 = r * Math.sin(theta);
      p.staticZ3 = (i / n - 0.5) * 80;
    });
  }
}

// ─────────────────────────────────────────────────────────
export default function CinematicAnimation() {
  const sectionRef   = useRef(null);
  const canvasRef    = useRef(null);
  const partsRef     = useRef([]);
  const frameRef     = useRef(null);
  const timeRef      = useRef(0);
  const sceneRef     = useRef(0);
  const sizeRef      = useRef({ w: 0, h: 0 });
  const prevSceneRef = useRef(-1);
  const readyRef     = useRef(false);
  const mouseRef     = useRef({ x: -1000, y: -1000 });
  const scrollProgRef = useRef(0);
  const spRef         = useRef(0);

  const [uiScene,    setUiScene]    = useState(0);
  const [uiSp,       setUiSp]       = useState(0);
  const [scrollProg, setScrollProg] = useState(0);

  // ── Canvas init ──────────────────────────────────────
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Use offsetWidth/Height, fall back to window size
    const w = canvas.clientWidth  || canvas.offsetWidth  || window.innerWidth;
    const h = canvas.clientHeight || canvas.offsetHeight || window.innerHeight;
    if (!w || !h) return;

    canvas.width  = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    const ctx = canvas.getContext('2d');
    // setTransform resets and sets — safe to call repeatedly
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Fill with solid white immediately so nothing bleeds through
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    sizeRef.current = { w, h };
    const parts = makeParticles(w, h);
    precomputeStatic(parts, sceneRef.current, w, h);
    partsRef.current = parts;
    readyRef.current = true;
  }, []);

  // ── Scroll tracking ──────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const onScroll = () => {
      if (!section) return;
      const rect      = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const prog = Math.max(0, Math.min(1, -rect.top / scrollable));
      setScrollProg(prog);
      scrollProgRef.current = prog;
      const { scene, sp } = getScene(prog);
      setUiScene(scene);
      setUiSp(sp);
      spRef.current = sp;
      sceneRef.current = scene;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Mouse tracking ───────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // ── Precompute static targets on scene change ────────
  useEffect(() => {
    if (uiScene === prevSceneRef.current) return;
    prevSceneRef.current = uiScene;
    const { w, h } = sizeRef.current;
    if (w > 0 && h > 0) {
      precomputeStatic(partsRef.current, uiScene, w, h);
    }
  }, [uiScene]);

  // ── Animation loop ───────────────────────────────────
  const loop = useCallback(() => {
    frameRef.current = requestAnimationFrame(loop);

    const canvas = canvasRef.current;
    if (!canvas || !readyRef.current) return;

    const ctx = canvas.getContext('2d');
    const { w, h } = sizeRef.current;
    if (!w || !h) return;

    const scene = sceneRef.current;
    timeRef.current += 0.016;
    const t  = timeRef.current;
    const cx = w / 2;
    const cy = h / 2;
    const n  = partsRef.current.length;
    const isDark = scene === 6;

    // ── Full clear + solid background every frame ──────
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = isDark ? '#0b1a10' : '#ffffff';
    ctx.fillRect(0, 0, w, h);

    // ── Glowing radial core in Scene 6 ─────────────────
    if (scene === 6) {
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.18);
      grad.addColorStop(0, 'rgba(163,204,95,0.22)');
      grad.addColorStop(0.5, 'rgba(79,165,106,0.06)');
      grad.addColorStop(1, 'rgba(11,26,16,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(w, h) * 0.18, 0, Math.PI * 2);
      ctx.fill();
    }

    // ── 3D Projection Settings ─────────────────────────
    const yaw = t * 0.08 + scrollProgRef.current * Math.PI * 1.5;
    const pitch = Math.PI / 5.5;

    // ── Draw Holographic Wireframe Blueprints ──────────
    let activeShape = null;
    if (scene === 1) activeShape = makeFlowLines(w, h);
    else if (scene === 2) activeShape = makeRing(Math.min(w, h) * 0.28, 0, 48);
    else if (scene === 3) activeShape = makeCube(0, 0, 0, 160, 160, 24);
    else if (scene === 4) {
      activeShape = mergeShapes([
        makeCube(-160, 0, 0, 120, 120, 20),
        makeCube(0, 0, 0, 120, 120, 20),
        makeCube(160, 0, 0, 120, 120, 20)
      ]);
    }
    else if (scene === 5) {
      activeShape = mergeShapes([
        makeCube(-90, -40, 50, 50, 50, 120),
        makeCube(90, -50, 70, 60, 60, 170),
        makeCube(0, 70, 30, 70, 70, 90)
      ]);
    }

    if (activeShape) {
      const screenVerts = activeShape.verts.map(v =>
        project3D(v[0], v[1], v[2], yaw, pitch, cx, cy)
      );

      ctx.beginPath();
      activeShape.edges.forEach(([i1, i2]) => {
        const p1 = screenVerts[i1];
        const p2 = screenVerts[i2];
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      });
      ctx.strokeStyle = isDark ? 'rgba(163,204,95,0.08)' : 'rgba(19,39,28,0.08)';
      ctx.lineWidth = 1.25;
      ctx.stroke();
    }

    // ── Dynamic constellation connection lines ─────────
    for (let i = 0; i < n; i += 2) {
      const p1 = partsRef.current[i];
      for (let j = i + 1; j < n; j += 3) {
        const p2 = partsRef.current[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 4225) { // 65px radius
          const d = Math.sqrt(distSq);
          const alpha = (1 - d / 65) * 0.16 * Math.min(p1.alpha, p2.alpha);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = isDark
            ? `rgba(163,204,95,${alpha * 0.4})`
            : `rgba(163,204,95,${alpha * 0.7})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }
    }

    // ── Draw connection lines for streams (scene 1) ────
    if (scene === 1) {
      for (let s = 0; s < 3; s++) {
        const pts = partsRef.current.filter((_, i) => i % 3 === s);
        if (pts.length < 2) continue;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        pts.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.strokeStyle = `rgba(163,204,95,0.12)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    // ── Draw arc for circle scene (scene 2) ────────────
    if (scene === 2) {
      const r0 = Math.min(w, h) * 0.285;
      for (let ai = 0; ai < 4; ai++) {
        const arcSpan = (Math.PI * 2 / 4) * 0.82;
        const arcGap  = (Math.PI * 2 / 4) * 0.18;
        const start   = ai * (arcSpan + arcGap) - Math.PI / 2;
        ctx.beginPath();
        ctx.arc(cx, cy, r0, start, start + arcSpan);
        ctx.strokeStyle = 'rgba(163,204,95,0.15)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(163,204,95,0.9)';
      ctx.fill();
    }

    // ── Skyline ground line ─────────────────────────────
    if (scene === 5) {
      ctx.strokeStyle = 'rgba(19,39,28,0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.87);
      ctx.lineTo(w, h * 0.87);
      ctx.stroke();
    }

    // ── Particles ───────────────────────────────────────
    partsRef.current.forEach((p, i) => {
      switch (scene) {
        case 0: {
          const driftX = Math.sin(t * 1.1 + p.phase) * 15;
          const driftY = Math.cos(t * 0.9 + p.phase * 1.3) * 15;
          const driftZ = Math.sin(t * 0.7 + p.phase * 1.6) * 15;
          p.tx3 = p.staticX3 + driftX;
          p.ty3 = p.staticY3 + driftY;
          p.tz3 = p.staticZ3 + driftZ;
          break;
        }
        case 1: {
          const pathIdx = i % 4;
          const length = Math.max(w, h) * 0.75;
          let x1 = 0, y1 = 0;
          if (pathIdx === 0) { x1 = -length; y1 = -length; }
          else if (pathIdx === 1) { x1 = length; y1 = -length; }
          else if (pathIdx === 2) { x1 = -length; y1 = length; }
          else { x1 = length; y1 = length; }
          const flowT = ((p.phase / (2 * Math.PI)) + t * 0.15) % 1.0;
          p.tx3 = x1 * (1 - flowT);
          p.ty3 = y1 * (1 - flowT);
          p.tz3 = 0;
          break;
        }
        case 2: {
          const radius = Math.min(w, h) * 0.28;
          const angle = (i / n) * Math.PI * 2 + t * 0.65;
          p.tx3 = radius * Math.cos(angle);
          p.ty3 = radius * Math.sin(angle);
          p.tz3 = Math.sin(t * 1.2 + p.phase) * 8;
          break;
        }
        case 3: case 4: case 5: {
          const driftX = Math.sin(t * 0.6 + p.phase) * 1.8;
          const driftY = Math.cos(t * 0.5 + p.phase * 1.3) * 1.8;
          const driftZ = Math.sin(t * 0.4 + p.phase * 1.7) * 1.8;
          p.tx3 = p.staticX3 + driftX;
          p.ty3 = p.staticY3 + driftY;
          p.tz3 = p.staticZ3 + driftZ;
          break;
        }
        case 6: {
          const progress = spRef.current;
          const swirlFactor = 1.0 - progress * 0.75;
          const angle = (i / n) * Math.PI * 28 + t * 1.1;
          const maxR = Math.min(w, h) * 0.32;
          const r = maxR * (i / n) * swirlFactor;
          p.tx3 = r * Math.cos(angle);
          p.ty3 = r * Math.sin(angle);
          p.tz3 = Math.sin(t * 1.8 + p.phase) * 20 * swirlFactor;
          break;
        }
        default: break;
      }

      // Project 3D target to 2D
      const screen = project3D(p.tx3, p.ty3, p.tz3, yaw, pitch, cx, cy);
      p.tx = screen.x;
      p.ty = screen.y;

      // Lerp
      p.x += (p.tx - p.x) * p.speed;
      p.y += (p.ty - p.y) * p.speed;

      // Mouse repulsion force field
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > -500 && my > -500) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        if (distSq < 16900) { // 130px radius
          const dist = Math.sqrt(distSq);
          if (dist > 0) {
            const force = (130 - dist) / 130;
            const push = force * 35 * (0.5 + p.alpha * 0.5);
            p.x += (dx / dist) * push;
            p.y += (dy / dist) * push;
          }
        }
      }

      // Colour by scene
      const a = p.alpha;
      let color;
      if (isDark) {
        color = p.type === 'accent'
          ? `rgba(163,204,95,${a})`
          : `rgba(90,165,120,${a * 0.7})`;
      } else if (scene <= 1) {
        color = p.type === 'accent'
          ? `rgba(163,204,95,${a})`
          : p.type === 'green'
          ? `rgba(80,130,90,${a})`
          : `rgba(155,150,140,${a})`;
      } else if (scene === 2) {
        color = p.type === 'accent'
          ? `rgba(163,204,95,${a})`
          : `rgba(60,140,95,${a})`;
      } else {
        // scenes 3-5: dark green material
        color = p.type === 'accent'
          ? `rgba(163,204,95,${a})`
          : `rgba(19,39,28,${a * 0.85})`;
      }

      const radius = p.r * (scene >= 3 ? 1.4 : 1.0);
      
      // Draw glowing halo for accent particles
      if (p.type === 'accent') {
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 3.0, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(163,204,95,${a * 0.08})`
          : `rgba(163,204,95,${a * 0.16})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });

    // ── Arc labels for scene 2 (drawn over particles) ──
    if (scene === 2) {
      const arcLabels = ['Collection', 'Recycling', 'Manufacturing', 'Sustainable\nProducts'];
      const r0 = Math.min(w, h) * 0.285;
      ctx.font = '600 12px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      arcLabels.forEach((label, ai) => {
        const midAngle = (ai / 4 + 0.125) * Math.PI * 2 - Math.PI / 2;
        const lx = cx + Math.cos(midAngle) * (r0 + 72);
        const ly = cy + Math.sin(midAngle) * (r0 + 72);
        label.split('\n').forEach((line, li, arr) => {
          ctx.fillStyle = 'rgba(19,39,28,0.68)';
          ctx.fillText(line, lx, ly + (li - (arr.length - 1) / 2) * 16);
        });
      });
    }
  }, []);

  // ── Mount & resize ───────────────────────────────────
  useEffect(() => {
    // Use rAF + small delay so CSS layout is complete
    const raf = requestAnimationFrame(() => {
      initCanvas();
      frameRef.current = requestAnimationFrame(loop);
    });

    const onResize = () => {
      initCanvas();
      // Re-precompute static targets for current scene
      const s = sceneRef.current;
      const { w, h } = sizeRef.current;
      if (w > 0 && h > 0) {
        precomputeStatic(partsRef.current, s, w, h);
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [initCanvas, loop]);

  // ── Text opacity ─────────────────────────────────────
  const textOpacity = (idx) => {
    if (idx !== uiScene) return 0;
    if (uiSp < 0.1)  return uiSp / 0.1;
    if (uiSp > 0.87) return (1 - uiSp) / 0.13;
    return 1;
  };

  const isDarkUI = uiScene === 6;

  return (
    <section
      ref={sectionRef}
      className="cin-section"
      id="how-it-works"
    >
      <div className={`cin-sticky ${isDarkUI ? 'cin-sticky--dark' : ''}`}>
        {/* Canvas fills the entire sticky viewport */}
        <canvas ref={canvasRef} className="cin-canvas" />

        {/* Subtle radial vignette */}
        <div className={`cin-vignette ${isDarkUI ? 'dark' : ''}`} />

        {/* ── Text overlays ── */}
        {SCENE_COPY.map((s, i) => {
          const op = textOpacity(i);
          if (op <= 0) return null;
          return (
            <div
              key={i}
              className={[
                'cin-text',
                `cin-text--${s.align || 'center'}`,
                s.final ? 'cin-text--final' : '',
                s.dark  ? 'cin-text--dark'  : '',
              ].join(' ')}
              style={{ opacity: op }}
            >
              {s.final && (
                <div className="cin-logo-wrap">
                  <img src="/logo-new.svg" alt="WasteCraft" className="cin-logo" />
                </div>
              )}
              {s.headline && (
                <h2 className="cin-headline">
                  {s.headline.split('\n').map((line, li, arr) => (
                    <React.Fragment key={li}>
                      {line}
                      {li < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h2>
              )}
              {s.sub && <p className="cin-sub">{s.sub}</p>}
            </div>
          );
        })}

        {/* ── Scene progress dots ── */}
        <div className={`cin-dots ${isDarkUI ? 'cin-dots--dark' : ''}`}>
          {SCENE_COPY.map((_, i) => (
            <div key={i} className={`cin-dot ${i === uiScene ? 'active' : ''}`} />
          ))}
        </div>

        {/* ── Scroll cue ── */}
        <div className={`cin-scroll-cue ${scrollProg < 0.04 ? 'visible' : ''} ${isDarkUI ? 'dark' : ''}`}>
          <span>Scroll to explore</span>
          <div className="cin-chevron" />
        </div>
      </div>
    </section>
  );
}
