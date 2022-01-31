export const REQUEST_SEARCHBUTTON = 'REQUEST_SEARCHBUTTON';
export const GET_EMAIL = 'GET_EMAIL';
export const GET_JSON = 'GET_JSON';
export const FILTER = 'FILTER';
export const IS_CLICKED = 'IS_CLICKED';
export const IS_CATEGORY_CLICKED = 'IS_CATEGORY_CLICKED';
export const CATEGORY = 'CATEGORY';

export const requestSearchButton = () => ({
  type: REQUEST_SEARCHBUTTON,
});

export const getEmail = (payload) => ({
  type: GET_EMAIL,
  payload,
});

export const getResults = (payload) => ({
  type: GET_JSON,
  payload,
});

export const saveFilter = (payload) => ({
  type: FILTER,
  payload,
});

export const isClicked = (payload) => ({
  type: IS_CLICKED,
  payload,
});

export const isCategoryClicked = (payload) => ({
  type: IS_CATEGORY_CLICKED,
  payload,
});

export const setCategory = (payload) => ({
  type: CATEGORY,
  payload,
});
