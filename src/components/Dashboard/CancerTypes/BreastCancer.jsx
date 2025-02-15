import { useState } from 'react';

const BreastCancer = () => {
  const [mammogram, setMammogram] = useState(null);
  const [biopsy, setBiopsy] = useState(null);
  const [analysisReady, setAnalysisReady] = useState(false);

  const handleMammogramChange = (e) => {
    setMammogram(e.target.files[0]);
  };

  const handleBiopsyChange = (e) => {
    setBiopsy(e.target.files[0]);
  };

  const handleBeginAnalysis = () => {
    if (mammogram && biopsy) {
      setAnalysisReady(true);
    } else {
      alert('Please upload both Mammogram and Biopsy images!');
    }
  };

  return (
    <div className="cancer-detail">
      <h2>Breast Cancer</h2>
      <p>Required analysis: Mammogram, Biopsy</p>

      <div className="upload-section">
        <div>
          <label>Upload Mammogram:</label>
          <input type="file" accept="image/*" onChange={handleMammogramChange} />
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
        <h3>Mammogram:</h3>
        {mammogram && <img src={URL.createObjectURL(mammogram)} alt="Mammogram for Breast Cancer" />}
        <h3>Biopsy:</h3>
        {biopsy && <img src={URL.createObjectURL(biopsy)} alt="Biopsy for Breast Cancer" />}
      </div>
    </div>
  );
};

export default BreastCancer;
