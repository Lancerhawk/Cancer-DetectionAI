import { useState } from 'react';
import './Patients.css';

function Patients() {
  const defaultPatients = [
    {
      id: 1,
      name: 'John Doe',
      age: '30',
      condition: 'Flu',
      gender: 'Male',
      phone: '123-456-7890',
      address: '123 Main St, City, Country',
      email: 'johndoe@example.com',
      emergencyContact: '987-654-3210',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: '40',
      condition: 'Diabetes',
      gender: 'Female',
      phone: '321-654-9870',
      address: '456 Oak St, City, Country',
      email: 'janesmith@example.com',
      emergencyContact: '654-321-0987',
    }
  ];

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    condition: '',
    gender: '',
    phone: '',
    address: '',
    email: '',
    emergencyContact: '',
  });
  const [patients, setPatients] = useState(defaultPatients);  
  const [selectedPatient, setSelectedPatient] = useState(null);

  const openRegisterModal = () => setRegisterModalOpen(true);
  const closeRegisterModal = () => setRegisterModalOpen(false);

  const openDetailsModal = (patient) => {
    setSelectedPatient(patient);
    setDetailsModalOpen(true);
  };
  const closeDetailsModal = () => setDetailsModalOpen(false);

  const handleInputChange = (e) => {
    setNewPatient({
      ...newPatient,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterPatient = () => {
    setPatients([
      ...patients,
      {
        ...newPatient,
        id: Date.now(), 
      },
    ]);
    setNewPatient({
      name: '',
      age: '',
      condition: '',
      gender: '',
      phone: '',
      address: '',
      email: '',
      emergencyContact: '',
    });
    closeRegisterModal();
  };

  return (
    <>
      <div className="header-container">
        <button className="register-btn" onClick={openRegisterModal}>
          Register a Patient
        </button>
      </div>

      <div className="divider"></div>

      <div className="patient-cards-container">
        {patients.map((patient) => (
          <div key={patient.id} className="patient-card">
            <div className="patient-card-header">{patient.name}</div>
            <div className="patient-card-body">
              <p>Age: {patient.age}</p>
              <p>Condition: {patient.condition}</p>
            </div>
            <div className="patient-card-footer">
              <button
                className="details-btn"
                onClick={() => openDetailsModal(patient)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {isRegisterModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Register a Patient</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegisterPatient();
              }}
            >
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={newPatient.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  value={newPatient.age}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Condition:
                <input
                  type="text"
                  name="condition"
                  value={newPatient.condition}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Gender:
                <select
                  name="gender"
                  value={newPatient.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>
                Phone:
                <input
                  type="tel"
                  name="phone"
                  value={newPatient.phone}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={newPatient.address}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={newPatient.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Emergency Contact:
                <input
                  type="tel"
                  name="emergencyContact"
                  value={newPatient.emergencyContact}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit">Register</button>
              <button type="button" onClick={closeRegisterModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {isDetailsModalOpen && selectedPatient && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Patient Details</h2>
            <div className="patient-details">
              <div className="left-section">
                <p><strong>Name:</strong> {selectedPatient.name}</p>
                <p><strong>Age:</strong> {selectedPatient.age}</p>
                <p><strong>Condition:</strong> {selectedPatient.condition}</p>
                <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                <p><strong>Phone:</strong> {selectedPatient.phone}</p>
                <p><strong>Address:</strong> {selectedPatient.address}</p>
                <p><strong>Email:</strong> {selectedPatient.email}</p>
                <p><strong>Emergency Contact:</strong> {selectedPatient.emergencyContact}</p>
              </div>

              <div className="right-section">
                <div className="precautions">
                  <h3>Precautions</h3>
                  <div className="precautions-content">
                  </div>
                  <button className="use-ai-btn">Use AI</button>
                </div>

                <div className="appointments">
                  <h3>Appointments</h3>
                  <div className="appointments-content">
                  </div>
                  <button className="use-ai-btn">Use AI</button>
                </div>
              </div>
            </div>
            <button onClick={closeDetailsModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Patients;
