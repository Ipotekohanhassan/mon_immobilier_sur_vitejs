import React, { useState, useEffect } from "react";
import Navbar from "../../components/DashAgent/Navbar";
import Sidebar from "../../components/DashAgent/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
const apiUrl = import.meta.env.VITE_API_URL;

const Profile = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [id, setId] = useState(""); // L'id de l'agent
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState({
        full_name: "",
        email: "",
        phone: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });



    // Fonction pour récupérer les informations du profil de l'agent
    const fetchProfileData = async () => {
        try {
            const res = await axios.get(`${apiUrl}/profile/profile.php?agentId=${id}`);
            
            if (res.data) {
                setProfileData({
                    full_name: res.data.full_name,
                    email: res.data.email,
                    phone: res.data.phone,
                });
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des informations du profil :", error);
            toast.error("Une erreur est survenue.");
        }
    };

    // Vérifier si l'utilisateur est authentifié
    axios.defaults.withCredentials=true;
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const res = await axios.get(`${apiUrl}/index.php`);
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

    // Lorsque l'id est défini, récupérer les données du profil
    useEffect(() => {
        if (id) {
            fetchProfileData();
        }
    }, [id]);

    // Fonction pour gérer les changements dans les champs du profil
    const handleProfileChange = (e) => {
        const { id, value } = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    // Mise à jour du profil
    const updateProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("full_name", profileData.full_name);
        formData.append("email", profileData.email);
        formData.append("phone", profileData.phone);
        try {
            
            const res = await axios.post(`${apiUrl}/profile/modifier_profile.php?id=${id}`, formData);
            
            
            if (res.data.status === "success") {
                toast.success("Profil mis à jour avec succès !");
            } else {
                toast.error(res.data.Message);
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil :", error);
            toast.error("Une erreur est survenue.");
        }
    };

    

    // Fonction pour afficher/masquer le sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-gray-100">
                {/* Navbar */}
                <Navbar toggleSidebar={toggleSidebar} />

                {/* Dashboard Content */}
                <main className="p-6 flex-1 flex justify-center items-center">
                    {/* Toast notifications */}
                    <ToastContainer />

                    {/* Profile Section */}
                    <div className="flex flex-col lg:flex-row gap-12 justify-center items-center w-full max-w-6xl">
                        {/* Modifier le Profil */}
                        <div className="bg-white p-8 rounded-xl shadow-lg w-full lg:w-1/2">
                            <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
                                Modifier le Profil
                            </h2>
                            <form className="space-y-6" onSubmit={updateProfile}>
                                <div className="relative">
                                    <label
                                        className="block text-gray-700 text-sm font-medium mb-1"
                                        htmlFor="name"
                                    >
                                        Nom
                                    </label>
                                    <div className="flex items-center">
                                        <FaUser className="text-gray-400 absolute ml-3" />
                                        <input
                                            className="w-full pl-10 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
                                            id="full_name"
                                            type="text"
                                            value={profileData.full_name}
                                            onChange={handleProfileChange}
                                            placeholder="Votre nom"
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <label
                                        className="block text-gray-700 text-sm font-medium mb-1"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <div className="flex items-center">
                                        <FaEnvelope className="text-gray-400 absolute ml-3" />
                                        <input
                                            className="w-full pl-10 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
                                            id="email"
                                            type="email"
                                            value={profileData.email}
                                            onChange={handleProfileChange}
                                            placeholder="Votre email"
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <label
                                        className="block text-gray-700 text-sm font-medium mb-1"
                                        htmlFor="phone"
                                    >
                                        Numéro de Téléphone
                                    </label>
                                    <div className="flex items-center">
                                        <FaPhone className="text-gray-400 absolute ml-3" />
                                        <input
                                            className="w-full pl-10 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200"
                                            id="phone"
                                            type="tel"
                                            value={profileData.phone}
                                            onChange={handleProfileChange}
                                            placeholder="Votre numéro de téléphone"
                                        />
                                    </div>
                                </div>
                                <button
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300"
                                    type="submit"
                                >
                                    Mettre à jour
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Profile;
