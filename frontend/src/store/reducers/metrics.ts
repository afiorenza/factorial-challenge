import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import service from '@/services';

export interface Metric { 
  timestamp: Date
  name:  string
  value: string
}

export interface MetricState {
  error: string
  loading: boolean
  metrics: Metric[] | []
}

const initialState: MetricState = {
  error: '',
  loading: false,
  metrics: []
}

export const fetchMetrics = createAsyncThunk
  <Metric[], undefined, { rejectValue: string }>
  ('metrics/fetch', async (payload, { rejectWithValue }) => {
  try {
    const response = await service.get('version');
  
    return response.data;
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
      state.metrics = payload;
    });
    
    builder.addCase(fetchMetrics.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
  }
})

export default MetricsSlice.reducer;
