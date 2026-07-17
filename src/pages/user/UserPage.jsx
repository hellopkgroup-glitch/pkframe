import { useEffect, useRef, useState } from "react";
import "./UserPage.css";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

import CropModal from "../../components/CropModal/CropModal";
import PosterCanvas from "../../components/PosterCanvas/PosterCanvas";

export default function UserPage() {

  const posterRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState(null);

  const [name, setName] = useState("");

  const [photoPreview, setPhotoPreview] = useState("");

  const [cropImage, setCropImage] = useState("");

  const [showCrop, setShowCrop] = useState(false);

  useEffect(() => {
    loadTemplate();
  }, []);

  async function loadTemplate() {

    try {

      const snap = await getDoc(
        doc(db, "templates", "poster1")
      );

      if (snap.exists()) {
        setTemplate(snap.data());
      }

    } catch (error) {

      console.error(error);

      alert("Failed to load template.");

    }

    setLoading(false);

  }

  function choosePhoto(e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {

      setCropImage(event.target.result);

      setShowCrop(true);

    };

    reader.readAsDataURL(file);

  }

  function finishCrop(image) {

    setPhotoPreview(image);

    setCropImage("");

    setShowCrop(false);

  }

  function downloadPoster() {

    posterRef.current?.downloadPoster();

  }

  if (loading) {
    return (
      <div className="user-loading">
        Loading...
      </div>
    );
  }

  if (!template) {
    return (
      <div className="user-loading">
        Template Not Found
      </div>
    );
  }

  return (

    <div className="user-page">

      {/* ================= HEADER ================= */}

      <div className="user-header">

        <div className="user-logo">
          🎨
        </div>

        <h1>PK FRAME</h1>

        <p>
          Beautiful Poster Generator
        </p>

      </div>

      {/* ================= POSTER ================= */}

      <div className="user-card fade-up">

        <h2>🖼 Live Preview</h2>

        <div className="poster-wrapper">

          <PosterCanvas
            ref={posterRef}
            backgroundImage={template.backgroundImage}
            userImage={photoPreview}
            name={name}
            config={template}
          />

        </div>

      </div>

      {/* ================= NAME ================= */}

      <div className="user-card fade-up">

        <label className="input-label">

          👤 Your Name

        </label>

        <input
          className="text-input"
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

      </div>

      {/* ================= PHOTO ================= */}

      <div className="user-card fade-up">

        <label className="input-label">

          📷 Upload Your Photo

        </label>

        <label className="file-upload">

          <input
            type="file"
            accept="image/*"
            onChange={choosePhoto}
          />

          <span>

            Tap to Choose Photo

          </span>

        </label>

        {photoPreview && (

          <div className="photo-status">

            ✅ Photo Ready

          </div>

        )}

      </div>

      {/* ================= DOWNLOAD ================= */}

      <div className="user-card fade-up">

        <button
          className="download-btn"
          onClick={downloadPoster}
        >

          ⬇ Download Poster

        </button>

      </div>

      {/* ================= FOOTER ================= */}

      <div className="user-footer">

        Powered by PK Group

      </div>

      {/* ================= CROP MODAL ================= */}

      <CropModal
        open={showCrop}
        image={cropImage}
        aspectRatio={
          template.photoWidth /
          template.photoHeight
        }
        onCancel={() => setShowCrop(false)}
        onCrop={finishCrop}
      />

    </div>

  );

}