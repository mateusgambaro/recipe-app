export const fetchDrinksIngredientAPI = async (ingrediente) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (er) {
    console.log(er);
    return { drinks: null };
  }
};

export const fetchDrinksNameAPI = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const result = await response.json();
  return result;
};

export const fetchDrinksFirstLetterAPI = async (firstLetter) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const result = await response.json();
  return result;
};
