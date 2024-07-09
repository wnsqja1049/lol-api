"use client";

import { ChampionDetail } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
    key: 0,
    name: '',
    title: '',
    lore: '',
	stats: {
		hp: 0,
		hpperlevel: 0,
		mp: 0,
		mpperlevel: 0,  
		movespeed: 0,
		armor: 0,
		armorperlevel: 0,
		spellblock: 0,
		spellblockperlevel: 0,
		attackrange: 0,
		hpregen: 0,
		hpregenperlevel: 0,
		mpregen: 0,
		mpregenperlevel: 0,
		crit: 0,
		critperlevel: 0,
		attackdamage: 0,
		attackdamageperlevel: 0,
		attackspeedperlevel: 0,
		attackspeed: 0,
	},
	passive: {
		name: '',
		description: '',
		image: {
			full: '',
		}
	},
	spells: [],
	skins: [],
}

export const modalChampionSlice = createSlice({
    name: 'modalChampion',
    initialState: initialState,
    reducers: {
        initModalChampion(state) {
            state = initialState;
            return state;
        },
        setModalChampion(state, action) {
            state = action.payload;
            return state;
        },
    }
});

export const { initModalChampion, setModalChampion } = modalChampionSlice.actions;

export const modalChampionSelector = ((state: {modalChampion: ChampionDetail}) => state.modalChampion);

export default modalChampionSlice.reducer;