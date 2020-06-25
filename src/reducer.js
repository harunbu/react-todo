import * as actions from './actions';

const defaultState = {
  isLoading: true,
  user: null,
  todoList: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.END_LOADING:
      return Object.assign({}, state, {isLoading: false});
    case actions.SET_USER:
      return Object.assign({}, state, {user: action.user});
    case actions.INIT_TASKS:
      return Object.assign({}, state, {todoList: action.tasks})
    default:
      return state;
  }
};
