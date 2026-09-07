"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";
import { Suspense, type ReactNode } from "react";

type SceneProps = {
  children: ReactNode;
  className?: string;
} & Omit<CanvasProps, "children" | "className">;

/** Loading readout, rendered inside the canvas while assets stream in. */
function SceneLoader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <p className="font-mono text-xs tracking-widest text-white/70 whitespace-nowrap">
        {Math.round(progress)}%
      </p>
    </Html>
  );
}

/**
 * Shared react-three-fiber canvas. Every 3D block on the site mounts through
 * here so camera defaults, colour management and DPR clamping stay consistent.
 */
export default function Scene({
  children,
  className,
  camera = { position: [0, 0, 3], fov: 35 },
  ...props
}: SceneProps) {
  return (
    <div className={className}>
      <Canvas
        camera={camera}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        {...props}
      >
        <Suspense fallback={<SceneLoader />}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
