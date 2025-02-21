import './Home.css';

function Home() {
  return (
    <div>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Advanced Cancer Detection with AI</h1>
            <p className="hero-subtitle">
              Revolutionizing cancer diagnosis through cutting-edge artificial intelligence technology,
              making early detection more accurate and accessible than ever before.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-outline">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Technology</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            <div className="card">
              <h3>Early Detection</h3>
              <p>
                Our state-of-the-art AI algorithms can detect cancer at its earliest stages,
                significantly improving treatment outcomes and survival rates.
              </p>
            </div>
            <div className="card">
              <h3>Accurate Diagnosis</h3>
              <p>
                Achieve high-precision cancer detection with our advanced neural networks,
                minimizing false positives and ensuring reliable results.
              </p>
            </div>
            <div className="card">
              <h3>Fast Results</h3>
              <p>
                Get quick and reliable analysis of medical imaging data, enabling
                healthcare providers to make timely decisions for patient care.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--card-background)' }}>
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            <div className="card">
              <h3>Industry Leading Accuracy</h3>
              <p>
                Our AI models achieve 99.9% accuracy in cancer detection,
                surpassing traditional diagnostic methods.
              </p>
            </div>
            <div className="card">
              <h3>Continuous Learning</h3>
              <p>
                Our systems continuously learn and improve from new data,
                staying at the forefront of medical technology.
              </p>
            </div>
            <div className="card">
              <h3>Expert Support</h3>
              <p>
                Get 24/7 support from our team of medical professionals and
                AI specialists for any assistance you need.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;