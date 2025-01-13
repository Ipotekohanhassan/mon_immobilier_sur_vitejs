import axios from 'axios';
import React, { useState } from 'react';
import { AiOutlineLock, AiOutlinePhone } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../assets/logo.png';
const apiUrl = import.meta.env.VITE_API_URL;

const LoginAgent = () => {
    const [values, setValues] = useState({
        identifier: '',
        password: ''
    });

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();

        // Réinitialiser les notifications Toast
        toast.dismiss();

        // Envoi de la requête à l'API
        axios.post(`${apiUrl}/login.php`, values, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (res.data.Status === 'Success') {
                    toast.success(res.data.Message || 'Connexion réussie !', { position: 'top-center' });

                    // Réinitialisation des champs de formulaire
                    setValues({ identifier: '', password: '' });

                    // Redirection vers le tableau de bord après 1 seconde
                    setTimeout(() => {
                        navigate('/dashboard-agent');
                    }, 1000);
                } else {
                    toast.error(res.data.Error || 'Une erreur est survenue.', { position: 'top-center' });
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response?.data?.Error || 'Erreur lors de la connexion. Veuillez réessayer.', { position: 'top-center' });
            });
    };

    return (
        <div className="bg-gradient-to-b from-orange-100 to-orange-300 min-h-screen flex items-center justify-center">
            {/* Container pour les notifications Toast */}
            <ToastContainer />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-6">
                    <img src={Logo} alt="Logo de l'entreprise" className="mx-auto h-32 mb-6" />
                </div>
                <h1 className="text-2xl font-bold text-orange-600 text-center mb-6">
                    Agent Immobilier - Connexion
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="identifier">
                            Numéro de téléphone ou Email
                        </label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <AiOutlinePhone className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                id="identifier"
                                name="identifier"
                                value={values.identifier}
                                onChange={(e) => setValues({ ...values, identifier: e.target.value })}
                                className="w-full focus:outline-none"
                                placeholder="Numéro de téléphone ou Email"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Mot de passe
                        </label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <AiOutlineLock className="text-gray-400 mr-2" />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={values.password}
                                onChange={(e) => setValues({ ...values, password: e.target.value })}
                                className="w-full focus:outline-none"
                                placeholder="Entrez votre mot de passe"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-md font-bold hover:bg-orange-600 transition"
                    >
                        Se connecter
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-700">
                        Vous n'avez pas encore de compte ?{' '}
                        <Link to="/register-agent" className="text-orange-600 font-bold hover:underline">
                            Inscrivez-vous
                        </Link>
                    </p>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-gray-700">
                        <Link to="/reset-password" className="text-orange-600 font-bold hover:underline">
                            Mot de passe oublié ?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginAgent;
