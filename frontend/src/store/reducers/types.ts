import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import service from '@/services';

export interface TypeState {
  error: string
  loading: boolean
  types: string[] | []
}

const initialState: TypeState = {
  error: '',
  loading: false,
  types: []
}

export const fetchTypes = createAsyncThunk
  <string[], undefined, { rejectValue: string }>
  ('types/fetch', async (payload, { rejectWithValue }) => {
  try {
    const response = await service.get('/types');

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;

      return rejectWithValue(axiosError.code as string);
    }
    throw rejectWithValue('UNKNOWN_ERROR');
  }
})

export const TypesSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTypes.pending, (state) => {
      state.error = '';
      state.loading = true;
    });
    
    builder.addCase(fetchTypes.fulfilled, (state, { payload }) => {
      state.error = '';
      state.loading = false;
      state.types = payload;
    });
    
    builder.addCase(fetchTypes.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });
  }
})

export default TypesSlice.reducer;
