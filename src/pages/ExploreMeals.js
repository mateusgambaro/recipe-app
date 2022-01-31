import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import '../styles/explore.css';

const RECIPE_CARD = (index) => `${index}-recipe-card`;
const CARD_IMG = (index) => `${index}-card-img`;
const CARD_NAME = (index) => `${index}-card-name`;

const EXPLORE_BY_INGREDIENT = 'explore-by-ingredient';
const EXPLORE_BY_AREA = 'explore-by-area';
const EXPLORE_SURPRISE = 'explore-surprise';

const randomEndpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
const byIngredient = (ingredient) => `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.toLowerCase().split(' ').join('_')}`;

function ExploreMeals() {
  const history = useHistory();
  const selectedIngredient = useSelector((state) => state.searchReducer.ingredient);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      const { meals } = await fetch(byIngredient(selectedIngredient))
        .then((results) => results.json());
      setRecipes(meals);
    }
    if (selectedIngredient) getRecipes();
  }, [selectedIngredient]);

  async function handleClick() {
    const { meals } = await fetch(randomEndpoint)
      .then((response) => response.json());
    const routeNumber = meals[0].idMeal;
    history.push(`/comidas/${routeNumber}`);
  }

  const TWELVE = 12;
  const twelveRecipes = recipes ? recipes.slice(0, TWELVE) : [];

  return (
    <>
      <header>
        <Header title="Explorar Comidas" search={ false } />
      </header>
      <div className="explore-container">
        <button
          className="explore-btn"
          type="button"
          data-testid={ EXPLORE_BY_INGREDIENT }
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button
          className="explore-btn"
          type="button"
          data-testid={ EXPLORE_BY_AREA }
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
        </button>
        <button
          className="explore-btn"
          type="button"
          data-testid={ EXPLORE_SURPRISE }
          onClick={ () => handleClick() }
        >
          Me Surpreenda!
        </button>
      </div>
      {
        // idMeal
        twelveRecipes.map(({ strMealThumb, strMeal }, index) => (
          <div
            key={ index }
            data-testid={ RECIPE_CARD(index) }
          >
            <img
              src={ strMealThumb }
              alt={ `${strMeal}-dish` }
              data-testid={ CARD_IMG(index) }
            />
            <h3 data-testid={ CARD_NAME(index) }>{strMeal}</h3>
          </div>
        ))
      }
      <Footer />
    </>
  );
}

export default ExploreMeals;
