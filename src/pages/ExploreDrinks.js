import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import '../styles/explore.css';

const RECIPE_CARD = (index) => `${index}-recipe-card`;
const CARD_IMG = (index) => `${index}-card-img`;
const CARD_NAME = (index) => `${index}-card-name`;

const EXPLORE_BY_INGREDIENT = 'explore-by-ingredient';
const EXPLORE_SURPRISE = 'explore-surprise';

const randomEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const byIngredient = (ingredient) => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

function ExploreDrinks() {
  const history = useHistory();
  const selectedIngredient = useSelector((state) => state.searchReducer.ingredient);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      const { drinks } = await fetch(byIngredient(selectedIngredient))
        .then((results) => results.json());
      setRecipes(drinks);
    }
    if (selectedIngredient) getRecipes();
  }, [selectedIngredient]);

  async function handleClick() {
    const { drinks } = await fetch(randomEndpoint)
      .then((response) => response.json());
    const routeNumber = drinks[0].idDrink;
    history.push(`/bebidas/${routeNumber}`);
  }

  const TWELVE = 12;
  const twelveRecipes = recipes ? recipes.slice(0, TWELVE) : [];

  return (
    <>
      <header>
        <Header title="Explorar Bebidas" search={ false } />
      </header>
      <div className="explore-container">
        <button
          className="explore-btn"
          type="button"
          data-testid={ EXPLORE_BY_INGREDIENT }
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
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
        // idDrink
        twelveRecipes.map(({ strDrinkThumb, strDrink }, index) => (
          <div
            key={ index }
            data-testid={ RECIPE_CARD(index) }
          >
            <img
              src={ strDrinkThumb }
              alt={ `${strDrink}-cocktail` }
              data-testid={ CARD_IMG(index) }
            />
            <h3 data-testid={ CARD_NAME(index) }>{strDrink}</h3>
          </div>
        ))
      }
      <Footer />
    </>
  );
}

export default ExploreDrinks;
