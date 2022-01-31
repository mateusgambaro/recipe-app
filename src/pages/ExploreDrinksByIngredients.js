import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { FILTER } from '../redux/actions/index';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const ingredientsEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

const INGREDIENT_CARD = (index) => `${index}-ingredient-card`;
const CARD_IMG = (index) => `${index}-card-img`;
const CARD_NAME = (index) => `${index}-card-name`;

function ExploreDrinksByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const reducer = (arr) => arr
    .reduce((acc, { strIngredient1 }) => [...acc, strIngredient1], []);

  useEffect(() => {
    async function listIng() {
      const { drinks } = await fetch(ingredientsEndpoint)
        .then((results) => results.json());
      setIngredients(reducer(drinks));
    }
    listIng();
  }, []);

  function handleClick(value) {
    dispatch({ type: FILTER, payload: value });
    history.push('/explorar/bebidas');
  }

  const TWELVE = 12;
  const twelveIng = ingredients.slice(0, TWELVE);

  return (
    <>
      <header>
        <Header title="Explorar Ingredientes" search={ false } />
      </header>
      {
        twelveIng.map((e, index) => (
          <div
            key={ index }
            data-testid={ INGREDIENT_CARD(index) }
            role="button"
            onClick={ () => handleClick(e) }
            tabIndex="0"
            aria-hidden="true"
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${e}-Small.png` }
              alt="cocktail-ingredient"
              data-testid={ CARD_IMG(index) }
              height="160px"
              width="120px"
            />
            <h3 data-testid={ CARD_NAME(index) }>
              {e}
            </h3>
          </div>
        ))
      }
      <Footer />
    </>
  );
}

export default ExploreDrinksByIngredients;
