import { useState } from 'react';
import './CancerFinder.css';
import CancerFinderPrinting from './CancerFinderPrinting';

const CancerFinder = () => {
  const [selectedTests, setSelectedTests] = useState({
    mri: null,
    medicalReport: null,
  });

  const [analysisReady, setAnalysisReady] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null); 
  const [showModal, setShowModal] = useState(false); 

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setSelectedTests((prevTests) => ({
      ...prevTests,
      [name]: files[0],
    }));
  };

  const handleBeginAnalysis = () => {
    setShowModal(true);
  };

  const handleSaveFormData = (data) => {
    setFormData(data);
    setShowModal(false);
    startAnalysis();
  };

  const startAnalysis = async () => {
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

      const result = await response.json();
      setAnalysisResult(result);
      setAnalysisReady(true);
      setLoading(false);

    } catch (error) {
      setError('Error processing the image. Please try again.');
      setLoading(false);  
      console.log(error);
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

 
  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><style>');
  
    printWindow.document.write(`
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
      }
      h1, h2, h3, h4 {
        text-align: center;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      table, th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
      .report-section {
        margin-bottom: 40px;
      }
      .image-container {
        text-align: center;
        margin: 20px 0;
      }
      .precaution-list li {
        margin: 5px 0;
      }
      .bold {
        font-weight: bold;
      }
      .note {
        font-size: 12px;
        color: #888;
      }
    `);
  
    printWindow.document.write('</style></head><body>');
  
    printWindow.document.write('<h1>VitalCheck</h1>');
    printWindow.document.write('<h2>Cancer Detection Report</h2>');
    printWindow.document.write('<h3>Personal and Medical Information</h3>');
  
    printWindow.document.write('<table><thead><tr><th>Name</th><th>Age</th><th>Gender</th><th>Phone</th><th>Email</th></tr></thead><tbody>');
    printWindow.document.write(
      `<tr><td>${formData?.name || 'N/A'}</td><td>${formData?.age || 'N/A'}</td><td>${formData?.gender || 'N/A'}</td><td>${formData?.phone || 'N/A'}</td><td>${formData?.email || 'N/A'}</td></tr>`
    );
    printWindow.document.write('</tbody></table>');
  
    printWindow.document.write('<div class="report-section">');
    printWindow.document.write('<h3>Health and Lifestyle Information</h3>');
    printWindow.document.write('<p><span class="bold">Smoking:</span> ' + (formData?.smoking === 'yes' ? 'Yes (' + formData?.smokingFrequency + ' per week)' : 'No') + '</p>');
    printWindow.document.write('<p><span class="bold">Alcohol Consumption:</span> ' + (formData?.alcohol === 'yes' ? 'Yes (' + formData?.alcoholFrequency + ' per week)' : 'No') + '</p>');
    printWindow.document.write('<p><span class="bold">Exercise Frequency:</span> ' + formData?.exerciseFrequency + '</p>');
    printWindow.document.write('<p><span class="bold">Chronic Illness History:</span> ' + (formData?.chronicIllness === 'yes' ? 'Yes' : 'No') + '</p>');
    printWindow.document.write('</div>');
  
    printWindow.document.write('<div class="report-section">');
    printWindow.document.write('<p><span class="bold">Surgery History:</span> ' + (formData?.surgeryHistory === 'yes' ? formData?.surgeryDetails : 'No') + '</p>');
    printWindow.document.write('<p><span class="bold">Unexplained Weight Loss:</span> ' + (formData?.weightLoss === 'yes' ? formData?.weightLossDetails : 'No') + '</p>');
    printWindow.document.write('</div>');
  
    printWindow.document.write('<div class="report-section">');
    printWindow.document.write('<p><span class="bold">Pain or Discomfort:</span> ' + (formData?.pain === 'yes' ? formData?.painDetails : 'No') + '</p>');
    printWindow.document.write('<p><span class="bold">Chemical Exposure:</span> ' + (formData?.chemicalExposure === 'yes' ? formData?.chemicalExposureDetails : 'No') + '</p>');
    printWindow.document.write('<p><span class="bold">Family History of Cancer:</span> ' + (formData?.familyHistory === 'yes' ? 'Yes' : 'No') + '</p>');
    printWindow.document.write('</div>');
  
    printWindow.document.write('<div class="report-section">');
    printWindow.document.write('<h2>Analysis Results</h2>');
    const { class: resultClass, confidence } = analysisResult;
    printWindow.document.write(`<p><span class="bold">Result Class:</span> ${resultClass} (Confidence: ${(confidence * 100).toFixed(2)}%)</p>`);
  
    printWindow.document.write('<h4>Precautions:</h4>');
    printWindow.document.write('<ul class="precaution-list">');
    const precautions = [
      'Continue with regular health check-ups and screenings.',
      'Maintain a balanced and healthy diet rich in fruits, vegetables, and whole grains.',
      'Incorporate regular physical activity into your lifestyle.',
      'Avoid smoking and limit alcohol consumption.',
      'Manage stress through activities like yoga, meditation, or deep breathing exercises.',
      'Stay hydrated and get adequate sleep.',
    ]; 
  
    precautions.forEach((precaution, index) => {
      printWindow.document.write(`<li>${precaution}</li>`);
      console.log(index);
    });
    printWindow.document.write('</ul>');
  
    if (resultClass.toLowerCase() === 'malignant') {
      printWindow.document.write('<button class="appointment-btn">Schedule Doctor Appointment</button>');
    }
    printWindow.document.write('</div>');
  
    if (selectedTests.mri) {
      printWindow.document.write('<div class="image-container">');
      printWindow.document.write('<h3>MRI Scan</h3>');
      printWindow.document.write(`<img src="${URL.createObjectURL(selectedTests.mri)}" alt="MRI Scan" style="max-width: 100%; height: auto;" />`);
      printWindow.document.write('</div>');
    }
  
    printWindow.document.write('<div class="note">This report is generated automatically and should not be considered as a final medical diagnosis. Please consult with your healthcare provider for further advice.</div>');
  
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };
  
  return (
    <div className="cancer-detail">
      <h2>Cancer Detection & Health Assistant</h2>
      <p>Our AI system helps detect cancerous growths from your MRI scans with a simple upload. Get personalized advice, treatments, and doctor appointment scheduling based on the analysis.</p>

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


      {analysisReady && (
        <div className="cancerfinder-print-button-container">
          <button onClick={handlePrint}>Print Report</button>
        </div>
      )}

      <div className="scan-images">
        {selectedTests.mri && (
          <div>
            <h3>MRI Scan:</h3>
            <img src={URL.createObjectURL(selectedTests.mri)} alt="MRI Scan" />
          </div>
        )}
      </div>

      <CancerFinderPrinting
        show={showModal}
        onSave={handleSaveFormData}
        onClose={() => setShowModal(false)}
        resultData={analysisResult}
      />
    </div>
  );
};

export default CancerFinder;
