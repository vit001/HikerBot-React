import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../store/actions'

import GoogleMap from 'react-google-maps';
import Marker from 'react-google-maps';

import './MapView2.css';

class MapView extends Component {
    constructor(props) {
        super(props);
        this.defaultCenter = props.center;
        this.defaultZoom = props.zoom;
        this.onChange = this.onChange.bind(this);
        this.onGoogleApiLoaded = this.onGoogleApiLoaded.bind(this);
        this.renderFeature = this.renderFeature.bind(this);
    }

    onChange({bounds, center, zoom}) {
        const {actions: {setBounds}} = this.props;
        setBounds(bounds, center, zoom);
    }

    onGoogleApiLoaded({map}) {
        this.map = map;
        map.setOptions({
            disableDefaultUI: true
        });
    }

    renderFeature(feature) {
        const {properties: {id, type, name}, geometry: {coordinates: [lat, lng]}} = feature;
        if ( type==='town' ) {
            return <InfoWindow key={id} lat={lat} lng={lng} content={name}/>
        }
        else
        if ( type==='point' ) {
            return <Marker key={id} lat={lat} lng={lng} draggable={false} icon="http://api.hikerbot.com/mdpi/accommodation_alpinehut_small.png"/>
        }
        else {
            return '';
        }
    }

    //disable auto-loading of geoJson
    // componentWillReceiveProps({geoJson}) {
    //     if (this.map) {
    //         this.map.data.addGeoJson(geoJson);
    //     }
    // }

    render() {
        const {center, geoJson: {features}, zoom} = this.props;
        return (
            <div className="map">
                <GoogleMap
                    defaultCenter={this.defaultCenter}
                    center={center}
                    defaultZoom={this.defaultZoom}
                    zoom={zoom}

                    containerElement={
                        <div style={{ height: `100%` }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                    onMapLoad={_.noop}
                    onMapClick={_.noop}
                    markers={markers}
                    onMarkerRightClick={_.noop}
                />,

                {features.map(this.renderFeature)}
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
