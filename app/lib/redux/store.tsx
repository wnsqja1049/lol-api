"use client";

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/app/lib/redux/slice/counter';
import accountReducer from '@/app/lib/redux/slice/account';
import profileReducer from '@/app/lib/redux/slice/profile';
import modalChampionReducer from '@/app/lib/redux/slice/modalChampion';

export const store = configureStore({
    reducer: {
        //counter: counterReducer,
        account: accountReducer,
        profile: profileReducer,
        modalChampion: modalChampionReducer,
    }
})

export default store