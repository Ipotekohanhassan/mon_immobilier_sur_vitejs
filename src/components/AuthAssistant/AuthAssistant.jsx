import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AiOutlineUser, AiOutlineLock, AiOutlineHome } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const AuthAssistant = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${apiUrl}/assistant/secureLogin.php`,
                {
                    identifiant: username,
                    password: password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            

            if (response.data.status === 'success') {
                // Afficher le toast de succès
                toast.success('Connexion réussie !');
                // Redirection vers le tableau de bord après 1 seconde
                setTimeout(() => {
                    navigate('/dashboard_assistant');
                }, 1000);
            } else {
                setErrorMessage('Identifiant ou mot de passe incorrect');
                // Afficher le toast d'erreur
                toast.error('Identifiant ou mot de passe incorrect');
            }
        } catch (error) {
            setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
            // Afficher le toast d'erreur
            toast.error('Une erreur est survenue. Veuillez réessayer.');
            console.error(error);
        }
    };

    return (
        <div className="bg-gradient-to-b from-teal-100 to-teal-300 min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <h1 className="text-2xl font-bold text-teal-600 text-center mb-6">Se connecter</h1>


                <form onSubmit={handleLogin}>
                    {/* Champ Identifiant */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Identifiant
                        </label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <AiOutlineUser className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                id="username"
                                className="w-full focus:outline-none"
                                placeholder="Entrez votre identifiant"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Champ Mot de passe */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Mot de passe
                        </label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <AiOutlineLock className="text-gray-400 mr-2" />
                            <input
                                type="password"
                                id="password"
                                className="w-full focus:outline-none"
                                placeholder="Entrez votre mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Bouton se connecter */}
                    <button
                        type="submit"
                        className="w-full bg-teal-500 text-white py-2 rounded-md font-bold hover:bg-teal-600 transition"
                    >
                        Se connecter
                    </button>
                </form>

                {/* Bouton Retour à l'accueil */}
                <div className="mt-4 text-center">
                    <button
                        className="flex items-center text-teal-600 hover:underline"
                        onClick={() => window.location.href = '/'}
                    >
                        <AiOutlineHome className="mr-2" />
                        Retour à l'accueil
                    </button>
                </div>
            </motion.div>

            {/* Le ToastContainer pour afficher les messages */}
            <ToastContainer />
        </div>
    );
};

export default AuthAssistant;
