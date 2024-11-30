import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from './PropertyCard';

const PropertiesList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:8081/properties', { withCredentials: true });
                setProperties(response.data.properties);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || 'Erreur lors de la récupération des propriétés.');
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const handleDelete = (propertyId) => {
        setProperties((prevProperties) => prevProperties.filter((property) => property.id !== propertyId));
    };

    return (
        <div className="p-6 space-y-4">
            <header className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800">Mes Propriétés</h2>
            </header>

            {loading && <p>Chargement...</p>}
            {/* {error && <p className='text-center text-gray-400'>{error}</p>} */}

            {!loading && properties.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                    {properties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            propertyId={property.id}
                            image={`http://localhost:8081/${property.mainImage}`} // Assurez-vous que l'URL est correcte
                            title={property.title}
                            description={property.description}
                            price={property.price}
                            state={property.status}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {!loading && properties.length === 0 && <p className='text-center text-gray-400'>Aucune propriété disponible.</p>}
        </div>
    );
};

export default PropertiesList;
