import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import Meals from '../pages/Meals';
import renderWithRouterAndStore from './renderWithRouterAndStore';
import DoneRecipes from '../pages/DoneRecipes';

const PROFILE_TOP_BTN = 'profile-top-btn';
const PAGE_TITLE = 'page-title';
const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';

afterEach(cleanup);

describe('Req 9: Header has a title and renders a profile and search button', () => {
  it('should contain a profile button', () => {
    renderWithRouterAndStore(<Meals />);
    const profileButton = screen.getByTestId(PROFILE_TOP_BTN);
    const headerTitle = screen.getByTestId(PAGE_TITLE);
    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    fireEvent.click(searchButton);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    expect(searchInput).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(headerTitle).toBeInTheDocument();
  });
});

describe('Req: 10: Header has a Profile and Search Icons', () => {
  it('should not render the Header on Login page', () => {
    renderWithRouterAndStore(<Meals />);
    const headerTitle = screen.getByTestId(PAGE_TITLE);
    expect(headerTitle).not.toBeInTheDocument();
  });

  it('should render the Header on DoneRecipes page', () => {
    renderWithRouterAndStore(<DoneRecipes />);
    const title = screen.queryByText(RECEITAS_FEITAS);
    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    expect(title).toBeInTheDocument();
    expect(searchButton).not.toBeInTheDocument();
  });

  it('should not render the Header on DrinkDetails page', () => {
    renderWithRouterAndStore('/pages/DrinkDetails');
    const headerTitle = screen.getByTestId(PAGE_TITLE);
    expect(headerTitle).not.toBeInTheDocument();
  });
});
