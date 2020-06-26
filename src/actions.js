//ローディング終了
export const END_LOADING = '@@react-todo/END_LOADING';
export const endLoading = () => ({type: END_LOADING});

//ユーザーセット
export const SET_USER = '@@react-todo/SET_USER';
export const setUser = (user) => ({type: SET_USER, user: user});

//タスクリスト初期化
export const INIT_TASKS = '@@react-todo/INIT_TASKS';
export const initTasks = (tasks) => ({type: INIT_TASKS, tasks: tasks});

//表示モード切り替え
export const CHANGE_MODE = '@@react-todo/CHANGE_MODE';
export const changeMode = mode => ({type: CHANGE_MODE, mode: mode});
