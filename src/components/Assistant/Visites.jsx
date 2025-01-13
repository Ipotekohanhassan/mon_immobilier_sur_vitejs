import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
import { FaEnvelope, FaPhone, FaSms } from "react-icons/fa";

const Visites = ({ refreshData }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);

    const handleContactClick = (agent) => {
        setSelectedAgent(agent);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedAgent(null);
    };
    const navigate = useNavigate();
    const [visites, setVisites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Récupérer les visites depuis le backend
    useEffect(() => {
        const fetchVisites = async () => {
            try {
                const response = await axios.get(`${apiUrl}/assistant/rendezvous.php`);
                // Vérifie si la réponse contient directement un tableau
                if (Array.isArray(response.data)) {
                    setVisites(response.data);
                } else {
                    // Sinon, utilise la structure avec 'rendezvous'
                    setVisites(response.data.rendezvous || []);
                }
            } catch (err) {
                setError("Erreur lors du chargement des visites.");
            } finally {
                setLoading(false);
            }
        };

        fetchVisites();
    }, []);

    // Mettre à jour le statut d'une visite
    const confirmer = async (id, status) => {
        try {
            await axios.post(`${apiUrl}/assistant/modifier_rdv.php?confirmer=${id}`);
            setVisites((prev) =>
                prev.map((visite) =>
                    visite.id === id ? { ...visite, statut: status } : visite
                )
            );
            refreshData();
        } catch (err) {
            setError("Erreur lors de la mise à jour du statut.");
        }
    };

    const annuler = async (id, status) => {
        try {
            await axios.post(`${apiUrl}/assistant/modifier_rdv.php?annuler=${id}`);
            setVisites((prev) =>
                prev.map((visite) =>
                    visite.id === id ? { ...visite, statut: status } : visite
                )
            );
            refreshData();
        } catch (err) {
            setError("Erreur lors de la mise à jour du statut.");
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Chargement des visites...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">{error}</div>;
    }
    if (visites.length === 0) {
        return <div className="p-8 text-center text-gray-600">Aucun rendez-vous trouvé.</div>;
    }

    

    return (
        <div className="p-8 bg-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {visites.map((visite) => (
                    
                    <div
                        key={visite.id}
                        className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow transform hover:scale-105"
                    >
                        <div className="relative">
                            <div
                                className={`absolute top-2 right-2 px-4 py-2 text-xs font-semibold text-white rounded-full ${visite.statut === "confirmé"
                                    ? "bg-green-500"
                                    : visite.statut === "en attente"
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                    }`}
                            >
                                {visite.statut}
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 mt-4">
                            {visite.nom_propriete || "Propriété inconnue"}
                        </h3>

                        <p className="text-gray-600 mt-2">
                            <strong>Date:</strong> {visite.date_rendez_vous}
                        </p>
                        <p className="text-gray-600 mt-2">
                            <strong>Agent:</strong> {visite.nom_agent || "Agent inconnu"}
                        </p>
                        <p className="text-gray-600 mt-2">
                            <strong>Client:</strong> {visite.nom_client || "client inconnu"}
                        </p>
                        <p className="text-gray-600 mt-2">
                            <strong>Tel client:</strong> {visite.telephone_client || "numero inconnu"}
                        </p>
                        <p className="text-gray-600 mt-2 mb-4">
                            <strong>Lieu:</strong> {visite.lieu || "Lieu inconnu"}
                        </p>

                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => navigate(`/propriete_detail/${visite.id_propriete}`)}
                                className="text-blue-600 font-medium hover:text-blue-800 transition duration-300"
                            >
                                Détails
                            </button>
                            <div className="flex space-x-2">
                                {visite.statut == "en attente" && (
                                    <button
                                        className="bg-green-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                                        onClick={() => confirmer(visite.id, "confirmé")}
                                    >
                                        Confirmer
                                    </button>
                                )}
                                {visite.statut == "en attente" && (
                                    <button
                                        className="bg-red-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                        onClick={() => annuler(visite.id, "annulé")}
                                    >
                                        Annuler
                                    </button>
                                )}
                                {visite.statut === "confirmé" && (
                                    <button
                                        className="text-blue-600 font-medium hover:text-blue-800 transition duration-300"
                                        onClick={() =>
                                            handleContactClick({
                                                email: visite.email_agent, // L'email de l'agent
                                                telephone: visite.phone_agent, // Le numéro de l'agent
                                            })
                                        }
                                    >
                                        Contacter l'agent
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                )) }
            </div>
            {/* Modal */}
            {showModal && selectedAgent && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-96">
                        <h2 className="text-xl font-bold mb-4">Contacter l'agent</h2>
                        <div className="flex flex-col space-y-4">
                            <button
                                onClick={() =>
                                    (window.location.href = `mailto:${selectedAgent.email}`)
                                }
                                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                <FaEnvelope className="mr-2" /> Envoyer un Email
                            </button>
                            <button
                                onClick={() =>
                                    (window.location.href = `tel:${selectedAgent.telephone}`)
                                }
                                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                <FaPhone className="mr-2" /> Passer un Appel
                            </button>
                            <button
                                onClick={() =>
                                    (window.location.href = `sms:${selectedAgent.telephone}`)
                                }
                                className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
                            >
                                <FaSms className="mr-2" /> Envoyer un SMS
                            </button>
                        </div>
                        <button
                            onClick={closeModal}
                            className="mt-6 text-gray-600 hover:text-gray-800 transition duration-300"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Visites;
