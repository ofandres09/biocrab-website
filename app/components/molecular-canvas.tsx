"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import BiomaterialNebula from "./biomaterial-nebula";
import type { MolecularCanvasProps, MolecularMode } from "./molecular-scene";

type Atom = { position: THREE.Vector3; radius: number; color: string };
type Bond = { from: THREE.Vector3; to: THREE.Vector3; color: string };
type Polymer = { atoms: Atom[]; bonds: Bond[] };

/** Schematic hexagonal chains, intentionally not an atom-accurate chemical model. */
function makePolymer(material: "chitosan" | "starch", units = 6): Polymer {
  const atoms: Atom[] = [];
  const bonds: Bond[] = [];
  const color = material === "chitosan" ? "#3d9bff" : "#43e7b1";
  const pale = material === "chitosan" ? "#b2d9ff" : "#b0ffe1";
  let previous: THREE.Vector3 | undefined;
  for (let unit = 0; unit < units; unit++) {
    const cx = (unit - (units - 1) / 2) * 1.06;
    const cy = Math.sin(unit * 1.1) * 0.22;
    const cz = Math.cos(unit * 1.1) * 0.27;
    const ring: THREE.Vector3[] = [];
    for (let vertex = 0; vertex < 6; vertex++) {
      const angle = (vertex * Math.PI) / 3;
      const position = new THREE.Vector3(
        cx + Math.cos(angle) * 0.36,
        cy + Math.sin(angle) * 0.35,
        cz + (vertex % 2 === 0 ? 0.075 : -0.075),
      );
      ring.push(position);
      atoms.push({
        position,
        radius: vertex === 2 ? 0.09 : 0.065,
        color: vertex === 2 ? color : pale,
      });
    }
    ring.forEach((position, vertex) => {
      bonds.push({ from: position, to: ring[(vertex + 1) % 6], color });
    });
    if (previous) {
      const bridge = new THREE.Vector3(cx - 0.53, cy - 0.12, cz + 0.13);
      atoms.push({ position: bridge, radius: 0.082, color });
      bonds.push(
        { from: previous, to: bridge, color },
        { from: bridge, to: ring[3], color },
      );
    }
    previous = ring[0];
    const branch = ring[2].clone().add(new THREE.Vector3(-0.12, 0.31, 0.12));
    const end = branch.clone().add(new THREE.Vector3(0.13, 0.22, 0.15));
    atoms.push(
      { position: branch, radius: 0.055, color: pale },
      { position: end, radius: 0.095, color },
    );
    bonds.push(
      { from: ring[2], to: branch, color },
      { from: branch, to: end, color },
    );
    // A short side group adds depth without implying chemical specificity.
    if (unit % 2 === 0) {
      const lower = ring[5].clone().add(new THREE.Vector3(0.05, -0.28, -0.19));
      atoms.push({ position: lower, radius: 0.072, color });
      bonds.push({ from: ring[5], to: lower, color });
    }
  }
  return { atoms, bonds };
}

// One compact glossy program is shared by the focal atoms and bonds. It avoids
// a PBR lighting pipeline on first use while retaining actual 3D silhouettes.
const explorerVertex = /* glsl */ `
  varying vec3 vColor;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    mat4 transform = instanceMatrix;
    vec4 worldPosition = transform * vec4(position, 1.0);
    mat3 basis = mat3(transform);
    vec3 corrected = normal / max(vec3(0.000001), vec3(dot(basis[0], basis[0]), dot(basis[1], basis[1]), dot(basis[2], basis[2])));
    vNormal = normalize(normalMatrix * basis * corrected);
    vec4 viewPosition = modelViewMatrix * worldPosition;
    vView = -viewPosition.xyz;
    #ifdef USE_INSTANCING_COLOR
      vColor = instanceColor;
    #else
      vColor = vec3(0.3, 0.8, 1.0);
    #endif
    gl_Position = projectionMatrix * viewPosition;
  }
`;
const explorerFragment = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 view = normalize(vView);
    vec3 light = normalize(vec3(-0.45, 0.85, 1.0));
    float diffuse = max(dot(normal, light), 0.0);
    float fill = max(dot(normal, vec3(0.75, -0.2, 0.3)), 0.0);
    float specular = pow(max(dot(normalize(light + view), normal), 0.0), 28.0);
    float edge = max(0.0, 1.0 - dot(normal, view));
    vec3 color = vColor * (0.35 + diffuse * 0.85 + fill * 0.18)
      + vec3(0.65, 0.87, 1.0) * specular * 0.72
      + vColor * edge * edge * 0.22;
    gl_FragColor = vec4(color, uOpacity);
    #include <colorspace_fragment>
  }
`;

function PolymerMesh({
  material,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  backdrop = false,
  economy = false,
}: {
  material: "chitosan" | "starch";
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  backdrop?: boolean;
  economy?: boolean;
}) {
  const polymer = useMemo(
    () => makePolymer(material, backdrop ? 5 : 6),
    [material, backdrop],
  );
  const atomUniforms = useMemo(() => ({ uOpacity: { value: 1 } }), []);
  const bondUniforms = useMemo(() => ({ uOpacity: { value: 0.78 } }), []);
  const spheres = useRef<THREE.InstancedMesh>(null);
  const bonds = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!spheres.current || !bonds.current) return;
    const transform = new THREE.Object3D();
    const color = new THREE.Color();
    const up = new THREE.Vector3(0, 1, 0);
    polymer.atoms.forEach((atom, index) => {
      transform.position.copy(atom.position);
      transform.quaternion.identity();
      transform.scale.setScalar(atom.radius);
      transform.updateMatrix();
      spheres.current!.setMatrixAt(index, transform.matrix);
      spheres.current!.setColorAt(index, color.set(atom.color));
    });
    polymer.bonds.forEach((bond, index) => {
      const direction = bond.to.clone().sub(bond.from);
      transform.position.copy(bond.from).add(bond.to).multiplyScalar(0.5);
      transform.quaternion.setFromUnitVectors(
        up,
        direction.clone().normalize(),
      );
      transform.scale.set(
        backdrop ? 0.012 : 0.019,
        direction.length(),
        backdrop ? 0.012 : 0.019,
      );
      transform.updateMatrix();
      bonds.current!.setMatrixAt(index, transform.matrix);
      bonds.current!.setColorAt(index, color.set(bond.color));
    });
    spheres.current.instanceMatrix.needsUpdate = true;
    bonds.current.instanceMatrix.needsUpdate = true;
    if (spheres.current.instanceColor)
      spheres.current.instanceColor.needsUpdate = true;
    if (bonds.current.instanceColor)
      bonds.current.instanceColor.needsUpdate = true;
    spheres.current.computeBoundingSphere();
    bonds.current.computeBoundingSphere();
  }, [polymer, backdrop]);
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <instancedMesh
        ref={spheres}
        args={[undefined, undefined, polymer.atoms.length]}
      >
        <sphereGeometry
          args={[1, economy || backdrop ? 8 : 12, economy || backdrop ? 6 : 10]}
        />
        <shaderMaterial
          uniforms={atomUniforms}
          vertexShader={explorerVertex}
          fragmentShader={explorerFragment}
          transparent
          toneMapped={false}
        />
      </instancedMesh>
      <instancedMesh
        ref={bonds}
        args={[undefined, undefined, polymer.bonds.length]}
      >
        <cylinderGeometry args={[1, 1, 1, economy || backdrop ? 5 : 7]} />
        <shaderMaterial
          uniforms={bondUniforms}
          vertexShader={explorerVertex}
          fragmentShader={explorerFragment}
          transparent
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}

/** A rare, bounded resolution adjustment; never a React update per frame. */
function AdaptiveQuality({
  active,
  kind,
}: Pick<MolecularCanvasProps, "active" | "kind">) {
  const gl = useThree((state) => state.gl);
  const setDpr = useThree((state) => state.setDpr);
  const actualDpr = useThree((state) => state.viewport.dpr);
  const quality = useRef({
    dpr: 1,
    ceiling: 1,
    floor: 0.85,
    software: false,
    frames: 0,
    started: 0,
    healthyWindows: 0,
  });
  const initialized = useRef(false);
  useEffect(() => {
    gl.domElement.dataset.graphicsDpr = actualDpr.toFixed(2);
    gl.domElement.dataset.graphicsQuality =
      actualDpr >= 0.9 ? "full" : actualDpr >= 0.7 ? "balanced" : "economy";
  }, [actualDpr, gl]);
  useEffect(() => {
    const state = quality.current;
    if (!initialized.current) {
      initialized.current = true;
      const context = gl.getContext();
      const extension = context.getExtension("WEBGL_debug_renderer_info");
      const renderer = extension
        ? String(context.getParameter(extension.UNMASKED_RENDERER_WEBGL))
        : "";
      state.software = /swiftshader|llvmpipe|software|lavapipe/i.test(renderer);
      const nativeDpr = Math.max(1, window.devicePixelRatio || 1);
      state.ceiling = state.software
        ? 1
        : Math.min(nativeDpr, kind === "backdrop" ? 1.5 : 2);
      state.floor = 0.85;
      state.dpr = state.ceiling;
      gl.domElement.dataset.graphicsRenderer = state.software
        ? "software"
        : "gpu";
    }
    state.frames = 0;
    state.started = performance.now();
    state.healthyWindows = 0;
    setDpr(state.dpr);
    gl.domElement.dataset.graphicsTargetDpr = state.dpr.toFixed(2);
  }, [active, gl, kind, setDpr]);
  useFrame(() => {
    if (!active) return;
    const state = quality.current;
    state.frames += 1;
    const now = performance.now();
    const elapsed = now - state.started;
    if (elapsed < 2800 || state.frames < 4) return;
    const frameMs = elapsed / state.frames;
    const previous = state.dpr;
    const economyClock = state.software || state.dpr <= 0.9;
    if (frameMs > (economyClock ? 45 : 24)) {
      state.dpr = Math.max(state.floor, state.dpr - 0.15);
      state.healthyWindows = 0;
    } else if (frameMs < (economyClock ? 39 : 20)) {
      state.healthyWindows += 1;
      if (state.healthyWindows >= 3) {
        state.dpr = Math.min(state.ceiling, state.dpr + 0.1);
        state.healthyWindows = 0;
      }
    } else state.healthyWindows = 0;
    if (
      Math.abs(state.dpr - previous) > 0.01 ||
      Math.abs(gl.getPixelRatio() - state.dpr) > 0.01
    )
      setDpr(state.dpr);
    const canvas = gl.domElement;
    canvas.dataset.graphicsTargetDpr = state.dpr.toFixed(2);
    canvas.dataset.graphicsFrameMs = frameMs.toFixed(1);
    state.frames = 0;
    state.started = now;
  });
  return null;
}

function Scene({
  kind,
  active,
  mode = "both",
  interaction,
  economy = false,
}: MolecularCanvasProps & { economy?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const elapsed = useRef(0);
  const invalidate = useThree((state) => state.invalidate);
  const viewport = useThree((state) => state.viewport);
  const backdrop = kind === "backdrop";
  const lowDpr = useThree((state) => state.viewport.dpr <= 0.9);
  const economyTier = economy || lowDpr;

  useEffect(() => {
    if (!interaction) return;
    interaction.current.invalidate = invalidate;
    return () => {
      interaction.current.invalidate = undefined;
    };
  }, [interaction, invalidate]);

  useEffect(() => {
    invalidate();
    if (!active) return;
    // Healthy GPU tiers target the display's 60 Hz cadence. The genuine
    // economy tier budgets 30 Hz; UI scrolling and controls keep their own clock.
    // Fiber schedules the actual RAF and there is no React state per frame.
    const frameRate = economyTier ? 30 : 60;
    const timer = setInterval(invalidate, 1000 / frameRate);
    return () => clearInterval(timer);
  }, [active, invalidate, economyTier]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const manual = interaction?.current;
    if (manual?.reset) {
      elapsed.current = 0;
      manual.reset = false;
    }
    if (active) elapsed.current += Math.min(delta, 0.06);
    const time = elapsed.current;
    group.current.rotation.x =
      (backdrop ? 0.2 : 0.48) + Math.sin(time * 0.15) * 0.1 + (manual?.x || 0);
    group.current.rotation.y =
      (backdrop ? 0 : -0.2) +
      time * (backdrop ? 0.014 : 0.045) +
      (manual?.y || 0);
    group.current.rotation.z =
      (backdrop ? -0.2 : -0.17) + Math.sin(time * 0.12) * 0.045;
    group.current.position.y =
      Math.sin(time * 0.32) * (backdrop ? 0.13 : 0.055);
  });

  if (backdrop) {
    return (
      <BiomaterialNebula
        active={active}
        interaction={interaction}
        economy={economyTier}
      />
    );
  }

  return (
    <>
      <group
        ref={group}
        scale={
          backdrop
            ? 1
            : Math.min(1.55, viewport.width / 7.6, viewport.height / 4.7)
        }
      >
        <>
          {(mode === "both" || mode === "chitosan") && (
            <PolymerMesh
              material="chitosan"
              economy={economyTier}
              position={[0, mode === "both" ? 0.63 : -0.08, 0.15]}
              rotation={[0.05, 0.12, 0.03]}
            />
          )}
          {(mode === "both" || mode === "starch") && (
            <PolymerMesh
              material="starch"
              economy={economyTier}
              position={[0, mode === "both" ? -0.89 : -0.08, -0.3]}
              rotation={[-0.12, -0.06, -0.06]}
            />
          )}
        </>
      </group>
    </>
  );
}

function RendererLifecycle({
  onFailure,
  onReady,
}: {
  onFailure: () => void;
  onReady?: () => void;
}) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    const originalRender = gl.render;
    let hasFailed = false;
    let hasRendered = false;
    const failed = () => {
      if (hasFailed) return;
      hasFailed = true;
      onFailure();
    };
    // GPU draw errors occur in R3F's RAF loop, outside React's error boundary.
    // Keep those failures within the same static-fallback path as context loss.
    gl.render = (scene, camera) => {
      try {
        originalRender.call(gl, scene, camera);
        if (!hasRendered) {
          hasRendered = true;
          onReady?.();
        }
      } catch {
        failed();
      }
    };
    canvas.addEventListener("webglcontextlost", failed, { once: true });
    return () => {
      gl.render = originalRender;
      canvas.removeEventListener("webglcontextlost", failed);
    };
  }, [gl, onFailure, onReady]);
  return null;
}

type GraphicsCapability = { software: boolean };

export default function MolecularCanvas(props: MolecularCanvasProps) {
  const [mobile, setMobile] = useState(true);
  // Bootstrap from the real canvas, not a disposable third WebGL context.
  // Until onCreated supplies a tier, no molecular materials are mounted.
  const [capability, setCapability] = useState<GraphicsCapability | null>(null);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 650px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return (
    <div className="molecular-canvas" aria-hidden="true">
      <Canvas
        camera={{
          position: [0, 0, props.kind === "backdrop" ? 16 : 10.8],
          fov: props.kind === "backdrop" ? 48 : 36,
          near: 0.1,
          far: 40,
        }}
        dpr={props.kind === "backdrop" ? 1 : [1, mobile ? 1 : 1.25]}
        frameloop="demand"
        gl={{
          alpha: true,
          // The atmospheric layer is intentionally soft; avoid a full-screen
          // multisample framebuffer. The focal explorer retains desktop AA.
          antialias: props.kind === "explorer" && !mobile,
          powerPreference: "low-power",
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false,
        }}
        fallback={<span>Vista molecular conceptual estática</span>}
        onCreated={({ gl, invalidate }) => {
          gl.setClearColor(0x000000, 0);
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.domElement.setAttribute("aria-hidden", "true");
          const context = gl.getContext();
          if (context.isContextLost()) {
            props.onFailure();
            return;
          }
          const debug = context.getExtension("WEBGL_debug_renderer_info");
          const renderer = debug
            ? String(context.getParameter(debug.UNMASKED_RENDERER_WEBGL))
            : "";
          setCapability({
            software: /swiftshader|llvmpipe|software|lavapipe/i.test(renderer),
          });
          invalidate();
        }}
        style={{ pointerEvents: "none" }}
      >
        {capability && (
          <>
            <AdaptiveQuality active={props.active} kind={props.kind} />
            <Scene {...props} economy={capability.software} />
          </>
        )}
        <RendererLifecycle
          onFailure={props.onFailure}
          onReady={capability ? props.onReady : undefined}
        />
      </Canvas>
    </div>
  );
}
