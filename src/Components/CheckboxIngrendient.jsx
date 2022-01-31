import PropTypes from 'prop-types';
import React, { useState } from 'react';

const INGREDIENT_STEP = (index) => `${index}-ingredient-step`;
function CheckboxIngredient(props) {
  const { index, ingredient, measure } = props;
  const [checked, setChecked] = useState(false);
  return (
    <div key={ index } data-testid={ INGREDIENT_STEP(index) }>
      <p style={ { textDecoration: checked ? 'line-through' : 'none' } }>
        {`${ingredient} - ${measure}`}
      </p>
      <input
        type="checkbox"
        onChange={ () => setChecked(!checked) }
      />
    </div>
  );
}
CheckboxIngredient.propTypes = {
  index: PropTypes.number,
  ingredient: PropTypes.string,
  measure: PropTypes.string,
}.isRequired;
export default CheckboxIngredient;
