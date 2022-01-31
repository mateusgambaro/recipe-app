import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/searchCard.css';

export default function SearchCard({ picture, name, id, meals, index }) {
  const linkToMeals = (
    <section className="recipes-list" data-testid={ `${index}-recipe-card` }>
      <Link
        className="recipe-link"
        to={ `/comidas/${id}` }
        data-testid={ `${index}-card-name` }
      >
        <img
          className="recipes"
          src={ picture }
          alt={ name }
          data-testid={ `${index}-card-img` }
        />
        { name }
      </Link>
    </section>

  );

  const linkToDrink = (
    <section className="recipes-list" data-testid={ `${index}-recipe-card` }>
      <Link
        className="recipe-link"
        to={ `/bebidas/${id}` }
        data-testid={ `${index}-card-name` }
      >

        <img
          className="recipes"
          src={ picture }
          alt={ name }
          data-testid={ `${index}-card-img` }
          tested={ `${index}-card-img` }
        />
        { name }
      </Link>
    </section>

  );

  return (
    <div className="links">
      { meals ? linkToMeals : linkToDrink }
    </div>
  );
}

SearchCard.propTypes = {
  id: PropTypes.string.isRequired,
  meals: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

// esse card irá renderizar nome e foto do drink
