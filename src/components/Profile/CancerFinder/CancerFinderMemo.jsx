import { useState } from "react";
import './CancerFinder.css';
import CancerFinderDetailsModal from './CancerFinderDetailsModal'; 

function CancerFinderMemo() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }

    setShowModal(true);
  };

  const handleSaveFormData = async (data) => {
    setFormData(data);
    setShowModal(false); 

    const formData = new FormData();
    formData.append("file", selectedImage);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/predict_new_tumor", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setPrediction(result);
    } catch (error) {
      setError("Error uploading image");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderResult = () => {
    if (!prediction) return null;

    const { class: resultClass, confidence } = prediction;
    let message = `Class: ${resultClass} (Confidence: ${(confidence * 100).toFixed(2)}%)`;
    let precautions = [];
    let alertClass = '';

    switch (resultClass.toLowerCase()) {
        case 'benign':
          message = `The scan suggests a benign condition. Confidence: ${(confidence * 100).toFixed(2)}%. A benign condition means the growth or abnormality is non-cancerous and typically does not pose an immediate health risk. However, regular monitoring is recommended.`;
          precautions = [
            'Regular health check-ups are advised to monitor any changes in the condition.',
            'Monitor for any unusual symptoms or changes and consult your doctor if necessary.',
            'Maintain a healthy lifestyle by eating a balanced diet rich in nutrients.',
            'Avoid excessive stress and engage in regular physical activities to stay active.',
            'Even though benign conditions are non-cancerous, regular screenings are important for monitoring any changes or developments.'
          ];
          alertClass = 'alert-benign';
          break;
      
        case 'Malignant: Pro-B':
          message = `The scan indicates Malignant: Pro-B Cell cancer. Confidence: ${(confidence * 100).toFixed(2)}%. Pro-B Cell cancer is a type of blood cancer that affects early-stage B cells, which are essential for your immune system. This type of malignancy may require treatments such as chemotherapy or immunotherapy.`;
          precautions = [
            'Immediate consultation with an oncologist is essential for further evaluation.',
            'A biopsy and additional tests may be required to confirm the cancerous nature of the cells.',
            'Consider possible treatments such as chemotherapy or immunotherapy, which are common for Pro-B Cell malignancies.',
            'Stay informed about your diagnosis and treatment options to make well-informed decisions.',
            'Follow your oncologist’s guidance carefully and attend all prescribed check-ups and treatments.'
          ];
          alertClass = 'alert-malignant-pro-b';
          break;
      
        case 'malignant: pre-b cell':
          message = `The scan indicates Malignant: Pre-B Cell Cancer. Confidence: ${(confidence * 100).toFixed(2)}%. Pre-B Cell Cancer affects immature B cells and is commonly found in leukemia cases. Early diagnosis is crucial for effective treatment, often involving chemotherapy or targeted therapy.`;
          precautions = [
            'Consult with an oncologist immediately for further tests and potential treatment options.',
            'Chemotherapy and/or targeted therapy are commonly recommended for Pre-B Cell malignancies.',
            'Monitor for side effects from treatments and communicate any changes with your doctor.',
            'Consider joining a support group to help with emotional and mental well-being during treatment.',
            'Ensure proper hydration and get sufficient rest to help your body recover during treatment.'
          ];
          alertClass = 'alert-malignant-pre-b';
          break;
      
        case 'malignant: early pre-b':
          message = `The scan suggests Early Pre-B Cell Malignancy. Confidence: ${(confidence * 100).toFixed(2)}%. Early Pre-B Cell Malignancy is a type of blood cancer affecting B cells at an early stage. Early treatment is essential for a better prognosis, often involving chemotherapy and other targeted treatments.`;
          precautions = [
            'Consult an oncologist as soon as possible to discuss treatment options, as early intervention is crucial.',
            'Early treatments, such as chemotherapy or radiation, may significantly improve prognosis.',
            'Attend regular check-ups and follow your treatment plan as prescribed to ensure the best possible outcome.',
            'Stay connected with support groups and mental health professionals for emotional support.',
            'Focus on your overall well-being, including nutrition, exercise, and relaxation during treatment phases.'
          ];
          alertClass = 'alert-malignant-early-pre-b';
          break;
      
        default:
          message = 'The analysis is inconclusive. Please consult a medical professional for further advice.';
          alertClass = 'alert-warning';
      }
      

    return (
      <div className={`alert-card ${alertClass}`}>
        <h3>Prediction Result</h3>
        <p>{message}</p>
        <h4><strong>Precautions:</strong></h4>
        <ul>
          {precautions.map((precaution, index) => (
            <li key={index}>{precaution}</li>
          ))}
        </ul>
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
    printWindow.document.write('<h3>Analysis Results</h3>');
    printWindow.document.write(`<p><span class="bold">Prediction Class:</span> ${prediction.class}</p>`);
    printWindow.document.write(`<p><span class="bold">Confidence:</span> ${(prediction.confidence * 100).toFixed(2)}%</p>`);
  
    printWindow.document.write('<h4>Precautions:</h4>');
    printWindow.document.write('<ul class="precaution-list">');
    prediction.precautions?.forEach((precaution, index) => {
      printWindow.document.write(`<li>${precaution}</li>`);
      console.log(index);
    });
    printWindow.document.write('</ul>');
    printWindow.document.write('</div>');

    if (selectedImage) {
      printWindow.document.write('<div class="image-container">');
      printWindow.document.write('<h3>Image Analysis</h3>');
      printWindow.document.write(`<img src="${URL.createObjectURL(selectedImage)}" alt="Selected Image" style="max-width: 50%; height: 50%;" />`);
      printWindow.document.write('</div>');
    }

    printWindow.document.write('<div class="note">This report is generated automatically and should not be considered as a final medical diagnosis. Please consult with your healthcare provider for further advice.</div>');
  
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  
  return (
    <div className="cancer-detail">
        <h2>Cancer Detection with Blood Scans/Reports</h2>
        <p>Cancer Detection with Blood Scans/Reports Blood tests can help detect early cancer signs by identifying specific biomarkers, aiding in timely diagnosis and treatment.</p>

      <div className="file-upload-container upload-section">
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <button onClick={handleSubmit} disabled={loading} className="begin-analysis">
          {loading ? 'Loading...' : 'Submit Image'}
        </button>
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Analyzing... Please wait.</p>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {renderResult()}

      {/* Only display the Print Report button once the analysis is completed */}
      {prediction && (
        <button onClick={handlePrint} className="appointment-btn">Print Report</button>
      )}

      <CancerFinderDetailsModal 
        onSave={handleSaveFormData} 
        onClose={() => setShowModal(false)} 
        show={showModal} 
      />
    </div>
  );
}

export default CancerFinderMemo;
