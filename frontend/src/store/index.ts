import { configureStore } from '@reduxjs/toolkit';
import metricsReducer from '@/store/reducers/metrics';
import typesReducer from '@/store/reducers/types';

const store = configureStore({
  reducer: {
    metrics: metricsReducer,
    types: typesReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
