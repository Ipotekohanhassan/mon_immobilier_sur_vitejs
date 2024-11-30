import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Assurez-vous que le CSS de Leaflet est importé

const MapComponent = ({ latitude, longitude }) => {


    if (!latitude || !longitude) {
        return <p>Coordonnées manquantes</p>;
    }

    const position = [latitude, longitude];

    return (
        <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    Localisation : {latitude}, {longitude}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;
