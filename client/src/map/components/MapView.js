import React, {Component} from 'react';
import {connect} from 'react-redux'
import './MapView.css';
import {Gmaps, Marker} from 'react-gmaps';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.onMapCreated = this.onMapCreated.bind(this);
  }

  onMapCreated(map) {
    this.map = map;
    map.setOptions({
      disableDefaultUI: true
    });
  }

  componentWillReceiveProps({geoJson}) {
    this.map.data.addGeoJson(geoJson);
  }

  render() {
    const {coords: {lat, lng} = {lat: 0, lng: 0}} = this.props;
    return (
      <div className="map">
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

export default connect(({map: {coords, geoJson}}) => {
  return {coords, geoJson};
})(MapView);
