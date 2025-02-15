import { useState } from 'react';

const CervicalCancer = () => {
  const [papSmear, setPapSmear] = useState(null);
  const [biopsy, setBiopsy] = useState(null);
  const [analysisReady, setAnalysisReady] = useState(false);

  const handlePapSmearChange = (e) => {
    setPapSmear(e.target.files[0]);
  };

  const handleBiopsyChange = (e) => {
    setBiopsy(e.target.files[0]);
  };

  const handleBeginAnalysis = () => {
    if (papSmear && biopsy) {
      setAnalysisReady(true);
    } else {
      alert('Please upload both Pap Smear and Biopsy images!');
    }
  };

  return (
    <div className="cancer-detail">
      <h2>Cervical Cancer</h2>
      <p>Required analysis: Pap Smear, Biopsy</p>

      <div className="upload-section">
        <div>
          <label>Upload Pap Smear:</label>
          <input type="file" accept="image/*" onChange={handlePapSmearChange} />
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
        <h3>Pap Smear:</h3>
        {papSmear && <img src={URL.createObjectURL(papSmear)} alt="Pap Smear for Cervical Cancer" />}
        <h3>Biopsy:</h3>
        {biopsy && <img src={URL.createObjectURL(biopsy)} alt="Biopsy for Cervical Cancer" />}
      </div>
    </div>
  );
};

export default CervicalCancer;
