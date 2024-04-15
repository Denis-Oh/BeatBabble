import React, { useState, useEffect } from 'react';
import './WordPopup.css';
import axios from 'axios';

const WordPopup = ({ word, closePopup }) => {
    const [translationData, setTranslationData] = useState({ translations: [], examples: [] });
    const [currentExample, setCurrentExample] = useState(null);

    useEffect(() => {
        if (word) {
            fetchTranslation(word);
        }
    }, [word]);

    useEffect(() => {
        // Set the first example when the data is fetched or changed
        if (translationData.examples.length > 0) {
            setCurrentExample(translationData.examples[0]);
        }
    }, [translationData.examples]);

    const fetchTranslation = async (word) => {
        try {
            const response = await axios.post('http://localhost:3001/translate', { text: word });
            if (response.data.ok) {
                setTranslationData({
                    translations: response.data.data.translations,
                    examples: response.data.data.examples
                });
            } else {
                setTranslationData({ translations: [], examples: [] });
                console.error('Translation fetch failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching translation:', error);
        }
    };

    const handleRandomExample = () => {
        // Pick a random example that is not the current one
        if (translationData.examples.length > 1) {
            let newExample;
            do {
                newExample = translationData.examples[Math.floor(Math.random() * translationData.examples.length)];
            } while (newExample === currentExample);
            setCurrentExample(newExample);
        }
    };

    const filteredTranslations = translationData.translations.filter(trans => trans && trans.trim() !== '').join(', ');

    return (
        <div className="popup">
            <div className="popup-header">
                <h3>{word}</h3>
                <button onClick={closePopup}>Fermer</button>
            </div>
            <div>
                <h4>Traductions:</h4>
                <p>{filteredTranslations.length > 0 ? filteredTranslations : "No translation found"}</p>
                <h4>Exemple:</h4>
                {currentExample ? (
                    <p><span className="original-language">{currentExample.source}</span> - {currentExample.target}</p>
                ) : (
                    <p>Aucun exemple disponible.</p>
                )}
                {translationData.examples.length > 1 && (
                    <button onClick={handleRandomExample}>Exemple de randomisation</button>
                )}
            </div>
        </div>
    );
};

export default WordPopup;
