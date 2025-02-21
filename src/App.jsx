import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/LandingPage/Home/Home';
import About from './components/LandingPage/About/About';
import CancerDocs from './components/LandingPage/CancerDocs/CancerDocs';
import Research from './components/LandingPage/Research/Research';
import Login from './components/LandingPage/Login/Login';
import Signup from './components/LandingPage/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './Page/Profile';
import Chatbot from './components/Chatbot/Chatbot';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <Router>
      <div className="App">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cancer-docs" element={<CancerDocs />} />
          <Route path="/research" element={<Research />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/Profile' element={<Profile/>} />
        </Routes>
        <Chatbot /> {/* Chatbot will always be present */}
      </div>
    </Router>
  );
}

export default App;
