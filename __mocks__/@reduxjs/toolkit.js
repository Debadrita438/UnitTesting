// Mock implementation of @reduxjs/toolkit for Jest

const actualToolkit = jest.requireActual('@reduxjs/toolkit');

// Use the real configureStore instead of mocking it
module.exports = {
  ...actualToolkit,
  configureStore: actualToolkit.configureStore,
  createSlice: actualToolkit.createSlice,
  createAsyncThunk: actualToolkit.createAsyncThunk,
  combineReducers: actualToolkit.combineReducers,
};
