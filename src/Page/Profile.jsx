import { useState, useEffect } from 'react';
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
  const navigate = useNavigate();

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
          <span>{leftSidebarMinimized ? '>' : '<'}</span>
        </button>
        {!leftSidebarMinimized && (
          <div className="profile-sidebar-content">
            <ul>
              <li><a href="#" onClick={() => handleSidebarClick('Home')}>Home</a></li>
              <li><a href="#" onClick={() => handleSidebarClick('CancerFinder')}>CancerFinder</a></li>
              <li><a href="#" onClick={() => handleSidebarClick('Appointments')}>Appointments</a></li>
              <li><a href="#" onClick={() => handleSidebarClick('CancerAnalysis')}>CancerAnalysis</a></li>
              <li><a href="#" onClick={() => handleSidebarClick('Exercises')}>Exercises</a></li>
              <li><a href="#" onClick={() => handleSidebarClick('Notifications')}>Notifications</a></li>
              <li><a href="#" onClick={() => handleSidebarClick('HelpAndSupports')}>Help and Supports</a></li>
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
        {!rightSidebarMinimized && (
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
