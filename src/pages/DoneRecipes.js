import React, { useEffect, useState } from 'react';
import DoneRecipesCard from '../Components/DoneRecipesCard';
import Header from '../Components/Header';
import '../styles/doneRecipes.css';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState('');

  function getdoneRecipesFromStorage() {
    if (localStorage.getItem('doneRecipes')) {
      return JSON.parse(localStorage.getItem('doneRecipes'));
    }
  }

  useEffect(() => {
    setDoneRecipes(getdoneRecipesFromStorage());
  }, []);

  function filterDoneRecipes(allDoneRecipes) {
    return (
      allDoneRecipes
        .filter((recipe) => (filteredRecipes !== ''
          ? recipe.type === filteredRecipes
          : allDoneRecipes))
    );
  }

  return (
    <main>
      <header>
        <Header title="Receitas Feitas" search={ false } />
      </header>
      <section className="category-container">
        <button
          className="btn-category"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilteredRecipes('') }
        >
          All
        </button>
        <button
          className="btn-category"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilteredRecipes('comida') }
        >
          Foods
        </button>
        <button
          className="btn-category"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilteredRecipes('bebida') }
        >
          Drinks
        </button>
      </section>
      <section>
        { doneRecipes.length !== 0
          ? filterDoneRecipes(doneRecipes).map((recipe, index) => (
            <DoneRecipesCard
              key={ index }
              recipe={ recipe }
              index={ index }
            />
          ))
          : ''}
      </section>
    </main>
  );
}

export default DoneRecipes;
