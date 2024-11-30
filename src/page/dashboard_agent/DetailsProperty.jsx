import React, { useState, useEffect } from "react";
import Navbar from "../../components/DashAgent/Navbar";
import Sidebar from "../../components/DashAgent/Sidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";
import MapComponent from "../../components/DashAgent/MapComponent";
const apiUrl = import.meta.env.VITE_API_URL;


const DetailsProperty = () => {
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
    const [categoryName, setCategoryName] = useState(""); // Nouvelle variable d'état pour la catégorie
    const [isImageModalOpen, setIsImageModalOpen] = useState(false); // Pour ouvrir/fermer la modal de l'image
    const [selectedImage, setSelectedImage] = useState(""); // Image sélectionnée
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const res = await axios.get(`${apiUrl}`);
                if (res.data.Status === "Success") {
                    setId(res.data.id);
                } else {
                    navigate("/login-agent");
                }
            } catch (error) {
                console.error("Erreur lors de la vérification de l'authentification", error);
                navigate("/login-agent");
            }
        };

        verifyAuth();
    }, [navigate]);

    useEffect(() => {
        axios
            .get(`${apiUrl}/property/${propertyId}`, { withCredentials: true })
            .then((response) => {
                setPropertyDetails({
                    ...response.data.property,
                    mainImage: response.data.property.mainImage || "",
                    otherImages: response.data.property.otherImages || [],
                });

                // Récupérer les informations de la catégorie en fonction de category_id
                axios
                    .get(`${apiUrl}/category/${response.data.property.category_id}`)
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
            <div className="flex-1 flex flex-col">
                <Navbar toggleSidebar={toggleSidebar} />
                <main className="p-6 space-y-8 flex-1 overflow-y-auto bg-white shadow-lg rounded-lg">
                    <ToastContainer />
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">Détails de la propriété</h2>

                    <div className="max-w-6xl mx-auto">
                        {/* Section image principale */}
                        <div className="relative mb-6 cursor-pointer" onClick={() => openImageModal(propertyDetails.mainImage)}>
                            <img
                                src={propertyDetails.mainImage ? `${apiUrl}/${propertyDetails.mainImage}` : "https://placehold.co/800x450"}
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
                                                src={`${apiUrl}/${image}`}
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
                    </div>
                </main>
            </div>

            {/* Modal Image Fullscreen */}
            {isImageModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeImageModal}>
                    <div className="relative bg-white p-4 rounded-lg max-w-4xl mx-auto" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={`${apiUrl}/${selectedImage}`}
                            alt="Image en plein écran"
                            className="w-full h-full object-cover" // object-cover pour une taille uniforme
                        />
                        <button
                            className="absolute top-0 right-0 p-2 text-white bg-black bg-opacity-50 rounded-full"
                            onClick={closeImageModal}
                        >
                            <AiOutlineClose/>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailsProperty;
