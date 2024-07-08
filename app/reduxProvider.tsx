"use client";

import * as React from "react";

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { store } from './lib/redux/store'

export interface ProvidersProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
