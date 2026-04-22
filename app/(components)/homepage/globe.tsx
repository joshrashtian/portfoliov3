"use client";

import { useRef, useEffect } from "react";
import createGlobe from "cobe";

/** CSS pixel size of the globe (buffer is 2× for `devicePixelRatio: 2`). */
const GLOBE_PX = 300;

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: GLOBE_PX * 2,
      height: GLOBE_PX * 2,
      phi: 30,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        // longitude latitude
        { location: [34.05, -118.25], size: 0.1 },
      ],
      onRender: (state: Record<string, unknown>) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi as number;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="mx-auto block h-auto max-w-full"
      style={{
        width: GLOBE_PX,
        height: GLOBE_PX,
        maxWidth: "100%",
        aspectRatio: 1,
      }}
    />
  );
}
