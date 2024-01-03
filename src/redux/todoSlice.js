import { createSlice } from '@reduxjs/toolkit';

import {
  fetchTodos,
  addTodo,
  deleteTodo,
  editTodo,
  sendTodos,
} from './operations';

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
        state.todos = state.todos.filter(
          todo => todo._id !== action.payload._id,
        );
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
          todo._id === updatedTodo._id ? updatedTodo : todo,
        );
      })
      .addCase(sendTodos.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to send todos';
      })
      .addCase(sendTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
        state.error = null;
      });
  },
});

const { reducer: todosReducer } = todosSlice;
export default todosReducer;
