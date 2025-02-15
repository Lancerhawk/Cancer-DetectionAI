import { useState } from 'react';

const KidneyCancer = () => {
  const [ctScan, setCtScan] = useState(null);
  const [biopsy, setBiopsy] = useState(null);
  const [analysisReady, setAnalysisReady] = useState(false);

  const handleCtScanChange = (e) => {
    setCtScan(e.target.files[0]);
  };

  const handleBiopsyChange = (e) => {
    setBiopsy(e.target.files[0]);
  };

  const handleBeginAnalysis = () => {
    if (ctScan && biopsy) {
      setAnalysisReady(true);
    } else {
      alert('Please upload both CT Scan and Biopsy images!');
    }
  };

  return (
    <div className="cancer-detail">
      <h2>Kidney Cancer</h2>
      <p>Required analysis: CT Scan, Biopsy</p>

      <div className="upload-section">
        <div>
          <label>Upload CT Scan:</label>
          <input type="file" accept="image/*" onChange={handleCtScanChange} />
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
        <h3>CT Scan:</h3>
        {ctScan && <img src={URL.createObjectURL(ctScan)} alt="CT Scan for Kidney Cancer" />}
        <h3>Biopsy:</h3>
        {biopsy && <img src={URL.createObjectURL(biopsy)} alt="Biopsy for Kidney Cancer" />}
      </div>
    </div>
  );
};

export default KidneyCancer;
