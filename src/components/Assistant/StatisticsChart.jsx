import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
const apiUrl = import.meta.env.VITE_API_URL;

// Enregistrement des composants nécessaires
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const StatisticsChart = () => {
    const [stats, setStats] = useState({
        totalRendezvousConfirmes: 0,
        totalRendezvousEnAttente: 0,
        totalRendezvousAnnules: 0,
        totalProprietesVisitees: 0,
        totalProprietes:0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Récupérer les données depuis le backend PHP
        axios.get(`${apiUrl}/assistant/rendezvous_stats.php`)
            .then((response) => {
                setStats(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Erreur lors de la récupération des statistiques.");
                setLoading(false);
            });
    }, []);

    // Données pour le graphique en barres
    const barData = {
        labels: ["Confirmés", "En attente", "Annulés"],
        datasets: [
            {
                label: "Rendez-vous",
                data: [
                    stats.totalRendezvousConfirmes,  // Nombre de rendez-vous confirmés
                    stats.totalRendezvousEnAttente,  // Nombre de rendez-vous en attente
                    stats.totalRendezvousAnnules,    // Nombre de rendez-vous annulés
                ],
                backgroundColor: ["#4CAF50", "#FF9800", "#F44336"],
                borderWidth: 1,
                borderColor: ["#388E3C", "#F57C00", "#D32F2F"],
            },
        ],
    };

    // Données pour le graphique en secteurs
    const pieData = {
        labels: ["Visités", "Non Visités"],
        datasets: [
            {
                data: [stats.totalProprietesVisitees, stats.totalProprietes - stats.totalProprietesVisitees], // Supposons que le reste sont "Non Visités"
                backgroundColor: ["#4CAF50", "#2196F3"],
                hoverBackgroundColor: ["#388E3C", "#1565C0"],
                borderWidth: 1,
                borderColor: "#FFFFFF",
            },
        ],
    };

    // Options pour les graphiques
    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    boxWidth: 15,
                },
            },
            title: {
                display: true,
                text: "Statut des Rendez-vous",
                font: {
                    size: 18,
                    weight: "bold",
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "#E0E0E0",
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    boxWidth: 15,
                },
            },
            title: {
                display: true,
                text: "Propriétés Visitées",
                font: {
                    size: 18,
                    weight: "bold",
                },
            },
        },
    };

    if (loading) {
        return <div>Chargement des statistiques...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Graphique en barres */}
            <div className="p-6 bg-white rounded-lg shadow-md flex items-center justify-center" style={{ height: "400px" }}>
                <div style={{ width: "100%", height: "100%" }}>
                    <Bar data={barData} options={barOptions} />
                </div>
            </div>

            {/* Graphique en secteurs */}
            <div className="p-6 bg-white rounded-lg shadow-md flex items-center justify-center" style={{ height: "400px" }}>
                <div style={{ width: "100%", height: "100%" }}>
                    <Pie data={pieData} options={pieOptions} />
                </div>
            </div>
        </div>
    );
};

export default StatisticsChart;
