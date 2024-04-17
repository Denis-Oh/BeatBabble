import React, { useRef } from 'react';
import './AudioPlayer.css'; 
import SongClip from './assets/LOVE-Song.mp4';

const AudioPlayer = React.forwardRef((props, ref) => {
    const playAudio = () => {
        ref.current.play();
    };

    const restartAudio = () => {
        ref.current.pause();
        ref.current.currentTime = 0;
    };

    return (
        <div className="audio-controls">
            <audio ref={ref} controls preload="auto">
                <source src={SongClip} type="video/mp4" />
                Your browser does not support the audio element.
            </audio>
            <button onClick={restartAudio}>Recommencer</button>
        </div>
    );
});

export default AudioPlayer;
