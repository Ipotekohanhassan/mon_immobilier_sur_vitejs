import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
import L from 'leaflet';

const InteractiveMap = () => {
    const navigate =useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fonction pour récupérer les propriétés depuis le backend
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`${apiUrl}/all_property.php`);
                const formattedProperties = response.data.properties.map((property) => {
                    // Convertir latitude et longitude en nombres
                    const lat = parseFloat(property.latitude);
                    const lng = parseFloat(property.longitude);
                    return { ...property, latitude: lat, longitude: lng };
                });
                setProperties(formattedProperties);
            } catch (err) {
                setError("Erreur lors du chargement des propriétés.");
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    

    // Affichage pendant le chargement
    if (loading) {
        return <div className="p-8 text-center">Chargement de la carte...</div>;
    }

    // Affichage en cas d'erreur
    if (error) {
        return <div className="p-8 text-center text-red-500">{error}</div>;
    }
    const customIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', // URL vers l'icône par défaut de Leaflet
        iconSize: [25, 41], // Taille de l'icône
        iconAnchor: [12, 41], // Point d'ancrage de l'icône
        popupAnchor: [1, -34], // Point d'ancrage pour la popup
    });

    return (
        <MapContainer
            center={properties.length > 0 ? [properties[0].latitude, properties[0].longitude] : [51.505, -0.09]} // Coordonnées initiales
            zoom={13}
            scrollWheelZoom={false}
            className="rounded-lg shadow-md h-96 z-0"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {properties.map((property) => {
                const handleDetails = () => {
                    navigate(`/propriete_detail/` + property.id);
                };
                return (
                    <Marker key={property.id} position={[property.latitude, property.longitude]} icon={customIcon}>
                        <Popup closeButton={false} className="max-w-xs">
                            <div className="p-4 bg-white rounded-lg shadow-lg w-72">
                                <strong className="text-xl text-gray-800">{property.title}</strong>
                                <img
                                    src={`${apiUrl}/property/${property.mainImage}`}
                                    alt={property.title}
                                    className="w-full h-40 object-cover rounded-md mt-3"
                                />
                               
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        onClick={handleDetails}
                                        className="text-sm text-blue-500 hover:underline"
                                    >
                                        Voir Details
                                    </button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default InteractiveMap;
