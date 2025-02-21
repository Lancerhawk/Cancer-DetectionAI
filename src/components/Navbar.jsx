import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
function Navbar({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const shouldShowAuthButtons = !['/dashboard', '/profile'].includes(location.pathname);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          VitalCheck
        </Link>

        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          <li><Link to="/cancer-docs" onClick={() => setIsMenuOpen(false)}>Cancer Docs</Link></li>
          <li><Link to="/research" onClick={() => setIsMenuOpen(false)}>Research</Link></li>

          {shouldShowAuthButtons && (
            <>
              <li className="mobile-only">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn btn-outline btn-primary">Login</Link>
              </li>
              <li className="mobile-only">
                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="btn btn-primary">Sign Up</Link>
              </li>
            </>
          )}

          <li className="mobile-only">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
          </li>
        </ul>

        {shouldShowAuthButtons && (
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </div>
        )}

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
