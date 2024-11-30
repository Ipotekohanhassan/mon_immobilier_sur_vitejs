import React, { useState, useEffect } from "react";
import Navbar from "../../components/DashAgent/Navbar";
import Sidebar from "../../components/DashAgent/Sidebar";
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const AddProperty = () => {
    const [agentId, setAgentId] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [locationFetched, setLocationFetched] = useState(false);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    //verifier si l'utilisateur est connecte
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const res = await axios.get(`${apiUrl}`);
                if (res.data.Status === "Success") {
                    setAgentId(res.data.id);
                } else {
                    navigate('/login-agent'); // Redirection si non authentifié
                }
            } catch (error) {
                console.error('Erreur lors de la vérification de l\'authentification', error);
                navigate('/login-agent'); // Redirection si erreur
            }
        };

        verifyAuth();
    }, [navigate]); 

    // Récupérer les catégories au chargement du composant avec Axios
    useEffect(() => {
        axios.get(`${apiUrl}/categories`)
            .then(response => {
                setCategories(response.data); // On met à jour les catégories dans l'état
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des catégories:', error);
            });
    }, []);

    // États pour les champs de formulaire et les images
    const [propertyDetails, setPropertyDetails] = useState({
        title: "",
        category: '',
        status: '',
        description: "",
        price: "",
        adress: "",
        bedrooms: "Non concerné",
        bathrooms: "Non concerné",
        area: "Non concerné",
        garage: "Non concerné",
        etat: "",
        latitude: '',
        longitude: '',
        mainImage: null,
        otherImages: [],
        mainImageFile: null,
        otherImagesFile: [],
    });

    const [currentStep, setCurrentStep] = useState(1);

    // Fonction pour afficher/masquer le sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Gestion des changements dans les champs de formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPropertyDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Gestion du changement pour l'image principale
    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPropertyDetails((prevDetails) => ({
                ...prevDetails,
                mainImage: URL.createObjectURL(file),
                mainImageFile: file, // Enregistrez le fichier ici
            }));
        }
    };


    const handleOtherImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setPropertyDetails((prevDetails) => ({
            ...prevDetails,
            otherImages: files.length > 0 ? files.map((file) => URL.createObjectURL(file)) : [],
            otherImagesFiles: files, // Enregistrez également les fichiers dans l'état
        }));
    };

    // Fonction pour aller à l'étape suivante
    const nextStep = () => {
        if (currentStep === 1) {
            if (!propertyDetails.title || !propertyDetails.category || !propertyDetails.status || !propertyDetails.description || !propertyDetails.price || !propertyDetails.adress || !propertyDetails.etat) {
                toast.error("Veuillez remplir tous les champs avant de continuer.");
                return;
            }
        } else if (currentStep === 2) {
            if (!propertyDetails.bedrooms || !propertyDetails.bathrooms || !propertyDetails.area || !propertyDetails.garage) {
                toast.error("Veuillez remplir tous les champs avant de continuer.");
                return;
            }
        } else if (currentStep === 3) {
            if (!propertyDetails.latitude || !propertyDetails.longitude || !propertyDetails.mainImage) {
                toast.error("Veuillez remplir tous les champs avant de continuer.");
                return;
            }
            // Si c'est la dernière étape, afficher les informations dans la console
            console.log("Informations soumises : ", propertyDetails);
        }

        // Si ce n'est pas la dernière étape, passer à l'étape suivante
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    // Fonction pour revenir à l'étape précédente
    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Fonction pour obtenir la localisation
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setPropertyDetails({
                        ...propertyDetails,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    setLocationFetched(true);
                },
                () => {
                    toast.error("Impossible de récupérer la localisation");
                }
            );
        } else {
            toast.error("La géolocalisation n'est pas supportée par ce navigateur.");
        }
    };

    //Fonction pour l'envoie des donnees
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        // Préparez les données à envoyer avec FormData
        const formData = new FormData();
        formData.append('title', propertyDetails.title);
        formData.append('category', propertyDetails.category);
        formData.append('status', propertyDetails.status);
        formData.append('description', propertyDetails.description);
        formData.append('price', propertyDetails.price);
        formData.append('address', propertyDetails.adress);
        formData.append('state', propertyDetails.etat);
        formData.append('bedrooms', propertyDetails.bedrooms);
        formData.append('bathrooms', propertyDetails.bathrooms);
        formData.append('area', propertyDetails.area);
        formData.append('garage', propertyDetails.garage);
        formData.append('latitude', propertyDetails.latitude);
        formData.append('longitude', propertyDetails.longitude);

         // Vérification que les fichiers existent avant d'ajouter dans FormData
        if (propertyDetails.mainImageFile) {
            formData.append('mainImage', propertyDetails.mainImageFile);
        } else {
            console.error("Aucune image principale sélectionnée.");
        }

        if (propertyDetails.otherImagesFiles && propertyDetails.otherImagesFiles.length > 0) {
            propertyDetails.otherImagesFiles.forEach((file) => {
                formData.append('otherImages', file);
            });
        } else {
            console.error("Aucune image supplémentaire sélectionnée.");
        }

        // Afficher le contenu de FormData dans la console
        // for (let [key, value] of formData.entries()) {
        //     // Si la valeur est un fichier, affichez le nom du fichier
        //     if (value instanceof File) {
        //         console.log(`${key}: ${value.name}`);
        //     } else {
        //         console.log(`${key}: ${value}`);
        //     }
        // }

        try {
            const response = await axios.post(`${apiUrl}/ajouter-propriete`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
                withCredentials: true, 
            });

            if (response.status === 200) {
                console.log('Propriété ajoutée avec succès');
                // Afficher un message de succès avec React Toastify
                toast.success(response.data.Message);

                setPropertyDetails({
                    title: "",
                    category: '',
                    status: '',
                    description: "",
                    price: "",
                    adress: "",
                    bedrooms: "Non concerné",
                    bathrooms: "Non concerné",
                    area: "Non concerné",
                    garage: "Non concerné",
                    etat: "",
                    latitude: '',
                    longitude: '',
                    mainImage: null,
                    otherImages: [],
                    mainImageFile: null,
                    otherImagesFile: [],
                })

                setTimeout(() => {
                    navigate('/dashboard-agent')
                }, 2500);
                
            } else {
                console.error('Erreur lors de l\'ajout de la propriété');
                toast.error('Erreur lors de l\'ajout de la propriété');
            }
        } catch (error) {
            console.error('Erreur de communication avec le serveur:', error);
            toast.error('Erreur de communication avec le serveur');
        }
    };



    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-gray-50">
                {/* Navbar */}
                <Navbar toggleSidebar={toggleSidebar} />

                {/* AddProperty Content */}
                <main className="p-6 space-y-6 flex-1 overflow-y-auto">
                    {/* Container pour les notifications Toast */}
                    <ToastContainer />
                    <h2 className="text-2xl font-semibold text-gray-800">Ajouter une Propriété</h2>

                    {/* Form Card */}
                    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                        {currentStep === 1 && (
                            <>
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Titre
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={propertyDetails.title}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Titre de la propriété"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="category"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Catégorie de la propriété
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={propertyDetails.category}
                                        onChange={(e) =>
                                            setPropertyDetails({
                                                ...propertyDetails,
                                                category: e.target.value,
                                            })
                                        }
                                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">Sélectionner une catégorie</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label
                                        htmlFor="status"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Statut de la propriété
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={propertyDetails.status}
                                        onChange={(e) =>
                                            setPropertyDetails({
                                                ...propertyDetails,
                                                status: e.target.value,
                                            })
                                        }
                                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">Sélectionner un statut</option>
                                        <option value="À louer">À louer</option>
                                        <option value="À vendre">À vendre</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={propertyDetails.description}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Description de la propriété"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                        Prix (en FCFA)
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={propertyDetails.price}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Prix"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="adress" className="block text-sm font-medium text-gray-700">
                                        Adresse
                                    </label>
                                    <input
                                        type="text"
                                        id="adress"
                                        name="adress"
                                        value={propertyDetails.adress}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Adresse de la propriété"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="etat" className="block text-sm font-medium text-gray-700">
                                        État de la Propriété
                                    </label>
                                    <input
                                        type="text"
                                        id="etat"
                                        name="etat"
                                        value={propertyDetails.etat}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="État de la Propriété"
                                    />
                                </div>
                            </>
                        )}

                        {currentStep === 2 && (
                            <>
                                <div>
                                    <div className="bg-orange-500 text-white rounded-lg p-6 mb-6 shadow-lg text-center">
                                        <h4 className="text-lg font-semibold">N.B: Modifiez un champ uniquement si il concerne votre propriété</h4>
                                    </div>
                                    <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                                        Nombre de Chambres
                                    </label>
                                    <input
                                        type="text"
                                        id="bedrooms"
                                        name="bedrooms"
                                        value={propertyDetails.bedrooms}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Nombre de chambres"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                                        Nombre de Salles de Bain
                                    </label>
                                    <input
                                        type="text"
                                        id="bathrooms"
                                        name="bathrooms"
                                        value={propertyDetails.bathrooms}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Nombre de salles de bain"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                                        Surface (en m²)
                                    </label>
                                    <input
                                        type="text"
                                        id="area"
                                        name="area"
                                        value={propertyDetails.area}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Surface de la propriété"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="garage" className="block text-sm font-medium text-gray-700">
                                        Nombre de garage
                                    </label>
                                    <input
                                        type="text"
                                        id="garage"
                                        name="garage"
                                        value={propertyDetails.garage}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Nombre de garages"
                                    />
                                </div>

                                
                            </>
                        )}

                        {currentStep === 3 && (
                            <>
                                <div>
                                    <button
                                        type="button"
                                        onClick={getLocation}
                                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                                    >
                                        Obtenir ma localisation
                                    </button>
                                    {locationFetched && (
                                        <div className="mt-4 text-green-600">
                                            <p>
                                                Localisation obtenue : Latitude {propertyDetails.latitude}, Longitude {propertyDetails.longitude}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <label
                                        htmlFor="latitude"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Latitude
                                    </label>
                                    <input
                                        type="text"
                                        id="latitude"
                                        name="latitude"
                                        value={propertyDetails.latitude}
                                        readOnly
                                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                                    />
                                </div>

                                <div className="mt-4">
                                    <label
                                        htmlFor="longitude"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Longitude
                                    </label>
                                    <input
                                        type="text"
                                        id="longitude"
                                        name="longitude"
                                        value={propertyDetails.longitude}
                                        readOnly
                                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700">
                                        Image Principale
                                    </label>
                                    <div className="mt-2 border-2 border-dashed border-gray-300 p-4 rounded-md flex flex-col items-center">
                                        <input
                                            type="file"
                                            id="mainImage"
                                            name="mainImage"
                                            onChange={handleMainImageChange}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <label
                                            htmlFor="mainImage"
                                            className="cursor-pointer text-gray-500 hover:text-orange-500"
                                        >
                                            
                                            cliquez pour télécharger une image
                                        </label>
                                        {propertyDetails.mainImage && (
                                            <img
                                                src={propertyDetails.mainImage}
                                                alt="Main"
                                                className="mt-4 w-48 h-48 object-cover rounded-lg shadow-lg"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="otherImages" className="block text-sm font-medium text-gray-700">
                                        Autres Images
                                    </label>
                                    <div className="mt-2 border-2 border-dashed border-gray-300 p-4 rounded-md flex flex-col items-center justify-center">
                                        <input
                                            type="file"
                                            id="otherImages"
                                            name="otherImages"
                                            onChange={handleOtherImagesChange}
                                            className="hidden"
                                            accept="image/*"
                                            multiple
                                        />
                                        <label
                                            htmlFor="otherImages"
                                            className="cursor-pointer text-gray-500 hover:text-orange-500"
                                        >
                                            cliquez pour télécharger des images supplémentaires
                                        </label>
                                        <div className="mt-4 grid grid-cols-3 gap-4">
                                            {propertyDetails.otherImages.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt={`other-${index}`}
                                                    className="w-24 h-24 object-cover rounded-lg shadow-lg"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="flex justify-between items-center mt-6">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                                >
                                    Précédent
                                </button>
                            )}
                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="px-4 py-2 bg-orange-500 text-white rounded-md"
                                >
                                    Suivant
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="px-4 py-2 bg-orange-500 text-white rounded-md"
                                >
                                    Ajouter la propriété
                                </button>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AddProperty;
