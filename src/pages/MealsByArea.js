import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const RECIPE_CARD = (index) => `${index}-recipe-card`;
const CARD_IMG = (index) => `${index}-card-img`;
const CARD_NAME = (index) => `${index}-card-name`;

const EXPLORE_BY_AREA_DROPDOWN = 'explore-by-area-dropdown';
const AREA_OPTION = (area) => `${area}-option`;

const locations = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const fetchAll = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const byCountry = (country) => `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`;

function MealsByArea() {
  const history = useHistory();
  const [area, setArea] = useState([]);
  const [location, setLocation] = useState('All');
  const [recipes, setRecipes] = useState([]);
  const reducer = (arr) => arr
    .reduce((acc, { strArea }) => [...acc, strArea], ['All']);

  useEffect(() => {
    async function listArea() {
      const { meals } = await fetch(locations)
        .then((results) => results.json());
      setArea(reducer(meals));
    }
    listArea();
  }, []);

  useEffect(() => {
    async function getRecipes() {
      const { meals } = await fetch(location === 'All' ? fetchAll : byCountry(location))
        .then((results) => results.json());
      setRecipes(meals);
    }
    getRecipes();
  }, [location]);

  const TWELVE = 12;
  const twelveRecipe = recipes.slice(0, TWELVE);

  return (
    <>
      <header>
        <Header title="Explorar Origem" search meals />
      </header>
      <select
        data-testid={ EXPLORE_BY_AREA_DROPDOWN }
        onChange={ ({ target: { value } }) => setLocation(value) }
      >
        {
          area.map((e, index) => (
            <option key={ index } data-testid={ AREA_OPTION(e) }>
              {e}
            </option>))
        }
      </select>
      {
        twelveRecipe.map(({ strMeal, strMealThumb, idMeal }, index) => (
          <div
            key={ index }
            role="button"
            onClick={ () => history.push(`/comidas/${idMeal}`) }
            tabIndex="0"
            aria-hidden="true"
            data-testid={ RECIPE_CARD(index) }
          >
            <img
              src={ strMealThumb }
              alt={ `${strMeal}-dish-plate` }
              height="160px"
              width="120px"
              data-testid={ CARD_IMG(index) }
            />
            <h3 data-testid={ CARD_NAME(index) }>{strMeal}</h3>
          </div>))
      }
      <Footer />
    </>
  );
}

export default MealsByArea;
