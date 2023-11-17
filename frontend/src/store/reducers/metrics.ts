import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import service from '@/services';

import type { RootState } from '@/store';

export enum MetricAttributes {
  name = 'name',
  timestamp = 'timestamp',
  value = 'value'
}

export enum FilterAttributes {
  from = 'from',
  name = 'name',
  to = 'to'
}

export interface IFilter {
  [FilterAttributes.from]: string;
  [FilterAttributes.name]: string;
  [FilterAttributes.to]: string;
}

export interface Metric { 
  id: number;
  name:  string;
  timestamp: string;
  value: number;
}

export interface Stats {
  minutes?: number;
  hours?: number;
  days?: number;
}

export interface MetricState {
  adding: boolean;
  error: string;
  loading: boolean;
  metrics: Metric[];
  stats: Stats;
}

const initialState: MetricState = {
  adding: false,
  error: '',
  loading: false,
  metrics: [],
  stats: {}
}

export const addMetric = createAsyncThunk<undefined, Metric, { rejectValue: string }>('metrics/add', async(payload, { rejectWithValue }) => {
  try {
    await service.post('/metric', { ...payload });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;

      return rejectWithValue(axiosError.code as string);
    }
    throw rejectWithValue('UNKNOWN_ERROR');
  }
})

export const fetchMetrics = createAsyncThunk
  <{ metrics: Metric[], stats: Stats  }, IFilter, { rejectValue: string }>
  ('metrics/fetch', async (payload, { rejectWithValue }) => {
  try {
    const response = await service.get('/metrics', { params: payload });

    return {
      metrics: response.data.data.metrics,
      stats: response.data.data.stats
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;

      return rejectWithValue(axiosError.code as string);
    }
    throw rejectWithValue('UNKNOWN_ERROR');
  }
})

export const MetricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMetrics.pending, (state) => {
      state.error = '';
      state.loading = true;
    });
    
    builder.addCase(fetchMetrics.fulfilled, (state, { payload }) => {
      state.error = '';
      state.loading = false;
      state.metrics = payload.metrics;
      state.stats = payload.stats;
    });
    
    builder.addCase(fetchMetrics.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });

    builder.addCase(addMetric.pending, (state) => {
      state.adding = true;
      state.error = '';
    });
    
    builder.addCase(addMetric.fulfilled, (state, { payload }) => {
      state.adding = false;
      state.error = '';
    });
    
    builder.addCase(addMetric.rejected, (state, { payload }) => {
      state.adding = false;
      state.error = payload as string;
    });
  }
})

export const selectAddingMetrics = (state: RootState) => state.metrics.adding;
export const selectLoadingMetrics = (state: RootState) => state.metrics.loading;
export const selectMetrics = (state: RootState) => {
  return state.metrics.metrics.map(({ timestamp, value }) => {
    return {
      x: new Date(timestamp).getTime(),
      y: value
    }
  })
};
export const selectStats = (state: RootState) => state.metrics.stats;

export default MetricsSlice.reducer;
