import { useState } from 'react';

const EndometrialCancer = () => {
  const [ultrasound, setUltrasound] = useState(null);
  const [biopsy, setBiopsy] = useState(null);
  const [analysisReady, setAnalysisReady] = useState(false);

  const handleUltrasoundChange = (e) => {
    setUltrasound(e.target.files[0]);
  };

  const handleBiopsyChange = (e) => {
    setBiopsy(e.target.files[0]);
  };

  const handleBeginAnalysis = () => {
    if (ultrasound && biopsy) {
      setAnalysisReady(true);
    } else {
      alert('Please upload both Ultrasound and Biopsy images!');
    }
  };

  return (
    <div className="cancer-detail">
      <h2>Endometrial Cancer</h2>
      <p>Required analysis: Ultrasound, Biopsy</p>

      <div className="upload-section">
        <div>
          <label>Upload Ultrasound:</label>
          <input type="file" accept="image/*" onChange={handleUltrasoundChange} />
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
        <h3>Ultrasound:</h3>
        {ultrasound && <img src={URL.createObjectURL(ultrasound)} alt="Ultrasound for Endometrial Cancer" />}
        <h3>Biopsy:</h3>
        {biopsy && <img src={URL.createObjectURL(biopsy)} alt="Biopsy for Endometrial Cancer" />}
      </div>
    </div>
  );
};

export default EndometrialCancer;
