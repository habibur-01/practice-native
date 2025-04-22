import {configureStore} from '@reduxjs/toolkit';
import chartReducer from './features/chart/chartSlice';
const reducers = {
  //   price: priceReducer,
  //   symbol: symbolReducer,
  chart: chartReducer,

  //   indicator: indicatorReducer,
};

export const store = configureStore({
  reducer: reducers,
});
