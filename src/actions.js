//ローディング開始
export const START_LOADONG = '@@react-todo/START_LOADING';
export const startLoading = () => ({type: START_LOADONG});

//ローディング終了
export const END_LOADING = '@@react-todo/END_LOADING';
export const endLoading = () => ({type: END_LOADING});

//デバッグ用：カウントアップ
export const INCREAMENT = '@@react-todo/INCREAMENT';
export const increament = (value) => ({type: INCREAMENT, value: value});

//ユーザーセット
export const SET_USER = '@@react-todo/SET_USER';
export const setUser = (user) => ({type: SET_USER, user: user});
