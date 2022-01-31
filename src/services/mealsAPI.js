export async function fetchIngredientAPI(ingrediente) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const result = await response.json();
  return result;
}

export async function fetchNameAPI(nome) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  const result = await response.json();
  return result;
}

export async function fetchFirstLetterAPI(primeiraLetra) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const result = await response.json();
  return result;
}

export async function fetchMealCategoryAPI(categoria) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?c=${categoria}`);
  const result = await response.json();
  return result;
}
