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
      const updatedTodos = state.todos.filter(
        item => item.id !== action.payload,
      );
      state.todos = updatedTodos;
    },
    toggleTodo: (state, action) => {
     state.todos = state.todos.map(todo =>
       todo.id === action.payload.id
         ? { ...todo, completed: !todo.completed }
         : todo,
     );
    },
  },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
