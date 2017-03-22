import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../store/actions'
import {Gmaps, InfoWindow} from 'react-gmaps';
import './MapView.css';

class MapView extends Component {
    constructor(props) {
        super(props);
        this.onIdle = this.onIdle.bind(this);
        this.onMapCreated = this.onMapCreated.bind(this);
    }

    onIdle() {
        const {actions: {setBounds}} = this.props;
        const bounds = this.map.getBounds().toJSON();
        const center = this.map.getCenter().toJSON();
        const zoom = this.map.getZoom();
        setBounds(bounds, center, zoom);
    }

    onMapCreated(map) {
        this.map = map;
        map.setOptions({
            disableDefaultUI: true,
            panControl:true,
            zoomControl:true,
            mapTypeControl:true,
            scaleControl:true,
            streetViewControl:true,
            overviewMapControl:true,
            rotateControl:true
        });
    }

    //disable auto-loading of geoJson
    // componentWillReceiveProps({geoJson}) {
    //     this.map.data.addGeoJson(geoJson);
    // }

    renderFeature(feature) {
        const {properties: {id, type, name}, geometry: {coordinates: [lng, lat]}} = feature;
        if (type !== 'town') {
            return '';
        }

        return <InfoWindow key={id} lat={lat} lng={lng} content={name}/>
    }

    //,
    render() {
        const {center: {lat, lng}, zoom, geoJson: {features}} = this.props;
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
                    onIdle={this.onIdle}
                    onMapCreated={this.onMapCreated}>
                    {features.map(this.renderFeature)}
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
