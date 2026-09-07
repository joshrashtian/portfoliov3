"use client";

import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import TVMenu, { type TVMenuItem } from "./TVMenu";

export const TV_MODEL_URL = "/models/old_tv.glb";

/**
 * Measurements taken from the glb itself (mesh TV.003_Glass_0), in model units.
 * The group is re-centred on the screen so the local origin sits dead centre of
 * the glass — that keeps camera framing and the menu placement trivial.
 */
const SCREEN = {
  width: 600.86,
  height: 455.13,
  center: [0, 473.28, 272.41] as const,
  frontZ: 287.49,
};

/** Model units -> scene units. The whole set ends up ~1.5 units tall. */
const MODEL_SCALE = 0.002;
/** drei's <Html transform> maps 1 DOM px to scale/40 world units. */
const HTML_SCALE = MODEL_SCALE * 40;

const SCREEN_INSET = 0.94;
const MENU_WIDTH = Math.round(SCREEN.width * SCREEN_INSET);
const MENU_HEIGHT = Math.round(SCREEN.height * SCREEN_INSET);

type OldTVProps = {
  items?: TVMenuItem[];
  /** Slow idle sway, disabled when the TV sits inside its own drag controls. */
  idle?: boolean;
  /** Scene units the TV falls through on mount. Set to 0 to skip the drop. */
  dropFrom?: number;
  /** Seconds the fall takes. */
  dropDuration?: number;
  /** Seconds to hold before the fall starts. */
  dropDelay?: number;
} & React.ComponentProps<"group">;

/** Slow start, soft landing — the curve that reads as "settling" rather than "snapping". */
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function OldTV({
  items,
  idle = true,
  dropFrom = 2.4,
  dropDuration = 2.6,
  dropDelay = 0.15,
  ...props
}: OldTVProps) {
  const { scene } = useGLTF(TV_MODEL_URL);
  const swayRef = useRef<THREE.Group>(null);
  const dropRef = useRef<THREE.Group>(null);
  const elapsed = useRef(0);

  // Clone so the cached glb can be mounted more than once without sharing state.
  const model = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    model.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      object.castShadow = true;
      object.receiveShadow = true;

      const material = object.material as THREE.MeshStandardMaterial;
      if (!material || Array.isArray(object.material)) return;

      // The tube glass sits in front of the menu — thin it out so the screen
      // reads through it instead of fogging the whole panel.
      if (material.name === "Glass") {
        object.material = material.clone();
        const glass = object.material as THREE.MeshStandardMaterial;
        glass.transparent = true;
        glass.opacity = 0.22;
        glass.roughness = 0.08;
        glass.metalness = 0;
        glass.depthWrite = false;
      } else {
        material.envMapIntensity = 0.6;
      }
    });
  }, [model]);

  useFrame((state, delta) => {
    // Fall: drive our own clock so the animation always plays from mount,
    // not from whenever the canvas happened to start.
    if (dropRef.current && dropFrom > 0) {
      elapsed.current += delta;
      const t = THREE.MathUtils.clamp(
        (elapsed.current - dropDelay) / dropDuration,
        0,
        1,
      );
      const eased = easeInOutCubic(t);
      dropRef.current.position.y = dropFrom * (1 - eased);
      dropRef.current.rotation.z = (1 - eased) * 0.08;
    }

    if (idle && swayRef.current) {
      const t = state.clock.elapsedTime;
      swayRef.current.rotation.y = Math.sin(t * 0.25) * 0.06;
      swayRef.current.rotation.x = Math.sin(t * 0.19) * 0.02;
    }
  });

  return (
    <group {...props}>
      <group ref={dropRef} position={[0, dropFrom, 0]}>
        <group ref={swayRef}>
          <group
            scale={MODEL_SCALE}
            position={[
              -SCREEN.center[0] * MODEL_SCALE,
              -SCREEN.center[1] * MODEL_SCALE,
              -SCREEN.center[2] * MODEL_SCALE,
            ]}
          >
            <primitive object={model} />
          </group>

          {/* Phosphor backing: gives the glass something bright to catch. */}
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry
              args={[SCREEN.width * MODEL_SCALE, SCREEN.height * MODEL_SCALE]}
            />
            <meshBasicMaterial color="#0a2a16" toneMapped={false} />
          </mesh>

          {/* The menu itself, projected onto the glass as real DOM. */}
          <Html
            transform
            scale={HTML_SCALE}
            position={[
              0,
              0,
              (SCREEN.frontZ - SCREEN.center[2]) * MODEL_SCALE + 0.004,
            ]}
            zIndexRange={[10, 0]}
            pointerEvents="auto"
          >
            <TVMenu items={items} width={MENU_WIDTH} height={MENU_HEIGHT} />
          </Html>

          {/* Screen spill onto the room. */}
          <pointLight
            position={[0, 0, 0.45]}
            intensity={0.9}
            distance={1.3}
            color="#7dff9e"
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(TV_MODEL_URL);
