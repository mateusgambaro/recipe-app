/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SearchCard from '../Components/SearchCard';
import { fetchDrinksNameAPI } from '../services/drinksAPI';
import CategoryButtons from '../Components/CategoryButtons';

const TWELVE = 12;

function Drinks({ history }) {
  const [drinkSearch, setDrinkSearch] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [initialRecipes, setInitialRecipes] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isCatClicked, setIsCatClicked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const resultsFromGlobalState = useSelector((state) => (
    state.searchReducer.results));
  const isClickedFromGlobalState = useSelector((state) => (
    state.searchReducer.isClicked));
  const isClickedFromGlobal = useSelector((state) => (
    state.searchReducer.isCategoryClicked));

  useEffect(() => {
    setIsCatClicked(isClickedFromGlobal);
  }, [isClickedFromGlobal]);

  useEffect(() => {
    setIsFetched(false);
    async function getInitialRecipes() {
      const recipes = await fetchDrinksNameAPI('');
      setInitialRecipes(recipes);
      setIsFetched(true);
    }
    getInitialRecipes();
    // setInitialRecipes()
  }, []);

  useEffect(() => {
    setDrinkSearch(resultsFromGlobalState);
    setSubmitted(true);
  }, [resultsFromGlobalState]);

  useEffect(() => {
    if (submitted === true && drinkSearch.drinks && drinkSearch.drinks.length === 1
      && isClicked) {
      history.push(`/bebidas/${drinkSearch.drinks[0].idDrink}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drinkSearch]);

  useEffect(() => {
    setIsClicked(isClickedFromGlobalState);
  }, [isClickedFromGlobalState]);

  return (
    isFetched ? (
      <>
        <header>
          <Header title="Bebidas" search meals={ false } type="drinks" />
        </header>
        <CategoryButtons meal={ false } />
        { drinkSearch.length === 0 || !drinkSearch.drinks || isCatClicked
          ? initialRecipes.drinks.filter((_, idx) => idx < TWELVE)
            .map(({ strDrink, strDrinkThumb, idDrink }, index) => (
              <SearchCard
                key={ idDrink }
                picture={ strDrinkThumb }
                name={ strDrink }
                id={ idDrink }
                index={ index }
                meals={ false }
                data-testid={ `${index}-recipe-card` }
              />
            ))
          : drinkSearch.drinks.filter((_, idx) => idx < TWELVE)
            .map(({ strDrink, strDrinkThumb, idDrink }, index) => (
              <SearchCard
                key={ idDrink }
                picture={ strDrinkThumb }
                name={ strDrink }
                id={ idDrink }
                index={ index }
                meals={ false }
              />
            )) }
        <Footer />
      </>
    ) : 'loading'
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Drinks;
