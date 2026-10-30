"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic pseudo-random so the skyline looks the same on every visit.
function rand(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

type City = { matrices: THREE.Matrix4[]; delays: number[]; seeds: number[]; tops: THREE.Vector3[] };

function buildCity(count: number): City {
  const city: City = { matrices: [], delays: [], seeds: [], tops: [] };
  const span = Math.ceil(Math.sqrt(count));
  let i = 0;
  for (let x = 0; x < span; x++) {
    for (let z = 0; z < span; z++) {
      i++;
      if (x % 4 === 0 || z % 4 === 0) continue; // streets
      const px = (x - span / 2) * 2.2;
      const pz = (z - span / 2) * 2.2;
      const d = Math.hypot(px, pz);
      const center = Math.max(0, 1 - d / (span * 1.1));
      const h = 1 + rand(i) * 4 + center * center * 16 * (0.5 + rand(i + 7));
      const w = 1.1 + rand(i + 3) * 0.6;
      city.matrices.push(new THREE.Matrix4().compose(new THREE.Vector3(px, 0, pz), new THREE.Quaternion(), new THREE.Vector3(w, h, w)));
      const delay = 0.3 + d * 0.06 + rand(i + 11) * 0.5;
      city.delays.push(delay);
      city.seeds.push(rand(i + 5));
      if (h > 9) city.tops.push(new THREE.Vector3(px, h + 0.4, pz));
    }
  }
  return city;
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
    // Glassy body with a cool-to-warm vertical gradient.
    vec3 col = mix(vec3(0.01, 0.012, 0.025), vec3(0.05, 0.04, 0.03), smoothstep(0.0, 18.0, vWorld.y));

    float e = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
    float edge = 1.0 - smoothstep(0.0, fwidth(e) * 1.6, e);
    col += gold * edge * 0.9;

    vec2 cell = vec2(floor(vUv.x * 5.0), floor(vWorld.y * 2.2));
    vec2 f = vec2(fract(vUv.x * 5.0), fract(vWorld.y * 2.2));
    float win = step(0.25, f.x) * step(f.x, 0.75) * step(0.3, f.y) * step(f.y, 0.75);
    float lit = step(0.6, hash(cell + vSeed * 13.0 + floor(uTime * 0.15 + vSeed)));
    vec3 warm = mix(vec3(1.0, 0.82, 0.5), vec3(1.0, 0.95, 0.85), hash(cell + 3.1));
    col += warm * win * lit * 0.6;

    float r = length(vWorld.xz);
    float wave = mod(uTime * 9.0, 70.0);
    col += gold * exp(-pow((r - wave) * 0.6, 2.0)) * 0.8;

    col += gold * smoothstep(vHeight - 0.25, vHeight, vWorld.y) * 0.35;
    col *= mix(0.45, 1.0, smoothstep(0.0, 6.0, vWorld.y));
    gl_FragColor = vec4(col, 1.0);
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

// Rising gold dust, animated entirely on the GPU.
const dustVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.y = mod(p.y + uTime * (0.4 + aSeed * 0.8), 30.0);
    vAlpha = smoothstep(0.0, 4.0, p.y) * (1.0 - smoothstep(22.0, 30.0, p.y));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (1.5 + aSeed * 2.5) * (60.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const dustFragment = /* glsl */ `
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    gl_FragColor = vec4(0.95, 0.82, 0.5, (1.0 - smoothstep(0.2, 0.5, d)) * vAlpha * 0.9);
  }
`;

// Blinking aviation lights on the tallest roofs.
const beaconVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  varying float vOn;
  void main() {
    float appear = step(2.5 + aSeed * 1.5, uTime);
    vOn = appear * (0.25 + 0.75 * step(0.55, fract(uTime * 0.7 + aSeed)));
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 9.0 * (60.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const beaconFragment = /* glsl */ `
  varying float vOn;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = 1.0 - smoothstep(0.0, 0.18, d);
    float halo = (1.0 - smoothstep(0.1, 0.5, d)) * 0.5;
    gl_FragColor = vec4(vec3(1.0, 0.45, 0.25) * (core + halo) + core * 0.5, (core + halo) * vOn);
  }
`;

const beamVertex = /* glsl */ `
  varying float vDist;
  void main() {
    vDist = length(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const beamFragment = /* glsl */ `
  uniform float uOpacity;
  varying float vDist;
  void main() {
    float a = (1.0 - smoothstep(0.0, 55.0, vDist)) * uOpacity;
    gl_FragColor = vec4(0.95, 0.8, 0.45, a);
  }
`;

function useTime() {
  return useMemo(() => ({ uTime: { value: 0 } }), []);
}

function Towers({ city }: { city: City }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useTime();

  const geometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    geo.translate(0, 0.5, 0); // base on the ground so towers grow upward
    geo.setAttribute("aDelay", new THREE.InstancedBufferAttribute(new Float32Array(city.delays), 1));
    geo.setAttribute("aSeed", new THREE.InstancedBufferAttribute(new Float32Array(city.seeds), 1));
    return geo;
  }, [city]);

  useEffect(() => {
    city.matrices.forEach((m, i) => mesh.current!.setMatrixAt(i, m));
    mesh.current!.instanceMatrix.needsUpdate = true;
  }, [city]);

  useFrame((s) => { mat.current!.uniforms.uTime.value = s.clock.elapsedTime; });

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, city.matrices.length]} frustumCulled={false}>
      <shaderMaterial ref={mat} vertexShader={towerVertex} fragmentShader={towerFragment} uniforms={uniforms} />
    </instancedMesh>
  );
}

function Ground() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useTime();
  useFrame((s) => { mat.current!.uniforms.uTime.value = s.clock.elapsedTime; });
  return (
    <mesh rotation-x={-Math.PI / 2}>
      <planeGeometry args={[160, 160]} />
      <shaderMaterial ref={mat} vertexShader={groundVertex} fragmentShader={groundFragment} uniforms={uniforms} />
    </mesh>
  );
}

function Points({ positions, seeds, vertex, fragment }: { positions: Float32Array; seeds: Float32Array; vertex: string; fragment: string }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useTime();
  useFrame((s) => { mat.current!.uniforms.uTime.value = s.clock.elapsedTime; });
  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Dust({ count }: { count: number }) {
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand(i) - 0.5) * 80;
      positions[i * 3 + 1] = rand(i + 1) * 30;
      positions[i * 3 + 2] = (rand(i + 2) - 0.5) * 80;
      seeds[i] = rand(i + 9);
    }
    return { positions, seeds };
  }, [count]);
  return <Points positions={positions} seeds={seeds} vertex={dustVertex} fragment={dustFragment} />;
}

function Beacons({ tops }: { tops: THREE.Vector3[] }) {
  const { positions, seeds } = useMemo(() => ({
    positions: new Float32Array(tops.flatMap((t) => [t.x, t.y, t.z])),
    seeds: new Float32Array(tops.map((_, i) => rand(i + 31))),
  }), [tops]);
  return <Points positions={positions} seeds={seeds} vertex={beaconVertex} fragment={beaconFragment} />;
}

// Searchlights sweeping the night sky from the tallest towers.
function Beams({ tops }: { tops: THREE.Vector3[] }) {
  const group = useRef<THREE.Group>(null);
  const mats = useRef<THREE.ShaderMaterial[]>([]);
  const sources = useMemo(() => [...tops].sort((a, b) => b.y - a.y).slice(0, 3), [tops]);
  const geometry = useMemo(() => {
    const g = new THREE.ConeGeometry(5, 55, 24, 1, true);
    g.translate(0, -27.5, 0); // tip at the origin
    g.rotateX(Math.PI); // open end points to the sky
    return g;
  }, []);
  const uniforms = useMemo(() => sources.map(() => ({ uOpacity: { value: 0 } })), [sources]);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    group.current!.children.forEach((beam, i) => {
      beam.rotation.z = Math.sin(t * 0.35 + i * 2.1) * 0.45;
      beam.rotation.x = Math.cos(t * 0.28 + i * 1.3) * 0.3;
      mats.current[i].uniforms.uOpacity.value = THREE.MathUtils.smoothstep(t, 3, 5) * 0.16;
    });
  });

  return (
    <group ref={group}>
      {sources.map((p, i) => (
        <mesh key={i} position={p} geometry={geometry}>
          <shaderMaterial
            ref={(m) => { if (m) mats.current[i] = m; }}
            vertexShader={beamVertex}
            fragmentShader={beamFragment}
            uniforms={uniforms[i]}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function Rig({ small }: { small: boolean }) {
  const group = useRef<THREE.Group>(null);
  const city = useMemo(() => buildCity(small ? 300 : 520), [small]);

  useFrame((s, dt) => {
    const { camera, pointer } = s;
    group.current!.rotation.y += dt * 0.035;
    // Cinematic fly-in from high above, then gently follow the pointer.
    const intro = Math.min(s.clock.elapsedTime / 5, 1);
    const ease = 1 - Math.pow(1 - intro, 3);
    camera.position.x += (pointer.x * 6 + 6 - camera.position.x) * 0.03;
    camera.position.y += (THREE.MathUtils.lerp(65, 15, ease) + pointer.y * 3 - camera.position.y) * 0.05;
    camera.position.z += (THREE.MathUtils.lerp(18, 42, ease) - camera.position.z) * 0.05;
    // On wide screens offset so the skyline sits right of the headline.
    camera.lookAt(s.size.width >= 1024 ? -9 : 0, 5, 0);
  });

  return (
    <group ref={group}>
      <Towers city={city} />
      <Ground />
      <Beacons tops={city.tops} />
      <Beams tops={city.tops} />
      <Dust count={small ? 220 : 520} />
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
        camera={{ position: [6, 65, 18], fov: 45, near: 0.1, far: 200 }}
        dpr={small ? 1 : [1, 1.5]}
        gl={{ antialias: !small, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#000000"]} />
        <Rig small={small} />
      </Canvas>
    </div>
  );
}
