import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../store/actions'
import {Gmaps, Marker, Polyline, InfoWindow} from 'react-gmaps'
import './MapView.css';

const params = {v: '3.exp' };
//const params = {v: '3.exp', key: '<My Key Here />'};

class MapView extends Component {
    constructor(props) {
        super(props);

        this.onIdle       = this.onIdle.bind(this);
        this.onMapCreated = this.onMapCreated.bind(this);
    }

    onIdle() {
        console.log(`idle`);

        const {actions: {setBounds}} = this.props;
        const bounds = this.map.getBounds().toJSON();
        const center = this.map.getCenter().toJSON();
        const zoom = this.map.getZoom();
        setBounds(bounds, center, zoom);
    }

    getInitialState() {
        return {
            mapCreated: false,

            infoWindowMarkerOpen: false,
            infoWindowMarkerId: 0, // ID of marker which has an Info Window open
            infoWindowMarkerLat: 0,
            infoWindowMarkerLon: 0
        };
    }

    onMapCreated(map) {
        //this.setState({ map: map, mapCreated: true });

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
    //componentWillReceiveProps({geoJson}) {
    //     this.map.data.addGeoJson(geoJson);
    //}
/*
    openMarkerInfoWindow( id, lat, lng ) {
        let isOpen = this.state.infoWindowMarkerOpen;
        let mid = this.state.markerIDWithOpenInfoWindow;
        if ( ! isOpen  ||  id != mid ) {
            this.setState( {
                infoWindowMarkerOpen: true,
                infoWindowMarkerId:   id, // ID of marker which has an Info Window open
                infoWindowMarkerLat:  lat,
                infoWindowMarkerLon:  lng } );
        }
    }

    closeMarkerInfoWindow( id ) {
        this.setState( {
            infoWindowMarkerOpen: false,
            infoWindowMarkerId:   0,
            infoWindowMarkerLat:  0,
            infoWindowMarkerLon:  0 } );
    }
*/

    // InfoWindows show above a marker when marker is clicked
    renderInfoWindows() {
        //if ( this.state.infoWindowMarkerOpen ) {
        //}
        /*
            return (
                <InfoWindow
                    key={this.state.infoWindowMarkerId}
                    lat={this.state.infoWindowMarkerLat}
                    lng={this.state.infoWindowMarkerLon}
                    onCloseClick={() => this.closeInfoWindow(this.state.infoWindowMarkerId)}
                />
            );
        }
        */
    }

    renderFeature(feature) {
        const {properties: {id, type, name}, geometry: {coordinates: [lat, lng]}} = feature;

        if ( type==='town' ) {
            return <InfoWindow key={id} lat={lat} lng={lng} content={name}/>
        }
        else
        if ( type==='point' ) {
            return <Marker key={id} lat={lat} lng={lng} draggable={false} icon="http://api.hikerbot.com/mdpi/accommodation_alpinehut_small.png" />
        }
        else
        if ( type==='line' ) {

            let clist = feature.geometry.coordinates;
            let pathlist = [];
            for ( let i = 0; i < clist.length; ++i ) {
                let item = {lat: clist[i][0], lng: clist[i][1]};
                pathlist.push( item )
            }

            let color = feature.properties.color;

            return <Polyline
                key={ id }
                path={ pathlist }
                geodesic="true"
                strokeColor={ color }
                strokeOpacity="0.5"
                strokeWeight="4"
            />
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
                    lat={32}
                    lng={-110}
                    zoom={4}
                    loadingMessage={'Loading ...'}
                    params={params}
                    onIdle={this.onIdle}
                    onMapCreated={this.onMapCreated}>

                    { features.map(this.renderFeature) }
                    { this.renderInfoWindows() }

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