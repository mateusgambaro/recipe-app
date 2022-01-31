import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExploreDrinks from '../pages/ExploreDrinks';
import renderWithRouterAndStore from './renderWithRouterAndStore';

const EXPLORE_BY_INGREDIENT = 'explore-by-ingredient';
const EXPLORE_SURPRISE = 'explore-surprise';

afterEach(cleanup);

describe('Renders the explore for Drinks page and applies tests', () => {
  it('should contain an option to explore by ingredients', () => {
    const { history } = renderWithRouterAndStore(<ExploreDrinks />);

    const button = screen.getByTestId(EXPLORE_BY_INGREDIENT);
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    const path = history.location.pathname;
    expect(path).toBe('/explorar/bebidas/ingredientes');
  });
  it('should contain an option to randomize a meal', () => {
    renderWithRouterAndStore(<ExploreDrinks />);

    const button = screen.getByTestId(EXPLORE_SURPRISE);
    expect(button).toBeInTheDocument();
  });
});
