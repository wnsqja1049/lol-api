"use client";

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
    accountId: '',
    puuid: '',
    profileIconId: 0,
    revisionDate: 0,
    summonerLevel: 0,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        initProfile(state) {
            state = initialState;
            return state;
        },
        setProfile(state, action) {
            state = action.payload;
            return state;
        },
    }
});

export const { initProfile, setProfile } = profileSlice.actions;

export default profileSlice.reducer;