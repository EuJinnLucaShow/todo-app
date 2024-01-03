import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://todo-nbbt.onrender.com/';

export const fetchTodos = createAsyncThunk(
  'todos/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/todos');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (todo, thunkAPI) => {
    try {
      const response = await axios.post('/todos', todo);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (_id, thunkAPI) => {
    try {
      const response = await axios.delete(`/todos/${_id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const editTodo = createAsyncThunk(
  'todos/editTodo',
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(`/todos/${data._id}`, {
        title: data.title,
        completed: data.completed,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const sendTodos = createAsyncThunk(
  'todos/sendTodos',
  async (todosArray, thunkAPI) => {
    try {
      const response = await axios.post('/save-todos', todosArray);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
