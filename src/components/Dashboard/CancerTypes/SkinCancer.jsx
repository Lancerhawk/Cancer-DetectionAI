import { useState } from 'react';

const SkinCancer = () => {
  const [biopsy, setBiopsy] = useState(null);
  const [analysisReady, setAnalysisReady] = useState(false);

  const handleBiopsyChange = (e) => {
    setBiopsy(e.target.files[0]);
  };

  const handleBeginAnalysis = () => {
    if (biopsy) {
      setAnalysisReady(true);
    } else {
      alert('Please upload Biopsy image!');
    }
  };

  return (
    <div className="cancer-detail">
      <h2>Skin Cancer</h2>
      <p>Required analysis: Biopsy</p>

      <div className="upload-section">
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
        <h3>Biopsy:</h3>
        {biopsy && <img src={URL.createObjectURL(biopsy)} alt="Biopsy for Skin Cancer" />}
      </div>
    </div>
  );
};

export default SkinCancer;
