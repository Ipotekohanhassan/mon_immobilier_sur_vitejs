import React, { useEffect, useState } from "react";
import Sidebar from '../../components/Assistant/Sidebar';
import KeyStatistics from '../../components/Assistant/KeyStatistics';
import InteractiveMap from '../../components/Assistant/InteractiveMap';
import { FaBars } from "react-icons/fa";
import StatisticsChart from "../../components/Assistant/StatisticsChart";
import Visites from "../../components/Assistant/Visites";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
const apiUrl = import.meta.env.VITE_API_URL;

const DashAssist = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    // Fonction pour rafraîchir les données
    const refreshData = () => {
        setRefreshKey((prev) => prev + 1); // Change la clé pour forcer un rechargement
    };
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    //verifier si l'utilisateur est connecte
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



    return (
        
        <div className="flex h-screen bg-gray-100">
            <ToastContainer />
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
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

                {/* Header */}
                <h2 className="text-3xl font-bold text-primary mb-6 mt-6">Vue d'ensemble</h2>

                {/* Key Statistics Section */}
                <KeyStatistics />

                <h2 className="text-3xl font-bold text-primary mb-6 mt-6">Tableau de Bord</h2>
                <StatisticsChart key={refreshKey} />
                <h2 className="text-3xl font-bold text-primary mb-6 mt-6">Rendez-vous</h2>
                <Visites refreshData={refreshData} />

                {/* Interactive Map Section */}
                <h2 className="text-3xl font-bold text-primary mb-6 mt-6">Vue cartographique</h2>
                <InteractiveMap />
                
            </div>
        </div>
    );
};

export default DashAssist;