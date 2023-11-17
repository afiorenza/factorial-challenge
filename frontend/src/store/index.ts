import { combineReducers, configureStore } from '@reduxjs/toolkit';
import metricsReducer from '@/store/reducers/metrics';
import typesReducer from '@/store/reducers/types';

const rootReducer = combineReducers({
  metrics: metricsReducer,
  types: typesReducer
});

export const setupStore = (preloadedState = {}) => configureStore({
  reducer: rootReducer,
  preloadedState
});

const store = setupStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
