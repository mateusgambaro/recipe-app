import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import '../styles/doneRecipes.css';

const copy = require('clipboard-copy');

function DoneRecipesCard({ recipe: {
  id,
  name,
  image,
  category,
  tags,
  doneDate,
  area,
  alcoholicOrNot,
  type,
}, index }) {
  const [alert, setAlert] = useState('');

  const mealInfo = (
    <div>
      <h1 data-testid={ `${index}-horizontal-top-text` }>{ `${area} - ${category}` }</h1>
      <div>
        { tags.map((tag, idx) => (
          <p
            className="category"
            key={ idx }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }
          </p>
        )) }
      </div>
    </div>
  );

  function handleClick() {
    setAlert('Link copiado!');
    return (
      copy(type === 'comida'
        ? `http://localhost:3000/comidas/${id}`
        : `http://localhost:3000/bebidas/${id}`)
    );
  }

  return (
    <section className="done-card">
      <Link className="link-recipe" to={ `/${type}s/${id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
          width="200"
          height="200"
        />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      </Link>
      <button
        type="button"
        onClick={ handleClick }
      >
        <img
          className="share-btn"
          src={ shareIcon }
          alt="Share"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      {alert}
      { type === 'comida'
        ? mealInfo
        : <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p> }
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
    </section>
  );
}

DoneRecipesCard.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.any).isRequired,
  category: PropTypes.string,
  doneDate: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.any).isRequired,
  area: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
  type: PropTypes.string.isRequired,
};

DoneRecipesCard.defaultProps = {
  alcoholicOrNot: '',
  area: '',
  category: '',
};

export default DoneRecipesCard;
