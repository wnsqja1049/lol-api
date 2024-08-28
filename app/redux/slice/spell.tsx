"use client";

import { createSlice } from '@reduxjs/toolkit';

import { Spell } from "@/types";

const initialState = {
    spellMap: new Map<string, Spell>(),
};

export const spellSlice = createSlice({
    name: 'spellMap',
    initialState: initialState,
    reducers: {
        setSpellMapState(state, action) {
            state.spellMap = action.payload;
            return state;
        },
    }
});



export const { setSpellMapState } = spellSlice.actions;

export const spellMapSelector = ((state: {spellMap: Map<string, Spell>}) => state.spellMap);

export default spellSlice.reducer;