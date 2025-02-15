import { useState } from 'react';

const StomachCancer = () => {
  const [endoscopy, setEndoscopy] = useState(null);
  const [biopsy, setBiopsy] = useState(null);
  const [analysisReady, setAnalysisReady] = useState(false);

  const handleEndoscopyChange = (e) => {
    setEndoscopy(e.target.files[0]);
  };

  const handleBiopsyChange = (e) => {
    setBiopsy(e.target.files[0]);
  };

  const handleBeginAnalysis = () => {
    if (endoscopy && biopsy) {
      setAnalysisReady(true);
    } else {
      alert('Please upload both Endoscopy and Biopsy images!');
    }
  };

  return (
    <div className="cancer-detail">
      <h2>Stomach Cancer</h2>
      <p>Required analysis: Endoscopy, Biopsy</p>

      <div className="upload-section">
        <div>
          <label>Upload Endoscopy:</label>
          <input type="file" accept="image/*" onChange={handleEndoscopyChange} />
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
        <h3>Endoscopy:</h3>
        {endoscopy && <img src={URL.createObjectURL(endoscopy)} alt="Endoscopy for Stomach Cancer" />}
        <h3>Biopsy:</h3>
        {biopsy && <img src={URL.createObjectURL(biopsy)} alt="Biopsy for Stomach Cancer" />}
      </div>
    </div>
  );
};

export default StomachCancer;
