function CancerDocs() {
  const cancerTypes = [
    {
      type: "Breast Cancer",
      description: "Most common cancer in women worldwide",
      symptoms: ["Lumps", "Skin changes", "Nipple discharge"]
    },
    {
      type: "Lung Cancer",
      description: "Leading cause of cancer deaths globally",
      symptoms: ["Persistent cough", "Chest pain", "Shortness of breath"]
    },
    {
      type: "Colorectal Cancer",
      description: "Third most common cancer worldwide",
      symptoms: ["Change in bowel habits", "Rectal bleeding", "Abdominal pain"]
    }
  ];

  return (
    <div className="section">
      <div className="container">
        <h2 className="section-title">Cancer Documentation</h2>
        {cancerTypes.map((cancer, index) => (
          <div key={index} className="card">
            <h3>{cancer.type}</h3>
            <p>{cancer.description}</p>
            <h4>Common Symptoms:</h4>
            <ul>
              {cancer.symptoms.map((symptom, idx) => (
                <li key={idx}>{symptom}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CancerDocs;