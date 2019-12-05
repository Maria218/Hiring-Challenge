import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './Redux/Store/store';
import Router from './Routes/index'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}
