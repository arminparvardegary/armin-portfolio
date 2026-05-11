'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { Theme } from '@/lib/useTheme';

const COL_DARK = { ink: '#f4f1ec', accent: '#ff3d00' };
const COL_LIGHT = { ink: '#0a0a0a', accent: '#ff3d00' };

const ColorCtx = createContext(COL_DARK);
const useCol = () => useContext(ColorCtx);

const OFFSET = 11;

type Drift = { spin?: { x?: number; y?: number; z?: number }; float?: { amp: number; speed: number; offset: number; baseY: number } };

function getMaterials(group: THREE.Object3D): THREE.Material[] {
  const out: THREE.Material[] = [];
  group.traverse((obj) => {
    const m = (obj as THREE.Mesh).material;
    if (!m) return;
    if (Array.isArray(m)) out.push(...m);
    else out.push(m);
  });
  return out;
}

function setOpacity(group: THREE.Object3D, v: number) {
  for (const m of getMaterials(group)) m.opacity = v;
}

function InkMat(props?: Partial<THREE.MeshStandardMaterialParameters>) {
  const c = useCol();
  return <meshStandardMaterial color={c.ink} roughness={0.55} metalness={0.05} transparent {...props} />;
}

function AccentMat(props?: Partial<THREE.MeshStandardMaterialParameters>) {
  const c = useCol();
  return (
    <meshStandardMaterial
      color={c.accent}
      emissive={c.accent}
      emissiveIntensity={0.4}
      roughness={0.4}
      metalness={0}
      transparent
      {...props}
    />
  );
}

/* ─── 0 Intro: empty (text + grain only) ──────────────────── */
function IntroGroup({ groupRef }: { groupRef: (g: THREE.Group | null) => void }) {
  return <group ref={groupRef} />;
}

/* ─── 1 About: "T" ────────────────────────────────────────── */
function AboutGroup({ groupRef }: { groupRef: (g: THREE.Group | null) => void }) {
  return (
    <group ref={groupRef} position={[3.4, -0.4, 0]} userData={{ groupSpin: 0.14 }}>
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[2.4, 0.6, 0.6]} />
        <InkMat roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[0.6, 2.4, 0.6]} />
        <InkMat roughness={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0, 0]} userData={{ spin: { z: 0.15 } } satisfies Drift}>
        <torusGeometry args={[1.7, 0.04, 16, 128]} />
        <AccentMat />
      </mesh>
    </group>
  );
}

/* ─── 2 Stack: floating layered plates ────────────────────── */
function StackGroup({ groupRef }: { groupRef: (g: THREE.Group | null) => void }) {
  const layers = [0, 1, 2, 3, 4];
  return (
    <group ref={groupRef} position={[-3.0, -0.2, 0]} rotation={[0.1, 0.4, 0.05]} userData={{ groupSpin: 0.08 }}>
      {layers.map((i) => {
        const baseY = (i - 2) * 0.34;
        const drift: Drift = {
          float: { amp: 0.05, speed: 0.45 + i * 0.08, offset: i * 0.6, baseY },
        };
        return (
          <mesh key={i} position={[i * 0.05, baseY, -i * 0.04]} userData={drift}>
            <boxGeometry args={[1.5 - i * 0.06, 0.05, 1.0 - i * 0.06]} />
            {i === 2 ? <AccentMat /> : <InkMat />}
          </mesh>
        );
      })}
    </group>
  );
}

/* ─── Work shapes ─────────────────────────────────────────── */
function HaloRings() {
  return (
    <group rotation={[Math.PI / 2.4, 0, 0]} userData={{ spin: { z: 0.18 } } satisfies Drift}>
      {[0.32, 0.5, 0.7].map((r, i) => (
        <mesh key={i}>
          <torusGeometry args={[r, 0.022, 16, 96]} />
          {i === 1 ? <AccentMat /> : <InkMat />}
        </mesh>
      ))}
    </group>
  );
}

function DriftWave() {
  const c = useCol();
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const m = meshRef.current;
    if (!m || !m.visible) return;
    const geo = m.geometry as THREE.PlaneGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i, Math.sin(x * 2.4 + t) * 0.18 + Math.cos(y * 1.8 + t * 0.7) * 0.12);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.6, 0, 0.05]}>
      <planeGeometry args={[1.4, 1.2, 28, 22]} />
      <meshStandardMaterial
        color={c.accent}
        emissive={c.accent}
        emissiveIntensity={0.3}
        roughness={0.4}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
}

function FoldShape() {
  return (
    <group rotation={[-0.2, 0, 0]}>
      <mesh position={[-0.4, 0, 0]} rotation={[0, -0.55, 0]}>
        <boxGeometry args={[0.85, 1.15, 0.04]} />
        <InkMat />
      </mesh>
      <mesh position={[0.4, 0, 0]} rotation={[0, 0.55, 0]}>
        <boxGeometry args={[0.85, 1.15, 0.04]} />
        <InkMat />
      </mesh>
      <mesh position={[0, -0.4, 0.18]}>
        <boxGeometry args={[0.04, 0.04, 0.5]} />
        <AccentMat />
      </mesh>
    </group>
  );
}

function Tower() {
  const floors = [
    { w: 0.9, h: 0.34, accent: false },
    { w: 0.78, h: 0.28, accent: true },
    { w: 0.66, h: 0.26, accent: false },
    { w: 0.52, h: 0.22, accent: false },
    { w: 0.4, h: 0.18, accent: false },
  ];
  let y = -0.6;
  return (
    <group userData={{ spin: { y: 0.18 } } satisfies Drift}>
      {floors.map((f, i) => {
        const center = y + f.h / 2;
        y += f.h + 0.04;
        return (
          <mesh key={i} position={[0, center, 0]}>
            <boxGeometry args={[f.w, f.h, f.w]} />
            {f.accent ? <AccentMat /> : <InkMat />}
          </mesh>
        );
      })}
    </group>
  );
}

/* ─── 3 Work group ────────────────────────────────────────── */
function WorkGroup({
  groupRef,
  hovered,
}: {
  groupRef: (g: THREE.Group | null) => void;
  hovered: number | null;
}) {
  const itemRefs = useRef<(THREE.Group | null)[]>([]);
  const positions: [number, number, number][] = [
    [-4.6, 2.2, -0.5],
    [4.6, 2.0, -0.5],
    [-4.4, -2.2, -0.5],
    [4.4, -2.4, -0.5],
  ];

  useGSAP(
    () => {
      itemRefs.current.forEach((g, i) => {
        if (!g) return;
        const isHot = hovered === i;
        gsap.to(g.position, {
          z: isHot ? 1.6 : -0.5,
          duration: 0.7,
          ease: 'power3.out',
          overwrite: 'auto',
        });
        gsap.to(g.scale, {
          x: isHot ? 1.4 : 1,
          y: isHot ? 1.4 : 1,
          z: isHot ? 1.4 : 1,
          duration: 0.7,
          ease: 'power3.out',
          overwrite: 'auto',
        });
        const targetOpacity = hovered === null ? 0.85 : isHot ? 1 : 0.18;
        gsap.to(getMaterials(g), {
          opacity: targetOpacity,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    },
    { dependencies: [hovered] }
  );

  return (
    <group ref={groupRef}>
      <group ref={(g) => { itemRefs.current[0] = g; }} position={positions[0]}>
        <HaloRings />
      </group>
      <group ref={(g) => { itemRefs.current[1] = g; }} position={positions[1]}>
        <DriftWave />
      </group>
      <group ref={(g) => { itemRefs.current[2] = g; }} position={positions[2]}>
        <FoldShape />
      </group>
      <group ref={(g) => { itemRefs.current[3] = g; }} position={positions[3]}>
        <Tower />
      </group>
    </group>
  );
}

/* ─── 4 Contact: paper plane ──────────────────────────────── */
function ContactGroup({ groupRef }: { groupRef: (g: THREE.Group | null) => void }) {
  const planeGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-1.2, -0.55);
    s.lineTo(1.3, 0);
    s.lineTo(-0.55, 0.45);
    s.lineTo(-0.35, 0.05);
    s.lineTo(-1.2, -0.55);
    const geo = new THREE.ExtrudeGeometry(s, { depth: 0.04, bevelEnabled: false });
    geo.center();
    return geo;
  }, []);

  const foldGeo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-1.2, -0.55);
    s.lineTo(-0.35, 0.05);
    s.lineTo(-0.05, -0.35);
    s.lineTo(-1.2, -0.55);
    const geo = new THREE.ExtrudeGeometry(s, { depth: 0.04, bevelEnabled: false });
    geo.center();
    return geo;
  }, []);

  return (
    <group
      ref={groupRef}
      position={[3.6, -0.2, 0]}
      rotation={[-0.2, -0.4, -0.12]}
      userData={{ groupSpin: -0.12 }}
    >
      <mesh geometry={planeGeo}>
        <InkMat side={THREE.DoubleSide} roughness={0.5} />
      </mesh>
      <mesh geometry={foldGeo} position={[0, 0, 0.045]}>
        <AccentMat side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ─── Lights ───────────────────────────────────────────────── */
function Lights({ theme }: { theme: Theme }) {
  return (
    <>
      <ambientLight intensity={theme === 'light' ? 0.6 : 0.45} />
      <directionalLight position={[6, 9, 7]} intensity={0.9} />
      <directionalLight position={[-6, 2, 4]} intensity={0.4} color={theme === 'light' ? '#ffe6c2' : '#a3b8ff'} />
      <directionalLight position={[0, -4, -6]} intensity={0.3} />
    </>
  );
}

/* ─── Frame driver ─────────────────────────────────────────── */
function FrameDriver({ groups }: { groups: React.MutableRefObject<(THREE.Group | null)[]> }) {
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 1.2;
      target.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.7;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const cam = state.camera;
    cam.position.x += (target.current.x - cam.position.x) * 0.045;
    cam.position.y += (target.current.y - cam.position.y) * 0.045;
    cam.lookAt(0, 0, 0);

    for (const g of groups.current) {
      if (!g || !g.visible) continue;
      const gs = g.userData.groupSpin as number | undefined;
      if (gs) g.rotation.y += gs * dt;
      g.traverse((child) => {
        const u = (child as THREE.Object3D).userData as Drift;
        if (u.spin) {
          if (u.spin.x) child.rotation.x += u.spin.x * dt;
          if (u.spin.y) child.rotation.y += u.spin.y * dt;
          if (u.spin.z) child.rotation.z += u.spin.z * dt;
        }
        if (u.float) {
          child.position.y = u.float.baseY + Math.sin(t * u.float.speed + u.float.offset) * u.float.amp;
        }
      });
    }
  });

  return null;
}

/* ─── Transition controller (interrupt safe) ─────────────── */
function Transitions({
  section,
  groups,
}: {
  section: number;
  groups: React.MutableRefObject<(THREE.Group | null)[]>;
}) {
  const prev = useRef(section);
  const initialized = useRef(false);
  const target = useRef(section);

  useGSAP(
    () => {
      if (!initialized.current) {
        groups.current.forEach((g, i) => {
          if (!g) return;
          g.position.y = i === 0 ? 0 : -OFFSET;
          g.visible = i === 0;
          setOpacity(g, i === 0 ? 1 : 0);
        });
        initialized.current = true;
        prev.current = section;
        target.current = section;
        return;
      }

      const from = prev.current;
      const to = section;
      if (from === to) return;

      groups.current.forEach((g) => {
        if (!g) return;
        gsap.killTweensOf(g.position);
        gsap.killTweensOf(getMaterials(g));
      });

      groups.current.forEach((g, i) => {
        if (!g || i === from || i === to) return;
        g.visible = false;
        g.position.y = -OFFSET;
        setOpacity(g, 0);
      });

      const fromG = groups.current[from];
      const toG = groups.current[to];
      if (!fromG || !toG) return;

      const dir = to > from ? 1 : -1;

      if (!toG.visible) {
        toG.position.y = -OFFSET * dir;
        setOpacity(toG, 0);
      }
      toG.visible = true;

      prev.current = to;
      target.current = to;

      const fromMats = getMaterials(fromG);
      const toMats = getMaterials(toG);

      gsap
        .timeline({
          defaults: { duration: 1.1, ease: 'power3.inOut' },
          onComplete: () => {
            if (target.current !== to) return;
            fromG.visible = false;
            fromG.position.y = -OFFSET;
            setOpacity(fromG, 0);
            toG.position.y = 0;
            setOpacity(toG, 1);
          },
        })
        .to(fromG.position, { y: OFFSET * dir }, 0)
        .to(toG.position, { y: 0 }, 0)
        .to(fromMats, { opacity: 0, duration: 0.95, ease: 'power2.out' }, 0)
        .to(toMats, { opacity: 1, duration: 0.95, ease: 'power2.in' }, 0.12);
    },
    { dependencies: [section] }
  );

  return null;
}

export default function Scene({
  section,
  hoveredWork,
  theme,
}: {
  section: number;
  hoveredWork: number | null;
  theme: Theme;
}) {
  const groups = useRef<(THREE.Group | null)[]>([]);
  const colors = useMemo(() => (theme === 'light' ? COL_LIGHT : COL_DARK), [theme]);

  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ColorCtx.Provider value={colors}>
        <Lights theme={theme} />

        {/* Reversed: scroll-order 0 (top) is Contact, scroll-order 4 (bottom) is the Origin */}
        <ContactGroup groupRef={(g) => { groups.current[0] = g; }} />
        <WorkGroup groupRef={(g) => { groups.current[1] = g; }} hovered={hoveredWork} />
        <StackGroup groupRef={(g) => { groups.current[2] = g; }} />
        <AboutGroup groupRef={(g) => { groups.current[3] = g; }} />
        <IntroGroup groupRef={(g) => { groups.current[4] = g; }} />

        <Transitions section={section} groups={groups} />
        <FrameDriver groups={groups} />
      </ColorCtx.Provider>
    </Canvas>
  );
}
