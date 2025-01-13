import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChartPie, FaCalendarAlt, FaUsers, FaSignOutAlt, FaTimes, FaHome, FaBuilding } from "react-icons/fa";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const menuItems = [
        { label: "Acceuil", icon: <FaHome />, route: "/" },
        { label: "Vue d'ensemble", icon: <FaChartPie />, route: "/dashboard_assistant" },
        { label: "Propriétés", icon: <FaBuilding />, route: "/all_proprietes" },
        { label: "Rendez-vous", icon: <FaCalendarAlt />, route: "/rendez_vous" },
        { label: "Agents", icon: <FaUsers />, route: "/agent_list" },
    ];

    const handleLogout = () => {
        axios.get(`${apiUrl}/logout.php`)
            .then(res => {
                navigate('/auth-assistant')
            }).catch(err => console.log(err));
    }

    return (
        <div
            className={`fixed inset-y-0 left-0 z-30 w-64 bg-orange-400 text-white transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                } md:relative md:translate-x-0`}
        >
            <div className="flex items-center justify-between p-4 border-b border-orange-500">
                <h1 className="text-2xl font-bold">Tableau de Bord</h1>
                <button onClick={toggleSidebar} className="text-white md:hidden">
                    <FaTimes size={20} />
                </button>
            </div>
            <nav className="mt-6 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.route}
                        className={({ isActive }) =>
                            `flex items-center p-3 rounded-md transition duration-200 ${isActive
                                ? "bg-orange-600 shadow-lg"
                                : "hover:bg-orange-500 hover:shadow-md"
                            }`
                        }
                    >
                        <div className="text-lg">{item.icon}</div>
                        <span className="ml-4">{item.label}</span>
                    </NavLink>
                ))}

                <button onClick={handleLogout} className="flex items-center text-white-700 space-x-3 px-4 py-2">
                    <FaSignOutAlt className="text-xl" />
                    <span className="text-lg font-semibold">Se Déconnecter</span>
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
