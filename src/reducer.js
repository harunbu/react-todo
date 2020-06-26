import * as actions from './actions';

//初期のstate
const defaultState = {
  isLoading: true,
  user: null,
  todoList: [],
  mode: 'main',
};

//reducer定義
export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.END_LOADING:
      return Object.assign({}, state, {isLoading: false});
    case actions.SET_USER:
      return Object.assign({}, state, {user: action.user});
    case actions.INIT_TASKS:
      return Object.assign({}, state, {todoList: action.tasks})
    case actions.CHANGE_MODE:
      return Object.assign({}, state, {mode: action.mode})
    default:
      return state;
  }
};
