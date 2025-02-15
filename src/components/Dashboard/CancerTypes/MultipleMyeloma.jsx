import { useState } from 'react';

const MultipleMyeloma = () => {
  const [bloodTest, setBloodTest] = useState(null);
  const [boneMarrowBiopsy, setBoneMarrowBiopsy] = useState(null);
  const [analysisReady, setAnalysisReady] = useState(false);

  const handleBloodTestChange = (e) => {
    setBloodTest(e.target.files[0]);
  };

  const handleBoneMarrowBiopsyChange = (e) => {
    setBoneMarrowBiopsy(e.target.files[0]);
  };

  const handleBeginAnalysis = () => {
    if (bloodTest && boneMarrowBiopsy) {
      setAnalysisReady(true);
    } else {
      alert('Please upload both Blood Test and Bone Marrow Biopsy images!');
    }
  };

  return (
    <div className="cancer-detail">
      <h2>Multiple Myeloma</h2>
      <p>Required analysis: Blood Test, Bone Marrow Biopsy</p>

      <div className="upload-section">
        <div>
          <label>Upload Blood Test:</label>
          <input type="file" accept="image/*" onChange={handleBloodTestChange} />
        </div>
        <div>
          <label>Upload Bone Marrow Biopsy:</label>
          <input type="file" accept="image/*" onChange={handleBoneMarrowBiopsyChange} />
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
        {bloodTest && <img src={URL.createObjectURL(bloodTest)} alt="Blood Test for Multiple Myeloma" />}
        <h3>Bone Marrow Biopsy:</h3>
        {boneMarrowBiopsy && <img src={URL.createObjectURL(boneMarrowBiopsy)} alt="Bone Marrow Biopsy for Multiple Myeloma" />}
      </div>
    </div>
  );
};

export default MultipleMyeloma;
