import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { fetchFirstLetterAPI, fetchIngredientAPI,
  fetchNameAPI } from '../services/mealsAPI';
import {
  fetchDrinksIngredientAPI,
  fetchDrinksNameAPI,
  fetchDrinksFirstLetterAPI,
} from '../services/drinksAPI';
import { GET_JSON, IS_CLICKED } from '../redux/actions';
import '../styles/header.css';

function Header({ title, search, meals, type }) {
  const [searchInput, setSearchInput] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [results, setResults] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_JSON, payload: results });
    if (results[type] === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [results, dispatch]);

  async function handleClickMeals() {
    dispatch({ type: IS_CLICKED, payload: true });
    switch (radioValue) {
    case 'ingrediente':
      setResults(await fetchIngredientAPI(searchInputValue));
      setSearchInputValue('');
      break;
    case 'nome':
      setResults(await fetchNameAPI(searchInputValue));
      setSearchInputValue('');
      break;
    case 'primeira-letra':
      if (searchInputValue.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
        break;
      }
      setResults(await fetchFirstLetterAPI(searchInputValue));
      setSearchInputValue('');
      break;
    default:
      break;
    }
  }

  async function handleClickDrinks() {
    dispatch({ type: IS_CLICKED, payload: true });
    switch (radioValue) {
    case 'ingrediente':
      setResults(await fetchDrinksIngredientAPI(searchInputValue));
      setSearchInputValue('');
      break;
    case 'nome':
      setResults(await fetchDrinksNameAPI(searchInputValue));
      setSearchInputValue('');
      break;
    case 'primeira-letra':
      if (searchInputValue.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
        break;
      }
      setResults(await fetchDrinksFirstLetterAPI(searchInputValue));
      setSearchInputValue('');
      break;
    default:
      break;
    }
  }

  const fetchButtonMeals = (
    <button
      className="exec-button"
      type="button"
      data-testid="exec-search-btn"
      onClick={ handleClickMeals }
    >
      Buscar
    </button>);

  const fetchButtonDrinks = (
    <button
      className="exec-button"
      type="button"
      data-testid="exec-search-btn"
      onClick={ handleClickDrinks }
    >
      Buscar
    </button>);

  return (

    <header className="header-container">
      <div className="header-box">
        <Link to="/perfil">
          <img
            className="avatar"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile Icon"
          />
        </Link>
        <h1
          data-testid="page-title"
          className="header-h1"
        >
          {title}
        </h1>

        {search && (
          <button
            className="search-btn"
            type="button"
            onClick={ () => setSearchInput(!searchInput) }
          >
            <img
              className="searchbox-img"
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search Button"
            />
          </button>
        )}
      </div>
      {searchInput && (
        <input
          className="searchbox-input"
          type="text"
          data-testid="search-input"
          name="searchInput"
          placeholder="Buscar Receita"
          value={ searchInputValue }
          onChange={ ({ target }) => setSearchInputValue(target.value) }
        />
      )}

      <div className="radio-button">
        <label htmlFor="ingrediente">
          <input
            id="ingrediente"
            data-testid="ingredient-search-radio"
            name="search-radio"
            value="ingrediente"
            type="radio"
            onChange={ ({ target }) => setRadioValue(target.value) }
          />
          <span>Ingrediente</span>
        </label>
        <label htmlFor="nome">
          <input
            id="nome"
            data-testid="name-search-radio"
            name="search-radio"
            value="nome"
            type="radio"
            onChange={ ({ target }) => setRadioValue(target.value) }
          />
          <span>Nome</span>
        </label>
        <label htmlFor="primeira-letra">
          <input
            id="primeira-letra"
            data-testid="first-letter-search-radio"
            name="search-radio"
            value="primeira-letra"
            type="radio"
            onChange={ ({ target }) => setRadioValue(target.value) }
          />
          <span>Primeira Letra</span>
        </label>
      </div>

      { meals ? fetchButtonMeals : fetchButtonDrinks }

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  search: PropTypes.bool,
  meals: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

Header.defaultProps = {
  title: '',
  search: true,
  meals: true,
};

export default Header;
