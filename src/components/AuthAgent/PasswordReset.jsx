import { useState } from "react";
import axios from "axios";
import Loading from '../../assets/loading.gif';
const apiUrl = import.meta.env.VITE_API_URL;

const PasswordReset = () => {
    const [step, setStep] = useState(1); // Étape 1 : Envoi OTP, Étape 2 : Réinitialisation
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // État pour le chargement
    const [showLoginButton, setShowLoginButton] = useState(false); // État pour le bouton "Se connecter"

    // Gestion de l'envoi OTP
    const sendOtp = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true); // Activer le chargement
        try {
            const response = await axios.post(`${apiUrl}/forgot-password`, { email });
            setMessage(response.data.Message);
            setStep(2); // Passer à l'étape de réinitialisation
        } catch (err) {
            setError(err.response?.data.Error || "Une erreur s'est produite.");
        } finally {
            setLoading(false); // Désactiver le chargement
        }
    };

    // Gestion de la réinitialisation du mot de passe
    const resetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true); // Activer le chargement
        try {
            const response = await axios.post(`${apiUrl}/reset-password`, { email, otp, newPassword });
            setMessage(response.data.Message);
            setShowLoginButton(true); // Afficher le bouton "Se connecter"
        } catch (err) {
            setError(err.response?.data.Error || "Une erreur s'est produite.");
        } finally {
            setLoading(false); // Désactiver le chargement
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-orange mb-6 text-center">
                    Réinitialisation du mot de passe
                </h2>
                {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</div>}
                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

                {loading ? (
                    // Affichage du GIF de chargement
                    <div className="flex justify-center">
                        <img
                            src={Loading} // Lien vers un GIF de chargement
                            alt="Chargement..."
                            className="w-16 h-16"
                        />
                    </div>
                ) : step === 1 ? (
                    <form onSubmit={sendOtp}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-orange"
                                placeholder="Entrez votre email"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
                        >
                            Envoyer OTP
                        </button>
                    </form>
                ) : showLoginButton ? (
                    // Affichage du bouton "Se connecter maintenant"
                    <div className="text-center">
                        <button
                            onClick={() => (window.location.href = "/login-agent")} // Rediriger vers la page de connexion
                            className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
                        >
                            Se connecter maintenant
                        </button>
                    </div>
                ) : (
                    <form onSubmit={resetPassword}>
                        <div className="mb-4">
                            <label htmlFor="otp" className="block text-gray-700 font-medium">
                                Code OTP
                            </label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-orange"
                                placeholder="Entrez votre OTP"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-gray-700 font-medium">
                                Nouveau mot de passe
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-orange"
                                placeholder="Entrez le nouveau mot de passe"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
                        >
                            Réinitialiser le mot de passe
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default PasswordReset;
