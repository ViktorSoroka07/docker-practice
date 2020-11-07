import { CONSTANTS } from '../constants';

export const todos = (state = {}, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_TODO:
      return [...state, action.payload];
    case CONSTANTS.REMOVE_TODO:
      return state.filter(todo => todo.id !== action.payload);
    case CONSTANTS.UPDATE_TODO:
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }

        return todo;
      });
    case CONSTANTS.SET_TODOS:
      return [...action.payload];
    default:
      return state;
  }
};
