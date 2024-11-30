import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const RegisterAgent = () => {
    const [values, setValues] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Réinitialiser les notifications Toast
        toast.dismiss();

        // Vérification des mots de passe
        if (values.password !== values.confirmPassword) {
            toast.error('Les mots de passe ne correspondent pas.', { position: 'top-center' });
            return;
        }

        // Envoi de la requête à l'API
        axios.post(`${apiUrl}/register-agent`, values)
            .then(res => {
                
                if (res.data.Status === 'Success') {
                    toast.success(res.data.Message || 'Inscription réussie !', { position: 'top-center' });
                    setValues({ fullName: '', phone: '', password: '', confirmPassword: '' });

                    setTimeout(() => {
                        navigate('/login-agent');
                    }, 3000);
                    
                } else {
                    toast.error(res.data.Error || 'Une erreur est survenue.', { position: 'top-center' });
                }
            })
            .catch(err => {
                console.error(err); 
                toast.error(err.response?.data?.Error || 'Erreur lors de l’inscription. Veuillez réessayer.', { position: 'top-center' });
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
                    Agent Immobilier - Inscription
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="full-name">
                            Nom et Prenoms
                        </label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <AiOutlineUser className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                id="full-name"
                                name="fullName"
                                value={values.fullName}
                                onChange={e => setValues({ ...values, fullName: e.target.value })}
                                className="w-full focus:outline-none"
                                placeholder="Nom et Prenoms"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <AiOutlineMail className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={e => setValues({ ...values, email: e.target.value })}
                                className="w-full focus:outline-none"
                                placeholder="Email"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                            Numéro de téléphone
                        </label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <AiOutlinePhone className="text-gray-400 mr-2" />
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={values.phone}
                                onChange={e => setValues({ ...values, phone: e.target.value })}
                                className="w-full focus:outline-none"
                                placeholder="Entrez votre numéro de téléphone"
                                pattern="[0-9]{10}"
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
                                onChange={e => setValues({ ...values, password: e.target.value })}
                                className="w-full focus:outline-none"
                                placeholder="Entrez votre mot de passe"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                            Confirmer le mot de passe
                        </label>
                        <div className="flex items-center border rounded-md px-3 py-2">
                            <AiOutlineLock className="text-gray-400 mr-2" />
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={e => setValues({ ...values, confirmPassword: e.target.value })}
                                className="w-full focus:outline-none"
                                placeholder="Confirmer votre mot de passe"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-md font-bold hover:bg-orange-600 transition"
                    >
                        S’inscrire
                    </button>
                </form>

                {/* Link to Login if no account */}
                <div className="text-center mt-4">
                    <p className="text-sm">
                        Vous avez déjà un compte ?{' '}
                        <a
                            href="/login-agent"
                            className="text-orange-500 hover:underline"
                        >
                            Connectez-vous
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterAgent;
