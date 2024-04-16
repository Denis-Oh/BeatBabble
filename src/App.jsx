import React, { useState } from 'react';
import './App.css';
import CoverArt from './assets/LOVE.jpeg';
import WordPopup from './WordPopup';
import useSound from 'use-sound'
import mySound from './assets/discord_ping_sound_effect.mp3' // Your sound file path here
import { Wave } from 'react-animated-text'

const lyricsEnglish = "L is for the way you look at me %NL O is for the only one I see %NL V is very, very extraordinary %NL E is even more than anyone that you adore can  %NL%NL Love is all that I can give to you %NL Love is more than just a game for two %NL Two in love can make it %NL Take my heart and please don't break it %NL Love was made for me and you";
const lyricsFrench = "L est pour la façon dont tu me regardes %NL O est pour la seule personne que je vois %NL V est pour vraiment, vraiment extraordinaire %NL E est encore plus que quiconque que tu puisses adorer %NL%NL L'amour est tout ce que je peux te donner %NL L'amour est plus qu'un simple jeu à deux %NL Deux en amour peuvent y arriver %NL Prends mon coeur et s'il te plaît ne le brise pas %NL L'amour est fait pour moi et toi";
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

//Awful attempt for formatting the left side
const temp = lyricsEnglish.split('%NL')
var temp2 = ""
for (let i = 0; i < temp.length; i++) {
  temp2 += temp[i] + "\n";
}


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
          <SoundPlayer />
        </div>
      </header>
      <div className="content">
        <div className="left-section">
          <div>
            <Wave2 />
          </div>
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

//new function, It will play the song but it's currently set to the discord ping sound
function SoundPlayer() {
  const [playSound] = useSound(mySound)
  
  return (
    <button onClick={() => {
      playSound();
      }}>
       <Wave text="Play song!" effect="jump" effectChange={0.5} />
    </button>
  )
}

//This is responsible for creating the colored text
export class Wave2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { paused: true };
    this.togglePause = this.togglePause.bind(this);
    this.reset = this.reset.bind(this);
  }

  togglePause() {
    this.setState(prevState => ({ paused: !prevState.paused }));
  }

  reset() {
    this.setState('paused', true);
  }

  render() { //This is where all the magic is, It's currently set to start on click of both the text and button
    return (
      <div>
        <a onClick={this.togglePause} style={{cursor: 'pointer'}}>
          <Wave
            text={temp2}
            effect="color"
            effectChange="red"
            effectDuration={1.5}
            iterations={1}
            paused={this.state.paused}
          />
        </a>
        <br />
        <button onClick={this.togglePause}>Reset</button>

      </div>
    )
  }
}

export default App;
