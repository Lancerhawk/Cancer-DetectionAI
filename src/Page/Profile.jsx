import { useState, useEffect, useRef } from 'react';
import './Profile.css';
import Home from '../components/Profile/Home/Home'; 
import CancerFinder from '../components/Profile/CancerFinder/CancerFinder';
import Appointments from '../components/Profile/Appointments/Appointments';
import Exercises from '../components/Profile/Exercises/Exercises';
import Notifications from '../components/Profile/Notification/Notification';
import HelpAndSupports from '../components/Profile/Help/Help';
import { useNavigate } from 'react-router-dom'; 

function Profile() {
  const [leftSidebarMinimized, setLeftSidebarMinimized] = useState(true);
  const [rightSidebarMinimized, setRightSidebarMinimized] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSection, setSelectedSection] = useState('Home');
  const [Sidebarisloaded, setSidebarisloaded] = useState(false);
  const [Sidebarisloadedright, setSidebarisloadedright] = useState(false);
  const navigate = useNavigate();
  const timer = useRef(null);

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
    if (section === 'CancerAnalysis') {
      navigate('/dashboard');
    } else {
      setSelectedSection(section);
    }
  };

  const renderSection = () => {
    switch (selectedSection) {
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
      default:
        return <Home />;
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
                  onClick={() => handleSidebarClick('CancerFinder')}
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
