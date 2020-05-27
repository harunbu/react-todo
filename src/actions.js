//ローディング終了
export const END_LOADING = '@@react-todo/END_LOADING';
export const endLoading = () => ({type: END_LOADING});

//ユーザーセット
export const SET_USER = '@@react-todo/SET_USER';
export const setUser = (user) => ({type: SET_USER, user: user});

//タスク追加
export const ADD_TASK = '@@react-todo/ADD_TASK';
export const addTask = (task) => ({type: ADD_TASK, task: task});

//タスクリスト初期化
export const INIT_TASKS = '@@react-todo/INIT_TASKS';
export const initTasks = (tasks) => ({type: INIT_TASKS, tasks: tasks});
