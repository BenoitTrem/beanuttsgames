"use client";

import { useEffect, useRef } from "react";

export default function TVStatic({
  grainOpacity = 0.06,
  fps = 15,
}: {
  grainOpacity?: number;
  fps?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Higher internal resolution = smaller, finer grain instead of chunky blocks.
    const W = 320;
    const H = 180;
    canvas.width = W;
    canvas.height = H;

    const imageData = ctx.createImageData(W, H);
    const buffer = imageData.data;

    let raf: number;
    let lastTime = 0;
    const interval = 1000 / fps;

    function draw(time: number) {
      raf = requestAnimationFrame(draw);
      if (time - lastTime < interval) return;
      lastTime = time;

      // Faint background grain — subtle, narrow brightness range
      for (let i = 0; i < buffer.length; i += 4) {
        const shade = Math.random() * 55;
        buffer[i] = shade;
        buffer[i + 1] = shade;
        buffer[i + 2] = shade;
        buffer[i + 3] = 255;
      }

      // Full-width glitch lines — random count, position, thickness, brightness
      const lineCount = Math.floor(Math.random() * 4); // 0-3 lines this frame
      for (let l = 0; l < lineCount; l++) {
        const y = Math.floor(Math.random() * H);
        const thickness = Math.random() < 0.7 ? 1 : 2;
        const brightness = 120 + Math.random() * 135; // brighter than the grain
        for (let t = 0; t < thickness && y + t < H; t++) {
          const rowStart = (y + t) * W * 4;
          for (let x = 0; x < W; x++) {
            const idx = rowStart + x * 4;
            buffer[idx] = brightness;
            buffer[idx + 1] = brightness;
            buffer[idx + 2] = brightness;
            buffer[idx + 3] = 255;
          }
        }
      }

      ctx!.putImageData(imageData, 0, 0);
    }

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [fps]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: grainOpacity,
        imageRendering: "pixelated",
        mixBlendMode: "screen",
      }}
    />
  );
}
