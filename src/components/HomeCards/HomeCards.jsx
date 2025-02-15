/* eslint-disable react/prop-types */
import './HomeCards.css';

const HomeCards = ({ title, list }) => {
  
  const printDetails = () => {
    const content = document.getElementById(`print-${title}`);
    const newWindow = window.open('', '', 'width=600,height=600');
    newWindow.document.write('<html><head><title>Print</title></head><body>');
    newWindow.document.write(content.innerHTML);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="home-card">
      <h3>{title}</h3>
      <div className="card-content" id={`print-${title}`}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td>{item.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn-print" onClick={printDetails}>
        Print Details
      </button>
    </div>
  );
};

export default HomeCards;
