import {configureStore} from '@reduxjs/toolkit';
import chartReducer from './features/chart/chartSlice';
import priceReducer from './features/price/priceSlice';

const reducers = {
  //   price: priceReducer,
  //   symbol: symbolReducer,
  chart: chartReducer,
  price: priceReducer,
  //   indicator: indicatorReducer,
};

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
