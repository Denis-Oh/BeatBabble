import React from 'react';
import './WordPopup.css';

const WordPopup = ({ word, closePopup }) => (
    <div className="popup">
        <div className="popup-header">
            <h3>{word}</h3>
            <button onClick={closePopup}>Close</button>
        </div>
        <h4>
            French-English
        </h4>
    </div>
  );
  
  export default WordPopup;
  