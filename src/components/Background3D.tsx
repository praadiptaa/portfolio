"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh, Matrix4, Vector3, Quaternion, Color, AdditiveBlending } from "three";

function Nebula({ count = 400, reduced = false }: { count?: number; reduced?: boolean }) {
  const ref = useRef<any>(null);
  const pts = Math.max(40, reduced ? Math.min(count, 200) : count);
  const positions = useMemo(() => {
    const arr = new Float32Array(pts * 3);
    for (let i = 0; i < pts; i++) {
      const i3 = i * 3;
      arr[i3] = (Math.random() - 0.5) * 20; // x
      arr[i3 + 1] = (Math.random() - 0.5) * 10; // y
      arr[i3 + 2] = -Math.random() * 24 - 2; // z
    }
    return arr;
  }, [pts]);

  const colors = useMemo(() => {
    const pal = ['#7c3aed', '#60a5fa', '#a78bfa', '#f472b6', '#60f0c4'];
    const arr = new Float32Array(pts * 3);
    for (let i = 0; i < pts; i++) {
      const c = pal[Math.floor(Math.random() * pal.length)];
      const col = new Color(c);
      const i3 = i * 3;
      arr[i3] = col.r;
      arr[i3 + 1] = col.g;
      arr[i3 + 2] = col.b;
    }
    return arr;
  }, [pts]);

  useFrame((state, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.02;
      // subtle breathing scale
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.08) * 0.02);
    }
  });

  return (
    <group>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial vertexColors size={reduced ? 0.04 : 0.08} sizeAttenuation={true} transparent blending={AdditiveBlending} opacity={0.85} depthWrite={false} />
      </points>
      <mesh position={[1.2, -0.6, -6]} scale={reduced ? 1 : 1.6}>
        <icosahedronGeometry args={[2.6, 3]} />
        <meshStandardMaterial transparent opacity={0.12} emissive="#7c3aed" emissiveIntensity={0.28} color="#1f1145" roughness={0.9} metalness={0.05} />
      </mesh>
    </group>
  );
}

function ThemeMixer({ target, reduced }: { target: string; reduced: boolean }) {
  // Render Nebula deep-space as the primary scene. Keep FlowingNodes available for future themes.
  return (
    <group>
      <Nebula count={reduced ? 200 : 500} reduced={reduced} />
    </group>
  );
}

function FlowingNodes({ count = 60, opacity = 1, reduced = false }: { count?: number; opacity?: number; reduced?: boolean }) {
  const instances = Math.max(6, reduced ? Math.min(count, 24) : count);
  const positions = useMemo(() => {
    const arr: Array<[number, number, number]> = [];
    for (let i = 0; i < instances; i++) {
      arr.push([ (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4, -Math.random() * 6 - 1]);
    }
    return arr;
  }, [instances]);

  const velocities = useRef<Array<[number, number, number]>>(positions.map(() => [ (Math.random()-0.5)*0.02, (Math.random()-0.5)*0.02, -0.005 - Math.random()*0.01 ]));
  const meshRef = useRef<any>(null);
  const lineRef = useRef<any>(null);
  const mat = new Matrix4();
  const tempV = new Vector3();

  useFrame((state, delta) => {
    for (let i = 0; i < instances; i++) {
      const p = positions[i];
      const v = velocities.current[i];
      // simple flow field: slight oscillation & wrap-around
      p[0] += v[0] + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.0008;
      p[1] += v[1] + Math.cos(state.clock.elapsedTime * 0.4 + i) * 0.0009;
      p[2] += v[2];
      if (p[2] < -12) p[2] = -1 - Math.random()*2;
      // update instance matrix
      tempV.set(p[0], p[1], p[2]);
      mat.compose(tempV, new Quaternion(), new Vector3(0.06, 0.06, 0.06));
      meshRef.current.setMatrixAt(i, mat);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    // update connecting line positions
    if (lineRef.current) {
      const posArray = lineRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < instances; i++) {
        const idx = i * 3 * 2; // pairs
        const p = positions[i];
        // connect to next (wrap)
        const n = positions[(i+1)%instances];
        posArray[idx] = p[0]; posArray[idx+1] = p[1]; posArray[idx+2] = p[2];
        posArray[idx+3] = n[0]; posArray[idx+4] = n[1]; posArray[idx+5] = n[2];
      }
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // build static line geometry initial
  const linePositions = useMemo(() => new Float32Array(instances * 2 * 3), [instances]);

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, instances]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial transparent opacity={opacity * 0.95} color="#60a5fa" emissive="#2563eb" emissiveIntensity={0.06} />
      </instancedMesh>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial transparent opacity={Math.min(0.2, opacity * 0.6)} color="#7c3aed" />
      </lineSegments>
    </group>
  );
}

// Old themed variants (space/music) removed — FlowingNodes is used exclusively now.


export default function Background3D() {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState('space');

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    mq.addEventListener?.('change', (e) => setReduced(e.matches));
    window.addEventListener('resize', onResize);

    // Observe sections to change theme
    const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[];
    const mapIdToTheme = (id: string) => {
      if (!id) return 'space';
      if (id === 'home' || id === 'portfolio' || id === 'contact') return 'space';
      if (id === 'what' || id === 'skills') return 'music';
      return 'coding';
    };

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
          const id = entry.target.getAttribute('id') || '';
          setTheme(mapIdToTheme(id));
        }
      });
    }, { threshold: [0.45, 0.6] });

    sections.forEach(s => obs.observe(s));

    // debug
    (window as any).__BG3D = { isMobile: window.innerWidth < 768, reduced: mq.matches };

    return () => {
      mq.removeEventListener?.('change', () => {});
      window.removeEventListener('resize', onResize);
      obs.disconnect();
    };
  }, []);

  // Only skip rendering on server (not mounted); render on mobile too (user asked for full mobile 3D)
  if (!mounted) {
    return <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-zinc-900 to-zinc-800" />;
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Reduce DPR range to avoid excessive GPU load on some mobile devices */}
      <Canvas dpr={[0.75, 1.25]} camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <ThemeMixer target={theme} reduced={reduced} />
      </Canvas>
    </div>
  );
}
