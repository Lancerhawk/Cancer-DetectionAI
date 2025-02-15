import { useState } from 'react';
import './Home.css';
import HomeCards from '../../HomeCards/HomeCards';

const Home = () => {
  const [doneItems, setDoneItems] = useState({});

  const handleMarkAsDone = (index) => {
    setDoneItems((prevState) => ({
      ...prevState,
      [index]: true,
    }));
  };

  const scheduleList = [
    { date: 'Daily - 10 AM', category: 'Aspirin', details: 'For blood thinning and heart health' },
    { date: 'Daily - 12 PM', category: 'Vitamin C', details: 'For immune support' },
    { date: 'Daily - 9 PM', category: 'Blood Pressure Medicine', details: 'To manage blood pressure' },
    { date: 'Once a week - Monday 11 AM', category: 'Chemotherapy', details: 'Ongoing treatment for cancer' },
    
    { date: 'Daily - Morning', category: 'Push-ups', details: '15 reps (Build upper body strength)' },
    { date: 'Daily - Evening', category: 'Yoga', details: '30 mins (Improve flexibility and reduce stress)' },
    { date: 'Every alternate day - Night', category: 'Running', details: '20 mins (Improve cardiovascular health)' },
    { date: 'Twice a week - Thursday & Saturday', category: 'Strength Training', details: 'Increase muscle mass and strength' },
    
    { date: '10th Feb - Monthly', category: 'Dr. Smith (Oncologist)', details: 'Follow-up on chemotherapy progress' },
    { date: '15th Jan - Monthly', category: 'Dr. John (Radiologist)', details: 'Review radiation therapy effectiveness' },
    { date: '22nd Dec - Every 6 months', category: 'Dr. Sarah (Surgeon)', details: 'Check-up after surgery, if any' },
    
    { date: 'Ongoing', category: 'Weight', details: '72 kg (Monitor weight loss or gain)' },
    { date: 'Ongoing', category: 'Blood Pressure', details: '120/80 mmHg (Monitor regularly for health stability)' },
    { date: 'Ongoing', category: 'WBC Count', details: '4.5 x 10^9/L (Normal range, blood test results)' },
    { date: 'Ongoing', category: 'Chemotherapy Response', details: 'Stable (Monitoring tumor reduction or progression)' },
    
    { date: 'Weekly - Friday 3 PM', category: 'Therapy Session', details: 'Focus on emotional resilience' },
    { date: 'Bi-weekly - Sunday 10 AM', category: 'Support Group', details: 'Community of cancer patients and survivors' },
    { date: 'Daily - 15 mins', category: 'Mindfulness Meditation', details: 'To cope with stress and anxiety' }
  ];

  const sortedSchedule = scheduleList.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Welcome, Arin Jain</h1>
        <p className="age-gender">Age: 28 <br/> Gender: Male</p>
        {/* <p className="diagnosis">Diagnosis: <strong>Stage 2 Non-Hodgkin Lymphoma</strong></p>
        <p className="treatment-plan">Treatment Plan: <strong>Chemotherapy + Radiation</strong></p>
        <p className="status">Status: Currently undergoing Chemotherapy</p> */}
      </div>

      <hr />

      <div className="cards-container">
        <HomeCards 
          title="Monthly Medicine Schedule" 
          list={[ 
            { category: 'Aspirin', details: 'Daily - 10 AM (For blood thinning and heart health)' }, 
            { category: 'Vitamin C', details: 'Daily - 12 PM (For immune support)' }, 
            { category: 'Blood Pressure Medicine', details: 'Daily - 9 PM (To manage blood pressure)' },
            { category: 'Chemotherapy', details: 'Once a week - Monday 11 AM (Ongoing treatment for cancer)' }
          ]}
        />
        
        <HomeCards 
          title="Weekly Exercise Routine" 
          list={[ 
            { category: 'Push-ups', details: 'Daily - Morning 15 reps (Build upper body strength)' },
            { category: 'Yoga', details: 'Daily - Evening 30 mins (Improve flexibility and reduce stress)' },
            { category: 'Running', details: 'Every alternate day - Night 20 mins (Improve cardiovascular health)' },
            { category: 'Strength Training', details: 'Twice a week - Thursday & Saturday (Increase muscle mass and strength)' }
          ]}
        />
        
        <HomeCards 
          title="Upcoming Cancer Appointments" 
          list={[ 
            { category: 'Dr. Smith (Oncologist)', details: 'Every month - 10th Feb (Follow-up on chemotherapy progress)' },
            { category: 'Dr. John (Radiologist)', details: 'Every month - 15th Jan (Review radiation therapy effectiveness)' },
            { category: 'Dr. Sarah (Surgeon)', details: 'Every 6 months - 22 Dec (Check-up after surgery, if any)' }
          ]}
        />
      </div>

      <div className="schedule-timeline">
        <h2>Scheduled Time</h2>
        <div className="schedule-list">
          {sortedSchedule.map((item, index) => (
            <div key={index} className={`schedule-item ${doneItems[index] ? 'done' : ''}`}>
              <p><strong>{item.date}</strong> - <span>{item.category}: {item.details}</span></p>
              <button
                className="btn-done"
                onClick={() => handleMarkAsDone(index)}
                disabled={doneItems[index]}
              >
                {doneItems[index] ? 'Done' : 'Mark as Done'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
