import { useState } from 'react';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted:', formData);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2 className="section-title">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            <div style={{ marginBottom: '1rem' }}>
              <label>Confirm Password:</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  marginTop: '0.5rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #ccc'
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary signup-btn" style={{ width: '100%' }}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;