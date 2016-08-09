import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../store/actions'
import {Gmaps} from 'react-gmaps';
import './MapView.css';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.onBoundsChanged = this.onBoundsChanged.bind(this);
    this.onMapCreated = this.onMapCreated.bind(this);
  }

  onBoundsChanged() {
    const {actions: {setBounds}} = this.props;
    const bounds = this.map.getBounds().toJSON();
    const center = this.map.getCenter().toJSON();
    const zoom = this.map.getZoom();
    setBounds(bounds, center, zoom);
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
    const {center: {lat, lng}, zoom} = this.props;
    return (
      <div className="map">
        <Gmaps
          width={'800px'}
          height={'600px'}
          lat={lat}
          lng={lng}
          zoom={zoom}
          loadingMessage={'Be happy'}
          params={{v: '3.exp'}}
          onBoundsChanged={this.onBoundsChanged}
          onMapCreated={this.onMapCreated}>
        </Gmaps>
      </div>
    );
  }
}

export default connect(
  ({map: {center, geoJson, zoom}}) => ({center, geoJson, zoom}),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)
(MapView);
