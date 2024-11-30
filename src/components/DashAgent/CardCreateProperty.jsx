import React from "react";
import { Link } from "react-router-dom";

const CardCreateProperty = () => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0">
                <h2 className="text-lg font-bold text-gray-800">Créer une propriété</h2>
                <p className="text-gray-600">Ajoutez une nouvelle propriété en quelques clics.</p>
            </div>
            <Link to='/add_property' className="text-center w-full md:w-auto px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
                Ajouter
            </Link>
        </div>
    );
};

export default CardCreateProperty;
