"use client";

import { createSlice } from '@reduxjs/toolkit';

import { Item } from "@/types";

const initialState = {
    itemMap: new Map<string, Item>(),
    aramItemMap: new Map<string, Item>(),
    arenaItemMap: new Map<string, Item>(),
};

export const itemSlice = createSlice({
    name: 'itemMap',
    initialState: initialState,
    reducers: {
        setItemMapState(state, action) {
            state.itemMap = action.payload;
            return state;
        },
        setAramItemMapState(state, action) {
            state.aramItemMap = action.payload;
            return state;
        },
        setArenaItemMapState(state, action) {
            state.arenaItemMap = action.payload;
            return state;
        },
    }
});



export const { setItemMapState, setAramItemMapState, setArenaItemMapState } = itemSlice.actions;

export const itemMapSelector = ((state: {itemMap: Map<string, Item>}) => state.itemMap);
export const aramItemMapSelector = ((state: {aramItemMap: Map<string, Item>}) => state.aramItemMap);
export const arenaItemMapSelector = ((state: {arenaItemMap: Map<string, Item>}) => state.arenaItemMap);

export default itemSlice.reducer;