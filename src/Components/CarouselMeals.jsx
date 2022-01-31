import PropTypes from 'prop-types';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

const RECOMENDATION_CARD = (index) => `${index}-recomendation-card`;
const RECOMENDATION_PHOTO = (index) => `${index}-recipe-photo`;
const RECOMENDATION_TITLE = (index) => `${index}-recomendation-title`;

const SIX = 6;

function CarouselMeals(props) {
  const { dishes } = props;
  const cards = dishes.slice(0, SIX)
    .map(({ idMeal, strMeal, strMealThumb }, index) => (
      <Carousel.Item key={ idMeal } data-testid={ RECOMENDATION_CARD(index) }>
        <img
          src={ strMealThumb }
          alt={ `${strMeal}-cocktail` }
          data-testid={ RECOMENDATION_PHOTO(index) }
          className="d-block w-100"
        />
        <Carousel.Caption>
          <h3 data-testid={ RECOMENDATION_TITLE(index) }>{strMeal}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    ));
  return (
    <div style={ { display: 'flex', width: 700, padding: 30 } }>
      <Carousel data-items="2">
        {cards}
      </Carousel>
    </div>
  );
}

CarouselMeals.propTypes = {
  dishes: PropTypes.shape({
    slice: PropTypes.func,
  }),
}.isRequired;

export default CarouselMeals;
