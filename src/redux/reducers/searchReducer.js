import { GET_JSON, FILTER, IS_CLICKED, IS_CATEGORY_CLICKED, CATEGORY } from '../actions';

const initialState = {
  results: [],
  ingredient: '',
  isClicked: false,
  isCategoryClicked: false,
  category: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_JSON:
    return { ...state, results: payload };
  case FILTER:
    return { ...state, ingredient: payload };
  case IS_CLICKED:
    return { ...state, isClicked: payload };
  case IS_CATEGORY_CLICKED:
    return { ...state, isCategoryClicked: payload };
  case CATEGORY:
    return { ...state, category: payload };
  default:
    return state;
  }
};
