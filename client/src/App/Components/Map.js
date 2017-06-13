/* global google */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchFeatures } from '../Actions/ActionCreators'
import { withGoogleMap, GoogleMap, Marker, Polyline, InfoWindow } from "react-google-maps";

const HIKERBOT_API_HOST = "http://api.hikerbot.com";
const HIKERBOT_ICON_PATH = `${HIKERBOT_API_HOST}/mdpi`;
const EXTEND_BOUNDS_FROM_ZOOM = 7;

const getExtendedBounds = (map) => {
  const bounds = map.getBounds();
  const projection = map.getProjection();
  // get current bounds in points
  const topRight = projection.fromLatLngToPoint(new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng()));
  const bottomLeft = projection.fromLatLngToPoint(new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng()));
  // get current map size in points
  const mapHeight = Math.abs(topRight.y - bottomLeft.y);
  const mapWidth = Math.abs(bottomLeft.x - topRight.x);
  console.log(`Extending bounds: add ${mapWidth} points to x and ${mapHeight} points to y`);
  // calculate new bounds
  const newTopRightX = topRight.x + mapWidth;
  const newTopRightY = topRight.y - mapHeight;
  const newBottomLeftX = bottomLeft.x - mapWidth;
  const newBottomLeftY = bottomLeft.y + mapHeight;
  // return new bounds object
  return new google.maps.LatLngBounds(projection.fromPointToLatLng({x: newBottomLeftX, y: newBottomLeftY}),
    projection.fromPointToLatLng({x: newTopRightX, y: newTopRightY}));
}

const renderPoint = (point, currentBounds, currentZoom, onMarkerClick) => {
    const { id, showFromZoom, showToZoom, description, iconFileName, coordinates: [lat, lng] } = point;
    return currentBounds.contains({lat: lat, lng: lng}) && currentZoom >= showFromZoom && currentZoom <= showToZoom ?
      <Marker 
        key={id} 
        position={{lat: lat, lng: lng}} 
        title={description} 
        icon={`${HIKERBOT_ICON_PATH}/${iconFileName}.png`}
        onClick={() => onMarkerClick(id, {lat: lat, lng: lng})}
        />
      : null;
}

const renderLine = (line, currentBounds, currentZoom) => {
    const { id, color, points } = line;
    return <Polyline
        key={id}
        path={points.map && points
          .filter((point) => currentBounds.contains({lat: point[0].lat, lng: point[0].lng}) && currentZoom >= point[0].showFromZoom )
          .map(c => {
            return { lat: c[0].lat, lng: c[0].lng }
            })}
        options={{
          geodesic: true,
          strokeColor: color,
          strokeOpacity: 0.5,
          strokeWeight: 4,
        }}
    />
}

const renderFeatures = (features, currentBounds, currentZoom, onMarkerClick) => {
  return features && features.map && features.map((feature) => {
    switch(feature.type) {
      case "point":
        return renderPoint(feature, currentBounds, currentZoom, onMarkerClick);
      case "line":
        return renderLine(feature, currentBounds, currentZoom);
      default:
        return null;
    }
  })
}

const HampGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    options={{
      clickableIcons: false,
    }}
    onIdle={props.onMapIdle}
    onLoad={props.onMapLoad}
    defaultZoom={5}
    defaultCenter={{ lat: 40.69, lng: -121.23 }} // @todo: calculate center by used area bounds
  >
  { 
    renderFeatures(props.features, props.currentBounds, props.currentZoom, props.onDetailOpen)
  }

  {
    props.activeDetail && <InfoWindow onCloseClick={props.onDetailClose} position={{ lat: props.activeDetail.position.lat, lng: props.activeDetail.position.lng }}><div>test {props.activeDetail.id}</div></InfoWindow>
  }
  </GoogleMap>
));

class Map extends Component {
  _map;

  constructor(props) {
    super(props);
    this.state = {
      currentZoom: null,
      currentBounds: null,
      activeDetail: null
   };
  }

  openDetail = (id, position) => {
    console.log(`Opening detail: ${id} at ${position}`);
    this.setState((state) => Object.assign({}, state, {
      activeDetail: {
          id,
          position,
        },
      }))
  }

  closeDetail = () => {
    console.log(`Closing detail: ${this.state.activeDetail.id}`);
    this.setState((state) => Object.assign({}, state, {
      activeDetail: null,
    }))
  }

  updateMap = () => {
    const { dispatch } = this.props;
    const zoom = this._map.getZoom();
    const bounds = zoom >= EXTEND_BOUNDS_FROM_ZOOM ? getExtendedBounds(this._map) : this._map.getBounds();
    dispatch(fetchFeatures(bounds, zoom));
    console.log(`Setting bounds to ${bounds} and zoom to ${zoom}`);
    console.log(`Setting center to ${this._map.getCenter()}`);
    this.setState((state) => Object.assign({}, state, {
      currentZoom: zoom,
      currentBounds: bounds,
    }));
  }

  render() {
    const { items } = this.props;          
    return <HampGoogleMap
      containerElement={
        <div style={{ height: "100vh" }} />
      }
      mapElement={
        <div style={{ height: "100vh" }} />
      }
      features={items}
      onMapIdle={ ()=> { this.updateMap() } }
      onMapLoad={ (map)=> { this._map = map } }
      currentZoom={this.state.currentZoom}
      currentBounds={this.state.currentBounds}
      activeDetail={this.state.activeDetail}
      onDetailOpen={this.openDetail}
      onDetailClose={this.closeDetail}
    />
  }
}

const mapStateToProps = (state) => {
    const { features: {items, isFetching} } = state;
    return {
        items: items && Object.keys(items).map(id => items[id]),
        isFetching,
    }
}

export default connect(
  mapStateToProps,
)(Map)
