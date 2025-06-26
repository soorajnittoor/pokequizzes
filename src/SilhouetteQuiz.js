import React, { useEffect, useState } from 'react';
import './Quiz.css';

function SilhouetteQuiz() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showIncorrect, setShowIncorrect] = useState(false);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/pokemon_full.json`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data);
      });
  }, []);

  const handleGuessSubmit = () => {
    if (!pokemonList.length) return;

    const currentPokemon = pokemonList[currentIndex];
    const cleanGuess = userGuess.trim().toLowerCase();
    const correctName = currentPokemon.name.toLowerCase();

    if (cleanGuess === correctName) {
      setCorrectCount(correctCount + 1);
      setShowIncorrect(false);
      setUserGuess('');
      setRevealed(false);
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowIncorrect(true);
    }
  };

  const handleDontKnow = () => {
    setShowIncorrect(false);
    setUserGuess('');
    setRevealed(false);
    setCurrentIndex(currentIndex + 1);
  };

  const handleFinish = () => {
    alert(`You finished! You got ${correctCount} out of ${pokemonList.length} correct.`);
  };

  if (!pokemonList.length) {
    return <div className="quiz-container">Loading Pokémon...</div>;
  }

  const currentPokemon = pokemonList[currentIndex];
  const spriteUrl = revealed
    ? currentPokemon.image
    : currentPokemon.image; // Apply silhouette CSS instead

  return (
    <div
      className="quiz-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/background.png)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="quiz-title">Who's That Pokémon?</h1>
      <p className="score-text">
        {correctCount} / {pokemonList.length} guessed correctly
      </p>
      <div className="sprite-container">
        <img
          src={spriteUrl}
          alt="Pokemon"
          className={`pokemon-sprite ${!revealed ? 'silhouette' : ''}`}
        />
      </div>
      <input
        type="text"
        placeholder="Enter Pokémon name"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleGuessSubmit();
        }}
      />
      <div className="button-container">
        <button onClick={handleGuessSubmit}>Submit</button>
        <button onClick={() => setRevealed(true)}>Reveal Colored</button>
        <button onClick={handleDontKnow}>Don't Know</button>
        <button onClick={handleFinish}>Finish</button>
      </div>
      {showIncorrect && <p className="incorrect-text">Incorrect! Try again.</p>}
    </div>
  );
}

export default SilhouetteQuiz;
