import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardProperty from './CardProperty';
const apiUrl = import.meta.env.VITE_API_URL;

const ListProperty = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`${apiUrl}/all_property.php`, { withCredentials: true });
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


    return (
        <div className="p-6 space-y-4">


            {loading && <p>Chargement...</p>}
            {/* {error && <p className='text-center text-gray-400'>{error}</p>} */}

            {!loading && properties.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                    {properties.map((property) => (
                        <CardProperty
                            key={property.id}
                            propertyId={property.id}
                            image={`${apiUrl}/property/${property.mainImage}`} // Assurez-vous que l'URL est correcte
                            title={property.title}
                            description={property.description}
                            price={property.price}
                            state={property.status}
                        />
                    ))}
                </div>
            )}

            {!loading && properties.length === 0 && <p className='text-center text-gray-400'>Aucune propriété disponible.</p>}
        </div>
    );
};

export default ListProperty;
