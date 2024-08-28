"use client";

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/app/redux/slice/counter';
import accountReducer from '@/app/redux/slice/account';
import profileReducer from '@/app/redux/slice/profile';
import modalChampionReducer from '@/app/redux/slice/modalChampion';

import championReducer from '@/app/redux/slice/champion';
import spellReducer from '@/app/redux/slice/spell';
import itemReducer from '@/app/redux/slice/item';

export const store = configureStore({
    reducer: {
        //counter: counterReducer,
        account: accountReducer,
        profile: profileReducer,
        modalChampion: modalChampionReducer,
        
        champion: championReducer,
        spell: spellReducer,
        item: itemReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})

export default store