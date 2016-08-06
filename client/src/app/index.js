import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/store';
import Root from './components/Root';

const store = configureStore();

class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

export default Index;
