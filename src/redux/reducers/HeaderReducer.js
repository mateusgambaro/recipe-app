import { REQUEST_SEARCHBUTTON } from '../actions';

const INITIAL_STATE = {
  searchButton: false,
};

const header = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SEARCHBUTTON:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default header;
