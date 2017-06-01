import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchFeatures } from '../Actions/ActionCreators'
import { withGoogleMap, GoogleMap, Marker, Polyline, InfoWindow } from "react-google-maps";
import { loader } from "./loader.css"

const HIKERBOT_API_HOST = "http://api.hikerbot.com";
const HIKERBOT_ICON_PATH = `${HIKERBOT_API_HOST}/mdpi`;

const renderPoint = (point, currentZoom, onMarkerClick) => {
    const { id, showFromZoom, showToZoom, description, iconFileName, coordinates: [lat, lng] } = point;
    return currentZoom >= showFromZoom && currentZoom <= showToZoom ?
      <Marker 
        key={id} 
        position={{lat: lat, lng: lng}} 
        title={description} 
        icon={`${HIKERBOT_ICON_PATH}/${iconFileName}.png`}
        onClick={() => onMarkerClick(id, {lat: lat, lng: lng})}
        />
      : null;
}

const renderLine = (line) => {
    const { id, color, coordinates } = line;
    return <Polyline
        key={id}
        path={coordinates.map && coordinates.map(c => {return { lat: c[0], lng: c[1] }})}
        options={{
          geodesic: true,
          strokeColor: color,
          strokeOpacity: 0.5,
          strokeWeight: 4,
        }}
    />
}

const renderFeatures = (features, currentZoom, onMarkerClick) => {
  return features && features.map && features.map((feature) => {
    switch(feature.type) {
      case "point":
        return renderPoint(feature, currentZoom, onMarkerClick);
      case "line":
        return renderLine(feature);
      default:
        return null;
    }
  })
}

const HampGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    onIdle={props.onMapIdle}
    onLoad={props.onMapLoad}
    defaultZoom={6}
    defaultCenter={{ lat: 38.3534, lng: -120.2197 }} // @todo: calculate center by used area bounds
  >
  { 
    renderFeatures(props.features, props.currentZoom, props.onDetailOpen)
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
      currentZoom: 6,
      activeDetail: null
   };
  }

  componentDidMount() {
      const { dispatch } = this.props
      dispatch(fetchFeatures())
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

  setZoom = () => {
    const zoom = this._map.getZoom();
    console.log(`Setting zoom to: ${zoom}`);
    this.setState((state) => Object.assign({}, state, {
      currentZoom: zoom,
    }))
  }

  render() {
    const { items, isFetching } = this.props;          
    return <div style={{ height: "100vh", position: "relative"}}>
      { 
        isFetching && 
        <div style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", fontSize: "40px", zIndex: 1}}>
          <div className="loader" />
        </div>
      }
    <HampGoogleMap
      containerElement={
        <div style={{ height: "100vh" }} />
      }
      mapElement={
        <div style={{ height: "100vh" }} />
      }
      features={items}
      onMapIdle={ ()=> { this.setZoom() } }
      onMapLoad={ (map)=> { this._map = map } }
      currentZoom={this.state.currentZoom}
      activeDetail={this.state.activeDetail}
      onDetailOpen={this.openDetail}
      onDetailClose={this.closeDetail}
    />
    </div>
  }
}

const mapStateToProps = (state) => {
    const { features } = state;
    return {
        items: features.items,
        isFetching: features.isFetching,
    }
}

export default connect(
  mapStateToProps,
)(Map)
