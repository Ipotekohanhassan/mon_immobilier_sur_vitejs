import axios from 'axios';
import React from 'react';
import { AiOutlineHome, AiOutlineApartment, AiOutlineFileAdd, AiOutlineClose, AiOutlineUser, AiOutlineLogout, AiOutlineDashboard } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation(); // Permet de récupérer l'URL actuelle
    const navigate = useNavigate();

    const handleLogout =()=>{
        axios.get('http://localhost:8081/logout')
        .then(res =>{
            navigate('/login-agent')
        }).catch(err => console.log(err));
    }

    return (
        <aside
            className={`z-50 fixed top-0 left-0 h-full bg-white shadow-lg w-64 p-6 transition-transform duration-300 ${isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
                } md:relative md:translate-x-0`}
        >
            {/* Bouton pour fermer le menu sur mobile */}
            <button
                className="md:hidden p-2 rounded-full hover:bg-gray-100 absolute top-4 right-4"
                onClick={toggleSidebar}
            >
                <AiOutlineClose className="text-gray-700 text-2xl" />
            </button>

            <div className="text-2xl font-bold text-gray-800 mb-8">Agent Immo</div>
            <nav className="space-y-4">
                {[
                    { name: 'Accueil', icon: <AiOutlineHome />, path: '/' },
                    { name: 'Dashboard', icon: <AiOutlineDashboard />, path: '/dashboard-agent' },
                    { name: 'Ajouter Propriétés', icon: <AiOutlineFileAdd />, path: '/add_property' },
                    { name: 'Mes Propriétés', icon: <AiOutlineApartment />, path: '/my_properties' },
                    { name: 'Mon Profil', icon: <AiOutlineUser />, path: '/profil' },
                ].map((item) => (
                    <Link
                        to={item.path}
                        key={item.name}
                        className={`flex items-center text-gray-700 space-x-3 px-4 py-2 rounded-md transition ${location.pathname === item.path
                                ? 'bg-gray-100 text-orange-400 font-bold' // Style du lien actif
                                : 'hover:bg-gray-50'
                            }`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </Link>
                ))}
                <button onClick={handleLogout} className="flex items-center text-gray-700 space-x-3 px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:bg-gray-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <AiOutlineLogout className="text-xl" />
                    <span className="text-lg font-semibold">Se Déconnecter</span>
                </button>

            </nav>
        </aside>
    );
};

export default Sidebar;
