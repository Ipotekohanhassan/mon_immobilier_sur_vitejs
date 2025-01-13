import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFilePdf, FaFileExcel, FaFileWord, FaDownload, FaSearch, FaPhone, FaEnvelope, FaSms } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import * as XLSX from "xlsx";
const apiUrl = import.meta.env.VITE_API_URL;
import { Document, Packer, Table, TableCell, TableRow, Paragraph, TextRun } from "docx";

const AgentList = () => {
    const [agents, setAgents] = useState([]); // L'état pour les agents
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Gérer l'état de chargement
    const [error, setError] = useState(null); // Gérer les erreurs
    const [searchQuery, setSearchQuery] = useState(""); 
    const [showModal, setShowModal] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);

    useEffect(() => {
        axios
            .get(`${apiUrl}/get_agents.php`)
            .then((response) => {
                console.log(response.data); // Log the response to check its structure
                setAgents(response.data); // Set the state to the response data
                setLoading(false);
            })
            .catch((err) => {
                setError("Erreur lors de la récupération des agents");
                setLoading(false);
            });
    }, []);


    // Gestion des données paginées
    const totalPages = Math.ceil(agents.length / itemsPerPage);

    // Gestion des données filtrées par recherche
    const filteredAgents = agents.filter(
        (agent) =>
            agent.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            agent.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const displayedAgents = filteredAgents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDownloadClick = () => {
        setIsPopupOpen(true);
    };

    const handleDownloadFormat = (format) => {
        setIsPopupOpen(false);

        // Gérer le téléchargement selon le format choisi
        if (format === "PDF") {
            downloadPDF();
        } else if (format === "Excel") {
            downloadExcel();
        } else if (format === "Word") {
            downloadWord();
        }
    };

    // Fonction pour télécharger en PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Liste des Agents", 14, 20);

        const tableData = displayedAgents.map(agent => [agent.full_name, agent.email, agent.phone]);

        autoTable(doc, {
            head: [['Nom Complet', 'Email', 'Numéro']],
            body: tableData,
            startY: 30,
        });

        doc.save("agents_list.pdf");
    };

    // Fonction pour télécharger en Excel
    const downloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(displayedAgents);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Agents");
        XLSX.writeFile(wb, "agents_list.xlsx");
    };

    // Fonction pour télécharger en Word
    const downloadWord = () => {
        // Création des en-têtes pour la table
        const tableHeaders = ["Nom Complet", "Email", "Numéro"];

        // Génération des lignes de la table à partir des données
        const tableRows = displayedAgents.map(agent =>
            new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph(agent.full_name)] }),
                    new TableCell({ children: [new Paragraph(agent.email)] }),
                    new TableCell({ children: [new Paragraph(agent.phone)] }),
                ],
            })
        );

        // Ligne des en-têtes
        const headerRow = new TableRow({
            children: tableHeaders.map(header =>
                new TableCell({
                    children: [new Paragraph(new TextRun({ text: header, bold: true }))],
                })
            ),
        });

        // Création de la table complète
        const table = new Table({
            rows: [headerRow, ...tableRows],
        });

        // Création du document Word
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            text: "Liste des Agents",
                            heading: "Heading1",
                        }),
                        table,
                    ],
                },
            ],
        });

        // Génération et téléchargement du fichier Word
        Packer.toBlob(doc).then(blob => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "agents_list.docx";
            link.click();
        });
    };


    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleContactClick = (agent) => {
        setSelectedAgent(agent);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedAgent(null);
    };

    return (
        <div className="p-6 bg-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-primary mb-6 sm:mb-0 sm:mr-6 mt-6">Liste des Agents</h2>
                <div className="relative w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0">
                    <input
                        type="text"
                        placeholder="Rechercher un agent..."
                        className="w-full px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FaSearch className="absolute top-3 right-3 text-gray-500" />
                </div>
                <button
                    onClick={handleDownloadClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center shadow-md hover:bg-blue-700 transition"
                >
                    <FaDownload className="mr-2" />
                    Télécharger la liste
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600">Nom Complet</th>
                            <th className="px-4 py-2 text-left text-gray-600">Email</th>
                            <th className="px-4 py-2 text-left text-gray-600">Numéro</th>
                            <th className="px-4 py-2 text-center text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedAgents.map((agent) => (
                            <tr key={agent.id} className="border-b">
                                <td className="px-4 py-2">{agent.full_name}</td>
                                <td className="px-4 py-2">{agent.email}</td>
                                <td className="px-4 py-2">{agent.phone}</td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={() =>
                                            handleContactClick({
                                                email: agent.email, // L'email de l'agent
                                                telephone: agent.phone, // Le numéro de l'agent
                                            })
                                        }
                                     className="text-blue-600 hover:underline">Contacter</button>
                                    <button className="text-red-600 hover:underline ml-2">Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={`px-3 py-1 rounded-md text-white ${currentPage === 1 ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
                    disabled={currentPage === 1}
                >
                    Précédent
                </button>
                <span className="text-gray-600">
                    Page {currentPage} sur {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={`px-3 py-1 rounded-md text-white ${currentPage === totalPages ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
                    disabled={currentPage === totalPages}
                >
                    Suivant
                </button>
            </div>
            {/* Popup de téléchargement */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-80">
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Choisir un format</h3>
                        <div className="flex flex-col space-y-3">
                            <button
                                onClick={() => handleDownloadFormat("PDF")}
                                className="flex items-center justify-between bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                            >
                                <span>PDF</span>
                                <FaFilePdf />
                            </button>
                            <button
                                onClick={() => handleDownloadFormat("Excel")}
                                className="flex items-center justify-between bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                            >
                                <span>Excel</span>
                                <FaFileExcel />
                            </button>
                            <button
                                onClick={() => handleDownloadFormat("Word")}
                                className="flex items-center justify-between bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                            >
                                <span>Word</span>
                                <FaFileWord />
                            </button>
                        </div>
                        <button
                            onClick={() => setIsPopupOpen(false)}
                            className="mt-4 w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}
            {/* Modal */}
            {showModal && selectedAgent && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-96">
                        <h2 className="text-xl font-bold mb-4">Contacter l'agent</h2>
                        <div className="flex flex-col space-y-4">
                            <button
                                onClick={() =>
                                    (window.location.href = `mailto:${selectedAgent.email}`)
                                }
                                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                <FaEnvelope className="mr-2" /> Envoyer un Email
                            </button>
                            <button
                                onClick={() =>
                                    (window.location.href = `tel:${selectedAgent.telephone}`)
                                }
                                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                <FaPhone className="mr-2" /> Passer un Appel
                            </button>
                            <button
                                onClick={() =>
                                    (window.location.href = `sms:${selectedAgent.telephone}`)
                                }
                                className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
                            >
                                <FaSms className="mr-2" /> Envoyer un SMS
                            </button>
                        </div>
                        <button
                            onClick={closeModal}
                            className="mt-6 text-gray-600 hover:text-gray-800 transition duration-300"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgentList;
