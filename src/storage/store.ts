import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './auth.slice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

const rootReducer = combineReducers({
  auth: authReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export type AppStore = ReturnType<typeof setupStore>;

// import { combineReducers, configureStore } from '@reduxjs/toolkit';

// import authReducer from './auth.slice';

// // Create the root reducer separately so we can extract the RootState type
// const rootReducer = combineReducers({
//   auth: authReducer,
// });

// export const setupStore = (preloadedState?: Partial<RootState>) => {
//   return configureStore({
//     reducer: rootReducer,
//     preloadedState,
//   });
// };

// export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof setupStore>;
// export type AppDispatch = AppStore['dispatch'];
