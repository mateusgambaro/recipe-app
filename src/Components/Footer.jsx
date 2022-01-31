import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="footer-container"
    >
      <Link to="/bebidas">
        <img
          className="footer"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinkIcon"
        />
      </Link>
      <Link to="/explorar">
        <img
          className="footer"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="exploreIcon"
        />
      </Link>
      <Link to="/comidas">
        <img
          className="footer"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="mealIcon"
        />
      </Link>
    </footer>
  );
}
