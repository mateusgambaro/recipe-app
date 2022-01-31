import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/recipesDetails.css';

const SHARE_BTN = 'share-btn';
const FAVORITE_BTN = 'favorite-btn';
const copy = require('clipboard-copy');

function LikeAndShare({ id }) {
  const [liked, setLiked] = useState(false);
  const [alert, setAlert] = useState('');

  function handleClick() {
    setAlert('Link copiado!');
    const prefix = 'http://localhost:3000';
    return (
      copy(prefix.concat(window.location.pathname))
    );
  }

  useEffect(() => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const savedRecipes = [...JSON.parse(localStorage.getItem('favoriteRecipes'))];
    if (savedRecipes.some(({ id: element }) => element === id.toString())) setLiked(true);
  }, [id]);

  return (
    <div className="linkAndShare">
      <img
        className="heart"
        src={ liked ? blackHeartIcon : whiteHeartIcon }
        onClick={ () => setLiked(!liked) }
        alt="heartshaped-icon"
        aria-hidden="true"
        data-testid={ FAVORITE_BTN }
      />
      <img
        className="share"
        src={ shareIcon }
        alt="share-icon"
        data-testid={ SHARE_BTN }
        aria-hidden="true"
        onClick={ () => handleClick() }
      />
      {alert}
    </div>
  );
}

LikeAndShare.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default LikeAndShare;
