import { CONSTANTS } from '../constants';

export const setTodosAction = payload => ({
  type: CONSTANTS.SET_TODOS,
  payload,
});

export const addTodoAction = payload => ({
  type: CONSTANTS.ADD_TODO,
  payload,
});

export const updateTodoAction = payload => ({
  type: CONSTANTS.UPDATE_TODO,
  payload,
});

export const removeTodoAction = payload => ({
  type: CONSTANTS.REMOVE_TODO,
  payload,
});
