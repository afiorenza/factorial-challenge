import { configureStore } from '@reduxjs/toolkit';
import metricsReducer from '@/store/reducers/metrics';

const store = configureStore({
  reducer: {
    metrics: metricsReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
