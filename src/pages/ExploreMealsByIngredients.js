import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { FILTER } from '../redux/actions/index';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

const INGREDIENT_CARD = (index) => `${index}-ingredient-card`;
const CARD_IMG = (index) => `${index}-card-img`;
const CARD_NAME = (index) => `${index}-card-name`;

function ExploreMealsByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const reducer = (array) => array
    .reduce((acc, { strIngredient }) => [...acc, strIngredient], []);

  useEffect(() => {
    async function getIngredients() {
      const { meals } = await fetch(url)
        .then((results) => results.json());
      setIngredients(reducer(meals));
    }
    getIngredients();
  }, []);

  function handleClick(value) {
    dispatch({ type: FILTER, payload: value });
    history.push('/explorar/comidas');
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
              src={ `https://www.themealdb.com/images/ingredients/${e}-Small.png` }
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

export default ExploreMealsByIngredients;
