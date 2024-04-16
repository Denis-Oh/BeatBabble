import React, { useRef } from 'react';
import './AudioPlayer.css'; 
import testAudio from './assets/test.mp3';
import SongClip from './assets/LOVE-Song.mp4';

const AudioPlayer = () => {
    const audioRef = useRef(null);

    const playAudio = () => {
        audioRef.current.play();
    };

    const restartAudio = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    };

    return (
        <div className="audio-controls">
            <audio ref={audioRef} controls preload="auto">
                <source src={SongClip} type="video/mp4" />
                Your browser does not support the audio element.
            </audio>
            <button onClick={playAudio}>Play</button>
            <button onClick={restartAudio}>Restart</button>
        </div>
    );
};

export default AudioPlayer;
