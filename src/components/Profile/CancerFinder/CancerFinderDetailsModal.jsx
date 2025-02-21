/* eslint-disable react/prop-types */
import { useState } from 'react';
import './CancerFinderPrinting.css';

const CancerFinderDetailsModal = ({ onSave, onClose, show }) => {
  const [details, setDetails] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    smoking: '',
    alcohol: '',
    familyHistory: '',
    smokingFrequency: '', 
    alcoholFrequency: '',
    exerciseFrequency: '', 
    chronicIllness: '', 
    surgeryHistory: '', 
    surgeryDetails: '', 
    weightLoss: '', 
    pain: '', 
    chemicalExposure: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSave(details); 
  };

  if (!show) return null;

  return (
    <div className="cancerfinder-modal-overlay">
      <div className="cancerfinder-modal-content">
        <h3>Enter Your Details</h3>
        <form>
          {/* Basic Info */}
          <label>Name:</label>
          <input type="text" name="name" className="cancerfinder-input-area" value={details.name} onChange={handleChange} required />

          <label>Age:</label>
          <input type="number" name="age" className="cancerfinder-input-area" value={details.age} onChange={handleChange} required />

          <label>Gender:</label>
          <select name="gender" value={details.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label>Phone:</label>
          <input type="tel" name="phone" className="cancerfinder-input-area" value={details.phone} onChange={handleChange} />

          <label>Email:</label>
          <input type="email" name="email" className="cancerfinder-input-area" value={details.email} onChange={handleChange} />

          {/* Smoking Question and Follow-up */}
          <label>Do you smoke?</label>
          <div className="cancerfinder-radio-group">
            <input type="radio" name="smoking" value="yes" checked={details.smoking === 'yes'} onChange={handleChange} /> Yes
            <input type="radio" name="smoking" value="no" checked={details.smoking === 'no'} onChange={handleChange} /> No
          </div>

          {details.smoking === 'yes' && (
            <>
              <label>How often do you smoke?</label>
              <select name="smokingFrequency" value={details.smokingFrequency} onChange={handleChange}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="rarely">Rarely</option>
                <option value="never">Never</option>
              </select>
            </>
          )}

          {/* Alcohol Question and Follow-up */}
          <label>Do you consume alcohol?</label>
          <div className="cancerfinder-radio-group">
            <input type="radio" name="alcohol" value="yes" checked={details.alcohol === 'yes'} onChange={handleChange} /> Yes
            <input type="radio" name="alcohol" value="no" checked={details.alcohol === 'no'} onChange={handleChange} /> No
          </div>

          {details.alcohol === 'yes' && (
            <>
              <label>How often do you drink alcohol?</label>
              <select name="alcoholFrequency" value={details.alcoholFrequency} onChange={handleChange}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="rarely">Rarely</option>
                <option value="never">Never</option>
              </select>
            </>
          )}

          {/* Additional Questions */}
          <label>How often do you exercise?</label>
          <select name="exerciseFrequency" value={details.exerciseFrequency} onChange={handleChange}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="rarely">Rarely</option>
            <option value="never">Never</option>
          </select>

          <label>Do you have a history of any chronic illnesses? (e.g., heart disease, diabetes)</label>
          <div className="cancerfinder-radio-group">
            <input type="radio" name="chronicIllness" value="yes" checked={details.chronicIllness === 'yes'} onChange={handleChange} /> Yes
            <input type="radio" name="chronicIllness" value="no" checked={details.chronicIllness === 'no'} onChange={handleChange} /> No
          </div>

          {/* Surgery Question with Follow-up */}
          <label>Have you had any major surgeries?</label>
          <div className="cancerfinder-radio-group">
            <input type="radio" name="surgeryHistory" value="yes" checked={details.surgeryHistory === 'yes'} onChange={handleChange} /> Yes
            <input type="radio" name="surgeryHistory" value="no" checked={details.surgeryHistory === 'no'} onChange={handleChange} /> No
          </div>

          {details.surgeryHistory === 'yes' && (
            <>
              <label>What surgeries have you undergone?</label>
              <input type="text" name="surgeryDetails" className="cancerfinder-input-area" value={details.surgeryDetails} onChange={handleChange} />
            </>
          )}

          {/* Weight Loss Question with Follow-up */}
          <label>Have you experienced unexplained weight loss?</label>
          <div className="cancerfinder-radio-group">
            <input type="radio" name="weightLoss" value="yes" checked={details.weightLoss === 'yes'} onChange={handleChange} /> Yes
            <input type="radio" name="weightLoss" value="no" checked={details.weightLoss === 'no'} onChange={handleChange} /> No
          </div>

          {details.weightLoss === 'yes' && (
            <>
              <label>How much weight have you lost?</label>
              <input type="text" name="weightLossDetails" className="cancerfinder-input-area" value={details.weightLossDetails} onChange={handleChange} />
            </>
          )}

          {/* Pain Question with Follow-up */}
          <label>Do you experience frequent pain or discomfort?</label>
          <div className="cancerfinder-radio-group">
            <input type="radio" name="pain" value="yes" checked={details.pain === 'yes'} onChange={handleChange} /> Yes
            <input type="radio" name="pain" value="no" checked={details.pain === 'no'} onChange={handleChange} /> No
          </div>

          {details.pain === 'yes' && (
            <>
              <label>Where do you feel the pain?</label>
              <input type="text" name="painDetails" className="cancerfinder-input-area" value={details.painDetails} onChange={handleChange} />
            </>
          )}

          {/* Chemical Exposure Question with Follow-up */}
          <label>Have you ever been exposed to harmful chemicals or radiation?</label>
          <div className="cancerfinder-radio-group">
            <input type="radio" name="chemicalExposure" value="yes" checked={details.chemicalExposure === 'yes'} onChange={handleChange} /> Yes
            <input type="radio" name="chemicalExposure" value="no" checked={details.chemicalExposure === 'no'} onChange={handleChange} /> No
          </div>

          {details.chemicalExposure === 'yes' && (
            <>
              <label>What type of chemicals or radiation were you exposed to?</label>
              <input type="text" name="chemicalExposureDetails" className="cancerfinder-input-area" value={details.chemicalExposureDetails} onChange={handleChange} />
            </>
          )}

          <label>Is there a family history of cancer?</label>
          <div className="cancerfinder-radio-group">
            <input type="radio" name="familyHistory" value="yes" checked={details.familyHistory === 'yes'} onChange={handleChange} /> Yes
            <input type="radio" name="familyHistory" value="no" checked={details.familyHistory === 'no'} onChange={handleChange} /> No
          </div>

          {/* Modal Buttons */}
          <div className="cancerfinder-modal-buttons">
            <button type="button" onClick={handleSubmit}>Save</button>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CancerFinderDetailsModal;
