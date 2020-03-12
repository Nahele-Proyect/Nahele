//React imports
import React, { Component } from 'react'
//Google maps imports
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'

const mapStyles = {
    width: '100%',
    height: '100%'
}

export class MapContainer extends Component {
    constructor() {
        super()
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        }
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    render() {
        console.log(this.props)
        return (
            <Map google={this.props.google} zoom={15} style={mapStyles} initialCenter={{ lat: 40.392611, lng: -3.698222 }} >
                <Marker onClick={this.onMarkerClick} name={"Fluffy's Shelter"} />
                <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose}>
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>


        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAP_API
})(MapContainer)