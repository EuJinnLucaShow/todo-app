import { createSlice } from '@reduxjs/toolkit';

import { fetchTodos, addTodo, deleteTodo, editTodo } from './operations';

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.todos = action.payload;
      })
      .addCase(addTodo.pending, state => {
        state.isLoading = true;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
      })
      .addCase(editTodo.pending, state => {
        state.isLoading = true;
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const updatedTodo = action.payload;
        state.todos = state.todos.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        );
      });
  },
});

const { reducer: todosReducer } = todosSlice;
export default todosReducer;
