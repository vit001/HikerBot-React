import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchFeatures } from '../Actions/ActionCreators'
import { withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";

const HIKERBOT_API_HOST = "http://api.hikerbot.com";
const HIKERBOT_ICON_PATH = `${HIKERBOT_API_HOST}/mdpi`;

const renderPoint = (point) => {
    const { id, description, iconFileName, coordinates: [lat, lng] } = point;
    return <Marker key={id} position={{lat: lat, lng: lng}} title={description} icon={`${HIKERBOT_ICON_PATH}/${iconFileName}.png`}  />
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

const renderFeatures = (features) => {
  return features && features.map && features.map((feature) => {
    switch(feature.type) {
      case "point":
        return renderPoint(feature);
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
    defaultZoom={6}
    defaultCenter={{ lat: 37.8, lng: -120 }}
  >
  { renderFeatures(props.features) }
  </GoogleMap>
));

class Map extends Component {
  
  componentDidMount() {
      const { dispatch } = this.props
      dispatch(fetchFeatures())
  }

  render() {
    const { items, isFetching } = this.props;
    return <div><div>{isFetching && "LOADING..."}</div><HampGoogleMap
      containerElement={
        <div style={{ height: `100vh` }} />
      }
      mapElement={
        <div style={{ height: `100vh` }} />
      }
      features={items}
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
