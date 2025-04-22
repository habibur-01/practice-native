import {createSlice} from '@reduxjs/toolkit';

const chartSlice = createSlice({
  name: 'chart',
  initialState: {
    chart: null,
    loading: true,
    currency: 'EURUSD',
  },
  reducers: {
    setChart: (state, action) => {
      state.chart = action.payload;
    },
    setChartLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const {setChart, setChartLoading, setCurrency} = chartSlice.actions;
export default chartSlice.reducer;
