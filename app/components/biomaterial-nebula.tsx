"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { MolecularCanvasProps } from "./molecular-scene";

type Atom = {
  position: THREE.Vector3;
  center: THREE.Vector3;
  meta: [number, number, number, number];
  radius: number;
  color: THREE.Color;
};
type Link = { from: number; to: number; kind: number; color: THREE.Color };
type Network = { atoms: Atom[]; links: Link[] };
type ChapterSample = { chapter: number; progress: number };
const TAU = Math.PI * 2;
// These indices are also the GPU morph identifiers.
const CHAPTERS = [
  "inicio",
  "sobre",
  "por-que-biocrab",
  "innovacion",
  "del-residuo-al-biomaterial",
  "investigacion",
  "metodologia",
  "recorrido",
  "comparacion",
  "aplicaciones-futuras",
  "vision-futura",
  "impacto-potencial",
  "gomitas",
  "equipo",
  "contacto",
] as const;

function seeded(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = Math.imul(value ^ (value >>> 15), 1 | value);
    result ^= result + Math.imul(result ^ (result >>> 7), 61 | result);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

/** Connected, puckered sugar-ring motifs: a conceptual biopolymer network. */
function makeNetwork(width: number, height: number): Network {
  const random = seeded(71938);
  const atoms: Atom[] = [];
  const links: Link[] = [];
  const mobile = width < height;
  const strands = mobile ? 6 : 9;
  const units = mobile ? 10 : 13;
  const chains: number[][] = [];
  for (let side = 0; side < 2; side++) {
    const direction = side === 0 ? -1 : 1;
    const tint = new THREE.Color(side === 0 ? "#37d9af" : "#3989f7");
    const pale = new THREE.Color(side === 0 ? "#a5f4d6" : "#8ccfff");
    for (let strand = 0; strand < strands; strand++) {
      const phase = random() * TAU;
      const depth = -3.9 + (strand / (strands - 1)) * 6.3;
      const start = random() * 0.13;
      const extent = 0.67 + random() * 0.25;
      const lane = (strand / (strands - 1) - 0.5) * 0.2;
      const radius =
        (0.19 + random() * 0.075) * (strand === strands - 1 ? 1.24 : 1);
      const path = (t: number) => {
        const progress = start + t * extent;
        return new THREE.Vector3(
          direction *
            width *
            (0.32 + 0.12 * Math.sin(progress * 4.8 + phase * 0.16)) +
            width * (lane * 0.48 + Math.sin(progress * 11 + phase) * 0.026),
          direction * height * (0.51 - progress * 0.94) +
            height * (Math.cos(progress * 7 + phase) * 0.045 + lane * 0.2),
          depth + Math.sin(progress * 9 + phase) * 0.72,
        );
      };
      const chain: number[] = [];
      let previous: number | undefined;
      for (let unit = 0; unit < units; unit++) {
        const t = unit / (units - 1);
        const center = path(t);
        const tangent = path(t + 0.005)
          .sub(path(t - 0.005))
          .normalize();
        const normal = new THREE.Vector3(
          Math.sin(t * 5 + phase) * 0.28,
          Math.cos(t * 4 + phase) * 0.24,
          1,
        ).normalize();
        const cross = normal.clone().cross(tangent).normalize();
        const add = (
          position: THREE.Vector3,
          atomRadius: number,
          color: THREE.Color,
          branch = 0,
        ) => {
          atoms.push({
            position,
            center,
            radius: atomRadius,
            color,
            meta: [direction, strand / (strands - 1), t, branch],
          });
          return atoms.length - 1;
        };
        const ring: number[] = [];
        for (let vertex = 0; vertex < 6; vertex++) {
          const angle = (vertex / 6) * TAU;
          const position = center
            .clone()
            .addScaledVector(tangent, Math.cos(angle) * radius)
            .addScaledVector(cross, Math.sin(angle) * radius * 0.9)
            .addScaledVector(normal, vertex % 2 === 0 ? 0.045 : -0.045);
          ring.push(
            add(
              position,
              (vertex === 2 ? 0.059 : 0.039) * (depth > 0 ? 1.1 : 0.9),
              vertex === 2 ? tint : pale.clone().lerp(tint, random() * 0.45),
            ),
          );
        }
        chain.push(ring[0]);
        ring.forEach((atom, vertex) => {
          links.push({
            from: atom,
            to: ring[(vertex + 1) % 6],
            kind: 0,
            color: tint,
          });
        });
        if (previous !== undefined) {
          const bridge = add(
            atoms[previous].position
              .clone()
              .lerp(atoms[ring[3]].position, 0.5)
              .addScaledVector(normal, 0.1),
            0.045,
            tint,
          );
          links.push(
            { from: previous, to: bridge, kind: 1, color: tint },
            { from: bridge, to: ring[3], kind: 1, color: tint },
          );
        }
        previous = ring[0];
        const branch = add(
          atoms[ring[2]].position
            .clone()
            .addScaledVector(cross, radius * 0.8)
            .addScaledVector(normal, 0.11),
          0.033,
          pale,
          1,
        );
        const end = add(
          atoms[branch].position
            .clone()
            .addScaledVector(tangent, radius * 0.53)
            .addScaledVector(normal, 0.13),
          side === 0 ? 0.058 : 0.052,
          tint,
          1,
        );
        links.push(
          { from: ring[2], to: branch, kind: 0, color: tint },
          { from: branch, to: end, kind: 0, color: tint },
        );
      }
      const previousChain = chains[chains.length - 1];
      if (strand > 0 && previousChain) {
        chain.forEach((atom, index) => {
          if (index % 3 === 1 && previousChain[index])
            links.push({
              from: atom,
              to: previousChain[index],
              kind: 2,
              color: tint,
            });
        });
      }
      chains.push(chain);
    }
  }
  return { atoms, links };
}

/** DOM sampling stays outside render frames and runs at most eight times/sec. */
function useChapterSample(active: boolean) {
  const sample = useRef<ChapterSample>({ chapter: 0, progress: 0 });
  useEffect(() => {
    if (!active) return;
    const sections = CHAPTERS.map((id) => document.getElementById(id));
    let timer: ReturnType<typeof setTimeout> | undefined;
    const measure = () => {
      timer = undefined;
      const readingLine = window.innerHeight * 0.48;
      const declared = CHAPTERS.indexOf(
        document.documentElement.dataset
          .activeChapter as (typeof CHAPTERS)[number],
      );
      let chapter = Math.max(0, declared);
      let preceding = chapter;
      let containsReadingLine = false;
      // contacto is nested in equipo and deliberately takes precedence.
      sections.forEach((section, index) => {
        if (!section) return;
        const bounds = section.getBoundingClientRect();
        if (bounds.top <= readingLine) preceding = index;
        if (bounds.top <= readingLine && bounds.bottom > readingLine) {
          chapter = index;
          containsReadingLine = true;
        }
      });
      if (!containsReadingLine) chapter = preceding;
      const bounds = sections[chapter]?.getBoundingClientRect();
      const progress = bounds
        ? THREE.MathUtils.clamp(
            (readingLine - bounds.top) / Math.max(1, bounds.height),
            0,
            1,
          )
        : 0;
      sample.current = { chapter, progress };
      document.documentElement.dataset.nebulaChapter = CHAPTERS[chapter];
      document.documentElement.dataset.nebulaProgress = progress.toFixed(3);
    };
    const schedule = () => {
      timer ??= setTimeout(measure, 120);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (timer) clearTimeout(timer);
    };
  }, [active]);
  return sample;
}

// Atoms, bond endpoints and halos share exactly the same GPU deformation.
const morphShader = /* glsl */ `
  uniform float uTime;
  uniform float uFrom;
  uniform float uTo;
  uniform float uBlend;
  uniform float uProgress;
  uniform float uPreviousProgress;
  uniform float uWidth;
  uniform float uHeight;
  const float TAU = 6.28318530718;
  vec3 chapterPosition(vec3 center, vec3 local, vec4 m, float chapter, float q) {
    float side = m.x, lane = m.y, t = m.z;
    float phase = lane * TAU + side * 0.8;
    float clock = uTime * 0.12;
    vec3 c = center, detail = local;
    if (chapter < 0.5) {
      // Camera sweep through two living, toroidal material currents.
      c.x += sin(t * TAU + phase + clock) * uWidth * 0.045;
      c.y += cos(t * 7.0 + phase - clock) * uHeight * 0.045;
      c.z += sin(t * 5.0 + phase + clock) * 1.15 + q * 1.4;
      detail *= 0.82 + smoothstep(0.0, 0.45, q) * 0.18;
    } else if (chapter < 1.5) {
      // Disconnected rings settle into progressively linked strands.
      float scatter = 1.0 - smoothstep(0.08, 0.9, q);
      c += vec3(sin(t * 37.0 + phase) * uWidth * 0.19,
        cos(t * 29.0 + phase) * uHeight * 0.22,
        sin(t * 19.0 - phase) * 3.3) * scatter;
      c.z += sin(clock + phase + t * 4.0) * 0.45;
    } else if (chapter < 2.5 || (chapter > 3.5 && chapter < 4.5)) {
      // Two coloured polymers converge into a thin film.
      float assemble = smoothstep(0.05, 0.88, q);
      vec3 stream = vec3(side * uWidth * (0.34 + lane * 0.08),
        (t - 0.5) * uHeight * 1.18, (lane - 0.5) * 5.5);
      vec3 film = vec3((t - 0.5) * uWidth * 0.94,
        (lane - 0.5) * uHeight * 0.57 + side * 0.045,
        side * 0.13 + sin(t * 8.0 + lane * 3.0 + clock) * 0.12);
      c = mix(stream, film, assemble);
      detail.z *= 1.0 - assemble * 0.86;
      detail.xy *= 1.0 - assemble * 0.19;
      if (chapter > 3.5) c.y += sin(t * 6.0 + clock) * (1.0 - assemble) * 0.6;
    } else if (chapter < 3.5) {
      // Interlocked loops expose a continuously crosslinked network.
      float angle = t * TAU * 0.88 + side * 0.5 + clock * 0.18;
      c = vec3(cos(angle) * uWidth * (0.18 + lane * 0.25),
        sin(angle) * uHeight * (0.19 + lane * 0.25),
        sin(lane * TAU + t * 8.0 + clock) * 1.5 + side * 0.4);
      detail *= 0.9 + sin(t * 9.0 - clock) * 0.05;
    } else if (chapter < 5.5) {
      // Blue chitosan floats first; the green starch chain then builds.
      float angle = t * TAU * 0.65 + phase * 0.16;
      c = vec3(side * uWidth * (0.22 + lane * 0.13) + cos(angle + clock * 0.3) * uWidth * 0.06,
        (t - 0.5) * uHeight * 1.06,
        sin(angle + clock * 0.4) * 2.2 + (lane - 0.5) * 2.6);
      detail += vec3(sin(clock + phase), cos(clock + phase), 0.0) * 0.035;
    } else if (chapter < 6.5) {
      // Five process nodes with connectors between their stages.
      float stage = min(4.0, floor(t * 4.999));
      float within = fract(t * 4.999) - 0.5;
      float angle = lane * TAU + side * 0.6;
      c = vec3((stage / 4.0 - 0.5) * uWidth * 0.87 + cos(angle) * uWidth * 0.042,
        sin(stage * 1.55) * uHeight * 0.21 + sin(angle) * uHeight * 0.055 + side * 0.06,
        within * 1.1 + cos(angle) * 0.75);
      detail *= 0.75;
    } else if (chapter < 7.5) {
      // A longitudinal helix passes the viewer as the journey advances.
      float angle = t * TAU * 1.7 + lane * 0.8 + side * 3.14159 + clock * 0.2;
      c = vec3(cos(angle) * uWidth * (0.18 + lane * 0.12),
        sin(angle) * uHeight * (0.2 + lane * 0.12), (t - 0.5) * 17.0 + q * 4.5 - 2.0);
      detail *= 0.85;
    } else if (chapter < 8.5) {
      // Open double ribbons compare the two source materials.
      float angle = t * TAU + clock * 0.3;
      c = vec3(side * uWidth * 0.28 + sin(angle) * uWidth * 0.09,
        (t - 0.5) * uHeight * 1.08, cos(angle) * 1.65 + (lane - 0.5) * 2.5);
      c.x += side * sin(lane * 3.14159) * uWidth * 0.07;
    } else if (chapter < 9.5) {
      // Branches unfurl from a common root into possible applications.
      float growth = 0.3 + smoothstep(0.0, 0.95, q) * 0.7;
      c = vec3(side * uWidth * (0.07 + t * (0.17 + lane * 0.25) * growth),
        (t - 0.5) * uHeight * 1.08,
        sin(t * 5.0 + lane * 5.0 + clock) * (0.4 + t * 1.9));
      c.x += sin(t * 7.0 + clock) * 0.2 * t;
      detail *= 0.8 + t * 0.45;
    } else if (chapter < 10.5) {
      // A fan opens into broad, orbiting arcs.
      float opening = 0.32 + q * 0.68;
      float angle = (t - 0.5) * TAU * opening + side * 1.5708 + clock * 0.12;
      float radius = 0.15 + lane * 0.31;
      c = vec3(cos(angle) * uWidth * radius, sin(angle) * uHeight * radius * 1.3,
        sin(t * TAU + phase) * 1.6 + (lane - 0.5) * 1.7);
      detail *= 0.95;
    } else if (chapter < 11.5) {
      // Ecological growth represents potential, rather than experimental data.
      float angle = lane * TAU + side * 0.19 + sin(t * 4.0 + clock * 0.4) * 0.17;
      float reach = t * (0.35 + q * 0.65);
      c = vec3(cos(angle) * uWidth * 0.48 * reach,
        sin(angle) * uHeight * 0.57 * reach,
        sin(angle * 2.0 + t * 5.0 + clock) * t * 1.55);
      detail *= 0.65 + t * 0.65;
    } else if (chapter < 12.5) {
      // Hydrated, flexible loops breathe and squeeze.
      float angle = t * TAU + phase * 0.14;
      float breath = sin(clock * 1.5 + lane * 2.0) * 0.08;
      c = vec3(side * uWidth * 0.23 + cos(angle) * uWidth * (0.1 + lane * 0.07) * (1.0 + breath),
        sin(angle) * uHeight * (0.24 + lane * 0.09) * (1.0 - breath),
        sin(angle * 2.0 + phase + clock * 0.4) * 1.25);
      detail *= 1.08 + sin(angle * 3.0 + clock) * 0.07;
    } else {
      // Two quiet framing arcs let the final chapters settle.
      float contact = step(13.5, chapter);
      c = vec3(side * uWidth * (0.31 + sin(t * 3.14159) * (0.1 - contact * 0.035)),
        (0.5 - t) * uHeight * 1.12,
        (lane - 0.5) * 3.4 + sin(t * 6.0 + clock * 0.2) * 0.35);
      c.x += (lane - 0.5) * uWidth * 0.075;
      detail *= 0.83;
    }
    return c + detail;
  }
  float chapterVisibility(vec4 m, float chapter, float q) {
    if (chapter > 4.5 && chapter < 5.5 && m.x < 0.0)
      return smoothstep(m.z - 0.09, m.z + 0.06, max(0.0, q * 2.0 - 0.65));
    if (chapter > 5.5 && chapter < 6.5) {
      float stage = min(4.0, floor(m.z * 4.999));
      return smoothstep(stage / 5.0 - 0.08, stage / 5.0 + 0.04, q);
    }
    if (chapter > 10.5 && chapter < 11.5)
      return smoothstep(m.z - 0.15, m.z + 0.03, 0.22 + q * 0.9);
    return 1.0;
  }
  vec3 materialPosition(vec3 center, vec3 local, vec4 meta) {
    if (uBlend > 0.999) return chapterPosition(center, local, meta, uTo, uProgress);
    return mix(chapterPosition(center, local, meta, uFrom, uPreviousProgress),
      chapterPosition(center, local, meta, uTo, uProgress), uBlend);
  }
  float materialVisibility(vec4 meta) {
    if (uBlend > 0.999) return chapterVisibility(meta, uTo, uProgress);
    return mix(chapterVisibility(meta, uFrom, uPreviousProgress),
      chapterVisibility(meta, uTo, uProgress), uBlend);
  }
  float linkPresence(float chapter, float q, float kind, vec4 meta) {
    if (chapter > 0.5 && chapter < 1.5 && kind > 0.5)
      return smoothstep(meta.z * 0.65 + kind * 0.1 - 0.08,
        meta.z * 0.65 + kind * 0.1 + 0.11, q);
    if (kind > 1.5) {
      if (chapter > 2.5 && chapter < 3.5) return 0.95;
      if (chapter > 10.5 && chapter < 11.5) return 0.7;
      return 0.19;
    }
    return 1.0;
  }
`;

const atomVertex = /* glsl */ `
  attribute vec3 aCenter;
  attribute vec3 aOffset;
  attribute vec4 aMeta;
  attribute vec3 aColor;
  attribute float aRadius;
  varying vec3 vColor;
  varying vec3 vNormal;
  varying float vVisibility;
  varying float vDepth;
  ${morphShader}
  void main() {
    vec3 center = materialPosition(aCenter, aOffset, aMeta);
    vec4 viewPosition = modelViewMatrix * vec4(center + position * aRadius, 1.0);
    vColor = aColor;
    vNormal = normalize(normalMatrix * normal);
    vVisibility = materialVisibility(aMeta);
    vDepth = 1.0 - smoothstep(8.0, 34.0, -viewPosition.z);
    gl_Position = projectionMatrix * viewPosition;
  }
`;
const atomFragment = /* glsl */ `
  varying vec3 vColor;
  varying vec3 vNormal;
  varying float vVisibility;
  varying float vDepth;
  void main() {
    float light = 0.4 + max(dot(vNormal, normalize(vec3(-0.4, 0.7, 1.0))), 0.0) * 0.6;
    float rim = pow(1.0 - abs(vNormal.z), 2.0) * 0.3;
    gl_FragColor = vec4(vColor * light + vColor * rim, 0.86 * vVisibility * vDepth);
    #include <colorspace_fragment>
  }
`;
const bondVertex = /* glsl */ `
  attribute vec3 aFromCenter;
  attribute vec3 aFromOffset;
  attribute vec4 aFromMeta;
  attribute vec3 aToCenter;
  attribute vec3 aToOffset;
  attribute vec4 aToMeta;
  attribute vec3 aColor;
  attribute float aKind;
  varying vec3 vColor;
  varying float vVisibility;
  varying float vDepth;
  ${morphShader}
  void main() {
    vec3 a = materialPosition(aFromCenter, aFromOffset, aFromMeta);
    vec3 b = materialPosition(aToCenter, aToOffset, aToMeta);
    vec3 direction = normalize(b - a + vec3(0.00001));
    vec3 across = normalize(cross(direction, abs(direction.y) > 0.96 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0)));
    vec3 forward = cross(direction, across);
    float thickness = aKind > 1.5 ? 0.006 : 0.01;
    vec3 transformed = mix(a, b, position.y + 0.5) + (across * position.x + forward * position.z) * thickness;
    vec4 viewPosition = modelViewMatrix * vec4(transformed, 1.0);
    float presence = mix(linkPresence(uFrom, uPreviousProgress, aKind, aToMeta),
      linkPresence(uTo, uProgress, aKind, aToMeta), uBlend);
    vColor = aColor;
    vVisibility = min(materialVisibility(aFromMeta), materialVisibility(aToMeta)) * presence;
    vDepth = 1.0 - smoothstep(8.0, 34.0, -viewPosition.z);
    gl_Position = projectionMatrix * viewPosition;
  }
`;
const bondFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vVisibility;
  varying float vDepth;
  void main() {
    gl_FragColor = vec4(vColor, 0.46 * vVisibility * vDepth);
    #include <colorspace_fragment>
  }
`;
const haloVertex = /* glsl */ `
  attribute vec3 aCenter;
  attribute vec3 aOffset;
  attribute vec4 aMeta;
  attribute vec3 aColor;
  attribute float aRadius;
  uniform float uProjectionScale;
  varying vec3 vColor;
  varying float vVisibility;
  varying float vDepth;
  ${morphShader}
  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(materialPosition(aCenter, aOffset, aMeta), 1.0);
    vColor = aColor;
    vVisibility = materialVisibility(aMeta);
    vDepth = 1.0 - smoothstep(9.0, 32.0, -viewPosition.z);
    gl_PointSize = clamp(aRadius * 9.5 * uProjectionScale / max(0.1, -viewPosition.z), 2.0, 50.0);
    gl_Position = projectionMatrix * viewPosition;
  }
`;
const haloFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vVisibility;
  varying float vDepth;
  void main() {
    vec2 p = gl_PointCoord * 2.0 - 1.0;
    float radius = dot(p, p);
    if (radius > 1.0) discard;
    float halo = exp(-radius * 5.2) * 0.13 + exp(-radius * 21.0) * 0.16;
    gl_FragColor = vec4(vColor, halo * vDepth * vVisibility);
    #include <colorspace_fragment>
  }
`;
const mistVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const mistFragment = /* glsl */ `
  uniform float uTime;
  uniform float uSeed;
  uniform float uOpacity;
  uniform vec3 uColor;
  uniform vec4 uShape;
  varying vec2 vUv;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);
  }
  float cloud(vec2 p) {
    float value = 0.0, amplitude = 0.52;
    mat2 turn = mat2(0.8, -0.6, 0.6, 0.8);
    for (int i = 0; i < 3; i++) {
      value += noise(p) * amplitude;
      p = turn * p * 2.03 + vec2(4.7, 9.2);
      amplitude *= 0.49;
    }
    // Preserve the four-octave amplitude while avoiding its finest noise pass.
    return value * 1.068;
  }
  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float angle = uShape.x;
    p = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * p;
    float edge = pow(max(0.0, 1.0 - dot(p * vec2(0.78, 0.86), p * vec2(0.78, 0.86))), 1.8);
    if (edge <= 0.0) discard;
    vec2 drift = vec2(uTime * 0.009, -uTime * 0.014);
    vec2 warp = vec2(cloud(p * 1.8 + uSeed + drift), cloud(p * 1.9 - uSeed - drift)) - 0.5;
    float detail = cloud(p * vec2(3.5, 4.5) + warp * uShape.z + drift + uSeed);
    float spine = p.x + sin(p.y * 3.4 + uSeed + uTime * 0.025) * 0.25 + warp.x * 0.46;
    float envelope = exp(-spine * spine * uShape.y);
    float density = smoothstep(0.23, 0.79, detail) * envelope * edge;
    float folds = smoothstep(0.42, 0.78, detail) * 0.45;
    vec3 color = mix(uColor * 0.38, uColor, detail + folds);
    gl_FragColor = vec4(color, density * uOpacity * uShape.w);
    #include <colorspace_fragment>
  }
`;

function atomAttributes(network: Network, instanced: boolean) {
  const count = network.atoms.length;
  const center = new Float32Array(count * 3),
    offset = new Float32Array(count * 3);
  const meta = new Float32Array(count * 4),
    color = new Float32Array(count * 3);
  const radius = new Float32Array(count);
  network.atoms.forEach((atom, index) => {
    atom.center.toArray(center, index * 3);
    atom.position
      .clone()
      .sub(atom.center)
      .toArray(offset, index * 3);
    meta.set(atom.meta, index * 4);
    atom.color.toArray(color, index * 3);
    radius[index] = atom.radius;
  });
  const attribute = (values: Float32Array, size: number) =>
    instanced
      ? new THREE.InstancedBufferAttribute(values, size)
      : new THREE.BufferAttribute(values, size);
  return {
    aCenter: attribute(center, 3),
    aOffset: attribute(offset, 3),
    aMeta: attribute(meta, 4),
    aColor: attribute(color, 3),
    aRadius: attribute(radius, 1),
  };
}

function makeGeometries(network: Network) {
  // Low-poly instances keep the shared, full-screen backdrop affordable.
  const atoms = new THREE.SphereGeometry(1, 6, 4);
  Object.entries(atomAttributes(network, true)).forEach(([name, value]) =>
    atoms.setAttribute(name, value),
  );
  const halos = new THREE.BufferGeometry();
  Object.entries(atomAttributes(network, false)).forEach(([name, value]) =>
    halos.setAttribute(name, value),
  );
  halos.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(network.atoms.length * 3), 3),
  );
  const bonds = new THREE.CylinderGeometry(1, 1, 1, 4, 1, true);
  const data: Record<string, { values: Float32Array; size: number }> = {};
  for (const endpoint of ["From", "To"]) {
    data[`a${endpoint}Center`] = {
      values: new Float32Array(network.links.length * 3),
      size: 3,
    };
    data[`a${endpoint}Offset`] = {
      values: new Float32Array(network.links.length * 3),
      size: 3,
    };
    data[`a${endpoint}Meta`] = {
      values: new Float32Array(network.links.length * 4),
      size: 4,
    };
  }
  data.aColor = { values: new Float32Array(network.links.length * 3), size: 3 };
  data.aKind = { values: new Float32Array(network.links.length), size: 1 };
  network.links.forEach((link, index) => {
    for (const [endpoint, atom] of [
      ["From", network.atoms[link.from]],
      ["To", network.atoms[link.to]],
    ] as const) {
      atom.center.toArray(data[`a${endpoint}Center`].values, index * 3);
      atom.position
        .clone()
        .sub(atom.center)
        .toArray(data[`a${endpoint}Offset`].values, index * 3);
      data[`a${endpoint}Meta`].values.set(atom.meta, index * 4);
    }
    link.color.toArray(data.aColor.values, index * 3);
    data.aKind.values[index] = link.kind;
  });
  Object.entries(data).forEach(([name, { values, size }]) => {
    bonds.setAttribute(name, new THREE.InstancedBufferAttribute(values, size));
  });
  return { atoms, bonds, halos };
}

// Orientation, width, curl and density echo each chapter's physical motion.
const CLOUD_SHAPES: [number, number, number, number][] = [
  [0, 3.8, 2.3, 1],
  [0.28, 2.3, 4.1, 0.78],
  [1.57, 7.8, 1.5, 0.93],
  [0.6, 2.6, 3.4, 1.08],
  [1.57, 8.5, 1.3, 0.96],
  [0, 5.2, 2.9, 0.9],
  [-0.45, 4.5, 1.9, 0.88],
  [0.9, 2.1, 4.2, 1.04],
  [0, 5.5, 2.2, 0.9],
  [-0.5, 3.1, 3.5, 1],
  [0.95, 2.4, 3.1, 1.03],
  [0.45, 2.8, 3.7, 1.08],
  [0.2, 2.4, 4.4, 1.02],
  [0, 4.8, 1.9, 0.8],
  [0, 5.5, 1.5, 0.72],
];

/** The same nonstellar material cloud accompanies every chapter of the page. */
export default function BiomaterialNebula({
  active,
  interaction,
}: Pick<MolecularCanvasProps, "active" | "interaction">) {
  const viewport = useThree((state) => state.viewport);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const pixelRatio = useThree((state) => state.viewport.dpr);
  const width = viewport.width,
    height = viewport.height;
  const network = useMemo(() => makeNetwork(width, height), [width, height]);
  const geometries = useMemo(() => makeGeometries(network), [network]);
  const sample = useChapterSample(active);
  const matter = useRef<THREE.Group>(null),
    atmosphere = useRef<THREE.Group>(null);
  const atomsMaterial = useRef<THREE.ShaderMaterial>(null);
  const bondsMaterial = useRef<THREE.ShaderMaterial>(null);
  const haloMaterial = useRef<THREE.ShaderMaterial>(null);
  const networkMaterials = useMemo(
    () => [atomsMaterial, bondsMaterial, haloMaterial],
    [],
  );
  const mistMaterials = useRef<(THREE.ShaderMaterial | null)[]>([]);
  const projectionScale = useRef(1);
  const elapsed = useRef(0),
    pointer = useRef({ x: 0, y: 0 });
  const transition = useRef({
    from: 0,
    to: 0,
    mix: 1,
    progress: 0,
    previousProgress: 0,
  });
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFrom: { value: 0 },
      uTo: { value: 0 },
      uBlend: { value: 1 },
      uProgress: { value: 0 },
      uPreviousProgress: { value: 0 },
      uWidth: { value: width },
      uHeight: { value: height },
      uProjectionScale: { value: 1 },
    }),
    [],
  );
  const cloudShape = useMemo(() => new THREE.Vector4(...CLOUD_SHAPES[0]), []);
  const mistUniforms = useMemo(
    () => [
      {
        uTime: { value: 0 },
        uSeed: { value: 3.8 },
        uOpacity: { value: 0.42 },
        uColor: { value: new THREE.Color("#23b99c") },
        uShape: { value: cloudShape },
      },
      {
        uTime: { value: 0 },
        uSeed: { value: 8.2 },
        uOpacity: { value: 0.5 },
        uColor: { value: new THREE.Color("#267ee9") },
        uShape: { value: cloudShape },
      },
      {
        uTime: { value: 0 },
        uSeed: { value: 12.5 },
        uOpacity: { value: 0.13 },
        uColor: { value: new THREE.Color("#43c9bd") },
        uShape: { value: cloudShape },
      },
    ],
    [cloudShape],
  );
  const mist = useMemo(
    () => [
      {
        position: [-width * 0.38, -height * 0.07, -4.8] as const,
        scale: [width * 0.76, height * 1.4, 1] as const,
        uniforms: mistUniforms[0],
      },
      {
        position: [width * 0.37, height * 0.12, -5.8] as const,
        scale: [width * 0.8, height * 1.5, 1] as const,
        uniforms: mistUniforms[1],
      },
      {
        position: [-width * 0.34, -height * 0.24, 2.8] as const,
        scale: [width * 0.59, height * 0.84, 1] as const,
        uniforms: mistUniforms[2],
      },
    ],
    [width, height, mistUniforms],
  );
  useLayoutEffect(() => {
    const fov = camera instanceof THREE.PerspectiveCamera ? camera.fov : 48;
    projectionScale.current =
      (size.height * pixelRatio) /
      (2 * Math.tan(THREE.MathUtils.degToRad(fov * 0.5)));
    for (const material of networkMaterials) {
      if (material.current) {
        material.current.uniforms.uProjectionScale.value =
          projectionScale.current;
        material.current.uniforms.uWidth.value = width;
        material.current.uniforms.uHeight.value = height;
      }
    }
  }, [camera, pixelRatio, size.height, width, height, networkMaterials]);
  useEffect(
    () => () => {
      geometries.atoms.dispose();
      geometries.bonds.dispose();
      geometries.halos.dispose();
    },
    [geometries],
  );

  useFrame((_, delta) => {
    // Pausing freezes every uniform and transform, including chapter morphs,
    // pointer smoothing and longitudinal travel. The parent owns the clock.
    if (!active || !matter.current || !atmosphere.current) return;
    const step = Math.min(delta, 0.06),
      manual = interaction?.current;
    if (manual?.reset) {
      elapsed.current = 0;
      manual.reset = false;
    }
    elapsed.current += step;
    const time = elapsed.current,
      smoothing = 1 - Math.exp(-step * 2.6);
    const current = transition.current,
      target = sample.current;
    if (current.to !== target.chapter) {
      current.from = current.mix > 0.5 ? current.to : current.from;
      current.previousProgress = current.progress;
      current.to = target.chapter;
      current.mix = 0;
    }
    current.mix = Math.min(1, current.mix + step * 0.72);
    current.progress += (target.progress - current.progress) * smoothing;
    const blend = current.mix * current.mix * (3 - 2 * current.mix);
    // Fiber preserves its own uniform wrappers, so write to the mounted
    // ShaderMaterials rather than mutating the declarative source wrappers.
    for (const material of networkMaterials) {
      if (!material.current) continue;
      const actual = material.current.uniforms;
      actual.uTime.value = time;
      actual.uFrom.value = current.from;
      actual.uTo.value = current.to;
      actual.uBlend.value = blend;
      actual.uProgress.value = current.progress;
      actual.uPreviousProgress.value = current.previousProgress;
      actual.uWidth.value = width;
      actual.uHeight.value = height;
      actual.uProjectionScale.value = projectionScale.current;
    }
    pointer.current.x +=
      (THREE.MathUtils.clamp(manual?.x || 0, -0.12, 0.12) - pointer.current.x) *
      smoothing;
    pointer.current.y +=
      (THREE.MathUtils.clamp(manual?.y || 0, -0.12, 0.12) - pointer.current.y) *
      smoothing;
    const calm = current.to >= 13 ? 0.35 : 1;
    const travel = current.to === 7 ? current.progress : 0;
    matter.current.rotation.set(
      Math.sin(time * 0.055) * 0.045 * calm + pointer.current.x * 0.45,
      Math.sin(time * 0.038) * 0.075 * calm + pointer.current.y * 0.6,
      Math.sin(time * 0.032) * 0.025 * calm,
    );
    matter.current.position.x +=
      (Math.sin(time * 0.064) * 0.14 +
        Math.sin(travel * Math.PI) * width * 0.055 -
        matter.current.position.x) *
      smoothing;
    matter.current.position.y = Math.sin(time * 0.11) * 0.1 * calm;
    atmosphere.current.position.set(
      -pointer.current.y * 0.9,
      pointer.current.x * 0.5,
      0,
    );
    atmosphere.current.rotation.z = Math.sin(time * 0.025) * 0.025;
    const fromShape = CLOUD_SHAPES[current.from],
      toShape = CLOUD_SHAPES[current.to];
    cloudShape.set(
      THREE.MathUtils.lerp(fromShape[0], toShape[0], blend),
      THREE.MathUtils.lerp(fromShape[1], toShape[1], blend),
      THREE.MathUtils.lerp(fromShape[2], toShape[2], blend),
      THREE.MathUtils.lerp(fromShape[3], toShape[3], blend),
    );
    for (const material of mistMaterials.current) {
      if (!material) continue;
      material.uniforms.uTime.value = time;
      material.uniforms.uShape.value.copy(cloudShape);
    }
  });

  return (
    <>
      <group ref={atmosphere}>
        {mist.map((layer, index) => (
          <mesh
            key={index}
            position={layer.position}
            scale={layer.scale}
            renderOrder={-3}
          >
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
              ref={(material) => {
                mistMaterials.current[index] = material;
              }}
              uniforms={layer.uniforms}
              vertexShader={mistVertex}
              fragmentShader={mistFragment}
              transparent
              depthWrite={false}
              depthTest={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
      <group ref={matter}>
        <instancedMesh
          args={[geometries.bonds, undefined, network.links.length]}
          frustumCulled={false}
        >
          <shaderMaterial
            ref={bondsMaterial}
            uniforms={uniforms}
            vertexShader={bondVertex}
            fragmentShader={bondFragment}
            transparent
            depthWrite={false}
            toneMapped={false}
          />
        </instancedMesh>
        <points
          geometry={geometries.halos}
          frustumCulled={false}
          renderOrder={1}
        >
          <shaderMaterial
            ref={haloMaterial}
            uniforms={uniforms}
            vertexShader={haloVertex}
            fragmentShader={haloFragment}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </points>
        <instancedMesh
          args={[geometries.atoms, undefined, network.atoms.length]}
          frustumCulled={false}
          renderOrder={2}
        >
          <shaderMaterial
            ref={atomsMaterial}
            uniforms={uniforms}
            vertexShader={atomVertex}
            fragmentShader={atomFragment}
            transparent
            depthWrite={false}
            toneMapped={false}
          />
        </instancedMesh>
      </group>
    </>
  );
}
