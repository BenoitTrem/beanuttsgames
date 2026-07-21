"use client";

import { useEffect, useRef } from "react";

export default function TVStatic({
  grainOpacity = 0.06,
  fps = 15,
  pixelSize = 6,
}: {
  grainOpacity?: number;
  fps?: number;
  pixelSize?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 320;
    let H = 180;
    let imageData = ctx.createImageData(W, H);
    let buffer = imageData.data;

    function resize() {
      const cw = canvas!.clientWidth || window.innerWidth;
      const ch = canvas!.clientHeight || window.innerHeight;

      W = Math.max(1, Math.round(cw / pixelSize));
      H = Math.max(1, Math.round(ch / pixelSize));

      canvas!.width = W;
      canvas!.height = H;

      imageData = ctx!.createImageData(W, H);
      buffer = imageData.data;
    }

    resize();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    }
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    let raf: number;
    let lastTime = 0;
    const interval = 1000 / fps;

    function draw(time: number) {
      raf = requestAnimationFrame(draw);
      if (time - lastTime < interval) return;
      lastTime = time;

      for (let i = 0; i < buffer.length; i += 4) {
        const shade = Math.random() * 55;
        buffer[i] = shade;
        buffer[i + 1] = shade;
        buffer[i + 2] = shade;
        buffer[i + 3] = 255;
      }

      const lineCount = Math.floor(Math.random() * 4);
      for (let l = 0; l < lineCount; l++) {
        const y = Math.floor(Math.random() * H);
        const thickness = Math.random() < 0.7 ? 1 : 2;
        const brightness = 120 + Math.random() * 135;
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
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      clearTimeout(resizeTimeout);
    };
  }, [fps, pixelSize]);

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
