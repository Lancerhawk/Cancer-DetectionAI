import { useState } from 'react';

const ProstateCancer = () => {
  const [mri, setMri] = useState(null);
  const [biopsy, setBiopsy] = useState(null);
  const [analysisReady, setAnalysisReady] = useState(false);

  const handleMriChange = (e) => {
    setMri(e.target.files[0]);
  };

  const handleBiopsyChange = (e) => {
    setBiopsy(e.target.files[0]);
  };

  const handleBeginAnalysis = () => {
    if (mri && biopsy) {
      setAnalysisReady(true);
    } else {
      alert('Please upload both MRI and Biopsy images!');
    }
  };

  return (
    <div className="cancer-detail">
      <h2>Prostate Cancer</h2>
      <p>Required analysis: MRI, Biopsy</p>

      <div className="upload-section">
        <div>
          <label>Upload MRI:</label>
          <input type="file" accept="image/*" onChange={handleMriChange} />
        </div>
        <div>
          <label>Upload Biopsy:</label>
          <input type="file" accept="image/*" onChange={handleBiopsyChange} />
        </div>
      </div>

      <button onClick={handleBeginAnalysis} className='begin-analysis'>Begin Analysis</button>

      {analysisReady && (
        <div>
          <h3>Analysis Ready</h3>
          <p>Your images are ready for analysis. Proceed with the next steps.</p>
        </div>
      )}

      <div className="scan-images">
        <h3>MRI:</h3>
        {mri && <img src={URL.createObjectURL(mri)} alt="MRI for Prostate Cancer" />}
        <h3>Biopsy:</h3>
        {biopsy && <img src={URL.createObjectURL(biopsy)} alt="Biopsy for Prostate Cancer" />}
      </div>
    </div>
  );
};

export default ProstateCancer;
