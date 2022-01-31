import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndStore from './renderWithRouterAndStore';

const emailForTesting = 'random@random.co';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_BTN = 'login-submit-btn';
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

afterEach(cleanup);

describe('1 - 5 - Renders App and applies tests for Login component', () => { // testes feito por Guilherme
  it('should contain an email input', () => {
    renderWithRouterAndStore(<App />, '/');
    const email = screen.getByTestId(EMAIL_INPUT);
    expect(email).toBeInTheDocument();
    expect(email.type).toBe('text');
    expect(email.value).toBe('');
    fireEvent.change(email, { target: { value: emailForTesting } });
    expect(email.value).toBe(emailForTesting);
  });
  it('should contain a password input', () => {
    renderWithRouterAndStore(<App />, '/');
    const password = screen.getByTestId(PASSWORD_INPUT);
    expect(password).toBeInTheDocument();
    expect(password.type).toBe('password');
    expect(password.value).toBe('');
    fireEvent.change(password, { target: { value: '123456' } });
    expect(password.value).toBe('123456');
  });
  it('should contain a submit button, enabled by valid email/password', () => {
    renderWithRouterAndStore(<App />, '/');
    const button = screen.getByTestId(LOGIN_BTN);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Entrar');
    expect(button).toHaveAttribute('disabled');
    expect(button.disabled).toBe(true);

    const password = screen.getByTestId(PASSWORD_INPUT);
    expect(password).toBeInTheDocument();
    fireEvent.change(password, { target: { value: '1234567' } });

    const email = screen.getByTestId(EMAIL_INPUT);
    expect(email).toBeInTheDocument();
    fireEvent.change(email, { target: { value: emailForTesting } });

    expect(button.disabled).toBe(false);
  });
});

describe('6 - Checks if Login handles localStorage items ', () => {
  it('should set a token in localStorage', () => {
    global.localStorage = localStorageMock;
    renderWithRouterAndStore(<App />, '/');
    const button = screen.getByTestId(LOGIN_BTN);

    const password = screen.getByTestId(PASSWORD_INPUT);
    fireEvent.change(password, { target: { value: '1234567' } });

    const email = screen.getByTestId(EMAIL_INPUT);
    fireEvent.change(email, { target: { value: emailForTesting } });

    fireEvent.click(button);

    const storedMealsToken = JSON.parse(localStorage.getItem('mealsToken'));
    expect(storedMealsToken).toBe(1);

    const storedCocktailsToken = JSON.parse(localStorage.getItem('cocktailsToken'));
    expect(storedCocktailsToken).toBe(1);
  });
});
