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
        if (word.toLowerCase() === 'la') { // manual translation
            setTranslationData({
                translations: ["The"],
                examples: [
                    {
                        source: "Le garçon est allé se promener.",
                        target: "The boy went for a walk."
                    }, {
                        source: "Est-ce que les journaux ont une place dans la société à venir ?",
                        target: "Does the newspaper have a future place in society?"
                    }, {
                        source: "C'est dans le Maine qu'on peut trouver le plus de myrtilles.",
                        target: "The wild blueberry capital of the US is Maine."
                    }
                ]
            });
        } else if (word.toLowerCase() === 'Je') { // manual translation
            setTranslationData({
                translations: ["I"],
                examples: [
                    {
                        source: "I love you.",
                        target: "Je t'aime."
                    }, {
                        source: "How do we distinguish between I and not-I?",
                        target: "Comment distinguer entre le moi et le non-moi ?"
                    }
                ]
            });
        } else if (word.toLowerCase() === 'le') { // manual translation
            setTranslationData({
                translations: ["to"],
                examples: [
                    {
                        source: "He went to the shop. He went out to dinner.",
                        target: "Il est allé au magasin. Il est allé dîner."
                    }, {
                        source: "He walked to the house.",
                        target: "Il marcha vers la maison."
                    }
                ]
            });
        } else if (word.toLowerCase() === 'amour') { // manual translation
            setTranslationData({
                translations: ["love"],
                examples: [
                    {
                        source: "I love the car you drive.",
                        target: "J'adore la voiture que tu conduis."
                    }, {
                        source: "He fell in love with you.",
                        target: "Il est tombé amoureux de toi."
                    }
                ]
            });
        } else if (word.toLowerCase() === 'a') { // manual translation
            setTranslationData({
                translations: ["Un, Une"],
                examples: [
                    {
                        source: "There's a monster under my bed.",
                        target: "Il y a un monstre sous mon lit."
                    }, {
                        source: "I like a challenge.",
                        target: "J'aime les défis."
                    }
                ]
            });
        } else if (word.toLowerCase() === 'and') { // manual translation
            setTranslationData({
                translations: ["et, avec, puis"],
                examples: [
                    {
                        source: "I bought beer and wine.",
                        target: "J'ai acheté de la bière et du vin."
                    }, {
                        source: "I'd like some strawberries and cream.",
                        target: "Je voudrais des fraises et (or: avec) de la crème."
                    }
                ]
            });
        } else {
        
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
                <p>{filteredTranslations.length > 0 ? filteredTranslations : "Aucune traduction trouvée"}</p>
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
