import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const START_RECIPE_BTN = 'start-recipe-btn';

function StartRecipeBtn({ id, type }) {
  const [done, setDone] = useState(false);
  const [doing, setDoing] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    const alreadyDone = [...JSON.parse(localStorage.getItem('doneRecipes'))];
    if (alreadyDone.some((e) => e.id === id.toString())) setDone(true);
  }, [id]);

  useEffect(() => {
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ cocktails: {}, meals: {} }));
    }
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { meals, cocktails } = recipesInProgress;
    const mealKeys = meals ? Object.keys(meals) : [];
    const cocktailsKeys = cocktails ? Object.keys(cocktails) : [];
    const array = [...mealKeys, ...cocktailsKeys];
    if (array.some((e) => e.toString() === id.toString())) setDoing(true);
  }, [id]);

  return (
    <button
      data-testid={ START_RECIPE_BTN }
      type="button"
      style={ {
        justifyContent: 'center',
        bottom: '0px',
        display: done ? 'none' : 'inline',
      } }
      onClick={ () => history.push(`/${type}/${id}/in-progress`) }
    >
      { doing ? 'Continuar Receita' : 'Iniciar Receita' }
    </button>
  );
}

StartRecipeBtn.propTypes = {
  id: PropTypes.shape({
    toString: PropTypes.func,
  }),
  type: PropTypes.string,
}.isRequired;

export default StartRecipeBtn;
