import { START_LOADONG, END_LOADING, INCREAMENT, SET_USER } from './actions';

const defaultState = {
  isLoading: true,
  value: 0,
  user: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case START_LOADONG:
      return Object.assign({}, state, {isLoading: true});
    case END_LOADING:
      return Object.assign({}, state, {isLoading: false});
    case INCREAMENT:
      return Object.assign({}, state, {value: parseInt(state.value) + parseInt(action.value)});
    case SET_USER:
      return Object.assign({}, state, {user: action.user});
    default:
      return state;
  }
};
