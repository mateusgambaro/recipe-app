import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import CheckboxIngredient from '../Components/CheckboxIngrendient';
import '../styles/inProgress.css';

function MealsInProgress() {
  const url = (index) => `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`;
  const [recipe, setRecipe] = useState([]);
  const history = useHistory();
  const test = 52771;
  useEffect(() => {
    async function getRecipe() {
      await fetch(url(test))
        .then((response) => response.json())
        .then((data) => setRecipe(data.meals));
    }
    getRecipe();
  }, []);
  function returnValue(a, b, string) {
    if (a.toLowerCase().includes(string) && b) {
      return b;
    }
    return undefined;
  }

  const entries = recipe[0] ? Object.entries(recipe[0]) : [];
  const ingredients = entries.map((e) => returnValue(e[0], e[1], 'ingredient'))
    .filter((e) => e !== undefined);
  const measures = entries.map((e) => returnValue(e[0], e[1], 'measure'))
    .filter((e) => e !== undefined);
  return (
    <section className="details-card">
      { recipe.map((rec) => (
        <main key={ rec.idMeal }>

          <img
            src={ rec.strMealThumb }
            data-testid="recipe-photo"
            alt="foto de receita"
          />
          <h1 data-testid="recipe-title">
            {rec.strMeal}
          </h1>
          <img
            src={ shareIcon }
            data-testid="share-btn"
            alt="botão de compartilhar"
          />
          <img
            src={ whiteHeartIcon }
            data-testid="favorite-btn"
            alt="botão de faovritar"
          />
          <p className="category" data-testid="recipe-category">
            { rec.strCategory }
          </p>
          <p className="method" data-testid="instructions">
            {rec.strInstructions}
          </p>
          <button
            className="finish"
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ () => history.push('/receitas-feitas') }
          >
            Finalizar Receita
          </button>
        </main>
      ))}
      { ingredients.map((ingredient, index) => (
        <CheckboxIngredient
          className="checkbox"
          key={ index }
          index={ index }
          ingredient={ ingredient }
          measure={ measures[index] }
        />))}
    </section>
  );
}

export default MealsInProgress;
