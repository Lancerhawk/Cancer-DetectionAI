import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);

    navigate('/profile');
  };

  return (
    <div className="section">
      <div className="container">
        <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2 className="section-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  marginTop: '0.5rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #ccc'
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Password:</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  marginTop: '0.5rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #ccc'
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary login-btn" style={{ width: '100%' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
