import { useEffect, useState } from "react";
import "./AdminPage.css";
import AdminPreview from "../../components/AdminPreview/AdminPreview";
import { saveTemplate, getTemplate } from "../../services/firebaseService";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState("");
  const [config, setConfig] = useState({
    photoX: 685, photoY: 812, photoWidth: 355, photoHeight: 430,
    textX: 540, textY: 120, fontSize: 45, textColor: "#000000",
  });

  useEffect(() => {
    void loadTemplate();
  }, []);

  async function loadTemplate() {
    try {
      const data = await getTemplate();
      if (data) {
        setConfig((prev) => ({ ...prev, ...data }));
        if (data.backgroundImage) setBackgroundPreview(data.backgroundImage);
      }
    } catch (error) {
      console.error(error);
      // TODO: Replace with Toast Notification later
      alert("Failed to load template.");
    } finally {
      setLoading(false);
    }
  }

  function chooseBackground(e) {
    const file = e.target.files[0];
    if (!file) return;
    setBackgroundFile(file);
    setBackgroundPreview(URL.createObjectURL(file));
  }

  function updateValue(e) {
    const { name, value } = e.target;
    setConfig((prev) => ({ 
      ...prev, 
      [name]: name === "textColor" ? value : Number(value) 
    }));
  }

  async function handleSave() {
    try {
      setSaving(true);
      await saveTemplate(backgroundFile, config);
      // TODO: Replace with Toast Notification later
      alert("✔ Template Saved Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to Save Template");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="admin-page">
      <div className="admin-header fade-up">
        {/* logo.svg പബ്ലിക് ഫോൾഡറിൽ ഉണ്ടെന്ന് ഉറപ്പുവരുത്തുക */}
        <img src="/logo.svg" className="admin-logo" alt="Logo" onError={(e) => e.target.style.display = 'none'} />
        <h1>PK FRAME</h1>
        <p>Template Studio</p>
      </div>

      {/* Live Preview */}
      <div className="admin-card fade-up">
        <div className="card-title">
          <div><h2><span>🖼</span> Live Preview</h2><p>Real-time template preview</p></div>
          <span className="status-badge">LIVE</span>
        </div>
        <div className="preview-wrapper">
          <AdminPreview backgroundImage={backgroundPreview} config={config} />
        </div>
      </div>

      {/* Background Image */}
      <div className="admin-card fade-up">
        <div className="card-title"><div><h2><span>☁️</span> Background Image</h2><p>Upload a poster background</p></div></div>
        <label className="upload-box">
          <input type="file" accept="image/*" onChange={chooseBackground} />
          <div className="upload-content">
            <div className="upload-icon">☁️</div> 
            <h3>Choose Background</h3>
            <p>JPG, PNG or WEBP</p>
          </div>
        </label>
        {backgroundPreview && <div className="file-info">✅ Background Selected</div>}
      </div>

      {/* Photo Position */}
      <div className="admin-card fade-up">
        <div className="card-title"><div><h2><span>📷</span> Photo Position</h2><p>Adjust the user photo placement</p></div></div>
        <div className="grid-two">
          {["photoX", "photoY", "photoWidth", "photoHeight"].map((key) => (
            <div className="input-group" key={key}>
              <label>{key.replace("photo", "").trim()}</label>
              <input type="number" name={key} value={config[key]} onChange={updateValue} />
            </div>
          ))}
        </div>
      </div>

      {/* Text Settings */}
      <div className="admin-card fade-up">
        <div className="card-title"><div><h2><span>✍️</span> Text Settings</h2><p>Customize the name position and style</p></div></div>
        <div className="grid-two">
          {["textX", "textY", "fontSize"].map((key) => (
            <div className="input-group" key={key}>
              <label>{key.replace("text", "").trim()}</label>
              <input type="number" name={key} value={config[key]} onChange={updateValue} />
            </div>
          ))}
          <div className="input-group">
            <label>Text Color</label>
            <input className="color-picker" type="color" name="textColor" value={config.textColor} onChange={updateValue} />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="admin-card fade-up">
        <button className="save-btn" onClick={handleSave} disabled={saving}>
          {saving ? "Publishing..." : "Publish Template"}
        </button>
      </div>
    </div>
  );
}