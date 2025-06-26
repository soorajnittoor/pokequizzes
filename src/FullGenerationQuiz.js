import React, { useState, useEffect } from 'react';
import './Quiz.css';

function FullGenerationQuiz() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [correctList, setCorrectList] = useState([]);

  useEffect(() => {
    fetch('/pokemon_full.json')
      .then(res => res.json())
      .then(data => {
        setPokemonList(data);
      });
  }, []);

  const handleSubmit = () => {
    const currentName = pokemonList[currentIndex]?.name.toLowerCase().trim();
    if (guess.toLowerCase().trim() === currentName && !correctList.includes(currentName)) {
      setScore(score + 1);
      setCorrectList([...correctList, currentName]);
    }
    setGuess('');
    setRevealed(false);
    setCurrentIndex(prev => prev + 1);
  };

  const handleSkip = () => {
    setRevealed(false);
    setCurrentIndex(prev => prev + 1);
  };

  const handleFinish = () => {
    setFinished(true);
  };

  if (finished || currentIndex >= pokemonList.length) {
    return (
      <div className="quiz-container">
        <h1 className="title">Full Generation Mode</h1>
        <h2>Quiz Complete!</h2>
        <p>You guessed {score} out of {pokemonList.length} Pokémon correctly.</p>
      </div>
    );
  }

  const currentPokemon = pokemonList[currentIndex];

  return (
    <div className="quiz-container">
      <h1 className="title">Full Generation Mode</h1>
      <p>
        Pokémon {currentIndex + 1} of {pokemonList.length} | Correct: {score}
      </p>
      {currentPokemon && (
        <img
          className={`pokemon-image ${revealed ? '' : 'silhouette'}`}
          src={currentPokemon.image}
          alt="pokemon"
        />
      )}
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Enter Pokémon name"
      />
      <div className="button-group">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={() => setRevealed(true)}>Reveal</button>
        <button onClick={handleSkip}>Don't Know</button>
        <button onClick={handleFinish}>Finish</button>
      </div>
    </div>
  );
}

export default FullGenerationQuiz;
