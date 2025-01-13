import React from 'react';
import { FaTrashAlt, FaEye } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const PropertyCard = ({ image, title, description, price, state, propertyId, onDelete }) => {
    const navigate = useNavigate();
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${apiUrl}/property/suprimer_propriete.php?id=${propertyId}`, { withCredentials: true });

            // Vérifier si la réponse du serveur est réussie
            if (response.status === 200) {
                toast.success(response.data.message);
                onDelete(propertyId); // Mettre à jour l'état parent
            } else {
                toast.error('Erreur lors de la suppression de la propriété.');
            }
        } catch (error) {
            console.error(error); // Debug pour voir l'erreur exacte
            toast.error(error.response?.data?.message || 'Erreur lors de la suppression de la propriété.');
        }
    };

    const handleEdit = () => {
        navigate(`/edit_property/${propertyId}`);
    };

    const handleDetails = () => {
        navigate(`/details_property/${propertyId}`);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
            <button
                className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                onClick={handleDelete}
            >
                <FaTrashAlt size={20} />
            </button>
            <button onClick={handleDetails} className="absolute top-2 right-2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600">
                
                <FaEye size={20} />
            </button>

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
                     onClick={handleEdit} 
                     className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 w-full">
                        Modifier
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
