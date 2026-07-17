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

        {/* =========================
            HEADER
        ========================= */}

        <div className="crop-header">

          <div className="crop-title">

            <div className="crop-icon">
              🖼️
            </div>

            <div>

              <h2>
                Adjust Your Photo
              </h2>

              <p>
                Move, zoom or rotate your photo before applying.
              </p>

            </div>

          </div>

          <button
            className="close-btn"
            onClick={onCancel}
            aria-label="Close"
          >
            ✕
          </button>

        </div>

        {/* =========================
            CROPPER
        ========================= */}

        <div className="crop-body">

          <Cropper
            ref={cropperRef}
            src={image}
            style={{
              width: "100%",
              height: 460,
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

        {/* =========================
            TOOLBAR
        ========================= */}

        <div className="crop-tools">

          <button
            type="button"
            onClick={zoomOut}
            title="Zoom Out"
          >
            ➖
          </button>

          <button
            type="button"
            onClick={zoomIn}
            title="Zoom In"
          >
            ➕
          </button>

          <button
            type="button"
            onClick={rotateLeft}
            title="Rotate Left"
          >
            ↺
          </button>

          <button
            type="button"
            onClick={rotateRight}
            title="Rotate Right"
          >
            ↻
          </button>

          <button
            type="button"
            onClick={resetCrop}
            className="reset-btn"
          >
            Reset
          </button>

        </div>

        {/* =========================
            FOOTER
        ========================= */}

        <div className="crop-footer">

          <button
            type="button"
            className="crop-btn crop-btn-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="crop-btn crop-btn-apply"
            onClick={handleCrop}
          >
            ✓ Apply Crop
          </button>

        </div>

      </div>

    </div>
  );
}