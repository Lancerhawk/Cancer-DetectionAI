import { useState } from 'react';

const LungCancer = () => {
  const [ctScan, setCtScan] = useState(null);
  const [xRay, setXRay] = useState(null);
  const [analysisReady, setAnalysisReady] = useState(false);

  const handleCtScanChange = (e) => {
    setCtScan(e.target.files[0]);
  };

  const handleXRayChange = (e) => {
    setXRay(e.target.files[0]);
  };

  const handleBeginAnalysis = () => {
    if (ctScan && xRay) {
      setAnalysisReady(true);
    } else {
      alert('Please upload both CT Scan and X-Ray images!');
    }
  };

  return (
    <div className="cancer-detail">
      <h2>Lung Cancer</h2>
      <p>Required analysis: CT Scan, X-Ray</p>

      <div className="upload-section">
        <div>
          <label>Upload CT Scan:</label>
          <input type="file" accept="image/*" onChange={handleCtScanChange} />
        </div>
        <div>
          <label>Upload X-Ray:</label>
          <input type="file" accept="image/*" onChange={handleXRayChange} />
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
        {ctScan && <img src={URL.createObjectURL(ctScan)} alt="CT Scan for Lung Cancer" />}
        <h3>X-Ray:</h3>
        {xRay && <img src={URL.createObjectURL(xRay)} alt="X-Ray for Lung Cancer" />}
      </div>
    </div>
  );
};

export default LungCancer;
