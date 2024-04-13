import React from 'react';
import './App.css';
import CoverArt from './assets/LOVE.jpeg';

function App() {
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
        <div className="left-section">Left Section</div>
        <div className="right-section">Right Section</div>
      </div>
    </div>
  );
}

export default App;
