import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/recipesDetails.css';
import LikeAndShare from '../Components/LikeAndShare';
import CarouselMeals from '../Components/CarouselMeals';
import StartRecipeBtn from '../Components/StartRecipeBtn';

const RECIPE_PHOTO = 'recipe-photo';
const RECIPE_TITLE = 'recipe-title';
const RECIPE_CATEGORY = 'recipe-category';
const INGREDIENT_NAME_AND_MEASURE = (index) => `${index}-ingredient-name-and-measure`;
const INSTRUCTIONS = 'instructions';

const randomEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const idEndpoint = (id) => `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
const mealsEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

function DrinkDetails({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState([]);
  const [dishes, setDishes] = useState([]);

  const getDishes = async () => {
    const { meals } = await fetch(mealsEndpoint)
      .then((results) => results.json());
    setDishes(meals);
  };

  const getRecipe = async () => {
    await fetch(idEndpoint(id))
      .then((response) => response.json())
      .then((data) => setRecipe(data.drinks[0]));
  };

  const getRandom = async () => {
    await fetch(randomEndpoint)
      .then((response) => response.json())
      .then((data) => setRecipe(data.drinks[0]));
  };

  useEffect(() => { getDishes(); }, []);

  useEffect(() => {
    if (id === 'random') {
      getRandom();
    } else {
      getRecipe();
    }
  });

  const { strDrinkThumb, strDrink,
    strAlcoholic, strInstructions } = recipe;

  function returnValue(a, b, string) {
    if (a.toLowerCase().includes(string) && b) {
      return b;
    }
    return null;
  }

  const entries = Object.entries(recipe);
  const ingredients = entries.map((e) => returnValue(e[0], e[1], 'ingredient'))
    .filter((e) => e !== null);
  const measurements = entries.map((e) => returnValue(e[0], e[1], 'measure'))
    .filter((e) => e !== null);

  return (
    <section className="recipe-card">
      <img
        data-testid={ RECIPE_PHOTO }
        alt={ `${strDrink} drink` }
        src={ strDrinkThumb }
      />
      <h1>Detalhes</h1>
      <h2 data-testid={ RECIPE_TITLE }>{strDrink}</h2>
      <p data-testid={ RECIPE_CATEGORY }>{strAlcoholic}</p>
      <LikeAndShare id={ id } />
      <ul>
        { ingredients.map((e, index) => (
          <li key={ index } data-testid={ INGREDIENT_NAME_AND_MEASURE(index) }>
            {`${e} - ${measurements[index]}`}
          </li>
        ))}
      </ul>
      <p data-testid={ INSTRUCTIONS }>{strInstructions}</p>
      <CarouselMeals dishes={ dishes } />
      <StartRecipeBtn id={ id } type="bebidas" />
    </section>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

DrinkDetails.defaultProps = {
  match: {},
};
export default DrinkDetails;
