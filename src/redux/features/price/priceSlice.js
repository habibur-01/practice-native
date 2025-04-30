import { createSelector, createSlice } from '@reduxjs/toolkit';
const priceSlice = createSlice({
    name: 'price',
    initialState: {
        marketWatch: {},
        currentPrice: {},
    },
    reducers: {
        setMarketWatch: (state, action) => {
            state.marketWatch = action.payload;
        },
        addMarketWatch: (state, action) => {
            state.marketWatch[action.payload.symbol] = action.payload;
        },
        setInitialCurrentPrice: (state, action) => {
            state.currentPrice = action.payload;
        },
        setCurrentPrice: (state, action) => {
            state.currentPrice[action.payload.currency] = action.payload.data;
        },
        resetCurrentPrice: state => {
            state.currentPrice = {};
        },
    },
});

export const { setMarketWatch, addMarketWatch, setInitialCurrentPrice, setCurrentPrice, resetCurrentPrice } = priceSlice.actions;
export default priceSlice.reducer;

// Selector for the current price
export const selectSymbolPrice = symbol =>
    createSelector(
        [state => state.price.marketWatch],
        marketWatch => marketWatch[symbol],
);