import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/Root';
import MapView from '../map/components/MapView';
import MapView2 from '../map/components/MapView2';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MapView}/>
    <Route path="map2" component={MapView2}/>
  </Route>
);
