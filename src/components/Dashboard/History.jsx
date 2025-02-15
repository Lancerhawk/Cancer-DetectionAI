import { useState } from 'react';
import './History.css';

const History = () => {
    const [history, setHistory] = useState([
        { id: 1, cancerType: 'Lung Cancer', date: '2023-12-12', report: 'MRI scan' },
        { id: 2, cancerType: 'Breast Cancer', date: '2023-11-10', report: 'CT scan' },
        { id: 3, cancerType: 'Prostate Cancer', date: '2023-10-05', report: 'X-RAY scan' },
    ]);

    const handleCompare = (id) => {
        alert(`Comparing report with ID: ${id}`);
    };

    const handleDelete = (id) => {
        setHistory(history.filter((item) => item.id !== id));
    };

    return (
        <div className="history-container">
            <h2>History of Cancer Reports</h2>
            {history.map((item) => (
                <div key={item.id} className="history-card">
                    <h3>{item.cancerType}</h3>
                    <p>Date: {item.date}</p>
                    <p>Report: {item.report}</p>
                    <div className="history-buttons">
                        <button onClick={() => handleCompare(item.id)}>Compare with New Reports</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default History;
