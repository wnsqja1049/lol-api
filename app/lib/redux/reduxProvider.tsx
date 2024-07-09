"use client";

import * as React from "react";

import { Provider } from 'react-redux';
import { store } from './store'

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
