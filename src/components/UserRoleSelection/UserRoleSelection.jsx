import React from 'react';
import { motion } from 'framer-motion';
import { FaUserTie, FaUsers, FaSearch } from 'react-icons/fa'; 
import { useNavigate } from "react-router-dom";

const UserRoleSelection = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-gradient-to-b from-orange-50 to-orange-100 min-h-screen flex flex-col justify-center items-center">
            {/* En-tête avec animation */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mb-12"
            >
                <h1 className="text-3xl font-bold text-orange-600">Qui êtes-vous ?</h1>
                <p className="text-lg text-gray-700 mt-4">
                    Sélectionnez votre rôle pour commencer :
                </p>
            </motion.div>

            {/* Cartes des rôles */}
            <div className="flex flex-wrap gap-6 justify-center">
                {/* Agent Immobilier */}
                <motion.div
                    whileHover={{ scale: 1.05, translateY: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-6 w-72 bg-white shadow-lg rounded-lg hover:shadow-2xl transition"
                >
                    <div className="absolute -top-10 bg-orange-400 p-3 rounded-full">
                        <FaUserTie className="text-white w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-semibold text-orange-500 mt-4 mb-4">Agent Immobilier</h2>
                    <p className="text-gray-600 mb-4">
                        Gérez vos propriétés et trouvez des clients intéressés.
                    </p>
                    <button 
                        onClick={() => navigate("/dashboard-agent")}
                        className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-4 py-2 rounded-md hover:from-orange-600 hover:to-orange-500">
                        Continuer
                    </button>
                </motion.div>

                {/* Assistant */}
                <motion.div
                    whileHover={{ scale: 1.05, translateY: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-6 w-72 bg-white shadow-lg rounded-lg hover:shadow-2xl transition"
                >
                    <div className="absolute -top-10 bg-orange-400 p-3 rounded-full">
                        <FaUsers className="text-white w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-semibold text-orange-500 mt-4 mb-4">Assistant</h2>
                    <p className="text-gray-600 mb-4">
                        Collaborez avec nous pour gérer des propriétés et clients.
                    </p>
                    <button
                        onClick={() => navigate("/dashboard_assistant")} 
                        className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-4 py-2 rounded-md hover:from-orange-600 hover:to-orange-500">
                        Continuer
                    </button>
                </motion.div>

                {/* Chercheur de Propriétés */}
                <motion.div
                    whileHover={{ scale: 1.05, translateY: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-6 w-72 bg-white shadow-lg rounded-lg hover:shadow-2xl transition"
                >
                    <div className="absolute -top-10 bg-orange-400 p-3 rounded-full">
                        <FaSearch className="text-white w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-semibold text-orange-500 mt-4 mb-4">Chercheur de Propriétés</h2>
                    <p className="text-gray-600 mb-4">
                        Trouvez des propriétés à louer ou à acheter facilement.
                    </p>
                    <button className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-4 py-2 rounded-md hover:from-orange-600 hover:to-orange-500">
                        Télécharger l'application
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default UserRoleSelection;
