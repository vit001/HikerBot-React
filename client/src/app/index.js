import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import configureStore from './store/store';

import Root from './components/Root';

const store = configureStore();

class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
        {/*<Root />*/}
      </Provider>
    );
  }
}

export default Index;
