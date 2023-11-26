import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
    },
    removeTodo: (state, action) => {
      const { payload: taskId } = action;
      state.todos = state.todos.filter(todo => todo.id !== taskId);
    },
    toggleTodo: (state, action) => {
      const { payload: taskId } = action;
      state.todos = state.todos.map(todo =>
        todo.id === taskId ? { ...todo, completed: !todo.completed } : todo,
      );
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
