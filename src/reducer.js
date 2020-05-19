import * as actions from './actions';

const defaultState = {
  isLoading: true,
  value: 0,
  user: null,
  todoList: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.START_LOADONG:
      return Object.assign({}, state, {isLoading: true});
    case actions.END_LOADING:
      return Object.assign({}, state, {isLoading: false});
    case actions.INCREAMENT:
      return Object.assign({}, state, {value: parseInt(state.value) + parseInt(action.value)});
    case actions.SET_USER:
      return Object.assign({}, state, {user: action.user});
    case actions.ADD_TASK:
      return Object.assign({}, state, {todoList: state.todoList.concat([action.task])});
    default:
      return state;
  }
};
