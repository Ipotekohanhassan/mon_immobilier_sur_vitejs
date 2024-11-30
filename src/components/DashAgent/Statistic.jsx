import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const Statistic = () => {
    const [timePeriod, setTimePeriod] = useState("semaine"); // Par défaut, la période est semaine

    // Fonction pour filtrer les données en fonction de la période choisie
    const filterDataByPeriod = (period) => {
        switch (period) {
            case "jour":
                return {
                    labels: ["00:00", "06:00", "12:00", "18:00"],
                    datasets: [
                        {
                            label: "Nombre de Propriétés Créées",
                            data: [1, 5, 2, 3],
                            borderColor: "rgba(255, 140, 0, 1)", // Orange foncé
                            backgroundColor: "rgba(255, 165, 0, 0.2)", // Orange clair
                        },
                        {
                            label: "Nombre de Vues",
                            data: [10, 30, 20, 40],
                            borderColor: "rgba(255, 100, 0, 1)", // Orange foncé
                            backgroundColor: "rgba(255, 120, 0, 0.2)", // Orange clair
                        },
                    ],
                };
            case "mois":
                return {
                    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
                    datasets: [
                        {
                            label: "Nombre de Propriétés Créées",
                            data: [20, 40, 60, 80, 90, 100],
                            borderColor: "rgba(255, 140, 0, 1)", // Orange foncé
                            backgroundColor: "rgba(255, 165, 0, 0.2)", // Orange clair
                        },
                        {
                            label: "Nombre de Vues",
                            data: [50, 70, 80, 90, 110, 130],
                            borderColor: "rgba(255, 100, 0, 1)", // Orange foncé
                            backgroundColor: "rgba(255, 120, 0, 0.2)", // Orange clair
                        },
                    ],
                };
            case "annee":
                return {
                    labels: ["2021", "2022", "2023"],
                    datasets: [
                        {
                            label: "Nombre de Propriétés Créées",
                            data: [200, 400, 500],
                            borderColor: "rgba(255, 140, 0, 1)", // Orange foncé
                            backgroundColor: "rgba(255, 165, 0, 0.2)", // Orange clair
                        },
                        {
                            label: "Nombre de Vues",
                            data: [500, 700, 1000],
                            borderColor: "rgba(255, 100, 0, 1)", // Orange foncé
                            backgroundColor: "rgba(255, 120, 0, 0.2)", // Orange clair
                        },
                    ],
                };
            default:
                return {
                    labels: ["Semaine 1", "Semaine 2", "Semaine 3", "Semaine 4"],
                    datasets: [
                        {
                            label: "Nombre de Propriétés Créées",
                            data: [10, 20, 15, 30],
                            borderColor: "rgba(255, 140, 0, 1)", // Orange foncé
                            backgroundColor: "rgba(255, 165, 0, 0.2)", // Orange clair
                        },
                        {
                            label: "Nombre de Vues",
                            data: [50, 60, 45, 80],
                            borderColor: "rgba(255, 100, 0, 1)", // Orange foncé
                            backgroundColor: "rgba(255, 120, 0, 0.2)", // Orange clair
                        },
                    ],
                };
        }
    };

    const data = filterDataByPeriod(timePeriod);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    color: "#374151",
                    font: { size: 12 },
                },
            },
            tooltip: { enabled: true },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: "#6B7280", font: { size: 10 } },
            },
            y: {
                grid: { color: "#E5E7EB" },
                ticks: { color: "#6B7280", font: { size: 10 } },
            },
        },
    };

    return (
        <section className="bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-4 w-full max-w-7xl mx-auto overflow-hidden">
            {/* Titre et sous-titre */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <h2 className="text-lg font-bold text-gray-800 text-center sm:text-left">
                    Statistiques des Propriétés
                </h2>
                <p className="text-sm text-gray-500 text-center sm:text-right">
                    Données {timePeriod === "jour" ? "journalières" : timePeriod === "semaine" ? "hebdomadaires" : timePeriod === "mois" ? "mensuelles" : "annuelles"}
                </p>
            </header>

            {/* Sélecteur de période */}
            <div className="flex justify-center mt-4">
                <select
                    className="p-2 border border-gray-300 rounded-md"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                >
                    <option value="jour">Jour</option>
                    <option value="semaine">Semaine</option>
                    <option value="mois">Mois</option>
                    <option value="annee">Année</option>
                </select>
            </div>

            {/* Graphique */}
            <div className="w-full">
                <div className="h-48 sm:h-64 md:h-96 relative">
                    <Line data={data} options={options} />
                </div>
            </div>
        </section>
    );
};

export default Statistic;
