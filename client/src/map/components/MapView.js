import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../store/actions'
import {Gmaps, Marker, Circle, Polygon, Polyline, InfoWindow} from 'react-gmaps'
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

        this.renderPolyline();
    }

    getInitialState() {
        return {
            mapCreated: false,
        };
    }

    onMapCreated(map) {

        this.setState({ map: map, mapCreated: true });

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

    render() {
        const {center: {lat, lng}, zoom, geoJson: {features}} = this.props;
        return (
            <div className="map">
                <Gmaps
                    width={'100%'}
                    height={'100%'}
                    lat={lat}
                    lng={lng}
                    zoom={zoom}
                    loadingMessage={'Loading ...'}
                    params={{v: '3.exp'}}
                    onIdle={this.onIdle}
                    onMapCreated={this.onMapCreated}>

                    {features.map(this.renderFeature)}

                    <Polyline
                        path={[
                            {lat: 25.774, lng: -80.190},
                            {lat: 18.466, lng: -66.118},
                            {lat: 32.321, lng: -64.757}
                        ]}
                        geodesic="true"
                        strokeColor="#FF0000"
                        strokeOpacity="0.5"
                        strokeWeight="4"
                    />

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
