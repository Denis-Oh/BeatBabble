import React, { useState } from 'react';
import './App.css';
import CoverArt from './assets/LOVE.jpeg';
import WordPopup from './WordPopup';
import useSound from 'use-sound'
import mySound from './assets/LOVE.mp3' // Your sound file path here
import { Wave } from 'react-animated-text'

const lyricsEnglish = "L is for the way you look at me                       O is for the only one I see                            V is very, very extraordinary                           E is even more than anyone that you adore can       Love is all that I can give to you                      Love is more than just a game for two                Two in love can make it                               Take my heart and please don't break it               Love was made for me and you";
const lyricsFrench = "L est pour la façon dont tu me regardes %NL O est pour la seule personne que je vois %NL V est pour vraiment, vraiment extraordinaire %NL E est encore plus que quiconque que tu puisses adorer %NL L'amour est tout ce que je peux te donner %NL L'amour est plus qu'un simple jeu à deux %NL Deux en amour peuvent y arriver %NL Prends mon coeur et s'il te plaît ne le brise pas %NL L'amour est fait pour moi et toi";
// Split lyrics into parts by '%NL', then map to words and inject <br /> elements for line breaks
const wordsWithPunctuation = lyricsFrench.split('%NL').flatMap((line, index, array) => {
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
          <span>
            <SoundPlayer />
          </span>
        </div>
        <div className="right-section">
          <p>
            {wordsWithPunctuation.map((element, index) => {
              if (React.isValidElement(element)) { // Render <br /> as is
                return element;
              }
              return (
                <span key={index}
                  className={`lyric-word ${element.isPunctuation ? "punctuation" : ""}`}
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
      </div>
    </div>
  );
}

//Plays the sound and has the lyrics move
function SoundPlayer() {
  const [playSound] = useSound(mySound)
  const [index, setIndex] = useState(0);
  const lyrics = [<Lyrics paused={true} />, <Lyrics paused={false} />]

  function handleClick() {
    if (index == 0){
      setIndex(index + 1);
    } else{
      setIndex(index - 1);
    }
  }

  return (
    <span onClick={() => {handleClick(); playSound()}}>
      {lyrics[index]}
    </span>
  )
}

//gets the lyrics to move
function Lyrics(props) {
  return(
    <span style={{cursor: 'pointer'}}>
      {<Wave
        text={lyricsEnglish}
        effect="color"
        speed={8.7}
        effectChange="red"
        effectDuration={2.5}
        iterations={1}
        paused={props.paused}
      />}
      <br />
    </span>
  )
}

export default App;
