import React from 'react';
import { Provider } from 'react-redux';
import store from './Redux/Store/store';
import Router from './Routes/index'

export default function App() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
}