import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineUser, AiOutlineLock, AiOutlineHome, AiOutlinePhone } from 'react-icons/ai';

const AuthAssistant = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="bg-gradient-to-b from-teal-100 to-teal-300 min-h-screen flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <h1 className="text-2xl font-bold text-teal-600 text-center mb-6">
                    {isLogin ? 'Se connecter' : 'S\'inscrire'}
                </h1>
                <form>
                    {/* Si l'utilisateur est en mode inscription, ajouter nom et prenom */}
                    {!isLogin && (
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="full-name">
                                Nom et Prenoms
                            </label>
                            <div className="flex items-center border rounded-md px-3 py-2">
                                <AiOutlineUser className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    id="full-name"
                                    className="w-full focus:outline-none"
                                    placeholder="Nom et Prenoms"
                                />
                            </div>
                        </div>
                    )}
                    
                    {/* Champ Numéro de téléphone */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                            Numéro de téléphone
                        </label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <AiOutlinePhone className="text-gray-400 mr-2" />
                            <input
                                type="tel"
                                id="phone"
                                className="w-full focus:outline-none"
                                placeholder="Entrez votre numéro de téléphone"
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
                                required
                            />
                        </div>
                    </div>

                    {/* Si l'utilisateur est en mode inscription, ajouter les champs nécessaires */}
                    {!isLogin && (
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                                Confirmer le mot de passe
                            </label>
                            <div className="flex items-center border rounded-md px-3 py-2">
                                <AiOutlineLock className="text-gray-400 mr-2" />
                                <input
                                    type="password"
                                    id="confirm-password"
                                    className="w-full focus:outline-none"
                                    placeholder="Confirmer votre mot de passe"
                                />
                            </div>
                        </div>
                    )}

                    {/* Bouton soumettre */}
                    <button
                        type="submit"
                        className="w-full bg-teal-500 text-white py-2 rounded-md font-bold hover:bg-teal-600 transition"
                    >
                        {isLogin ? 'Se connecter' : 'S\'inscrire'}
                    </button>
                </form>

                {/* Lien pour basculer entre connexion et inscription */}
                <div className="mt-4 text-center">
                    <button
                        onClick={toggleForm}
                        className="text-teal-600 hover:underline"
                    >
                        {isLogin ? 'Pas encore inscrit ? S\'inscrire' : 'Déjà inscrit ? Se connecter'}
                    </button>
                </div>

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
        </div>
    );
};

export default AuthAssistant;
