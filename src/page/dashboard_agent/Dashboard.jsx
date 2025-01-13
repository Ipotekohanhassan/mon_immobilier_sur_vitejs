import React, { useState, useEffect } from "react";
import Navbar from "../../components/DashAgent/Navbar";
import PropertiesList from "../../components/DashAgent/PropertiesList";
import Sidebar from "../../components/DashAgent/Sidebar";
import CardCreateProperty from "../../components/DashAgent/CardCreateProperty";
import Statistic from "../../components/DashAgent/Statistic";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const apiUrl = import.meta.env.VITE_API_URL;


const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [id, setId] = useState('');
    const navigate = useNavigate();  


    //verifier si l'utilisateur est connecte
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const res = await axios.get(`${apiUrl}/index.php`);
                if (res.data.Status === "Success") {
                    setId(res.data.id);
                    
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
                <main className="p-6 space-y-6 flex-1 overflow-y-auto">
                    {/* Container pour les notifications Toast */}
                    <ToastContainer />
                    <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
                    <CardCreateProperty />
                    <Statistic />
                    <PropertiesList />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
