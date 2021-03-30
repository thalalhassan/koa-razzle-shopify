import { combineReducers } from 'redux';
import { Actions } from '../actions/types';
import authReducer from './authReducer';
import commonReducer from './commonReducer';

export default combineReducers({
  authReducer,
  selectReducer: commonReducer(Actions.GET_SELECT_DATA),
  subSelectReducer: commonReducer(Actions.GET_SUBSELECT_DATA),
});
