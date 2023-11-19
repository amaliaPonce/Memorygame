import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

function Card({ emoji, isFlipped, onClick }) {
  const handleClick = () => {
    if (!isFlipped) {
      onClick();
    }
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      {isFlipped && <span className="emoji">{emoji}</span>}
    </div>
  );
}

Card.propTypes = {
  emoji: PropTypes.string.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
