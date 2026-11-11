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

function PolymerMesh({
  material,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  backdrop = false,
}: {
  material: "chitosan" | "starch";
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  backdrop?: boolean;
}) {
  const polymer = useMemo(
    () => makePolymer(material, backdrop ? 5 : 6),
    [material, backdrop],
  );
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
        <sphereGeometry args={[1, backdrop ? 8 : 12, backdrop ? 6 : 10]} />
        <meshStandardMaterial
          metalness={0.3}
          roughness={0.23}
          emissive={material === "chitosan" ? "#164d9b" : "#08775b"}
          emissiveIntensity={backdrop ? 0.65 : 0.5}
          transparent
          opacity={backdrop ? 0.65 : 1}
        />
      </instancedMesh>
      <instancedMesh
        ref={bonds}
        args={[undefined, undefined, polymer.bonds.length]}
      >
        <cylinderGeometry args={[1, 1, 1, backdrop ? 5 : 7]} />
        <meshStandardMaterial
          metalness={0.15}
          roughness={0.35}
          emissive={material === "chitosan" ? "#1768ba" : "#169b72"}
          emissiveIntensity={0.65}
          transparent
          opacity={backdrop ? 0.38 : 0.78}
        />
      </instancedMesh>
    </group>
  );
}

function Dust({ backdrop }: { backdrop: boolean }) {
  const viewport = useThree((state) => state.viewport);
  const positions = useMemo(() => {
    const count = backdrop ? 85 : 35;
    const values = new Float32Array(count * 3);
    for (let index = 0; index < count; index++) {
      // A deterministic distribution also makes the first frame stable.
      values[index * 3] =
        Math.sin(index * 127.1 + 12) * 0.5 * viewport.width * 1.15;
      values[index * 3 + 1] =
        Math.sin(index * 311.7 + 19) * 0.5 * viewport.height;
      values[index * 3 + 2] = -1.8 + Math.cos(index * 74.7) * 2;
    }
    return values;
  }, [backdrop, viewport.width, viewport.height]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#83c5ff"
        size={backdrop ? 0.025 : 0.019}
        sizeAttenuation
        transparent
        opacity={backdrop ? 0.4 : 0.5}
        depthWrite={false}
      />
    </points>
  );
}

function Scene({
  kind,
  active,
  mode = "both",
  interaction,
}: MolecularCanvasProps) {
  const group = useRef<THREE.Group>(null);
  const elapsed = useRef(0);
  const invalidate = useThree((state) => state.invalidate);
  const viewport = useThree((state) => state.viewport);
  const backdrop = kind === "backdrop";

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
    // Demand rendering at ~30 fps: no React state updates in the animation loop.
    // Fiber already schedules the GPU frame with requestAnimationFrame. A
    // second RAF after each timer would unnecessarily lower the target cadence.
    const timer = setInterval(invalidate, 1000 / 30);
    return () => clearInterval(timer);
  }, [active, invalidate]);

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
    return <BiomaterialNebula active={active} interaction={interaction} />;
  }

  return (
    <>
      <ambientLight intensity={backdrop ? 1.5 : 1.1} />
      <directionalLight position={[4, 5, 5]} intensity={3} color="#bdeaff" />
      <pointLight
        position={[-3, -2, 3]}
        intensity={12}
        color="#30e8b1"
        distance={12}
        decay={2}
      />
      <pointLight
        position={[3, 2, 3]}
        intensity={15}
        color="#247bff"
        distance={12}
        decay={2}
      />
      <group
        ref={group}
        scale={backdrop ? 1 : Math.min(1.12, viewport.width / 7.1)}
      >
        <>
          {(mode === "both" || mode === "chitosan") && (
            <PolymerMesh
              material="chitosan"
              position={[0, mode === "both" ? 0.63 : -0.08, 0.15]}
              rotation={[0.05, 0.12, 0.03]}
            />
          )}
          {(mode === "both" || mode === "starch") && (
            <PolymerMesh
              material="starch"
              position={[0, mode === "both" ? -0.89 : -0.08, -0.3]}
              rotation={[-0.12, -0.06, -0.06]}
            />
          )}
        </>
      </group>
      <Dust backdrop={backdrop} />
    </>
  );
}

function RendererLifecycle({ onFailure }: { onFailure: () => void }) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    const originalRender = gl.render;
    let hasFailed = false;
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
      } catch {
        failed();
      }
    };
    canvas.addEventListener("webglcontextlost", failed, { once: true });
    return () => {
      gl.render = originalRender;
      canvas.removeEventListener("webglcontextlost", failed);
    };
  }, [gl, onFailure]);
  return null;
}

let webglCapability: Promise<boolean> | undefined;

function supportsWebGL() {
  // Both viewers share one capability check. Canvas fallback children are normal
  // DOM children and can mount even when WebGL succeeds, so they have no effects.
  webglCapability ??= Promise.resolve().then(() => {
    try {
      const probe = document.createElement("canvas");
      const context = probe.getContext("webgl2", {
        antialias: false,
        powerPreference: "low-power",
      });
      if (!context) return false;
      context.getExtension("WEBGL_lose_context")?.loseContext();
      probe.width = 1;
      probe.height = 1;
      return true;
    } catch {
      return false;
    }
  });
  return webglCapability;
}

export default function MolecularCanvas(props: MolecularCanvasProps) {
  const [mobile, setMobile] = useState(true);
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    let disposed = false;
    void supportsWebGL().then((available) => {
      if (disposed) return;
      if (available) setSupported(true);
      else props.onFailure();
    });
    return () => {
      disposed = true;
    };
  }, [props.onFailure]);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 650px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return (
    <div className="molecular-canvas" aria-hidden="true">
      {supported && (
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
            antialias: !mobile,
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
            invalidate();
            props.onReady();
          }}
          style={{ pointerEvents: "none" }}
        >
          <Scene {...props} />
          <RendererLifecycle onFailure={props.onFailure} />
        </Canvas>
      )}
    </div>
  );
}
