"use client";

import { createSlice } from '@reduxjs/toolkit';

import { Champion } from "@/types";

const initialState = {
    championMap: new Map<string, Champion>(),
};

export const championSlice = createSlice({
    name: 'championMap',
    initialState: initialState,
    reducers: {
        setChampionMapState(state, action) {
            state.championMap = action.payload;
            return state;
        },
    }
});



export const { setChampionMapState } = championSlice.actions;

export const championMapSelector = ((state: {championMap: Map<string, Champion>}) => state.championMap);

export default championSlice.reducer;