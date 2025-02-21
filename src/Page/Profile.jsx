import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Profile.css';
import Home from '../components/Profile/Home/Home'; 
import CancerFinder from '../components/Profile/CancerFinder/CancerFinder';
import Appointments from '../components/Profile/Appointments/Appointments';
import Exercises from '../components/Profile/Exercises/Exercises';
import Notifications from '../components/Profile/Notification/Notification';
import HelpAndSupports from '../components/Profile/Help/Help';
import HomeDoctor from '../components/DoctorProfile/HomeDoctor/HomeDoctor';
import Patients from '../components/DoctorProfile/Patients/Patients'; 
import AppointmentPlannerPatients from '../components/DoctorProfile/AppointmentPlannerPatients/AppointmentPlannerPatients'; 
import ExercisePlannerPatients from '../components/DoctorProfile/ExercisePlannerPatients/ExercisePlannerPatients'; 
import PatientHome from '../components/PatientsProfile/PatientsHome/PatientsHome'; 
import Blank from '../components/Blank'; 
import ButtonChanger from '../components/Profile/CancerFinder/ButtonChanger';

function Profile() {
  const [leftSidebarMinimized, setLeftSidebarMinimized] = useState(true);
  const [rightSidebarMinimized, setRightSidebarMinimized] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSection, setSelectedSection] = useState('Blank');
  const [Sidebarisloaded, setSidebarisloaded] = useState(false);
  const [Sidebarisloadedright, setSidebarisloadedright] = useState(false);
  const navigate = useNavigate();
  const timer = useRef(null);

  const { state } = useLocation();
  const role = state?.role || 'Individual'; 

  const [sidebarRole] = useState(role); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!leftSidebarMinimized) {
      timer.current = setTimeout(() => {
        setSidebarisloaded(true);
      }, 200);
      return () => clearTimeout(timer.current);
    } else {
      setSidebarisloaded(false);
    }
  }, [leftSidebarMinimized]);

  useEffect(() => {
    if (!rightSidebarMinimized) {
      timer.current = setTimeout(() => {
        setSidebarisloadedright(true);
      }, 200);
      return () => clearTimeout(timer.current);
    } else {
      setSidebarisloadedright(false);
    }
  }, [rightSidebarMinimized]);

  const handleSidebarClick = (section) => {
    setSelectedSection(section);
    if (section === 'CancerAnalysis') {
      navigate('/dashboard');
    }
  };

  const renderSection = () => {
    switch (selectedSection) {
      case 'Blank':
        return <Blank />;
      case 'AppointmentPlannerPatients':
        return <AppointmentPlannerPatients />;
      case 'ExercisePlannerPatients':
        return <ExercisePlannerPatients />;
      case 'CancerFinder':
        return <CancerFinder />;
      case 'Appointments':
        return <Appointments />;
      case 'Exercises':
        return <Exercises />;
      case 'Notifications':
        return <Notifications />;
      case 'HelpAndSupports':
        return <HelpAndSupports />;
      case 'HomeDoctor':
        return <HomeDoctor />;
      case 'Patients':
        return <Patients />;
      case 'PatientHome':
        return <PatientHome />; 
      case 'Button':
        return <ButtonChanger/>
      default:
        return <Home />;
    }
  };

  // Ensure sidebar rendering is based on persistent role
  const renderSidebar = () => {
    if (sidebarRole === 'Doctor') {
      return (
        <ul>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('HomeDoctor')}
              className={selectedSection === 'HomeDoctor' ? 'active' : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('Patients')}
              className={selectedSection === 'Patients' ? 'active' : ''}
            >
              Patients
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('Button')}
              className={selectedSection === 'CancerFinder' ? 'active' : ''}
            >
              CancerFinder
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('AppointmentPlannerPatients')}
              className={selectedSection === 'AppointmentPlannerPatients' ? 'active' : ''}
            >
              Appointments
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('ExercisePlannerPatients')}
              className={selectedSection === 'ExercisePlannerPatients' ? 'active' : ''}
            >
              Exercises
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('CancerAnalysis')}
              className={selectedSection === 'CancerAnalysis' ? 'active' : ''}
            >
              CancerAnalysis
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('Notifications')}
              className={selectedSection === 'Notifications' ? 'active' : ''}
            >
              Notifications
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('HelpAndSupports')}
              className={selectedSection === 'HelpAndSupports' ? 'active' : ''}
            >
              Help and Supports
            </a>
          </li>
        </ul>
      );
    } else if (sidebarRole === 'Patient') {
      return (
        <ul>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('PatientHome')}  
              className={selectedSection === 'PatientHome' ? 'active' : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('Button')}
              className={selectedSection === 'CancerFinder' ? 'active' : ''}
            >
              CancerFinder
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('CancerAnalysis')}
              className={selectedSection === 'CancerAnalysis' ? 'active' : ''}
            >
              CancerAnalysis
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('Notifications')}
              className={selectedSection === 'Notifications' ? 'active' : ''}
            >
              Notifications
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('HelpAndSupports')}
              className={selectedSection === 'HelpAndSupports' ? 'active' : ''}
            >
              Help and Supports
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('Home')}
              className={selectedSection === 'Home' ? 'active' : ''}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('Button')}
              className={selectedSection === 'CancerFinder' ? 'active' : ''}
            >
              CancerFinder
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('Appointments')}
              className={selectedSection === 'Appointments' ? 'active' : ''}
            >
              Appointments
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('CancerAnalysis')}
              className={selectedSection === 'CancerAnalysis' ? 'active' : ''}
            >
              CancerAnalysis
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('Exercises')}
              className={selectedSection === 'Exercises' ? 'active' : ''}
            >
              Exercises
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('Notifications')}
              className={selectedSection === 'Notifications' ? 'active' : ''}
            >
              Notifications
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('HelpAndSupports')}
              className={selectedSection === 'HelpAndSupports' ? 'active' : ''}
            >
              Help and Supports
            </a>
          </li>
        </ul>
      );
    }
  };

  return (
    <div className="profile-container">
      <div
        className={`profile-left-sidebar ${leftSidebarMinimized ? 'minimized' : ''}`}
        onMouseEnter={!isMobile ? () => setLeftSidebarMinimized(false) : null}
        onMouseLeave={!isMobile ? () => setLeftSidebarMinimized(true) : null}
      >
        <button
          className="profile-toggle-btn left"
          onClick={() => isMobile && setLeftSidebarMinimized(!leftSidebarMinimized)}
        >
          <span>{leftSidebarMinimized ? '<' : '>'}</span>
        </button>
        {!leftSidebarMinimized && Sidebarisloaded && (
          <div className="profile-sidebar-content">
            {renderSidebar()}
          </div>
        )}
      </div>

      <div className={`profile-center ${leftSidebarMinimized || rightSidebarMinimized ? 'adjusted' : ''}`}>
        <div className="profile-content">
          {renderSection()}
        </div>
      </div>

      <div
        className={`profile-right-sidebar ${rightSidebarMinimized ? 'minimized' : ''}`}
        onMouseEnter={!isMobile ? () => setRightSidebarMinimized(false) : null}
        onMouseLeave={!isMobile ? () => setRightSidebarMinimized(true) : null}
      >
        <button
          className="profile-toggle-btn right"
          onClick={() => isMobile && setRightSidebarMinimized(!rightSidebarMinimized)}
        >
          <span>{rightSidebarMinimized ? '>' : '<'}</span>
        </button>
        {!rightSidebarMinimized && Sidebarisloadedright && (
          <div className="profile-sidebar-content">
            <div className="profile-box">
              <h3>Recent Notifications</h3>
              <ul>
                <li>New comment on your post</li>
                <li>New message from John</li>
              </ul>
            </div>
            <div className="profile-box">
              <h3>Appointments</h3>
              <ul>
                <li>Meeting with Alex at 3 PM</li>
                <li>Doctors appointment at 5 PM</li>
              </ul>
            </div>
          </div>
        )}
        {!rightSidebarMinimized && (
          <button className="profile-logout-btn">Logout</button>
        )}
      </div>
    </div>
  );
}

export default Profile;
