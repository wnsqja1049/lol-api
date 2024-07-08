"use client";

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    puuid: '',
    gameName: '',
    tagLine: '',
}

export const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        initAccount(state) {
            state = initialState;
            return state;
        },
        setAccount(state, action) {
            state = action.payload;
            return state;
        },
    }
});

export const { initAccount, setAccount } = accountSlice.actions;

export default accountSlice.reducer;