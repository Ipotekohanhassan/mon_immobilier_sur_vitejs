import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Assurez-vous que le CSS de Leaflet est importé
import L from 'leaflet';

const MapComponent = ({ latitude, longitude }) => {


    if (!latitude || !longitude) {
        return <p>Coordonnées manquantes</p>;
    }

    const position = [latitude, longitude];

    const customIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', // URL vers l'icône par défaut de Leaflet
        iconSize: [25, 41], // Taille de l'icône
        iconAnchor: [12, 41], // Point d'ancrage de l'icône
        popupAnchor: [1, -34], // Point d'ancrage pour la popup
    });

    return (
        <MapContainer center={position} zoom={13} style={{zIndex:0, height: "300px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={customIcon}>
                <Popup>
                    Localisation : {latitude}, {longitude}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;
