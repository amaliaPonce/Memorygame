import React, { useState, useEffect } from 'react';
import Card from './Card';
import './card.css';

const emojis = ['🐶', '🐯', '🐰', '🐸', '🐱', '🐷', '🐼', '🦊'];

const MemoryGame = () => {
  const generateInitialCards = () => {
    const shuffledEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    return shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
    }));
  };

  const [cards, setCards] = useState(generateInitialCards());
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flippedCount === 2) {
      const [firstIndex, secondIndex] = flippedIndexes;
      const newCards = [...cards];

      if (newCards[firstIndex].emoji !== newCards[secondIndex].emoji) {
        setTimeout(() => {
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards(newCards);
        }, 1000);
      }

      setFlippedCount(0);
      setFlippedIndexes([]);
      setMoves((moves) => moves + 1);
    }
  }, [flippedCount, flippedIndexes, cards]);

  const handleCardClick = (index) => {
    if (flippedCount < 2 && !cards[index].isFlipped) {
      const newCards = [...cards];
      newCards[index].isFlipped = true;
      setCards(newCards);

      setFlippedCount(flippedCount + 1);
      setFlippedIndexes([...flippedIndexes, index]);
    }
  };

  const isGameComplete = cards.every((card) => card.isFlipped);

  return (
    <div className="memory-game-container">
      <header>
        <h1 className="title__game">Juego de Memoria</h1>
      </header>

      <div className="memory-game">
        {isGameComplete ? (
          <div className="game-complete">
            ¡Felicidades! Has completado el juego en {moves} movimientos.
          </div>
        ) : (
          cards.map((card, index) => (
            <Card
              key={card.id}
              id={index}
              emoji={card.emoji}
              isFlipped={card.isFlipped}
              onClick={() => handleCardClick(index)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
