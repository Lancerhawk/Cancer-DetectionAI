import { useState } from 'react';
import './ButtonChanger.css';
import CancerFinder from './CancerFinder';
import CancerFinderMemo from './CancerFinderMemo';

function ButtonChanger() {
  const [selectedOption, setSelectedOption] = useState(null); 

  const handleButtonClick = (option) => {
    setSelectedOption(option); 
  };

  return (
    <div className="button-changer-container">
      <div className="button-container">
        <button
          onClick={() => handleButtonClick('option1')}
          className={selectedOption === 'option1' ? 'active' : ''}
        >
          Early Cancer Detection
        </button>
        <button
          onClick={() => handleButtonClick('option2')}
          className={selectedOption === 'option2' ? 'active' : ''}
        >
          Cancer Detection with Scans
        </button>
      </div>

      {selectedOption === 'option1' && <CancerFinderMemo />}
      {selectedOption === 'option2' && <CancerFinder />}
    </div>
  );
}

export default ButtonChanger;
