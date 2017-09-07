/* global google */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchFeatures } from '../Actions/ActionCreators'
import { withGoogleMap, GoogleMap, Marker, Polyline, InfoWindow } from "react-google-maps";
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';

//import SearchBox from "react-google-maps/lib/places/SearchBox";

const HIKERBOT_API_HOST = "http://api.hikerbot.com";
const HIKERBOT_ICON_PATH = `${HIKERBOT_API_HOST}/mdpi`;
const HIKERBOT_TOWN_ICON_PATH = `${HIKERBOT_API_HOST}/gen_town_marker.php`;
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
  return new google.maps.LatLngBounds(projection.fromPointToLatLng({ x: newBottomLeftX, y: newBottomLeftY }),
    projection.fromPointToLatLng({ x: newTopRightX, y: newTopRightY }));
}

const renderPoint = (point, currentBounds, currentZoom, onMarkerClick) => {
  const { id, markerType, showFromZoom, showToZoom, name, description, iconFileName, coordinates: [lat, lng] } = point;
  return currentBounds.contains({ lat: lat, lng: lng }) && currentZoom >= showFromZoom && currentZoom <= showToZoom ?
    <Marker
      key={id}
      position={{ lat: lat, lng: lng }}
      title={description}
      icon={markerType === 3 ? `${HIKERBOT_TOWN_ICON_PATH}?name=${name}` : `${HIKERBOT_ICON_PATH}/${iconFileName}.png`}
      onClick={() => onMarkerClick(id, { lat: lat, lng: lng })}
    />
    : null;
}

const renderLine = (line, currentBounds, currentZoom) => {
  const { id, color, points } = line;
  return <Polyline
    key={id}
    path={points.map && points
      .filter((point) => currentBounds.contains({ lat: point[0].lat, lng: point[0].lng }) && currentZoom >= point[0].showFromZoom)
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
    switch (feature.type) {
      case "point":
        return renderPoint(feature, currentBounds, currentZoom, onMarkerClick);
      case "line":
        return renderLine(feature, currentBounds, currentZoom);
      default:
        return null;
    }
  })
}

// Normalizes the coords that tiles repeat across the x axis (horizontally)
// like the standard Google map tiles.
function getNormalizedCoord(coord, zoom) {
  var y = coord.y;
  var x = coord.x;

  // tile range in one direction range is dependent on zoom level
  // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
  var tileRange = 1 << zoom;

  // don't repeat across y-axis (vertically)
  if (y < 0 || y >= tileRange) {
    return null;
  }

  // repeat across x-axis
  if (x < 0 || x >= tileRange) {
    x = (x % tileRange + tileRange) % tileRange;
  }

  return { x: x, y: y };
}

var customMapType = new google.maps.ImageMapType({
  getTileUrl: function (coord, zoom) {
    var normalizedCoord = getNormalizedCoord(coord, zoom);
    if (!normalizedCoord) {
      return null;
    }
    var bound = Math.pow(2, zoom);
    if (zoom >= 13) {
      return '//hikerbottiles.s3-website-us-west-1.amazonaws.com/24kFSUSGSTopo' +
        '/' + zoom + '/' + normalizedCoord.x + '/' +
        (bound - normalizedCoord.y - 1) + '.png';
    }
    else {
      return '//maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i' + zoom + '!2i' + normalizedCoord.x + '!3i' + (bound - normalizedCoord.y - 1) + '!4i256!2m3!1e0!2sm!3i371050319!3m14!2sen-US!3sUS!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjM3fHMuZTpsLml8cC52Om9mZixzLnQ6MzN8cC52Om9mZixzLnQ6MzR8cy5lOmwuaXxwLnY6b2ZmLHMudDozNnxzLmU6bC5pfHAudjpvZmYscy50OjM4fHMuZTpsLml8cC52Om9mZixzLnQ6MzV8cy5lOmwuaXxwLnY6b2ZmLHMudDozOXxwLnY6b2Zm!4e0!5m1!5f2';
    }
  },
  tileSize: new google.maps.Size(512, 512),
  maxZoom: 15,
  minZoom: 0,
  radius: 1738000,
  name: 'Custom'
});

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
      props.activeDetail && <Dialog title="Detail..." modal={false} open={true} onRequestClose={props.onDetailClose}>Detail ID: {props.activeDetail.id}</Dialog>

      /*<InfoWindow onCloseClick={props.onDetailClose} position={{ lat: props.activeDetail.position.lat, lng: props.activeDetail.position.lng }}><div>test {props.activeDetail.id}</div></InfoWindow>*/
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
    return <div>
      <AppBar title="Hikerbot" iconClassNameRight="muidocs-icon-navigation-expand-more" />
      <HampGoogleMap
        containerElement={
          <div style={{ height: "100vh" }} />
        }
        mapElement={
          <div style={{ height: "100vh" }} />
        }
        features={items}
        onMapIdle={() => { this.updateMap() }}
        onMapLoad={(map) => {
          this._map = map;
          //this._map.mapTypes.set( 'custom', customMapType );
          //map.setMapTypeId( 'satellite' );
        }}
        currentZoom={this.state.currentZoom}
        currentBounds={this.state.currentBounds}
        activeDetail={this.state.activeDetail}
        onDetailOpen={this.openDetail}
        onDetailClose={this.closeDetail}
      />
    </div>
  }
}

const mapStateToProps = (state) => {
  const { features: { items, isFetching } } = state;
  return {
    items: items && Object.keys(items).map(id => items[id]),
    isFetching,
  }
}

export default connect(
  mapStateToProps,
)(Map)
