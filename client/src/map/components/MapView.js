import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../store/actions'
import './MapView.css';
import {Gmaps, Marker} from 'react-gmaps';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.onMapCreated = this.onMapCreated.bind(this);
    this.getCurrentPositionClick = this.getCurrentPositionClick.bind(this);
    this.getPoints = this.getPoints.bind(this);
  }

  onMapCreated(map) {
    this.map = map;
    map.setOptions({
      disableDefaultUI: true
    });
  }

  getCurrentPositionClick() {
    const {actions: {getCurrentPosition}} = this.props;
    getCurrentPosition();
  }

  getPoints() {
    const {actions: {getPoints}} = this.props;
    getPoints();
  }

  componentWillReceiveProps({geoJson}) {
    if (geoJson) {
      this.map.data.addGeoJson(geoJson);
    }
  }

  componentWillUpdate(newProps, newState) {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    const {coords: {lat, lng} = {lat: 0, lng: 0}} = this.props;
    return (
      <div className="map">
        <button onClick={this.getCurrentPositionClick}>Get Current Position</button>
        <button onClick={this.getPoints}>Get Points</button>
        <Gmaps
          width={'800px'}
          height={'600px'}
          lat={lat}
          lng={lng}
          zoom={2}
          loadingMessage={'Be happy'}
          params={{v: '3.exp'}}
          onMapCreated={this.onMapCreated}>
          <Marker lat={lat} lng={lng}/>
        </Gmaps>
      </div>
    );
  }
}

export default connect(({map}) => {
    return {
      coords: map.coords,
      geoJson: map.geoJson
    };
  },
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  }))(MapView);
