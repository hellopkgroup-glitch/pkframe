import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import "./PosterCanvas.css";

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1440;

const PosterCanvas = forwardRef(({ backgroundImage, userImage, name, config }, ref) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const backgroundRef = useRef(null);
  const photoRef = useRef(null);

  useImperativeHandle(ref, () => ({
    downloadPoster,
    redraw() {
      if (config) drawPoster();
    },
  }));

  useEffect(() => {
    if (!config) return;
    drawPoster();
  }, [backgroundImage, userImage, name, config]);

  async function loadImage(src) {
    return new Promise((resolve, reject) => {
      if (!src) { resolve(null); return; }
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Image Load Failed"));
      image.src = src;
    });
  }

  async function drawPoster() {
    if (isDrawing.current) return;
    isDrawing.current = true;

    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
      
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      backgroundRef.current = await loadImage(backgroundImage);
      photoRef.current = await loadImage(userImage);

      // 1. Background
      if (backgroundRef.current) {
        ctx.drawImage(backgroundRef.current, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      } else {
        ctx.fillStyle = "#f2f2f2";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }

      // 2. User Photo / Placeholder
      if (photoRef.current) {
        ctx.drawImage(photoRef.current, config.photoX, config.photoY, config.photoWidth, config.photoHeight);
      } else {
        ctx.strokeStyle = "#ff3b30";
        ctx.lineWidth = 5;
        ctx.setLineDash([18, 10]);
        ctx.strokeRect(config.photoX, config.photoY, config.photoWidth, config.photoHeight);
        ctx.setLineDash([]);
        ctx.fillStyle = "#ff3b30";
        ctx.font = "bold 28px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("PHOTO", config.photoX + config.photoWidth / 2, config.photoY + config.photoHeight / 2);
      }

      // 3. Name
      ctx.fillStyle = config.textColor || "#000000";
      ctx.font = `500 ${config.fontSize}px "Anek Malayalam", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(name || "Sample Name", config.textX, CANVAS_HEIGHT - config.textY);
    } catch (error) {
      console.error("Canvas Drawing Error:", error);
    } finally {
      isDrawing.current = false;
    }
  }

  function downloadPoster() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `PK-Frame-${Date.now()}.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, "image/png", 1);
  }

  return (
    <div className="poster-canvas-container">
      <canvas ref={canvasRef} className="poster-canvas" />
    </div>
  );
});

PosterCanvas.displayName = "PosterCanvas";
export default PosterCanvas;