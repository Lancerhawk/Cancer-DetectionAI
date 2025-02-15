import { useState } from 'react';

const Leukemia = () => {
  const [bloodTest, setBloodTest] = useState(null);
  const [boneMarrowTest, setBoneMarrowTest] = useState(null);
  const [analysisReady, setAnalysisReady] = useState(false);

  const handleBloodTestChange = (e) => {
    setBloodTest(e.target.files[0]);
  };

  const handleBoneMarrowTestChange = (e) => {
    setBoneMarrowTest(e.target.files[0]);
  };

  const handleBeginAnalysis = () => {
    if (bloodTest && boneMarrowTest) {
      setAnalysisReady(true);
    } else {
      alert('Please upload both Blood Test and Bone Marrow Test images!');
    }
  };

  return (
    <div className="cancer-detail">
      <h2>Leukemia</h2>
      <p>Required analysis: Blood Test, Bone Marrow Test</p>

      <div className="upload-section">
        <div>
          <label>Upload Blood Test:</label>
          <input type="file" accept="image/*" onChange={handleBloodTestChange} />
        </div>
        <div>
          <label>Upload Bone Marrow Test:</label>
          <input type="file" accept="image/*" onChange={handleBoneMarrowTestChange} />
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
        <h3>Blood Test:</h3>
        {bloodTest && <img src={URL.createObjectURL(bloodTest)} alt="Blood Test for Leukemia" />}
        <h3>Bone Marrow Test:</h3>
        {boneMarrowTest && <img src={URL.createObjectURL(boneMarrowTest)} alt="Bone Marrow Test for Leukemia" />}
      </div>
    </div>
  );
};

export default Leukemia;
