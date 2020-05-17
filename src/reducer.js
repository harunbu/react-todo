import { START_LOADONG, END_LOADING, INCREAMENT } from './actions';

const defaultState = {
  isLoading: true,
  value: 0,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case START_LOADONG:
      return Object.assign({}, state, {isLoading: true});
    case END_LOADING:
      return Object.assign({}, state, {isLoading: false});
    case INCREAMENT:
      return Object.assign({}, state, {value: parseInt(state.value) + parseInt(action.value)});
    default:
      return state;
  }
};
