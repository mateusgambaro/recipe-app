import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getResults, isCategoryClicked, isClicked, setCategory } from '../redux/actions';
import { fetchDrinksNameAPI } from '../services/drinksAPI';
import { fetchNameAPI } from '../services/mealsAPI';
import '../styles/categoryButtons.css';

const FIVE = 5;

async function getMealsCategories() {
  const fetchApi = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const parseApi = await fetchApi.json();
  return parseApi;
}

async function getDrinksCategories() {
  const fetchApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const parseApi = await fetchApi.json();
  return parseApi;
}

function getValues(categories) {
  return categories.reduce((acc, cat) => [...acc, cat.strCategory], []);
}

class CategoryButtons extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
    this.parsedMealsCategories = this.parsedMealsCategories.bind(this);
    this.parsedDrinksCategories = this.parsedDrinksCategories.bind(this);
    this.filterByCategory = this.filterByCategory.bind(this);
    this.filterByAll = this.filterByAll.bind(this);
  }

  async componentDidMount() {
    const { meal } = this.props;
    if (meal === true) {
      await this.parsedMealsCategories();
    } else {
      await this.parsedDrinksCategories();
    }
  }

  async parsedMealsCategories() {
    const mealsCategories = await getMealsCategories();
    const allCategories = getValues(mealsCategories.meals);
    this.setState({ categories: allCategories.slice(0, FIVE) });
  }

  async parsedDrinksCategories() {
    const drinksCategories = await getDrinksCategories();
    const allCategories = getValues(drinksCategories.drinks);
    this.setState({ categories: allCategories.slice(0, FIVE) });
  }

  async filterByCategory(category) {
    const { categoriesToGlobalState, categoryFromGlobal, dispatchCategory,
      click, meal, isCategoryFromGlobal, categoryClicked } = this.props;
    if (category === categoryFromGlobal) {
      categoryClicked(!isCategoryFromGlobal);
    }
    dispatchCategory(category);
    click(false);
    if (meal) {
      const mealsCategories = await
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const parsedApi = await mealsCategories.json();
      categoriesToGlobalState(parsedApi);
    } else {
      const drinksCategories = await
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const parsedApi = await drinksCategories.json();
      categoriesToGlobalState(parsedApi);
    }
  }

  async filterByAll() {
    const { categoriesToGlobalState, meal, click } = this.props;
    click(false);
    if (meal) {
      const allMealsCategories = await fetchNameAPI('');
      categoriesToGlobalState(allMealsCategories);
    } else {
      const allDrinksCategories = await fetchDrinksNameAPI('');
      categoriesToGlobalState(allDrinksCategories);
    }
  }

  render() {
    const { categories } = this.state;
    return (

      categories.length !== 0
        ? (
          <section className="category-container">
            <button
              className="btn-category"
              type="button"
              data-testid="All-category-filter"
              onClick={ this.filterByAll }
            >
              All
            </button>
            { categories.map((category, i) => (
              <button
                className="btn-category"
                type="button"
                data-testid={ `${category}-category-filter` }
                key={ i }
                onClick={ () => this.filterByCategory(`${category}`) }
              >
                {category}
              </button>
            )) }
          </section>
        )
        : 'loading'
    );
  }
}

CategoryButtons.propTypes = {
  meal: PropTypes.bool.isRequired,
  categoriesToGlobalState: PropTypes.func.isRequired,
  click: PropTypes.func.isRequired,
  isCategoryFromGlobal: PropTypes.bool.isRequired,
  categoryClicked: PropTypes.func.isRequired,
  categoryFromGlobal: PropTypes.string.isRequired,
  dispatchCategory: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  categoriesToGlobalState: (Results) => dispatch(getResults(Results)),
  click: (bool) => dispatch(isClicked(bool)),
  categoryClicked: (negation) => dispatch(isCategoryClicked(negation)),
  dispatchCategory: (cat) => dispatch(setCategory(cat)),
});

const mapStateToProps = (state) => ({
  isCategoryFromGlobal: state.searchReducer.isCategoryClicked,
  categoryFromGlobal: state.searchReducer.category,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryButtons);
