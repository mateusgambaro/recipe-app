import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LikeAndShare from '../Components/LikeAndShare';
import CarouselDrinks from '../Components/CarouselDrinks';
import StartRecipeBtn from '../Components/StartRecipeBtn';
import '../styles/recipesDetails.css';

const RECIPE_PHOTO = 'recipe-photo';
const RECIPE_TITLE = 'recipe-title';
const RECIPE_CATEGORY = 'recipe-category';
const INGREDIENT_NAME_AND_MEASURE = (index) => `${index}-ingredient-name-and-measure`;
const INSTRUCTIONS = 'instructions';
const VIDEO = 'video';

const randomEndpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
const idEndpoint = (id) => `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
const drinkEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function MealsDetails({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState([]);
  const [cocktails, setCocktails] = useState([]);

  const getDrinks = async () => {
    const { drinks } = await fetch(drinkEndpoint)
      .then((results) => results.json());
    setCocktails(drinks);
  };

  const getRecipe = async () => {
    await fetch(idEndpoint(id))
      .then((response) => response.json())
      .then((data) => setRecipe(data.meals[0]));
  };

  const getRandom = async () => {
    await fetch(randomEndpoint)
      .then((response) => response.json())
      .then((data) => setRecipe(data.meals[0]));
  };

  useEffect(() => {
    if (!id) {
      getRandom();
    } else {
      getRecipe();
    }
  });

  useEffect(() => { getDrinks(); }, []);

  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = recipe;

  function embed(str) {
    const array = typeof (str) === 'string' ? str.split('=') : '';
    const prefix = 'https://www.youtube.com/embed/';
    return prefix.concat(array[1]);
  }

  function returnValue(a, b, string) {
    if (a.toLowerCase().includes(string) && b) {
      return b;
    }
    return undefined;
  }

  const entries = Object.entries(recipe);
  const ingredients = entries.map((e) => returnValue(e[0], e[1], 'ingredient'))
    .filter((e) => e !== undefined);
  const measurements = entries.map((e) => returnValue(e[0], e[1], 'measure'))
    .filter((e) => e !== undefined);

  return (
    <section className="recipe-card">
      <img data-testid={ RECIPE_PHOTO } alt={ `${strMeal} dish` } src={ strMealThumb } />
      <h1 />
      <h2 data-testid={ RECIPE_TITLE }>{strMeal}</h2>
      <p
        className="category"
        data-testid={ RECIPE_CATEGORY }
      >
        {strCategory}

      </p>
      <LikeAndShare id={ id } />

      <ul>
        { ingredients.map((e, index) => (
          <li key={ index } data-testid={ INGREDIENT_NAME_AND_MEASURE(index) }>
            {`${e} - ${measurements[index]}`}
          </li>
        ))}
      </ul>
      <p className="method" data-testid={ INSTRUCTIONS }>{strInstructions}</p>
      <iframe
        className="videobox"
        width="560"
        height="315"
        data-testid={ VIDEO }
        src={ embed(strYoutube) }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
        allowFullScreen
      />
      <CarouselDrinks className="carousel" cocktails={ cocktails } />
      <StartRecipeBtn id={ id } type="comidas" />
    </section>
  );
}

MealsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

MealsDetails.defaultProps = {
  match: {},
};

export default MealsDetails;
