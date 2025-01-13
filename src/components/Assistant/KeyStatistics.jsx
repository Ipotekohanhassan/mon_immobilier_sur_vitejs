import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;

const KeyStatistics = () => {
    const [stats, setStats] = useState({
        totalAgents: 0,
        totalRendezvous: 0,
        totalProprietes: 0,
        totalProprietesVisitees: 0,

    });

    useEffect(() => {
        // Effectuer la requête GET avec axios
        axios.get(`${apiUrl}/assistant/rendezvous_stats.php`)  // Assurez-vous que ce fichier est accessible
            .then((response) => {
                // Si la requête réussit, mettre à jour l'état avec les données
                setStats(response.data);
            })
            .catch((err) => {
                // En cas d'erreur, gérer l'erreur
                toast.error('Erreur lors de la récupération des statistiques.');
            });
    }, []);

    const statsData = [
        { label: "Rendez-vous Totals", value: stats.totalRendezvous },
        { label: "Propriétés", value: stats.totalProprietes },
        { label: "Propriétés Visitées", value: stats.totalProprietesVisitees },
        { label: "Agents", value: stats.totalAgents },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((item) => (
                <div
                    key={item.label}
                    className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center justify-center"
                >
                    <h3 className="text-gray-500 text-sm">{item.label}</h3>
                    <p className="text-2xl font-bold text-secondary">{item.value}</p>
                </div>
            ))}
        </div>
    );
};

export default KeyStatistics;
