import { Actions } from '../actions/types';
import { isEmpty } from '../helper';

const initialState = {
  isAuthenticated: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case Actions.GET_AUTH_ERRORS:
      return {
        ...state,
        errors: action.payload?._errors,
      };
    default:
      return state;
  }
}
