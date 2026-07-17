import "./AdminPreview.css";

const POSTER_WIDTH = 1080;
const POSTER_HEIGHT = 1440;

export default function AdminPreview({
  backgroundImage,
  config = {},
  sampleName = "Sample Name",
  showPhotoBox = true,
}) {
  const {
    photoX = 685,
    photoY = 812,
    photoWidth = 355,
    photoHeight = 430,
    textX = 540,
    textY = 120,
    fontSize = 45,
    textColor = "#000000",
  } = config;

  const photoStyle = {
    left: `${(photoX / POSTER_WIDTH) * 100}%`,
    top: `${(photoY / POSTER_HEIGHT) * 100}%`,
    width: `${(photoWidth / POSTER_WIDTH) * 100}%`,
    height: `${(photoHeight / POSTER_HEIGHT) * 100}%`,
  };

  const textStyle = {
    left: `${(textX / POSTER_WIDTH) * 100}%`,
    bottom: `${(textY / POSTER_HEIGHT) * 100}%`,
    fontSize: `${fontSize / 3}px`,
    color: textColor,
  };

  return (
    <div className="admin-preview">
      <div className="poster-preview">
        {/* Background */}
        {backgroundImage ? (
          <img src={backgroundImage} alt="Poster Background" className="poster-background" draggable={false} />
        ) : (
          <div className="poster-empty">
            <div className="poster-empty-icon">🖼️</div>
            <h3>No Background</h3>
            <p>Upload a background image to start editing.</p>
          </div>
        )}

        {/* Photo Placeholder */}
        {showPhotoBox && (
          <div className="photo-placeholder" style={photoStyle}>
            <div className="photo-label">PHOTO</div>
          </div>
        )}

        {/* Sample Text */}
        <div className="text-placeholder" style={textStyle}>
          {sampleName}
        </div>

        {/* Guides */}
        <div className="preview-guides">
          <div className="guide guide-horizontal"></div>
          <div className="guide guide-vertical"></div>
        </div>
      </div>

      {/* Preview Footer */}
      <footer className="preview-footer">
        <div className="preview-size">
          <span>📐</span>
          <strong>1080 × 1440 px</strong>
        </div>
        <div className="preview-status">
          <span className="status-dot"></span>
          LIVE PREVIEW
        </div>
      </footer>
    </div>
  );
}