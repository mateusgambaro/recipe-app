import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExploreMeals from '../pages/ExploreMeals';
import renderWithRouterAndStore from './renderWithRouterAndStore';

const EXPLORE_BY_INGREDIENT = 'explore-by-ingredient';
const EXPLORE_BY_AREA = 'explore-by-area';
const EXPLORE_SURPRISE = 'explore-surprise';

afterEach(cleanup);

describe('Renders the explore for meals page and applies tests', () => {
  it('should contain an option to explore by ingredients', () => {
    const { history } = renderWithRouterAndStore(<ExploreMeals />);

    const button = screen.getByTestId(EXPLORE_BY_INGREDIENT);
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/comidas/ingredientes');
  });
  it('should contain an option to explore by area', () => {
    const { history } = renderWithRouterAndStore(<ExploreMeals />);

    const button = screen.getByTestId(EXPLORE_BY_AREA);
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/comidas/area');
  });
  it('should contain an option to randomize a meal', () => {
    renderWithRouterAndStore(<ExploreMeals />);

    const button = screen.getByTestId(EXPLORE_SURPRISE);
    expect(button).toBeInTheDocument();
  });
});
