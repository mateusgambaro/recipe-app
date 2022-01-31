import { GET_EMAIL } from '../actions';

const INITIAL_STATE = {
  emailLogin: '',
};

const profileReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_EMAIL:
    return {
      ...state,
      emailLogin: payload,
    };
  default:
    return state;
  }
};

export default profileReducer;
