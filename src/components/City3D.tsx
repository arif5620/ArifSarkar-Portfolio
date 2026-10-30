"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic pseudo-random so the skyline looks the same on every visit.
function rand(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

const towerVertex = /* glsl */ `
  attribute float aDelay;
  attribute float aSeed;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vWorld;
  varying float vSeed;
  varying float vHeight;
  void main() {
    float t = clamp((uTime - aDelay) / 1.6, 0.0, 1.0);
    float grow = 1.0 - pow(1.0 - t, 3.0);
    vec3 p = position;
    p.y *= grow;
    vec4 world = modelMatrix * instanceMatrix * vec4(p, 1.0);
    vUv = uv;
    vWorld = world.xyz;
    vSeed = aSeed;
    vHeight = instanceMatrix[1][1] * grow;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const towerFragment = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vWorld;
  varying float vSeed;
  varying float vHeight;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5); }
  void main() {
    vec3 gold = vec3(0.86, 0.68, 0.32);
    vec3 col = vec3(0.012, 0.012, 0.02);

    // Crisp edge lines with constant screen width.
    float e = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
    float edge = 1.0 - smoothstep(0.0, fwidth(e) * 1.6, e);
    col += gold * edge * 0.9;

    // Window grid: some windows lit, flickering slowly.
    vec2 cell = vec2(floor(vUv.x * 5.0), floor(vWorld.y * 2.2));
    vec2 f = vec2(fract(vUv.x * 5.0), fract(vWorld.y * 2.2));
    float win = step(0.25, f.x) * step(f.x, 0.75) * step(0.3, f.y) * step(f.y, 0.75);
    float lit = step(0.62, hash(cell + vSeed * 13.0 + floor(uTime * 0.15 + vSeed)));
    col += vec3(1.0, 0.82, 0.5) * win * lit * 0.55;

    // Sweeping radar pulse across the city.
    float r = length(vWorld.xz);
    float wave = mod(uTime * 9.0, 70.0);
    float pulse = exp(-pow((r - wave) * 0.6, 2.0));
    col += gold * pulse * 0.8;

    // Roof glow + fade toward the ground.
    float roof = smoothstep(vHeight - 0.25, vHeight, vWorld.y);
    col += gold * roof * 0.35;
    col *= mix(0.45, 1.0, smoothstep(0.0, 6.0, vWorld.y));

    gl_FragColor = vec4(col, 1.0);
  }
`;

const groundFragment = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorld;
  void main() {
    vec2 g = abs(fract(vWorld.xz / 4.0 - 0.5) - 0.5) / fwidth(vWorld.xz / 4.0);
    float line = 1.0 - min(min(g.x, g.y), 1.0);
    float r = length(vWorld.xz);
    float fade = 1.0 - smoothstep(10.0, 70.0, r);
    float wave = mod(uTime * 9.0, 70.0);
    float pulse = exp(-pow((r - wave) * 0.4, 2.0));
    vec3 gold = vec3(0.86, 0.68, 0.32);
    gl_FragColor = vec4(gold * (line * 0.35 + pulse * 0.25) * fade, 1.0);
  }
`;

const groundVertex = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vWorld = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

function Towers({ count }: { count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  const { geometry, matrices } = useMemo(() => {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    geo.translate(0, 0.5, 0); // base on the ground so towers grow upward
    const delays: number[] = [];
    const seeds: number[] = [];
    const mats: THREE.Matrix4[] = [];
    const span = Math.ceil(Math.sqrt(count));
    let i = 0;
    for (let x = 0; x < span && mats.length < count; x++) {
      for (let z = 0; z < span && mats.length < count; z++) {
        i++;
        if (x % 4 === 0 || z % 4 === 0) continue; // streets
        const px = (x - span / 2) * 2.2;
        const pz = (z - span / 2) * 2.2;
        const d = Math.hypot(px, pz);
        const center = Math.max(0, 1 - d / (span * 1.1));
        const h = 1 + rand(i) * 4 + center * center * 16 * (0.5 + rand(i + 7));
        const w = 1.1 + rand(i + 3) * 0.6;
        mats.push(new THREE.Matrix4().compose(
          new THREE.Vector3(px, 0, pz),
          new THREE.Quaternion(),
          new THREE.Vector3(w, h, w),
        ));
        delays.push(0.3 + d * 0.06 + rand(i + 11) * 0.5);
        seeds.push(rand(i + 5));
      }
    }
    geo.setAttribute("aDelay", new THREE.InstancedBufferAttribute(new Float32Array(delays), 1));
    geo.setAttribute("aSeed", new THREE.InstancedBufferAttribute(new Float32Array(seeds), 1));
    return { geometry: geo, matrices: mats };
  }, [count]);

  useEffect(() => {
    matrices.forEach((m, i) => mesh.current!.setMatrixAt(i, m));
    mesh.current!.instanceMatrix.needsUpdate = true;
  }, [matrices]);

  const mat = useRef<THREE.ShaderMaterial>(null);
  useFrame((s) => { mat.current!.uniforms.uTime.value = s.clock.elapsedTime; });

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, matrices.length]} frustumCulled={false}>
      <shaderMaterial ref={mat} vertexShader={towerVertex} fragmentShader={towerFragment} uniforms={uniforms} />
    </instancedMesh>
  );
}

function Ground() {
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const mat = useRef<THREE.ShaderMaterial>(null);
  useFrame((s) => { mat.current!.uniforms.uTime.value = s.clock.elapsedTime; });
  return (
    <mesh rotation-x={-Math.PI / 2}>
      <planeGeometry args={[160, 160]} />
      <shaderMaterial ref={mat} vertexShader={groundVertex} fragmentShader={groundFragment} uniforms={uniforms} />
    </mesh>
  );
}

function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (rand(i) - 0.5) * 80;
      a[i * 3 + 1] = rand(i + 1) * 30;
      a[i * 3 + 2] = (rand(i + 2) - 0.5) * 80;
    }
    return a;
  }, [count]);
  useFrame((_, dt) => {
    const p = ref.current!.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = p.getY(i) + dt * (0.4 + rand(i) * 0.8);
      if (y > 30) y = 0;
      p.setY(i, y);
    }
    p.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#e3c97e" size={0.12} transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function Rig({ small }: { small: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((s, dt) => {
    const { camera, pointer } = s;
    group.current!.rotation.y += dt * 0.04;
    const t = s.clock.elapsedTime;
    // Fly in from high above, then follow the pointer gently.
    const intro = Math.min(t / 4, 1);
    const ease = 1 - Math.pow(1 - intro, 3);
    camera.position.x += (pointer.x * 6 + 6 - camera.position.x) * 0.03;
    camera.position.y += (THREE.MathUtils.lerp(60, 16, ease) + pointer.y * 3 - camera.position.y) * 0.05;
    camera.position.z += (THREE.MathUtils.lerp(20, 42, ease) - camera.position.z) * 0.05;
    // On wide screens offset so the skyline sits right of the headline.
    camera.lookAt(s.size.width >= 1024 ? -9 : 0, 5, 0);
  });
  return (
    <group ref={group}>
      <Towers count={small ? 300 : 520} />
      <Ground />
      <Dust count={small ? 200 : 500} />
    </group>
  );
}

export default function City3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [small] = useState(() => window.innerWidth < 768);

  // Stop rendering once the hero scrolls away, to save battery and keep scrolling smooth.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(wrap.current!);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
    <Canvas
      frameloop={visible ? "always" : "never"}
      camera={{ position: [6, 60, 20], fov: 45, near: 0.1, far: 200 }}
      dpr={small ? 1 : [1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ scene }) => { scene.fog = new THREE.Fog("#000000", 30, 95); }}
    >
      <color attach="background" args={["#000000"]} />
      <Rig small={small} />
    </Canvas>
    </div>
  );
}
