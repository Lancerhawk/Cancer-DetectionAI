function About() {
  return (
    <div className="section">
      <div className="container">
        <h2 className="section-title">About Us</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
            We are pioneering the future of cancer detection through innovative AI technology,
            making early diagnosis more accessible and accurate for everyone.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div className="card">
            <h3>Our Mission</h3>
            <p>
              To revolutionize cancer detection through advanced artificial intelligence,
              making early diagnosis more accessible and accurate for patients worldwide.
              We believe in combining cutting-edge technology with medical expertise to
              save lives and improve healthcare outcomes.
            </p>
          </div>
          <div className="card">
            <h3>Our Vision</h3>
            <p>
              To create a world where cancer detection is fast, accurate, and accessible
              to everyone. We envision a future where AI-powered diagnostics become the
              standard in healthcare, leading to better patient outcomes and reduced
              mortality rates.
            </p>
          </div>
        </div>

        <h3 className="section-title" style={{ fontSize: '2rem' }}>Current Challenges</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="card">
            <h3>Late Detection</h3>
            <p>
              Traditional methods often detect cancer at later stages, reducing
              treatment effectiveness and survival rates. Our AI solution enables
              earlier detection, dramatically improving outcomes.
            </p>
          </div>
          <div className="card">
            <h3>Accuracy Limitations</h3>
            <p>
              Current diagnostic methods can produce false positives or miss early
              signs. Our AI technology achieves higher accuracy through advanced
              pattern recognition and machine learning.
            </p>
          </div>
          <div className="card">
            <h3>Access to Care</h3>
            <p>
              Many regions lack access to skilled diagnosticians. Our AI platform
              brings expert-level cancer detection capabilities to underserved
              areas worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;