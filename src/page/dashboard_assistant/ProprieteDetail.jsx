import React, { useState, useEffect } from "react";
import Sidebar from '../../components/Assistant/Sidebar';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";
import MapComponent from "../../components/DashAgent/MapComponent";
import { FaBars, FaEnvelope, FaPhone, FaSms } from "react-icons/fa";
const apiUrl = import.meta.env.VITE_API_URL;


const ProprieteDetail = () => {
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
    const { propertyId } = useParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [id, setId] = useState("");
    const [propertyDetails, setPropertyDetails] = useState({
        title: "",
        category_id: "",
        status: "",
        description: "",
        price: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        garage: "",
        state: "",
        latitude: "",
        longitude: "",
        mainImage: "",
        otherImages: [],
    });
    const [agentDetails, setAgentDetails] = useState({
        name: "",
        email: "",
        phone: "",

    });
    const [categoryName, setCategoryName] = useState(""); // Nouvelle variable d'état pour la catégorie
    const [isImageModalOpen, setIsImageModalOpen] = useState(false); // Pour ouvrir/fermer la modal de l'image
    const [selectedImage, setSelectedImage] = useState(""); // Image sélectionnée
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const res = await axios.get(`${apiUrl}/assistant/verifyAssistant.php`);
                if (res.data.status === "success") {
                    setId(res.data.id);
                } else {
                    navigate('/auth-assistant'); // Redirection si non authentifié
                }
            } catch (error) {
                console.error('Erreur lors de la vérification de l\'authentification', error);
                navigate('/auth-assistant'); // Redirection si erreur
            }
        };

        verifyAuth();
    }, [navigate]);

    useEffect(() => {
        axios
            .get(`${apiUrl}/assistant/details_property.php/${propertyId}`, { withCredentials: true })
            .then((response) => {

                setPropertyDetails({
                    ...response.data.Property.Details,
                    mainImage: response.data.Property.Details.mainImage || "",
                    otherImages: response.data.Property.Details.otherImages || [],
                });
                
                setAgentDetails({
                    name: response.data.Property.Agent.Nom,
                    email: response.data.Property.Agent.Email,
                    phone: response.data.Property.Agent.Telephone
                });
                

                // Récupérer les informations de la catégorie en fonction de category_id
                axios
                    .get(`${apiUrl}/category/getCategoryById.php?id=${response.data.Property.Details.category_id}`)
                    .then((categoryResponse) => {
                        setCategoryName(categoryResponse.data.name);
                    })
                    .catch((error) => {
                        console.error("Erreur lors de la récupération de la catégorie :", error);
                        toast.error("Impossible de charger la catégorie.");
                    });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération de la propriété:", error);
                toast.error("Impossible de charger les détails de la propriété.");
            });
    }, [propertyId]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const openImageModal = (image) => {
        setSelectedImage(image);
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setSelectedImage("");
    };


    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div
                className="flex-1 p-6 md:ml-50 transition-all duration-300 overflow-y-auto"
                style={{ height: "100vh" }}
            >
                {/* Toggle Sidebar Button */}
                <button
                    onClick={toggleSidebar}
                    className="mb-6 md:hidden bg-primary text-white p-2 rounded-lg shadow-md"
                >
                    <FaBars />
                </button>
                <main className="p-6 space-y-8 flex-1 overflow-y-auto bg-white shadow-lg rounded-lg">
                    <ToastContainer />
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Détails de la propriété</h2>

                    <div className="max-w-6xl mx-auto">
                        {/* Section image principale */}
                        <div className="relative mb-6 cursor-pointer" onClick={() => openImageModal(propertyDetails.mainImage)}>
                            <img
                                src={propertyDetails.mainImage ? `${apiUrl}/property/${propertyDetails.mainImage}` : "https://placehold.co/800x450"}
                                alt={propertyDetails.title || "Image de la propriété"}
                                className="w-full h-auto rounded-lg object-contain shadow-lg"
                            />
                        </div>

                        {/* Images secondaires - Thumbnails */}
                        <div className="mb-6">
                            {propertyDetails.otherImages.length > 0 ? (
                                <div className="grid grid-cols-3 gap-4">
                                    {propertyDetails.otherImages.map((image, index) => (
                                        <div key={index} className="relative w-full h-28 rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transform transition-all" onClick={() => openImageModal(image)}>
                                            <img
                                                src={`${apiUrl}/property/${image}`}
                                                alt={`Image ${index + 1} de la propriété`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center">Aucune autre image disponible.</p>
                            )}
                        </div>

                        {/* Informations générales */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-gray-800">Informations générales</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <p><strong>Titre :</strong> {propertyDetails.title}</p>
                                <p><strong>Description :</strong> {propertyDetails.description}</p>
                                <p><strong>Adresse :</strong> {propertyDetails.address}</p>
                                <p><strong>Prix :</strong> {propertyDetails.price} FCFA</p>
                                <p><strong>Statut :</strong> {propertyDetails.status}</p>
                                <p><strong>Catégorie :</strong> {categoryName || "Chargement..."} </p> {/* Affichage du nom de la catégorie */}
                            </div>
                        </div>

                        {/* Détails supplémentaires */}
                        <div className="space-y-6 mt-6">
                            <h3 className="text-xl font-semibold text-gray-800">Détails supplémentaires</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <p><strong>Chambres :</strong> {propertyDetails.bedrooms}</p>
                                <p><strong>Salles de bain :</strong> {propertyDetails.bathrooms}</p>
                                <p><strong>Garage :</strong> {propertyDetails.garage ? "Oui" : "Non"}</p>
                                <p><strong>Superficie :</strong> {propertyDetails.area} m²</p>
                                <p><strong>État :</strong> {propertyDetails.state}</p>
                            </div>
                        </div>

                        {/* Localisation */}
                        <div className="space-y-6 mt-6">
                            <h3 className="text-xl font-semibold text-gray-800">Localisation</h3>
                            <div className="container mx-auto p-4">
                                <div className="rounded-lg shadow-lg overflow-hidden border border-gray-300">
                                    {/* Affichage de la carte */}
                                    <MapComponent

                                        latitude={propertyDetails.latitude}
                                        longitude={propertyDetails.longitude} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={() =>
                                    handleContactClick({
                                        email: agentDetails.email, // L'email de l'agent
                                        telephone: agentDetails.phone, // Le numéro de l'agent
                                    })
                                }
                                className="px-6 py-3 bg-orange-400 text-white font-semibold rounded-lg shadow-md hover:bg-orange-500 transition duration-200"
                            >
                                Contacter l'Agent
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal Image Fullscreen */}
            {isImageModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeImageModal}>
                    <div className="relative bg-white p-4 rounded-lg max-w-4xl mx-auto" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={`${apiUrl}/property/${selectedImage}`}
                            alt="Image en plein écran"
                            className="w-full h-full object-cover" // object-cover pour une taille uniforme
                        />
                        <button
                            className="absolute top-0 right-0 p-2 text-white bg-black bg-opacity-50 rounded-full"
                            onClick={closeImageModal}
                        >
                            <AiOutlineClose />
                        </button>
                    </div>
                </div>
            )}
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

export default ProprieteDetail;
