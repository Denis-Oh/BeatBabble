import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import CoverArt from './assets/LOVE.jpeg';
import WordPopup from './WordPopup';
import AudioPlayer from './AudioPlayer';


const lyricsEnglish = "L is for the way you look at me %NL O is for the only one I see %NL V is very, very extraordinary %NL E is even more than anyone that you adore can  %NL%NL Love is all that I can give to you %NL Love is more than just a game for two %NL Two in love can make it %NL Take my heart and please don't break it %NL Love was made for me and you";
const lyricsFrench = "L est pour la façon dont tu me regardes %NL O est pour la seule personne que je vois %NL V est pour vraiment, vraiment extraordinaire %NL E est encore plus que quiconque que tu puisses adorer %NL%NL L'amour est tout ce que je peux te donner %NL L'amour est plus qu'un simple jeu à deux %NL Deux en amour peuvent y arriver %NL Prends mon coeur et s'il te plaît ne le brise pas %NL L'amour est fait pour moi et toi";
// Split lyrics into parts by '%NL', then map to words and inject <br /> elements for line breaks
const wordsWithPunctuation = lyricsEnglish.split('%NL').flatMap((line, index, array) => {
  const words = line.match(/[\w'-]+|[.,!?;]/g) || [];
  const elements = words.map((word, idx) => ({
    word,
    isPunctuation: /[.,!?;]/.test(word),
    addSpace: idx !== 0 // Add space before words that are not the first in a line
  }));
  if (index < array.length - 1) { // Add a <br /> element after each line except the last one
    elements.push(<br key={`br-${index}`} />);
  }
  return elements;
});

function App() {
  const [selectedWord, setSelectedWord] = useState(null);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(null);
  const audioRef = useRef(null);

  // Define the time intervals for word highlighting here
  // const timeIntervals = {
  //   0: [{ start: 7, end: 7.6 }], // L
  //   10: [{ start: 13, end: 13.6 }], // O
  //   19: [{ start: 19, end: 20 }], // V
  //   26: [{ start: 25, end: 26 }], // E

  //   38: [{ start: 32, end: 40 }], // Love 1
  //   48: [{ start: 38, end: 39 }], // Love 2
  //   58: [{ start: 44, end: 45 }], // Two
  //   65: [{ start: 47, end: 48 }], // Take
  //   74: [{ start: 50, end: 51 }], // Love 3
  // };

  // Evenly spaced interval
  function createTimeIntervals(startTime, endTime, startInterval, endInterval) {
    const timeIntervals = {};
    const range = endTime - startTime; // total duration
    const numIntervals = endInterval - startInterval;
    const intervalLength = range / numIntervals; // Interval length based on time and number of intervals
  
    for (let i = 0; i < numIntervals; i++) {
      timeIntervals[startInterval + i] = [{
        start: startTime + intervalLength * i,
        end: startTime + intervalLength * (i + 1)
      }];
    }
    return timeIntervals;
  }
  
  const Line1 = createTimeIntervals(7, 13, 0, 10); // L
  const Line2 = createTimeIntervals(13, 19, 10, 19); // O
  const Line3 = createTimeIntervals(19, 25, 19, 26); // V
  const Line4 = createTimeIntervals(25, 32, 26, 38); // E

  const Line5 = createTimeIntervals(32, 38, 38, 48); // Love 1
  const Line6 = createTimeIntervals(38, 44, 48, 58); // Love 2
  const Line7 = createTimeIntervals(44, 47, 58, 65); // Two
  const Line8 = createTimeIntervals(47, 50, 65, 74); // Take
  const Line9 = createTimeIntervals(50, 55, 74, 81); // Love 3
  
  const timeIntervals = { ...Line1, ...Line2, ...Line3, ...Line4, ...Line5, ...Line6, ...Line7, ...Line8, ...Line9 };

  
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        let foundInterval = false;
        Object.entries(timeIntervals).forEach(([index, intervals]) => {
          intervals.forEach(({ start, end }) => {
            if (currentTime >= start && currentTime <= end) {
              setHighlightedWordIndex(parseInt(index, 10));
              foundInterval = true;
            }
          });
        });
        if (!foundInterval) {
          setHighlightedWordIndex(null);
        }
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const closePopup = () => setSelectedWord(null);

  return (
    <div className="app">
      <header className="banner">
        <nav className="navigation">
          <h2>BeatBabble</h2>
          <h4>Mes chanson</h4>
          <h4>Découvrir</h4>
          <h4>Langues</h4>
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
            {wordsWithPunctuation.map((element, index) => {
              const isHighlighted = highlightedWordIndex === index; // Check if this index is highlighted
              const className = `lyric-word ${element.isPunctuation ? 'punctuation' : ''} ${isHighlighted ? 'highlighted-word' : ''}`;
              if (React.isValidElement(element)) { // Render <br /> as is
                return element;
              }
              return (
                <span key={index}
                  className={className} // Apply class based on highlight state
                  onClick={() => !element.isPunctuation && setSelectedWord(element.word)}
                  onMouseEnter={() => !element.isPunctuation && (document.body.style.cursor = "pointer")}
                  onMouseLeave={() => !element.isPunctuation && (document.body.style.cursor = "default")}
                >
                  {((element.addSpace && !element.isPunctuation) ? " " : "") + element.word}
                </span>
              );
            })}
          </p>
          {selectedWord && <WordPopup word={selectedWord} closePopup={closePopup} />}
        </div>
        <div className="right-section">
          <p>
          L est pour la façon dont tu me regardes <br /> O est pour la seule personne que je vois <br /> V est pour vraiment, vraiment extraordinaire <br /> E est encore plus que quiconque que tu puisses adorer <br /><br /> L'amour est tout ce que je peux te donner <br /> L'amour est plus qu'un simple jeu à deux <br /> Deux en amour peuvent y arriver <br /> Prends mon coeur et s'il te plaît ne le brise pas <br /> L'amour est fait pour moi et toi"
          </p>
        </div>
        <AudioPlayer ref={audioRef} />
      </div>
    </div>
  );
}

export default App;
