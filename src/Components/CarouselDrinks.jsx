import PropTypes from 'prop-types';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

const RECOMENDATION_CARD = (index) => `${index}-recomendation-card`;
const RECOMENDATION_PHOTO = (index) => `${index}-recipe-photo`;
const RECOMENDATION_TITLE = (index) => `${index}-recomendation-title`;

const SIX = 6;

function CarouselDrinks(props) {
  const { cocktails } = props;
  const cards = cocktails.slice(0, SIX)
    .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
      <Carousel.Item key={ idDrink } data-testid={ RECOMENDATION_CARD(index) }>
        <img
          src={ strDrinkThumb }
          alt={ `${strDrink}-cocktail` }
          data-testid={ RECOMENDATION_PHOTO(index) }
          className="d-block w-100"
        />
        <Carousel.Caption>
          <h3 data-testid={ RECOMENDATION_TITLE(index) }>{strDrink}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    ));
  return (
    <div style={ { display: 'flex', width: 300, padding: 30 } }>
      <Carousel data-items="2">
        {cards}
      </Carousel>
    </div>
  );
}

CarouselDrinks.propTypes = {
  cocktails: PropTypes.shape({
    slice: PropTypes.func,
  }),
}.isRequired;

export default CarouselDrinks;
