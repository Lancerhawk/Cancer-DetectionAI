function Research() {
  const papers = [
    {
      title: "AI in Early Cancer Detection",
      authors: "Smith et al.",
      journal: "Nature Medicine",
      year: 2024,
      link: "#"
    },
    {
      title: "Deep Learning for Medical Imaging",
      authors: "Johnson et al.",
      journal: "Science",
      year: 2023,
      link: "#"
    },
    {
      title: "Future of AI in Oncology",
      authors: "Williams et al.",
      journal: "Cancer Research",
      year: 2024,
      link: "#"
    }
  ];

  return (
    <div className="section">
      <div className="container">
        <h2 className="section-title">Research Papers</h2>
        {papers.map((paper, index) => (
          <div key={index} className="card">
            <h3>{paper.title}</h3>
            <p>Authors: {paper.authors}</p>
            <p>Journal: {paper.journal}</p>
            <p>Year: {paper.year}</p>
            <a href={paper.link} className="btn btn-outline">Read Paper</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Research;