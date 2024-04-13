import React, { useState } from 'react';
import './App.css';
import CoverArt from './assets/LOVE.jpeg';
import WordPopup from './WordPopup';

const lyrics = "L is for the way you look at me, \nO is for the only one I see.";
// Match words and punctuation but maintain them in order
const wordsWithPunctuation = lyrics.match(/[\w'-]+|[.,!?;]/g);

function App() {
  const [selectedWord, setSelectedWord] = useState(null);

  const closePopup = () => setSelectedWord(null);

  return (
    <div className="app">
      <header className="banner">
        <nav className="navigation">
          <h2>BeatBabble</h2>
          <h4>My Songs</h4>
          <h4>Discover</h4>
          <h4>Languages</h4>
        </nav>
        <div className="song-title">
          <img src={CoverArt} alt="CoverArt"></img>
          <div className="song-title-info">
            <h2>L-O-V-E</h2>
            <h4>Nat King Cole</h4>
          </div>
        </div>
      </header>
      <div className="content">
        <div className="left-section">
          <p>
            {wordsWithPunctuation.map((word, index) => {
            const isPunctuation = /[.,!?;]/.test(word);
            return (
              <span key={index}
                className={`lyric-word ${isPunctuation ? "punctuation" : ""}`}
                onClick={() => !isPunctuation && setSelectedWord(word)}
                onMouseEnter={() => !isPunctuation && (document.body.style.cursor = "pointer")}
                onMouseLeave={() => !isPunctuation && (document.body.style.cursor = "default")}
              >
                {((isPunctuation || index==0) ? "" : " ") + word}
              </span>
            );
          })}
          </p>
          {selectedWord && <WordPopup word={selectedWord} closePopup={closePopup} />}
        </div>
        <div className="right-section">Right Section</div>
      </div>
    </div>
  );
}

export default App;
