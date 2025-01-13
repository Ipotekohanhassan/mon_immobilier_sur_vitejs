import React from 'react';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const CardProperty = ({ image, title, description, price, state, propertyId }) => {
    const navigate = useNavigate();


    const handleDetails = () => {
        navigate(`/propriete_detail/${propertyId}`);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden relative">

            <img src={image} alt={title} className="w-full h-48 object-cover" />

            <div className="p-4 space-y-2">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>

                <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm font-semibold bg-gray-100 py-1 px-2 rounded-md">
                        {state === 'À louer' ? 'À louer' : 'À vendre'}
                    </span>
                    <span className="text-orange-500 font-bold">
                        {state === 'À louer' ? `${price} FCFA / mois` : `${price} FCFA`}
                    </span>
                </div>

                <div className="mt-2">
                    <button
                        onClick={handleDetails}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 w-full">
                        Détails
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardProperty;
