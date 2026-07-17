import { useEffect, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./CropModal.css";

export default function CropModal({
  open,
  image,
  aspectRatio = 1,
  onCancel,
  onCrop,
}) {
  const cropperRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  function handleCrop() {
    const cropper = cropperRef.current?.cropper;

    if (!cropper) return;

    const canvas = cropper.getCroppedCanvas({
      width: 800,
      height: Math.round(800 / aspectRatio),
      imageSmoothingEnabled: true,
      imageSmoothingQuality: "high",
      fillColor: "#ffffff",
    });

    if (!canvas) return;

    onCrop(canvas.toDataURL("image/png", 1));
  }

  function zoomIn() {
    cropperRef.current?.cropper.zoom(0.1);
  }

  function zoomOut() {
    cropperRef.current?.cropper.zoom(-0.1);
  }

  function rotateLeft() {
    cropperRef.current?.cropper.rotate(-90);
  }

  function rotateRight() {
    cropperRef.current?.cropper.rotate(90);
  }

  function resetCrop() {
    cropperRef.current?.cropper.reset();
  }

  return (
    <div className="crop-overlay">

      <div className="crop-modal">

        <div className="crop-header">

          <h2>Crop Photo</h2>

          <button
            className="close-btn"
            onClick={onCancel}
          >
            ✕
          </button>

        </div>

        <div className="crop-body">

          <Cropper
            ref={cropperRef}
            src={image}
            style={{
              width: "100%",
              height: 420,
            }}
            aspectRatio={aspectRatio}
            viewMode={1}
            guides={true}
            background={false}
            responsive={true}
            autoCropArea={1}
            dragMode="move"
            checkOrientation={false}
            movable={true}
            scalable={true}
            zoomable={true}
            cropBoxResizable={true}
            cropBoxMovable={true}
          />

        </div>

        <div className="crop-tools">

          <button onClick={zoomOut}>－</button>

          <button onClick={zoomIn}>＋</button>

          <button onClick={rotateLeft}>⟲</button>

          <button onClick={rotateRight}>⟳</button>

          <button onClick={resetCrop}>Reset</button>

        </div>

        <div className="crop-footer">

          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="apply-btn"
            onClick={handleCrop}
          >
            Apply Crop
          </button>

        </div>

      </div>

    </div>
  );
}