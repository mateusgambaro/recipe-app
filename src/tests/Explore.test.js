import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Explorar from '../pages/Explore';
import renderWithRouterAndStore from './renderWithRouterAndStore';

const EXPLORE_FOOD = 'explore-food';
const EXPLORE_DRINKS = 'explore-drinks';

afterEach(cleanup);

describe('Renders explore page and applies tests for it', () => {
  it('should contain a food explore button', () => {
    const { history } = renderWithRouterAndStore(<Explorar />);

    const button = screen.getByTestId(EXPLORE_FOOD);
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    const path = history.location.pathname;
    expect(path).toBe('/explorar/comidas');
  });
  it('should contain a drink explore button', () => {
    const { history } = renderWithRouterAndStore(<Explorar />);

    const button = screen.getByTestId(EXPLORE_DRINKS);
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    const path = history.location.pathname;
    expect(path).toBe('/explorar/bebidas');
  });
});
