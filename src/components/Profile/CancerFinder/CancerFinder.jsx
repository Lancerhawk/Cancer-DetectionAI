import { useState } from 'react';
import './CancerFinder.css';

const CancerFinder = () => {
  const [selectedTests, setSelectedTests] = useState({
    mri: null,
    medicalReport: null,
  });

  const [analysisReady, setAnalysisReady] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);  // State for loading
  const [error, setError] = useState(null);  // State for error handling

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setSelectedTests((prevTests) => ({
      ...prevTests,
      [name]: files[0],
    }));
  };

  const handleBeginAnalysis = async () => {
    const { mri, medicalReport } = selectedTests;

    if (!mri) {
      alert('Please upload an MRI scan!');
      return;
    }

    const formData = new FormData();
    formData.append('file', mri);
    if (medicalReport) {
      formData.append('medicalReport', medicalReport);
    }

    setLoading(true); 

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      setTimeout(async () => {
        const result = await response.json();
        setAnalysisResult(result);
        setAnalysisReady(true);
        setLoading(false); 
      }, 2000); 

    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError('Error processing the image. Please try again.');
      setLoading(false);  
    }
  };

  const renderResult = () => {
    if (!analysisResult) return null;

    const { class: resultClass, confidence } = analysisResult;

    let message = '';
    let precautions = [];
    let doctorAppointment = null;
    let alertClass = '';

    switch (resultClass.toLowerCase()) {
      case 'normal':
        message = `The MRI scan shows no signs of cancer. Confidence: ${(confidence * 100).toFixed(2)}%`;
        precautions = [
          'Continue with regular health check-ups and screenings.',
          'Maintain a balanced and healthy diet rich in fruits, vegetables, and whole grains.',
          'Incorporate regular physical activity into your lifestyle.',
          'Avoid smoking and limit alcohol consumption.',
          'Manage stress through activities like yoga, meditation, or deep breathing exercises.',
          'Stay hydrated and get adequate sleep.',
        ];
        alertClass = 'alert-normal';
        break;
      case 'benign':
        message = `The scan suggests a benign growth. Confidence: ${(confidence * 100).toFixed(2)}%`;
        precautions = [
          'While benign tumors are non-cancerous, regular monitoring is advised.',
          'Schedule follow-up scans every 6 months as recommended by your doctor.',
          'Avoid heavy lifting or straining that could affect the area of the benign growth.',
          'Maintain a healthy lifestyle with a balanced diet and regular exercise.',
          'Discuss any new symptoms or changes with your doctor promptly.',
          'Take any prescribed medications or treatments as instructed by your healthcare provider.',
        ];
        alertClass = 'alert-benign';
        break;
      case 'malignant':
        message = `The MRI scan indicates a malignant tumor. Confidence: ${(confidence * 100).toFixed(2)}%`;
        precautions = [
          'Immediate consultation with an oncologist is recommended.',
          'A biopsy or additional diagnostic tests may be required for further confirmation.',
          'Prepare for possible treatment options such as surgery, chemotherapy, or radiation therapy.',
          'Follow your oncologist’s advice for any lifestyle modifications to improve treatment outcomes.',
          'Consider seeking support groups or counseling to manage the emotional impact.',
          'Monitor for any new symptoms or side effects from ongoing treatments.',
        ];
        doctorAppointment = <button className="appointment-btn">Schedule Doctor Appointment</button>;
        alertClass = 'alert-malignant';
        break;
      default:
        message = 'The analysis is inconclusive. Please consult a medical professional for further advice.';
        alertClass = 'alert-warning';
    }

    return (
      <div className={`alert-card ${alertClass}`}>
        <h3>Analysis Result</h3>
        <p>{message}</p>
        <h4><strong>Precautions:</strong></h4>
        <ul>
          {precautions.map((precaution, index) => (
            <li key={index}>{precaution}</li>
          ))}
        </ul>
        {doctorAppointment && <div>{doctorAppointment}</div>}
      </div>
    );
  };

  return (
    <div className="cancer-detail">
      <h2>Cancer Detection</h2>
      <p>Detect cancer or tumor using our AI by uploading your MRI scan and clicking on begin analysis.</p>

      <div className="upload-section">
        <div>
          <label className='heading-upload'>Upload MRI Scan:</label>
          <input type="file" name="mri" accept="image/*" onChange={handleFileChange} />
        </div>
        <div>
          <label className='heading-upload'>Upload Previous Medical Reports (Optional):</label>
          <input type="file" name="medicalReport" accept="application/pdf, .doc, .docx" onChange={handleFileChange} />
        </div>
      </div>

      <button onClick={handleBeginAnalysis} className="begin-analysis">Begin Analysis</button>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Analyzing... Please wait.</p>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {analysisReady && renderResult()}

      <div className="scan-images">
        {selectedTests.mri && (
          <div>
            <h3>MRI Scan:</h3>
            <img src={URL.createObjectURL(selectedTests.mri)} alt="MRI Scan" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CancerFinder;
