import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../store/actions'
import GoogleMap from 'google-map-react';
import './MapView2.css';

//React Stateless Component ("dumb component")
const TownMarker = ({name}) => {
    return (
        <div className="town">
            {name}
        </div>
    )
};

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
        const {properties: {type, name}, geometry: {coordinates: [lat, lng]}} = feature;
        if (type !== 'town') {
            return '';
        }

        return <TownMarker name={name} lat={lat} lng={lng}/>
    }

    componentWillReceiveProps({geoJson}) {
        if (this.map) {
            this.map.data.addGeoJson(geoJson);
        }
    }

    render() {
        const {center, geoJson: {features}, zoom} = this.props;
        return (
            <div className="map">
                <GoogleMap
                    defaultCenter={this.defaultCenter}
                    center={center}
                    defaultZoom={this.defaultZoom}
                    zoom={zoom}
                    onChange={this.onChange}
                    onGoogleApiLoaded={this.onGoogleApiLoaded}
                    yesIWantToUseGoogleMapApiInternals/>
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
